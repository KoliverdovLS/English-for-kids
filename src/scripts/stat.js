import constansApp from './app.constans';
// Функция передаёт объект со статистикой в локальное хранилище
function statToLocalStorage() {
  localStorage.setItem('objStat', JSON.stringify(constansApp.objStat));
}
// Функция ниже создает объекст со статистикой, так же может обнулить его.
export function createObjStat(isReset) {
  if (isReset) localStorage.clear(); // Очищаем локальное хранилище если надо.
  if (localStorage.getItem('objStat')) {
    constansApp.objStat = JSON.parse(localStorage.getItem('objStat'));
  } else {
    // Код создание огромного объекта со всеми словами
    const objStat = {};
    constansApp.wordEnArr.forEach((wordsArr, indexCategory) => {
      wordsArr.forEach((wordEn, indexWord) => {
        objStat[wordEn] = {
          en: constansApp.wordEnArr[indexCategory][indexWord],
          ru: constansApp.wordRuArr[indexCategory][indexWord],
          category: constansApp.arrMainCardsText[indexCategory],
          trainClick: 0,
          correct: 0,
          wrong: 0,
        };
      });
    });
    constansApp.objStat = objStat;
  }
}

// Функция прибавляет к свойству выбраннного слова единицу.
// word - слово, type - свойство (клик в режиме тренировки, правильный клик...)
export function addValueToStat(word, type) {
  constansApp.objStat[word][type] += 1;
  statToLocalStorage();
}
