

import '../pages/index.css'; // добавьте импорт главного файла стилей

import { createCard,deleteCard,cardLike } from './card.js';

import { openModal,closeModal} from './modal.js';

import { initialCards } from './cards.js';

import { enableValidation, clearValidation } from './validation.js';


const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');



const cardImg = document.querySelector('.popup__image');
const profileCaption = document.querySelector('.popup__caption');

const editButton = document.querySelector('.profile__edit-button');
const createButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const editCardPopup = document.querySelector('.popup_type_edit');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description'); 

// Находим форму в DOM
const editFormElement = document.querySelector('[name="edit-profile"]');// Воспользуйтесь методом querySelector()
console.log(editFormElement)
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__input_type_description'); // Воспользуйтесь инструментом .querySelector()

// Данные для ввода в попап для добавления карточки
const addCardForm = document.querySelector('[name="new-place"]');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');

// Кнопка СОХРАНИТЬ в попапе создания карточки
// saveButton = document.querySelector('.popup__button');

// Поиск попапа для открытия картинки карточки в DOM
const popupImg = document.querySelector('.popup_type_image');

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: '.popup__button_disabled',
    inputErrorClass: '.popup__input_type_error',
    errorClass: '.popup__error_visible'
}

// @todo: Функция создания карточки
initialCards.forEach((item) => {
addCard(item);
});

// @todo: Вывести карточки на страницу
function addCard(item) {
  const cardElement = createCard(item,deleteCard,cardLike,showImg);
  placesList.append(cardElement);
}

// Создание попапа на кнопку редактирования профиля
editButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editFormElement, validationConfig);
  openModal(editCardPopup);
})

// Создание попапа на кнопку Плюсик
createButton.addEventListener('click', function(evt){
  evt.preventDefault();
  cardNameInput.value = '';
  cardUrlInput.value = '';
  clearValidation(addCardForm, validationConfig);
  openModal(newCardPopup);
})

// ----------------------------

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function createFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
// Так мы можем определить свою логику отправки.
// О том, как это делать, расскажем позже.

// Получите значение полей jobInput и nameInput из свойства value
  const job = jobInput.value;
  const name = nameInput.value;
// Выберите элементы, куда должны быть вставлены значения полей

// Вставьте новые значения с помощью textContent
profileTitle.textContent = name;
profileDescription.textContent = job;
closeModal(editCardPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editFormElement.addEventListener('submit', createFormSubmit); 

// -------------------------------

// Добавление карточек 

function addElemToArr(evt) {
evt.preventDefault();
const cardArrElem = {};
cardArrElem.name = cardNameInput.value;
cardArrElem.link = cardUrlInput.value;
const card = createCard(cardArrElem,deleteCard,cardLike,showImg);
placesList.prepend(card);
closeModal(newCardPopup);
cardNameInput.value = '';
cardUrlInput.value = '';
}

// Событие сохранения и добавления каторчки на страницу
addCardForm.addEventListener('submit', addElemToArr);

// Открытие попапа с картинкой

function showImg(item) {
cardImg.src = item.link;
cardImg.alt = item.name;
profileCaption.textContent = item.name;
openModal(popupImg);
}


// console.log(validationConfig);

enableValidation(validationConfig); 
  
  
  