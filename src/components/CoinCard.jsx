import React from 'react';
import { Link } from 'react-router';

export const CoinCard = ({ coin }) => {
  return (
    <Link to={`/coin/${coin.id}`}>
      <div className="coin-card">
        <div className="coin-header">
          <img src={coin.image} alt={coin.name} className="coin-image" />
          <div className="">
            <h2>{coin.name}</h2>
            <p className="symbol">{coin.symbol.toUpperCase()}</p>
          </div>
        </div>
        <p>Price: {coin.current_price.toLocaleString()}</p>
        <p
          className={
            coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'
          }
        >
          {coin.price_change_percentage_24h !== undefined
            ? coin.price_change_percentage_24h.toFixed(2)
            : 'N/A'}{' '}
          %
        </p>
        <p>Market Cap: {coin.market_cap.toLocaleString()}</p>
      </div>
    </Link>
  );
};
