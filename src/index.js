document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    const baseurl = 'http://localhost:3000/currencies'
    
    const fetchadapter = new FetchAdapter('http://localhost:3000/currencies')
    
    fetchadapter.get('currencies')
});

