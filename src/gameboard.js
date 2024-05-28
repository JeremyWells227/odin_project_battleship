class GameBoard{
	constructor(size=10){
		this._generateGrid(size)
	}

	_generateGrid(size){
		this.size = size
		this.grid = []
		for(let row = 0; row < size; row++){
			this.grid[row] = []
			for(let col = 0; col < size; col++){
				this.grid[row][col] = new Cell(row,col)
			}
		}
		for(let row = 0; row < size; row++){
			for(let col = 0; col < size; col++){
				this.assignNeighbors(row,col)
			}
		}
	}
	_translateCoords(coord){
		// Assume Coords come in Style of "A2".
		// Where letter is the column 
		// and the number is the row
		let col = "A".charCodeAt(0) - coord.charCodeAt(0)
		let row = parseInt(coord[1])
		return [row,col]
	}
	assignNeighbors(row,col){
		let cell = this.grid[row][col]
		let maxVal = this.size-1
		let minval = 0
		let offsets = [[1,0],[0,1],[-1,0],[0,-1]]
	}
}

class Cell{
	// Valid States:
	// empty
	// filled
	// attacked
	// Empty and filled states can be attacked.
	// Cell cannot be attacked twice.
	constructor(row,col){
		this.row=row
		this.col=col
		this.state = 'empty'
		this.neighbors = []
	}
}



module.exports = GameBoard
