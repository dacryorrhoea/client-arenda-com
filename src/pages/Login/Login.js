import './Login.css'
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from 'axios';

const serverUrl = 'http://localhost:8000/'

const Login = ({ userInfo, updateUserInfo }) => {
  const [isLogin, setIsLogin] = useState('')
  const [isPassword, setIsPassword] = useState('')

  const [isCsrf, setIsCsrf] = useState(null)
  const [isError, setIsError] = useState(null)

  useEffect(() => {
    axios.get(serverUrl + 'api/auth/csrf/', { withCredentials: true })
      .then((res) => {
        if (!(res.status >= 200 && res.status <= 299)) {
          throw Error(res.statusText);
        }
        setIsCsrf(res.headers.get('X-CSRFToken'))
      })
      .catch((err) => console.error(err))
  }, [])

  const login = () => {
    axios.post(serverUrl + "api/auth/login/", {
      username: isLogin,
      password: isPassword
    }, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": isCsrf,
      }
    })
      .then((res) => {
        if (!(res.status >= 200 && res.status <= 299)) {
          throw Error(res.statusText);
        }
        getUserInfo()
      })
      .catch((err) => {
        console.error(err);
        setIsError("Неверные данные")
      });
  }

  const getUserInfo = () => {
    axios.get(serverUrl + "api/auth/user_info/", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        updateUserInfo(res.data)
      })
      .catch((err) => {
        if (err.status === 401) console.log(err.error);
      });
  }

  function changePassword(e) {
    setIsPassword(e.target.value)
  }

  function changeLogin(e) {
    setIsLogin(e.target.value)
  }

  function submitForm(e) {
    e.preventDefault()
    login()
  }

  if (!userInfo.isAuthenticated) {
    return (
      <div className="login_form_wrapper">
        <form className="login_block">
          <label htmlFor="login">Логин</label>
          <input type="text" onChange={changeLogin} value={isLogin} />
          <label htmlFor="password">Пароль</label>
          <input type="password" onChange={changePassword} value={isPassword} />
          {isError ? <div >{isError}</div> : null}
          <input type="submit" value='Войти' onClick={submitForm} className='btn' />
        </form>
      </div>
    )
  } else {
    return <Navigate to='/' replace={true} />
  }
}

export default Login;