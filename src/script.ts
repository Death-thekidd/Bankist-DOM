///////////////////////////////////////
// Modal window

const modal : HTMLElement = document.querySelector('.modal')!;
const overlay : HTMLElement = document.querySelector('.overlay')!;
const btnCloseModal : HTMLElement = document.querySelector('.btn--close-modal')!;
const btnsOpenModal : NodeListOf<HTMLElement> = document.querySelectorAll('.btn--show-modal')!;

const openModal = function (e : MouseEvent) {
	e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn : HTMLElement)=> btn.addEventListener('click', openModal))


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e : KeyboardEvent) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

