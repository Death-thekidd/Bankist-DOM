///////////////////////////////////////
//* Modal window

const modal: HTMLElement = document.querySelector('.modal')!;
const overlay: HTMLElement = document.querySelector('.overlay')!;
const btnCloseModal: HTMLElement = document.querySelector('.btn--close-modal')!;
const btnsOpenModal: NodeListOf<HTMLElement> =
  document.querySelectorAll('.btn--show-modal')!;
const tabs: NodeListOf<HTMLElement> =
  document.querySelectorAll('.operations__tab')!;
const tabContainer: HTMLElement = document.querySelector(
  '.operations__tab-container'
)!;
const tabsContent: NodeListOf<HTMLElement> = document.querySelectorAll(
  '.operations__content'
)!;
const nav: HTMLElement = document.querySelector('nav')!;

const openModal = function (e: MouseEvent) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn: HTMLElement) =>
  btn.addEventListener('click', openModal)
);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e: KeyboardEvent) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo: HTMLButtonElement =
  document.querySelector('.btn--scroll-to')!;
const section1: HTMLElement = document.querySelector('#section--1')!;

//* Button Scrolling

btnScrollTo.addEventListener('click', (e: MouseEvent) => {
  const s1coords: DOMRect = section1.getBoundingClientRect();
  console.log(s1coords);

  const node = e.target as HTMLElement;
  console.log(node.getBoundingClientRect());
  console.log('Current scroll (X/Y)', scrollX, scrollY);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

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

(document.querySelector('.nav__links') as HTMLElement)?.addEventListener(
  'click',
  function (this: HTMLElement, e: MouseEvent) {
    console.log(e.target);
    const node = e.target as HTMLElement;
    e.preventDefault();

    //* Matching strategy
    if (node.classList.contains('nav__link')) {
      const id: keyof HTMLElementTagNameMap = node.getAttribute(
        'href'
      ) as keyof HTMLElementTagNameMap;
      console.log(id);
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  }
);

//* Tabbed component

tabContainer.addEventListener('click', function (e: MouseEvent) {
  const clicked: HTMLElement = (e.target as HTMLElement).closest(
    '.operations__tab'
  )!;

  //* Guard clause
  if (!clicked) return;

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

//* Menu fade animation
const handleHover = function (this: string, e: MouseEvent) {
  if ((e.target as HTMLElement).classList.contains('nav__link')) {
    const link = e.target as HTMLElement;
    const siblings: NodeListOf<HTMLElement> = link
      .closest('.nav')
      ?.querySelectorAll('.nav__link')!;
    const logo = link.closest('.nav')?.querySelector('img')!;

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind('0.5'));

nav.addEventListener('mouseout', handleHover.bind('1'));

/*
//* Sticky navigation
const initialCoards = section1.getBoundingClientRect();

window.addEventListener('scroll', function (e) {
  console.log(window.scrollY);

  if (window.scrollY > initialCoards.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/

//* Sticky navigation: Intersection Observer

/*
const obsCallback = function (entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
  entries.forEach(entry => {
    console.log(entry);
  });
  console.log(entries);
};

const obsOptions = {
  root: null,
  threshold: [0.1, 0.2],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/

const header = document.querySelector('.header')!;
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries: IntersectionObserverEntry[]) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//* Reveal sections
const allSections: NodeListOf<HTMLElement> =
  document.querySelectorAll('.section')!;

const revealSetion = function (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSetion, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section: HTMLElement) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//* Lazy loading images
const imgTargets: NodeListOf<HTMLImageElement> =
  document.querySelectorAll('img[data-src]');

const loadImg = function (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //* Replace src with data-src
  const node = entry.target as HTMLImageElement;
  node.src = node.dataset.src as string;

  node.addEventListener('load', function (e) {
    node.classList.remove('lazy-img');
  });

  observer.unobserve(node);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: `-200px`,
});

imgTargets.forEach((img: HTMLImageElement) => imgObserver.observe(img));

//* Slider
const slider = function () {
  const slides: NodeListOf<HTMLElement> = document.querySelectorAll('.slide')!;

  const btnLeft: HTMLButtonElement =
    document.querySelector('.slider__btn--left')!;
  const btnLRight: HTMLButtonElement = document.querySelector(
    '.slider__btn--right'
  )!;
  const dotContainer: HTMLElement = document.querySelector('.dots')!;

  let currSlide = 0;
  const maxSlide = slides.length - 1;

  //* Functions
  const createDots = function () {
    slides.forEach((_: any, i: number) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide: number) {
    (
      document.querySelectorAll('.dots__dot') as NodeListOf<HTMLElement>
    ).forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      ?.classList.add('dots__dot--active');
  };

  const goToSlide = function (slide: number) {
    slides.forEach((s: HTMLElement, i: number) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  //* Next Slide
  const nextSlide = function () {
    if (currSlide == maxSlide) currSlide = 0;
    else currSlide++;

    goToSlide(currSlide);
    activateDot(currSlide);
  };

  const prevSlide = function () {
    if (currSlide == 0) currSlide = maxSlide;
    else currSlide--;

    goToSlide(currSlide);
    activateDot(currSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(currSlide);
  };
  init();

  //* Event isteners
  btnLRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e: KeyboardEvent) {
    console.log(e);
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    const node = e.target as HTMLElement;
    if (node.classList.contains('dots__dot')) {
      const slide: number = Number(node.dataset.slide);
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

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
