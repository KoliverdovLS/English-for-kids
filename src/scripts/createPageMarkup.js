import '../page/style.css';
import burgerIcon from '../images/Burger.png';
import {
  dance, swim, cry, fly, cat, bird, blouse, smile,
} from '../images/cards';

const arrMainCardsImg = [dance, swim, cry, fly, cat, bird, blouse, smile];
const arrMainCardsText = ['Main page', 'Actions (set A)', 'Actions (set B)', 'Animals (set A)', 'Animals (set B)', 'Clothes', 'Emotions', 'Adjective', 'Actions (set C)'];

// Функция принимает родительский элемент (контейнер для элементов меню)
// children - текстовый контент для каждого элемента
// Возвращает массив ДОМ элементов меню для дальнейшего взаимодействия
function addElementToListMenu(parent, ...children) {
  const arrListMenu = [];
  for (let i = 0; i < children.length; i++) {
    const element = document.createElement('li');
    element.textContent = children[i];
    element.classList.add('element-menu');
    parent.appendChild(element);
    arrListMenu.push(element);
  }
  return arrListMenu;
}

export function createHeader() {
  const title = document.createElement('h1');
  const head = document.createElement('header');
  const burgerBtn = document.createElement('img');
  title.textContent = 'English for Kids';
  burgerBtn.classList.add('burger-btn');
  burgerBtn.src = burgerIcon;
  title.classList.add('title-text');

  head.appendChild(burgerBtn);
  head.appendChild(title);
  document.body.appendChild(head);
}

export function createMenu() {
  const burgerBtn = document.querySelector('.burger-btn');
  const menu = document.createElement('nav');
  menu.classList.add('bg-menu');

  const listContainer = document.createElement('ul');
  listContainer.classList.add('list-container');
  // Ниже функция которая затолкает всех детей с нужными нам текстовыми контентами в список меню,
  // и вернет ДОМ элементы этого списка
  const arrListMenu = addElementToListMenu(listContainer, 'Main page', 'Actions (set A)', 'Actions (set B)', 'Animals (set A)', 'Animals (set B)', 'Clothes', 'Emotions', 'Adjective', 'Actions (set C)');

  menu.appendChild(listContainer);
  document.body.appendChild(menu);

  burgerBtn.addEventListener('click', () => {
    if (menu.style.left !== '0px') {
      menu.style.left = '0px';
      menu.style.fontSize = '1.5em';
      burgerBtn.style.transform = 'rotate(-90deg)';
    } else {
      menu.style.left = '-320px';
      menu.style.fontSize = '1px';
      burgerBtn.style.transform = 'rotate(0deg)';
    }
  });
  return arrListMenu;
}

export function createCardsContainer() {
  const underHead = document.createElement('div');
  const statusPage = document.createElement('p');
  const btnPlayTrain = document.createElement('button');
  const cardsContainer = document.createElement('cards-container');
  underHead.classList.add('under-head');
  statusPage.classList.add('status-page');
  statusPage.textContent = 'Main page';
  btnPlayTrain.classList.add('btn-play');
  cardsContainer.classList.add('cards-container');
  underHead.appendChild(statusPage);
  underHead.appendChild(btnPlayTrain);
  document.body.appendChild(underHead);
  document.body.appendChild(cardsContainer);
}

export function createMainCards() {
  const arrCardsMain = [];
  for (let i = 0; i < 8; i += 1) {
    const card = document.createElement('div');
    const imaga = document.createElement('img');
    const textInCards = document.createElement('p');
    imaga.src = arrMainCardsImg[i];
    imaga.classList.add('cards-main-img');
    textInCards.textContent = arrMainCardsText[i];
    card.classList.add('cards-main');
    card.appendChild(imaga);
    card.appendChild(textInCards);
    document.querySelector('.cards-container').appendChild(card);
    arrCardsMain.push(card);
  }
}
