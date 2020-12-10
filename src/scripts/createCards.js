import * as image from '../images/cards/_exportImage';
import * as audio from '../audio/_exportAudio';
import revers from '../images/revers.png';
import hideMainCards from './hideMainCards';
// eslint-disable-next-line import/no-cycle
import { playMode } from './playMode';
import constansApp from './app.constans';
import { addValueToStat } from './stat';
import { createFuckingState } from './createPageMarkup';

// Указывает имя данной категории карточек
function setNameСategory(i) {
  const category = document.querySelector('.status-page');
  category.textContent = constansApp.categoryArr[i];
}
// Выделяет нужный элемент меню
function highlightMenuItem(i, listMenu) {
  listMenu.forEach((item, index) => {
    item.style.color = index === i ? '#E64A19' : 'black';
  });
}
// Ниже функции переворота карточек, зачем то я её назвал revers а не flip))
function reversTo(card, btn, textCont, cardImg, ruText) {
  card.style.transform = 'rotateY(-180deg) rotateX(3deg)';
  btn.style.display = 'none';
  setTimeout(() => {
    textCont.textContent = ruText;
    textCont.style.transform = 'rotateY(180deg) rotateX(-3deg)';
  }, 270);
}
function unRevers(card, btn, textCont, cardImg, enText) {
  card.style.transform = 'rotateY(0deg) rotateX(0deg)';
  setTimeout(() => {
    if (!constansApp.isGame) {
      btn.style.display = 'block';
    }
    textCont.textContent = enText;
    textCont.style.transform = 'rotateY(0deg) rotateX(0deg)';
  }, 270);
}

// Удаляет карточки, если таковые имелись
export function clearPreviosCards() {
  const cards = document.querySelectorAll('.card-cont');
  if (cards.length) {
    cards.forEach((el) => {
      el.remove();
    });
  }
  if (constansApp.cardsArr.length) {
    constansApp.cardsArr = [];
  }
}

/*
  Ниже происходит боль, а имнно костыльные условия,
  всё потому, что изначлаьно не продумал что придется принимать функции,
  и в последствии пришлось подлатывать её всем чем можно, лишь бы работало.
 */

export function createCards(indexListMenuClick, listMenu, isMain, trainDifficultWordArr) {
  const arrCardsFunc = [];
  constansApp.isMain = isMain;
  // Условия выхода в меню
  if (isMain) {
    playMode(false);
    clearPreviosCards();
    hideMainCards(false);
    setNameСategory(0);
    highlightMenuItem(0, listMenu);
    return;
  }
  // Открытие статистики
  if (indexListMenuClick === 8) {
    setNameСategory(indexListMenuClick + 1);
    highlightMenuItem(indexListMenuClick + 1, listMenu);
    hideMainCards(true);
    clearPreviosCards();
    createFuckingState();
    return;
  }
  // Если мы не выходим в статистику или в меню, значит создаём карточки.
  hideMainCards(true);
  clearPreviosCards();
  // Если это не тренировка сложных слов, то выставляем категорию выбранных карточек
  if (!trainDifficultWordArr) {
    setNameСategory(indexListMenuClick + 1);
    highlightMenuItem(indexListMenuClick + 1, listMenu);
  } else {
    constansApp.statContainer.style.display = 'none';
  }
  // arrName - массив с названиями карточек, которые мы создаем.
  const arrName = trainDifficultWordArr || constansApp.wordEnArr[indexListMenuClick];
  for (let i = 0; i < arrName.length; i += 1) {
    function createAudio() {
      const audioCard = document.createElement('AUDIO');
      audioCard.src = audio[`A${arrName[i]}`];
      return audioCard;
    }
    const audioCard = createAudio();
    function createImage() {
      const imaga = document.createElement('img');
      imaga.src = image[arrName[i]];
      imaga.classList.add('cards-img');
      return imaga;
    }
    const imaga = createImage();
    function createBtnRevers() {
      const btnRevers = document.createElement('div');
      const btnReversImg = document.createElement('img');
      btnReversImg.src = revers;
      btnRevers.classList.add('btn-revers');
      btnReversImg.classList.add('btn-revers-img');
      btnRevers.appendChild(btnReversImg);
      return btnRevers;
    }
    const btnRevers = createBtnRevers();
    const cardCont = document.createElement('div');
    const card = document.createElement('div');
    const textInCards = document.createElement('p');
    textInCards.textContent = arrName[i];
    const textInRu = constansApp.objStat[arrName[i]].ru;
    cardCont.classList.add('card-cont');
    card.classList.add('cards');
    card.id = arrName[i];
    card.appendChild(imaga);
    card.appendChild(textInCards);
    card.appendChild(btnRevers);
    cardCont.appendChild(card);
    document.querySelector('.cards-container').appendChild(cardCont);

    const objCard = {
      cardEl: card,
      image: imaga,
      btn: btnRevers,
      audio: audioCard,
      text: textInCards,
      indexCard: i,
      funcList: null,
    };
    arrCardsFunc.push(objCard);
    btnRevers.addEventListener('click', () => {
      reversTo(card, btnRevers, textInCards, imaga, textInRu);
    });
    imaga.addEventListener('click', () => {
      if (!constansApp.isGame) {
        addValueToStat(objCard.text.textContent, 'trainClick');
        audioCard.play();
      }
    });

    setTimeout(() => {
      cardCont.addEventListener('mouseleave', () => {
        if (btnRevers.style.display === 'none') {
          setTimeout(() => {
            if (!constansApp.isGame) {
              unRevers(card, btnRevers, textInCards, imaga, arrName[i]);
            }
          }, 500);
        }
      });
    }, 50);
  }
  arrCardsFunc.forEach((el, index) => {
    constansApp.cardsArr[index] = el;
  });
  if (constansApp.btnPlayTrain.checked) {
    playMode(true);
  }
}
