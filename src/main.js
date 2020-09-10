document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Trying a calculator')
    const railsAPI = 'http://localhost:3000/currencies/'
    // const Apifetchadapter = new RailsFetchAdapter(railsAPI)
    // const action = currencies => (console.log(currencies.rates))
    login()
    signup()
    logout()
    getCurrencies(railsAPI)
    clickHandler()
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
    li.innerHTML=`<img src="${currency.image}" class="flag"><span class='iso'>${currency.symbol}-${currency.name}<span class="price" data-id='${currency.id}' data-currency='${currency.name}' data-symbol='${currency.symbol}'>Price</span></span>`
  allList.appendChild(li)
  // console.log(list)
  li.addEventListener('click',(e)=>{ //console.log("waht what is two words")
    displayBox(currency)
    li.className= "disabled"
  })//This is the end of of my event listener
  }
}// this is the end of render currency

//These two varaibles are used for login and signup
const move = document.querySelectorAll('.forms')
const date = document.querySelector('.date')
const add = document.querySelector('.add-currency-btn')

function login(input){
  const log = document.querySelector('.login')
  const add = document.querySelector('.add-currency-btn')
  log.addEventListener('submit',(e)=>{//console.log("login")
    e.preventDefault()
    const name= input || log.name.value; //console.log(name)
    // console.log(name)
    fetch('http://localhost:3000/members')
    .then(res=>res.json())
    .then(users=>users.forEach(user=>{
      if(user.name==name){
        date.dataset.id = user.id
        move[0].style.left='-100%'
        populate(date.dataset.id)
        getPrices()
        const welcomeMessage = document.querySelector('.username')
        welcomeMessage.innerText = user.name
        }
      }//end of if statement inside the fetch function 
    ))//end of the last then statement 
  })//This is the end of login event
}//Ths is the end of my login

function signup(){
  const signup = document.querySelector('.signup')
  signup.addEventListener('submit',(e)=>{//console.log("signup")
    e.preventDefault() // console.log(signup.name.value, signup.email.value, signup.age.value, signup.creditcard.value)
    faker={name:signup.name.value, email:signup.email.value, age: signup.age.value, creditcard: signup.creditcard.value}
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
        populate(date.dataset.id)
        getPrices()
        })//this should be the end of fetch
  })//This is the end of my signup event
}//Ths is the end of my login

function logout() { // Logout Function
  const dateBtn = document.querySelector('.date')
  dateBtn.addEventListener('click', e => {
    location.reload();
  })
}

