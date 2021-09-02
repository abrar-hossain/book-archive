//show spinner for loading
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

//fetch all book data
const searchBook = async () => {
    const searchField = document.getElementById('search-area');
    const searchText = searchField.value;
    searchField.value = '';
    //console.log(searchText);
    /* error handling */
    if (searchText === '') {
        document.getElementById('errorMessage').innerText = 'Search field should not be empty.';
        document.getElementById('search-result').textContent = '';
        document.getElementById('found').textContent = '';
        return;
    }
    document.getElementById('errorMessage').textContent = '';
    document.getElementById('search-result').textContent = '';
    document.getElementById('found').innerText = '';

    toggleSpinner('block');
    //api url
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    //get data
    const res = await fetch(url);
    const data = await res.json();

    displayBooks(data.docs, data.numFound);

}

//display books from api
const displayBooks = (books, numbers) => {
    //console.log(books);
    //error handling
    if (books.length === 0) {
        document.getElementById('errorMessage').innerHTML = `<h1 class="text-danger"> Result Not Found :( </h1>`;
        toggleSpinner('none');
        return;
    }
    //display total number
    document.getElementById('found').innerHTML = ` <h1 class="text-center title mb-5"> ${numbers} Books Found Here! </h1>`;
    const container = document.getElementById('search-result');
    //array loop
    books.slice(0, 30).forEach(book => {
        //console.log(filterBook);

        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
            <div class="card h-100">
                 <div class="card-body border border-success">
                    <img class="card-img-top mb-5" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg">
                        <h1 class="card-title text-center"> ${book.title}</h1>
                        <h3 class="card-text"> Author: ${book.author_name ? book.author_name : ''} </h3>
                        <h4 class="card-text"> publisher: ${book.publisher ? book.publisher : ''} </h4>
                        <h6 class="card-text"> First publishing year: ${book.first_publish_year} </h6>
                </div>
            </div>
            `;

        container.appendChild(div);

    });

    toggleSpinner('none');
}









