import { useContext } from 'react';
import Card from '../components/Card/index';
import { AppContext } from '../App';

const Favorites = () => {
  const { favorites, onAddToFavorite } = useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favorites.map((item) => (
          <Card
            id={item.id}
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            favorited={true}
            onFavorite={onAddToFavorite}
            key={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
