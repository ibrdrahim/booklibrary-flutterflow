const { db } = require('../firebase');

class Book {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.author = data.author;
    this.year = data.year;
    this.genre = data.genre;
    this.createdBy = data.createdBy;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // Fetches all books for a specific user with offset-based pagination and filters
  static async getAllForUserWithOffset(userId, pageSize, offset, filters) {
    try {
      let query = db.collection('books').where('createdBy', '==', userId).orderBy('updatedAt', 'desc');

      filters.forEach(filter => {
        query = query.where(filter.field, filter.operator, filter.value);
      });

      const snapshot = await query.offset(offset).limit(pageSize).get();
      if (snapshot.empty) {
        return [];
      }

      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      throw new Error(`Error getting books: ${error.message}`);
    }
  }

  // Fetch a specific book by ID
  static async getById(bookId, userId) {
    try {
      const doc = await db.collection('books').doc(bookId).get();
      if (!doc.exists || doc.data().createdBy !== userId) {
        return null;
      }
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      throw new Error(`Error fetching book: ${error.message}`);
    }
  }

  // Creates a new book
  static async create(bookData) {
    try {
      const response = await db.collection('books').add(bookData);
      return { id: response.id, ...bookData };
    } catch (error) {
      throw new Error(`Error creating book: ${error.message}`);
    }
  }

  // Update a book by ID
  static async updateById(bookId, userId, updateData) {
    try {
      const bookDoc = db.collection('books').doc(bookId);
      const doc = await bookDoc.get();
      if (!doc.exists || doc.data().createdBy !== userId) {
        return null;
      }

      await bookDoc.update(updateData);
      return { id: bookId, ...updateData };
    } catch (error) {
      throw new Error(`Error updating book: ${error.message}`);
    }
  }

  // Delete a book by ID
  static async deleteById(bookId, userId) {
    try {
      const bookDoc = db.collection('books').doc(bookId);
      const doc = await bookDoc.get();
      if (!doc.exists || doc.data().createdBy !== userId) {
        return null;
      }

      await bookDoc.delete();
      return { message: 'Book deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting book: ${error.message}`);
    }
  }
}

module.exports = Book;
