import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';
import SushiWallet from './components/SushiWallet';
// import AversionForm from './components/AversionForm';
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

    if (clickedSushi.price < (this.state.budget - this.state.bill)) {
      clickedSushi.eaten = true;
      this.setState({
        sushis: this.state.sushis,
        bill: this.state.bill + clickedSushi.price
      })
    } else {
      console.error("Out of Funds!");
    }


  }

  handleMoreButtonClick = () => {
    //Before Aversions feature
    // const newSushiIndex = this.state.sushiIndex + 4 >= this.state.sushis.length ? 0 : this.state.sushiIndex + 4
    // this.setState({sushiIndex: newSushiIndex})

    let newSushiIndex;
    if (this.state.aversions.length > 0) {
      let filteredSushis = this.state.sushis.filter(sushi => !this.state.aversions.includes(sushi.name))
      newSushiIndex = this.state.sushiIndex + 4 >= filteredSushis.length ? 0 : this.state.sushiIndex + 4
    } else {
      newSushiIndex = this.state.sushiIndex + 4 >= this.state.sushis.length ? 0 : this.state.sushiIndex + 4
    }
    this.setState({sushiIndex: newSushiIndex})

  }

  handleWalletSubmit = (value) => {
    // console.log(value);
    // event.preventDefault();
    this.setState({budget: this.state.budget + parseInt(value)})
  }

  handleAversionSubmit = (aversion) => {
    this.setState({aversions: [...this.state.aversions, aversion]});
  }

  //End Event Handlers

  /* ***********************************
      //Render
  **************************************/
  render() {
    // console.log("sushiIndex is:", this.state.sushiIndex);

    /*//Old SushisonDisplay before aversion feature
    //generates the 4 sushis that will be displayed on the belt
    // const sushisOnDisplay = this.state.sushis.slice(this.state.sushiIndex, this.state.sushiIndex+4)*/

    let sushisOnDisplay = [];
    if (this.state.aversions.length === 0) {
      //generates the 4 sushis that will be displayed on the belt
      sushisOnDisplay = this.state.sushis.slice(this.state.sushiIndex, this.state.sushiIndex+4)
    } else {
      const filteredSushis = this.state.sushis.filter(sushi => !this.state.aversions.includes(sushi.name))
      console.log(filteredSushis);
      sushisOnDisplay = filteredSushis.slice(this.state.sushiIndex, this.state.sushiIndex+4)
    }



    //generates the sushis that have been eaten.
    const eatenSushis = this.state.sushis.filter(sushi => sushi.eaten)

    //generates the unique sushi names by mapping all the names then grabbing
    //the unique values
    const sushiNames = [...new Set(this.state.sushis.map(sushi => sushi.name))]
    return (
      <div className="app">
        <SushiContainer sushis={sushisOnDisplay} onSushiClick={this.handleSushiClick} onMoreButtonClick={this.handleMoreButtonClick} />
        <Table budget={this.state.budget} bill={this.state.bill} eatenSushis={eatenSushis} onWalletSubmit={this.handleWalletSubmit}/>
        <SushiWallet onWalletSubmit={this.onWalletSubmit} sushiNames={sushiNames} onAversionSubmit={this.handleAversionSubmit} />
        {/* <AversionForm onAversionSubmit{this.handleAversionSubmit}/> */ null}
      </div>
    );
  }
}

export default App;
