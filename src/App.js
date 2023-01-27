import './App.css';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Favorites from './pages/Favorites';

export const AppContext = createContext({});

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cardsData = 'https://63cab12bf36cbbdfc75e1592.mockapi.io/items';
  const cartData = 'https://63cab12bf36cbbdfc75e1592.mockapi.io/cart';
  const favoriteData = 'https://63cd31e7d4d47898e39442f7.mockapi.io/favorites';

  useEffect(() => {
    async function fetchData() {
      const cartsResponse = await axios.get(cartData);
      const favoriteResponse = await axios.get(favoriteData);
      const itemsResponse = await axios.get(cardsData);

      setIsLoading(false);
      setCartItems(cartsResponse.data);
      setFavorites(favoriteResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onRemoveItem = (id) => {
    axios.delete(`${cartData}/${id}`);
    setCartItems((prev) =>
      prev.filter((item) => Number(item.id) !== Number(id))
    );
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`${favoriteData}/${obj.id}`);
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(favoriteData, obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в Избранное');
    }
  };

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => item.id === obj.id)) {
        axios.delete(`${cartData}/${obj.id}`);
        setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        axios.post(cartData, obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch {}
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(!cartOpened)}
            onRemove={onRemoveItem}
          />
        )}
        <Header onClickCart={() => setCartOpened(!cartOpened)} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                searchValue={searchValue}
                cartItems={cartItems}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          ></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
