import React, { Fragment } from 'react'
import SushiWallet from '../components/SushiWallet';

const Table = (props) => {

  const renderPlates = (array) => {
    return array.map((x, index) => {
      return <div key={x.id} className="empty-plate" style={{ top: -7 * index }}/>
    })
  }

  return (
    <Fragment>
      <h1 className="remaining">
        You have: ${ props.budget - props.bill} remaining!
      </h1>
      <div className="table">
        <div className="stack">
          {
            /*
               renderPlates takes an array
               and renders an empty plate
               for every element in the array
            */
            renderPlates(props.eatenSushis)
          }
        </div>
      </div>
      <SushiWallet onWalletSubmit={props.onWalletSubmit} />
    </Fragment>
  )
}

export default Table
