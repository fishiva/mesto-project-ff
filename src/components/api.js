export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-6',
  headers: {
    authorization: '625fde94-9798-42e8-aaa0-f08e4c6074eb',
    'Content-Type': 'application/json'
  }
}

// Функция проверки запроса на корректность
export const isAnyError = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}


// Получение информации о пользователе с сервера
export const requestUserInformation = () => {
  return fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers
  })
  .then(isAnyError)
  } 

// Получение карточек с сервера 
export const requestCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(isAnyError)
}

// Запрос PATH на редактирование профиля на сервере
export const editProfile = (userName,userAbout) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-6/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userAbout
    })
  }) 
  .then(isAnyError)
}


export const postNewCard = (card) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-6/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify ({
      name: card.name,
      link: card.link
    })
  })
  .then(isAnyError)
}


export const requestCardDelete = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  })
  .then(isAnyError)
}


export const requestPutLike = (evt, cardId,card,cardElement) => {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: config.headers,
  })
  .then(isAnyError)
}


export const requestDeleteLike = (evt, cardId, card,cardElement) => {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(isAnyError)
}


export const requestChangeAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then(isAnyError);
}