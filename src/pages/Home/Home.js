import './Home.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home({updateSearchFilter}) {
  const navigate = useNavigate()
  const [address, setAddress] = useState('')
  const [beginDate, setBeginDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [countPeople, setCountPeople] = useState('')

  const onClickSearchButton = () => {
    updateSearchFilter({
      address: address,
      begin_date: beginDate,
      end_date: endDate,
      count_people: countPeople
    });
    navigate('/search/ads/', {replace: true});
  }

  return (
    <div className='search_bar'>
      <input type='text' className='search' onChange={(e)=>setAddress(e.target.value)}/>
      <input type='date' className='search' onChange={(e)=>setBeginDate(e.target.value)}/>
      <input type='date' className='search' onChange={(e)=>setEndDate(e.target.value)}/>
      <input type='number' className='search' onChange={(e)=>setCountPeople(e.target.value)}/>
      <input type="submit" value='Поиск' onClick={onClickSearchButton} className='button' />  
    </div>
  );
}

export default Home;