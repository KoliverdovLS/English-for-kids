import * as image from '../images/cards/_exportImage';
import * as audio from '../audio/_exportAudio';
import revers from '../images/revers.png';
import hideMainCards from './hideMainCards';

const categoryArr = ['Main Page', 'Action (set A)', 'Action (set B)', 'Action (set C)', 'Adjective', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotion'];

function createCategoriesArr() {
  const ActionA = ['cry', 'dance', 'dive', 'draw', 'fish', 'fly', 'hug', 'jump'];
  const ActionB = ['open', 'play', 'point', 'ride', 'run', 'sing', 'skip', 'swim'];
  const ActionC = ['argue', 'build', 'carry', 'catch', 'drive', 'drop', 'pull', 'push'];
  const Adjective = ['big', 'small', 'fast', 'slow', 'friendly', 'unfriendly', 'young', 'old'];
  const AnimalA = ['cat', 'chick', 'chicken', 'dog', 'horse', 'pig', 'rabbit', 'sheep'];
  const AnimalB = ['bird', 'fish', 'frog', 'giraffe', 'lion', 'mouse', 'turtle', 'dolphin'];
  const Clothes = ['skirt', 'pants', 'blouse', 'dress', 'boot', 'shirt', 'coat', 'shoe'];
  const Emotion = ['sad', 'angry', 'happy', 'tired', 'surprised', 'scared', 'smile', 'laugh'];
  const Categories = [ActionA, ActionB, ActionC, Adjective, AnimalA, AnimalB, Clothes, Emotion];
  return Categories;
}

function createCategoriesArrRu() {
  const ActionA = ['плакать', 'танцевать', 'нырять', 'рисовать', 'ловить рыбу', 'летать', 'обнимать', 'прыгать'];
  const ActionB = ['открыть', 'играть', 'точка', 'ездить', 'бегать', 'петь', 'скакать', 'плавать'];
  const ActionC = ['спорить', 'строить', 'нести', 'ловить', 'водить', 'бросать', 'тянуть', 'толкать'];
  const Adjective = ['большой', 'маленький', 'быстрый', 'медленный', 'дружелюбный', 'недружелюбный', 'молодой', 'старый'];
  const AnimalA = ['кошка', 'цыпленок', 'цыпленок', 'собака', 'лошадь', 'свинья', 'Кролик', 'Овца'];
  const AnimalB = ['птица', 'рыба', 'лягушка', 'жираф', 'Лев', 'мышь', 'черепаха', 'Дельфин'];
  const Clothes = ['юбка', 'брюки', 'блузка', 'платье', 'ботинок', 'рубашка', 'пальто', 'туфля'];
  const Emotion = ['грустный', 'злой', 'счастливый', 'усталый', 'удивленный', 'испуганный', 'улыбающийся', 'смеющийся'];
  const Categories = [ActionA, ActionB, ActionC, Adjective, AnimalA, AnimalB, Clothes, Emotion];
  return Categories;
}
// Удаляет карточки, если таковые имелись
function clearPreviosCards() {
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
  category.textContent = categoryArr[i];
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
    cardImg.style.transform = 'rotateY(180deg) rotateX(-3deg)';
    textCont.style.transform = 'rotateY(180deg) rotateX(-3deg)';
  }, 280);
}
function unRevers(card, btn, textCont, cardImg, enText) {
  card.style.transform = 'rotateY(0deg) rotateX(0deg)';
  setTimeout(() => {
    btn.style.display = 'block';
    textCont.textContent = enText;
    cardImg.style.transform = 'rotateY(0deg) rotateX(0deg)';
    textCont.style.transform = 'rotateY(0deg) rotateX(0deg)';
  }, 280);
}

export default function createCards(j, listMenu, isMain) {
  if (isMain) {
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
  const categories = createCategoriesArr();
  const categoriesRu = createCategoriesArrRu();
  const arrNameRu = categoriesRu[j];
  const arrName = categories[j];
  for (let i = 0; i < 8; i += 1) {
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
    textInCards.textContent = arrName[i];
    const textInRu = arrNameRu[i];
    cardCont.classList.add('card-cont');
    card.classList.add('cards');
    btnRevers.classList.add('btn-revers');
    btnReversImg.classList.add('btn-revers-img');
    card.id = `card${i}`;
    btnRevers.appendChild(btnReversImg);
    card.appendChild(imaga);
    card.appendChild(textInCards);
    card.appendChild(btnRevers);
    cardCont.appendChild(card);
    document.querySelector('.cards-container').appendChild(cardCont);
    btnRevers.addEventListener('click', () => {
      reversTo(card, btnRevers, textInCards, imaga, textInRu);
    });
    imaga.addEventListener('click', () => {
      audioCard.play();
    });

    setTimeout(() => {
      cardCont.addEventListener('mouseleave', (event) => {
        if (btnRevers.style.display === 'none') {
          setTimeout(() => {
            unRevers(card, btnRevers, textInCards, imaga, arrName[i]);
          }, 500);
        }
      });
    }, 50);
  }
}
