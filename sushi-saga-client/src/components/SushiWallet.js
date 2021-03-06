import React from 'react'

const SushiWallet = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onWalletSubmit(e.target.amount.value);
  }

  const handleAversion = (e) => {
    // debugger
    e.preventDefault();
    props.onAversionSubmit(e.target.aversion.value);
  }

  return (
    <div className="wallet">
      <h3>Add More To Your Wallet!</h3>
      <form onSubmit={handleSubmit}>
        <label name="Amount"/> Enter Amount to Add!:
        <input type="number" placeholder="15" name="amount"/>
        <input type="submit"/>
      </form>

      <form onSubmit={handleAversion}>
        <label name="aversion"/> Enter Any Sushi Aversions:
        <select name="aversion">
          {props.sushiNames.map(name => <option>{name}</option>)}
        </select>
        <input type="submit"/>
      </form>

    </div>
  );
}

export default SushiWallet
