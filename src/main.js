document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Trying a calculator')
    const railsAPI = 'http://localhost:3000/currencies'
    // const Apifetchadapter = new RailsFetchAdapter(railsAPI)
    // const action = currencies => (console.log(currencies.rates))
    addButton()
    login()
    signup()
    // populate()
    getCurrencies(railsAPI)
    clickHandler()
    // const list=getlist()
    // debugger
    // console.log(list)
    // getPrices()
})


function todaysDate() {
  let today = new Date().toLocaleDateString()
  return today
}

function getCurrencies(api) {
    fetch(api)
    .then(response => response.json())
    .then(string=>string.forEach(currency => {
          renderCurrency(currency)
          }//end of the functions inside the brackets 
        )//end of the last 
      )//end of the last then
}//getcurrencies

function renderCurrency(currency) {//this render curreceny for the initial batch from the system; console.log(currency)
  console.log("This is render currency")
  if (currency.symbol!="USD"){
  const allList = document.querySelector('.add-currency-list')
  const li = document.createElement('li')
  li.dataset.currency=currency.symbol
  li.dataset.id=currency.id
  li.innerHTML=`<img src="https://freeiconshop.com/wp-content/uploads/edd/plus-flat.png" class="flag"><span class='iso'>${currency.symbol}-${currency.name}<span class="price" data-id='${currency.id}' data-currency='${currency.name}' data-symbol='${currency.symbol}'>Price</span></span>`
  allList.appendChild(li)
  // console.log(list)
  }
}// this is the end of render currency

function addButton(){
  const add = document.querySelector('.add-currency-btn')
  add.addEventListener('click',(e)=>{
    console.log("you are at add")
    if (add.className=="add-currency-btn"){//console.log("changed to open")
      add.className="add-currency-btn open"
    } else{//console.log("changed to closed")
      add.className="add-currency-btn"
    }
  })//This is the end of my addButton
}//this is the end of my button

//These two varaibles are used for login and signup
const move = document.querySelectorAll('.forms')
const date = document.querySelector('.date')

function login(){
  const log = document.querySelector('.login')
  const add = document.querySelector('.add-currency-btn')
  log.addEventListener('submit',(e)=>{//console.log("login")
    e.preventDefault()
    const name=log.name.value; console.log(name)
    fetch('http://localhost:3000/members')
    .then(res=>res.json())
    .then(users=>users.forEach(user=>{
      if(user.name==name){
        date.dataset.id = user.id
        move[0].style.left='-100%'
        populate(date.dataset.id)
        getPrices()
        }
      }//end of if statement inside the fetch function 
    ))//end of the last then statement 
  })//This is the end of login event
}//Ths is the end of my login

function signup(){
  const signup = document.querySelector('.signup')
  signup.addEventListener('submit',(e)=>{console.log("signup")
    e.preventDefault()
    console.log(signup.name.value, signup.email.value, signup.age.value, signup.creditcard.value)
    faker={
      name:signup.name.value, 
      email:signup.email.value, 
      age: signup.age.value, 
      creditcard: signup.creditcard.value
    }
    fetch('http://localhost:3000/members',{
      method: "POST",
      headers: {
      "Content-type": "application/json",
      "accept": "application/json"
      },
      body: JSON.stringify(
        faker
      )
      }).then(res=>res.json())
      .then(user=>{
        console.log(user)
        date.dataset.id = user.id
        move[0].style.left='-100%'
        populate(date.dataset.id )
        })//this should be the end of fetch
  })//This is the end of my signup event
}//Ths is the end of my login

function populate (id){
  console.log("start looking for txns")
  fetch('http://localhost:3000/members/'+id)
    .then(res=>res.json())
    .then(user=>{
      console.log(user.transactions, user.currencies)
      if (user.currencies.length>=1){
        console.log("i am dead inside")
        user.currencies.forEach(currency=>displayBox(currency,user.transactions))
        disable()
      }
    })
}

