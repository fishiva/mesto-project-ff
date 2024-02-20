import {requestDeleteLike, requestPutLike } from "./api";

export function createCard(userInfo, item, deleteCard, cardLike,showImg, onDelete, cardDelete) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImg.src = item.link;
  cardImg.alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;

  // Проверка стоял ли лайк мой на странице
  if (userInfo !== undefined) {
    if (item.likes.some(elemenet => elemenet._id === userInfo)){
      likeButton.classList.add('card__like-button_is-active');
    }
  }
  counterOfLikes(cardElement, item);

  const cardDeletebutton = cardElement.querySelector('.card__delete-button');
  cardDeletebutton.disabled = onDelete;
  cardDeletebutton.addEventListener('click', (e) => {cardDelete(e, item, cardElement)});

  likeButton.addEventListener('click', (e) => {cardLike(e, item, cardElement)}); 

  cardImg.addEventListener('click', () => {showImg(item)});

  return cardElement;
}

export function deleteCard(e) {
  e.target.closest('.places__item').remove();
}

// export const cardLike = (evt, card, cardElement) =>  {evt.target.classList.contains('card__like-button_is-active') ? 
// requestDeleteLike(evt, card._id,card,cardElement) : requestPutLike(evt, card._id, card, cardElement);
// }
// cardLike(evt, card, cardElement)
//   .then((res) => {
//     card.likes.length = res.likes.length;
//     cardElement.querySelector('.like_counter').textContent = card.likes.length;
//     evt.target.classList.toggle('card__like-button_is-active')
//   }) 

export function cardLike(evt, card, cardElement) {
  if(evt.target.classList.contains('card__like-button_is-active')) {
    requestDeleteLike(evt, card._id,card,cardElement)
      .then((res) => {
        card.likes.length = res.likes.length;
        cardElement.querySelector('.like_counter').textContent = card.likes.length;
        evt.target.classList.toggle('card__like-button_is-active')
    }
    );
  } else {
    requestPutLike(evt, card._id, card, cardElement)
      .then((res) => {
        card.likes.length = res.likes.length
        cardElement.querySelector('.like_counter').textContent = card.likes.length;
        evt.target.classList.toggle('card__like-button_is-active')
    });
  }
  // evt.target.classList.toggle('card__like-button_is-active');
}

export function counterOfLikes(cardElement,item) {
  cardElement.querySelector('.like_counter').textContent = item.likes.length;
}

