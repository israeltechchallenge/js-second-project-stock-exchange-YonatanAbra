class Marquee {
    constructor(element) {
      this.element = element;
      this.data = [];
      this.tickerList = document.getElementById('tickerList');
    }
  
    async fetchMarquee() {
      const url = `${baseUrl}/stock-screener?`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        let tickerContent = '';
        for (let stock of data) {
          tickerContent += 
            `<li class="marqueeListItem"> 
                <span>${stock.companyName} (${stock.symbol})</span>
                <span> $${stock.price}<span>
            </li>`;
        }
        this.element.innerHTML = tickerContent;
        this.tickerList.addEventListener('mouseenter', () => {this.tickerList.style.animationPlayState = 'paused';
        });     
        this.tickerList.addEventListener('mouseleave', () => {this.tickerList.style.animationPlayState = 'running';});
        } catch (error) {
        Toastify({
          text: `Error fetching stock data at Marquee Element: ${error.message}`,
          duration: 5000,
          gravity: 'top',
          position: 'center',
          backgroundColor: 'linear-gradient(to right, #ff416c, #ff4b2b)',
        }).showToast();
      }
    }
  }
  
  const tickerList = new Marquee(document.getElementById('tickerList'));
  tickerList.fetchMarquee();
