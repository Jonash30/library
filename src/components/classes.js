class Book {
  constructor(title, author, page, description, read) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.description = description;
    this.read = read;
  }
}

// Library class
class Library {
  static myLibrary = [];

  static addBook(book) {
    Library.myLibrary.push(book);
  }

  static removeBook(index) {
    Library.myLibrary.splice(index, 1);
  }

  static toggleReadStatus(index) {
    const book = Library.myLibrary[index];
    book.read = book.read === "yes" ? "no" : "yes";
  }

  static getBooks() {
    return Library.myLibrary;
  }
}

export { Library, Book };
