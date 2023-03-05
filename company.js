class companyInfo {
  constructor(paraentElement, symbol){
      this.paraentElement = paraentElement;
      this.symbol = symbol;
      this.baseUrl = "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3";
      this.historySymbol = symbol;
  }
  async load() {
      await this.getCompanyProfile();
      this.getPercentage();
  }
  async getCompanyProfile() {
      const response = await fetch(this.baseUrl + `/company/profile/${this.symbol}`);
      const data = await response.json();
      this.data = data;
      this.renderProfile();
  }
  getPercentage() {
    fetch( `${this.baseUrl}/company/profile/${this.symbol}`)
      .then((response) => response.json())
      .then((data) => {
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
      .catch((error) => {
        console.error(error);
      });
  }
  renderProfile() {
      const bigContainer = document.createElement('div');
      bigContainer.classList.add('bigContainer');
  
      const profileContainer = document.createElement('div');
      profileContainer.classList.add('profileContainer');
      profileContainer.setAttribute('id', 'profile');
  
      const titleContainer = document.createElement('div');
      titleContainer.classList.add('titleContainer', 'gradient-border');
      titleContainer.setAttribute('id', 'titleContainer');
  
      const image = document.createElement('img');
      image.setAttribute('src', `${this.data.profile.image}`);
      image.onerror = () => {
          const defaultImgElement = document.createElement("img");
          defaultImgElement.setAttribute("src", "download.png");
          titleContainer.replaceChild(defaultImgElement, image);
        };
      image.setAttribute('alt', `${this.data.profile.companyName}`);
      titleContainer.appendChild(image);
  
      const companyName = document.createElement('span');
      companyName.textContent = `${this.data.profile.companyName} (${this.symbol})`;
      titleContainer.appendChild(companyName);
  
      const titlePercentage = document.createElement('span');
      titlePercentage.classList.add('titlePercentage');
      titlePercentage.setAttribute('id', 'textContainer');
      titleContainer.appendChild(titlePercentage);
  
      profileContainer.appendChild(titleContainer);
  
      const subtitle1 = document.createElement('div');
      subtitle1.classList.add('subtitle1');
  
      const ceo = document.createElement('span');
      ceo.textContent = `CEO: ${this.data.profile.ceo}`;
      subtitle1.appendChild(ceo);
  
      const address = document.createElement('span');
      address.textContent = `Address: ${this.data.profile.address}, ${this.data.profile.city}, ${this.data.profile.state}, ${this.data.profile.country}`;
      subtitle1.appendChild(address);
  
      profileContainer.appendChild(subtitle1);
  
      const subtitle2 = document.createElement('div');
      subtitle2.classList.add('subtitle2');
  
      const website = document.createElement('span');
      const websiteLink = document.createElement('a');
      websiteLink.setAttribute('href', `${this.data.profile.website}`);
      websiteLink.textContent = `${this.data.profile.website}`;
      website.appendChild(websiteLink);
      subtitle2.appendChild(website);
  
      const range = document.createElement('span');
      range.textContent = `Range: ${this.data.profile.range} ${this.data.profile.currency}`;
      subtitle2.appendChild(range);
  
      profileContainer.appendChild(subtitle2);
  
      const description = document.createElement('div');
      description.classList.add('description');
  
      const descriptionText = document.createElement('p');
      descriptionText.textContent = `${this.data.profile.description}`;
      description.appendChild(descriptionText);
  
      profileContainer.appendChild(description);
  
      bigContainer.appendChild(profileContainer);
  
      const canvas = document.createElement('canvas');
      canvas.classList.add('graphContainer');
      canvas.id ='canvas';
  
      const loader = document.createElement('span');
      loader.classList.add('spinner-border', 'disappear');
      loader.setAttribute('id', 'loader');
      loader.setAttribute('role', 'status');
      canvas.appendChild(loader);
  
      bigContainer.appendChild(canvas);
  
      this.paraentElement.appendChild(bigContainer);
  }
  async addChart() {
      await this.getCompanyHistory();
    }
    
  async getCompanyHistory() {
      const historyResponse = await fetch( `${this.baseUrl}/historical-price-full/${this.historySymbol}?serietype=line`);
      const historyData = await historyResponse.json();
      this.historyData = historyData;
      this.displayChart();
  }
    
  displayChart() {
      let loader = document.getElementById("loader");
      loader.classList.remove("disappear");
      let length = this.historyData.historical.length;
      let labels = [];
      let values = [];
      for (let i = 0; i < length; i++) {
        labels.push(this.historyData.historical[i].date);
        values.push(this.historyData.historical[i].close);
      }
      console.log(values);
      this.showChart(values, labels);
  }
    
  showChart(values, labels) {
      console.log(values);
      Chart.defaults.color = "#000";
      Chart.defaults.font.size = "13px";
      Chart.defaults.font.family = "Inconsolata";
      Chart.defaults.borderColor = "rgba(0, 18, 25, 0.3)";
      Chart.defaults.backgroundColor = "rgba(0, 95, 115, 0.7)";
      let ctx = document.getElementById("canvas").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Stock Price",
              data: values,
            },
          ],
        },
        options: {
          scales: {
            yAxis: [
              {
                ticks: {
                  beginAtZero: false,
                },
              },
            ],
          },
        },
      });
  }}
