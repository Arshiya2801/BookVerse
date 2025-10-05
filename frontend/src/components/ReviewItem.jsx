// src/components/ReviewItem.jsx
import React from 'react';

export default function ReviewItem({ review, onEdit, onDelete, isOwner }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-3">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-semibold">{review.userId?.name || 'Unknown'}</div>
          <div className="text-yellow-500">⭐ {review.rating}</div>
          <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">{review.reviewText}</div>
          <div className="text-xs text-gray-400 mt-1">{new Date(review.createdAt).toLocaleString()}</div>
        </div>
        {isOwner && (
          <div className="flex flex-col space-y-1 ml-4">
            <button onClick={() => onEdit(review)} className="text-sm text-blue-600">Edit</button>
            <button onClick={() => onDelete(review)} className="text-sm text-red-600">Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
