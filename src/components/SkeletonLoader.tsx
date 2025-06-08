"use client";

import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  rounded?: boolean;
  count?: number;
}

export function Skeleton({ 
  width = '100%', 
  height = '1rem', 
  className = '', 
  rounded = false,
  count = 1 
}: SkeletonProps) {
  const skeletonClass = `
    bg-gradient-to-r from-gray-800 to-gray-700 
    animate-pulse
    ${rounded ? 'rounded-full' : 'rounded'}
    ${className}
  `;

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  if (count === 1) {
    return <div className={skeletonClass} style={style} />;
  }

  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={skeletonClass} style={style} />
      ))}
    </div>
  );
}

// Predefined skeleton components for common use cases
export function PostSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 space-y-4">
      <div className="flex items-center space-x-3">
        <Skeleton width={40} height={40} rounded />
        <div className="space-y-2 flex-1">
          <Skeleton width="30%" height="1rem" />
          <Skeleton width="20%" height="0.75rem" />
        </div>
      </div>
      <Skeleton count={3} height="1rem" />
      <Skeleton width="60%" height="1rem" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-lg border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="bg-white/5 p-4 border-b border-white/10">
        <div className="grid grid-cols-4 gap-4">
          <Skeleton height="1rem" />
          <Skeleton height="1rem" />
          <Skeleton height="1rem" />
          <Skeleton height="1rem" />
        </div>
      </div>
      
      {/* Rows */}
      <div className="divide-y divide-white/5">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="p-4">
            <div className="grid grid-cols-4 gap-4">
              <Skeleton height="1rem" />
              <Skeleton height="1rem" />
              <Skeleton height="1rem" />
              <Skeleton height="1rem" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 space-y-4">
      <Skeleton width="70%" height="1.5rem" />
      <Skeleton count={3} height="1rem" />
      <div className="flex justify-between items-center pt-4">
        <Skeleton width="30%" height="2rem" />
        <Skeleton width={80} height="2rem" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton width="40%" height="2rem" />
        <Skeleton width="60%" height="1rem" />
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TableSkeleton rows={8} />
        </div>
        <div className="space-y-6">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
          <div className={`max-w-xs space-y-2 ${index % 2 === 0 ? 'items-start' : 'items-end'}`}>
            <div className="flex items-center space-x-2">
              {index % 2 === 0 && <Skeleton width={32} height={32} rounded />}
              <Skeleton width="4rem" height="0.75rem" />
              {index % 2 === 1 && <Skeleton width={32} height={32} rounded />}
            </div>
            <div className={`p-3 rounded-lg ${index % 2 === 0 ? 'bg-white/5' : 'bg-purple-600/20'}`}>
              <Skeleton count={2} height="0.875rem" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 