import React from 'react';

export const Contribute: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 p-6 mt-12">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-sm">
          Found a bug or have a suggestion? 
          <a href="github.com/ObayM/ui-components/" className="text-blue-400 hover:underline ml-1">
            Contribute on GitHub if you like this project!
            </a>
        </p>
        <p className="text-xs mt-2">
          © {new Date().getFullYear()} UI Components. All rights reserved.
        </p>
        </div>

    </footer>
    );
};
