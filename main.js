const container = document.querySelector(".book_container");
container.className = "book_container";
// input vaule && object keys vaule
const addBtn = document.querySelector(".addBtn");

const myLibrary = []; //save book information

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.id = crypto.randomUUID();
  this.isRead = false;
  this.isRendered = false;
}

function addBookToLibrary() { //add book information
  const inputTitle = document.querySelector("#title");
  const inputAuthor = document.querySelector("#author");
  const inputPages = document.querySelector("#page");

  const titleValue = inputTitle?.value;
  const authorValue = inputAuthor?.value;
  const pagesValue = inputPages?.value;

  if (!titleValue) return;

  const myBook = new Book(titleValue, authorValue, pagesValue);



  myLibrary.push(myBook)

  inputTitle.value = "";
  inputAuthor.value = "";
  inputPages.value = "";

  reader();


}

function reader() {

  myLibrary.forEach((book) => {
    if (book.isRendered) {
      return;
    }
    const card = document.createElement("div");
    card.className = "cards";
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");

    title.className = "book_title";
    author.className = "book_author";
    pages.className = "pages";
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;

    const delBtn = document.createElement("button");
    delBtn.className = "deleteBtn";
    delBtn.textContent = "Delete Book";

    const readBtn = document.createElement("button");
    readBtn.className = "readBtn";
    readBtn.textContent = book.isRead ? "Read" : "Not Read";

    card.appendChild(delBtn);
    card.appendChild(readBtn);

    container?.appendChild(card);

    book.isRendered = true;

    readBtn.addEventListener('click', () => {
      book.isRead = !book.isRead;

      readBtn.textContent = book.isRead ? "Read" : "Not Read";

      readBtn.classList.toggle("is-read", book.isRead);
    })

    delBtn.addEventListener('click', () => {
      card.remove();

      myLibrary = myLibrary.filter(item => item.id !== book.id);
    })
  });
}

addBtn?.addEventListener("click", function(e) {
  e.preventDefault();
  addBookToLibrary();
});


const defaultBook1 = new Book("The Hobbit", "J.R.R. Tolkien", "295");
const defaultBook2 = new Book("Atomic Habits", "James Clear", "320");
const defaultBook3 = new Book("1984", "George Orwell", "328");

myLibrary.push(defaultBook1, defaultBook2, defaultBook3);

reader()
