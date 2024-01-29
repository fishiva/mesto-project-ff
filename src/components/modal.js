export function openModal(popup) {
  popup.classList.add('popup_is-opened');

  // Закрытие попапа черезе Esc
  document.addEventListener('keydown', keyCloseEsc);

  // Закрытие попапа черезе Overlay
  popup.addEventListener('click', handleFromOverlay);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');

  // Закрытие попапа черезе Esc
  document.removeEventListener('keydown', keyCloseEsc);

  // Закрытие попапа черезе Overlay
  popup.removeEventListener('click', handleFromOverlay);
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
    closeModal(evt.currentTarget);
  }
}