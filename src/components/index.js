import '../pages/index.css'; // добавьте импорт главного файла стилей

import { createCard,deleteCard,cardLike } from './card.js';

import { openModal,closeModal} from './modal.js';

import { initialCards } from './cards.js';

import { enableValidation, clearValidation } from './validation.js';

import { config, isAnyError, requestCard, requestUserInformation, editingProfile, postNewCard, requestCardDelete, requestPutLike, requestDeleteLike, requestChangeAvatar} from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

const cardImg = document.querySelector('.popup__image');
const profileCaption = document.querySelector('.popup__caption');

const editButton = document.querySelector('.profile__edit-button');
const createButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const editCardPopup = document.querySelector('.popup_type_edit');
const deleteCardPopup = document.querySelector('.popup_type_delete_card');

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
    inputErrorClass: '.popup__input_type_error',
    errorClass: '.popup__error_visible'
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
function addCard(userInfo, element,likeCounter,onDelete) {
  const cardElement = createCard(userInfo,element,deleteCard,cardLike,showImg, likeCounter,onDelete,cardDelete);
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

// Создание попапа редактирования аватара профиля
editAvatarButton.addEventListener('click', function(evt){
  evt.preventDefault();
  avatarUrlInput.value = '';
  clearValidation(editAvatarForm, validationConfig);
  openModal(editAvatarPopup);
})


// Обработчик «отправки» формы
function createFormSubmit(evt) {
  evt.preventDefault(); 

// Получите значение полей jobInput и nameInput из свойства value
  const job = jobInput.value;
  const name = nameInput.value;
// Вставьте новые значения с помощью textContent
profileTitle.textContent = name;
profileDescription.textContent = job;
editingProfile(name, job);
closeModal(editCardPopup);
setTimeout(() => {editFormElement.querySelector('.popup__button').textContent = 'Сохранить';} , 500);
}

// Прикрепляем обработчик к форме:
editFormElement.addEventListener('submit', (evt) => {
  editFormElement.querySelector('.popup__button').textContent = 'Сохранение...';
  setTimeout(() => {createFormSubmit(evt)} , 1000);
}); 


// Добавление карточек 
function addElemToArr(evt) {
evt.preventDefault();
const cardArrElem = {};
cardArrElem.name = cardNameInput.value;
cardArrElem.link = cardUrlInput.value;
const likeCounter = 0;
const onDelete = false;
const card = createCard(undefined, cardArrElem,deleteCard,cardLike,showImg,likeCounter,onDelete ,cardDelete);
placesList.prepend(card);
closeModal(newCardPopup);
setTimeout(() => {editFormElement.querySelector('.popup__button').textContent = 'Сохранить';} , 500);
cardNameInput.value = '';
cardUrlInput.value = '';
}


// Событие сохранения и добавления каторчки на страницу
addCardForm.addEventListener('submit', function(evt) {
  postNewCard({
    name: cardNameInput.value,
    link: cardUrlInput.value
  });
  addCardForm.querySelector('.popup__button').textContent = 'Сохранение...';
  setTimeout(() => {addElemToArr(evt);} , 1000);
});


// Изменение аватара профиля
function changeAvatar(evt) {
  evt.preventDefault();
  requestChangeAvatar(avatarUrlInput.value);
  editAvatarButton.setAttribute('style',`background-image: url(${avatarUrlInput.value})`);
  closeModal(editAvatarPopup);
  setTimeout(() => {editFormElement.querySelector('.popup__button').textContent = 'Сохранить';} , 500);
}

editAvatarForm.addEventListener('submit', function(evt) {
  editAvatarForm.querySelector('.popup__button').textContent = 'Сохранение...';
  setTimeout(() => {changeAvatar(evt);} , 1000);
})

// Открытие попапа с картинкой
function showImg(item) {
cardImg.src = item.link;
cardImg.alt = item.name;
profileCaption.textContent = item.name;
openModal(popupImg);
}


// Удаление карточек
function cardDelete(e,cardId) {
  openModal(deleteCardPopup);
  const deleteForm = document.querySelector('[name="delete_card"]')
  deleteForm.addEventListener('submit', () => {
    requestCardDelete(cardId._id);
    deleteCard(e);
    closeModal(deleteCardPopup);
  }) 
}


// Валидация форм
enableValidation(validationConfig);     
  

// Работа с Api
Promise.all([requestUserInformation(),requestCard()])
.then(([userInfo,card]) => {
  card.forEach((element) => {
    const likeCounter = element.likes.length;
    let onDelete = false;
    if( userInfo._id != element.owner._id) {
      addCard(userInfo,element, likeCounter,onDelete = true);
    } else { addCard(userInfo,element, likeCounter, onDelete); }
  })
  editAvatarButton.setAttribute('style',`background-image: url(${userInfo.avatar})`);
  editProfileInfo(userInfo);
});
