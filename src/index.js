import "./reset.css"
import "./style.css"
import { Game} from "./game.js"
import {initPage,renderMenu} from "./dom.js"






function initGame(){
	let game = new Game
	initPage(game)
}

initGame()
