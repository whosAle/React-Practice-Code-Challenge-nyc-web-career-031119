import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';
import SushiWallet from './components/SushiWallet';
// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  //Set Initial State
  state={sushis: [], sushiIndex:0, budget:100, bill:0, aversions:[]}

  /**************************************/
      //Lifecyle Methods
  /**************************************/

  componentDidMount(){
    //grab All Sushis right after the component mounts
    fetch(API)
    .then(resp => resp.json())
    .then(data => this.setState({sushis: data}))
  }

  /**************************************/
      //Event Handlers
  /**************************************/
  handleSushiClick = (sushiID) => {
    const clickedSushi = this.state.sushis.find(sushi => sushi.id === sushiID);
    clickedSushi.eaten = true;
    this.setState({
      sushis: this.state.sushis,
      bill: this.state.bill + clickedSushi.price
    })
  }

  handleMoreButtonClick = () => {
    const newSushiIndex = this.state.sushiIndex + 4 >= this.state.sushis.length ? 0 : this.state.sushiIndex + 4
    this.setState({sushiIndex: newSushiIndex})
  }

  handleWalletSubmit = (value) => {
    // console.log(value);
    // event.preventDefault();
    this.setState({budget: this.state.budget + parseInt(value)})
  }

  //End Event Handlers

  /* ***********************************
      //Render
  **************************************/
  render() {
    // console.log("sushiIndex is:", this.state.sushiIndex);

    //generates the 4 sushis that will be displayed on the belt
    const sushisOnDisplay = this.state.sushis.slice(this.state.sushiIndex, this.state.sushiIndex+4)

    //generates the sushis that have been eaten.
    const eatenSushis = this.state.sushis.filter(sushi => sushi.eaten)
    return (
      <div className="app">
        <SushiContainer sushis={sushisOnDisplay} onSushiClick={this.handleSushiClick} onMoreButtonClick={this.handleMoreButtonClick} />
        <Table budget={this.state.budget} bill={this.state.bill} eatenSushis={eatenSushis} onWalletSubmit={this.handleWalletSubmit}/>
        <SushiWallet onWalletSubmit={this.onWalletSubmit} />
      </div>
    );
  }
}

export default App;
