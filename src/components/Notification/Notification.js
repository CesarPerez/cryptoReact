import { Alert } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notifActions } from '../../store/reducers/notif';

function Notification() {
  const dispatch = useDispatch();
  const notif = useSelector(state => state.notif);
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(notifActions.clear());
    }, 3000);
    return () => clearTimeout(timer);
  });
  return notif.active ? <Alert severity={notif.level}>{notif.msg}</Alert> : null;
}

export default Notification;
