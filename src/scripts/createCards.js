import * as image from '../images/cards/_exportImage';
import * as audio from '../audio/_exportAudio';
import revers from '../images/revers.png';
import hideMainCards from './hideMainCards';
import {playMode} from './playMode';
import constansApp from './app.constans';

// Удаляет карточки, если таковые имелись
export function clearPreviosCards() {
  const cards = document.querySelectorAll('.card-cont');
  if (cards.length) {
    cards.forEach((el) => {
      el.remove();
    });
  }
}
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
    // cardImg.style.transform = 'rotateY(180deg) rotateX(-3deg)';
    textCont.style.transform = 'rotateY(180deg) rotateX(-3deg)';
  }, 270);
}
function unRevers(card, btn, textCont, cardImg, enText) {
  card.style.transform = 'rotateY(0deg) rotateX(0deg)';
  setTimeout(() => {
    btn.style.display = 'block';
    textCont.textContent = enText;
    // cardImg.style.transform = 'rotateY(0deg) rotateX(0deg)';
    textCont.style.transform = 'rotateY(0deg) rotateX(0deg)';
  }, 270);
}

export default function createCards(j, listMenu, isMain, trainDifficultWordArr) {
  const arrCardsFunc = [];
  constansApp.isMain = isMain;
  if (isMain) {
    playMode(false);
    clearPreviosCards();
    hideMainCards(false);
    setNameСategory(0);
    highlightMenuItem(0, listMenu);
    return;
  }
  hideMainCards(true);
  clearPreviosCards();
  setNameСategory(j + 1);
  highlightMenuItem(j + 1, listMenu);
  const arrNameRu = constansApp.wordRuArr[j];
  const arrName = constansApp.wordEnArr[j];
  for (let i = 0; i <= constansApp.countCards; i += 1) {
    const audioCard = document.createElement('AUDIO');
    audioCard.src = audio[`A${arrName[i]}`];
    const cardCont = document.createElement('div');
    const card = document.createElement('div');
    const imaga = document.createElement('img');
    const btnRevers = document.createElement('div');
    const btnReversImg = document.createElement('img');
    const textInCards = document.createElement('p');
    btnReversImg.src = revers;
    imaga.src = image[arrName[i]];
    imaga.classList.add('cards-img');
    imaga.id = '12312';
    textInCards.textContent = arrName[i];
    const textInRu = arrNameRu[i];
    cardCont.classList.add('card-cont');
    card.classList.add('cards');
    card.id = arrName[i];
    btnRevers.classList.add('btn-revers');
    btnReversImg.classList.add('btn-revers-img');
    btnRevers.appendChild(btnReversImg);
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
