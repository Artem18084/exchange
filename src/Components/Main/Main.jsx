import React, { useState, useEffect } from "react";

export default function Main() {
  const [renderUsd, setRenderUsd] = useState(0);
  const [renderEro, setRenderEro] = useState(0);
  const [rate, setRate] = useState(0);
  //get rate while the firs render
  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => response.json())
      .then((data) => {
        setRenderUsd(data.rates.UAH.toFixed(2));
      });

    fetch("https://api.exchangerate-api.com/v4/latest/EUR")
      .then((response) => response.json())
      .then((data) => {
        setRenderEro(data.rates.UAH.toFixed(2));
      });
  }, []);

  useEffect(() => {
    const renderRate = +(renderUsd / renderEro).toFixed(2);
    setRate(renderRate);
  }, [renderUsd, renderEro]);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("EUR");
  const [amount1, setAmount1] = useState(0);
  const [amount2, setAmount2] = useState(0);
  // change data currency 1  & call the function
  const handleCurrency1Change = (event) => {
    setCurrency1(event.target.value);
    fetchExchangeRate(event.target.value, currency2);
  };
  // change data currency 2  & call the function
  const handleCurrency2Change = (event) => {
    setCurrency2(event.target.value);
    fetchExchangeRate(currency1, event.target.value);
  };
  // API function
  const fetchExchangeRate = (currency1, currency2) => {
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency1}`)
      .then((response) => response.json())
      .then((data) => {
        setRate(data.rates[currency2]);
        calculateAmounts(amount1, data.rates[currency2]);
      });
  };
  // handle function by arrow
  const handleExchange = () => {
    setCurrency1(currency2);
    setCurrency2(currency1);
    setAmount1(amount2);
    setAmount2(amount1);
  };
  // get amount money before exchange
  const handleAmount1Change = (event) => {
    const newAmount1 = event.target.value;
    setAmount1(newAmount1);
    const newAmount2 = newAmount1 * rate;
    setAmount2(newAmount2.toFixed(2));
  };
  const handleAmount2Change = (event) => {
    const newAmount2 = event.target.value;
    setAmount2(newAmount2);
    const newAmount1 = newAmount2 / rate;
    setAmount1(newAmount1.toFixed(2));
  };
  // get amount money after exchange
  const calculateAmounts = (amount) => {
    setAmount2(amount * rate);
  };

  return (
    <div className=" relative flex flex-col items-center justify-center w-screen h-screen bg-my-image bg-no-repeat bg-cover">
      <div className="flex items-center justify-center my-8">
        <select
          className="px-3 py-2 border rounded"
          value={currency1}
          onChange={handleCurrency1Change}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="UAH">UAH</option>
        </select>
        <input
          type="number"
          className="px-3 py-2 border rounded ml-4"
          value={amount1}
          onChange={handleAmount1Change}
          // Check the value: if the value is 0, the field should be empty. Otherwise, the input value should not be changed.
          onFocus={(event) =>
            +event.target.value === 0 ? (event.target.value = "") : true
          }
          // Check the value: if the value is 0, the field should return the previous value (0)
          onBlur={(event) =>
            +event.target.value === 0 ? (event.target.value = 0) : false
          }
        />
        <div className="mx-4 text-white">&#8596;</div>
        <select
          className="px-3 py-2 border rounded"
          value={currency2}
          onChange={handleCurrency2Change}
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="UAH">UAH</option>
        </select>
        <input
          type="number"
          className="px-3 py-2 border rounded mx-4"
          value={amount2}
          onChange={handleAmount2Change}
          // Check the value: if the value is 0, the field should be empty. Otherwise, the input value should not be changed.
          onFocus={(event) =>
            +event.target.value === 0 ? (event.target.value = "") : true
          }
          // Check the value: if the value is 0, the field should return the previous value (0)

          onBlur={(event) =>
            +event.target.value === 0 ? (event.target.value = 0) : false
          }
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded"
          onClick={handleExchange}
        >
          Exchange
        </button>
        <div className="mx-4 text-white">{rate}</div>
      </div>
    </div>
  );
}
