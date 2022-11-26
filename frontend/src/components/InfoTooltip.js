import React from 'react';
import tooltip_ok from '../images/union_ok.png';
import tooltip_fail from '../images/union_fail.png'

function InfoTooltip(props) {

  const { name, isSignIn, isOpen, onClose } = props
  const icon = isSignIn ? tooltip_ok : tooltip_fail;
  const message = isSignIn ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.';

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__content popup__content-tooltip">
        <button type="button" className="popup__close-button" onClick={onClose}></button>

        <img className="popup__tooltip_fail" src={icon} />
        <h2 className="popup__title">{message}</h2>

      </div>
    </div>
  )

}
export default InfoTooltip