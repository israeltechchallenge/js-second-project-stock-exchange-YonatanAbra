const searchInput = document.getElementById("globalSearchInput");
const resultsContainer = document.getElementById("searchList");
const searchBtn = document.getElementById("globalSearchBtn")
searchBtn.addEventListener("click", globalSearch);

function globalSearch(){
    let searchList = document.getElementById("searchList");
    let loader = document.getElementById("loader");
    loader.classList.remove("disappear");
    setTimeout(() => {
        loader.style.opacity = "0";
    }, 1200)
    setTimeout(() => {
        globalSearchFetch();
        searchList.style.padding.bottom = "2%";
        resultsContainer.style.opacity = "1";
    }, 400)
}

async function globalSearchFetch() {
  const inputValue = searchInput.value;
  const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${inputValue}&amp%3Blimit=10&amp%3Bexchange=NASDAQ`);
  const data = await response.json();
  const companies = data.slice(0, 10);
  resultsContainer.innerHTML = '';

  companies.forEach(company => {
    const result = document.createElement('div');
    result.innerHTML = `<li><a href="/company.html?symbol=${company.symbol}"> ${company.name} (${company.symbol})</a></li>`;
    resultsContainer.appendChild(result);
  });
}