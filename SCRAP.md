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


document.addEventListener('DOMContentLoaded', (event) => {
    console.log('I am fetching ready');
});

class FetchAdapter{
    constructor(baseUrl){
        this.baseUrl=baseUrl
    }

    get(relativeurl, callback){
        // console.log(this.baseUrl, relativeurl)
        fetch(`${this.baseUrl}${relativeurl}`)
        .then(resp=>resp.json())
        // .then(console.log)
        .then(callback)
        }
}

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