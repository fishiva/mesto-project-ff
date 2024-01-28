import './pages/index.css'; // добавьте импорт главного файла стилей

import { createCard,deleteCard,cardLike } from './card.js';

import { openModal,closeModal,keyCloseEsc,handleFromOverlay } from './modal.js';

import { initialCards } from './cards.js';


const cardTemplate = document.querySelector('#card-template').content;

const placesList = document.querySelector('.places__list');

const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const createButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const editCardPopup = document.querySelector('.popup_type_edit');


// Находим форму в DOM
const formElement = document.querySelector('[name="edit-profile"]');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__input_type_description');   // Воспользуйтесь инструментом .querySelector()


// Данные для ввода в попап для добавления карточки
const addCardForm = document.querySelector('[name="new-place"]');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');

// Кнопка СОХРАНИТЬ в попапе создания карточки
// saveButton = document.querySelector('.popup__button');

// Поиск попапа для открытия картинки карточки в DOM
// popupImg = document.querySelector('.popup_type_image');


// @todo: Функция создания карточки
initialCards.forEach((item) => {
  addCard(item);
  return item;
});

// @todo: Вывести карточки на страницу
function addCard(item) {
  const cardElement = createCard(item,deleteCard,cardLike,showImg);
  placesList.append(cardElement);
}


// Создание попапа на кнопку редактирования профиля
editButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  nameInput.value = document.querySelector('.profile__title').textContent
  jobInput.value = document.querySelector('.profile__description').textContent; 
  openModal(editCardPopup);
})

// Создание попапа на кнопку Плюсик
createButton.addEventListener('click', function(evt){
  evt.preventDefault();
  openModal(newCardPopup);
})

// Закрытие попапа черезе Esc
document.addEventListener('keydown', keyCloseEsc);

// Закрытие попапа черезе Overlay
document.addEventListener('click', handleFromOverlay);

// Закрытие попапа черезе Esc
document.addEventListener('keydown', keyCloseEsc);

// Закрытие попапа черезе Overlay
document.addEventListener('click', handleFromOverlay);


// ----------------------------

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let job = jobInput.value;
    let name = nameInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    // Вставьте новые значения с помощью textContent
    profileTitle.textContent = name;
    profileDescription.textContent = job;
    closeModal(editCardPopup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 


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
  document.querySelector('.popup__image').src = item.link;
  document.querySelector('.popup__image').alt = item.name;
  document.querySelector('.popup__caption').textContent = item.name;
  openModal(document.querySelector('.popup_type_image'));
}