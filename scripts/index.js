// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы


// @todo: Функция создания карточки

initialCards.forEach(function(element) {
  addCard(element);
  return element;
});

function addCard(element, DeleteCards) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const placesList = document.querySelector('.places__list');
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__title').textContent = element.name;

  placesList.append(cardElement);

  const cardDeletebutton = cardElement.querySelector('.card__delete-button');
  cardDeletebutton.addEventListener('click', function () {cardElement.remove()});
}

// @todo: Функция удаления карточки


// Удаляется только первая карточка, если использовать такой способ 
// function DeleteCards(evt) {
//   let listItem = evt.target.closest('.places__item');
//   listItem.remove();
//   // listItem.remove();
  
// }

// cardDeletebutton.addEventListener('click', function(evt) {
//   DeleteCards(evt);
// });

// @todo: Вывести карточки на страницу
