import request from "supertest";
import app from "../index";
import { Book } from "../models/bookModel";

// mock book model to prevent db operations during tests.
// this is crucial for unit testing controllers in isolation.
jest.mock("../models/bookModel", () => ({
  Book: {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),

    prototype: {
      save: jest.fn(function () {
        return Promise.resolve(this);
      }),
    },
  },
}));

// cast mocked mook model
const MockedBook = Book as jest.Mocked<typeof Book>;

describe("Book API Endpoints", () => {
  // clear mocks before each test to ensure test isolation.
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // test suite for POST /books (postBook)
  describe("POST /books", () => {
    it("should create a new book", async () => {
      const newBookData = {
        title: "Amazing book",
        authorId: "author123",
        genreId: "genre456",
        publishedYear: 2023,
        isbn: "123-456-7890",
        pageCount: 300,
        description: "This is an amazing book",
        reviews: [],
      };
      const createdBook = { _id: "mockBookId1", ...newBookData };

      // configure the mock 'save' method to return the expected created book
      // this will simulates a successful save operation to the db
      MockedBook.prototype.save.mockResolvedValueOnce(createdBook);

      const res = await request(app).post("/books").send(newBookData);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toEqual(createdBook);
      expect(MockedBook).toHaveBeenCalledWith(newBookData);
      // verify that  save method was called once
      expect(MockedBook.prototype.save).toHaveBeenCalledTimes(1);
    });

    it("should return 400 if required fields are missing", async () => {
      const newBookData = {
        authorId: "author123",
      };

      // simulate a mongoose validation error by rejecting the save operation
      MockedBook.prototype.save.mockRejectedValueOnce(
        new Error("Validation failed")
      );

      const res = await request(app).post("/books").send(newBookData);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message", "Error adding new book");
    });
  });

  // test suite to GET /books (getBooks)
  describe("GET /books", () => {
    it("should return all books", async () => {
      const books = [
        { _id: "b1", title: "Book One", authorId: "a1" },
        { _id: "b2", title: "Book Two", authorId: "a2" },
      ];
      // this simulates fetching all books from the db
      MockedBook.find.mockResolvedValueOnce(books);

      const res = await request(app).get("/books");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(books);
      expect(MockedBook.find).toHaveBeenCalledTimes(1);
    });

    it("should return 500 if fetching books fails", async () => {
      MockedBook.find.mockRejectedValueOnce(new Error("Database error"));

      const res = await request(app).get("/books");

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty("message", "Failed to fetch books");
    });
  });

  // test suite for GET /books/:id (getBookById)
  describe("GET /books/:id", () => {
    it("should return a book by ID", async () => {
      const bookId = "mockBookId123";
      const book = { _id: bookId, title: "Test Book", authorId: "testAuthor" };

      MockedBook.findById.mockResolvedValueOnce(book);

      const res = await request(app).get(`/books/${bookId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(book);
      expect(MockedBook.findById).toHaveBeenCalledWith(bookId);
    });

    it("should return 200 with null if book not found", async () => {
      const bookId = "nonExistentBookId";
      // simulate a not found by returning null
      MockedBook.findById.mockResolvedValueOnce(null);

      const res = await request(app).get(`/books/${bookId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeNull();
      expect(MockedBook.findById).toHaveBeenCalledWith(bookId);
    });

    it("should return 500 if fetching book by ID fails", async () => {
      const bookId = "someId";

      MockedBook.findById.mockRejectedValueOnce(new Error("DB error"));
      const res = await request(app).get(`/books/${bookId}`);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty("message", "Failed to fetch book");
    });
  });

  // test suite for PUT /books/:id (updateBook)
  describe("PUT /books/:id", () => {
    it("should update a book by ID", async () => {
      const bookId = "mockBookId123";
      const updatedData = { title: "Updated Book Title", pageCount: 350 };
      const updatedBook = {
        _id: bookId,
        ...updatedData,
        authorId: "testAuthor",
      };

      MockedBook.findByIdAndUpdate.mockResolvedValueOnce(updatedBook);

      const res = await request(app).put(`/books/${bookId}`).send(updatedData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(updatedBook);
      expect(MockedBook.findByIdAndUpdate).toHaveBeenCalledWith(
        bookId,
        updatedData,
        {
          new: true,
          runValidators: true,
        }
      );
    });

    it("should return 404 if book to update is not found", async () => {
      const bookId = "nonExistentId";
      // simulate no book being found for update
      MockedBook.findByIdAndUpdate.mockResolvedValueOnce(null);

      const res = await request(app)
        .put(`/books/${bookId}`)
        .send({ title: "New Title" });

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message", "Book not found");
    });

    it("should return 500 if updating book fails", async () => {
      const bookId = "someId";
      MockedBook.findByIdAndUpdate.mockRejectedValueOnce(
        new Error("Update error")
      );

      const res = await request(app)
        .put(`/books/${bookId}`)
        .send({ title: "New Title" });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty("message", "Failed to update book");
    });
  });

  // test suite for DELETE /books/:id (deleteBook)
  describe("DELETE /books/:id", () => {
    it("should delete a book by ID", async () => {
      const bookId = "mockBookId123";
      const deletedBook = { _id: bookId, title: "Deleted Book" };
      // simulate book deletion
      MockedBook.findByIdAndDelete.mockResolvedValueOnce(deletedBook);

      const res = await request(app).delete(`/books/${bookId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message", "Book deleted successfully");
      expect(MockedBook.findByIdAndDelete).toHaveBeenCalledWith(bookId);
    });

    it("should return 404 if book to delete is not found", async () => {
      const bookId = "nonExistentId";
      // simulate book not found
      MockedBook.findByIdAndDelete.mockResolvedValueOnce(null);

      const res = await request(app).delete(`/books/${bookId}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty("message", "Book not found");
    });

    it("should return 500 if deleting book fails", async () => {
      const bookId = "someId";

      MockedBook.findByIdAndDelete.mockRejectedValueOnce(
        new Error("Delete error")
      );

      const res = await request(app).delete(`/books/${bookId}`);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty("message", "Failed to delete book");
    });
  });
});
