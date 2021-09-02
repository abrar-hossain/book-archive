//show spinner for loading
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleSearchResult = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle;
}
/* const total = displayStyle => {
    document.getElementById('found').style.display = displayStyle;
} */

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
    toggleSearchResult('none')
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
        document.getElementById('errorMessage').innerText = 'Result not found';
        toggleSpinner('none');
        return;
    }

    //check undefined(set no value) data
    const filterBooks = books.filter(info => info.cover_i !== undefined && info.author_name !== undefined && info.first_publish_year !== undefined && info.publisher !== undefined);
    document.getElementById('errorMessage').innerText = `${numbers} books found`;
    //array loop
    filterBooks.slice(0, 30).forEach(filterBook => {
        console.log(filterBook);
        const container = document.getElementById('search-result');
        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
            <div class="card h-100">
                 <div class="card-body border border-success">
                    <img class="card-img-top mb-5" src="https://covers.openlibrary.org/b/id/${filterBook.cover_i}-M.jpg">
                        <h1 class="card-title text-center"> ${filterBook.title}</h1>
                        <h3 class="card-text"> author: ${filterBook.author_name[0]} </h3>
                        <h4 class="card-text"> publisher: ${filterBook.publisher[0]} </h4>
                        <h6 class="card-text"> First publishing year: ${filterBook.first_publish_year} </h6>
                </div>
            </div>
            `;

        container.appendChild(div);

    });

    toggleSpinner('none');
    toggleSearchResult('block');
}









