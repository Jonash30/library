import { Library } from "./classes";
import { updateTotalBooks, updateBooksRead, updateBooksUnread } from "./utils";
import { IBook } from "../interface/class";

const DisplayBookCard = (books: IBook[]) => {
  const mainContent = <HTMLElement>document.querySelector(".main-content");
  mainContent.innerHTML = "";

  books.forEach((book, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-index", `${index}`);
    card.innerHTML = `
    <div class="line-color"></div>
        <div class="card-container">
            <div class="card-upper-section">
                <div class="title-container">
                    <h1 class="title">${book.title}</h1>
                    <h3 class="pages">${book.page} Pages</h3>  
                </div>
                <h2 class="author">By ${book.author}</h2>
                <p class="description">${book.description}</p>
            </div>
            <div class="card-footer">
                <div class="read-container">
                    <span class="read-status">${book.read === "yes" ? "Read" : "Unread"}</span>
                    <div class="card-footer-icons">
                        <button class="delete-book-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 448 512" >
                                <path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z"/ fill="#DC2626">
                            </svg>
                        </button>
                        <button class="read-btn">
                            <div class="btn-indicator ${book.read === "yes" ? " " : "toggle"} "></div>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    `;

    if (book.read === "yes") {
      card.style.boxShadow = "4px 4px 5px 1px rgba(21, 179, 0, 0.3)";
    } else {
      card.style.boxShadow = "4px 4px 5px 1px rgba(255, 0, 0, 0.3)";
    }

    const deleteBtn = card.querySelector(".delete-book-btn") as HTMLElement | null;
    const readBtn = card.querySelector(".read-btn") as HTMLElement | null;

    deleteBtn?.addEventListener("click", () => {
      Library.removeBook(index);
      DisplayBookCard(Library.getBooks());
      updateTotalBooks();
      updateBooksRead();
      updateBooksUnread();
    });

    readBtn?.addEventListener("click", () => {
      Library.toggleReadStatus(index);
      changeReadStatus(book, card);
    });

    mainContent.appendChild(card);
  });
};

const changeReadStatus = (book: IBook, card: HTMLDivElement) => {
  const readStatus = <HTMLElement>card.querySelector(".read-status");
  const btnIndicator = card.querySelector(".btn-indicator") as HTMLElement | null;

  if (book.read === "yes") {
    card.style.boxShadow = "4px 4px 5px 1px rgba(21, 179, 0, 0.3)";
  } else {
    card.style.boxShadow = "4px 4px 5px 1px rgba(255, 0, 0, 0.3)";
  }

  readStatus.textContent = book.read === "yes" ? "Read" : "Unread";
  btnIndicator?.classList.toggle("toggle");

  updateBooksRead();
  updateBooksUnread();
};

export default DisplayBookCard;
