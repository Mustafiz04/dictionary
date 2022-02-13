// fucntion to fetch data from a url
async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data
}

// function to show the definition of the word typed in the searchbar
function search() {
  const searchText = document.getElementById('searchText').value;

  if (searchText == '') {
    const alert = document.getElementById('alert');
    alert.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Search bar empty!</strong> Enter a word to proceed.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`

    setTimeout(() => alert.innerHTML = '', 3000);
    return
  }

  const url = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchText}`;
  getData(url).then(data => showDefinition(data));
}

// function to get the definition from the response json
function showDefinition(data) {

  // clear the search results before displaying a new one
  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = '';

  try {
    data[0].meanings.forEach(meaning => {
      const wordMeaning = meaning.definitions[0].definition;
      let wordExample = meaning.definitions[0].example;

      // if the example is not present
      if (wordExample == undefined) {
        wordExample = '';
      }

      if (searchResults.innerHTML == '') {
        searchResults.innerHTML = `
              <h2 class="h-secondary mx-3">${data[0].word}</h2>
  
              <div class="card">
                  <ul class="list-group list-group-flush" id="resultsCard">
                      <li class="list-group-item">${wordMeaning} <br> <i>${wordExample}</i></li>
                  </ul>
              </div>`
      }
      else {
        const resultsCard = document.getElementById('resultsCard');
        resultsCard.innerHTML += `<li class="list-group-item">${wordMeaning} <br> <i>${wordExample}</i></li>`;
      }
    });
  } catch (error) {
    searchResults.innerHTML = `<h2 class="h-secondary mx-3">${data.title}</h2>
      <div class="card">
          <ul class="list-group list-group-flush" id="resultsCard">
              <li class="list-group-item">${data.message} <br> ${data.resolution}</li>
          </ul>
      </div>`;
  }

}

// when the form is submitted, run the getData function
const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', (e) => {
  // prevent the page from reloading when the form is submitted
  e.preventDefault();

  // display the definition of the searched word
  search();
});