import React from 'react';
import { CoinCard } from '../components/CoinCard';
import { FilterInput } from '../components/FilterInput';
import { ListSelector } from '../components/ListSelector';
import { SortSelector } from '../components/SortSelector';
import { Spinner } from '../components/Spinner';

export const HomePage = ({
  coins,
  filter,
  setFilter,
  limit,
  setLimit,
  sortBy,
  setSortBy,
  loading,
  error,
  page,
  setPage,
}) => {
  const filteredCoins = coins
    .filter(coin => {
      return (
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
      );
    })
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case 'market_cap_desc':
          return b.market_cap - a.market_cap;
        case 'market_cap_asc':
          return a.market_cap - b.market_cap;
        case 'price_desc':
          return b.current_price - a.current_price;
        case 'price_asc':
          return a.current_price - b.current_price;
        case 'change_24h_desc':
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case 'change_24h_asc':
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        case 'volume_desc':
          return b.total_volume - a.total_volume;
        case 'volume_asc':
          return a.total_volume - b.total_volume;
        default:
          return 0;
      }
    });
  return (
    <div>
      🚀 Crypto Board
      {loading && <Spinner color="white" />}
      {error && <div className="error">{error}</div>}
      <div className="pagination">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <ListSelector limit={limit} onLimitChnage={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
      </div>
      {!loading && !error && (
        <main className="grid">
          {filteredCoins.length > 0 ? (
            filteredCoins.map(coin => <CoinCard key={coin.id} coin={coin} />)
          ) : (
            <div className="no-results">No results found</div>
          )}
        </main>
      )}
    </div>
  );
};
