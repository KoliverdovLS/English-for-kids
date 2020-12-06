import '../page/style.css';
import burgerIcon from '../images/Burger.png';
import schoolIcon from '../images/rs_school.png';
import gitIcon from '../images/git_hub.png';
import constansApp from './app.constans';
import winAudio from '../audio/success.mp3';
import failAudio from '../audio/failure.mp3';
import winImg from  '../images/success.jpg';
import failImg from '../images/failure.jpg';

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
  title.textContent = constansApp.nameApp;
  burgerBtn.classList.add('burger-btn');
  burgerBtn.src = burgerIcon;
  title.classList.add('title-text');

  head.appendChild(burgerBtn);
  head.appendChild(title);
  document.body.appendChild(head);
}

export function createFooter() {
  const footer = document.createElement('footer');
  const infoContainer = document.createElement('div');
  const schoolContainer = document.createElement('a');
  schoolContainer.href = 'https://rs.school/js/';
  const schoolImg = document.createElement('img');
  schoolImg.src = schoolIcon;
  const infoInFooter = document.createElement('div');
  infoInFooter.textContent = 'Created in 2020 by:';
  const gitContainer = document.createElement('a');
  gitContainer.href = 'https://github.com/KoliverdovLS';
  const gitImg = document.createElement('img');
  gitImg.src = gitIcon;
  const btnStartGame = document.createElement('button');
  btnStartGame.textContent = 'Start';
  constansApp.btnStart = btnStartGame;
  const btnRepeatWord = document.createElement('button');
  btnRepeatWord.textContent = 'Repeat';
  constansApp.btnRepeatWord = btnRepeatWord;
  const starContainer = document.createElement('div');
  constansApp.startContainer = starContainer;
  infoContainer.classList.add('info-container');
  btnStartGame.classList.add('btn-start-game');
  btnRepeatWord.classList.add('btn-start-game');
  schoolImg.classList.add('school-img');
  infoInFooter.classList.add('info-in-footer');
  gitImg.classList.add('git-img');
  starContainer.classList.add('star-container');
  schoolContainer.appendChild(schoolImg);
  gitContainer.appendChild(gitImg);
  infoContainer.appendChild(schoolContainer);
  infoContainer.appendChild(infoInFooter);
  infoContainer.appendChild(gitContainer);
  footer.appendChild(infoContainer);
  footer.appendChild(btnStartGame);
  footer.appendChild(btnRepeatWord);
  footer.appendChild(starContainer);
  document.body.appendChild(footer);
}

export function createMenu() {
  const burgerBtn = document.querySelector('.burger-btn');
  const menu = document.createElement('nav');
  menu.classList.add('bg-menu');
  menu.classList.add('bg-menu-hidden');
  menu.id = 'hidden';

  const listContainer = document.createElement('ul');
  listContainer.classList.add('list-container');
  // Ниже функция которая затолкает всех детей с нужными нам текстовыми контентами в список меню,
  // и вернет ДОМ элементы этого списка
  const arrListMenu = addElementToListMenu(listContainer, 'Main Page', 'Action (set A)', 'Action (set B)', 'Action (set C)', 'Adjective', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotion');

  menu.appendChild(listContainer);
  document.body.appendChild(menu);

  burgerBtn.addEventListener('click', () => {
    if (menu.id === 'hidden') {
      /*menu.style.left = '0px';
      menu.style.fontSize = '1.5em'*/;
      menu.id = 'visabylity';
      menu.classList.remove('bg-menu-hidden');
      burgerBtn.style.transform = 'rotate(-90deg)';
    } else {
      /*menu.style.left = '-320px';
      menu.style.fontSize = '1px';*/
      menu.id = 'hidden';
      menu.classList.add('bg-menu-hidden');
      burgerBtn.style.transform = 'rotate(0deg)';
    }
  });
  return arrListMenu;
}

// Кнопка игры/тренировки
export function createBtnPlay() {
  const toggleBtnCover = document.createElement('div');
  const btnR = document.createElement('div');
  const checkbox = document.createElement('input');
  const knobs = document.createElement('div');
  const layer = document.createElement('layer');
  toggleBtnCover.classList.add('toggle-button-cover');
  btnR.classList.add('button');
  btnR.id = 'button-1';
  checkbox.type = 'checkbox';
  checkbox.classList.add('checkbox');
  knobs.classList.add('knobs');
  layer.classList.add('layer');
  btnR.appendChild(checkbox);
  btnR.appendChild(knobs);
  btnR.appendChild(layer);
  toggleBtnCover.appendChild(btnR);
  document.querySelector('header').appendChild(toggleBtnCover);
  checkbox.addEventListener('click', function () {
    if (this.checked) {
      // console.log('play');
    } else {
      // console.log('train');
    }
  });
  constansApp.btnPlayTrain = checkbox;
}

export function createCardsContainer() {
  const underHead = document.createElement('div');
  const statusPage = document.createElement('p');
  const cardsContainer = document.createElement('cards-container');
  underHead.classList.add('under-head');
  statusPage.classList.add('status-page');
  statusPage.textContent = 'Main page';
  cardsContainer.classList.add('cards-container');
  underHead.appendChild(statusPage);
  document.body.appendChild(underHead);
  document.body.appendChild(cardsContainer);
  constansApp.cardsCont = cardsContainer;
  return cardsContainer;
}

export function createMainCards() {
  const arrCardsMain = [];
  for (let i = 0; i <= constansApp.countCards; i += 1) {
    const card = document.createElement('div');
    const imaga = document.createElement('img');
    const textInCards = document.createElement('p');
    imaga.src = constansApp.arrMainCardsImg[i];
    imaga.classList.add('cards-main-img');
    textInCards.textContent = constansApp.arrMainCardsText[i];
    card.classList.add('cards-main');
    card.id = `main${i}`;
    card.appendChild(imaga);
    card.appendChild(textInCards);
    document.querySelector('.cards-container').appendChild(card);
    arrCardsMain.push(card);
  }
  return arrCardsMain;
}

export function createWinLooseData() {
  constansApp.winAudio = document.createElement('AUDIO');
  constansApp.winAudio.src = winAudio;
  constansApp.failAudio = document.createElement('AUDIO');
  constansApp.failAudio.src = failAudio;

  constansApp.winImg = document.createElement('img');
  constansApp.winImg.src = winImg;
  constansApp.winImg.classList.add('win-fail-img');
  constansApp.failImg = document.createElement('img');
  constansApp.failImg.src = failImg;
  constansApp.failImg.classList.add('win-fail-img');
  constansApp.cardsCont.appendChild(constansApp.winImg);
  constansApp.cardsCont.appendChild(constansApp.failImg);
}
