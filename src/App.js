import { useEffect, useState } from "react";
import "./App.scss";
import Button from "@mui/material/Button";
import { TextField, Radio } from "@mui/material";
import { borderRight } from "@mui/system";

function App() {
  const [balance, setBalance] = useState(0);
  const [transactionsList, setTransactionsList] = useState([]);
  
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [newTransaction, setNewTransaction] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Expense");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState();
  const [searchValue, setSearchValue] = useState("");

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(Number(event.target.value));
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSearchChange = (event) => {
      setSearchValue(event.target.value);
  }

  const addNewTransaction = () => {
    selectedValue == "Income"
      ? setIncome((prevIncome) => prevIncome + amount)
      : setExpense((prevExpense) => prevExpense + amount);

    setTransactionsList((prevTransactions) => [
      ...prevTransactions,
      {
        transactionAmount: amount,
        transactionDescription: description,
        transactionType: selectedValue,
      },
    ]);

    console.log(transactionsList);

    setAmount(0);
    setDescription("");
  };

  useEffect(() => {
    setBalance(income - expense);
  }, [income, expense]);

  var filteredList = [];
  
  searchValue ==""? filteredList=transactionsList : filteredList = transactionsList.filter((transaction)=>{
      return (transaction.transactionDescription.toLowerCase().startsWith(searchValue.toLowerCase()))
  })

  return (
    <div className="App">
      <div className="heading-row space">
        <h2 className="site-header">Expense Tracker</h2>
      </div>

      <div class="balance-add-row space">
        <div className="balance">
          <h3>Balance:${balance}</h3>
        </div>
        <div className="addBtn">
          {!newTransaction && (
            <button onClick={() => setNewTransaction(true)}>Add</button>
          )}
          {newTransaction && (
            <button onClick={() => setNewTransaction(false)}>Cancel</button>
          )}
        </div>
      </div>

      {newTransaction && (
        <div className="addTransaction">
          <form>
            <div className="form-group">
              <TextField
                required
                value={amount == 0 ? "" : amount}
                onChange={handleAmountChange}
                variant="outlined"
                label="Amount"
                id="Amount"
                type="number"
              />
            </div>

            <div className="form-group">
              <TextField
                required
                variant="outlined"
                value={description}
                onChange={handleDescriptionChange}
                label="Description"
                id="Description"
                type="text"
              />
            </div>

            <div className="form-group">
              <Radio
                onChange={handleRadioChange}
                checked={selectedValue == "Expense"}
                name="transactionType"
                value="Expense"
              />{" "}
              Expense
              <Radio
                onChange={handleRadioChange}
                checked={selectedValue == "Income"}
                name="transactionType"
                value="Income"
              />{" "}
              Income
            </div>

            <Button variant="contained" onClick={addNewTransaction}>
              Add Transaction
            </Button>
          </form>
        </div>
      )}

      <div className="income-expense-row space">
        <div className="expense-row inner">
          <h4>Expense</h4>
          <h3 className="red">${expense}</h3>
        </div>
        <div className="income-row inner">
          <h4>Income</h4>
          <h3 className="green">${income}</h3>
        </div>
      </div>

      { transactionsList.length>0 && 
        <div className="transactions">
          <h3>Transactions</h3>
          <input className="searchBar" onChange={handleSearchChange} type="search" placeholder="Search..." />
          {filteredList.map(
            ({
              transactionAmount,
              transactionDescription,
              transactionType,
            }, index) => {
              return (
                <div
                  className="transactionDetails" key={index}
                  style={
                    transactionType == "Income"
                      ? { borderRightColor: "green" }
                      : { borderRightColor: "red" }
                  }
                >
                  <p>{transactionDescription}</p>
                  <p>${transactionAmount}</p>
                </div>
              );
            }
          )}
        </div>
      }
    </div>
  );
}

export default App;
