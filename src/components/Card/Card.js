import React, { useState } from 'react';
import ContentLoader from 'react-content-loader';
import styles from './Card.module.scss';

function Card({
  title,
  price,
  imageUrl,
  id,
  onFavorite,
  onPlus,
  favorited = false,
  addedCart = false,
  loading = false,
}) {
  const [isAdded, setIsAdded] = useState(addedCart);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const handlePlus = () => {
    onPlus({ title, price, imageUrl, id });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, price, imageUrl });
    setIsFavorite(!isFavorite);
  };
  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite} onClick={onClickFavorite}>
            <img
              src={
                isFavorite ? 'img/heartOnLiked.svg' : 'img/heartOffLiked.svg'
              }
              alt="favorite"
            />
          </div>
          <img width="100%" height={135} src={imageUrl} alt="sneakers" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            <img
              onClick={handlePlus}
              src={isAdded ? 'img/ChekedGreen.svg' : 'img/btnPlus.svg'}
              alt="plus"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
