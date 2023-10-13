import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar, CoinList } from "./components";
import CoinLayout from "./routes/CoinLayout";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<CoinList />} />
        <Route path="/coin" element={<CoinLayout />}>
          <Route path=":coinId" element={<CoinLayout />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
