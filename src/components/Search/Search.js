import './Search.css';

function Search() {
  return (
    <div className='view_wrapper'>
      <div className='filter'>
        <div className='price_filter'>
          Цена
          <label><input type="checkbox" /> 100$</label>
          <label><input type="checkbox" /> 200$</label>
          <label><input type="checkbox" /> 300$</label>
          <label><input type="checkbox" /> 500$</label>
          <label><input type="checkbox" /> 1000$</label>
        </div>
      </div>
      <div className='viewer'>
        <div className='wrapper_view_blocks'>
          {/* <FlatsList/>
          <Pagination/> */}
        </div>
      </div>
    </div>
  );
}

export default Search;