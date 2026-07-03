let response =
    await fetch("https://openlibrary.org/search.json?q=law");

async function getBooks() {

    let response =
        await fetch("https://openlibrary.org/search.json?q=law");

    let data =
    await response.json();

    console.log(data);

}

getBooks();