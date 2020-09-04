//This is my adapter
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
