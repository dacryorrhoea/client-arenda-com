import './Login.css'
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from 'axios';

const serverUrl = 'http://localhost:8000/'

const Login = ({ userInfo, updateUserInfo }) => {
  const [isLogin, setIsLogin] = useState('')
  const [isPassword, setIsPassword] = useState('')

  const [isError, setIsError] = useState(null)

  const login = () => {
    axios
      .post(serverUrl + "api/token/", {
        username: isLogin,
        password: isPassword
      })
      .then((res) => {
        if (!(res.status >= 200 && res.status <= 299)) {
          throw Error(res.statusText);
        }
        getUserInfo(res.data.access, res.data.refresh)
      })
      .catch((err) => {
        console.error(err);
        setIsError("Неверные данные")
      });
  }

  const getUserInfo = (access_token, refresh_token) => {
    axios
      .get(serverUrl + "api/account/user/profile/", {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      .then((res) => {
        if (res.data.groups[0] === 2) {
          updateUserInfo({
            isAuthenticated: true,
            username: res.data.username,
            refresh_token: refresh_token,
            lessor_rule: true,
            user_id: res.data.id
          })
        } else {
          updateUserInfo({
            isAuthenticated: true,
            username: res.data.username,
            refresh_token: refresh_token,
            lessor_rule: false,
            user_id: res.data.id
          })
        }
      })
      .catch((err) => {
        if (err.status === 401) console.log(err.error);
      });
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
          <input type="text" onChange={(e)=>setIsLogin(e.target.value)} value={isLogin} />

          <label htmlFor="password">Пароль</label>
          <input type="password" onChange={(e)=>setIsPassword(e.target.value)} value={isPassword} />

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