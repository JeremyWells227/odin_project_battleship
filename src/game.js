const Player = require('./player')
const Gameboard = require('./gameboard')
import {renderPage,renderMessageBox,renderMenu,renderMessage, clearMessage,renderPlayer,closeMessageBox,removeMessageBox} from "./dom.js"

const GAMESTATES = {
	INIT: "Init",
	PLAY: "Play",
	END: "End",
}


class Game {
	constructor(){
		this.state = GAMESTATES.INIT
	}

	startGame(){
		this.state= GAMESTATES.PLAY
		renderMessageBox()
		// Coin Toss
		if(Math.round(Math.random())){
			this.player1.active=true
		}else{
			this.player2.active=true
		}
		this.gameLoop()
	}

	configNewGame(size){
		this.player1 = new Player("Player 1", true,"player1",size,this)
		this.player1.gameboard.autoGenerateShips()
		this.player1.active=false
		this.player2 = new Player("Player 2",true,"player2",size,this)
		this.player2.gameboard.autoGenerateShips()
		this.player2.active=false
	}

	gameLoop(){
		if(!this.player1.allSunk()  && !this.player2.allSunk()){
			if(this.player1.active == this.player2.active){
				renderMessage("Error: player1 and player 2 have the same state")
			}
			if (this.player1.active){
				renderMessage("Player 1's turn")
			} else {
				renderMessage("Player 2's turn")
			}
		}
		else {
			if (this.player1.allSunk()){
				renderMessage("Player 2 Wins!")
				this.state = GAMESTATES.END
			} else {
				renderMessage("Player 1 Wins!")
				this.state = GAMESTATES.END
			}
			removeMessageBox()

		}
		renderPage(this)
	}

	swapPlayer(){
		this.player1.active = !this.player1.active
		this.player2.active = !this.player2.active
	}
}



//module.exports = Game
export {
	Game,
	GAMESTATES
}




