import './Profile.css';

function Profile() {
  return (
    <div className="profile_wrapper">
      <div className='profile_info_block'>
        <img src="https://us.rule34.xxx//images/2666/4a35a697653cde25a3ff9b72d4157c74.jpeg?10667927" alt="" className='profile_photo'/>
        <div className='user_info'>
          <p>Имя: Имя</p>
          <p>Фамилия: Фамилия</p>
          <p>Lorem, ipsum.</p>
          <p>Lorem, ipsum.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum reiciendis necessitatibus ab perferendis quisquam rem cum esse et. Odio, ea!</p>
        </div>
        <button>Обновить</button>
        <button>Выйти</button>
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