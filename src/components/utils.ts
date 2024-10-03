import { Library } from "./classes";

// function for updating total books
const updateTotalBooks = (): void => {
  const totalBooks = Library.getBooks().length;
  const totalBooksText = <HTMLParagraphElement>document.querySelector(".total-books");
  totalBooksText.textContent = `${totalBooks}`;
};

// function for updating read books
const updateBooksRead = () => {
  const booksRead = Library.getBooks().filter(
    (book) => book.read === "yes",
  ).length;
  const booksReadText = <HTMLParagraphElement>document.querySelector(".books-read");
  booksReadText.textContent = `${booksRead}`;
};

// function for updating unread books
const updateBooksUnread = () => {
  const unRead = <HTMLParagraphElement>document.querySelector(".books-unread");
  const unReadCount = Library.getBooks().filter(
    (book) => book.read === "no",
  ).length;
  unRead.textContent = `${unReadCount}`;
};

export { updateTotalBooks, updateBooksRead, updateBooksUnread };
