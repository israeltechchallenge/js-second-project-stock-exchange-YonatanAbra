class SearchResult {
  constructor(searchListId) {
    this.baseUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3`;
    this.searchInput =  document.getElementById("globalSearchInput");
    this.searchButton = document.getElementById("globalSearchBtn");
    this.searchList = searchListId;
    this.setupListeners();
  }

  debounce(func, delay) {
    let timeoutId;
    return function() {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        searchList.innerHTML = "";
        func.apply(context, [...args]);
      }, delay);
    };
  }
  handleSearchClick(event) {
    event.preventDefault();
    let loader = document.getElementById("loader");
    loader.classList.remove("disappear");
    this.getSearchData()
  }
  async getSearchData() {
    const inputValue = this.searchInput.value;
    const response = await fetch(`${this.baseUrl}/search?query=${inputValue}&amp%3Blimit=10&amp%3Bexchange=NASDAQ`);
    const data = await response.json();
    const firstCompanies = data.slice(0, 10);

    firstCompanies.forEach((company) => {
      const companies = company.symbol;
      this.renderResults(companies);
    });
  }
  async renderResults(companies) {
    try {
      const response = await fetch(`${this.baseUrl}/company/profile/${companies}`);
      const data = await response.json();
      this.listSearchData(data);
    } catch (error) {
      console.log(error);
    }
  }
  listSearchData(data) {
  const profile = data.profile;
  let loader = document.getElementById("loader");
  loader.classList.add("disappear");
  let changes = profile.changes;
  const changesNum = changes.toFixed(2);

  const liElement = document.createElement("li");
  const imgElement = document.createElement("img");
  const aElement = document.createElement("a");
  const spanElement = document.createElement("span");

  const inputValue = this.searchInput.value.toLowerCase(); 
  const companyName = profile.companyName.toLowerCase(); 
  const symbol = data.symbol.toLowerCase(); 

  const highlightedCompanyName = companyName.replace(inputValue, `<span style="background-color: yellow">${inputValue}</span>`);
  const highlightedSymbol = symbol.replace(inputValue, `<span style="background-color: yellow">${inputValue}</span>`);

  aElement.innerHTML = ` ${highlightedCompanyName} (${highlightedSymbol})`; 
  aElement.setAttribute("href", `company.html?symbol=${data.symbol}`);
  imgElement.setAttribute("src", `${profile.image}`);
  imgElement.onerror = () => {
    const defaultImgElement = document.createElement("img");
    defaultImgElement.setAttribute("src", "download.png");
    liElement.replaceChild(defaultImgElement, imgElement);
  };
  spanElement.textContent = `(${changesNum}%)`;

  if (changesNum >= 0) {
    spanElement.style.color = "lightgreen";
  } else {
    spanElement.style.color = "red";
  }

  liElement.append(imgElement, aElement, spanElement);
  this.searchList.appendChild(liElement);
}
  setupListeners() {
    this.searchInput.addEventListener("input", () => {
      if (this.searchInput.value === "") {
        this.searchList.innerHTML = "";
      }else {
        this.debounce(this.getSearchData.bind(this), 200)();
      }}); 
    this.searchInput.addEventListener("keydown", () => {
      setTimeout(() => {
        const inputValue = this.searchInput.value.toLowerCase();
        const lis = this.searchList.querySelectorAll("li");
        lis.forEach((li) => {
          const a = li.querySelector("a");
          const companyName = a.textContent.split(" (")[0].toLowerCase();
          const symbol = a.textContent.split(")")[0].split("(")[1].toLowerCase();
          const highlightedCompanyName = companyName.replace(inputValue, `<span style="background-color: yellow">${inputValue}</span>`);
          const highlightedSymbol = symbol.replace(inputValue, `<span style="background-color: yellow">${inputValue}</span>`);
          a.innerHTML = ` ${highlightedCompanyName} (${highlightedSymbol})`;
        });
      }, 0);
    });

    this.searchButton.addEventListener("click", this.handleSearchClick.bind(this));
  }
}

