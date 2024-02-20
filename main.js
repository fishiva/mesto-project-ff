(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-6",headers:{authorization:"625fde94-9798-42e8-aaa0-f08e4c6074eb","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function n(e,t,n,r,o,c,a){var u=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),i=u.querySelector(".card__image"),l=u.querySelector(".card__like-button");i.src=t.link,i.alt=t.name,u.querySelector(".card__title").textContent=t.name,void 0!==e&&t.likes.some((function(t){return t._id===e}))&&l.classList.add("card__like-button_is-active"),function(e,t){e.querySelector(".like_counter").textContent=t.likes.length}(u,t);var s=u.querySelector(".card__delete-button");return s.disabled=c,s.addEventListener("click",(function(e){a(e,t,u)})),l.addEventListener("click",(function(e){r(e,t,u)})),i.addEventListener("click",(function(){o(t)})),u}function r(n,r,o){var c;n.target.classList.contains("card__like-button_is-active")?(c=r._id,fetch("".concat(e.baseUrl,"/cards/").concat(c,"/likes"),{method:"DELETE",headers:e.headers}).then(t)).then((function(e){r.likes.length=e.likes.length,o.querySelector(".like_counter").textContent=r.likes.length,n.target.classList.toggle("card__like-button_is-active")})):function(n,r,o,c){return fetch("".concat(e.baseUrl,"/cards/").concat(r,"/likes"),{method:"PUT",headers:e.headers}).then(t)}(0,r._id).then((function(e){r.likes.length=e.likes.length,o.querySelector(".like_counter").textContent=r.likes.length,n.target.classList.toggle("card__like-button_is-active")}))}function o(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",a),e.addEventListener("click",u)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a),e.removeEventListener("click",u)}function a(e){"Escape"===e.key&&c(document.querySelector(".popup_is-opened"))}function u(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&c(e.currentTarget)}var i=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},l=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))},s=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){i(e,n,t)})),l(n,r,t)};function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}document.querySelector("#card-template").content;var p=document.querySelector(".places__list"),_=document.querySelector(".popup__image"),f=document.querySelector(".popup__caption"),m=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__add-button"),v=document.querySelector(".popup_type_new-card"),h=document.querySelector(".popup_type_edit"),S=document.querySelector(".popup_type_delete_card"),b=document.querySelector('[name="delete_card"]'),q=document.querySelector(".profile__title"),g=document.querySelector(".profile__description"),k=document.querySelector('[name="edit-profile"]'),C=document.querySelector(".popup__input_type_name"),E=document.querySelector(".popup__input_type_description"),L=document.querySelector('[name="new-place"]'),x=document.querySelector(".popup__input_type_card-name"),A=document.querySelector(".popup__input_type_url"),w=document.querySelector(".popup__input_type_edit_ava_url"),D=document.querySelector('[name="edit_avatar"]'),T=document.querySelector(".profile__image"),U=document.querySelector(".popup_type_change_avatar"),j=document.querySelector(".popup_type_image"),O={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:".popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function B(e){_.src=e.link,_.alt=e.name,f.textContent=e.name,o(j)}m.addEventListener("click",(function(e){e.preventDefault(),C.value=q.textContent,E.value=g.textContent,s(k,O),o(h)})),y.addEventListener("click",(function(e){e.preventDefault(),L.reset(),s(L,O),o(v)})),T.addEventListener("click",(function(e){e.preventDefault(),w.value="",s(D,O),o(U)})),k.addEventListener("submit",(function(n){k.querySelector(".popup__button").textContent="Сохранение...",function(n){n.preventDefault();var r,o,a=E.value,u=C.value;q.textContent=u,g.textContent=a,(r=u,o=a,fetch("https://nomoreparties.co/v1/wff-cohort-6/users/me",{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r,about:o})}).then(t)).finally(k.querySelector(".popup__button").textContent="Сохранить"),c(h)}(n)})),L.addEventListener("submit",(function(o){var a;L.querySelector(".popup__button").textContent="Сохранение...",(a={name:x.value,link:A.value},fetch("https://nomoreparties.co/v1/wff-cohort-6/cards",{method:"POST",headers:e.headers,body:JSON.stringify({name:a.name,link:a.link})}).then(t)).then((function(e){!function(e,t){e.preventDefault();var o=n(void 0,t,0,r,B,!1,M);p.prepend(o),c(v)}(o,e)})).finally(k.querySelector(".popup__button").textContent="Сохранить")})),D.addEventListener("submit",(function(n){D.querySelector(".popup__button").textContent="Сохранение...",function(n){var r;n.preventDefault(),(r=w.value,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then(t)).finally(k.querySelector(".popup__button").textContent="Сохранить"),T.setAttribute("style","background-image: url(".concat(w.value,")")),c(U)}(n)}));var P={};function M(e,t,n){e.preventDefault(),o(S),P.card=t,P.cardElement=n}b.addEventListener("submit",(function(n){var r;(r=P.card._id,fetch("".concat(e.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:e.headers}).then(t)).then((function(){P.cardElement.remove()})),c(S)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);l(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?i(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),l(n,r,t)}))}))}(t,e)}))}(O),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,o,c=(o=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,o)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(t,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=c[0];c[1].forEach((function(e){!function(e,t,o){var c=n(e,t,0,r,B,o,M);p.append(c)}(a._id,e,a._id!=e.owner._id)})),T.setAttribute("style","background-image: url(".concat(a.avatar,")")),function(e){q.textContent=e.name,g.textContent=e.about}(a)}))})();