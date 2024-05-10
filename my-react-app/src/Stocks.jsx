import React, { useState, useEffect } from "react";
import Slides from "./Slides";
import Save from "./Save";
import EditForm from "./EditForm";
import DeleteForm from "./DeleteForm";
import History from "./History";
import Mongo from "./Mongo";

export default function App() {
  const [selectedSymbol, setSelectedSymbol] = useState("AAPL");
  const [selectedCurrency, setSelectedCurrency] = useState("AUD"); 

  const [ask, setAsk] = useState("");
  const [last, setLast] = useState("");
  const [mid, setMid] = useState("");
  const [conv, setConv] = useState("");
  const [curr, setCurr] = useState("");

  const handleStockSubmit = (event) => {
    event.preventDefault();
    const selectedStock = document.getElementById("stock").value;
    setSelectedSymbol(selectedStock);
    // console.log("selectedSymbol:", selectedSymbol);
  };

  const handleCurrencySubmit = (event) => {
    event.preventDefault();
    const selectedCurr = document.getElementById("curr").value; 
    setSelectedCurrency(selectedCurr);
    // console.log("selectedCurrency:", selectedCurrency);
  };

  // update stock info (last, mid, ask, conv, curr) everytime it is changed
  useEffect(() => {
    const askElement = document.getElementById("ask");
    const lastElement = document.getElementById("last");
    const midElement = document.getElementById("mid");
    const currElement = document.getElementById("currency");

    const askAttributeValue = askElement.getAttribute('data-ask');
    const lastAttributeValue = lastElement.getAttribute('data-last');
    const midAttributeValue = midElement.getAttribute('data-mid');
    const convAttributeValue = currElement.getAttribute('data-conv');
    const currAttributeValue = currElement.getAttribute('data-curr');

    if (askAttributeValue) setAsk(askAttributeValue);
    if (lastAttributeValue) setLast(lastAttributeValue);
    if (midAttributeValue) setMid(midAttributeValue);
    if (convAttributeValue) setConv(convAttributeValue);
    if (currAttributeValue) setCurr(currAttributeValue);

    // Listen for changes in attributes and update state accordingly
    const observer = new MutationObserver(() => {
      const newAsk = askElement.getAttribute('data-ask');
      const newLast = lastElement.getAttribute('data-last');
      const newMid = midElement.getAttribute('data-mid');
      const newConv = currElement.getAttribute('data-conv');
      const newCurr = currElement.getAttribute('data-curr');
      
      if (newAsk !== askAttributeValue) setAsk(newAsk);
      if (newLast !== lastAttributeValue) setLast(newLast);
      if (newMid !== midAttributeValue) setMid(newMid);
      if (newConv !== convAttributeValue) setConv(newConv);
      if (newCurr !== currAttributeValue) setCurr(newCurr);
    });

    observer.observe(askElement, { attributes: true });
    observer.observe(lastElement, { attributes: true });
    observer.observe(midElement, { attributes: true });
    observer.observe(currElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const [isDeleteFormVisible, setIsDeleteFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);

  return (
    <div>

      <div class="dropdown">
        <form id="currencyForm" onSubmit={handleCurrencySubmit}>
          <label htmlFor="curr">Currency:</label>
          <select name="currencies" id="curr">
            <option value="AUD">Australian Dollar</option>
            <option value="BGN">Bulgarian Lev</option>
            <option value="BRL">Brazilian Real</option>
            <option value="CAD">Canadian Dollar</option>
            <option value="CHF">Swiss Franc</option>
            <option value="CNY">Chinese Yuan</option>
            <option value="CZK">Czech Koruna</option>
            <option value="DKK">Danish Krone</option>
            <option value="EUR">Euro</option>
            <option value="GBP">Pound sterling</option>
            <option value="HKD">Hong Kong Dollar</option>
            <option value="HUF">Hungarian Forint</option>
            <option value="IDR">Indonesian Rupiah</option>
            <option value="ILS">Israeli New Shekel</option>
            <option value="INR">Indian Rupee</option>
            <option value="ISK">Icelandic Króna</option>
            <option value="JPY">Japanese Yen</option>
            <option value="KRW">South Korean won</option>
            <option value="MXN">Mexican Peso</option>
            <option value="MYR">Malaysian Ringgit</option>
            <option value="NOK">Norwegian Krone</option>
            <option value="NZD">New Zealand Dollar</option>
            <option value="PHP">Philippine peso</option>
            <option value="PLN">Polish złoty</option>
            <option value="RON">Romanian Leu</option>
            <option value="SEK">Swedish Krona</option>
            <option value="SGD">Singapore Dollar</option>
            <option value="THB">Thai Baht</option>
            <option value="TRY">Turkish lira</option>
            <option value="ZAR">South African Rand</option>
          </select>
          <input type="submit" class="submit" value="Submit" />
        </form>

        <form id="stockForm" onSubmit={handleStockSubmit}>
          <label for="stock">Symbol:</label>
          <select name="stocks" id="stock">
            <option value="AAPL">AAPL</option>
            <option value="AMZN">AMZN</option>
            <option value="AMD">AMD</option>
            <option value="DIS">DIS</option>
            <option value="GOOGL">GOOGL</option>
            <option value="META">META</option>
            <option value="NFLX">NFLX</option>
            <option value="TGAA">TGAA</option>
            <option value="TSLA">TSLA</option>
            <option value="WMT">WMT</option>
          </select>
          <input type="submit" class="submit" value="Submit" />
        </form>
      </div>
      
      <div id="buttons" class="buttons">
        <Save symbol={selectedSymbol} ask={ask} last={last} mid={mid} curr={curr} conv={conv}></Save>
        <button id="edit"  onClick={() => setIsEditFormVisible(true)}>Edit</button>
        <button id="delete" onClick={() => setIsDeleteFormVisible(true)}>Delete</button>
        <History></History>
      </div>

      <Slides sym={selectedSymbol} curr={selectedCurrency}></Slides>

      {isEditFormVisible && <EditForm onHide={() => setIsEditFormVisible(false)}></EditForm>}

      {isDeleteFormVisible && <DeleteForm onHide={() => setIsDeleteFormVisible(false)}></DeleteForm>}

      <Mongo></Mongo>
      
    </div>
  )
}