//global variables
const balanceEl = document.querySelector("#balance");
const money_plusEl = document.querySelector("#money-plus");
const money_minusEl = document.querySelector("#money-minus");
const listEl = document.querySelector("#list");
const formEl = document.querySelector("#form");
const textEl = document.querySelector("#text");
const amountEl = document.querySelector("#amount");

const dummyTranx = [
  { id: 1, text: "flower", amount: -20 },
  { id: 2, text: "salary", amount: 300 },
  { id: 3, text: "book", amount: -10 },
  { id: 4, text: "camera", amount: 150 },
];

let transactions = dummyTranx;

//add transactions to DOM
function addTransactionDOM(tranx) {
  //get sign
  const sign = tranx.amount < 0 ? "-" : "+";
  //create li element
  const item = document.createElement("li");
  //add class based on value
  item.classList.add(tranx.amount < 0 ? "minus" : "plus");
  //inner html of li element
  item.innerHTML = `${tranx.text}<span>${sign}${Math.abs(
    tranx.amount
  )}</span><button class="delete-btn">X</button`;
  //add to DOM of html
  listEl.appendChild(item);
}

//total income/expense and total balance
function updateValues() {
  const amounts = transactions.map((tranx) => tranx.amount);
  //console.log(amounts)

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  //console.log(total);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  //console.log(income);

  const expense = (amounts
    .filter((items) => items < 0)
    .reduce((acc, item) => (acc += item), 0) * -1)
    .toFixed(2);
  //console.log(expense);

  balanceEl.innerText = `$${total}`;
  money_plusEl.innerText = `$${income}`;
  money_minusEl.innerText = `$${expense}`;
}

//init app
function initExpenseTrackerApp() {
  listEl.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

initExpenseTrackerApp();
