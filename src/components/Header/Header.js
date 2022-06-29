import { Link } from 'react-router-dom';
import './Header.css';
import * as rawRoutes from '../../constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/reducers/auth';

function Header() {
  let allRoutes = [];

  const isAuth = useSelector(state => state.auth.isAuth);

  const aux = Object.keys(rawRoutes);
  aux.forEach((key, i) => {
    const newElem = rawRoutes[key];
    allRoutes = [...allRoutes, { ...newElem, id: 'id-' + i }];
  });
  allRoutes.sort((a, b) => a.order - b.order);

  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem('logged');
    dispatch(authActions.logout());
  };

  return (
    <header className="navbar">
      <h4 className="brand">
        <Link to="/">CryptoTool</Link>
      </h4>
      {isAuth && (
        <ol className="routes-container">
          {allRoutes.map(route => {
            return (
              <li key={route.id}>
                <Link to={route.link}>{route.name}</Link>
              </li>
            );
          })}
          <li key="logout" id="logout" onClick={handleLogout}>
            Logout
          </li>
        </ol>
      )}
    </header>
  );
}

export default Header;
