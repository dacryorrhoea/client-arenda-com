import './App.css';

import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import Search from './components/Search/Search';
import Home from './components/Home/Home';
import Card from './components/AdsCard/AdsCard';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <Router>
      <div className='app'>
        <header className='header'>
          <div className='logo'><Link className='link' to="/">Аренда.com</Link></div>
          <nav className='menu'>
            <div className='item'><Link className='link' to="/search">Для арендателя</Link></div>
            <div className='item'><Link className='link' to="/search">Для арендатора</Link></div>
            <div className='item'><Link className='link' to="/search">Избранное</Link></div>
            <div className='item'><Link className='link' to="/profile">Профиль</Link></div>
          </nav>
        </header>

        <main className='main'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='search' element={<Search/>}/>
            <Route path='search/ads/:id' element={<Card/>}/>
            <Route path='profile' element={<Profile/>}/>
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
