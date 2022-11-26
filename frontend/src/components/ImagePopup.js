import React from 'react';

function ImagePopup(props) {
  const { card, isOpen, onClose } = props

  return (
    <div className={isOpen ? 'popup popup_type_photo popup_opened' : 'popup popup_type_photo'}>
      <div className="popup__content-photo" >
        <img className="popup__photo" src={card.link} alt={card.name} />
        <figcaption className="popup__caption">{card.name}</figcaption>
        <button type="button" className="popup__close-button" onClick={onClose}></button>
      </div>
    </div>
  )
}
export default ImagePopup