import '../pages/index.css'; // добавьте импорт главного файла стилей

import { createCard,deleteCard,cardLike } from './card.js';

import { openModal,closeModal} from './modal.js';

import { initialCards } from './cards.js';

import { enableValidation, clearForm } from './validation.js';

import { config, isAnyError, requestCards, requestUserInformation, editProfile, postNewCard, requestCardDelete, requestPutLike, requestDeleteLike, requestChangeAvatar} from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

const cardImg = document.querySelector('.popup__image');
const profileCaption = document.querySelector('.popup__caption');

const editButton = document.querySelector('.profile__edit-button');
const createButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const editCardPopup = document.querySelector('.popup_type_edit');
const deleteCardPopup = document.querySelector('.popup_type_delete_card');

const deleteForm = document.querySelector('[name="delete_card"]');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description'); 

// Находим форму в DOM
const editFormElement = document.querySelector('[name="edit-profile"]');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__input_type_description'); // Воспользуйтесь инструментом .querySelector()

// Данные для ввода в попап для добавления карточки
const addCardForm = document.querySelector('[name="new-place"]');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');


// Данные для ввода в попап для изменения аватара профиля
const avatarUrlInput = document.querySelector('.popup__input_type_edit_ava_url');

// Форма где происходит изменение аватарки профиля
const editAvatarForm = document.querySelector('[name="edit_avatar"]');

//Кнопка для создания попап для редактирования профиля и сам попап для редактирования профиля  
const editAvatarButton = document.querySelector('.profile__image');
const editAvatarPopup = document.querySelector('.popup_type_change_avatar');

// Кнопка СОХРАНИТЬ в попапе создания карточки
// saveButton = document.querySelector('.popup__button');

// Поиск попапа для открытия картинки карточки в DOM
const popupImg = document.querySelector('.popup_type_image');

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: '.popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

// @todo: Функция создания карточки
// initialCards.forEach((item) => {
// addCard(item);
// });

// Функция изменения имени и описания профиля
function editProfileInfo (userInfo) {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
}

// @todo: Вывести карточки на страницу
function addCard(userInfo, element, onDelete) {
  const cardElement = createCard(userInfo,element,deleteCard,cardLike,showImg, onDelete,cardDelete);
  placesList.append(cardElement);
}

// Создание попапа на кнопку редактирования профиля
editButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearForm(editFormElement, validationConfig);
  openModal(editCardPopup);
})

// Создание попапа на кнопку Плюсик
createButton.addEventListener('click', function(evt){
  evt.preventDefault();
  // cardNameInput.value= '';
  // cardUrlInput.value = '';
  addCardForm.reset();
  clearForm(addCardForm, validationConfig);
  openModal(newCardPopup);
})

// Создание попапа редактирования аватара профиля
editAvatarButton.addEventListener('click', function(evt){
  evt.preventDefault();
  avatarUrlInput.value = '';
  clearForm(editAvatarForm, validationConfig);
  openModal(editAvatarPopup);
})


// Обработчик «отправки» формы
function sendFormSubmit(evt) {
  evt.preventDefault(); 

// Получите значение полей jobInput и nameInput из свойства value
  const job = jobInput.value;
  const name = nameInput.value;
// Вставьте новые значения с помощью textContent
profileTitle.textContent = name;
profileDescription.textContent = job;
editProfile(name, job)
.finally (
  editFormElement.querySelector('.popup__button').textContent = 'Сохранить'
)
closeModal(editCardPopup);
}

// Прикрепляем обработчик к форме:
editFormElement.addEventListener('submit', (evt) => {
  editFormElement.querySelector('.popup__button').textContent = 'Сохранение...';
  sendFormSubmit(evt);
}); 


// Добавление карточек 
function addElemToArr(evt,res) {
evt.preventDefault();
const cardArrElem =  res;
// cardArrElem.name = cardNameInput.value;
// cardArrElem.link = cardUrlInput.value;
// const likeCounter = 0;
const onDelete = false;
userId = undefined;
const card = createCard(userId, cardArrElem,deleteCard,cardLike,showImg, onDelete ,cardDelete);
placesList.prepend(card);
closeModal(newCardPopup);
}


// Событие сохранения и добавления каторчки на страницу
addCardForm.addEventListener('submit', function(evt) {
  addCardForm.querySelector('.popup__button').textContent = 'Сохранение...'
  postNewCard({
    name: cardNameInput.value,
    link: cardUrlInput.value
  })
  .then((res) => { 
    addElemToArr(evt, res)
  })
  .finally(editFormElement.querySelector('.popup__button').textContent = 'Сохранить')
});


// Изменение аватара профиля
function changeAvatar(evt) {
  evt.preventDefault();
  requestChangeAvatar(avatarUrlInput.value)
  .finally(editFormElement.querySelector('.popup__button').textContent = 'Сохранить')
  editAvatarButton.setAttribute('style',`background-image: url(${avatarUrlInput.value})`);
  closeModal(editAvatarPopup);
}

editAvatarForm.addEventListener('submit', function(evt) {
  editAvatarForm.querySelector('.popup__button').textContent = 'Сохранение...';
  changeAvatar(evt);
})

// Открытие попапа с картинкой
function showImg(item) {
cardImg.src = item.link;
cardImg.alt = item.name;
profileCaption.textContent = item.name;
openModal(popupImg);
}

let cardToDelete = {};

// Удаление карточек
function cardDelete(e,item, cardElement) {
  e.preventDefault();
  openModal(deleteCardPopup);
  cardToDelete.card = item;
  cardToDelete.cardElement = cardElement;
}

deleteForm.addEventListener('submit', (e) => {
  requestCardDelete(cardToDelete.card._id)
  .then(() => {cardToDelete.cardElement.remove()});
  closeModal(deleteCardPopup);
})

// Валидация форм
enableValidation(validationConfig);     
  


let userId;

// Работа с Api
Promise.all([requestUserInformation(),requestCards()])
.then(([userInfo,card]) => {
  card.forEach((element) => {
    userId = userInfo._id;
    // const likeCounter = element.likes.length;
    addCard(userId,element, userInfo._id != element.owner._id);
  })
  editAvatarButton.setAttribute('style',`background-image: url(${userInfo.avatar})`);
  editProfileInfo(userInfo);
});
