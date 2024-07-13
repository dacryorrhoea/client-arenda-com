import axios from 'axios';
import React , { useState } from 'react';

// const [token, setToken] = useState({});

  // const handleSubmitForm = (values) => {
  //   axios.post('http://127.0.0.1:8000/users/login/', values)
  //     .then(response => {
  //       if (response.status !== 200) return
  //       setToken(response.data.user.token)
  //       localStorage.setItem('token', token);
  //       // console.log(response.data.user.token);
  //     })
  //     .catch(error => console.error(error));

  // }

  // const clickHandle = () => {
  //   handleSubmitForm(login_form);
  //   console.log(localStorage.getItem('token'));
  // }

  // const clickUserHandle = () => {
  //   axios.get('http://127.0.0.1:8000/users/user/', {
  //     headers: {
  //       "Authorization": `token ${localStorage.getItem('token')}`
  //     }
  //   })
  //   .then(res => {
  //       console.log(res.data);
  //     });
  //   };