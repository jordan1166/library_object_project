const book_list = document.getElementById("left");
const newBookDiv = document.getElementById("new_book_button");
const addBook = document.getElementById("add_book");
const myForm = document.getElementById("my_form");
let myLibrary = [];

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(event) {
  const data = new FormData(event.target);
  const author = data.get("author");
  const title = data.get("title");
  const pages = data.get("pages");
  const read = data.get("read");
  const newBook = new Book(author, title, pages, read);
  myLibrary.push(newBook);
  displayBooks();
  // console.log(myLibrary);
  myForm.reset();
}

function displayBooks() {
  let index = 0;
  book_list.innerHTML = "";
  myLibrary.forEach((book) => {
    book_list.appendChild(document.createElement("li"));
    book_list.childNodes[index].classList += `book${index}`;
    book_list.getElementsByTagName("li")[index].innerHTML = `
                  <div id="button-container">
                    <button id="${index}">x</button>
                  </div>
                  <div>Author: ${book.author}</div>
                  <div>Title: ${book.title}</div>
                  <div>Pages: ${book.pages}</div>
                  <div id="read${index}">Read: ${book.read}</div>
                  <div id="toggle">
                    <label class="switch">
                      <input type="checkbox" id="myCheck${index}" onclick="toggle(${index})">
                      <span class="slider round"></span>
                    </label>
                  </div>`;
    const read = document.getElementById(`read${index}`);
    console.log(read.textContent);
    if (read.textContent == "Read: Yes") {
      document
        .getElementById(`myCheck${index}`)
        .setAttribute("checked", "checked");
    }

    // console.log(myLibrary[index]);
    const deleteButton = document.getElementById(`${index}`);
    deleteButton.addEventListener("click", (e) => {
      console.log(e.target.id);
      console.log(`delete button ${e.target.id} clicked!`);
      const removedBook = document.getElementsByClassName(
        `book${e.target.id}`
      )[0];
      myLibrary.splice(e.target.id, 1);
      console.log(myLibrary);
      removedBook.remove();
      index--;
      displayBooks();
    });
    index++;
  });
}

function toggle(index) {
  // Get the checkbox
  let checkBox = document.getElementById(`myCheck${index}`);
  // Get the output text
  let read = document.getElementById(`read${index}`);
  console.log(read);
  // If the checkbox is checked, display the output text
  if (checkBox.checked == true) {
    read.textContent = "Read: Yes";
  } else {
    read.textContent = "Read: No";
  }
  console.log(checkBox.checked);
}

// const form = document.querySelector("form");
myForm.addEventListener("submit", addBookToLibrary);

// myLibrary.push({ hello: "book12" });
displayBooks();
