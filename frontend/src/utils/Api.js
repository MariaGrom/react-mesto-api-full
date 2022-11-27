class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _handleResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  // Регистрация пользователя 
  register(data) {
    return fetch(`${this._url}/signup`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(this._handleResponce)
  };

  // Авторизация пользователя
  login(data) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._handleResponce)
  }

  // Установка токена
  setToken(token) {
    this._headers.Authorization = `Bearer ${ token }`
  }

  // Загрузка информации о пользователе с сервера
  getUserInfo() {
    return fetch(`${this._url}/users/me`, { headers: this._headers })
      .then(this._handleResponce)
  }

  // Загрузка карточек с сервера
  getAllCards() {
    return fetch(`${this._url}/cards`, { headers: this._headers })
      .then(this._handleResponce)
  }

  // Постановка/снятие лайка
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`,
        {
          method: 'PUT',
          headers: this._headers,
        })
        .then(this._handleResponce)
    } else {
      return fetch(`${this._url}/cards/${id}/likes`,
        {
          method: 'DELETE',
          headers: this._headers,
        })
        .then(this._handleResponce)
    }
  }

  // Удаление карточки
  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`,
      {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._handleResponce)
  }

  // Изменение полей пользователя
  setUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ name, about })
      })
      .then(this._handleResponce)
  }

  // Изменение аватара пользователя
  setUserAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({ avatar })
      })
      .then(this._handleResponce)
  }

  // Добавление новой карточки 
  createNewCard({ name, link }) {
    return fetch(`${this._url}/cards`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ name, link })
      })
      .then(this._handleResponce)
  }
}

const api = new Api({
  url: "http://api.mariagrom.mesto.nomoredomains.club",
  headers: {
    "content-type": "application/json",
    "Authorization": "",
  }
})

export default api;