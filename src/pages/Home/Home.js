import './Home.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home({updateFilterAds}) {
  const navigate = useNavigate()
  const [address, setAddress] = useState('')

  const onClickSearchButton = () => {
    updateFilterAds({
      address: address,
      min_price: 100,
      max_price: 10000
    });
    navigate('/search', {replace: true});
  }

  return (
    <div className='search_bar'>
      <input type='text' className='search' onChange={(e)=>setAddress(e.target.value)}/>
      <input type='text' className='search'/>
      <input type='text' className='search'/>
      <input type='text' className='search'/>
      {/* <button className='button' onClick={onClickSearchButton}>Поиск</button> */}
      <input type="submit" value='Поиск' onClick={onClickSearchButton} className='button' />  
    </div>
  );
}

export default Home;