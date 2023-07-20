import "./App.css";
import CurrencyInput from "./components/currencyInput";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [amount1, setAmount1] = useState(1); // amount 1 is the amount in the first currency
  const [amount2, setAmount2] = useState(1); // amount 2 is the amount in the second currency
  const [currency1, setCurrency1] = useState("GBP"); // currency 1 is the first currency
  const [currency2, setCurrency2] = useState("USD"); // currency 2 is the second currency
  const [rates, setRates] = useState([]);

  useEffect(() => { // fetch the exchange rates from the API as soon as the component renders
    axios
      .get( // make a GET request to the API
        `http://data.fixer.io/api/latest?access_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => { // when the response is received from the API call, do the following:
        setRates(response.data.rates); // set the rates state Array to the rates returned from the API
      });
  }, []);

  useEffect(() => { // implemented so that the amount in the second currency is updated when the site loads
    if (!!rates) {
      handleAmount1Change(1);
    }
  }, [rates]);

  function format(number) { // format the currency number to 2 decimal places
    return number.toFixed(2);
  }

  function handleAmount1Change(amount1) { // when the amount in the first currency changes, update the amount in the second currency using the rates from the API
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) { // when the first currency changes, update the amount in the second currency using the rates from the API
    setAmount2(format((amount1 * rates[currency2]) / rates[currency1]));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) { // when the amount in the second currency changes, update the amount in the first currency using the rates from the API
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) { // when the second currency changes, update the amount in the first currency using the rates from the API
    setAmount1(format((amount2 * rates[currency1]) / rates[currency2]));
    setCurrency2(currency2);
  }

  return (
    <div>
      <h1>Currency Converter</h1>
      <CurrencyInput
        onAmountChange={handleAmount1Change} // pass the handleAmount1Change function as a prop to the CurrencyInput component
        onCurrencyChange={handleCurrency1Change} // pass the handleCurrency1Change function as a prop to the CurrencyInput component
        currencies={Object.keys(rates)} // pass the rates state Array as a prop to the CurrencyInput component using Object.keys() to get the keys from the object
        amount={amount1} // pass the amount1 state variable as a prop to the CurrencyInput component
        currency={currency1} // pass the currency1 state variable as a prop to the CurrencyInput component
      />
      <CurrencyInput
        onAmountChange={handleAmount2Change} // pass the handleAmount2Change function as a prop to the CurrencyInput component
        onCurrencyChange={handleCurrency2Change} // pass the handleCurrency2Change function as a prop to the CurrencyInput component
        currencies={Object.keys(rates)}
        amount={amount2} // pass the amount2 state variable as a prop to the CurrencyInput component
        currency={currency2} // pass the currency2 state variable as a prop to the CurrencyInput component
      />
    </div>
  );
}

export default App;
