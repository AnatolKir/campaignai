import { useState, useCallback, useMemo } from 'react'
import conflictMatrix from '../settings/conflictMatrix.json'

export interface SettingsConflict {
  conflictingFields: string[]
  category: string
  description: string
  severity: 'error' | 'warning'
}

export interface SettingsWarning {
  combination: string[]
  message: string
  severity: 'low' | 'medium' | 'high'
}

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

// Helper function to check if a value matches a rule
function valueMatchesRule(actualValue: any, rule: { field: string; value: string; operator?: string }): boolean {
  if (rule.operator === '>') {
    const numValue = typeof actualValue === 'number' ? actualValue : parseFloat(actualValue)
    const ruleValue = parseFloat(rule.value)
    return !isNaN(numValue) && !isNaN(ruleValue) && numValue > ruleValue
  }
  
  // Handle boolean values
  if (typeof actualValue === 'boolean') {
    return actualValue.toString() === rule.value
  }
  
  return actualValue === rule.value
}

export const useSettingsValidation = (currentSettings: Record<string, any>) => {
  const [validationResults, setValidationResults] = useState<{
    conflicts: SettingsConflict[]
    warnings: SettingsWarning[]
  }>({ conflicts: [], warnings: [] })

  // Validate settings for conflicts
  const validateConflicts = useCallback((settings: Record<string, any>) => {
    const conflicts: SettingsConflict[] = []
    
    for (const conflictGroup of conflictMatrix.conflicts) {
      for (const mutuallyExclusive of conflictGroup.mutually_exclusive) {
        const rule1 = parseConflictRule(mutuallyExclusive[0])
        const rule2 = parseConflictRule(mutuallyExclusive[1])
        
        const value1 = settings[rule1.field]
        const value2 = settings[rule2.field]
        
        // Check if both conflicting conditions are met
        if (value1 !== undefined && value2 !== undefined &&
            valueMatchesRule(value1, rule1) && valueMatchesRule(value2, rule2)) {
          conflicts.push({
            conflictingFields: [rule1.field, rule2.field],
            category: conflictGroup.category,
            description: conflictGroup.description,
            severity: 'error'
          })
        }
      }
    }
    
    return conflicts
  }, [])

  // Validate settings for warnings
  const validateWarnings = useCallback((settings: Record<string, any>) => {
    const warnings: SettingsWarning[] = []
    
    for (const warning of conflictMatrix.warnings) {
      const allConditionsMet = warning.combination.every(condition => {
        const rule = parseConflictRule(condition)
        const value = settings[rule.field]
        return value !== undefined && valueMatchesRule(value, rule)
      })
      
      if (allConditionsMet) {
        warnings.push({
          ...warning,
          severity: warning.severity as 'low' | 'medium' | 'high'
        })
      }
    }
    
    return warnings
  }, [])

  // Main validation function
  const validateSettings = useCallback((settings: Record<string, any>) => {
    const conflicts = validateConflicts(settings)
    const warnings = validateWarnings(settings)
    
    setValidationResults({ conflicts, warnings })
    return { conflicts, warnings }
  }, [validateConflicts, validateWarnings])

  // Check if a specific field change would create conflicts
  const wouldCreateConflict = useCallback((fieldName: string, newValue: any): SettingsConflict[] => {
    const testSettings = { ...currentSettings, [fieldName]: newValue }
    return validateConflicts(testSettings)
  }, [currentSettings, validateConflicts])

  // Get conflicting fields for a specific setting
  const getConflictingFields = useCallback((fieldName: string, value: any): string[] => {
    const conflicts = wouldCreateConflict(fieldName, value)
    return conflicts.flatMap(conflict => 
      conflict.conflictingFields.filter(field => field !== fieldName)
    )
  }, [wouldCreateConflict])

  // Check if a field should be disabled due to current settings
  const isFieldDisabled = useCallback((fieldName: string, value: any): boolean => {
    return wouldCreateConflict(fieldName, value).length > 0
  }, [wouldCreateConflict])

  // Memoized current validation state
  const currentValidation = useMemo(() => {
    return validateSettings(currentSettings)
  }, [currentSettings, validateSettings])

  return {
    // Validation state
    conflicts: currentValidation.conflicts,
    warnings: currentValidation.warnings,
    hasConflicts: currentValidation.conflicts.length > 0,
    hasWarnings: currentValidation.warnings.length > 0,
    
    // Validation functions
    validateSettings,
    wouldCreateConflict,
    getConflictingFields,
    isFieldDisabled,
    
    // Helper utilities
    isValid: currentValidation.conflicts.length === 0
  }
} 