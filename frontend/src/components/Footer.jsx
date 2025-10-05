
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-center py-4 text-gray-700 dark:text-gray-300">
      <div className="container mx-auto px-4">
        <p>© {new Date().getFullYear()} BookVerse. All rights reserved.</p>
      </div>
    </footer>
  );
}
