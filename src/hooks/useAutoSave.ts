import { useEffect, useRef, useCallback } from 'react';

interface AutoSaveOptions {
  key: string;
  delay?: number;
  onSave?: (data: any) => void;
  onLoad?: () => any;
}

export function useAutoSave<T>(
  data: T,
  options: AutoSaveOptions
) {
  const { key, delay = 2000, onSave, onLoad } = options;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialLoadRef = useRef(false);

  // Save to localStorage by default, or use custom onSave
  const saveData = useCallback(async (dataToSave: T) => {
    try {
      if (onSave) {
        await onSave(dataToSave);
      } else {
        localStorage.setItem(key, JSON.stringify({
          data: dataToSave,
          timestamp: Date.now(),
          version: '1.0'
        }));
      }
      console.log('✅ Auto-saved draft');
    } catch (error) {
      console.error('❌ Auto-save failed:', error);
    }
  }, [key, onSave]);

  // Load from localStorage by default, or use custom onLoad
  const loadData = useCallback((): T | null => {
    try {
      if (onLoad) {
        return onLoad();
      } else {
        const saved = localStorage.getItem(key);
        if (saved) {
          const parsed = JSON.parse(saved);
          // Check if data is not too old (24 hours)
          if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
            return parsed.data;
          }
        }
      }
    } catch (error) {
      console.error('❌ Auto-load failed:', error);
    }
    return null;
  }, [key, onLoad]);

  // Clear saved data
  const clearSavedData = useCallback(() => {
    try {
      if (onSave) {
        // For custom save handlers, we can't clear automatically
        console.log('Clear saved data via custom handler');
      } else {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error('❌ Clear saved data failed:', error);
    }
  }, [key, onSave]);

  // Auto-save effect
  useEffect(() => {
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      return; // Skip auto-save on initial render
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(() => {
      if (data) {
        saveData(data);
      }
    }, delay);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, delay, saveData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    loadData,
    saveData: (dataToSave: T) => saveData(dataToSave),
    clearSavedData
  };
} 