(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-6",headers:{authorization:"625fde94-9798-42e8-aaa0-f08e4c6074eb","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=function(n){fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:{authorization:"625fde94-9798-42e8-aaa0-f08e4c6074eb","Content-Type":"application/json"}}).then((function(e){return t(e)}))},o=function(n,o,r,u,c){fetch("".concat(e.baseUrl,"/cards/").concat(o,"/likes"),{method:"PUT",headers:e.headers}).then((function(e){return t(e)})).then((function(e){u=e.likes.length})).then((function(){c.querySelector(".like_counter").textContent=u})).then((function(){n.target.classList.toggle("card__like-button_is-active")}))},r=function(n,o,r,u,c){fetch("".concat(e.baseUrl,"/cards/").concat(o,"/likes"),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)})).then((function(e){u=e.likes.length})).then((function(){c.querySelector(".like_counter").textContent=u})).then((function(){n.target.classList.toggle("card__like-button_is-active")}))};function u(e,t,n,o,r,u,c,i){var a=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),l=a.querySelector(".card__image"),s=a.querySelector(".card__like-button");l.src=t.link,l.alt=t.name,a.querySelector(".card__title").textContent=t.name,void 0!==e&&t.likes.length>0&&t.likes.forEach((function(t){t._id===e._id&&s.classList.add("card__like-button_is-active")})),function(e,t){e.querySelector(".like_counter").textContent=t}(a,u);var p=a.querySelector(".card__delete-button");return p.disabled=c,p.addEventListener("click",(function(e){i(e,t)})),s.addEventListener("click",(function(e){o(e,t,u,a)})),l.addEventListener("click",(function(){r(t)})),a}function c(e,t,n,u){e.target.classList.contains("card__like-button_is-active")?r(e,t._id,t,n,u):o(e,t._id,t,n,u)}function i(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",l),e.addEventListener("click",s)}function a(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",l),e.removeEventListener("click",s)}function l(e){"Escape"===e.key&&a(document.querySelector(".popup_is-opened"))}function s(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&a(e.currentTarget)}var p=function(e,t){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove("popup__input_type_error"),n.classList.remove("popup__error_visible"),n.textContent=""},d=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))},f=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(t){p(e,t)})),d(n,o,t)};function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}document.querySelector("#card-template").content;var m=document.querySelector(".places__list"),y=document.querySelector(".popup__image"),v=document.querySelector(".popup__caption"),h=document.querySelector(".profile__edit-button"),S=document.querySelector(".profile__add-button"),b=document.querySelector(".popup_type_new-card"),q=document.querySelector(".popup_type_edit"),g=document.querySelector(".popup_type_delete_card"),k=document.querySelector(".profile__title"),C=document.querySelector(".profile__description"),L=document.querySelector('[name="edit-profile"]'),E=document.querySelector(".popup__input_type_name"),x=document.querySelector(".popup__input_type_description"),T=document.querySelector('[name="new-place"]'),A=document.querySelector(".popup__input_type_card-name"),w=document.querySelector(".popup__input_type_url"),j=document.querySelector(".popup__input_type_edit_ava_url"),D=document.querySelector('[name="edit_avatar"]'),U=document.querySelector(".profile__image"),O=document.querySelector(".popup_type_change_avatar"),B=document.querySelector(".popup_type_image"),P={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:".popup__button_disabled",inputErrorClass:".popup__input_type_error",errorClass:".popup__error_visible"};function z(e,t,n,o){var r=u(e,t,0,c,M,n,o,N);m.append(r)}function M(e){y.src=e.link,y.alt=e.name,v.textContent=e.name,i(B)}function N(e,t){i(g),document.querySelector('[name="delete_card"]').addEventListener("submit",(function(){n(t._id),function(e){e.target.closest(".places__item").remove()}(e),a(g)}))}h.addEventListener("click",(function(e){e.preventDefault(),E.value=k.textContent,x.value=C.textContent,f(L,P),i(q)})),S.addEventListener("click",(function(e){e.preventDefault(),A.value="",w.value="",f(T,P),i(b)})),U.addEventListener("click",(function(e){e.preventDefault(),j.value="",f(D,P),i(O)})),L.addEventListener("submit",(function(e){L.querySelector(".popup__button").textContent="Сохранение...",setTimeout((function(){!function(e){e.preventDefault();var n,o,r=x.value,u=E.value;k.textContent=u,C.textContent=r,n=u,o=r,fetch("https://nomoreparties.co/v1/wff-cohort-6/users/me",{method:"PATCH",headers:{authorization:"625fde94-9798-42e8-aaa0-f08e4c6074eb","Content-Type":"application/json"},body:JSON.stringify({name:n,about:o})}).then((function(e){return t(e)})).then((function(e){return e})),a(q),setTimeout((function(){L.querySelector(".popup__button").textContent="Сохранить"}),500)}(e)}),1e3)})),T.addEventListener("submit",(function(e){var n;n={name:A.value,link:w.value},fetch("https://nomoreparties.co/v1/wff-cohort-6/cards",{method:"POST",headers:{authorization:"625fde94-9798-42e8-aaa0-f08e4c6074eb","Content-Type":"application/json"},body:JSON.stringify({name:n.name,link:n.link})}).then((function(e){return t(e)})),T.querySelector(".popup__button").textContent="Сохранение...",setTimeout((function(){!function(e){e.preventDefault();var t={};t.name=A.value,t.link=w.value;var n=u(void 0,t,0,c,M,0,!1,N);m.prepend(n),a(b),setTimeout((function(){L.querySelector(".popup__button").textContent="Сохранить"}),500),A.value="",w.value=""}(e)}),1e3)})),D.addEventListener("submit",(function(n){D.querySelector(".popup__button").textContent="Сохранение...",setTimeout((function(){!function(n){var o;n.preventDefault(),o=j.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:o})}).then((function(e){return t(e)})),U.setAttribute("style","background-image: url(".concat(j.value,")")),a(O),setTimeout((function(){L.querySelector(".popup__button").textContent="Сохранить"}),500)}(n)}),1e3)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);d(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?p(e,t):function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add("popup__input_type_error"),o.textContent=n,o.classList.add("popup__error_visible")}(e,t,t.validationMessage)}(e,r),d(n,o,t)}))}))}(t,e)}))}(P),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return t(e)})).then((function(e){return e})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e)})).then((function(e){return e}))]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,u,c,i=[],a=!0,l=!1;try{if(u=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(o=u.call(n)).done)&&(i.push(o.value),i.length!==t);a=!0);}catch(e){l=!0,r=e}finally{try{if(!a&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw r}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0];o[1].forEach((function(e){var t=e.likes.length,n=!1;r._id!=e.owner._id?z(r,e,t,n=!0):z(r,e,t,n)})),U.setAttribute("style","background-image: url(".concat(r.avatar,")")),function(e){k.textContent=e.name,C.textContent=e.about}(r)}))})();