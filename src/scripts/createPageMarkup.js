import '../page/style.css';
import burgerIcon from '../images/Burger.png';
import schoolIcon from '../images/rs_school.png';
import gitIcon from '../images/git_hub.png';
import constansApp from './app.constans';
import winAudio from '../audio/success.mp3';
import failAudio from '../audio/failure.mp3';
import winImg from '../images/success.jpg';
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
  constansApp.arrListMenu = arrListMenu;
  return arrListMenu;
}

export function getPercents(corretcCl, wrongCl) {
  const correctClick = corretcCl;
  const wrongClick = wrongCl;
  const reverso = 100 / (wrongClick + correctClick);
  const a = parseInt(reverso * wrongClick, 10);
  const percents = a || 0;
  return percents;
}

function createAudioWinLose() {
  constansApp.winAudio = document.createElement('AUDIO');
  constansApp.winAudio.src = winAudio;
  constansApp.failAudio = document.createElement('AUDIO');
  constansApp.failAudio.src = failAudio;
}

function createWinLoseText() {
  constansApp.winText = document.createElement('p');
  constansApp.winText.classList.add('win-text');
}

function createWinLoseImg() {
  constansApp.winImg = document.createElement('img');
  constansApp.winImg.src = winImg;
  constansApp.winImg.classList.add('win-fail-img');
  constansApp.failImg = document.createElement('img');
  constansApp.failImg.src = failImg;
  constansApp.failImg.classList.add('win-fail-img');
}

function createButtonsInStat() {
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('btn-container');
  const btnResetStat = document.createElement('button');
  constansApp.btnResetStat = btnResetStat;
  btnResetStat.classList.add('btn-reset-stat');
  btnResetStat.textContent = 'Reset';
  const btnDiffWords = document.createElement('button');
  constansApp.btnDiffWords = btnDiffWords;
  btnDiffWords.classList.add('btn-diff-words');
  btnDiffWords.textContent = 'Train difficult words';
  buttonContainer.appendChild(btnResetStat);
  buttonContainer.appendChild(btnDiffWords);
  return buttonContainer;
}

function createInfoContainer() {
  const infoContainer = document.createElement('div');
  const schoolContainer = document.createElement('a');
  schoolContainer.href = constansApp.linkSchool;
  const schoolImg = document.createElement('img');
  schoolImg.src = schoolIcon;
  const infoInFooter = document.createElement('div');
  infoInFooter.textContent = 'Created in 2020 by:';
  const gitContainer = document.createElement('a');
  gitContainer.href = constansApp.linkGit;
  const gitImg = document.createElement('img');
  gitImg.src = gitIcon;
  infoContainer.classList.add('info-container');
  schoolImg.classList.add('school-img');
  infoInFooter.classList.add('info-in-footer');
  gitImg.classList.add('git-img');
  schoolContainer.appendChild(schoolImg);
  gitContainer.appendChild(gitImg);
  infoContainer.appendChild(schoolContainer);
  infoContainer.appendChild(infoInFooter);
  infoContainer.appendChild(gitContainer);
  return infoContainer;
}
function createBtnStartGame() {
  const btnStartGame = document.createElement('button');
  btnStartGame.textContent = 'Start';
  constansApp.btnStart = btnStartGame;
  btnStartGame.classList.add('btn-start-game');
  return btnStartGame;
}

function createBtnRepeatWord() {
  const btnRepeatWord = document.createElement('button');
  btnRepeatWord.textContent = 'Repeat';
  constansApp.btnRepeatWord = btnRepeatWord;
  btnRepeatWord.classList.add('btn-start-game');
  return btnRepeatWord;
}

function createStarContainer() {
  const starContainer = document.createElement('div');
  constansApp.startContainer = starContainer;
  starContainer.classList.add('star-container');
  return starContainer;
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
  const infoContainer = createInfoContainer();
  const btnStartGame = createBtnStartGame();
  const btnRepeatWord = createBtnRepeatWord();
  const starContainer = createStarContainer();
  footer.appendChild(infoContainer);
  footer.appendChild(btnStartGame);
  footer.appendChild(btnRepeatWord);
  footer.appendChild(starContainer);
  document.body.appendChild(footer);
}

