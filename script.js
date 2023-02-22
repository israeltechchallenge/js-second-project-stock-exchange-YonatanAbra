const searchButton = document.getElementById("globalSearchBtn");
const searchList = document.getElementById("searchList");
let baseUrl = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3"

const searchInput = document.getElementById("globalSearchInput");
let timeoutId;

function debounce(func, delay) {
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      searchList.innerHTML = "";
      func.apply(context, args);
    }, delay);
  };
}
searchInput.addEventListener("input", debounce(getSearchData, 300));

function listSearchData(data) {
    const profile = data.profile;
    let loader = document.getElementById("loader");
    loader.classList.add("disappear");
    let changes = profile.changes;
    const changesNum = changes.toFixed(2);

    const liElement = document.createElement("li");
    const imgElement = document.createElement("img");
    const aElement = document.createElement("a");
    const spanElement = document.createElement("span");

    aElement.textContent = ` ${profile.companyName} (${data.symbol})`;
    aElement.setAttribute("href", `company.html?symbol=${data.symbol}`);
    imgElement.setAttribute("src", `${profile.image}`);
    spanElement.textContent = `(${changesNum}%)`;

    if (changesNum >= 0) {
      spanElement.style.color = "lightgreen";
    } else {
      spanElement.style.color = "red";
    }

    liElement.append(imgElement, aElement, spanElement);
    searchList.appendChild(liElement);
}

async function getMoreSearchData(symbol) {
    try{
      const response = await fetch(`${baseUrl}/company/profile/${symbol}`);
      const data = await response.json();
      listSearchData(data);
    }catch(error){
      console.log(error);
    }
  }

async function getSearchData() {
    const inputValue = document.getElementById("globalSearchInput").value;
    const response = await fetch(`${baseUrl}/search?query=${inputValue}&amp%3Blimit=10&amp%3Bexchange=NASDAQ`);
    const data = await response.json();
    const companies = data.slice(0, 10);

  companies.forEach(company => {
    const symbol = company.symbol;
    getMoreSearchData(symbol);
    })
}


searchButton.addEventListener("click", function (event) {
    let loader = document.getElementById("loader");
    loader.classList.remove("disappear");
    event.preventDefault();
    searchList.innerHTML = "";
    getSearchData();
});

const tickerList = document.getElementById("tickerList");

tickerList.addEventListener("mouseenter", () => tickerList.style.animationPlayState = "paused")


