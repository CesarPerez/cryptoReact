import { memo } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import './Crypto.css';
import useCoingecko from '../../hooks/useCoingecko';

function Crypto(props) {
  const { name = 'bitcoin', currency = 'eur' } = props;

  const { loading, value } = useCoingecko({ name, currency });

  return (
    <>
      {loading && (
        <div data-testid="loading">
          <LinearProgress />
        </div>
      )}
      {!loading && (
        <div className="container" data-testid="resolved">
          <p>1 {name}</p>
          <CompareArrowsIcon />
          <p>
            {value} {currency}
          </p>
        </div>
      )}
    </>
  );
}

export default memo(Crypto);
