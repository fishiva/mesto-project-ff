(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-6",headers:{authorization:"625fde94-9798-42e8-aaa0-f08e4c6074eb","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},n=function(n){fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t())},r=function(n,r,o,c,u){fetch("".concat(e.baseUrl,"/cards/").concat(r,"/likes"),{method:"PUT",headers:e.headers}).then(t())},o=function(n,r,o,c,u){fetch("".concat(e.baseUrl,"/cards/").concat(r,"/likes"),{method:"DELETE",headers:e.headers}).then(t())};function c(e,t,n,r,o,c,u,a){var i=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),l=i.querySelector(".card__image"),s=i.querySelector(".card__like-button");l.src=t.link,l.alt=t.name,i.querySelector(".card__title").textContent=t.name,void 0!==e&&t.likes.length>0&&t.likes.forEach((function(t){t._id===e._id&&s.classList.add("card__like-button_is-active")})),function(e,t){e.querySelector(".like_counter").textContent=t}(i,c);var d=i.querySelector(".card__delete-button");return d.disabled=u,d.addEventListener("click",(function(e){a(e,t)})),s.addEventListener("click",(function(e){r(e,t,c,i)})),l.addEventListener("click",(function(){o(t)})),i}function u(e,t,n,c){e.target.classList.contains("card__like-button_is-active")?o(e,t._id,t,n,c).then((function(t){n=t.likes.length,c.querySelector(".like_counter").textContent=n,e.target.classList.toggle("card__like-button_is-active")})):r(e,t._id,t,n,c).then((function(t){n=t.likes.length,c.querySelector(".like_counter").textContent=n,e.target.classList.toggle("card__like-button_is-active")}))}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",l),e.addEventListener("click",s)}function i(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",l),e.removeEventListener("click",s)}function l(e){"Escape"===e.key&&i(document.querySelector(".popup_is-opened"))}function s(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&i(e.currentTarget)}var d=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},p=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))},_=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(t){d(e,t)})),p(n,r,t)};function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}document.querySelector("#card-template").content;var m=document.querySelector(".places__list"),v=document.querySelector(".popup__image"),y=document.querySelector(".popup__caption"),h=document.querySelector(".profile__edit-button"),S=document.querySelector(".profile__add-button"),b=document.querySelector(".popup_type_new-card"),q=document.querySelector(".popup_type_edit"),g=document.querySelector(".popup_type_delete_card"),k=document.querySelector(".profile__title"),C=document.querySelector(".profile__description"),E=document.querySelector('[name="edit-profile"]'),L=document.querySelector(".popup__input_type_name"),x=document.querySelector(".popup__input_type_description"),A=document.querySelector('[name="new-place"]'),T=document.querySelector(".popup__input_type_card-name"),w=document.querySelector(".popup__input_type_url"),D=document.querySelector(".popup__input_type_edit_ava_url"),U=document.querySelector('[name="edit_avatar"]'),j=document.querySelector(".profile__image"),O=document.querySelector(".popup_type_change_avatar"),B=document.querySelector(".popup_type_image"),P={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:".popup__button_disabled",inputErrorClass:".popup__input_type_error",errorClass:".popup__error_visible"};function M(e,t,n,r){var o=c(e,t,0,u,N,n,r,I);m.append(o)}function N(e){v.src=e.link,v.alt=e.name,y.textContent=e.name,a(B)}function I(e,t){a(g),document.querySelector('[name="delete_card"]').addEventListener("submit",(function(){n(t._id),function(e){e.target.closest(".places__item").remove()}(e),i(g)}))}h.addEventListener("click",(function(e){e.preventDefault(),L.value=k.textContent,x.value=C.textContent,_(E,P),a(q)})),S.addEventListener("click",(function(e){e.preventDefault(),T.value="",w.value="",_(A,P),a(b)})),j.addEventListener("click",(function(e){e.preventDefault(),D.value="",_(U,P),a(O)})),E.addEventListener("submit",(function(n){E.querySelector(".popup__button").textContent="Сохранение...",setTimeout((function(){!function(n){n.preventDefault();var r,o,c=x.value,u=L.value;k.textContent=u,C.textContent=c,r=u,o=c,fetch("https://nomoreparties.co/v1/wff-cohort-6/users/me",{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then(t()),i(q),setTimeout((function(){E.querySelector(".popup__button").textContent="Сохранить"}),500)}(n)}),1e3)})),A.addEventListener("submit",(function(n){var r;r={name:T.value,link:w.value},fetch("https://nomoreparties.co/v1/wff-cohort-6/cards",{method:"POST",headers:e.headers,body:JSON.stringify({name:r.name,link:r.link})}).then(t()),A.querySelector(".popup__button").textContent="Сохранение...",setTimeout((function(){!function(e){e.preventDefault();var t={};t.name=T.value,t.link=w.value;var n=c(void 0,t,0,u,N,0,!1,I);m.prepend(n),i(b),setTimeout((function(){E.querySelector(".popup__button").textContent="Сохранить"}),500),T.value="",w.value=""}(n)}),1e3)})),U.addEventListener("submit",(function(n){U.querySelector(".popup__button").textContent="Сохранение...",setTimeout((function(){!function(n){var r;n.preventDefault(),r=D.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then(t()),j.setAttribute("style","background-image: url(".concat(D.value,")")),i(O),setTimeout((function(){E.querySelector(".popup__button").textContent="Сохранить"}),500)}(n)}),1e3)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);p(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?d(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),p(n,r,t)}))}))}(t,e)}))}(P),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t()),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t())]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0];r[1].forEach((function(e){var t=e.likes.length,n=!1;o._id!=e.owner._id?M(o,e,t,n=!0):M(o,e,t,n)})),j.setAttribute("style","background-image: url(".concat(o.avatar,")")),function(e){k.textContent=e.name,C.textContent=e.about}(o)}))})();