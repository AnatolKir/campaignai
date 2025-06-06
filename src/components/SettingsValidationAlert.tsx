"use client";

import React from 'react'
import { SettingsConflict, SettingsWarning } from '../hooks/useSettingsValidation'

interface SettingsValidationAlertProps {
  conflicts: SettingsConflict[]
  warnings: SettingsWarning[]
  onResolveConflict?: (conflict: SettingsConflict) => void
  className?: string
}

const getSeverityIcon = (severity: 'error' | 'low' | 'medium' | 'high'): string => {
  switch (severity) {
    case 'error': return '🚫'
    case 'high': return '⚠️'
    case 'medium': return '⚡'
    case 'low': return 'ℹ️'
    default: return 'ℹ️'
  }
}

const getSeverityColor = (severity: 'error' | 'low' | 'medium' | 'high'): string => {
  switch (severity) {
    case 'error': return 'border-red-500/50 bg-red-900/20 text-red-200'
    case 'high': return 'border-orange-500/50 bg-orange-900/20 text-orange-200'
    case 'medium': return 'border-yellow-500/50 bg-yellow-900/20 text-yellow-200'
    case 'low': return 'border-blue-500/50 bg-blue-900/20 text-blue-200'
    default: return 'border-gray-500/50 bg-gray-900/20 text-gray-200'
  }
}

export const SettingsValidationAlert: React.FC<SettingsValidationAlertProps> = ({
  conflicts,
  warnings,
  onResolveConflict,
  className = ''
}) => {
  if (conflicts.length === 0 && warnings.length === 0) {
    return null
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Conflicts (Errors) */}
      {conflicts.map((conflict, index) => (
        <div
          key={`conflict-${index}`}
          className={`p-4 rounded-lg border backdrop-blur-lg ${getSeverityColor('error')}`}
        >
          <div className="flex items-start space-x-3">
            <span className="text-lg flex-shrink-0 mt-0.5">
              {getSeverityIcon('error')}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-red-100">
                  Settings Conflict Detected
                </h4>
                <span className="text-xs px-2 py-1 bg-red-500/20 rounded-full text-red-300 border border-red-500/30">
                  {conflict.category.replace('_', ' ')}
                </span>
              </div>
              <p className="text-sm text-red-200 mb-2">
                {conflict.description}
              </p>
              <div className="text-xs text-red-300">
                <strong>Conflicting fields:</strong> {conflict.conflictingFields.join(', ')}
              </div>
              {onResolveConflict && (
                <button
                  onClick={() => onResolveConflict(conflict)}
                  className="mt-3 text-xs bg-red-600/30 hover:bg-red-600/50 text-red-200 px-3 py-1 rounded border border-red-500/30 transition-colors"
                >
                  Help Resolve Conflict
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Warnings */}
      {warnings.map((warning, index) => (
        <div
          key={`warning-${index}`}
          className={`p-4 rounded-lg border backdrop-blur-lg ${getSeverityColor(warning.severity)}`}
        >
          <div className="flex items-start space-x-3">
            <span className="text-lg flex-shrink-0 mt-0.5">
              {getSeverityIcon(warning.severity)}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold">
                  Settings Warning
                </h4>
                <span className="text-xs px-2 py-1 bg-white/10 rounded-full border border-white/20 capitalize">
                  {warning.severity}
                </span>
              </div>
              <p className="text-sm mb-2">
                {warning.message}
              </p>
              <div className="text-xs opacity-75">
                <strong>Combination:</strong> {warning.combination.join(' + ')}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Inline validation tooltip component for individual form fields
interface FieldValidationTooltipProps {
  conflicts: SettingsConflict[]
  warnings: SettingsWarning[]
  fieldName: string
  show: boolean
}

export const FieldValidationTooltip: React.FC<FieldValidationTooltipProps> = ({
  conflicts,
  warnings,
  fieldName,
  show
}) => {
  const relevantConflicts = conflicts.filter(c => c.conflictingFields.includes(fieldName))
  const relevantWarnings = warnings.filter(w => 
    w.combination.some(combo => combo.startsWith(`${fieldName}:`))
  )

  if (!show || (relevantConflicts.length === 0 && relevantWarnings.length === 0)) {
    return null
  }

  return (
    <div className="absolute z-50 mt-1 p-3 bg-gray-900 border border-gray-600 rounded-lg shadow-xl max-w-sm">
      {relevantConflicts.map((conflict, index) => (
        <div key={index} className="text-red-300 text-xs mb-1">
          <span className="font-medium">⚠️ Conflict:</span> {conflict.description}
        </div>
      ))}
      {relevantWarnings.map((warning, index) => (
        <div key={index} className="text-yellow-300 text-xs mb-1">
          <span className="font-medium">💡 Warning:</span> {warning.message}
        </div>
      ))}
    </div>
  )
} 