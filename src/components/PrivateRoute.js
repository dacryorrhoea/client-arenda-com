import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ userInfo }) {
  if (userInfo.isAuthenticated) {
    return <Outlet/>
  } else {
    return <Navigate to='/login' replace={true}/>
  }
}

export default PrivateRoute;