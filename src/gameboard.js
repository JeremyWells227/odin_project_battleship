const ATTACKED = "attacked";
const FILLED = "filled";
const EMPTY = "empty";

const Ship = require('./ship.js');
const ShipFactory = require('./shipFactory.js');

class GameBoard {
	constructor(size = 10) {
		this._generateGrid(size)
	}

	_generateGrid(size) {
		this.size = size
		this.numShips = 0
		this.grid = []
		for (let row = 0; row < size; row++) {
			this.grid[row] = []
			for (let col = 0; col < size; col++) {
				this.grid[row][col] = new Cell(row, col)
			}
		}
		for (let row = 0; row < size; row++) {
			for (let col = 0; col < size; col++) {
				this._assignNeighbors(row, col)
			}
		}
	}

	autoGenerateShips(){
		let shipfactory = new ShipFactory
		let ships = shipfactory.generateShips()
		let directions = ["N","S","E","W"]
		let numTries = 1000
		let count = 0
		console.log(ships)
		while (ships.length > 0){
			let try_row = Math.floor(Math.random()*this.size)
			let try_col = Math.floor(Math.random()*this.size)
			let try_coord = this.translateRowColToCoord(try_row,try_col)
			let try_dir = directions[Math.floor(Math.random() * directions.length)]
			console.log("Trying to place ship of size ", ships[0].length, `\n ${ships.length} left.`)
			if(this.placeShip(try_coord,try_dir,ships[0])){
				ships.shift()
			} 
			count+=1
			if (count > numTries){
				console.log("Failed to generate ships in reasonable timeframe")
				return false
			}
		}
		return true
	}

	toString(){
		let str = '';
		for (let row = 0; row < this.size; row++) {
			for (let col = 0; col < this.size; col++) {
				str= str +' '+ this.grid[row][col];
			}
				str= str + "\n\n"
		}
		return str
	}
	translateCoords(coord) {
		// Assume Coords come in Style of "A2".
		// Where letter is the column 
		// and the number is the row
		let col = coord.charCodeAt(0) - "A".charCodeAt(0)
		let row = parseInt(coord.substring(1)) - 1
		return [row, col]
	}

	translateRowColToCoord(row,col) {
		// Assume Coords come in Style of "A2".
		// Where letter is the column 
		// and the number is the row
		let coltxt = String.fromCharCode("A".charCodeAt(0)+col)
		let rowtxt = String(row+1)
		return `${coltxt}${rowtxt}`
	}

	isValidCoords(row, col) {
		return row >= 0 && row < this.size && col >= 0 && col < this.size
	}
	


	isValidShipPlacement(coord,size,direction){
		/* 
			Offset can be N S E W, compass directions.
			The offset is from the mouse click.
			Check whether endpoint is a valid placement or not
		*/
		let [row,col] = this.translateCoords(coord)
		switch (direction) {
			case "N": 
				return this.isValidCoords(row-size,col);
			case "S": 
				return this.isValidCoords(row+size,col);
			case "E": 
				return this.isValidCoords(row,col+size);
			case "W": 
				return this.isValidCoords(row,col-size);
			default:
				console.log("isValidShipPlacement: Invalid direction ",direction);
				return false;
		}
	}

	_getDirectionalOffset(direction){
		switch (direction) {
			case "N": 
				return [-1,0]
			case "S": 
				return [1,0]
			case "E": 
				return [0,1]
			case "W": 
				return [0,-1]
			default:
				console.log("_getDirectionalOffset: Invalid direction ",direction);
				return [0,0];
		}
	}

	placeShip(coord,direction,ship){
		let [row, col] = this.translateCoords(coord)
		if (!this.isValidCoords(row, col)) {
			console.log(`placeShip: Invalid coordinates ${row} ${col}`)
			return false
		}
		if(this.isValidShipPlacement(coord,ship.length,direction)){
			let baseCell = this.grid[row][col];
			let currCell = baseCell;
			let [rowOffset,colOffset] = this._getDirectionalOffset(direction);
			let cellsToPlaceShip = []
			
			for(let i=0; i < ship.length+1;i++){
				if(currCell.ship){
					console.log("Invalid Ship placement: Path already occupied")
					return false
				}
				cellsToPlaceShip.push(currCell)
				currCell = this.grid[row+rowOffset*i][col+colOffset*i] 
			}
			for (let cell of cellsToPlaceShip){
				cell.ship=ship
			}
			this.numShips+=1
			return true;
		} else {
			return false;
		}
	}

	toggleVisible(){
		for (let row = 0; row < this.size; row++) {
			for (let col = 0; col < this.size; col++) {
				this.grid[row][col].visible = !this.grid[row][col].visible 
			}
		}
	}


	receiveAttack(coord) {
		// Returns true if valid attack.
		// Returns false and user will have to select another point to attack
		let [row, col] = this.translateCoords(coord)
		if (!this.isValidCoords(row, col)) {
			console.log(`receiveAttack: Invalid coordinates ${row} ${col}`)
			return false
		}
		let cell = this.grid[row][col]
		if (cell.attacked){
				console.log(`receiveAttack:  ${row} ${col} have already been attacked`);
				return false;
		}
		cell.attack()
		if (cell.ship!== null && cell.ship.isSunk()){
			this.numShips -=1
		}
		return true
	}


	_assignNeighbors(row, col) {
		let cell = this.grid[row][col]
		let maxVal = this.size - 1
		let minval = 0
		let offsets = [[1, 0], [0, 1], [-1, 0], [0, -1]]
		for (let os of offsets) {
			let neighborRow = row + os[0];
			let neighborCol = col + os[1];
			if (this.isValidCoords(neighborRow, neighborCol)) {
				cell.neighbors.push(this.grid[neighborRow][neighborCol])
			}
		}
	}
}

class Cell {
	// Valid States:
	// empty
	// filled
	// attacked
	// Empty and filled states can be attacked.
	// Cell cannot be attacked twice.
	constructor(row, col) {
		this.row = row
		this.col = col
		this.state = 'empty'
		this.attacked = false
		this.neighbors = []
		this.ship = null
		this.visible=false
	}

	toString(){
		if (!this.visible){
			return "O"
		}
		if (this.attacked){
			if (this.ship){
				return "D"
			}else {
				return "X"
			}
		} else{
			if (this.ship){
				return "S"
			} else {
				return "O"
			}
		}
	}


	attack(){
		if (this.attacked)
			return false;
		if (this.ship !== null){
			this.ship.hit()
		}
		this.attacked = true
		return true
	}
}



module.exports = GameBoard
