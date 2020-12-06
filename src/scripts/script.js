import '../page/style.css';
import {
  createHeader, createMainCards, createMenu, createCardsContainer, createFooter, createBtnPlay, createWinLooseData,
} from './createPageMarkup';
import hideMainCards from './hideMainCards';
import createCards from './createCards';
import {playMode, startStopGame} from './playMode';
import constansApp from "./app.constans";

createHeader();
createBtnPlay();
createCardsContainer();
const arrCardsMain = createMainCards();
const arrListMenu = createMenu();
createFooter();
createWinLooseData();
createCards(0, arrListMenu, true);

arrListMenu.forEach((element, index) => {
  element.addEventListener('click', () => {
    if (index === 0) {
      createCards(0, arrListMenu, true);
    } else {
      createCards(index - 1, arrListMenu, false);
    }
  });
});

constansApp.btnPlayTrain.addEventListener('click', () => {
  constansApp.btnPlayTrain.checked ? playMode(true) : playMode(false);
});

arrCardsMain.forEach((element, index) => {
  element.addEventListener('click', () => {
    createCards(index, arrListMenu);
  });
});

constansApp.btnStart.addEventListener('click', () => {
  if (!constansApp.isMain) {
    startStopGame(true);
  }
});
