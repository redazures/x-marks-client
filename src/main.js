document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Trying a calculator')
    const railsAPI = 'http://localhost:3000/currencies'
    // const Apifetchadapter = new RailsFetchAdapter(railsAPI)
    // const action = currencies => (console.log(currencies.rates))
    getCurrencies(railsAPI)
    addButton()
    login()
    signup()
    // populate()
})

function getCurrencies(api) {
    fetch(api)
    .then(response => response.json())
    .then(string=>string.forEach(currency => renderCurrency(currency)))
}//getcurrencies

function renderCurrency(currency) {//this render curreceny for the initial batch from the system 
  //console.log(currency)
  if (currency.symbol!="USD"){
  const allList = document.querySelector('.add-currency-list')
  const li = document.createElement('li')
  li.dataset.currency=currency.symbol
  li.dataset.id=currency.id
  li.innerHTML=`<img src="https://freeiconshop.com/wp-content/uploads/edd/plus-flat.png" class="flag"><span>${currency.symbol}-${currency.name}</span>`
  allList.appendChild(li)
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

function unique(arr, keyProps) {
  const kvArray = arr.map(entry => {
   const key = keyProps.map(k => entry[k]).join('|');
   return [key, entry];
  });
  const map = new Map(kvArray);
  return Array.from(map.values());
 }

function populate (id){
  console.log("start looking for txns")
  fetch('http://localhost:3000/members/'+id)
    .then(res=>res.json())
    .then(user=>{
      console.log(user.transactions, user.currencies)
      if (user.currencies.length>=1){
        console.log("i am dead inside")
        user.currencies.forEach(currency=>displayBox(currency,user.transactions))
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
