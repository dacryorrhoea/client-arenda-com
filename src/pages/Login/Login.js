import './Login.css'
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { login } from '../../utils/requests/client.auth';
import { receiveData } from '../../utils/data';
import { useUserStatus } from '../../utils/hooks/useUserStatus';

const Login = () => {
  const [userStatus] = useUserStatus()

  const [isLogin, setIsLogin] = useState('')
  const [isPassword, setIsPassword] = useState('')

  const [isError, setIsError] = useState(null)

  async function submitForm(e) {
    e.preventDefault()

    const loginResult = await login({
      login: isLogin,
      password: isPassword
    })

    if (loginResult !== 'Ok') {
      setIsError("Неверные данные")
    }
  }

  if (userStatus == 'Anon') {
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
    return <Navigate to='/profile' replace={true} />
  }
}

export default Login;