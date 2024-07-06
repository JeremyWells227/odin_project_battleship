const GameBoard = require('./gameboard.js')

class Player {
	constructor(name, isComputer, size = 10) {
		this.name = name
		this.isComputer = isComputer
		this.active = false
		this.gameboard = new GameBoard(size)
	}
}
