import PropTypes from "prop-types"; // used to validate the props passed to the component
import "./currencyInput.css";

export default function CurrencyInput(props) { // used to render the currency input fields
  return (
    <div className="group">
      <input
        type="number"
        value={props.amount}
        onChange={(ev) => props.onAmountChange(ev.target.value)} // call the onAmountChange function passed as a prop when the input value changes
      />
      <select
        value={props.currency}
        onChange={(ev) => props.onCurrencyChange(ev.target.value)} // call the onCurrencyChange function passed as a prop when the select value changes
      >
        {props.currencies.map(
          (
            currency // render the currencies passed as a prop as options so that the user can select the currency of their choice (pulled from the API)
          ) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          )
        )}
      </select>
    </div>
  );
}

CurrencyInput.propTypes = {
  // define the props that the component expects
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  currencies: PropTypes.array,
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
};
