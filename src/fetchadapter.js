//This is my adapter
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('I am fetching ready');
});

class FetchAdapter{
    constructor(baseUrl){
        this.baseUrl
    }

    get(relativeurl){
        console.log(this.baseUrl, relativeurl)
    }
}
