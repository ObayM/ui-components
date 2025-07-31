'use client';

import React, { useState } from 'react';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  initialTab?: number;
}

export const Tabs = ({ tabs, initialTab = 0 }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div>
      <div className="border-b border-gray-700">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 
                        ${
                          activeTab === index
                            ? 'border-b-2 border-purple-400 text-white'
                            : 'text-gray-400 hover:text-gray-200'
                        }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tabs.map((tab, index) => (
          <div key={tab.label} className={activeTab === index ? 'block' : 'hidden'}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};