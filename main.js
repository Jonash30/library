class Book{
  constructor(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}


class Library{
  constructor(){
    this.myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];
    if (!Array.isArray(this.myLibrary)) {
      this.myLibrary = [];
    }
    this.totalBooks = 0;
    this.readBooks = 0;
  }

  addBookToLibrary(book) {
    this.myLibrary.push(book);
    this.displayBooks();
    this.updateTotalBooks();
    this.updateReadBooks();
    this.updateUnreadBooks();
  
    localStorage.setItem('myLibrary', JSON.stringify(this.myLibrary));
  }

  displayBooks() {
    const bookContainer = document.getElementById('bookContainer');
    bookContainer.innerHTML = '';
    localStorage.setItem('myLibrary', JSON.stringify(this.myLibrary));
  
    this.myLibrary.forEach((book, index) => {
      const bookCard = document.createElement('div');
      bookCard.classList.add('book-card');
      bookCard.setAttribute('data-index', index);
      bookCard.innerHTML = `
        <span class="card-title">"${book.title}"</span>
        <span class="card-author">By: ${book.author}</span>
        <span class="card-pages">${book.pages} Pages</span>
        <div class="card-footer">
          <div class="mark-read">
            <span data-read="${book.read === 'yes' ? 'yes' : 'no'}">
            ${book.read === 'yes' ? 'Mark as Unread' : 'Mark as Read'}
            </span>
            <div class="read-btn">
              <div class="btn-indicator ${book.read === 'yes' ? 'toggle' : ''}">
                <div class="btn-icon-container">
                <svg width="15" height="15" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="eye-off">
                  <path d="M49.292 37.5L62.5003 50.6667V50C62.5003 46.6848 61.1834 43.5054 58.8392 41.1612C56.495 38.817 53.3155 37.5 50.0003 37.5H49.292ZM31.3753 40.8333L37.8337 47.2917C37.6253 48.1667 37.5003 49.0417 37.5003 50C37.5003 53.3152 38.8173 56.4946 41.1615 58.8388C43.5057 61.183 46.6851 62.5 50.0003 62.5C50.917 62.5 51.8337 62.375 52.7087 62.1667L59.167 68.625C56.3753 70 53.292 70.8333 50.0003 70.8333C44.475 70.8333 39.1759 68.6384 35.2689 64.7314C31.3619 60.8244 29.167 55.5253 29.167 50C29.167 46.7083 30.0003 43.625 31.3753 40.8333ZM8.33366 17.7917L17.8337 27.2917L19.7087 29.1667C12.8337 34.5833 7.41699 41.6667 4.16699 50C11.3753 68.2917 29.167 81.25 50.0003 81.25C56.4587 81.25 62.6253 80 68.2503 77.75L70.042 79.5L82.2087 91.6667L87.5003 86.375L13.6253 12.5M50.0003 29.1667C55.5257 29.1667 60.8247 31.3616 64.7317 35.2686C68.6387 39.1756 70.8337 44.4747 70.8337 50C70.8337 52.6667 70.292 55.25 69.3337 57.5833L81.542 69.7917C87.792 64.5833 92.792 57.75 95.8337 50C88.6253 31.7083 70.8337 18.75 50.0003 18.75C44.167 18.75 38.5837 19.7917 33.3337 21.6667L42.3753 30.625C44.7503 29.7083 47.292 29.1667 50.0003 29.1667Z" fill="black"/>
                </svg>
                <svg width="15" height="15" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="eye-on">
                  <path d="M50.0003 37.5C46.6851 37.5 43.5057 38.817 41.1615 41.1612C38.8173 43.5054 37.5003 46.6848 37.5003 50C37.5003 53.3152 38.8173 56.4946 41.1615 58.8388C43.5057 61.183 46.6851 62.5 50.0003 62.5C53.3155 62.5 56.495 61.183 58.8392 58.8388C61.1834 56.4946 62.5003 53.3152 62.5003 50C62.5003 46.6848 61.1834 43.5054 58.8392 41.1612C56.495 38.817 53.3155 37.5 50.0003 37.5ZM50.0003 70.8333C44.475 70.8333 39.1759 68.6384 35.2689 64.7314C31.3619 60.8244 29.167 55.5253 29.167 50C29.167 44.4747 31.3619 39.1756 35.2689 35.2686C39.1759 31.3616 44.475 29.1667 50.0003 29.1667C55.5257 29.1667 60.8247 31.3616 64.7317 35.2686C68.6387 39.1756 70.8337 44.4747 70.8337 50C70.8337 55.5253 68.6387 60.8244 64.7317 64.7314C60.8247 68.6384 55.5257 70.8333 50.0003 70.8333ZM50.0003 18.75C29.167 18.75 11.3753 31.7083 4.16699 50C11.3753 68.2917 29.167 81.25 50.0003 81.25C70.8337 81.25 88.6253 68.2917 95.8337 50C88.6253 31.7083 70.8337 18.75 50.0003 18.75Z" fill="black"/>
                </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="delete-btn">
            <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M84.375 18.75H68.75V15.625C68.75 13.1386 67.7623 10.754 66.0041 8.99587C64.246 7.23772 61.8614 6.25 59.375 6.25H40.625C38.1386 6.25 35.754 7.23772 33.9959 8.99587C32.2377 10.754 31.25 13.1386 31.25 15.625V18.75H15.625C14.7962 18.75 14.0013 19.0792 13.4153 19.6653C12.8292 20.2513 12.5 21.0462 12.5 21.875C12.5 22.7038 12.8292 23.4987 13.4153 24.0847C14.0013 24.6708 14.7962 25 15.625 25H18.75V81.25C18.75 82.9076 19.4085 84.4973 20.5806 85.6694C21.7527 86.8415 23.3424 87.5 25 87.5H75C76.6576 87.5 78.2473 86.8415 79.4194 85.6694C80.5915 84.4973 81.25 82.9076 81.25 81.25V25H84.375C85.2038 25 85.9987 24.6708 86.5847 24.0847C87.1708 23.4987 87.5 22.7038 87.5 21.875C87.5 21.0462 87.1708 20.2513 86.5847 19.6653C85.9987 19.0792 85.2038 18.75 84.375 18.75ZM37.5 15.625C37.5 14.7962 37.8292 14.0013 38.4153 13.4153C39.0013 12.8292 39.7962 12.5 40.625 12.5H59.375C60.2038 12.5 60.9987 12.8292 61.5847 13.4153C62.1708 14.0013 62.5 14.7962 62.5 15.625V18.75H37.5V15.625ZM75 81.25H25V25H75V81.25ZM43.75 40.625V65.625C43.75 66.4538 43.4208 67.2487 42.8347 67.8347C42.2487 68.4208 41.4538 68.75 40.625 68.75C39.7962 68.75 39.0013 68.4208 38.4153 67.8347C37.8292 67.2487 37.5 66.4538 37.5 65.625V40.625C37.5 39.7962 37.8292 39.0013 38.4153 38.4153C39.0013 37.8292 39.7962 37.5 40.625 37.5C41.4538 37.5 42.2487 37.8292 42.8347 38.4153C43.4208 39.0013 43.75 39.7962 43.75 40.625ZM62.5 40.625V65.625C62.5 66.4538 62.1708 67.2487 61.5847 67.8347C60.9987 68.4208 60.2038 68.75 59.375 68.75C58.5462 68.75 57.7513 68.4208 57.1653 67.8347C56.5792 67.2487 56.25 66.4538 56.25 65.625V40.625C56.25 39.7962 56.5792 39.0013 57.1653 38.4153C57.7513 37.8292 58.5462 37.5 59.375 37.5C60.2038 37.5 60.9987 37.8292 61.5847 38.4153C62.1708 39.0013 62.5 39.7962 62.5 40.625Z" fill="#DC2626"/>
            </svg>
          </div>
        </div>
      `;
  
      bookContainer.appendChild(bookCard);
  
      const readBtn = bookCard.querySelector('.read-btn');
      readBtn.addEventListener('click', () => {
        const btnIndicator = readBtn.querySelector('.btn-indicator');
        const eyeOff = readBtn.querySelector('.eye-off');
        const eyeOn = readBtn.querySelector('.eye-on');
        btnIndicator.classList.toggle('toggle');
  
        if (btnIndicator.classList.contains('toggle')) {
          eyeOn.style.display = 'block';
          eyeOff.style.display = 'none';
          book.read = 'yes';
        } else {
          eyeOn.style.display = 'none';
          eyeOff.style.display = 'block';
          book.read = 'no';
        }
  
        const markReadSpan = bookCard.querySelector('.mark-read span');
        markReadSpan.dataset.read = book.read;
        markReadSpan.textContent = book.read === 'yes' ? 'Mark as Unread' : 'Mark as Read';
  
        this.updateReadBooks();
        this.updateUnreadBooks();
      });
    });
  }


  updateTotalBooks(){
    this.totalBooks = this.myLibrary.length;
    document.getElementById('totalBooks').textContent = this.totalBooks;
  }
  
  updateReadBooks(){
    this.readBooks = this.myLibrary.filter((book) => book.read === 'yes').length;
    document.getElementById('booksRead').textContent = this.readBooks;
  }
  
  updateUnreadBooks(){
    const unReadBooks = this.totalBooks - this.readBooks;
    document.getElementById('booksUnread').textContent = unReadBooks;
  } 
}


