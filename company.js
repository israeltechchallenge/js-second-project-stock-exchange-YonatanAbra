let baseUrl = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3"

async function getCompanyProfile(symbol) {
    const response = await fetch(baseUrl + `/company/profile/${symbol}` );
    const data = await response.json();
    return data;
}

  const urlParams = new URLSearchParams(window.location.search);
  const symbol = urlParams.get('symbol');

getCompanyProfile(symbol)
  .then(data => {
    const profileElement = document.getElementById('profile');
    profileElement.innerHTML = `
    <div class="titleContainer gradient-border" id="titleContainer">
        <img src="${data.profile.image}" alt="${data.profile.companyName}"/>        
        <span>${data.profile.companyName} (${data.symbol})</span>
        <span class="titlePercentage" id="textContainer"></span>
    </div>   
    <div class="subtitle1">
        <span>CEO: ${data.profile.ceo}</span>
        <span>Address: ${data.profile.address}, ${data.profile.city}, ${data.profile.state}, ${data.profile.country}</span>
    </div>
    <div class="subtitle2">
        <span>Website: <a href="${data.profile.website}">${data.profile.website}</a></span>
        <span>Range: ${data.profile.range} ${data.profile.currency}</span>
    </div>    
    <div class="description">
        <p>${data.profile.description}</p>
    </div>
        `;
      })
      .catch(error => {
        console.error(error);
        const profileElement = document.getElementById('profile');
        profileElement.innerHTML = '<p>Error retrieving company profile.</p>';
    });

function getPercentage(){
    fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`)
    .then(response => response.json())
    .then(data => {
    let container = document.getElementById("textContainer");
    const stockPrice = data.profile.price;
    const changePercent = data.profile.changesPercentage;
    const stockPriceText = document.createElement("span");
    stockPriceText.innerHTML = `Stock Price: $${stockPrice}`;
    const changePercentSpan = document.createElement("span");
    changePercentSpan.innerHTML = ` (${changePercent}%)`;
    if (changePercent >= 0) {
      changePercentSpan.style.color = "lightgreen";
    } else {
      changePercentSpan.style.color = "red";
    }
    container.appendChild(stockPriceText);
    container.appendChild(changePercentSpan);
  })
  .catch(error => {
    console.error(error);
  });
}
getPercentage();

const historyUrlParams = new URLSearchParams(window.location.search);
const historySymbol = historyUrlParams.get('symbol');

async function getCompanyHistory(historySymbol) {
    const historyResponse = await fetch(`https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${historySymbol}?serietype=line`);
    const historyData = await historyResponse.json();
    return historyData;
    
}
  
getCompanyHistory(historySymbol)
  .then(historyData => {
    let loader = document.getElementById("loader")
    loader.classList.remove("disappear");
    length = historyData.historical.length;
    labels = [];
    values = [];
    for (i = 0; i < length; i++) {
      labels.push(historyData.historical[i].date);
      values.push(historyData.historical[i].close);
    }
    displayChart(values, labels);
    loader.classList.add("disappear");
})
    .catch(error => {
    console.error(error);
})

function displayChart(values, labels){
    console.log(values);
    Chart.defaults.color = '#000';
    Chart.defaults.font.size = '13px';
    Chart.defaults.font.family = 'Inconsolata';
    Chart.defaults.borderColor = 'rgba(0, 18, 25, 0.3)';
    Chart.defaults.backgroundColor = 'rgba(0, 95, 115, 0.7)';
    let ctx = document.getElementById('canvas').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stock Price',
                data: values
            }]
        },
        options: {
            scales: {
                yAxis: [{
                    ticks: {
                    beginAtZero: false
                    }
            }],
            }
        },
})};