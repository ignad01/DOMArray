const main = document.getElementById('main');
const addUserBtn = document.getElementById('adduser');
const doubleBtn = document.getElementById('double');
const shortBtn = document.getElementById('short');
const millionairesBtn = document.getElementById('onlyMillionaires');
const totalBtn = document.getElementById('totalWealth');

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

//generate random user
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];
    const newUser = {
        name: user.name.first + " " + user.name.last,
        money : Math.floor(Math.random() * 1000000)
    }

    updateDOM();
    addData(newUser);
}
// add data to data array
function addData(obj) {
    data.push(obj);

    updateDOM();
}

// update DOM
function updateDOM(providedData = data){
    main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`

    // for(let i of providedData){
    //     let element = document.createElement('div');
    //     element.classList.add('person');
    //     element.innerHTML = `<strong>${i.name}</strong>₹ ${i.money}`
    //     main.appendChild(element);
    // }

    providedData.forEach(user =>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${user.name}</strong>₹ ${user.money}`
        main.appendChild(element);
    })
}

// double money
function doubleMoney(){
    data = data.map(item =>{
        return {...item, money: item.money * 2};
    })
    updateDOM();
}

// richest person
function shortRichest(){
    data = data.sort((a,b) => b.money - a.money);

    updateDOM();
} 

// short millionaires
function onlyMillionaires(){
    data = data.filter(item => item.money > 1000000);
    updateDOM();
}

// calculate total wealth
function totalWealth(){
    let total_wealth = 0;
    for(let i = 0; i<data.length; i++){
        total_wealth += data[i].money;
    }

    const totalDiv = document.createElement('div');
    totalDiv.classList.add('person');
    totalDiv.classList.add('total');
    totalDiv.innerHTML = `<strong>Total Wealth</strong>₹ ${total_wealth}`
    main.appendChild(totalDiv);

    // updateDOM();
}

// Add Event listener 
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
shortBtn.addEventListener('click', shortRichest);
millionairesBtn.addEventListener('click', onlyMillionaires);
totalBtn.addEventListener('click', totalWealth);