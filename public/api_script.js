const btnSearch = document.querySelector("#searchBtn");
btnSearch.addEventListener("click", ()=>{
    const form = document.querySelector("form");
    const cryptoName = form.querySelector("#crypto").value;
    const currencyName = form.querySelector("#currency").value;
    const date = new Date(form.querySelector("#date").value);    
    if(!(cryptoName && currencyName && date)){
        alert("Всі поля повинні бути заповнені...");
        return;
    }
    const dateStr = `${date.getDate()}-${String(date.getMonth()+1).padStart(2,"0")}-${date.getFullYear()}`;
    searchHistory(cryptoName, currencyName, dateStr, (course, img)=>{
        const cryptoMessage = document.querySelector("#cryptoMessage");
        cryptoMessage.style.display="flex";
        cryptoMessage.innerHTML = `
            <img src="${img}">
            <p>На ${dateStr} вартість ${cryptoName} становить ${course} ${currencyName}</p>
        `
    });
});

function searchHistory(crypto, currency, date, callback){
    fetch(`https://api.coingecko.com/api/v3/coins/${crypto.toLowerCase()}/history?date=${date}`,{
        "method": "GET",
        headers: {    
            'Content-Type': 'application/json'
        }
    })
    .then(res=>{
        if(!res.ok) throw "The error happened when querying API";
    }).then(res=>res.json())
    .then(data=>{
        const img = data["image"]["thumb"];
        const course = data["market_data"]["current_price"][`${currency}`];
        callback(course, img);
    })
    .catch(alert);
}