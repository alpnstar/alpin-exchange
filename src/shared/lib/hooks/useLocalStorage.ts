import { useEffect, useState, useCallback } from "react";

// --- Типизация ---
type SetValue<T> = (value: T | ((prevValue: T) => T)) => void;

// --- Событие для синхронизации между вкладками ---
const dispatchStorageEvent = <T,>(key: string, newValue: T | null) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new StorageEvent("storage", { key, newValue: JSON.stringify(newValue) }));
  }
};

// --- Хук useLocalStorage ---
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] {
  // --- Получение начального значения ---
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  // --- Состояние ---
  const [storedValue, setStoredValue] = useState<T>(readValue);

  // --- Функция для обновления значения ---
  const setValue: SetValue<T> = useCallback(
    (value) => {
      if (typeof window === 'undefined') {
        console.warn(`Tried to set localStorage key “${key}” even though no window was found.`);
        return;
      }

      try {
        const newValue = value instanceof Function ? value(storedValue) : value;
        window.localStorage.setItem(key, JSON.stringify(newValue));
        setStoredValue(newValue);
        dispatchStorageEvent(key, newValue);
      } catch (error) {
        console.warn(`Error setting localStorage key “${key}”:`, error);
      }
    },
    [key, storedValue]
  );

  // --- Синхронизация между вкладками и компонентами ---
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== JSON.stringify(storedValue)) {
        setStoredValue(readValue());
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, readValue, storedValue]);

  return [storedValue, setValue];
}
