import './Home.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home({updateSearchFilter}) {
  const navigate = useNavigate()
  const [address, setAddress] = useState('')

  const onClickSearchButton = () => {
    updateSearchFilter({
      address: address,
    });
    navigate('/search/ads/', {replace: true});
  }

  return (
    <div className='search_bar'>
      <input type='text' className='search' onChange={(e)=>setAddress(e.target.value)}/>
      <input type='date' className='search'/>
      <input type='date' className='search'/>
      <input type='text' className='search'/>
      <input type="submit" value='Поиск' onClick={onClickSearchButton} className='button' />  
    </div>
  );
}

export default Home;