class SearchForm {
    constructor(parentElement) {
      this.parentElement = parentElement;
      this.containerElement = document.createElement('div');
      this.containerElement.classList.add('searchContBorder');
  
      const innerContainerElement = document.createElement('div');
      innerContainerElement.classList.add('searchContainer');
  
      const searchTitleElement = document.createElement('span');
      searchTitleElement.classList.add('searchTitle');
      searchTitleElement.textContent = 'Search Nasdaq Stocks';
  
      const searchBarElement = document.createElement('div');
      searchBarElement.classList.add('searchBar');
      searchBarElement.id = 'form';
  
      const searchInputElement = document.createElement('input');
      searchInputElement.type = 'text';
      searchInputElement.classList.add('globalSearchInput');
      searchInputElement.id = 'globalSearchInput';
      searchInputElement.placeholder = 'Search for company stock';
  
      const searchButtonElement = document.createElement('button');
      searchButtonElement.classList.add('globalSearchBtn');
      searchButtonElement.id = 'globalSearchBtn';
      searchButtonElement.textContent = 'Search';
  
      const spinnerElement = document.createElement('span');
      spinnerElement.classList.add('spinner-border', 'disappear');
      spinnerElement.id = 'loader';
      spinnerElement.role = 'status';

      const resultsCont = document.getElementById("results");

      searchBarElement.appendChild(searchInputElement);
      searchBarElement.appendChild(searchButtonElement);
      searchBarElement.appendChild(spinnerElement);
  
      const searchListElement = document.createElement('div');
      searchListElement.classList.add('searchList');
      searchListElement.id = 'searchList';

      innerContainerElement.appendChild(searchTitleElement);
      innerContainerElement.appendChild(searchBarElement);
      this.containerElement.appendChild(innerContainerElement);
      this.containerElement.appendChild(searchListElement);
      innerContainerElement.appendChild(resultsCont);
  
      this.parentElement.appendChild(this.containerElement);
}}