export function createMenu() {
  const burgerBtn = document.querySelector('.burger-btn');
  constansApp.burgerBtn = burgerBtn;
  const menu = document.createElement('nav');
  constansApp.menu = menu;
  menu.classList.add('bg-menu');
  menu.classList.add('bg-menu-hidden');
  menu.id = 'hidden';

  const listContainer = document.createElement('ul');
  listContainer.classList.add('list-container');
  // Ниже функция которая затолкает всех детей с нужными нам текстовыми контентами в список меню,
  // и вернет ДОМ элементы этого списка
  const arrListMenu = addElementToListMenu(listContainer, 'Main Page', 'Action (set A)', 'Action (set B)', 'Action (set C)', 'Adjective', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotion', 'Stat');

  menu.appendChild(listContainer);
  document.body.appendChild(menu);

  burgerBtn.addEventListener('click', () => {
    if (menu.id === 'hidden') {
      menu.id = 'visabylity';
      menu.classList.remove('bg-menu-hidden');
      burgerBtn.style.transform = 'rotate(-90deg)';
    } else {
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
  createAudioWinLose();
  createWinLoseText();
  createWinLoseImg();
  constansApp.winCont = document.createElement('div');
  constansApp.winCont.classList.add('win-fail-container');
  constansApp.winCont.appendChild(constansApp.winText);
  constansApp.winCont.appendChild(constansApp.winImg);
  constansApp.winCont.appendChild(constansApp.failImg);
  constansApp.cardsCont.appendChild(constansApp.winCont);
}

// Создание таблицы со статистикой, а именно tbody.
// При обновлении таблицы, она просто пересоздаётся по новым данным
export function createFuckingState() {
  if (constansApp.tbody) {
    constansApp.table.removeChild(constansApp.tbody);
  }
  const countTd = 6;
  const tbody = document.createElement('tbody');
  constansApp.tbody = tbody;
  // Ниже начинается цикл создания всех слов (строки в таблице)
  constansApp.wordEnArr.flat().forEach((word) => {
    const tr = document.createElement('tr');
    // Ниже цикл создания столбцов в строчке.
    // i - индекс столбца
    for (let i = 0; i <= countTd; i += 1) {
      const td = document.createElement('td');
      const wrongClick = constansApp.objStat[word].wrong;
      const correctClick = constansApp.objStat[word].correct;
      const percent = getPercents(correctClick, wrongClick);
      switch (i) {
        case 0:
          td.textContent = constansApp.objStat[word].en;
          break;
        case 1:
          td.textContent = constansApp.objStat[word].ru;
          break;
        case 2:
          td.textContent = constansApp.objStat[word].category;
          break;
        case 3:
          td.textContent = constansApp.objStat[word].trainClick;
          break;
        case 4:
          td.textContent = correctClick;
          break;
        case 5:
          td.textContent = wrongClick;
          break;
        case 6:
          td.textContent = percent;
          break;
        default:
          td.textContent = 'default';
          break;
      }
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  });
  constansApp.table.appendChild(tbody);
}

// Создание thead таблицы
export function createState(isNew) {
  const arrNameTable = ['EN', 'RU', 'Category', 'Clicks', 'Correct', 'Wrong', '% errors'];
  const statContainer = document.createElement('div');
  statContainer.style.display = isNew ? 'none' : 'block';
  statContainer.classList.add('stat-container');
  constansApp.statContainer = statContainer;
  // Ниже функция создания кнопок в станице со статистикой
  constansApp.statContainer.appendChild(createButtonsInStat());
  const table = document.createElement('table');
  constansApp.table = table;
  table.classList.add('table_sort');
  const thead = document.createElement('thead');
  const headTr = document.createElement('tr');
  arrNameTable.forEach((el) => {
    const th = document.createElement('th');
    th.textContent = el;
    headTr.appendChild(th);
  });
  thead.appendChild(headTr);
  table.appendChild(thead);
  constansApp.statContainer.appendChild(table);
  constansApp.cardsCont.appendChild(statContainer);
}
