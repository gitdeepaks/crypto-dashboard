import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { CoinChart } from '../components/CoinChart';
import { Spinner } from '../components/Spinner';

const API_URL = import.meta.VITE_COIN_API_URL;

export const CoinDetails = () => {
  const { id } = useParams();
  const [coin, setCoins] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCoinDetails = async () => {
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch coin details');
      }
      const data = await res.json();
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCoinDetails();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!coin) return <div>No coin data found.</div>;

  // Helper for price change color
  const priceChangeClass = value =>
    value > 0 ? 'stat-positive' : value < 0 ? 'stat-negative' : '';

  return (
    <div className="coin-details-glass">
      <Link to="/" className="back-btn-glass">
        <span className="back-icon">←</span> Back to Home
      </Link>
      <div className="coin-details-flex">
        <div className="coin-details-main">
          <div className="coin-img-glow-wrap">
            <div className="coin-img-glow" />
            <img
              src={coin.image.large}
              alt={coin.name}
              className="coin-details-image-woa"
            />
          </div>
          <h1 className="coin-details-title-woa">
            {coin
              ? `${coin.name} (${coin.symbol.toUpperCase()})`
              : 'Coin Details'}
          </h1>
          <p className="coin-details-desc-woa">
            {coin.description.en.split('.')[0] + '.'}
          </p>
          <div className="coin-details-badges">
            {coin.categories.map(category => (
              <span className="coin-badge" key={category}>
                {category}
              </span>
            ))}
          </div>
          <div className="coin-details-links-woa">
            {coin.links.homepage[0] && (
              <a
                href={coin.links.homepage[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="coin-link-btn"
              >
                🌐 Website
              </a>
            )}
            {coin.links.blockchain_site[0] && (
              <a
                href={coin.links.blockchain_site[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="coin-link-btn"
              >
                🧩 Blockchain
              </a>
            )}
            {coin.links.official_forum_url[0] && (
              <a
                href={coin.links.official_forum_url[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="coin-link-btn"
              >
                💬 Forum
              </a>
            )}
          </div>
        </div>
        <div className="coin-details-side">
          <div className="coin-details-info-woa fade-in">
            <div className="coin-stat-row">
              <span className="stat-label">Rank:</span>
              <span className="stat-value">
                #{coin.market_cap_rank ?? 'N/A'}
              </span>
            </div>
            <div className="coin-stat-row">
              <span className="stat-label">Current Price:</span>
              <span className="stat-value stat-accent">
                $
                {coin.market_data?.current_price?.usd !== undefined
                  ? coin.market_data.current_price.usd.toLocaleString()
                  : 'N/A'}
              </span>
            </div>
            <div className="coin-stat-row">
              <span className="stat-label">Market Cap:</span>
              <span className="stat-value">
                $
                {coin.market_data?.market_cap?.usd !== undefined
                  ? coin.market_data.market_cap.usd.toLocaleString()
                  : 'N/A'}
              </span>
            </div>
            <div className="coin-stat-row">
              <span className="stat-label">Price Change 24h:</span>
              <span
                className={`stat-value ${priceChangeClass(
                  coin.market_data?.price_change_24h
                )}`}
              >
                {coin.market_data?.price_change_24h !== undefined
                  ? `$${coin.market_data.price_change_24h.toLocaleString()}`
                  : 'N/A'}
              </span>
            </div>
            <div className="coin-stat-row">
              <span className="stat-label">Price Change 7d:</span>
              <span
                className={`stat-value ${priceChangeClass(
                  coin.market_data?.price_change_percentage_7d
                )}`}
              >
                {coin.market_data?.price_change_percentage_7d !== undefined
                  ? `${coin.market_data.price_change_percentage_7d.toLocaleString()}%`
                  : 'N/A'}
              </span>
            </div>
            <div className="coin-stat-row">
              <span className="stat-label">Price Change 30d:</span>
              <span
                className={`stat-value ${priceChangeClass(
                  coin.market_data?.price_change_percentage_30d
                )}`}
              >
                {coin.market_data?.price_change_percentage_30d !== undefined
                  ? `${coin.market_data.price_change_percentage_30d.toLocaleString()}%`
                  : 'N/A'}
              </span>
            </div>
            <div className="coin-stat-row">
              <span className="stat-label">Price Change 90d:</span>
              <span
                className={`stat-value ${priceChangeClass(
                  coin.market_data?.price_change_percentage_90d
                )}`}
              >
                {coin.market_data?.price_change_percentage_90d !== undefined
                  ? `${coin.market_data.price_change_percentage_90d.toLocaleString()}%`
                  : 'N/A'}
              </span>
            </div>
            <div className="coin-stat-row">
              <span className="stat-label">Total Supply:</span>
              <span className="stat-value">
                {coin.market_data.total_supply?.toLocaleString() || 'NA'}
              </span>
            </div>
            <div className="coin-stat-row">
              <span className="stat-label">All Time High:</span>
              <span className="stat-value stat-accent">
                $
                {coin.market_data?.ath?.usd !== undefined
                  ? coin.market_data.ath.usd.toLocaleString()
                  : 'N/A'}
              </span>
            </div>
            <div className="coin-stat-row">
              <span className="stat-label">All Time Low:</span>
              <span className="stat-value stat-accent">
                $
                {coin.market_data?.atl?.usd !== undefined
                  ? coin.market_data.atl.usd.toLocaleString()
                  : 'N/A'}
              </span>
            </div>
            <div className="coin-stat-row">
              <span className="stat-label">Last Updated:</span>
              <span className="stat-value">
                {new Date(coin.last_updated).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="coin-chart-woa">
            <CoinChart coinId={coin.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
// New/updated CSS classes needed:
// .coin-details-glass, .back-btn-glass, .back-icon, .coin-details-flex, .coin-details-main, .coin-img-glow-wrap, .coin-img-glow, .coin-details-image-woa, .coin-details-title-woa, .coin-details-desc-woa, .coin-details-badges, .coin-badge, .coin-details-links-woa, .coin-link-btn, .coin-details-side, .coin-details-info-woa, .fade-in, .coin-stat-row, .stat-label, .stat-value, .stat-accent, .stat-positive, .stat-negative, .coin-chart-woa
