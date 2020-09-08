document.addEventListener('DOMContentLoaded', (event) => {
    console.log('Trying a calculator')
    const railsAPI = 'http://localhost:3000/currencies'
    // const Apifetchadapter = new RailsFetchAdapter(railsAPI)
    // const action = currencies => (console.log(currencies.rates))
    getCurrencies(railsAPI)
    addButton()
    login()
    signup()
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


function login(){
  const log = document.querySelector('.login')
  log.addEventListener('submit',(e)=>{//console.log("login")
    e.preventDefault()
    const member=log.name.value
    console.log(member)
    fetch('http://localhost:3000/members')
    .then(res=>res.json())
    .then(users=>users.forEach(user=>{
      if(user.name==member){
        const move = document.querySelectorAll('.forms')
        const date = document.querySelector('.date')
        date.dataset.id = user.id
        move[0].style.left='-100%'
        console.log(user.id)
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
        const move = document.querySelectorAll('.forms')
        const date = document.querySelector('.date')
        date.dataset.id = user.id
        move[0].style.left='-100%'
        })//this should be the end of fetch
  })//This is the end of my signup event
}//Ths is the end of my login

