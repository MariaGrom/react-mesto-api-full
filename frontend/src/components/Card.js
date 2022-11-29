import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const { card, onClick, onCardLike, onCardDelete } = props

  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);
  console.log('currentUser из Card', currentUser)

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;
  console.log('card.owner', card.owner)
  console.log('currentUser._id', currentUser._id)
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `elements__delete ${isOwn ? 'elements__delete_visible' : ''}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === currentUser._id);
  
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `elements__like ${isLiked ? 'elements__like_active' : ''}`
  );

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <li className="elements__item">
      <img className="elements__photo" src={card.link} alt={card.name} onClick={() => onClick(card)} />
      <div className="elements__description">
        <h2 className="elements__title"> {card.name} </h2>
        <div className="elements__like-container">
          <button className={cardLikeButtonClassName} onClick={() => handleLikeClick()}></button>
          <span className="elements__like_counter">{card.likes.length}</span>
        </div>
      </div>
      <button className={cardDeleteButtonClassName} onClick={() => handleDeleteClick()}></button>
    </li>
  )
}

export default Card