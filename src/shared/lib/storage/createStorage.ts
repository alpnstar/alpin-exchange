type Listener<T> = (value: T | null) => void;

export interface IStorage<T> {
  get: () => T | null;
  set: (value: T) => void;
  remove: () => void;
  subscribe: (listener: Listener<T>) => () => void;
}

export function createStorage<T>(key: string): IStorage<T> {
  const listeners = new Set<Listener<T>>();

  const get = (): T | null => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage for key "${key}":`, error);
      return null;
    }
  };

  const set = (value: T): void => {
    try {
      const serializedValue = JSON.stringify(value);
      window.localStorage.setItem(key, serializedValue);
      listeners.forEach(listener => listener(value));
    } catch (error) {
      console.error(`Error writing to localStorage for key "${key}":`, error);
    }
  };

  const remove = (): void => {
    try {
      window.localStorage.removeItem(key);
      listeners.forEach(listener => listener(null));
    } catch (error) {
      console.error(`Error removing from localStorage for key "${key}":`, error);
    }
  };

  const subscribe = (listener: Listener<T>): () => void => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  return { get, set, remove, subscribe };
}
