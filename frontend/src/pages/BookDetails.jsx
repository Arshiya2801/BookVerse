// src/pages/BookDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import Layout from '../components/Layout';
import ReviewItem from '../components/ReviewItem';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../utils/ProtectedRoute';

export default function BookDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [editingReview, setEditingReview] = useState(null);

  const fetchAll = async () => {
    try {
      const { data: bookData } = await API.get(`/books/${id}`);
      setBook(bookData);
      const { data: revs } = await API.get(`/reviews/book/${id}`);
      setReviews(revs);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch book');
    }
  };

  useEffect(() => { fetchAll(); }, [id]);

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      if (editingReview) {
        // update review
        await API.put(`/reviews/${editingReview._id}`, { rating, reviewText });
        setEditingReview(null);
      } else {
        await API.post(`/reviews/${id}`, { rating, reviewText });
      }
      setReviewText('');
      setRating(5);
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit review');
    }
  };

  const handleEdit = (rev) => {
    setEditingReview(rev);
    setRating(rev.rating);
    setReviewText(rev.reviewText);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteReview = async (rev) => {
    if (!confirm('Delete this review?')) return;
    try {
      await API.delete(`/reviews/${rev._id}`);
      fetchAll();
    } catch (err) {
      alert('Failed to delete review');
    }
  };

  const handleDeleteBook = async () => {
    if (!confirm('Delete this book?')) return;
    try {
      await API.delete(`/books/${id}`);
      navigate('/books');
    } catch (err) {
      alert('Failed to delete book');
    }
  };

  if (!book) return <Layout><div>Loading...</div></Layout>;

  const isOwner = user && book.addedBy && user.id === String(book.addedBy._id || book.addedBy);

  return (
    <Layout>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{book.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-300">{book.author} • {book.genre} • {book.year}</p>
            <p className="mt-3">{book.description}</p>
            <div className="mt-3">⭐ {book.averageRating?.toFixed(1) || '0.0'} ({book.reviewCount || 0} reviews)</div>
          </div>

          <div className="flex flex-col space-y-2">
            {isOwner && <>
              <button onClick={() => navigate(`/edit/${id}`)} className="px-3 py-1 rounded bg-blue-600 text-white">Edit</button>
              <button onClick={handleDeleteBook} className="px-3 py-1 rounded bg-red-500 text-white">Delete</button>
            </>}
          </div>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-3">Reviews</h2>

        {reviews.length === 0 && <div className="text-gray-500">No reviews yet. Be the first!</div>}
        <div className="space-y-2">
          {reviews.map(r => (
            <ReviewItem
              key={r._id}
              review={r}
              isOwner={user && r.userId && String(r.userId._id) === (user.id || user._id)}
              onEdit={handleEdit}
              onDelete={handleDeleteReview}
            />
          ))}
        </div>

        <div className="mt-6 max-w-md">
          <h3 className="text-lg font-semibold">{editingReview ? 'Edit your review' : 'Add a review'}</h3>

          {!user ? (
            <div className="text-sm text-gray-600">You must <a href="/login" className="text-purple-600">login</a> to add a review.</div>
          ) : (
            <form onSubmit={submitReview} className="space-y-3 mt-3">
              <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="border p-2 rounded w-32">
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} ★</option>)}
              </select>
              <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} rows={4} required className="w-full border p-2 rounded" placeholder="Write your review..." />
              <div className="flex space-x-2">
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">{editingReview ? 'Update' : 'Submit'}</button>
                {editingReview && <button type="button" onClick={() => { setEditingReview(null); setRating(5); setReviewText(''); }} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>}
              </div>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}
