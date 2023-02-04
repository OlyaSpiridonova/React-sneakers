import { useContext, useEffect } from 'react';
import Card from '../components/Card/index';
import { AppContext } from '../App';
import axios from 'axios';
import { useState } from 'react';

const Orders = () => {
  const { onAddToFavorite, onAddToCart } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          'https://63cd31e7d4d47898e39442f7.mockapi.io/orders'
        );
        setIsLoading(!setIsLoading);
        setOrders(data.map((obj) => obj.items).flat());
      } catch (error) {
        alert('Failing');
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card
            key={index}
            onFavorite={(obj) => onAddToFavorite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;
