import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  addReview,
  updateReview,
  deleteReview,
  getReviewsByBook,
} from '../controllers/review.controller.js';

const router = express.Router();


router.post('/:bookId', protect, addReview);

router.get('/book/:bookId', getReviewsByBook);


router.put('/:id', protect, updateReview);


router.delete('/:id', protect, deleteReview);

export default router;
