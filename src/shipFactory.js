const Ship = require('./ship.js')
module.exports = class ShipFactory {
	constructor() {
		// Using 1990 rules from Wikipedia
		this.shipConfig = {
			"carrier": { "num": 1, "length": 5 },
			"battleship": { "num": 1, "length": 4 },
			"cruiser": { "num": 1, "length": 3 },
			"submarine": { "num": 1, "length": 3 },
			"destroyer": { "num": 1, "length": 2 },
		}
	}
	generateShips() {
		let out = []
		for (let shipObject of Object.entries(this.shipConfig)) {
			let [_, shipdata] = shipObject;
			out.push(new Ship(shipdata.length))
		}
		return out;
	}
}
