document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    const baseUrl = 'https://api.exchangeratesapi.io/'
    const railsAPI = 'http://localhost:3000/currencies'
    const table = document.getElementById('table-body')
    

    
    const fetchadapter = new FetchAdapter(baseUrl)
    const action = currencies => (render(currencies.rates))
         //console.log(currencies.rates))
    fetchadapter.get('latest?base=USD',action)


    function getCurrencies() {
        fetch(railsAPI)
            .then(response => response.json())
            .then(data => renderCurrencies(data))

    }

    getCurrencies()

    function render (rates){
        // console.log(rates)
        // const {cad,hkd} = rates
        // console.log(cad,hkd)
        numbers=Object.entries(rates)
        // console.log(numbers)
        numbers.forEach(price => renderRealApi(price))
        // for (const rate in rates){
        //     // console.log(rate)
        //     need=Object.entries(rate)
        //     console.log(need)
        // }
        
    }

    function renderRealApi(rates) {
        rates.forEach(value => renderRealCurrency(value))
    }

    function renderRealCurrency(value) {
        const row = document.createElement('tr')
        row.dataset.id = value.id
            
            row.innerHTML =`
            <td>${value}</td>
            <td>${value}</td>
            <td><button>Edit</button> <button>Delete</button></td>
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

