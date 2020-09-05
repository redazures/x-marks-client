document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    const baseUrl = 'https://api.exchangeratesapi.io/'
    const railsAPI = 'http://localhost:3000/currencies'

    const table = document.getElementById('table-body')

    const fetchadapter = new FetchAdapter(baseUrl)
    // const action = currencies => (render(currencies.rates)) // is just rendering currencies, you cannot see the API
    // fetchadapter.get('latest?base=USD',action)

    getCurrencies()

    function getCurrencies() {
        fetch(railsAPI)
            .then(response => response.json())
            // .then(data => renderCurrencies(data))
            .then(string=>string.forEach(currency => renderCurrency(currency)))
    }//getcurrencies

    function render (rates){
        numbers=Object.entries(rates)
        numbers.forEach(price => renderRealApi(price))
    }

    function renderRealApi(rates) {
        renderRealCurrency(rates)
    }

    function renderRealCurrency(value) {
        const row = document.createElement('tr')
        row.dataset.id = value.id
            
            row.innerHTML =`
            <td>Name of Currency</td>
            <td>${value[0]}</td>
            <td>${value[1]}</td>
            <td><button>Buy</button></td>
            <td><button>Sell</button></td>
            `
            table.append(row)
    }

    function renderCurrency(currency) {//this render curreceny for the initial batch from the system
        const row = document.createElement('tr')
            row.dataset.id = currency.id
            row.innerHTML =`
            <td>${currency.name}</td>
            <td>${currency.symbol}</td>
            <td>${currency.price}</td>
            <td><button>Buy</button></td>
            <td><button>Sell</button></td>`
            table.append(row)
    }// this is the end of render currency

});