function displayBox(currency,txns){ //console.log(txns)//console.log(list.includes(currency.symbol))
  const display= document.querySelector('.currencies')
  const list = getlist()
  if(!list.includes(currency.symbol)){
  const li = document.createElement('li')
  display.appendChild(li)
  let quantity = 0
  txns.forEach(txn=>{// console.log(txn.currency_id==currency.id)
    if (txn.currency_id==currency.id){quantity+=txn.quantity}
  }) // console.log(quantity)
  li.className='currency'
  li.id=currency.symbol
  li.dataset.currency_id=currency.id
  li.innerHTML=`<img src="https://cdn.britannica.com/91/1791-004-1998D4C6/Flag-Japan.jpg" alt="JPY" class="flag" width="100px">
  <div class='info'>
      <p class="input"><span class="currency-symbol">${currency.symbol}</span><span class="balance" width='80%'>${quantity}</span></p>
      <p class='currency-name'>${currency.name}</p>
      <p class='base-currency-rate'>Price   <span class='price' data-id='${currency.id}' data-symbol='${currency.symbol}'>${currency.price.toFixed(6)}</span></p>
  </div>
  <span class='buy'>Buy <i class="fas fa-money-bill-alt"></i></span>
  <span class='sell'>Sell <i class="fas fa-cash-register"></i></span>
  `
  }//The end of my if
}//The end of display box

function getlist(){
  array=[]
  const display= document.querySelector('.currencies')
  let list = display.querySelectorAll('li')
  for(item of list){// console.log(item)
    array.push(item.id)
  }
  return array
}

function disable(){//console.log("I am seeing where the disable should begin")
  const list=getlist()
  const current = document.querySelector('.add-currency-list').querySelectorAll('li')
  // current.length
  for (item of current){//console.log(item.dataset.currency)
    if(list.includes(item.dataset.currency)){item.className="disabled";}
  }//this is the end of my for loop
  // console.log(list)
  // if(list.includes(li.dataset.currency)){li.className="disabled"}
}

function clickHandler() {
  document.addEventListener('click', (e) => {//console.log('e.target')
    if (e.target.matches('.buy')) {
      console.log("you are in buy")
      const button = e.target
      const buysCurrency = button.previousElementSibling.childNodes[1].childNodes[0].textContent
      const buys = button.previousElementSibling.childNodes[1].childNodes[1]
      const currentBuys = parseInt(buys.textContent)
      const updateBuys = currentBuys + 1000
      buys.textContent = updateBuys
      const id = button.parentElement.dataset.currency_id

      console.log(buysCurrency, buys.textContent, id.textContent)

      if (buys.textContent) {
        button.nextElementSibling.className = "sell"
        console.log(button)
      } else if (buys.textContent !== "0") {
        console.log("You can Sell")
        button.nextElementSibling.className = "sell"

        // const options = {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //     "Accepts": "application/json"
        //   },
        //   body: JSON.stringify({ price: buys.textContent})
        // }
    
        // fetch(railsAPI + id, options)
        //   .then((response) => response.json())
        //   .then(console.log)
      }
    }
    else if (e.target.matches(`.sell`)) {
      const button = e.target
      const sellCurrency = button.previousElementSibling.previousElementSibling.childNodes[1].childNodes[0].textContent
      const sells = button.previousElementSibling.previousElementSibling.childNodes[1].childNodes[1]
      const currentSells = parseInt(sells.textContent)
      const updateSells = currentSells - 1000
      const id = button.parentElement.dataset.currency_id

      console.log(sellCurrency, sells.textContent, id)
      
      if (sells.textContent <= "0") {
        alert("You have none to sell")
        // console.log(button)
        // button.className = ("disabled")
      } else if (sells.textContent >= "0") {
        console.log("Go ahead and Sell")
        sells.textContent = updateSells
        button.className = ("sell")
        // const options = {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //     "Accepts": "application/json"
        //   },
        //   body: JSON.stringify({ price: sells.textContent})
        // }
    
        // fetch(railsAPI + id, options)
        //   .then((response) => response.json())
        //   .then(console.log)
      }
    }
  })
}

function getPrices(){
  console.log("prices working")
  fetch('https://api.exchangeratesapi.io/latest?base=USD')
  .then(res=>res.json())
  .then(string=>{
    console.log(string.rates["CAD"])
    const rates = string.rates
    const list = document.querySelector('.add-currency-list').querySelectorAll('.price')
    for (price of list){//console.log(price.dataset.symbol)
      const sym = price.dataset.symbol
      const id = price.dataset.id
      price.innerText=rates[sym]
      console.log(id,sym,rates[sym])
      price.innerText = rates[sym].toFixed(6)
      //updating the currencies
        fetch(`http://localhost:3000/currencies/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          "accept": "application/json"
        },
          body: JSON.stringify({
          price: price.innerText
        })
        })//this is the end of my update currencies
    }//end of my for loop
  })//end of my fetch
}//end of my getprices
