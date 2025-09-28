const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho", year: 1988 },
  { id: 2, title: "Wings of Fire", author: "A.P.J. Abdul Kalam", year: 1999 }
];

app.get("/", (req, res) => {
  res.send("Hello — Books API is running!");
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.post("/books", (req, res) => {
  const { title, author, year } = req.body;
  const newBook = { id: books.length + 1, title, author, year };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.patch("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  const { title, author, year } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;
  if (year) book.year = year;
  res.json(book);
});

app.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);
  books = books.filter(b => b.id !== id);
  res.json({ message: "Book deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

