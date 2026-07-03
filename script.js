let libraryItems = [];

let openLibraryResults = [];

let editIndex = null;

let addLibraryItemButton =
	document.getElementById("addLibraryItemButton");
addLibraryItemButton.addEventListener(
	"click",
	addLibraryItem
);

let cancelEditButton =
    document.getElementById("cancelEditButton");

	cancelEditButton.addEventListener(
		"click",
		cancelEdit
);

let searchButton =
	document.getElementById("searchButton");

let showAllButton =
    document.getElementById("showAllButton");

showAllButton.addEventListener(
    "click",
    showAllLibraryItems
);

let sortAZButton =
    document.getElementById("recordSortAZ");

sortAZButton.addEventListener(
    "click",
    sortLibraryItemsAZ
);

let sortZAButton =
    document.getElementById("recordSortZA");

sortZAButton.addEventListener(
    "click",
    sortLibraryItemsZA
);


searchButton.addEventListener(
	"click",
	searchLibraryItems
);

let booksOnlyButton =
    document.getElementById("booksOnlyButton");

booksOnlyButton.addEventListener(
    "click",
    showBooksOnly
);

let journalsOnlyButton =
    document.getElementById("journalsOnlyButton");

journalsOnlyButton.addEventListener(
    "click",
    showJournalsOnly
);

let ebooksOnlyButton =
    document.getElementById("ebooksOnlyButton");

ebooksOnlyButton.addEventListener(
    "click",
    showEbooksOnly
);

let searchOpenLibraryButton =
    document.getElementById("searchOpenLibraryButton");

searchOpenLibraryButton.addEventListener(
    "click",
    searchOpenLibrary
);

let clearOpenLibraryButton =
    document.getElementById("clearOpenLibraryButton");

clearOpenLibraryButton.addEventListener(
    "click",
    clearOpenLibraryResults
);


function addLibraryItem() {

	let title =
		document.getElementById("recordTitle").value;

	if (title === "") {
		alert("Please enter a title");
		return;
	}

	let author =
		document.getElementById("recordAuthor").value;

	let format =
		document.getElementById("recordFormat").value;

	let callNumber =
		document.getElementById("recordCallNumber").value;

	let isbn =
		document.getElementById("recordISBN").value;

	let location =
		document.getElementById("recordLocation").value;

	if (editIndex !== null) {
    libraryItems[editIndex].title = title;
    libraryItems[editIndex].author = author;
    libraryItems[editIndex].format = format;
    libraryItems[editIndex].callNumber = callNumber;
    libraryItems[editIndex].isbn = isbn;
    libraryItems[editIndex].location = location;

    saveLibraryItems();
    renderLibraryItems(libraryItems);

    cancelEdit();

    return;
}

	let libraryItem = {
		title: title,
		author: author,
		format: format,
		callNumber: callNumber,
		isbn: isbn,
		location: location
	};


	libraryItems.push(libraryItem);
	saveLibraryItems();
	renderLibraryItems(libraryItems);
	clearForm();

}

function renderOpenLibraryResults(apiBooks) {

    let results =
        document.getElementById("openLibraryResults");

    results.innerHTML = "";

    for (let i = 0; i < apiBooks.length; i++) {

        let book = apiBooks[i];

        results.innerHTML +=
                "<div class='library-card'>" +
                "<div class='card-icon'>" +
                "<img src='img/book-open-text.svg' alt='Book'>" +
                "</div>" +
                "<h3>" + book.title + "</h3>" +
                "<p><b>Author:</b> " +
                (book.author_name ? book.author_name[0] : "Unknown") +
                "</p>" +
                "<button onclick='importBook(" + i + ")'>Import</button>" +
                "</div>";
            }
}


function renderLibraryItems(itemsToRender) {

    let libraryCollection =
        document.getElementById("libraryCards");

    let recordCount =
        document.getElementById("recordCount");

    libraryCollection.innerHTML = "";

    recordCount.textContent =
        `${itemsToRender.length} Records`;

    if (itemsToRender.length === 0) {
        libraryCollection.innerHTML =
            "<p class='empty-message'>No records found.</p>";
        return;
    }

    for (let i = 0; i < itemsToRender.length; i++) {

        let item = itemsToRender[i];

        let cardIcon =
            "<img src='img/book-open-text.svg' alt='Book'>";

        if (item.format === "Journal") {
            cardIcon =
                "<img src='img/newspaper.svg' alt='Journal'>";
        }

        libraryCollection.innerHTML +=
            "<div class='library-card'>" +
            "<div class='card-icon'>" + cardIcon + "</div>" +
            "<h3>" + item.title + "</h3>" +
            "<p><b>Author:</b> " + item.author + "</p>" +
            "<p><b>Format:</b> " + item.format + "</p>" +
            "<p><b>Call Number:</b> " + item.callNumber + "</p>" +
            "<p><b>ISBN:</b> " + item.isbn + "</p>" +
            "<p><b>Location:</b> " + item.location + "</p>" +
            "<button onclick='deleteLibraryItem(" + i + ")'>Delete</button>" +
            "<button onclick='editLibraryItem(" + i + ")'>Edit</button>" +
            "</div>";
    }
}

