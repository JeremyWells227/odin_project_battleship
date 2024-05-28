module.exports = class Ship {
	constructor(length){
		this.hits = 0
		this.length = length
	}
	hit(){
		this.hits+=1
	}
	isSunk(){
		if(this.hits >= this.length)
			return true
		else 
			return false
	}
}


