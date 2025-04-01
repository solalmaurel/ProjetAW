import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white p-4">
        <h1 className="text-2xl">Welcome to My React App</h1>
      </header>
      <main className="flex-1 p-4">
        <p className="text-gray-700">This is a simple TSX page to test your React installation with Tailwind CSS.</p>
      </main>
      <footer className="bg-gray-200 p-4 text-center">
        <p>&copy; 2023 My React App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;