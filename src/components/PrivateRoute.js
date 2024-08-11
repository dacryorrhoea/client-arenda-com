import { Navigate, Outlet } from 'react-router-dom';
import { useUserStatus } from '../utils/hooks/useUserStatus';

function PrivateRoute() {
  const [userStatus] = useUserStatus()

  if (userStatus !== 'Anon') {
    return <Outlet/>
  } else {
    return <Navigate to='/login' replace={true}/>
  }
}

export default PrivateRoute;