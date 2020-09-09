document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Trying a calculator')
    const railsAPI = 'http://localhost:3000/currencies/'
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
})


function todaysDate() {
  let today = new Date().toLocaleDateString()
  return today
}

function getCurrencies(api) {
    fetch(api)
    .then(response => response.json())
    .then(string=>string.forEach(currency => renderCurrency(currency)))
}//getcurrencies

function renderCurrency(currency) {//this render curreceny for the initial batch from the system; console.log(currency)
  console.log("This is render currency")
  if (currency.symbol!="USD"){
  const allList = document.querySelector('.add-currency-list')
  const li = document.createElement('li')
  li.dataset.currency=currency.symbol
  li.dataset.id=currency.id
  li.innerHTML=`<img src="https://freeiconshop.com/wp-content/uploads/edd/plus-flat.png" class="flag"><span>${currency.symbol}-${currency.name}<i class="fas fa-money-bill-alt">Buy</i></span>`
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

function login(){
  const log = document.querySelector('.login')
  log.addEventListener('click',(e)=>{
    e.preventDefault()
    console.log("you are at login")
    if (add.className=="add-currency-btn"){//console.log("changed to open")
      add.className="add-currency-btn open"
    } else{//console.log("changed to closed")
      add.className="add-currency-btn"
    }
  })//This is the end of my addButton
}//Ths is the end of my login

//These two varaibles are used for login and signup
const move = document.querySelectorAll('.forms')
const date = document.querySelector('.date')

function login(){
  const log = document.querySelector('.login')
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
    if (txn.currency_id==currency.id){quantity+=txn.quantity}})
  console.log(quantity)
  li.className='currency'
  li.id=currency.symbol
  li.dataset.currency_id=currency.id
  li.innerHTML=`<img src="https://cdn.britannica.com/91/1791-004-1998D4C6/Flag-Japan.jpg" alt="JPY" class="flag" width="100px">
  <div class='info'>
      <p class="input"><span class="currency-symbol">${currency.symbol}</span><span class="balance" width='80%'>${quantity}</span></p>
      <p class='currency-name'>${currency.name}</p>
      <p class='base-currency-rate'>Price<span>  ${currency.price}</span></p>
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
  document.addEventListener('click', (e) => {
    // console.log(e.target)

    if (e.target.matches('.buy')) {
      console.log("you are in buy")
      const button = e.target
      
      const buysCurrency = button.previousElementSibling.childNodes[1].childNodes[0].textContent
      const buys = button.previousElementSibling.childNodes[1].childNodes[1]
      console.log(button.parentElement)
      const currentBuys = parseInt(buys.textContent)
      const id = button.parentElement.dataset.currency_id
      const name = button.previousElementSibling.childNodes[3].textContent
      const symbol = button.previousElementSibling.childNodes[1].childNodes[0].textContent
      const price = parseInt(button.parentElement.querySelector('.base-currency-rate').querySelector('span').innerText)


      // console.log(buysCurrency, buys.textContent, id)
      // console.log(price, parseInt(date.dataset.id), parseInt(id), Date.now())

      // if (buys.textContent) {
      //   // console.log(button)
      // } else if (buys.textContent !== "0") {
      //   console.log("You can Sell")
      //   button.nextElementSibling.className = "sell"
        
      // }
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accepts": "application/json"
            },
            body: JSON.stringify({price: price, member_id: parseInt(date.dataset.id), currency_id: parseInt(id), serial: 1234567, quantity: 1000})
          }
      
          fetch('http://localhost:3000/transactions/', options)
            .then((response) => response.json())
            .then(string => {
              const updateBuys = currentBuys + string.quantity
              buys.textContent = updateBuys
            })
    }
    else if (e.target.matches(`.sell`)) {
      const button = e.target
      
      const sellCurrency = button.previousElementSibling.previousElementSibling.childNodes[1].childNodes[0].textContent
      const sells = button.previousElementSibling.previousElementSibling.childNodes[1].childNodes[1]
      const currentSells = parseInt(sells.textContent)
      const updateSells = currentSells - 1000
      const id = button.parentElement.dataset.currency_id
      const name = button.previousElementSibling.previousElementSibling.childNodes[3].textContent
      const symbol = button.previousElementSibling.previousElementSibling.childNodes[1].childNodes[0].textContent
      const price = parseInt(button.parentElement.querySelector('.base-currency-rate').querySelector('span').innerText)
      

      // console.log(sellCurrency, sells.textContent, id)
      // console.log(price, parseInt(date.dataset.id), parseInt(id), Date.now())
      
      // if (sells.textContent <= "0") {
      //   alert("You have none to sell")
      //   // console.log(button)
      //   // button.className = ("disabled")
      // } else if (sells.textContent >= "0") {
      //   console.log("Go ahead and Sell")
      //   sells.textContent = updateSells
      //   button.className = ("sell")

      // }
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accepts": "application/json"
            },
            body: JSON.stringify({price: price, member_id: parseInt(date.dataset.id), currency_id: parseInt(id), serial:1234567, quantity: -1000})
          }
      
          fetch('http://localhost:3000/transactions/', options)
            .then((response) => response.json())
            .then(string => {
              const updateSells = currentSells + string.quantity
              sells.textContent = updateSells
            })
    }
  })
}


