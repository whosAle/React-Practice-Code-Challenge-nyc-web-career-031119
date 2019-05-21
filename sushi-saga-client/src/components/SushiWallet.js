import React from 'react'

const SushiWallet = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onWalletSubmit(e.target.amount.value);
  }

  return (
    <div class="wallet">
      <h3>Add More To Your Wallet!</h3>
      <form onSubmit={handleSubmit}>
        <label name="Amount"/> Enter Amount to Add!:
        <input type="number" placeholder="15" name="amount"/>
        <input type="submit"/>
      </form>
      <form onSubmit={(e) => e.preventDefault()}>
        <label name="aversion"/> Enter Any Sushi Aversions:
        <input type="number" placeholder="" name="aversion"/>
        <input type="submit"/>
      </form>

    </div>
  );
}

export default SushiWallet
