import React, { useEffect, useState } from "react";
import axios from "axios";
import CoinItem from "../CoinItem";
import { Link } from "react-router-dom";
import CoinLayout from "../../routes/CoinLayout";
import "./CoinList.css";

const CoinList = () => {
  const [state, setState] = useState({
    coins: [],
    filteredCoins: [],
    searchText: "",
  });
  const [searchText, setSearchText] = useState("");
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`;

  const fetchData = async () => {
    axios
      .get(url)
      .then((res) => {
        setState((prevState) => ({
          ...prevState,
          coins: res.data,
          filteredCoins: res.data,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onTextChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (searchText === "") {
        setState((prevState) => ({
          ...prevState,
          filteredCoins: prevState.coins,
        }));
        return;
      }
      let newList = state.coins.filter(
        (c) => c.id === searchText.toLowerCase()
      );
      setState((prevState) => ({ ...prevState, filteredCoins: newList }));
    }
  };
  return (
    <div className="container">
      <div className="search">
        <input
          type="text"
          value={searchText}
          placeholder="Search By Name"
          onChange={onTextChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div>
        <div className="coinListHeader">
          <p>#</p>
          <p className="coinName">Coin</p>
          <p>Price</p>
          <p>24h</p>
          <p className="hideMobile">Volume</p>
          <p className="hideMobile">MCAP</p>
        </div>
      </div>
      {state.coins.length === 0 && (
        <div className="loaderContainer">
          <div className="loader"></div>
        </div>
      )}
      {state.filteredCoins.length === 0 ? (
        <div className="emptyCoinList">
          <p>No match were found</p>
        </div>
      ) : (
        state.filteredCoins.map((coin) => (
          <Link key={coin.id} to={`/coin/${coin.id}`} element={<CoinLayout />}>
            <CoinItem data={coin} />
          </Link>
        ))
      )}
    </div>
  );
};

export default CoinList;
