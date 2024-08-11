import axios from 'axios';
const serverUrl = 'http://localhost:8000/';

function saveUserStatus(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  window.dispatchEvent(new Event("update_user_status"))
}

const login = async (data) => {
  try {
    const response = await axios.post(
      serverUrl + "api/token/",
      {
        username: data.login,
        password: data.password
      }
    )
    localStorage.setItem('UserTokenRefresh', JSON.stringify(response.data.refresh));

    const userInfo = await axios.get(
      serverUrl + "api/account/user/profile/",
      { headers: { Authorization: `Bearer ${response.data.access}` } }
    )

    if (userInfo.data.groups[0] === 1) {
      saveUserStatus('UserStatus', 'Lessor')
    } else {
      saveUserStatus('UserStatus', 'Rentor')
    }

    return 'Ok'
  } catch (error) {
    return (error)
  }
}

const logout = async () => {
  try {
    const response = await axios.post(
      serverUrl + "api/account/logout/",
      {
        refresh: JSON.parse(localStorage.getItem('UserTokenRefresh'))
      }
    )
    saveUserStatus('UserStatus', 'Anon')
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}

export {login, logout}