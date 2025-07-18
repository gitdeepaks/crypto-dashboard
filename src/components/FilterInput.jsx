import React from 'react'

export const FilterInput = ({filter,onFilterChange}) => {
  return (
    <div className='filter'>
      <input type="text" value={filter} onChange={(e) => onFilterChange(e.target.value)} placeholder='Search coins by names or symbol...' />
    </div>
  )
}
