document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Trying a calculator')
    const railsAPI = 'http://localhost:3000/currencies'
    // const Apifetchadapter = new RailsFetchAdapter(railsAPI)
    // const action = currencies => (console.log(currencies.rates))
    getCurrencies(railsAPI)
    addButton()
})

function getCurrencies(api) {
    fetch(api)
    .then(response => response.json())
    .then(string=>string.forEach(currency => renderCurrency(currency)))
}//getcurrencies

function renderCurrency(currency) {//this render curreceny for the initial batch from the system
  console.log(currency)
  const allList = document.querySelector('.add-currency-list')
  const li = document.createElement('li')
  li.dataset.id=currency.id
  li.innerHTML=`<img src="https://freeiconshop.com/wp-content/uploads/edd/plus-flat.png" class="flag"><span>${currency.symbol}-${currency.name} <p>${currency.price}<p></span>`
  allList.appendChild(li)
}// this is the end of render currency



  const add = document.querySelector('.add-currency-btn')
    let tog = {
      "add-currency-btn": "add-currency-btn open",
      "add-currency-btn open": "add-currency-btn"
    }

