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