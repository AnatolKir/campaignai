"use client";

import React, { useState } from 'react'
import { SettingsConflict, SettingsWarning } from '../hooks/useSettingsValidation'
import { FieldValidationTooltip } from './SettingsValidationAlert'

interface BaseValidatedFieldProps {
  label: string
  fieldName: string
  description?: string
  conflicts: SettingsConflict[]
  warnings: SettingsWarning[]
  isFieldDisabled: (fieldName: string, value: any) => boolean
  getConflictingFields: (fieldName: string, value: any) => string[]
  className?: string
}

// Validated Radio Group Component
interface ValidatedRadioGroupProps extends BaseValidatedFieldProps {
  value: string
  options: { value: string; label: string; description?: string }[]
  onChange: (value: string) => void
}

export const ValidatedRadioGroup: React.FC<ValidatedRadioGroupProps> = ({
  label,
  fieldName,
  description,
  value,
  options,
  onChange,
  conflicts,
  warnings,
  isFieldDisabled,
  getConflictingFields,
  className = ''
}) => {
  const [showTooltip, setShowTooltip] = useState<string | null>(null)
  
  const hasFieldConflicts = conflicts.some(c => c.conflictingFields.includes(fieldName))
  
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center space-x-2">
        <label className="block text-white font-semibold">{label}</label>
        {hasFieldConflicts && (
          <span className="text-red-400 text-sm">⚠️ Has conflicts</span>
        )}
      </div>
      
      {description && (
        <p className="text-gray-300 text-sm">{description}</p>
      )}
      
      <div className="space-y-3">
        {options.map((option) => {
          const disabled = isFieldDisabled(fieldName, option.value)
          const conflictingFields = getConflictingFields(fieldName, option.value)
          const isSelected = value === option.value
          
          return (
            <div key={option.value} className="relative">
              <label 
                className={`flex items-start space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  disabled 
                    ? 'bg-red-900/20 border border-red-500/30 cursor-not-allowed' 
                    : isSelected
                    ? 'bg-purple-600/30 border border-purple-500/50'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
                onMouseEnter={() => disabled && setShowTooltip(option.value)}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <input
                  type="radio"
                  name={fieldName}
                  value={option.value}
                  checked={isSelected}
                  onChange={(e) => onChange(e.target.value)}
                  disabled={disabled}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className={`font-medium ${disabled ? 'text-red-300' : 'text-white'}`}>
                    {option.label}
                    {disabled && (
                      <span className="ml-2 text-xs text-red-400">
                        (Conflicts with: {conflictingFields.join(', ')})
                      </span>
                    )}
                  </div>
                  {option.description && (
                    <div className={`text-sm ${disabled ? 'text-red-400' : 'text-gray-400'}`}>
                      {option.description}
                    </div>
                  )}
                </div>
              </label>
              
              <FieldValidationTooltip
                conflicts={conflicts}
                warnings={warnings}
                fieldName={fieldName}
                show={showTooltip === option.value}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Validated Checkbox Component
interface ValidatedCheckboxProps extends BaseValidatedFieldProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export const ValidatedCheckbox: React.FC<ValidatedCheckboxProps> = ({
  label,
  fieldName,
  description,
  checked,
  onChange,
  conflicts,
  warnings,
  isFieldDisabled,
  getConflictingFields,
  className = ''
}) => {
  const [showTooltip, setShowTooltip] = useState(false)
  
  const wouldBeDisabled = isFieldDisabled(fieldName, !checked)
  const conflictingFields = getConflictingFields(fieldName, !checked)
  const hasConflicts = conflicts.some(c => c.conflictingFields.includes(fieldName))
  
  return (
    <div className={`relative ${className}`}>
      <label 
        className={`flex items-start space-x-3 p-4 rounded-lg cursor-pointer transition-colors ${
          hasConflicts
            ? 'bg-red-900/20 border border-red-500/30'
            : 'bg-white/5 hover:bg-white/10 border border-white/10'
        }`}
        onMouseEnter={() => (hasConflicts || wouldBeDisabled) && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1"
        />
        <div className="flex-1">
          <div className={`font-medium ${hasConflicts ? 'text-red-300' : 'text-white'}`}>
            {label}
            {hasConflicts && (
              <span className="ml-2 text-xs text-red-400">
                ⚠️ Conflicts detected
              </span>
            )}
          </div>
          {description && (
            <div className={`text-sm ${hasConflicts ? 'text-red-400' : 'text-gray-400'}`}>
              {description}
            </div>
          )}
          {wouldBeDisabled && conflictingFields.length > 0 && (
            <div className="text-xs text-yellow-400 mt-1">
              💡 Changing this would conflict with: {conflictingFields.join(', ')}
            </div>
          )}
        </div>
      </label>
      
      <FieldValidationTooltip
        conflicts={conflicts}
        warnings={warnings}
        fieldName={fieldName}
        show={showTooltip}
      />
    </div>
  )
}

// Validated Select Component
interface ValidatedSelectProps extends BaseValidatedFieldProps {
  value: string
  options: { value: string; label: string; disabled?: boolean }[]
  onChange: (value: string) => void
}

export const ValidatedSelect: React.FC<ValidatedSelectProps> = ({
  label,
  fieldName,
  description,
  value,
  options,
  onChange,
  conflicts,
  warnings,
  isFieldDisabled,
  getConflictingFields,
  className = ''
}) => {
  const [showTooltip, setShowTooltip] = useState(false)
  
  const hasFieldConflicts = conflicts.some(c => c.conflictingFields.includes(fieldName))
  
  const enhancedOptions = options.map(option => ({
    ...option,
    disabled: option.disabled || isFieldDisabled(fieldName, option.value),
    conflictingFields: getConflictingFields(fieldName, option.value)
  }))
  
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center space-x-2">
        <label className={`block font-medium ${hasFieldConflicts ? 'text-red-300' : 'text-white'}`}>
          {label}
        </label>
        {hasFieldConflicts && (
          <span className="text-red-400 text-sm">⚠️</span>
        )}
      </div>
      
      {description && (
        <p className={`text-sm ${hasFieldConflicts ? 'text-red-400' : 'text-gray-300'}`}>
          {description}
        </p>
      )}
      
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onMouseEnter={() => hasFieldConflicts && setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`w-full rounded-lg px-4 py-3 text-white focus:outline-none transition-all ${
            hasFieldConflicts
              ? 'bg-red-900/20 border border-red-500/50 focus:border-red-400'
              : 'bg-white/10 border border-white/20 focus:border-purple-500'
          }`}
        >
          {enhancedOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className={option.disabled ? 'text-gray-500' : 'text-white'}
            >
              {option.label}
              {option.disabled && option.conflictingFields.length > 0 && 
                ` (Conflicts with: ${option.conflictingFields.join(', ')})`
              }
            </option>
          ))}
        </select>
        
        <FieldValidationTooltip
          conflicts={conflicts}
          warnings={warnings}
          fieldName={fieldName}
          show={showTooltip}
        />
      </div>
    </div>
  )
} 