function deleteLibraryItem(index) {

	let confirmDelete = confirm("Are you sure you want to delete this record?");

    if (confirmDelete === false) {
        return;
    }

	libraryItems.splice(index, 1);
	saveLibraryItems();
	renderLibraryItems(libraryItems);
}


function searchLibraryItems() {

	let searchText =
		document.getElementById("librarySearchInput").value;

	let searchResults = [];

	for (let i = 0; i < libraryItems.length; i++) {

		let item = libraryItems[i];

		if (
			item.title.toLowerCase().includes(
				searchText.toLowerCase()
			)
		) {
			searchResults.push(item);
		}

	}
		renderLibraryItems(searchResults);
}

function showAllLibraryItems() {
    renderLibraryItems(libraryItems);
}

function sortLibraryItemsAZ() {
    libraryItems.sort(function(a, b) {

    if (a.title < b.title) {
        return -1;
    }

    if (a.title > b.title) {
        return 1;
    }

    return 0;

});
    renderLibraryItems(libraryItems);

    // The sort function compares a.title and b.title.
    // If a should come before b it returns -1.
    // If a should come after b it returns 1.
    // Then JavaScript reorders the libraryItems array and we render it again.

}

function sortLibraryItemsZA() {

    libraryItems.sort(function(a, b) {

        if (a.title > b.title) {
            return -1;
        }

        if (a.title < b.title) {
            return 1;
        }

        return 0;

    });

    renderLibraryItems(libraryItems);

}

function saveLibraryItems() {

    localStorage.setItem(
        "libraryItems",
        JSON.stringify(libraryItems)
    );

}

function loadLibraryItems() {
	let savedLibraryItems =
    	localStorage.getItem("libraryItems");

	if (savedLibraryItems) {
	
		libraryItems =
			JSON.parse(savedLibraryItems);
	}


}

loadLibraryItems();

renderLibraryItems(libraryItems);

function editLibraryItem(index) {

    editIndex = index;

    let item = libraryItems[index];

    document.getElementById("recordTitle").value =
        item.title;

    document.getElementById("recordAuthor").value =
        item.author;

    document.getElementById("recordFormat").value =
        item.format;

    document.getElementById("recordCallNumber").value =
        item.callNumber;

    document.getElementById("recordISBN").value =
        item.isbn;

    document.getElementById("recordLocation").value =
        item.location;

    addLibraryItemButton.textContent =
        "Save Changes";

	cancelEditButton.style.display =
    "inline-block";
}

function showBooksOnly() {

		let filteredItems = [];

		for (let i = 0; i < libraryItems.length; i++) {

			let item = libraryItems[i];

				if (item.format.toLowerCase() === "book") {

			filteredItems.push(item);

		}

	}

	renderLibraryItems(filteredItems);
}

function showJournalsOnly() {

		let filteredItems = [];

		for (let i = 0; i < libraryItems.length; i++) {

			let item = libraryItems[i];

				if (item.format.toLowerCase() === "journal") {

			filteredItems.push(item);

		}

	}

	renderLibraryItems(filteredItems);
}

function showEbooksOnly() {

		let filteredItems = [];

		for (let i = 0; i < libraryItems.length; i++) {

			let item = libraryItems[i];

				if (item.format.toLowerCase() === "ebook") {

			filteredItems.push(item);

		}

	}

	renderLibraryItems(filteredItems);
}

function cancelEdit() {
    editIndex = null;

    addLibraryItemButton.textContent =
        "Add Record";

    clearForm();

    cancelEditButton.style.display =
        "none";
}

function importBook(index) {

    let book =
        openLibraryResults[index];

    let libraryItem = {
        title: book.title,
        author: book.author_name ? book.author_name[0] : "",
        format: "Book",
        callNumber: "",
        isbn: "",
        location: ""
    };

    libraryItems.push(libraryItem);

    saveLibraryItems();

    renderLibraryItems(libraryItems);
}

function clearForm() {
    document.getElementById("recordTitle").value = "";
    document.getElementById("recordAuthor").value = "";
    document.getElementById("recordFormat").value = "Book";
    document.getElementById("recordCallNumber").value = "";
    document.getElementById("recordISBN").value = "";
    document.getElementById("recordLocation").value = "";
}

async function searchOpenLibrary() {

    let searchTerm =
        document.getElementById("searchTerm").value;

    let response =
        await fetch(
            "https://openlibrary.org/search.json?q=" + searchTerm + "&limit=10"
        );

    let data =
        await response.json();

    openLibraryResults = data.docs;

    renderOpenLibraryResults(openLibraryResults);
}

function clearOpenLibraryResults() {

    openLibraryResults = [];

    document.getElementById("searchTerm").value = "";

    document.getElementById("openLibraryResults").innerHTML = "";

}




