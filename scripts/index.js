// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки

initialCards.forEach((item) => {
  addCard(item);
  return item;
});

function createCard(item, deleteCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__image').alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;
  const cardDeletebutton = cardElement.querySelector('.card__delete-button');
  cardDeletebutton.addEventListener('click', (e) => {deleteCard(e)});
  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(e) {
  e.target.closest('.places__item').remove()
}

// @todo: Вывести карточки на страницу

function addCard(item) {
  const cardElement = createCard(item,deleteCard);
  placesList.append(cardElement);
}
