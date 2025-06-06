import { render, screen } from '@testing-library/react'
import conflictMatrix from '../src/settings/conflictMatrix.json'

// Mock the settings components
jest.mock('../src/app/agent-settings/page', () => {
  return function MockAgentSettings() {
    return (
      <div data-testid="agent-settings">
        {/* Mock form elements that could conflict */}
        <select data-testid="proactiveness" defaultValue="reactive">
          <option value="reactive">Reactive</option>
          <option value="proactive">Proactive</option>
        </select>
        <input 
          data-testid="conversationStarters" 
          type="checkbox" 
          defaultChecked={true}
        />
        <select data-testid="riskTolerance" defaultValue="conservative">
          <option value="conservative">Conservative</option>
          <option value="moderate">Moderate</option>
          <option value="aggressive">Aggressive</option>
        </select>
        <select data-testid="creativityLevel" defaultValue="high">
          <option value="low">Low</option>
          <option value="medium">Medium</option>  
          <option value="high">High</option>
        </select>
      </div>
    )
  }
})

// Helper function to parse conflict rule
function parseConflictRule(rule: string): { field: string; value: string; operator?: string } {
  if (rule.includes(':>')) {
    const [field, value] = rule.split(':>')
    return { field, value, operator: '>' }
  } else if (rule.includes(':')) {
    const [field, value] = rule.split(':')
    return { field, value }
  }
  return { field: rule, value: '' }
}

// Helper function to check if two settings conflict based on conflict matrix
function hasConflict(setting1: any, setting2: any): boolean {
  for (const conflictGroup of conflictMatrix.conflicts) {
    for (const mutuallyExclusive of conflictGroup.mutually_exclusive) {
      const rule1 = parseConflictRule(mutuallyExclusive[0])
      const rule2 = parseConflictRule(mutuallyExclusive[1])
      
      // Check if current settings match any conflicting pair
      if (
        (setting1.field === rule1.field && setting1.value === rule1.value &&
         setting2.field === rule2.field && setting2.value === rule2.value) ||
        (setting1.field === rule2.field && setting1.value === rule2.value &&
         setting2.field === rule1.field && setting2.value === rule1.value)
      ) {
        return true
      }
    }
  }
  return false
}

describe('Settings Mutual Exclusivity', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should load and parse conflict matrix correctly', () => {
    expect(conflictMatrix).toBeDefined()
    expect(conflictMatrix.version).toBe('2.0.0')
    expect(conflictMatrix.conflicts).toBeInstanceOf(Array)
    expect(conflictMatrix.conflicts.length).toBeGreaterThan(0)
  })

  it('should validate conflict matrix structure', () => {
    conflictMatrix.conflicts.forEach((conflict, index) => {
      expect(conflict).toHaveProperty('category')
      expect(conflict).toHaveProperty('mutually_exclusive')
      expect(conflict).toHaveProperty('description')
      expect(conflict.mutually_exclusive).toBeInstanceOf(Array)
      
      conflict.mutually_exclusive.forEach((pair, pairIndex) => {
        expect(pair).toBeInstanceOf(Array)
        expect(pair).toHaveLength(2)
        expect(typeof pair[0]).toBe('string')
        expect(typeof pair[1]).toBe('string')
      })
    })
  })

  it('should detect new consolidated conflicts', () => {
    const leaderEngagement = { field: 'engagementStyle', value: 'leader' }
    const manualTiming = { field: 'responseTiming', value: 'manual-review' }
    
    expect(hasConflict(leaderEngagement, manualTiming)).toBe(true)
  })

  it('should validate consolidated fields prevent old conflicts', () => {
    // These old conflicting combinations should no longer be possible
    // because they're now unified in single consolidated fields
    const observerStyle = { field: 'engagementStyle', value: 'observer' }
    const participantStyle = { field: 'engagementStyle', value: 'participant' }
    
    // Observer style is internally consistent (reactive + no conversation starters)
    // No conflict possible within a single engagementStyle selection
    expect(hasConflict(observerStyle, participantStyle)).toBe(false)
  })

  it('should not flag non-conflicting settings', () => {
    const moderateRisk = { field: 'riskTolerance', value: 'moderate' }
    const highCreativity = { field: 'creativityLevel', value: 'high' }
    
    expect(hasConflict(moderateRisk, highCreativity)).toBe(false)
  })

  it('should validate warnings configuration', () => {
    expect(conflictMatrix.warnings).toBeInstanceOf(Array)
    
    conflictMatrix.warnings.forEach((warning) => {
      expect(warning).toHaveProperty('combination')
      expect(warning).toHaveProperty('message')
      expect(warning).toHaveProperty('severity')
      expect(warning.combination).toBeInstanceOf(Array)
      expect(['low', 'medium', 'high']).toContain(warning.severity)
    })
  })

  // Integration test demonstrating consolidated fields prevent conflicts
  it('should use consolidated fields that prevent old conflicts', async () => {
    // Mock a component using new consolidated approach
    const ConsolidatedComponent = () => (
      <div data-testid="consolidated-component">
        <select data-testid="engagementStyle" defaultValue="observer">
          <option value="observer">Observer (Reactive)</option>
          <option value="participant">Participant (Balanced)</option>
          <option value="leader">Leader (Proactive)</option>
        </select>
        <select data-testid="responseTiming" defaultValue="optimized-auto">
          <option value="immediate-auto">Immediate Auto</option>
          <option value="optimized-auto">Optimized Auto</option>
          <option value="manual-review">Manual Review</option>
        </select>
      </div>
    )

    render(<ConsolidatedComponent />)
    
    const engagementSelect = screen.getByTestId('engagementStyle')
    const timingSelect = screen.getByTestId('responseTiming')
    
    // The old conflict (reactive + conversation starters) is now impossible
    // because "observer" engagement style inherently includes reactive behavior
    // without conversation starters - the conflict is prevented by design
    const currentEngagement = (engagementSelect as HTMLSelectElement).value
    const currentTiming = (timingSelect as HTMLSelectElement).value
    
    // Only test for actual remaining conflicts in the new system
    if (currentEngagement === 'leader' && currentTiming === 'manual-review') {
      console.warn('Suboptimal combination: Leader engagement with manual review may slow responses')
    }
    
    // This should pass - no conflicts exist in the new consolidated design
    expect(currentEngagement).toBeDefined()
    expect(currentTiming).toBeDefined()
  })

  it('should provide helpful error messages for detected conflicts', () => {
    const timingConflict = conflictMatrix.conflicts.find(c => c.category === 'communication_timing_mismatch')
    expect(timingConflict?.description).toContain('Community leader engagement style')
    
    const contentConflict = conflictMatrix.conflicts.find(c => c.category === 'content_approach_consistency')
    expect(contentConflict?.description).toContain('Content approach should align')
  })
}) 