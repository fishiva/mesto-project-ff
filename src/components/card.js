import {requestDeleteLike, requestPutLike } from "./api";

export function createCard(userInfo, item, deleteCard, cardLike,showImg, likeCounter, onDelete, cardDelete) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImg.src = item.link;
  cardImg.alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;

  // Проверка стоял ли лайк мой на странице
  if (userInfo !== undefined) {
    if (item.likes.length > 0) {
    item.likes.forEach(element => {
      if(element._id === userInfo._id) {
        likeButton.classList.add('card__like-button_is-active');
      }
    });
  }
}
  counterOfLikes(cardElement,likeCounter);

  const cardDeletebutton = cardElement.querySelector('.card__delete-button');
  cardDeletebutton.disabled = onDelete;
  cardDeletebutton.addEventListener('click', (e) => {cardDelete(e, item)});

  likeButton.addEventListener('click', (e) => {cardLike(e, item, likeCounter, cardElement)}); 

  cardImg.addEventListener('click', () => {showImg(item)});

  return cardElement;
}

export function deleteCard(e) {
  e.target.closest('.places__item').remove()
}

export function cardLike(evt, card,likeCounter,cardElement) {
  if(evt.target.classList.contains('card__like-button_is-active')) {
    requestDeleteLike(evt, card._id,card,likeCounter,cardElement);
  } else {
    requestPutLike(evt, card._id, card, likeCounter,cardElement);
  }
  // evt.target.classList.toggle('card__like-button_is-active');
}

export function counterOfLikes(cardElement,likeCounter) {
  cardElement.querySelector('.like_counter').textContent = likeCounter;
}

