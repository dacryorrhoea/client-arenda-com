import { useState } from "react";

function Filter({ filterAds, updateFilterAds }) {
  const [address, setAddress] = useState(filterAds.address)
  const [minPrice, setMinPrice] = useState('100');
  const [maxPrice, setMaxPrice] = useState('9000');

  const onClickAcceptFilters = () => {
    updateFilterAds({
      address: address,
      min_price: minPrice,
      max_price: maxPrice
    });
  }

  return (
    <div className='price_filter'>
      <label>
        Адрес
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <label>
        мин. цена
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </label>
      <label>
        макс. цена
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </label>
      <button onClick={onClickAcceptFilters}>Принять фильтры</button>
    </div>
  )
}

export default Filter;