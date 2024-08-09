const Library = [];

function displayBook() {
    const container = document.getElementById("container");
    container.innerHTML = "";

    Library.forEach((book, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const titleElement = document.createElement("h3");
        titleElement.textContent = book.title;
        card.appendChild(titleElement);

        const authorElement = document.createElement("p");
        authorElement.textContent = `Author: ${book.author}`;
        card.appendChild(authorElement);

        const pagesElement = document.createElement("p");
        pagesElement.textContent = `Number of pages: ${book.pages}`;
        card.appendChild(pagesElement);

        const readStatus = document.createElement("p");
        readStatus.textContent = book.read ? "Read" : "Not read";
        readStatus.classList.add(book.read ? "read" : "not-read");
        card.appendChild(readStatus);

        const toggleReadButton = document.createElement('button');
        toggleReadButton.textContent = "Toggle Read";
        toggleReadButton.classList.add('toggle-read-btn');
        toggleReadButton.dataset.index = index;
        card.appendChild(toggleReadButton);

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn");
        removeButton.dataset.index = index;
        card.appendChild(removeButton);

        container.appendChild(card);
    });
    addButtonListeners();
}

function addButtonListeners() {
    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach(button => {
        button.addEventListener('click', removeBook);
    });

    const toggleReadButtons = document.querySelectorAll('.toggle-read-btn');
    toggleReadButtons.forEach(button => {
        button.addEventListener('click', toggleReadStatus);
    });
}

function toggleReadStatus(event) {
    const index = event.target.dataset.index;
    Library[index].read = !Library[index].read;
    displayBook();
}

function removeBook(event) {
    const index = event.target.dataset.index;
    Library.splice(index, 1);
    displayBook();
}

class Book {
    constructor(title, author, pages, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function addBookToLibrary() {
    const addBookButton = document.getElementById("addBookButton");
    const dialog = document.getElementById("dialog");
    const confirmButton = document.getElementById("confirmBtn");
    const cancelButton = document.getElementById('cancelBtn');
    const form = dialog.querySelector('form');
    const title = document.getElementById("title");
    const titleError = document.querySelector("#title + span.error");
    const author = document.getElementById("author");
    const authorError = document.querySelector("#author + span.error");
    const numberOfPages = document.getElementById("pages");
    const pagesError = document.querySelector("#pages + span.error");

    dialog.style.display = 'flex';
    dialog.style.justifyContent = 'center';
    dialog.style.alignItems = 'center';

    addBookButton.addEventListener("click", () => {
        dialog.showModal();
    });

    cancelButton.addEventListener("click", () => {
        dialog.close();
    });

    title.addEventListener("input", () => {
        if (title.validity.valid) {
            titleError.textContent = "";
            titleError.className = "error";
        } else {
            showErrorTitle();
        }
    });

    author.addEventListener("input", () => {
        if (author.validity.valid) {
            authorError.textContent = "";
            authorError.className = "error";
        } else {
            showErrorAuthor();
        }
    });

    numberOfPages.addEventListener("input", () => {
        if (numberOfPages.validity.valid) {
            pagesError.textContent = "";
            pagesError.className = "error";
        } else {
            showErrorPages();
        }
    });

    function showErrorTitle() {
        if (title.validity.valueMissing) {
            titleError.textContent = "You need to enter a title";
        }
        titleError.className = "error active";
    }

    function showErrorAuthor() {
        if (author.validity.valueMissing) {
            authorError.textContent = "You need to enter an author";
        }
        authorError.className = "error active";
    }

    function showErrorPages() {
        if (numberOfPages.validity.valueMissing) {
            pagesError.textContent = "You need to enter the number of pages";
        } else if (numberOfPages.validity.typeMismatch) {
            pagesError.textContent = "Entered value needs to be a number";
        } else if (numberOfPages.validity.rangeUnderflow) {
            pagesError.textContent = `Pages should be at least ${numberOfPages.min}; you entered ${numberOfPages.value}.`;
        }
        pagesError.className = "error active";
    }

    confirmButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (!title.validity.valid) {
            showErrorTitle();
            return;
        }
        if (!author.validity.valid) {
            showErrorAuthor();
            return;
        }
        if (!numberOfPages.validity.valid) {
            showErrorPages();
            return;
        }

        const newBook = new Book(
            title.value.trim(),
            author.value.trim(),
            Number(numberOfPages.value.trim()),
            document.getElementById('read').checked
        );
        Library.push(newBook);
        displayBook();
        dialog.close();
        form.reset();
    });
}

displayBook();
addBookToLibrary();