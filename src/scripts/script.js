import '../page/style.css';
import {
  createHeader, createMainCards, createMenu, createCardsContainer,
} from './createPageMarkup';
import hideMainCards from './hideMainCards';
import createCards from './createCards';

createHeader();
const arrListMenu = createMenu();
const cardsContainer = createCardsContainer();
const arrCardsMain = createMainCards();
createCards(0, arrListMenu, true);

arrListMenu.forEach((element, index) => {
  element.addEventListener('click', () => {
    if (index === 0) {
      createCards(0, arrListMenu, true);
    } else {
      createCards(index - 1, arrListMenu);
    }
  });
});

arrCardsMain.forEach((element, index) => {
  element.addEventListener('click', () => {
    createCards(index, arrListMenu);
  });
});
