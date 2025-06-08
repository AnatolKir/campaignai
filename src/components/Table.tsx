"use client";

import React, { useState } from 'react';
import { EmptyState } from './EmptyState';

export interface TableColumn<T = any> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (item: T, index: number) => React.ReactNode;
  className?: string;
}

interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  emptyState?: {
    title: string;
    description: string;
    icon?: string;
    action?: {
      label: string;
      onClick: () => void;
    };
  };
  className?: string;
  striped?: boolean;
}

export function Table<T = any>({ 
  columns, 
  data, 
  onSort, 
  sortColumn, 
  sortDirection,
  emptyState,
  className = '',
  striped = false
}: TableProps<T>) {
  const [internalSortColumn, setInternalSortColumn] = useState<string>('');
  const [internalSortDirection, setInternalSortDirection] = useState<'asc' | 'desc'>('asc');

  const currentSortColumn = sortColumn || internalSortColumn;
  const currentSortDirection = sortDirection || internalSortDirection;

  const handleSort = (column: string) => {
    const newDirection = currentSortColumn === column && currentSortDirection === 'asc' ? 'desc' : 'asc';
    
    if (onSort) {
      onSort(column, newDirection);
    } else {
      setInternalSortColumn(column);
      setInternalSortDirection(newDirection);
    }
  };

  // Default render function for a column
  const renderCell = (column: TableColumn<T>, item: T, index: number) => {
    if (column.render) {
      return column.render(item, index);
    }
    
    // Default: show the property value
    const value = (item as any)[column.key];
    return value !== null && value !== undefined ? String(value) : '-';
  };

  if (data.length === 0 && emptyState) {
    return (
      <div className={`bg-white/5 backdrop-blur-lg rounded-lg border border-white/10 ${className}`}>
        <EmptyState
          title={emptyState.title}
          description={emptyState.description}
          icon={emptyState.icon}
          action={emptyState.action}
        />
      </div>
    );
  }

  return (
    <div className={`bg-white/5 backdrop-blur-lg rounded-lg border border-white/10 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key}
                  className={`text-left text-gray-300 font-semibold py-4 px-6 ${column.className || ''}`}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="flex items-center space-x-2 hover:text-white transition-colors group"
                    >
                      <span>{column.header}</span>
                      <div className="flex flex-col">
                        <svg 
                          className={`w-3 h-3 ${
                            currentSortColumn === column.key && currentSortDirection === 'asc' 
                              ? 'text-purple-400' 
                              : 'text-gray-500'
                          }`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        <svg 
                          className={`w-3 h-3 -mt-1 ${
                            currentSortColumn === column.key && currentSortDirection === 'desc' 
                              ? 'text-purple-400' 
                              : 'text-gray-500'
                          }`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr 
                key={index} 
                className={`
                  border-b border-white/5 hover:bg-white/5 transition-colors
                  ${striped && index % 2 === 1 ? 'bg-white/5' : ''}
                `}
              >
                {columns.map((column) => (
                  <td 
                    key={column.key} 
                    className={`py-4 px-6 text-gray-300 ${column.className || ''}`}
                  >
                    {renderCell(column, item, index)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 