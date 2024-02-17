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
  .then(res => isAnyError(res))
  .then((data) => {return data})
  } 

// Получение карточек с сервера 
export const requestCard = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => isAnyError(res))
  .then((data) => {return data})
}

// Запрос PATH на редактирование профиля на сервере
export const editingProfile = (userName,userAbout) => {
  fetch('https://nomoreparties.co/v1/wff-cohort-6/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '625fde94-9798-42e8-aaa0-f08e4c6074eb',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: userName,
      about: userAbout
    })
  }) 
  .then(res => isAnyError(res))
  .then(res => {return res})
}


export const postNewCard = (card) => {
  fetch('https://nomoreparties.co/v1/wff-cohort-6/cards', {
    method: 'POST',
    headers: {
      authorization: '625fde94-9798-42e8-aaa0-f08e4c6074eb',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify ({
      name: card.name,
      link: card.link
    })
  })
  .then((res) => isAnyError(res))
}


export const requestCardDelete = (cardId) => {
  fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: '625fde94-9798-42e8-aaa0-f08e4c6074eb',
      'Content-Type': 'application/json'
    }
  })
  .then(res=> isAnyError(res))
}


export const requestPutLike = (evt, cardId,card,likeCounter,cardElement) => {
  fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: config.headers,
  })
  .then(res => isAnyError(res))
  .then( (res) => {
    likeCounter = res.likes.length
  })
  .then( () => {
    cardElement.querySelector('.like_counter').textContent = likeCounter;}
  )
  .then ( () => {
    evt.target.classList.toggle('card__like-button_is-active')}
  )
}


export const requestDeleteLike = (evt, cardId, card,likeCounter,cardElement) => {
  fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(res => isAnyError(res))
  .then( (res) => {
    likeCounter = res.likes.length}
  )
  .then( () => {
    cardElement.querySelector('.like_counter').textContent = likeCounter}
  )
  .then ( () => {
    evt.target.classList.toggle('card__like-button_is-active')}
  )
}


export const requestChangeAvatar = (avatarUrl) => {
  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  
  .then(res => isAnyError(res));
}