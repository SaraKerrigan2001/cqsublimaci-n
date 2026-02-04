"use client"

import React from 'react'
import Select, { Props as SelectProps, StylesConfig, SingleValue } from 'react-select'
import { cn } from '@/lib/utils'

export interface Option {
  value: string
  label: string
}

interface CustomSelectProps extends Omit<SelectProps<Option, false>, 'styles' | 'onChange'> {
  className?: string
  error?: string
  onChange?: (option: SingleValue<Option>) => void
}

const customStyles: StylesConfig<Option> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: 'hsl(var(--background))',
    borderColor: state.isFocused ? 'hsl(var(--ring))' : 'hsl(var(--border))',
    borderRadius: '0.375rem',
    minHeight: '2.5rem',
    boxShadow: state.isFocused ? '0 0 0 2px hsl(var(--ring))' : 'none',
    '&:hover': {
      borderColor: 'hsl(var(--border))'
    }
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'hsl(var(--popover))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '0.375rem',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    zIndex: 50
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected 
      ? 'hsl(var(--accent))' 
      : state.isFocused 
        ? 'hsl(var(--accent))' 
        : 'transparent',
    color: 'hsl(var(--foreground))',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'hsl(var(--accent))'
    }
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'hsl(var(--foreground))'
  }),
  placeholder: (provided) => ({
    ...provided,
    color: 'hsl(var(--muted-foreground))'
  }),
  input: (provided) => ({
    ...provided,
    color: 'hsl(var(--foreground))'
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'hsl(var(--accent))'
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'hsl(var(--foreground))'
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'hsl(var(--foreground))',
    '&:hover': {
      backgroundColor: 'hsl(var(--destructive))',
      color: 'hsl(var(--destructive-foreground))'
    }
  })
}

export function CustomSelect({ className, error, onChange, ...props }: CustomSelectProps) {
  return (
    <div className={cn('w-full', className)}>
      <Select<Option, false>
        {...props}
        onChange={onChange}
        styles={customStyles}
        classNamePrefix="react-select"
        noOptionsMessage={() => 'No hay opciones disponibles'}
        loadingMessage={() => 'Cargando...'}
        placeholder="Seleccionar..."
        isMulti={false}
      />
      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  )
}