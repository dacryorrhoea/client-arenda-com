import './Home.css';

function Home() {
  return (
    <div className='search_bar'>
      <input type='text' className='search'/>
      <input type='text' className='search'></input>
      <input type='text' className='search'></input>
      <input type='text' className='search'></input>
      <button className='button'>Поиск</button>      
    </div>
  );
}

export default Home;