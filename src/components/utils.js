import { Library } from "./classes";

// function for updating total books
const updateTotalBooks = () => {
  const totalBooks = Library.getBooks().length;
  document.querySelector(".total-books").textContent = totalBooks;
};

// function for updating read books
const updateBooksRead = () => {
  const booksRead = Library.getBooks().filter(
    (book) => book.read === "yes",
  ).length;
  document.querySelector(".books-read").textContent = booksRead;
};

// function for updating unread books
const updateBooksUnread = () => {
  const unRead = document.querySelector(".books-unread");
  const unReadCount = Library.getBooks().filter(
    (book) => book.read === "no",
  ).length;
  unRead.textContent = unReadCount;
};

export { updateTotalBooks, updateBooksRead, updateBooksUnread };
