import { Book, Library } from "./classes";
import DisplayBookCard from "./renderBookCard";
import { updateTotalBooks, updateBooksRead, updateBooksUnread } from "./utils";

const AddBookModal = () => {
  const main = <HTMLElement>document.querySelector("main");
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  overlay.innerHTML = `
    <div class="modal-container">
        <div class="close-btn-container">
            <button class="close-btn">
                <svg width="30" height="30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="close-btn">
                    <path d="M26.6666 79.1667L20.8333 73.3333L44.1666 50L20.8333 26.6667L26.6666 20.8333L49.9999 44.1667L73.3333 20.8333L79.1666 26.6667L55.8332 50L79.1666 73.3333L73.3333 79.1667L49.9999 55.8333L26.6666 79.1667Z" fill="#666666"/>
                </svg>    
            </button>
        </div>
        <form action="" novalidate class="form">
            <div class="form-container">
                <input type="text" id="title" placeholder="Title" required autocomplete="off">
                <input type="text" id="author" placeholder="Author" required autocomplete="off">
                <input type="number" id="pages" placeholder="Pages" required autocomplete="off">
                <textarea name="description" id="description" placeholder="Book description" rows="3" required></textarea>
                <span>Have you read the book?</span>
                <div class="read-option-container">
                    <div>
                        <input type="radio" id="yes" value="yes" name="group1">
                        <label for="yes">Yes</label>
                    </div>
                    
                    <div>
                        <input type="radio" id="no" value="no" name="group1">
                        <label for="no">No</label>
                    </div>
                </div>
                <div>
                    <input type="submit" value="Add Book" class="add-book-btn" id="add-book-btn">
                </div>
            </div>
        </form>
    </div>
    `;

  main.appendChild(overlay);

  const addBookBtn = <HTMLElement>document.querySelector(".add-book");
  const closeBtn = <HTMLElement>document.querySelector(".close-btn");
  const form = document.querySelector("form") as HTMLFormElement | null;

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    formSubmission();
    form.reset();
  });

  addBookBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
};

enum ReadStatus {
  Yes = "yes",
  No = "no"
}

const formSubmission = () => {
  const titleElement = <HTMLInputElement>document.getElementById("title");
  const authorElement = <HTMLInputElement>document.getElementById("author");
  const pageElement = <HTMLInputElement>document.getElementById("pages");
  const descriptionElement = <HTMLInputElement>document.getElementById("description");
  const readElement = <HTMLInputElement>document.querySelector('input[name="group1"]:checked');

  if(titleElement && authorElement && pageElement && descriptionElement && readElement){
    const title = titleElement.value;
    const author = authorElement.value;
    const page = pageElement.value;
    const description = descriptionElement.value;
    const readValue = readElement.value;

    const read: ReadStatus = readValue === ReadStatus.Yes ? ReadStatus.Yes : ReadStatus.No;

    const newBook = new Book(title, author, page, description, read);
    Library.addBook(newBook);
    closeModal();
    DisplayBookCard(Library.getBooks());
    updateTotalBooks();
    updateBooksRead();
    updateBooksUnread();
  }
};

const openModal = () => {
  const modal = <HTMLDivElement>document.querySelector(".overlay");
  const modalContainer = <HTMLDivElement>document.querySelector(".modal-container");
  modal.classList.add("open");
  modalContainer.classList.add("open");
};

const closeModal = () => {
  const modal = <HTMLDivElement>document.querySelector(".overlay");
  const modalContainer = <HTMLDivElement>document.querySelector(".modal-container");
  modal.classList.remove("open");
  modalContainer.classList.remove("open");
};

export default AddBookModal;
