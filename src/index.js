document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    const baseUrl = 'https://api.exchangeratesapi.io/'

    
    const fetchadapter = new FetchAdapter(baseUrl)
    const action = currencies => (render(currencies.rates))
         //console.log(currencies.rates))
    fetchadapter.get('latest',action)

});

function render (rates){
    console.log(rates)
    // const {cad,hkd} = rates
    // console.log(cad,hkd)
    numbers=Object.entries(rates)
    console.log(numbers)
    // for (const rate in rates){
    //     // console.log(rate)
    //     need=Object.entries(rate)
    //     console.log(need)
    // }
}