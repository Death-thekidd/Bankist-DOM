"use strict";
///////////////////////////////////////
//* Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};
const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};
btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//* Selecting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);
document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);
console.log(document.getElementsByClassName('btn'));
//* Creaing and inserting elements
//* .insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
////message.textContent = 'We use cookies for imprved functionalities and analytics';
message.innerHTML =
    'We use cookies for imprved functionalities and analytics <button class="btn btn--close-cookie">Got it</button>';
// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);
//* Delete elements
document.querySelector('.btn--close-cookie')?.addEventListener('click', () => {
    //   message.remove();
    message.parentElement?.removeChild(message);
});
//* Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(message.style.color);
console.log(message.style.backgroundColor);
console.log(getComputedStyle(message));
console.log(getComputedStyle(message).height);
message.style.height =
    Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';
document.documentElement.style.setProperty('--color-primary', 'orangered');
//* Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);
//* Non-standard
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute('src'));
const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href'));
//* Data attributes
console.log(logo.dataset.versionNumber);
//* Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');
//! Dont use
logo.className = 'jonas';
//# sourceMappingURL=script.js.map