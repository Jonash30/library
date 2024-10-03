import { IBook } from "../interface/class";

class Book implements IBook {
  title;
  author;
  page;
  description;
  read;

  constructor(title: string, author: string, page: string | number, description: string, read: "yes" | "no") {
    this.title = title;
    this.author = author;
    this.page = page;
    this.description = description;
    this.read = read;
  }
}

// Library class
class Library{
  static myLibrary: IBook[] = [];

  static addBook(book: IBook) {
    Library.myLibrary.push(book);
  }

  static removeBook(index: number) {
    Library.myLibrary.splice(index, 1);
  }

  static toggleReadStatus(index: number) {
    const book = Library.myLibrary[index];
    book.read = book.read === "yes" ? "no" : "yes";
  }

  static getBooks(): IBook[] {
    return Library.myLibrary;
  }
}

export { Library, Book };
