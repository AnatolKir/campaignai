'use client';

import React, { useState } from 'react';

export default function TestEditor() {
  const [text, setText] = useState('Click the buttons below!');
  const [clickCount, setClickCount] = useState(0);

  const handleTestClick = () => {
    console.log('TEST BUTTON CLICKED!');
    alert('Button clicked!');
    setClickCount(prev => prev + 1);
    setText(`Button clicked ${clickCount + 1} times!`);
  };

  const handleBoldTest = () => {
    console.log('BOLD TEST CLICKED!');
    setText(prev => `**${prev}**`);
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg">
      <h3 className="text-white mb-4">Click Test</h3>
      
      <div className="mb-4">
        <button
          onClick={handleTestClick}
          className="mr-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          style={{ backgroundColor: 'red', color: 'white', padding: '8px 16px' }}
        >
          Test Click (Count: {clickCount})
        </button>
        
        <button
          onClick={handleBoldTest}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Bold Markers
        </button>
      </div>
      
      <div className="p-3 bg-gray-900 text-white rounded">
        {text}
      </div>
      
      <div className="mt-2 text-sm text-gray-400">
        If buttons work, you should see alerts and text changes above.
      </div>
    </div>
  );
} 