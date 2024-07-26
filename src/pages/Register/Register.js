import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const serverUrl = 'http://localhost:8000/'

function Register() {
  const [isLogin, setIsLogin] = useState('')
  const [isEmail, setIsEmail] = useState('')
  const [isPassword, setIsPassword] = useState('')
  const [isUserLessor, setIsUserLessor] = useState(false)

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

  const signup = () => {
    axios.post(serverUrl + "api/auth/signup/", {
      username: isLogin,
      email: isEmail,
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
      })
      .catch((err) => {
        console.error(err);
        setIsError("Неверные данные")
      });
  }

  function submitForm(e) {
    e.preventDefault()
    signup()
    return <Navigate to='login' replace={true}/>
  }

  return (
    <div className="register_form_wrapper">
      <form className="register_block">
        <label htmlFor="login">Логин</label>
        <input type="text" onChange={(e)=>setIsLogin(e.target.value)} value={isLogin} />

        <label htmlFor="email">Почта</label>
        <input type="text" onChange={(e)=>setIsEmail(e.target.value)} value={isEmail} />

        <label htmlFor="password">Пароль</label>
        <input type="password" onChange={(e)=>setIsPassword(e.target.value)} value={isPassword} />

        <label htmlFor="user_lessor">
        Хочу быть арендодателем
          <input 
            type="checkbox"
            onChange={(e)=>setIsUserLessor(!isUserLessor)}
            value={isUserLessor}
            className='user_lessor_input'
          />
        </label>

        {isError ? <div >{isError}</div> : null}

        <input type="submit" value='Зарегистрироваться' onClick={submitForm} className='btn' />
      </form>
    </div>
  );
}

export default Register;