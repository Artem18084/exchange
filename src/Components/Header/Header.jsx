import React, { useState, useEffect } from "react";

function Header() {
  const [usdToUahRate, setUsdToUahRate] = useState("");
  const [eurToUahRate, setEurToUahRate] = useState("");
 // API functions
  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => response.json())
      .then((data) => {
        setUsdToUahRate(data.rates.UAH.toFixed(2));
      });

    fetch("https://api.exchangerate-api.com/v4/latest/EUR")
      .then((response) => response.json())
      .then((data) => {
        setEurToUahRate(data.rates.UAH.toFixed(2));
      });
  }, []);

  return (
    <div className="flex justify-center gap-20 p-2 bg-[#1B1B1B] text-white absolute top-0 right-0 w-screen z-10">
      <div>1 USD = {usdToUahRate} UAH</div>
      <div>1 EUR = {eurToUahRate} UAH</div>
    </div>
  );
}

export default Header;