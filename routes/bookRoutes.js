const express = require('express');
const router = express.Router();
const Book = require('../models/book');  // Ensure this path is correct and that Book.js exports a Book class
const {authenticate} = require('../middleware/authenticate');


// Secure all endpoints with authentication middleware
router.use(authenticate);

// Get all books with pagination and optional filters for the logged-in user
router.get('/', authenticate, async (req, res) => {
  try {
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
    const offset = parseInt(req.query.offset) || 0; // Get offset from query or default to 0
    const filters = buildFilters(req.query);
    const books = await Book.getAllForUserWithOffset(req.user.uid, pageSize, offset, filters);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific book by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const book = await Book.getById(req.params.id, req.user.uid);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new book
router.post('/', authenticate, async (req, res) => {
  const bookData = {
    ...req.body,
    createdBy: req.user.uid,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  try {
    const newBook = await Book.create(bookData);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a book by ID
router.patch('/:id', authenticate, async (req, res) => {
  const updates = {
    ...req.body,
    updatedAt: new Date()
  };
  try {
    const updatedBook = await Book.updateById(req.params.id, req.user.uid, updates);
    if (updatedBook) {
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a book by ID
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const result = await Book.deleteById(req.params.id, req.user.uid);
    if (result) {
      res.json({ message: 'Book deleted successfully' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper function to build filters from query parameters
function buildFilters(queryParams) {
  const filters = [];
  for (const key in queryParams) {
    if (['author', 'year', 'genre'].includes(key)) {
      filters.push({ field: key, operator: '==', value: queryParams[key] });
    }
  }
  return filters;
}

module.exports = router;