import { useEffect, useState } from 'react';
import axios from 'axios';

const useCoingecko = params => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);

  const { name, currency } = params;

  const ENDPOINT = `https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=${currency}`;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      clearInterval();
      try {
        const { data: response } = await axios.get(ENDPOINT);
        setValue(response[name][currency]);
      } catch (error) {
        console.error('Error calling the api');
      }
      setLoading(false);
    };
    fetchData();
  }, [ENDPOINT, currency, name]);

  return { loading, value };
};

export default useCoingecko;
