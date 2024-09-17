import  Player from './player'
import  GameBoard  from './gameboard';
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

	cpuAttack(recv,attk){
		if (attk.cpu){
			console.log(attk.id,"is attacking")
			let atkCellCoords = recv.gameboard.getRandomUnattackedCell();
			if(atkCellCoords !== null){
				recv.gameboard.receiveAttack(atkCellCoords)
				let atkCell = recv.gameboard.getCell(atkCellCoords)
				if(atkCell.ship){
					let attacking = true
					let gb = recv.gameboard
					let atkCell_RowCol  = gb.translateCoords(atkCellCoords)
					let valid_offset = false
					let offset;
					let next_x,next_y
					while(!valid_offset){
						offset = gb.getRandomDirectionalOffset()
						let [off_x,off_y] = offset;
						next_x = atkCell_RowCol[0]+off_x
						next_y = atkCell_RowCol[1]+off_y
						if(gb.isValidCoords(next_x,next_y)){
							valid_offset=true
						}
					}
					let waiting = false
					let start = new Date().getTime()
					let delay = 700;
					while(attacking){
						if (!waiting){
							if(!gb.isValidCoords(next_x,next_y)){
								attacking=false
								break;
							}
							let coords = gb.translateRowColToCoord(next_x,next_y)
							let atk_id = `${recv.id}-${coords}`
							document.getElementById(atk_id).click()
							waiting = true
							if(!gb.getCell(coords).ship)
								attacking=false;
						} else {
							console.log(start,end,start - end)
							let end = new Date().getTime()
							if (start - end > delay){
								start = new Date().getTime()
								waiting=false
							}
						}
					}
				}
			}
			this.swapPlayer()
			this.gameLoop()
		}
	}

	gameLoop(){
		if(!this.player1.allSunk()  && !this.player2.allSunk()){
			if(this.player1.active == this.player2.active){
				renderMessage("Error: player1 and player 2 have the same state")
			}
			if (this.player1.active){
				renderMessage("Player 1's turn")
				this.cpuAttack(this.player2,this.player1)
			} else {
				renderMessage("Player 2's turn")
				this.cpuAttack(this.player1,this.player2)
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




