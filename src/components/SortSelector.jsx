import React from 'react'

export const SortSelector = ({sortBy,onSortChange}) => {
  return (
    <div className='controls'>
      <label htmlFor="sort">Sort BY:</label>
      <select value={sortBy} id="sort" onChange={(e) => onSortChange(e.target.value)}>
        <option value="market_cap_desc">Market Cap (High to Low)</option>
        <option value="market_cap_asc">Market Cap (Low to High)</option>
        <option value="price_desc">Price (High to Low)</option>
        <option value="price_asc">Price (Low to High)</option>
        <option value="change_24h_desc">24h Change (High to Low)</option>
        <option value="change_24h_asc">24h Change (Low to High)</option>
        <option value="volume_desc">Volume (High to Low)</option>
        <option value="volume_asc">Volume (Low to High)</option>
      </select>
    </div>
  )
}
