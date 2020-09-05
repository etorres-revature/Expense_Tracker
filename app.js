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

//setting variable to hold items from local storage
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

//putting items from local storage into a variable
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

//add transaction
function addTransaction(e) {
  e.preventDefault();

  //logic for what to do if nothing is entered into
  if (textEl.value.trim() === "" || amountEl.value.trim() === "") {
    //inserting error message html after the h3 for Add a new transaction
    addTransactionEl.insertAdjacentHTML(
      "afterend",
      `<div id="alert" style="background-color: goldenrod">
       <p>Please enter a 'Transaction Description' 
       <span style="display: block">and/or an 'Amount'</span>
       </p>
    `
    );
    //clearing error message after 5 seconds
    setTimeout(clearError, 5000);
  } else {
    //creating a transaction object
    const tranx = {
      //randomly generated ID
      id: generateRandomID(),
      //text from the text input box
      text: textEl.value,
      //amount from the amount input box
      amount: +amountEl.value,
    };
    //adding the transaction object onto the transactions array
    transactions.push(tranx);
    //adding transaction li to DOM for display to end user
    addTransactionDOM(tranx);
    //updating values of total balance, expense, and income amouonts
    updateValues();
    //updating local storage with new transaction
    updateLocalStorage();
    //clearing
    textEl.value = "";
    amountEl.value = "";
    textEl.placeholder = "Describe the transaction";
    amountEl.placeholder = "Enter amount ...";
  }
}

//generate random ID
function generateRandomID() {
  //generate random number between 1 and 100,000,00.
  return Math.floor(Math.random() * 100000000);
}

//function to clear out error message when either transaction or amount is missing
function clearError() {
  //selecting the error message by its given id
  let errorDiv = document.querySelector("#alert");
  //removing it from html
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
  //setting a variable to hold the amounts of the transactions array
  const amounts = transactions.map((tranx) => tranx.amount);
  //console.log(amounts)

  //setting a variable to collect the total "balance" amount
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  //console.log(total);

  //setting a variable for all of the (+) positive/income amounts
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
  //console.log(income);

  //setting a variable for all of the (-) negative/expense amounts
  const expense = (
    amounts
      .filter((items) => items < 0)
      .reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);
  //console.log(expense);

  //updating balance innerHTML with total amount
  balanceEl.innerText = `$${total}`;
  //updating income amount innerHTML with positive amounts
  money_plusEl.innerText = `$${income}`;
  //updating expense amount innerHTML with negative amounts
  money_minusEl.innerText = `$${expense}`;
}

//remove tranx by ID
function removeTransaction(id) {
  //adding functionality of delete button to remove a transaction by its id in the transactions array
  transactions = transactions.filter((tranx) => tranx.id !== id);

  //updating local storage with the removed item
  updateLocalStorage();

  //re=initializing the app to only display current transactions (without the one that was deleted)
  initExpenseTrackerApp();
}

//update local storage tranx
function updateLocalStorage() {
  //function to update items in local storage
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

//init app
function initExpenseTrackerApp() {
  //setting the list html with blank innerHTML
  listEl.innerHTML = "";
  //running a forEach loop over the transactions array with the function to add it to the HTML
  transactions.forEach(addTransactionDOM);
  //updating balance, income, and expenses with current transaction totals
  updateValues();
}

//running the expense tracker init app function
initExpenseTrackerApp();

//event listenere for "Add Transaction" to run the function that adds transaction
//if no entries made in inputs - error message
//otherwise - transaction added to li, updates balance/income/expense accordingly, and is put into local storage to make the trnasaction persistent
formEl.addEventListener("submit", addTransaction);