const form = document.querySelector('form');
const library = new Library();

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.querySelector('input[name="group1"]:checked').value;

  const newBook = new Book(title, author, pages, read);
  library.addBookToLibrary(newBook);

  inputForm.classList.remove('active');
  overlay.classList.remove('active');
  form.reset();
});


const addBookBtn = document.querySelector('.new-book-btn');
const inputForm = document.querySelector('.modal-box');
const closeForm = document.querySelector('.close-btn');
const overlay = document.querySelector('.overlay');

addBookBtn.addEventListener('click', () => {
    addBookBtn.focus();
    inputForm.classList.add('active');
    overlay.classList.add('active')
    setTimeout(function(){
      addBookBtn.blur();
    },100)
})
closeForm.addEventListener('click', () => {
    inputForm.classList.remove('active');
    overlay.classList.remove('active');
})

document.addEventListener('click', (event) => {
  const deleteBtn = event.target.closest('.delete-btn');
  if(deleteBtn) {
    const bookCard = deleteBtn.closest('.book-card');
    const index = bookCard.dataset.index;
    library.myLibrary.splice(index, 1);

    library.displayBooks();
    library.updateTotalBooks();
    library.updateReadBooks();
    library.updateUnreadBooks();
  }
})

library.displayBooks();
library.updateTotalBooks();
library.updateReadBooks();
library.updateUnreadBooks();



