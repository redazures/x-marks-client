document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    const baseUrl = 'https://api.exchangeratesapi.io/'
    const railsAPI = 'http://localhost:3000/currencies'

    const table = document.getElementById('table-body')

    const fetchadapter = new FetchAdapter(baseUrl)
    const action = currencies => (render(currencies.rates))
    fetchadapter.get('latest?base=USD',action)


    getCurrencies()

    function getCurrencies() {
        fetch(railsAPI)
            .then(response => response.json())
            .then(data => renderCurrencies(data))
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

    function renderCurrency(currency) {
        const row = document.createElement('tr')
            row.dataset.id = currency.id
    
            row.innerHTML =`
            <td>${currency.symbol}</td>
            <td>${currency.price}</td>
            <td><button>Edit</button> <button>Delete</button></td>
            `
            table.append(row)
    }

            
    function renderCurrencies(currencies) {
        currencies.forEach(currency => renderCurrency(currency))
    }
});




function renderCurrentPrice(price){
    // console.log(price)
        const actual =["Canadian Dollars","Hong Kong Dollars","Icelandic Krona","Philipino Peso","Danish Krone",]
        const table = document.getElementById('table-body')
        const row = document.createElement('tr')

        row.innerHTML =`
        <td class='api-names'>${actual[0]}</td>
        <td>${price[0]}</td>
        <td>${price[1]}</td>
        <td><button>Edit</button></td>
        <td><button>Delete</button></td>
        `
        table.append(row)
        // const names = document.querySelectorAll('.api-names')
        // for(name of names){name.innerContent="x"}

}