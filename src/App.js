import './App.css';

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react'

import { YMaps } from '@pbe/react-yandex-maps';

import Search from './pages/Search/Search';
import Home from './pages/Home/Home';
import AdCard from './pages/AdsCard/AdCard';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Placing from './pages/Placing/Placing';

const ANONYMOUS = {
  isAuthenticated: false,
  username: 'Anon',
  refresh_token: '',
  lessor_rule: false,
  user_id: null
}

const DEFAULT_SEARCH_FILTER = {
  address: '',
}

function App() {
  const [userInfo, setUserInfo] = useState(ANONYMOUS);
  const [searchFilter, setSearchFilter] = useState(DEFAULT_SEARCH_FILTER);

  useEffect(() => {
    const savedUserInfo = JSON.parse(localStorage.getItem('user_info'));
    if (savedUserInfo) {
      setUserInfo(savedUserInfo);
    }
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

  const updateSearchFilter = (data) => {
    setSearchFilter(data);
  }

  return (
    <YMaps>
      <Router>
        <div className='app'>
          <header className='header'>
            <div className='logo'><Link className='link' to="/">Аренда.com</Link></div>
            <nav className='menu'>
              {
                userInfo.isAuthenticated ?
                  <>
                    {
                      userInfo.lessor_rule ?
                        <div className='item'><Link className='link' to="/placing">Разместить объявление</Link></div>
                        :
                        <div className='item'><Link className='link' to="/booking">Разместить бронь</Link></div>
                    }
                    <div className='item'><Link className='link' to="/profile">Профиль</Link></div>
                  </>
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
              <Route path='/' element={<Home updateSearchFilter={updateSearchFilter} />} />

              <Route path='placing' element={
                <Placing userInfo={userInfo} />
              } />

              <Route path='login' element={
                <Login userInfo={userInfo} updateUserInfo={updateUserInfo} />
              } />

              <Route path='signup' element={
                <Register />
              } />

              <Route path='search/ads' element={
                <Search searchFilter={searchFilter} />
              } />

              <Route path='search/ads/:ad_id' element={
                <AdCard searchFilter={searchFilter} />
              } />

              <Route path='profile' element={
                !userInfo.isAuthenticated
                  ?
                  <Login userInfo={userInfo} updateUserInfo={updateUserInfo} />
                  :
                  <Profile userInfo={userInfo} updateUserInfo={updateUserInfo} />
              } />
            </Routes>
          </main>

          <footer className='footer'>
            {/* потом сюда запихнуть ссылки */}
          </footer>
        </div>
      </Router>
    </YMaps>
  );
}

export default App;
