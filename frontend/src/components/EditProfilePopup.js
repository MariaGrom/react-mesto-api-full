import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const { isOpen, onClose } = props

  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  // Обработчик формы при submit
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      textSubmit="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        < fieldset className="popup__fields" >
          <label className="name">
            <input
              type="text"
              value={name}
              onChange={handleChangeName}
              name="name"
              id="name__input"
              placeholder="Имя"
              className="popup__text popup__text_type_name popup__input"
              minLength="2" maxLength="40"
              required />
            <span className="popup__input-error name__input-error"></span>
          </label>
          <label className="job">
            <input
              type="text"
              value={description}
              onChange={handleChangeDescription}
              name="about"
              id="job__input"
              placeholder="О себе"
              className="popup__text popup__text_type_job popup__input"
              minLength="2" maxLength="200"
              required />
            <span className="popup__input-error job__input-error"></span>
          </label>
        </fieldset >}
    />
  )
}

export default EditProfilePopup