function populate (id,num){
  console.log("start looking for txns")
  fetch('http://localhost:3000/members/'+id)
    .then(res=>res.json())
    .then(user=>{ //console.log(user.transactions, user.currencies)
      if (num==1){
        displayTxns(user.currencies,user.transactions)
      }else{
            if (user.currencies.length>=1){//console.log("i am dead inside")
              user.currencies.forEach(currency=>displayBox(currency,user.transactions))
              user.transactions.forEach(txn=>{
                updateBalance(txn.quantity,txn.price)
              })//end of my transaction
              disable()
            }
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
  if (txns){
  txns.forEach(txn=>{// console.log(txn.currency_id==currency.id)
    if (txn.currency_id==currency.id){quantity+=txn.quantity}}) // console.log(quantity)
  }//If there are transactiosn do this
  li.className='currency'
  li.id=currency.symbol
  li.dataset.currency_id=currency.id
  li.innerHTML=`<img src="${currency.image}" alt="JPY" class="flag" width="100px">
  <div class='info'>
      <p class="input"><span class="currency-symbol">${currency.symbol}</span><span class="balance" width='80%'>${quantity}</span></p>
      <p class='currency-name'>${currency.name}</p>
      <p class='base-currency-rate'>Price   <span class='price' data-id='${currency.id}' data-symbol='${currency.symbol}'>${currency.price}</span></p>
  </div>
  <span class='buy'>Buy <i id="buying" class="fas fa-money-bill-alt"></i></span>
  <span class='sell'>Sell <i id="selling" class="fas fa-cash-register"></i></span>
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
  const current = document.querySelector('.add-currency-list').querySelectorAll('li')// current.length
  for (item of current){//console.log(item.dataset.currency)
    if(list.includes(item.dataset.currency)){item.className="disabled";}
  }//this is the end of my for loop
}

function clickHandler() {
  document.addEventListener('click', (e) => {//console.log(e.target)
    if (e.target.matches('.buy')|| e.target.matches('#buying')){//console.log(typeof price, typeof currency_id, typeof quantity, typeof user_id) //console.log(price, currency_id, quantity, user_id) //console.log("you are in buy")
      const tarjet = e.target
      post(tarjet,1000)
    }
    else if (e.target.matches(`.sell`)|| e.target.matches('#selling')) {
      const tarjet = e.target
      post(tarjet,-1000)
    }
    else if (e.target.matches('#account')){
      remove()
      populate(date.dataset.id,1)
      document.querySelector('#account').style.color='red'
      document.querySelector('#account').id='transactions'
    }
    else if (e.target.matches('#transactions')){
      remove()
      populate(date.dataset.id)
      document.querySelector('#transactions').style.color='#edf5e1'
      document.querySelector('#transactions').id='account'
      document.querySelector('.balance').innerText=0
    }
    else if (e.target.matches('#current')){
      if (document.querySelector('#transactions')){alert('Go Back To Purchasing Screen')}
      if (add.className=="add-currency-btn" && document.querySelector('#account')){add.className="add-currency-btn open"}else{add.className="add-currency-btn"
    }
    }
  })
}

function getPrices(){
  console.log("prices working")
  fetch('https://api.exchangeratesapi.io/latest?base=USD')
  .then(res=>res.json())
  .then(string=>{ //console.log(string.rates["CAD"])
    const rates = string.rates
    const list = document.querySelector('.add-currency-list').querySelectorAll('.price')
    for (item of list){//console.log(price.dataset.symbol) // const listIten =list //ask the teachers why I am unable to assign a value after the update
      const sym = item.dataset.symbol
      const id = item.dataset.id
      const newPrice = rates[sym]
        fetch(`http://localhost:3000/currencies/${id}`,{//updating the currencies
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          "accept": "application/json"
        },
          body: JSON.stringify({
          price: newPrice
        })
        })
        .then(resp=>resp.json())
        .then(string=>{
          const item = document.querySelectorAll(`[data-symbol="${sym}"]`)
          item.forEach(line=>(line.innerText=string.price)) // console.log(item,sym,string.price)
        })//this updates the prices of all currencies
    }//end of my for loop
  })//end of my fetch
}//end of my getprices

function updateBalance(quantity,price){
  const bal = parseInt(document.querySelector('.balance').innerText)
  const newBal = (quantity/price) + bal
  document.querySelector('.balance').innerText = newBal
}

function post(clickedObj,num){
  const li = clickedObj.closest('li')
  const price = parseFloat(li.querySelector('.price').innerText)
  const currency_id= parseInt(li.dataset.currency_id)
  const liQuantity = parseInt(li.querySelector('.balance').innerText)// console.log(typeof liQuantity)
  const user_id= parseInt(date.dataset.id)
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({price: price, member_id: user_id, currency_id: currency_id, serial: Math.random()*10000000, quantity: num})
    }
    fetch('http://localhost:3000/transactions/', options)
      .then((response) => response.json())
      .then(string => {
        const updateBuys = liQuantity + string.quantity
        li.querySelector('.balance').innerText=updateBuys //.innerText = updateBuys
        updateBalance(string.quantity,string.price)
      })
}

function remove(){
  const display= document.querySelector('.currencies')
  while(display.childElementCount>1){display.removeChild(display.lastChild)}
}

function displayTxns(currency,txns){ //console.log(txns)//console.log(list.includes(currency.symbol))//console.log(currency,txns)
  const display= document.querySelector('.currencies')
  for (var i = 0; i < currency.length; i++) {
    const li = document.createElement('li')
    const cur=currency[i]
    const txn=txns[i]
    const quant = (txn.quantity/txn.price)
    // debugger
        li.innerHTML=`<img src="${cur.image}" alt="JPY" class="flag" width="100px">
        <div class='info'>
            <p class="input"><span class="currency-symbol">${cur.symbol}</span><span class="balance" width='80%'>${txn.quantity}</span></p>
            <p class='currency-name'>Net USD ${quant}</p>
            <p class='base-currency-rate'>Date: <span>${txn.created_at}</span></p>
            <span class='txn'>TXN:${i+1}</span>
        </div>
        `
    display.appendChild(li)
  }
}//The end of display box