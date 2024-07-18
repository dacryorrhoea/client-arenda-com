import './App.css';

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import axios from 'axios';

import Search from './pages/Search/Search';
import Home from './pages/Home/Home';
import Card from './pages/AdsCard/AdsCard';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';

const ANONYMOUS = {
  isAuthenticated: false,
  username: 'Anon',
  user_id: null
}

const DEFAULT_FILTER = {
  address: '',
  price: []
}

function App() {
  const [userInfo, setUserInfo] = useState(ANONYMOUS);
  const [filterAds, setFilterAds] = useState(DEFAULT_FILTER);

  useEffect(() => {
    axios.get('http://localhost:8000/api/auth/session/', { withCredentials: true })
      .then((res) => {
        if (res.data.isAuthenticated) {
          const savedUserInfo = JSON.parse(localStorage.getItem('user_info'));
          if (savedUserInfo) {
            setUserInfo(savedUserInfo);
          }
        }
      })
      .catch(err => console.error(err))
  }, []);

  const updateUserInfo = (data) => {
    if (data) {
      setUserInfo(data);
      localStorage.setItem('user_info', JSON.stringify(data));
    } else {
      setUserInfo(ANONYMOUS);
      localStorage.setItem('user_info', JSON.stringify(ANONYMOUS));
    }
  }

  const updateFilterAds = (data) => {
    setFilterAds(data);
    console.log(filterAds);
  }

  return (
    <Router>
      <div className='app'>
        <header className='header'>
          <div className='logo'><Link className='link' to="/">Аренда.com</Link></div>
          <nav className='menu'>
            {/* <div className='item'><Link className='link' to="/search">Для арендателя</Link></div> */}
            {userInfo.isAuthenticated?
              <div className='item'><Link className='link' to="/profile">Профиль</Link></div>
            :
            <>
              <div className='item'><Link className='link' to="/login">Войти</Link></div>
              <div className='item'><Link className='link' to="/signup">Зарегистрироваться</Link></div>
            </>
            }
          </nav>
        </header> 

        <main className='main'>
          <Routes>
            <Route path='/' element={<Home updateFilterAds={updateFilterAds}/>}/>

            <Route path='login' element={
              <Login userInfo={userInfo} updateUserInfo={updateUserInfo}/>
            }/>

            <Route path='signup' element={
              <Register/>
            }/>

            <Route path='search' element={<Search filterAds={filterAds} updateFilterAds={updateFilterAds}/>}/>
            <Route path='search/ads/:id' element={<Card/>}/>

            <Route path='profile' element={
              !userInfo.isAuthenticated ?
              <Login userInfo={userInfo} updateUserInfo={updateUserInfo}/>
              :
              <Profile userInfo={userInfo} updateUserInfo={updateUserInfo}/>
            }/>
          </Routes>
        </main>

        <footer className='footer'>
          {/* потом сюда запихнуть ссылки */}
        </footer>
      </div>
    </Router>
  );
}

export default App;
