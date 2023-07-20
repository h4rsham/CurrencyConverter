import "./App.css";
import CurrencyInput from "./components/currencyInput";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("USD");
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios
      .get("http://data.fixer.io/api/latest?access_key=")
      .then((response) => {
        setRates(response.data.rates);
      });
  }, []);

  return (
    <div className="App">
      <CurrencyInput
        onAmountChange={setAmount1}
        onCurrencyChange={setCurrency1}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1}
      />
      <CurrencyInput
        onAmountChange={setAmount2}
        onCurrencyChange={setCurrency2}
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2}
      />
    </div>
  );
}

export default App;
