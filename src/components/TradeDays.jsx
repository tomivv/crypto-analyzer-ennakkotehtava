import React from "react";
import { unixtimestampToDate } from "../utils/helpers";

function TradeDays(props) {
  if (typeof props.data === "undefined") {
    return <div>loading</div>
  }
  // return no optimal trade days
  if (props.data.sell === 0) {
    return (
      <div className="trade-day">
        <h2>Optimal trading days</h2>         
        <div className="flex-container">
          <div className="item">
            <h3>There are no good days to buy or sell bitcoin</h3>
          </div>
        </div>
      </div>
    );
  }
  // return optimal trade days
  return (
    <div className="trade-day">
      <h2>Optimal trading days</h2>         
      <div className="flex-container">
        <div className="item">
          <h3>Buy</h3>
          <p>{unixtimestampToDate(props.data.date)}</p>
        </div>
        <div className="item">
          <h3>Sell</h3>
          <p>{unixtimestampToDate(props.data.sell)}</p>
        </div>
      </div>
    </div>
  )
}

export default TradeDays;