import './Search.css';

import List from './List/List';

function Search({filterAds, updateFilterAds}) {
  return (
    <div className='view_wrapper'>
      <div className='filter'>
        <div className='price_filter'>
          <label><input type="checkbox" /> 100$</label>
          <label><input type="checkbox" /> 200$</label>
          <label><input type="checkbox" /> 300$</label>
          <label><input type="checkbox" /> 500$</label>
          <label><input type="checkbox" /> 1000$</label>
        </div>
      </div>
      <div className='viewer'>
        <div className='wrapper_view_blocks'>
          <List/>
        </div>
      </div>
    </div>
  );
}

export default Search;