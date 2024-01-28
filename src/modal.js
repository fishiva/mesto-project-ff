export function openModal(popup) {
  // popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-animated')
  setTimeout(() => {popup.classList.add('popup_is-opened')});
  // popup.classList.add('popup_is-opened');
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  // popup.classList.remove('popup_is-animated');
  setTimeout(() => {popup.classList.remove('popup_is-animated')},1000);
  // popup.classList.remove('popup_is-opened');
}

// Функция закрытия попапа черезе Esc
export function keyCloseEsc(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_is-opened');
    closeModal(activePopup);
  }
}

// Функция закрытия попапа черезе Overlay и крестик 
export function handleFromOverlay(evt) {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')){
    const activePopup = document.querySelector('.popup_is-opened');
    closeModal(activePopup);
  }
}