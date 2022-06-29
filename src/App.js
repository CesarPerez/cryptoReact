import './App.css';
import Notes from './components/Notes/Notes.js';
import Header from './components/Header/Header.js';
import Crypto from './components/Crypto/Crypto.js';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Auth from './components/Auth/Auth';
import Notification from './components/Notification/Notification';
import Footer from './components/Footer/Footer';
import Error from './components/Error/Error';
import * as rawRoutes from './constants/routes';

function App() {
  const aux = Object.keys(rawRoutes);
  let allRoutes = [];
  aux.forEach((key, i) => {
    const newElem = rawRoutes[key];
    if (newElem.id) {
      allRoutes = [...allRoutes, newElem];
    }
  });

  return (
    <div className="App">
      <Header />
      <Notification />
      <Routes className="navbar">
        <Route key="id-1" path="/error" element={<Error type="403" />} />
        <Route
          key="id-2"
          path="/"
          element={
            <Auth>
              <Dashboard />
            </Auth>
          }
        />
        <Route
          key="id-3"
          path="/notes"
          element={
            <Auth>
              <Notes />
            </Auth>
          }
        />
        <Route key="id-4" path="/login" element={<Login />} />
        <Route key="id-5" path="*" element={<Error type="404" />} />
        {allRoutes.map((elem, i) => {
          const index = 6 + i;
          return (
            <Route
              key={'id-' + index}
              path={elem.link}
              element={
                <Auth>
                  <Crypto name={elem.id} />
                </Auth>
              }
            />
          );
        })}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
