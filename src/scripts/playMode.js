import constansApp from './app.constans';
import star from '../images/star.png';
import starWin from '../images/star-win.png';
import errorAudio from '../audio/error.mp3';
import correctAudio from '../audio/correct.mp3';
import createCards, { clearPreviosCards } from './createCards';

// Возвращает рандомный массив с неповторяющимися числами
function generateArrayRandomNumber(min, max) {
  let totalNumbers = max - min + 1;
  const arrayTotalNumbers = [];
  const arrayRandomNumbers = [];
  let tempRandomNumber;

  while (totalNumbers--) {
    arrayTotalNumbers.push(totalNumbers + min);
  }

  while (arrayTotalNumbers.length) {
    tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbers.length - 1));
    arrayRandomNumbers.push(arrayTotalNumbers[tempRandomNumber]);
    arrayTotalNumbers.splice(tempRandomNumber, 1);
  }
  return arrayRandomNumbers;
}
// Подчищает прослушиватели, если таковые имелись.
function resetListener() {
  constansApp.cardsArr.forEach((card) => {
    card.cardEl.removeEventListener('click', card.funcList);
  });
}

function winGame(noOk) {
  clearPreviosCards();
  if (noOk > 0) {
    constansApp.failImg.style.display = 'block';
    constansApp.failAudio.play();
  } else {
    constansApp.winImg.style.display = 'block';
    constansApp.winAudio.play();
  }
  setTimeout(() => {
    constansApp.winImg.style.display = 'none';
    constansApp.failImg.style.display = 'none';
    createCards(0, 0, true);
  }, 2000);
}

// Функция заполняет контейнер звездами, по массиву с булевыми значениями
// true в массиве - winStar, false - star
function addStar(arrStar) {
  const countStars = (arrStar.length > 19) ? 20 : arrStar.length;

  while (constansApp.startContainer.firstChild) {
    constansApp.startContainer.removeChild(constansApp.startContainer.firstChild);
  }

  for (let i = 0; i < countStars; i++) {
    const thisStar = document.createElement('img');
    thisStar.classList.add('star');
    thisStar.src = arrStar[i] ? starWin : star;
    constansApp.startContainer.appendChild(thisStar);
  }
}

function playCorrectErrorAudio(isCorrect) {
  const audioDOM = document.createElement('AUDIO');
  audioDOM.src = isCorrect ? correctAudio : errorAudio;
  audioDOM.play();
}

function unclicbleCard(card) {
  card.cardEl.style.opacity = '0.5';
  card.cardEl.removeEventListener('click', card.funcList);
}

export function playMode(isGame) {
  addStar([]); // Опустошаем контейнер со звездами, если они там были.
  constansApp.cardsArr.forEach((card) => {
    card.cardEl.style.opacity = '1';
  });
  constansApp.isGame = isGame;
  const trueGame = isGame && !constansApp.isMain;
  constansApp.cardsArr.forEach((el) => {
    el.image.style.width = trueGame ? '400px' : '300px';
    el.image.style.height = trueGame ? '250px' : '200px';
    el.btn.style.display = trueGame ? 'none' : 'block';
  });
  constansApp.btnRepeatWord.style.display = 'none';
  constansApp.btnStart.style.display = trueGame ? 'block' : 'none';
  constansApp.startContainer.style.display = trueGame ? 'block' : 'none';
}

export function startStopGame(isStart) {
  if (isStart) {
    constansApp.btnStart.style.display = 'none';
    constansApp.btnRepeatWord.style.display = 'block';
    const randomArr = generateArrayRandomNumber(0, constansApp.countCards);
    const starArr = [];
    constansApp.btnRepeatWord.removeEventListener('click', constansApp.funcRepeat);
    addStar(starArr); // Запускает фукцию передавая пустой массив, очищая контейнер со звездами
    let i = 0;
    let ok = 0;
    let notOk = 0;
    constansApp.btnRepeatWord.addEventListener('click', constansApp.funcRepeat = function () {
      constansApp.cardsArr[randomArr[i]].audio.play();
    });
    function initListener() {
      resetListener();
      constansApp.cardsArr[randomArr[i]].audio.play();
      // CardsArr массив с данными о карточках
      constansApp.cardsArr.forEach((card) => {
        // cardEl контейнер карточки
        card.cardEl.addEventListener('click', card.funcList = function fn() {
          if (!constansApp.isGame) return false;
          if (card.indexCard === randomArr[i]) {
            starArr.unshift(true);
            addStar(starArr);
            i += 1;
            ok += 1;
            playCorrectErrorAudio(true);
            setTimeout(() => constansApp.cardsArr[randomArr[i]].audio.play(), 800);
            console.log(`ok - ${ok} | notOk - ${notOk}`);
            unclicbleCard(card);
            if (i > 7) {
              winGame(notOk);
              resetListener();
              return true;
            }
          } else {
            playCorrectErrorAudio(false);
            starArr.unshift(false);
            addStar(starArr);
            notOk += 1;
            console.log(`ok - ${ok} | notOk - ${notOk}`);
          }
        });
      });
    }
    initListener(randomArr[0]);
  }
}
