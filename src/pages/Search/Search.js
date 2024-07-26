import './Search.css';

import List from './List';
import Filter from './Filter';

function Search({ filterAds, updateFilterAds }) {
  return (
    <div className='view_wrapper'>
      <div className='filter'>
        <Filter filterAds={filterAds} updateFilterAds={updateFilterAds} />
      </div>
      <div className='viewer'>
        <div className='wrapper_view_blocks'>
          <List filterAds={filterAds} />
        </div>
      </div>
    </div>
  );
}

export default Search;