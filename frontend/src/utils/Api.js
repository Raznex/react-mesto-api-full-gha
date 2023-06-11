export class Api {
  constructor(options) {
    this._url = options.url;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then(this._handleResponse)
  }

  getInfoProfile() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._handleResponse);
  }

  createCard({name, link}) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._handleResponse);
  }

  editProfile({name, about}) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._handleResponse);
  }

  changeAvatar({avatar}) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._handleResponse);
  }

  setLike(id) {
    return fetch(
      `${this._url}/cards/${id}/likes`,
      {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    ).then(this._handleResponse);
  }

  deleteLike(id) {
    return fetch(
      `${this._url}/cards/${id}/likes`,
      {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    ).then(this._handleResponse);
  }
}

