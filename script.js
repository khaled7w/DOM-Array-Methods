const addUser = document.getElementById('add-user');
const doubleMoney = document.getElementById('double-money');
const showMillionaires = document.getElementById('millionaires');
const sortByRichest = document.getElementById('richest');
const calculateWealth = document.getElementById('wealth');
const personContainer = document.querySelector('.all-persons ul');
const wealthContainer = document.querySelector('.all-wealth ul');

async function addNewUserAndMoneyForHim() {
  const user = await fetch('https://randomuser.me/api/');
  const data = await user.json();
  const newUser = data.results[0].name.first + ' ' + data.results[0].name.last;
  const generateRandomWealth = (Math.random() * 1000000).toFixed(0);
  const newMoney = `$${numberWithCommas(generateRandomWealth)}`;
  const newLiForPerson = document.createElement('li');
  const newLiForMoney = document.createElement('li');
  newLiForPerson.textContent = newUser;
  newLiForMoney.textContent = newMoney;
  personContainer.appendChild(newLiForPerson);
  wealthContainer.appendChild(newLiForMoney);
}

function doubleMoneyForUsers() {
  const allWealth = document.querySelectorAll('.all-wealth ul li');
  let currentMoney;
  allWealth.forEach((li) => {
    let Money = [];
    currentMoney = li.textContent.split('$').pop().split(',').join('');
    Money.push(currentMoney);
    Money.forEach((money) => {
      const doubledMoney = money * 2;
      li.textContent = '$' + numberWithCommas(doubledMoney);
    });
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function getIndexOfMillionaires() {
  const allWealth = document.querySelectorAll('.all-wealth ul li');
  const allWealthItems = Array.from(allWealth);

  const indexOfMillinaires = allWealthItems.map((li, index) => {
    const money = li.textContent.split('$').pop().split(',').join('');
    return money >= 1000000 ? index : null;
  });
  return indexOfMillinaires;
}

//Filter for people who have million or more
function showOnlyMillionaires() {
  const allPersons = document.querySelectorAll('.all-persons ul li');
  const allWealth = document.querySelectorAll('.all-wealth ul li');

  const allIndexOfMillionaires = getIndexOfMillionaires();

  const filterArrayFromEmptyIndexs = allIndexOfMillionaires.filter(
    (el) => el !== null
  );

  console.log(filterArrayFromEmptyIndexs);
  if (filterArrayFromEmptyIndexs.length === 0) {
    return;
  } else {
    personContainer.innerHTML = '';
    wealthContainer.innerHTML = '';
    filterArrayFromEmptyIndexs.forEach((el) => {
      personContainer.appendChild(allPersons[el]);
      wealthContainer.appendChild(allWealth[el]);
    });
  }
}

function sortByRichestHandler() {
  const allPersons = document.querySelectorAll('.all-persons ul li');
  const allWealth = document.querySelectorAll('.all-wealth ul li');
  const allWealthCopy = Array.from(allWealth);
  let allData = [];

  for (let i = 0; i < allWealth.length; i++) {
    const wealthEl = allWealth[i];
    const personEl = allPersons[i];

    const money = wealthEl.textContent.split('$').pop().split(',').join('');
    const newObject = {
      liContent: personEl.textContent,
      wealth: money,
    };
    allData.push(newObject);
  }

  const sortedData = allData
    .sort((a, b) => {
      return a.wealth - b.wealth;
    })
    .reverse();

  wealthContainer.innerHTML = '';
  personContainer.innerHTML = '';
  for (let i = 0; i < sortedData.length; i++) {
    const wealthEl = allWealth[i];
    const personEl = allPersons[i];

    wealthEl.textContent = '$' + numberWithCommas(sortedData[i].wealth);
    personEl.textContent = sortedData[i].liContent;

    personContainer.appendChild(personEl);
    wealthContainer.appendChild(wealthEl);
  }
}

function calculateWealthHandle() {
  const allWealth = document.querySelectorAll('.all-wealth ul li');
  const allWealthCopy = Array.from(allWealth);

  const wealthes = allWealthCopy.map((el) => {
    return el.textContent.split('$').pop().split(',').join('');
  });

  const sum = wealthes.reduce((preValue, curValue) => {
    return preValue + parseInt(curValue);
  }, 0);

  const sumValue = document.querySelector('.sum-value');
  sumValue.textContent = '$' + numberWithCommas(sum);

  const sumContainer = document.querySelector('.sum-container');
  sumContainer.style.visibility = 'visible';
}

addUser.addEventListener('click', addNewUserAndMoneyForHim);
doubleMoney.addEventListener('click', doubleMoneyForUsers);
showMillionaires.addEventListener('click', showOnlyMillionaires);
sortByRichest.addEventListener('click', sortByRichestHandler);
calculateWealth.addEventListener('click', calculateWealthHandle);
