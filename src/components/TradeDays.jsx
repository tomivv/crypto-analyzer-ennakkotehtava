import React from "react";
import { unixtimestampToDate } from "../utils/DateHelpers";

function TradeDays(props) {
  if (typeof props.data === "undefined") {
    return <div>loadign</div>
  }
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