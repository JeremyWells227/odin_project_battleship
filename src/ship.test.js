const Ship = require('./ship.js');

test("Ship increments hits",()=>{
	let ship = new Ship(2)
	ship.hit()
	expect(ship.hits).toBe(1)
})
test("Ship sinks  after appropriate # of hits",()=>{
	let ship = new Ship(2)
	ship.hit()
	ship.hit()
	expect(ship.hits).toBe(2)
	expect(ship.isSunk()).toBe(true)
})
test("Ship is not sunk  after nonzero # of hits < length",()=>{
	let ship = new Ship(2)
	ship.hit()
	expect(ship.hits).toBe(1)
	expect(ship.isSunk()).toBe(false)
})
