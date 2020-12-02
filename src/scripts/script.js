import '../page/style.css';
import {createHeader, createMainCards} from "./createPageMarkup";
import {createMenu} from "./createPageMarkup";
import {createCardsContainer} from "./createPageMarkup";

createHeader();
const arrListMenu = createMenu();
createCardsContainer();
createMainCards();