import React from 'react'

const SushiWallet = (props) => {

  const handleSubmit = (e) => {
    // debugger;
    e.preventDefault();
    props.onWalletSubmit(e.target.amount.value);
  }

  return (
    <div class="wallet">
      <h3>Add More To Your Wallet!</h3>
      <form onSubmit={handleSubmit}>
        <label name="Amount"/> :
        <input type="number" placeholder="Enter Amount You Wish to Add" name="amount"/>
        <input type="submit"/>
      </form>
    </div>
  );
}

export default SushiWallet
