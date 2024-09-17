const GameBoard = require('./gameboard.js')

module.exports = class Player {
	constructor(name, isComputer, id,size = 10,game) {
		this.name = name
		this.isComputer = isComputer
		this.id=id
		this.game=game
		this.active = false
		this.gameboard = new GameBoard(size,this)
	}
	toggleVisible(){
		this.gameboard.toggleVisible()
	}
	setVisible(isVisible){
		this.gameboard.setVisible(isVisible)
	}
	allSunk(){
		return (this.gameboard.numShips===0)
	}
	sinkAll(){
		this.gameboard.sinkAll()
	}
}
