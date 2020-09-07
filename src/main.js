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
  li.innerHTML=`<img src="https://freeiconshop.com/wp-content/uploads/edd/plus-flat.png" class="flag"><span>${currency.symbol}-${currency.name}</span>`
  allList.appendChild(li)
}// this is the end of render currency


function addButton(){
  const add = document.querySelector('.add-currency-btn')
    
  add.addEventListener('click',(e)=>{
    console.log("you are at add")
  })//This is the end of my addButton
}//this is the end of my button
