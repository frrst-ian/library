document.addEventListener("DOMContentLoaded", function () {

    const Library = [

    ];

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
                toggleReadButton.textContent = "Toggle Read ";
                toggleReadButton.classList.add('toggle-read-btn');
                toggleReadButton.dataset.index  = index;
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
            button.addEventListener('click' , removeBook);
        });

        const toggleReadButtons = document.querySelectorAll('.toggle-read-btn');
        toggleReadButtons.forEach(button => {
            button.addEventListener('click' , toggleReadStatus);
        })
    }

    function toggleReadStatus(event) {
        const index = event.target.dataset.index;
        Library[index].read = !Library[index].read;
        displayBook();
    }

    function removeBook(event ){
        const index  = event.target.dataset.index;
        Library.splice(index , 1);
        displayBook();
    }
    displayBook();

    function Book(title, author, pages , read =false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }


    function addBookToLibrary() {
        const addBookButton = document.getElementById("addBookButton");
        const dialog = document.getElementById("dialog");
        const confirmButton = document.getElementById("confirmBtn");
        const cancelButton = document.getElementById('cancelBtn');
        const form = dialog.querySelector('form');
        const read = document.getElementById('read').checked;

        dialog.style.display = 'flex';
        dialog.style.justifyContent = 'center';
        dialog.style.alignItems = 'center';

        addBookButton.addEventListener("click", () => {
            dialog.showModal();
        });

        cancelButton.addEventListener("click", () => {
            dialog.close();
        });

        confirmButton.addEventListener('click', (e) => {
            e.preventDefault();
            const title = document.getElementById('title').value.trim();
            const author = document.getElementById('author').value.trim();
            const pages = document.getElementById('pages').value.trim();
            const numPages = Number(pages);

            if (title && author && !isNaN(numPages) && numPages > 0) {
                const newBook = new Book(title, author, numPages,read);
                Library.push(newBook);
                displayBook();
                dialog.close();

                // Clear the input fields
                form.reset();
            } else {
                alert("Please enter valid book details. Title and author should not be empty, and pages should be a positive number.");
            }
        });


    } addBookToLibrary();
});
