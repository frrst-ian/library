document.addEventListener("DOMContentLoaded", function () {
    const Library = [
        {
            title: "Crime & Punishment",
            author: "Fyodor Dostoevsky",
            pages: 250,
        },
        {
            title: "Crime",
            author: "Fyodor Dostoevsky",
            pages: 250,
        },
    ];

    function displayBook() {
        const container = document.getElementById("container");

        for (const book of Library) {
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

            container.appendChild(card);
        }

        container.style.display = "flex";
        container.style.alignItems = "center";
        container.style.justifyContent = " center";
    }

    displayBook();

    function Book() { }

    const addBookButton = document.getElementById("addBookButton");
    const dialog = document.getElementById("dialog");
    const confirmButton  = dialog.querySelector("#confirmBtn");
    const cancelButton = dialog.querySelector('#cancelBtn')



    addBookButton.addEventListener("click", () => {
        dialog.showModal();
    });

   
    cancelButton.addEventListener("click" , (e) => {
        e.preventDefault();
        dialog.close();
    });

    function addBookToLibrary() {

    }
});
