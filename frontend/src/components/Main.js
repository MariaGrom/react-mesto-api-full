import React from 'react';
import Card from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const { onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelete, onCardLike, cards } = props

  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);


  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__photo" onClick={onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
          </div>
          <div className="profile__user">
            <div className="profile__name">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button className="profile__edit-button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__items">
          {cards.map(card => (<Card key={card._id} card={card} onClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />))}
        </ul>
      </section>

    </main >
  )
}

export default Main