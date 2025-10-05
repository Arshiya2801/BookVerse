// src/components/Navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="container mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-purple-600 dark:text-purple-300">📚 BookVerse</Link>

        <nav className="flex items-center space-x-4">
          <NavLink to="/books" className={({isActive}) => (isActive ? 'underline' : '')}>Books</NavLink>
          {user ? (
            <>
              <NavLink to="/add" className={({isActive}) => (isActive ? 'underline' : '')}>Add Book</NavLink>
              <NavLink to="/profile" className={({isActive}) => (isActive ? 'underline' : '')}>{user.name}</NavLink>
              <button onClick={logout} className="text-sm text-red-500">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({isActive}) => (isActive ? 'underline' : '')}>Login</NavLink>
              <NavLink to="/signup" className={({isActive}) => (isActive ? 'underline' : '')}>Signup</NavLink>
            </>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
