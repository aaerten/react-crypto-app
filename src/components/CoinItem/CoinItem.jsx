import React from "react";
import "./CoinItem.css";

const CoinItem = (props) => {
  return (
    <div className="coinRow">
      <p>{props.data.market_cap_rank}</p>
      <div className="imgSymbol">
        <img src={props.data.image} alt={props.data.name} />
        <p>{props.data.symbol.toUpperCase()}</p>
      </div>
      <p>${props.data.current_price.toLocaleString()}</p>
      <p>{props.data.price_change_percentage_24h.toFixed(2)}%</p>
      <p className="hideMobile">${props.data.total_volume.toLocaleString()}</p>
      <p className="hideMobile">${props.data.market_cap.toLocaleString()}</p>
    </div>
  );
};

export default CoinItem;
