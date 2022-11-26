import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const { isOpen, onClose, onAddPlace } = props

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);


  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      textSubmit="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      children={
        <fieldset className="popup__fields">
          <label className="place">
            <input type="text"
              name="name"
              id="place__input"
              placeholder="Название"
              className="popup__text popup__text_type_name popup__input"
              minLength="2"
              maxLength="30"
              required
              value={name}
              onChange={handleNameChange}
            />
            <span className="popup__input-error place__input-error"></span>
          </label>
          <label className="link">
            <input
              type="url"
              name="link"
              id="link__input"
              placeholder="Ссылка на картинку"
              className="popup__text popup__text_type_link popup__input"
              required
              value={link}
              onChange={handleLinkChange} />
            <span className="popup__input-error link__input-error"></span>
          </label>
        </fieldset>
      }
    />
  )
}

export default AddPlacePopup