import { useState, useEffect } from 'react';
import { getStorageValue, setStorageValue } from '../utils/storage';

export default function App() {
  const [greeting, setGreeting] = useState('Hello from Vextro!');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getStorageValue<string>('greeting', 'Hello from Vextro!').then(setGreeting);
  }, []);

  const handleSave = async () => {
    await setStorageValue('greeting', greeting);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-900 font-sans">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Vextro Extension Settings</h1>

        {/* Greeting Setting */}
        <div className="bg-white rounded-lg shadow p-6 mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Greeting Message</label>
          <input
            type="text"
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter your greeting..."
          />
          <p className="text-xs text-gray-500 mt-1">
            This greeting appears in the popup. It's stored using chrome.storage.sync.
          </p>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors text-white px-6 py-2.5 rounded-md font-medium"
        >
          Save Settings
        </button>

        {saved && (
          <span className="ml-3 text-green-600 text-sm font-medium">✔ Saved successfully!</span>
        )}

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h2 className="text-sm font-semibold text-blue-800 mb-1">About Vextro</h2>
          <p className="text-sm text-blue-700">
            This extension was scaffolded with{' '}
            <a
              href="https://github.com/CodeCanvasCollective/vextro"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              create-vextro
            </a>
            . Edit this page in{' '}
            <code className="bg-blue-100 px-1 rounded">src/options/App.tsx</code>.
          </p>
        </div>
      </div>
    </div>
  );
}
