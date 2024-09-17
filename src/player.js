import GameBoard from './gameboard.js';

export default class Player {
	constructor(name, isComputer, id,size = 10,game) {
		this.name = name
		this.isComputer = isComputer
		this.id=id
		this.cpu=false
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
	setCpu(cpu){
		this.cpu = cpu;
	}
	allSunk(){
		return (this.gameboard.numShips===0)
	}
	sinkAll(){
		this.gameboard.sinkAll()
	}
}
