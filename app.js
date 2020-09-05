//global variables
const balanceEl = document.querySelector("#balance");
const money_plusEl = document.querySelector("#money-plus");
const money_minusEl = document.querySelector("#money-minus");
const listEl = document.querySelector("#list");
const formEl = document.querySelector("#form");
const textEl = document.querySelector("#text");
const amountEl = document.querySelector("#amount");
const addTransactionEl = document.querySelector("#add-transaction");

// const dummyTranx = [
//   { id: 1, text: "flower", amount: -20 },
//   { id: 2, text: "salary", amount: 300 },
//   { id: 3, text: "book", amount: -10 },
//   { id: 4, text: "camera", amount: 150 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null
    ? localStorageTransactions
    : [];

//add transaction
function addTransaction(e) {
  e.preventDefault();

  if (textEl.value.trim() === "" || amountEl.value.trim() === "") {
    addTransactionEl.insertAdjacentHTML(
      "afterend",
      `<div id="alert" style="background-color: goldenrod">
       <p>Please enter a 'Transaction Description' 
       <span style="display: block">and/or an 'Amount'</span>
       </p>
    `
    );
    setTimeout(clearError, 5000);
  } else {
    const tranx = {
      id: generateRandomID(),
      text: textEl.value,
      amount: +amountEl.value,
    };
    transactions.push(tranx);
    addTransactionDOM(tranx);
    updateValues();
    updateLocalStorage();
    textEl.value = "";
    amountEl.value = "";
  }
}

//generate random ID
function generateRandomID() {
  return Math.floor(Math.random() * 100000000);
}

function clearError() {
  let errorDiv = document.querySelector("#alert");
  errorDiv.remove();
}

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
  )}</span><button class="delete-btn" onclick="removeTransaction(${
    tranx.id
  })">X</button`;
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

  const expense = (
    amounts
      .filter((items) => items < 0)
      .reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);
  //console.log(expense);

  balanceEl.innerText = `$${total}`;
  money_plusEl.innerText = `$${income}`;
  money_minusEl.innerText = `$${expense}`;
}

//remove tranx by ID
function removeTransaction(id) {
  transactions = transactions.filter((tranx) => tranx.id !== id);

  updateLocalStorage();

  initExpenseTrackerApp();
}

//update local storage tranx
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

//init app
function initExpenseTrackerApp() {
  listEl.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

initExpenseTrackerApp();

formEl.addEventListener("submit", addTransaction);
