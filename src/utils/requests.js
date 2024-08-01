import axios from 'axios';
const serverUrl = 'http://localhost:8000/';

function getAccessToken(func, refresh) {
    axios.post(serverUrl + "api/token/refresh/", {
      refresh: refresh
    })
    .then((res) => {
      func(res.data.access)
    })
    .catch(err => console.error(err));
}

export {getAccessToken}