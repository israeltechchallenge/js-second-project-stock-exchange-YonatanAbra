const searchButton = document.getElementById("globalSearchBtn");
const searchList = document.getElementById("searchList");

searchButton.addEventListener("click", function (event) {
    let loader = document.getElementById("loader");
    loader.classList.remove("disappear");
    event.preventDefault();
    searchList.innerHTML = "";
    getSearchData();
});

async function getSearchData() {
    const inputValue = document.getElementById("globalSearchInput").value;
    const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${inputValue}&amp%3Blimit=10&amp%3Bexchange=NASDAQ`);
    const data = await response.json();
    const companies = data.slice(0, 10);

  companies.forEach(company => {
    const symbol = company.symbol;
    getMoreSearchData(symbol);
    })
}

async function getMoreSearchData(symbol) {
  try{
    const response = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`);
    const data = await response.json();
    console.log(data);
    listSearchData(data);
  }catch(error){
    console.log(error);
  }
}

function listSearchData(data) {
    const profile = data.profile;
  let loader = document.getElementById("loader");
  loader.classList.add("disappear");

  const liElement = document.createElement("li");
  const imgElement = document.createElement("img");
  const aElement = document.createElement("a");
  const spanElement = document.createElement("span");

  aElement.textContent = ` ${profile.companyName} (${data.symbol})`;
  aElement.setAttribute("href", `company.html?symbol=${data.symbol}`);
  imgElement.setAttribute("src", `${profile.image}`);
  spanElement.textContent = `(${profile.changes}%)`;

  if (profile.changes >= 0) {
    spanElement.style.color = "lightgreen";
  } else {
    spanElement.style.color = "red";
  }

  liElement.append(imgElement, aElement, spanElement);
  searchList.appendChild(liElement);
}