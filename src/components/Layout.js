import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="App min-h-screen bg-gradient-to-b from-blue-500 to-blue-700 flex flex-col">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex-grow">
        <header className="text-center mb-12">
          <Link to="/">
            <img 
              src="/fretbets-logo.png" 
              alt="FretBets Logo" 
              className="mx-auto mb-6 w-40 h-auto"
            />
          </Link>
          <h1 className="text-5xl font-extrabold text-white mb-2 shadow-text">
            Welcome to FretBets
          </h1>
          <p className="text-2xl font-light text-blue-100 shadow-text">
            Your premier social betting platform
          </p>
        </header>
        <main>{children}</main>
      </div>
      <footer className="mt-auto py-4 text-center text-white text-sm">
        <p>&copy; {currentYear} FretBets. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;