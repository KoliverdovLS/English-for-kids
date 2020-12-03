export default function hideMainCards(hide) {
  const cards = document.querySelectorAll('.cards-main');
  cards.forEach((el) => {
    el.style.display = hide ? 'none' : 'flex';
  });
}
