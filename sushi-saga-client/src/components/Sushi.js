import React, { Fragment } from 'react'

const Sushi = (props) => {
  return (
    <div className="sushi">
      <div className="plate"
           onClick={() => props.onSushiClick(props.sushi.id)}>
        {
          /*
            Display the sushi or an empty
            plate if depending of if the
            sushi has been eaten
           */
          props.sushi.eaten ? null : <img src={props.sushi.img_url} width="100%" />
        }
      </div>
      <h4 className="sushi-details">
        {props.sushi.name} - ${props.sushi.price}
      </h4>
    </div>
  )
}

export default Sushi
