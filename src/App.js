import './App.css';

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react'

import { YMaps, Map } from '@pbe/react-yandex-maps';
import { Select, Space} from 'antd';
import { HomeFilled, EnvironmentFilled } from '@ant-design/icons';

import Search from './pages/Search/Search';
import Home from './pages/Home/Home';
import AdCard from './pages/AdsCard/AdCard';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Placing from './pages/Placing/Placing';

import PrivateRoute from './components/PrivateRoute';

import { useUserStatus } from './utils/hooks/useUserStatus';

function App() {
  const [savedYM, setSavedYM] = useState()
  const [userStatus] = useUserStatus()
  const [exchangeRate, setExchangeRate] = useState()

  return (
    <YMaps
      query={{
        ns: "use-load-option",
        apikey: 'e9030180-63dd-4748-81c8-931a9bb3741c',
        load: 'package.full',
      }}
    >
      <Router>
        <div className='app'>
          <header className='header'>
            <div className='logo'><Link className='link' to="/">
              <EnvironmentFilled style={{'color':'#ed0e42', 'font-size':'32px', 'margin-right':'3px'}}/> 
              АРЕНДА<span style={{'color':'#ed0e42'}}>.com</span>
            </Link></div>
            <nav className='menu'>
              {
                userStatus !== 'Anon' ?
                  <>
                    {
                      userStatus == 'Lessor' ?
                        <div className='item'>
                          <Link className='link' to="/placing">Разместить объявление</Link>
                        </div>
                        :
                        <></>
                    }
                    <div className='item'>
                      <Link className='link' to="/profile">Профиль</Link>
                    </div>
                  </>
                  :
                  <>
                    <div className='item'>
                      <Link className='link' to="/login">Войти</Link>
                    </div>
                    <div className='item'>
                      <Link className='link' to="/signup">Зарегистрироваться</Link>
                    </div>
                  </>
              }
              <Select
                defaultValue='RUB'
                // size='large'

                style={{ width: 110}}
                onChange={(e) => { console.log(e) }}
                options={[
                  { label: '🇷🇺 RUB', value: 'RUB'},
                  { label: '🇺🇲 USD', value: 'USD'},
                ]}
              />
            </nav>
          </header>

          <main className='main'>
            <Routes>
              <Route path='/' element={<Home/>} />

              <Route path='placing' element={
                <Placing />
              } />

              <Route path='login' element={
                <Login/>
              } />

              <Route path='signup' element={
                <Register />
              } />

              <Route path='search/ads' element={
                <Search savedYM={savedYM}/>
              } />

              <Route path='search/ads/:ad_id' element={
                <AdCard/>
              } />

              <Route element={<PrivateRoute/>}>
                <Route path='profile' element={<Profile/>}/>
              </Route>

              
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
