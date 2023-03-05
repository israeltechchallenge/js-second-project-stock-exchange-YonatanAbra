const baseUrl = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3";
const urlParams = new URLSearchParams(window.location.search);
const symbols = urlParams.get('symbols').split(',').slice(0, 3); // get the symbols and limit to 3 companies

async function getCompanyProfile(symbol) {
  const response = await fetch(baseUrl + `/company/profile/${symbol}`);
  const data = await response.json();
  return data.profile;
}

class createCompanyBlock {
  constructor(companyName, changes, price, industry, address, 
    image, ceo, range, employees, website) {
    this.companyName = companyName;
    this.changes = changes;
    this.price = price;
    this.industry = industry;
    this.address = address;
    this.image = image;
    this.ceo = ceo;
    this.range = range;
    this.employees = employees;
    this.website = website;
  }
  displayBlock(companyName, changes, price, industry, address, image, ceo, range, employees, website) {
    let bigContainer = document.getElementById("compareContainer");

    const companyContainer = document.createElement('div');
    companyContainer.classList.add('companyContainer');

    const companyTitleCont = document.createElement('div');
    companyTitleCont.classList.add('companyTitleCont')

    const imageCont = document.createElement('img');
    imageCont.setAttribute("src", `${image}`);;
    companyTitleCont.appendChild(imageCont);
    imageCont.onerror = () => {
        const defaultImgElement = document.createElement("img");
        defaultImgElement.setAttribute("src", "download.png");
        companyTitleCont.replaceChild(defaultImgElement, imageCont);
      };

    const companyTitle = document.createElement('span');
    companyTitle.textContent = `${companyName}`;
    companyTitleCont.appendChild(companyTitle);

    const companyInfo = document.createElement('div');
    companyInfo.classList.add('companyInfo');

    const companyCeo = document.createElement('p');
    companyCeo.innerHTML = `<span class="black">CEO:</span> ${ceo}</span>`;
    companyInfo.appendChild(companyCeo);

    const companySymbol = document.createElement('p');
    companySymbol.innerHTML = `<span class="black">Change Percentage:</span> ${changes}%`;
    companyInfo.appendChild(companySymbol);

    const companyRange = document.createElement('p');
    companyRange.innerHTML = `<span class="black">Range:</span> $${range}`;
    companyInfo.appendChild(companyRange);

    const companyPrice = document.createElement('p');
    companyPrice.innerHTML = `<span class="black">Price:</span> $${price}`;
    companyInfo.appendChild(companyPrice);

    const companyIndustry = document.createElement('p');
    companyIndustry.innerHTML = `<span class="black">Industry:</span> ${industry}</span>`;
    companyInfo.appendChild(companyIndustry);

    const companyEmployees = document.createElement('p');
    companyEmployees.innerHTML = `<span class="black">Number of Employees:</span> ${employees}</span>`;
    companyInfo.appendChild(companyEmployees);

    const companyCity = document.createElement('p');
    companyCity.innerHTML = `<span class="black">Adress:</span> ${address}`;
    companyInfo.appendChild(companyCity);

    const companyWebsite = document.createElement('a');
    companyWebsite.innerHTML = `<span class="black">Website:</span> ${website}`;
    companyWebsite.setAttribute("href", `${website}`);
    companyWebsite.setAttribute("target", "_blank");
    companyInfo.appendChild(companyWebsite);

    companyContainer.appendChild(companyTitleCont)
    companyContainer.appendChild(companyInfo);
    bigContainer.appendChild(companyContainer);

    return companyContainer;
  }
}

displayBlock = new createCompanyBlock();

Promise.all(symbols.map(symbol => getCompanyProfile(symbol))).then(data => {
  data.forEach((company) => {
    const companyName = company.companyName;
    const changes = company.changes;
    const price = company.price;
    const industry = company.industry;
    const address = company.address;
    const image = company.image;
    const ceo = company.ceo;
    const range = company.range;
    const employees = company.fullTimeEmployees;
    const website = company.website;
    console.log(company)
    displayBlock.displayBlock(companyName, changes, price, industry, address,
         image, ceo, range, employees, website );
  });
}).catch(error => console.log(error));