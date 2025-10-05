import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
} from '../controllers/book.controller.js';

const router = express.Router();


router.get('/', getBooks);
router.get('/:id', getBookById);

router.post('/', protect, addBook);
router.put('/:id', protect, updateBook);
router.delete('/:id', protect, deleteBook);

export default router;
