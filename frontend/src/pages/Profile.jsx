
import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        
        const { data } = await API.get('/books?page=1');
        setBooks((data.books || []).filter(b => String(b.addedBy?._id || b.addedBy) === (user?.id || user?._id)));
        
        const { data: allBooks } = await API.get('/books?page=1');
      } catch (err) {
        console.error(err);
      }
    })();
  }, [user]);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>

      <section className="mt-6">
        <h3 className="text-xl font-semibold mb-3">Your Books</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {books.length === 0 ? <div className="text-gray-500">You have not added any books yet.</div> :
            books.map(b => (
              <div key={b._id} className="p-3 bg-white dark:bg-gray-800 rounded shadow">
                <h4 className="font-semibold">{b.title}</h4>
                <p className="text-sm text-gray-400">{b.author}</p>
                <div className="mt-2">
                  <Link to={`/books/${b._id}`} className="text-purple-600">View</Link>
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </Layout>
  );
}
