import './Profile.css';
import axios from 'axios';

const serverUrl = 'http://localhost:8000/'

function Profile({ userInfo, updateUserInfo }) {
  const logout = () => {
    axios.get(serverUrl + "api/auth/logout/", { withCredentials: true })
      .then((res) => {
        updateUserInfo(null);
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="profile_wrapper">
      <div className='profile_info_block'>
        <img src="" alt="" className='profile_photo'/>
        <div className='user_info'>
          <p>Имя: {userInfo.username}</p>
          <p>Фамилия: Фамилия</p>
          <p>Lorem, ipsum.</p>
          <p>Lorem, ipsum.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum reiciendis necessitatibus ab perferendis quisquam rem cum esse et. Odio, ea!</p>
        </div>
        <button>Обновить</button>
        <button onClick={logout}>Выйти</button>
      </div>
      <div className='favourites_ads_wrapper'>
        <div className='ads_block'>
          <p>текст</p>
          <button>кнопка</button>
        </div>
        <div className='ads_block'>
          <p>текст</p>
          <button>кнопка</button>
        </div>
        <div className='ads_block'>
          <p>текст</p>
          <button>кнопка</button>
        </div>
        <div className='ads_block'>
          <p>текст</p>
          <button>кнопка</button>
        </div>
      </div>
      <div className='owner_ads_wrapper'>
        <div className='ads_block'>
          <p>текст</p>
          <button>кнопка</button>
        </div>
        <div className='ads_block'>
          <p>текст</p>
          <button>кнопка</button>
        </div>
        <div className='ads_block'>
          <p>текст</p>
          <button>кнопка</button>
        </div>
        <div className='ads_block'>
          <p>текст</p>
          <button>кнопка</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;