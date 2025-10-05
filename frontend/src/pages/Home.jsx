// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <section className="rounded-lg p-8 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-900">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-700 dark:text-purple-300 mb-3">Welcome to BookVerse 📚</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">Discover, review, and share your favourite books. Sign up to add books and leave reviews.</p>
        <Link to="/books" className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-700 transition">Browse Books</Link>
      </section>
    </Layout>
  );
}
