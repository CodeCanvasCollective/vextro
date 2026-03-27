import { useState, useEffect } from 'react';
import { getStorageValue, setStorageValue } from '../utils/storage';

export default function App() {
  const [count, setCount] = useState(0);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Load saved count from chrome.storage
    getStorageValue<number>('clickCount', 0).then(setCount);
    getStorageValue<string>('greeting', 'Hello from Vextro!').then(setGreeting);
  }, []);

  const handleClick = async () => {
    const newCount = count + 1;
    setCount(newCount);
    await setStorageValue('clickCount', newCount);
  };

  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <div className="w-[320px] min-h-[280px] p-5 bg-gray-900 text-white font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <img src="/icon.png" alt="Vextro Logo" className="w-6 h-6" />
          <h1 className="text-lg font-semibold">Vextro</h1>
        </div>
        <button
          onClick={openOptionsPage}
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          ⚙️ Settings
        </button>
      </div>

      {/* Greeting */}
      <p className="text-sm text-gray-400 mb-4">{greeting}</p>

      {/* Counter Demo */}
      <div className="bg-gray-800 p-4 rounded-lg text-center">
        <p className="text-sm text-gray-400 mb-2">Clicks (synced via chrome.storage)</p>
        <p className="text-3xl font-bold text-blue-400 mb-3">{count}</p>
        <button
          onClick={handleClick}
          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors py-2 px-4 rounded-md font-medium"
        >
          Click Me
        </button>
      </div>

      {/* Footer */}
      <p className="text-xs text-gray-600 text-center mt-4">
        Built with Vextro — Vite + React + Tailwind
      </p>
    </div>
  );
}
