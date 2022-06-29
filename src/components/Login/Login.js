import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useState } from 'react';
import './Login.css';
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { authActions } from '../../store/reducers/auth';
import { notifActions } from '../../store/reducers/notif';

function Login(props) {
  const BANNEDNAME = 'homer';

  const dispatch = useDispatch();
  const nameRef = useRef();
  const passRef = useRef();
  const nav = useNavigate();
  let [errors, setErrors] = useState({ name: '', pass: '' });

  const clickLogin = e => {
    e.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredPass = passRef.current.value;
    if (enteredName === 'cesar' && enteredPass === 'password') {
      dispatch(authActions.login());
      nav('/');
      dispatch(notifActions.success('Logged successfully'));
      localStorage.setItem('logged', true);
    } else {
      dispatch(notifActions.error('Credentials are not valid'));
    }
  };

  const handlerChange = () => {
    const enteredName = nameRef.current.value;
    if (enteredName.toLowerCase() === BANNEDNAME) {
      setErrors({ ...errors, name: `Lo siento, tu no ${BANNEDNAME}r` });
    } else {
      setErrors({ name: '', pass: '' });
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={clickLogin} className="form-login">
        <div className="form-login__field">
          <label htmlFor="username-input">Name</label>
          <input type="text" id="username-input" ref={nameRef} onChange={handlerChange} required />
          {errors.name && <p className="form-login__field--error">{errors.name}</p>}
        </div>
        <div className="form-login__field">
          <label htmlFor="pass-input">Pass</label>
          <input type="password" id="pass-input" ref={passRef} required />
        </div>
        <div>
          <Button type="submit" variant="contained" endIcon={<LoginIcon />}>
            Log in
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
