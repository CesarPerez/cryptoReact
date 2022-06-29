import { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import FloodIcon from '@mui/icons-material/Flood';
import './Dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { counterActions } from '../../store/reducers/counter';

function Dashboard() {
  const dispatch = useDispatch();

  const clickAdd = useCallback(() => {
    dispatch(counterActions.increment());
  }, [dispatch]);

  const counter = useSelector(state => state.counter.counter);

  return (
    <>
      <div className="container-dashboard">
        <section>
          <div className="desc-1">
            <h3>Add Cryptos to your wishlish</h3>
            <p>
              You can note some of the cryptos you want to track in the future, there are new ones every day, dont miss
              the opportunity!
            </p>
          </div>
        </section>
        <div>
          <Button onClick={clickAdd} variant="contained" endIcon={<FloodIcon />}>
            Add randomly
          </Button>
          <p id="msg" data-testid="msg">
            {counter}
          </p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
