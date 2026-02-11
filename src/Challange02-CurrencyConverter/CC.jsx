import { use, useEffect, useState } from "react";

export default function CC(){
  const API = "https://api.frankfurter.dev/" ;
  // for currency conversion: https://api.frankfurter.dev/v1/latest?base=USD

  const [amount, setAmount] = useState('');
  const [currencyFrom, setCurrencyFrom] = useState('USD');
  const [currencyTo, setCurrencyTo] = useState('INR');
  const [converted, setConverted] = useState(0);
  
  // state for slow internet connectin : 
  const [isLoading, setIsLoading] = useState(false);

  // effect 
  useEffect(function(){
    
    // function : fetch data from api 
    async function convert(){
      setIsLoading(true);

      const response = await fetch(`${API}v1/latest?base=${currencyFrom}`); 
      const data  = await response.json();
      // console.log(data);
      
      setConverted((data.rates[currencyTo] * amount).toFixed(2))
      setIsLoading(false); 
    }
    
    // function call : fetch data froma api
    if(currencyFrom == currencyTo){
      return setConverted(amount); 
    } 
    convert();
  }, [amount, currencyFrom, currencyTo])

  return(
    <>
      {/* input */}
      <input type="number" value={amount} onChange={(e)=> setAmount( Number(e.target.value))} disabled={isLoading}/>

      {/* conversion : from  */}
      <select name="currencyFrom" id="" value={currencyFrom} onChange={(e)=> setCurrencyFrom(e.target.value)} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      {/* conversion : to  */}
      <select name="currencyTo" id="" value={currencyTo} onChange={(e)=> setCurrencyTo(e.target.value)}disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      
      {/* converted currency */}
      <p>{converted} {currencyTo}</p>
    </>
  )
}