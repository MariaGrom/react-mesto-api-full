import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props

  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  const avatarRef = React.useRef(currentUser.avatar);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      textSubmit="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <fieldset className="popup__fields">
          <label className="avatar">
            <input
              type="url"
              ref={avatarRef}
              name="avatar"
              id="avatar__input"
              placeholder="Ссылка на картинку"
              className="popup__text popup__text_type_avatar popup__input" required />
            <span className="popup__input-error avatar__input-error"></span>
          </label>
        </fieldset>
      }
    />
  )
}

export default EditAvatarPopup