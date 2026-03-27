// Typed wrapper around chrome.storage.sync

/**
 * Get a value from chrome.storage.sync with a default fallback.
 */
export async function getStorageValue<T>(key: string, defaultValue: T): Promise<T> {
  return new Promise((resolve) => {
    chrome.storage.sync.get({ [key]: defaultValue }, (result) => {
      resolve(result[key] as T);
    });
  });
}

/**
 * Set a value in chrome.storage.sync.
 */
export async function setStorageValue<T>(key: string, value: T): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.sync.set({ [key]: value }, () => {
      resolve();
    });
  });
}

/**
 * Remove a value from chrome.storage.sync.
 */
export async function removeStorageValue(key: string): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.sync.remove(key, () => {
      resolve();
    });
  });
}
