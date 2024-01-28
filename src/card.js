export function createCard(item, deleteCard, cardLike,showImg) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__image').alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;

  const cardDeletebutton = cardElement.querySelector('.card__delete-button');
  cardDeletebutton.addEventListener('click', (e) => {deleteCard(e)});

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', (e) => {cardLike(e)}); 

  const cardImg = cardElement.querySelector('.card__image');
  cardImg.addEventListener('click', () => {showImg(item)});

  return cardElement;
}

export function deleteCard(e) {
  e.target.closest('.places__item').remove()
}

export function cardLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
