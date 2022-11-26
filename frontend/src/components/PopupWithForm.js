import React from 'react';

function PopupWithForm(props) {
  const { name, title, children, textSubmit, isOpen, onClose, onSubmit } = props

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <form className={`popup__content popup__form popup__form_${name}`} onSubmit={onSubmit}>
        <button type="button" className="popup__close-button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button type="submit" className="popup__submit-button popup__button" >{textSubmit}</button>
      </form>
    </div>
  )
}

export default PopupWithForm