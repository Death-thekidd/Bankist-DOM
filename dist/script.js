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
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
//* Button Scrolling
btnScrollTo.addEventListener('click', (e) => {
    const s1coords = section1.getBoundingClientRect();
    console.log(s1coords);
    const node = e.target;
    console.log(node.getBoundingClientRect());
    console.log('Current scroll (X/Y)', scrollX, scrollY);
    console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);
    /*
    //* Scrolling
    window.scrollTo(s1coords.left + scrollX, s1coords.top + scrollY);
  
    window.scrollTo({
      left: s1coords.left + scrollX,
      top: s1coords.top + scrollY,
      behavior: 'smooth',
    });
    */
    section1.scrollIntoView({ behavior: 'smooth' });
});
/////////////////////////////////////////////////////////////////
//* Page navigation
// (
//   document.querySelectorAll('.nav__link') as NodeListOf<HTMLLinkElement>
// ).forEach((el: HTMLLinkElement) => {
//   el.addEventListener('click', function (this: HTMLLinkElement, e: MouseEvent) {
//     e.preventDefault();
//     const id: keyof HTMLElementTagNameMap = this.getAttribute(
//       'href'
//     ) as keyof HTMLElementTagNameMap;
//     console.log(id);
//     document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
//   });
// });
//* 1. Add event listener to common parent element
//* 2. Determine what element originated the event
document.querySelector('.nav__links')?.addEventListener('click', function (e) {
    console.log(e.target);
    const node = e.target;
    e.preventDefault();
    //* Matching strategy
    if (node.classList.contains('nav__link')) {
        const id = node.getAttribute('href');
        console.log(id);
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    }
});
//* Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
tabContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');
    //* Guard clause
    if (!clicked)
        return;
    //* Remove active classes
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));
    //* Activate tab
    clicked?.classList.add('operations__tab--active');
    //* Activate content area
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        ?.classList.add('operations__content--active');
});
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
/*
//* Selecting Elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header: HTMLElement = document.querySelector('.header')!;
const allSections: NodeListOf<HTMLElement> =
  document.querySelectorAll('.section')!;
console.log(allSections);

document.getElementById('section--1');
const allButtons: HTMLCollectionOf<HTMLButtonElement> =
  document.getElementsByTagName('button')!;
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

//* Creaing and inserting elements
//* .insertAdjacentHTML

const message: HTMLDivElement = document.createElement('div')!;
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
const logo: HTMLImageElement = document.querySelector('.nav__logo')!;
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

//* Non-standard
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.getAttribute('src'));
const link: HTMLLinkElement = document.querySelector('.twitter-link')!;
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


const h1: HTMLElement = document.querySelector('h1')!;

const alertH1 = (e: MouseEvent) => {
  alert('addEventListener: Great: You are reading the ending :D');
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// h1.onmouseenter = (e: MouseEvent) => {
//   alert('addEventListener: Great: You are reading the ending :D');
// };


// rgb(255, 255, 255)
const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) - min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document
  .querySelector('.nav__link')?.addEventListener('click', function (this: any, e: Event) {
    this.style.backgroundColor = randomColor();
    console.log('LINK', e.target, e.currentTarget);
    console.log(e.currentTarget === this);

    //* Stop propagation
    // e.stopPropagation();
  });

document
  .querySelector('.nav__links')?.addEventListener('click', function (this: any, e: Event) {
    this.style.backgroundColor = randomColor();
    console.log('CONTAINER', e.target, e.currentTarget);
  });

document
  .querySelector('.nav')?.addEventListener('click', function (this: any, e: Event) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  });


const h1: HTMLHeadingElement = document.querySelector('h1')!;

//* Going donwards child
console.log(h1?.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
(h1.firstElementChild as HTMLElement).style.color = 'white';
(h1.lastElementChild as HTMLElement).style.color = 'black';

//* Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

(h1.closest('.header') as HTMLElement).style.background =
  'var(--gradient-secondary)';

(h1.closest('h1') as HTMLElement).style.background = 'var(--gradient-primary)';

//* Going sideways: siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.parentElement?.children);
[...(h1.parentElement?.children as HTMLCollectionOf<HTMLElement>)].forEach(
  (el: HTMLElement) => {
    if (el !== h1) el.style.transform = 'scale(0.5)';
  }
);
*/
//# sourceMappingURL=script.js.map