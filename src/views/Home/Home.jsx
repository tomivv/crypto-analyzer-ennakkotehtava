import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./Home.css";
import { dateToInput, dateToUnixtimestamp, getLongestBearish, getHightestTradeVolume, unixtimestampToDate, getOptimalTradeDays } from "../../utils/DateHelpers";

function Home() {
  const [startDate, setStartDate] = useState(dateToInput(new Date("2021-12-12").getTime()));
  const [endDate, setEndDate] = useState(dateToInput(new Date("2021-12-13").getTime()));
  const [prices, setPrices] = useState([]);
//   const [marketCaps, setMarketCaps] = useState([]);
  const [volumes, setVolumes] = useState([]);

  useEffect(() => {
    async function getData() {
        fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${dateToUnixtimestamp(startDate)}&to=${dateToUnixtimestamp(endDate)}`)
          .then(response => response.json())
          .then(data => {
            setPrices(data.prices);
            // setMarketCaps(data.market_caps);
            setVolumes(data.total_volumes);
          });
    }

    getData();
  }, [endDate, startDate]);

  function handleDateInput(e) {
    e.preventDefault();
    if(e.target.id === "startDate") {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  }
  const volume = getHightestTradeVolume(volumes);

  const tradeDays = getOptimalTradeDays(prices);

  console.log(tradeDays);
  return (
    <>
      <Header />
      <main>
        <section className="content">
          <form>
            <div className="input-group">
              <label htmlFor="startDate">Start date</label>
              <input type="date" name="startDate" id="startDate" value={startDate} onChange={handleDateInput} />
            </div>
            <div className="input-group">
              <label htmlFor="endDate">End date</label>
              <input type="date" name="endDate" id="endDate" value={endDate} onChange={handleDateInput} />
            </div>
          </form>
        </section>
        <section className="content" id="result">
          <div className="bearish">
            <h2>Longest bearish trend</h2>
            <div className="flex-container">
              <div className="item">
                <h3>Days</h3>
                <p>{getLongestBearish(prices)}</p>
              </div>
            </div>
          </div>
          <div className="trade-vol">
            <h2>Highest trading volume</h2>
            <div className="flex-container">
              <div className="item">
                <h3>Trade volume</h3>
                <p>{Math.round(volume.amount)} €</p>
              </div>
              <div className="item">
                <h3>Day</h3>
                <p>{unixtimestampToDate(volume.date)}</p>
              </div>
            </div>
          </div>
          <div className="trade-day">
          <h2>Optimal trading days</h2>          
            <div className="flex-container">
              <div className="item">
                <h3>Buy</h3>
                <p>{unixtimestampToDate(tradeDays.buy.date)}</p>
              </div>
              <div className="item">
                <h3>Sell</h3>
                <p>{unixtimestampToDate(tradeDays.sell.date)}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Home;