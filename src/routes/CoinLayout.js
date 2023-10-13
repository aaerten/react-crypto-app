import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./CoinLayout.css";
import DOMPurify from "dompurify";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CoinLayout = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [chartData, setChartData] = useState([]);
  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`;
  const chartUrl = `https://api.coingecko.com/api/v3/coins/${params.coinId}/market_chart?vs_currency=usd&days=7`;
  useEffect(() => {
    const fetchData = async () => {
      const [graphData, coinData] = await Promise.all([
        axios.get(chartUrl),
        axios.get(url),
      ]);
      let formatData = graphData.data.prices.map((price) => {
        const [timestamp, p] = price;
        return {
          Date: new Date(timestamp).toLocaleDateString(),
          Price: p.toFixed(2),
        };
      });
      setChartData(formatData);
      setCoin(coinData.data);
    };

    fetchData();
  }, []);
  return (
    <div>
      <div className="coinContainer">
        <div className="content">
          <h1>{coin.name}</h1>
        </div>
        <div className="content">
          <div>
            <div className="rank">
              <span className="rankButton">Rank # {coin.market_cap_rank}</span>
            </div>
            <div className="info">
              <div className="coinHeading">
                {coin.image ? <img src={coin.image.small} alt="" /> : null}
                <p>{coin.name}</p>
                {coin.symbol ? <p>{coin.symbol.toUpperCase()}/USD</p> : null}
              </div>
              <div className="coinPrice">
                {coin.market_data?.current_price ? (
                  <h1>
                    ${coin.market_data.current_price.usd.toLocaleString()}
                  </h1>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <table>
            <thead>
              <tr>
                <th>1h</th>
                <th>24h</th>
                <th>7d</th>
                <th>14d</th>
                <th>30d</th>
                <th>1yr</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {coin.market_data?.price_change_percentage_1h_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coin.market_data?.price_change_percentage_24h_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coin.market_data?.price_change_percentage_7d_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coin.market_data?.price_change_percentage_14d_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coin.market_data?.price_change_percentage_30d_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coin.market_data?.price_change_percentage_1y_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="content">
          <div className="stats">
            <div className="left">
              <div className="row">
                <h4>24 Hour Low</h4>
                {coin.market_data?.low_24h ? (
                  <p>${coin.market_data.low_24h.usd.toLocaleString()}</p>
                ) : null}
              </div>
              <div className="row">
                <h4>24 Hour High</h4>
                {coin.market_data?.high_24h ? (
                  <p>${coin.market_data.high_24h.usd.toLocaleString()}</p>
                ) : null}
              </div>
            </div>
            <div className="right">
              <div className="row">
                <h4>Market Cap</h4>
                {coin.market_data?.market_cap ? (
                  <p>${coin.market_data.market_cap.usd.toLocaleString()}</p>
                ) : null}
              </div>
              <div className="row">
                <h4>Circulating Supply</h4>
                {coin.market_data ? (
                  <p>{coin.market_data.circulating_supply}</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date" fill="#000" stroke="#F2F2F2" />
                <YAxis stroke="#F2F2F2" />
                <Tooltip labelStyle={{ color: "#000" }} />
                <Area
                  type="monotone"
                  dataKey="Price"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="content">
          <div className="about">
            <h3>About</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  coin.description ? coin.description.en : ""
                ),
              }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinLayout;
