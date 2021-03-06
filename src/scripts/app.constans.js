import {
  dance, swim, cry, cat, bird, blouse, smile, friendly,
} from '../images/cards/_exportImage';
// Тут хранятся все данные, которые используются в разных модулях по нескольку раз.
const constansApp = {
  nameApp: 'English for Kids',
  countCards: 7,
  linkSchool: 'https://rs.school/js/',
  linkGit: 'https://github.com/KoliverdovLS',
  cardsCont: null,
  menu: null,
  burgerBtn: null,
  arrMainCardsImg: [dance, swim, cry, friendly, cat, bird, blouse, smile],
  arrMainCardsText: ['Actions (set A)', 'Actions (set B)', 'Actions (set C)', 'Adjective', 'Animals (set A)', 'Animals (set B)', 'Clothes', 'Emotions'],
  categoryArr: ['Main Page', 'Action (set A)', 'Action (set B)', 'Action (set C)', 'Adjective', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotion'],
  wordEnArr: [['cry', 'dance', 'dive', 'draw', 'fish', 'fly', 'hug', 'jump'],
    ['open', 'play', 'point', 'ride', 'run', 'sing', 'skip', 'swim'],
    ['argue', 'build', 'carry', 'catch', 'drive', 'drop', 'pull', 'push'],
    ['big', 'small', 'fast', 'slow', 'friendly', 'unfriendly', 'young', 'old'],
    ['cat', 'chick', 'chicken', 'dog', 'horse', 'pig', 'rabbit', 'sheep'],
    ['bird', 'fish', 'frog', 'giraffe', 'lion', 'mouse', 'turtle', 'dolphin'],
    ['skirt', 'pants', 'blouse', 'dress', 'boot', 'shirt', 'coat', 'shoe'],
    ['sad', 'angry', 'happy', 'tired', 'surprised', 'scared', 'smile', 'laugh']],
  wordRuArr: [['плакать', 'танцевать', 'нырять', 'рисовать', 'ловить рыбу', 'летать', 'обнимать', 'прыгать'],
    ['открыть', 'играть', 'точка', 'ездить', 'бегать', 'петь', 'скакать', 'плавать'],
    ['спорить', 'строить', 'нести', 'ловить', 'водить', 'бросать', 'тянуть', 'толкать'],
    ['большой', 'маленький', 'быстрый', 'медленный', 'дружелюбный', 'недружелюбный', 'молодой', 'старый'],
    ['кошка', 'цыпленок', 'цыпленок', 'собака', 'лошадь', 'свинья', 'Кролик', 'Овца'],
    ['птица', 'рыба', 'лягушка', 'жираф', 'Лев', 'мышь', 'черепаха', 'Дельфин'],
    ['юбка', 'брюки', 'блузка', 'платье', 'ботинок', 'рубашка', 'пальто', 'туфля'],
    ['грустный', 'злой', 'счастливый', 'усталый', 'удивленный', 'испуганный', 'улыбающийся', 'смеющийся']],
  arrListMenu: null,
  cardsArr: [],
  isGame: false,
  isMain: false,
  btnPlayTrain: null,
  btnStart: null,
  btnRepeatWord: null,
  startContainer: null,
  funcRepeat: null,
  winCont: null,
  winText: null,
  winAudio: null,
  failAudio: null,
  winImg: null,
  failImg: null,
  objStat: null,
  statContainer: null,
  table: null,
  tbody: null,
  btnResetStat: null,
  btnDiffWords: null,
};

export default constansApp;
