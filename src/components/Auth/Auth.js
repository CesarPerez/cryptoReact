import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { authActions } from '../../store/reducers/auth';
import { notifActions } from '../../store/reducers/notif';

const Auth = ({ children }) => {
  const curAuth = useSelector(state => state.auth.isAuth);
  const dispatch = useDispatch();
  const isAuth = curAuth ? curAuth : localStorage.getItem('logged');
  if (isAuth) {
    dispatch(authActions.login());
  } else {
    dispatch(authActions.logout());
    dispatch(notifActions.success('log out successfully'));
  }
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default Auth;
