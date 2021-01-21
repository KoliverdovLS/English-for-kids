import '../page/style.css';
import {
  createHeader, createMainCards, createMenu,
  createCardsContainer, createFooter, createBtnPlay,
  createWinLooseData, createStateThead, createStateTbody,
  getPercents,
} from './createPageMarkup';

import { createCards } from './createCards';
import { playMode, startStopGame } from './playMode';
import constansApp from './app.constans';
import { createObjStat } from './stat';

createHeader();
createBtnPlay();
createCardsContainer();
const arrCardsMain = createMainCards();
const arrListMenu = createMenu();
createFooter();
createWinLooseData();
createCards(0, arrListMenu, true);
createObjStat();
createStateThead(true);

// Обработка нажатия на элемент меню
arrListMenu.forEach((element, index) => {
  element.addEventListener('click', () => {
    if (index === 9) {
      playMode(false);
      constansApp.statContainer.style.display = 'block';
    } else {
      constansApp.statContainer.style.display = 'none';
    }
    if (index === 0) {
      createCards(0, arrListMenu, true);
    } else {
      createCards(index - 1, arrListMenu, false);
    }
    constansApp.menu.id = 'hidden';
    constansApp.menu.classList.add('bg-menu-hidden');
    constansApp.burgerBtn.style.transform = 'rotate(0deg)';
  });
});

// Обработка нажатия на кнопку режима приложения
constansApp.btnPlayTrain.addEventListener('click', () => {
  constansApp.btnPlayTrain.checked ? playMode(true) : playMode(false);
});

// Обработка клика по карточке с категорией
arrCardsMain.forEach((element, index) => {
  element.addEventListener('click', () => {
    createCards(index, arrListMenu);
  });
});
// Старт игры
constansApp.btnStart.addEventListener('click', () => {
  if (!constansApp.isMain) {
    startStopGame(true);
  }
});
// Ресет статистики
constansApp.btnResetStat.addEventListener('click', () => {
  createObjStat(true);
  createStateTbody();
});

// Функция обработки нажатия кнопки тренировки сложных слов.
constansApp.btnDiffWords.addEventListener('click', () => {
  const words = constansApp.wordEnArr.flat();
  const errorWords = words.filter((word) => constansApp.objStat[word].wrong > 0);
  if (errorWords.length === 0) {
    alert('Нету сложных слов)');
  } else {
    errorWords.sort((wordA, wordB) => {
      const objWordA = constansApp.objStat[wordA];
      const objWordB = constansApp.objStat[wordB];
      const wrongPercA = getPercents(objWordA.correct, objWordA.wrong);
      const wrongPercB = getPercents(objWordB.correct, objWordB.wrong);
      if (wrongPercA < wrongPercB) {
        return 1;
      }
      if (wrongPercA > wrongPercB) {
        return -1;
      }
      return 0;
    });
    let arrDiff = errorWords.length <= 8 ? errorWords : errorWords.slice(0, 8);
    arrDiff = [...new Set(arrDiff)];
    createCards(10, arrListMenu, false, arrDiff);
  }
});

// Код ниже взят тут: https://inter-net.pro/javascript/sort-table
// Сортировка таблицы со статистикой
// Хотел было написать сам, но не успевал, искал помощь в гугле и наткнулся на готовое решение,
// не удержался и взял себе))))
/* eslint-disable */
document.addEventListener('DOMContentLoaded', () => {
  const getSort = ({ target }) => {
    const order = (target.dataset.order = -(target.dataset.order || -1));
    const index = [...target.parentNode.cells].indexOf(target);
    const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
    const comparator = (index, order) => (a, b) => order * collator.compare(
      a.children[index].innerHTML,
      b.children[index].innerHTML,
    );

    for (const tBody of target.closest('table').tBodies) tBody.append(...[...tBody.rows].sort(comparator(index, order)));

    for (const cell of target.parentNode.cells) cell.classList.toggle('sorted', cell === target);
  };

  document.querySelectorAll('.table_sort thead').forEach((tableTH) => tableTH.addEventListener('click', () => getSort(event)));
});
/* eslint-enable */
