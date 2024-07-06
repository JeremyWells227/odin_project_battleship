const GameBoard = require('./gameboard.js')
const Ship = require('./ship.js')


test("Gameboard correctly detects valid and invalid coordinates", ()=>{
	let gb = new GameBoard;
	expect(gb.isValidCoords(0,0)).toBe(true)
	expect(gb.isValidCoords(9,9)).toBe(true)
	expect(gb.isValidCoords(10,10)).toBe(false)
	expect(gb.isValidCoords(5,10)).toBe(false)
	expect(gb.isValidCoords(10,5)).toBe(false)
	expect(gb.isValidCoords(100,100)).toBe(false)
	expect(gb.isValidCoords(-100,-100)).toBe(false)
	expect(gb.isValidCoords(5,5)).toBe(true)
})

test("Gameboard correctly translates alphanumeric coordinates to numbers",()=>{
	let gb = new GameBoard;
	expect(gb.translateCoords("A1")).toStrictEqual([0,0])
	expect(gb.translateCoords("J10")).toStrictEqual([9,9])
	expect(gb.translateCoords("D3")).toStrictEqual([2,3])
})


test("receiveAttack returns true in a valid attack and false in an invalid attack",()=>{
	let gb = new GameBoard;
	


})

test("Will correctly flag whether a ship placement is valid or not", () => {
	let gb = new GameBoard;
	let ship = new Ship(5)
	expect(gb.isValidShipPlacement("A1",ship.length,"S")).toBe(true)
	expect(gb.isValidShipPlacement("A1",ship.length,"N")).toBe(false)
	expect(gb.isValidShipPlacement("C3",ship.length,"N")).toBe(false)
	expect(gb.isValidShipPlacement("C3",ship.length,"E")).toBe(true)
	expect(gb.isValidShipPlacement("C3",ship.length,"W")).toBe(false)
})

test("Will place a ship in the correct spot and validate it", () => {
	let gb = new GameBoard;
	gb.toggleVisible();
	let ship = new Ship(5)
	console.log(gb.toString())
	expect(gb.placeShip("A1","S",ship)).toBe(true)
	console.log(gb.toString())
	let ship2  = new Ship(4)
	let ship_collision  = new Ship(3)
	expect(gb.placeShip("D3","W",ship2)).toBe(false)
	expect(gb.placeShip("D3","E",ship2)).toBe(true)
	expect(gb.placeShip("D2","S",ship_collision)).toBe(false)
	let north = new Ship(3)
	expect(gb.placeShip("C10","N",north)).toBe(true);
	console.log(gb.toString())
	gb.toggleVisible()
	console.log(gb.toString())
})

test("Will correctly flag attacked fields", () => {
	let gb = new GameBoard;
	gb.toggleVisible();
	let ship = new Ship(5)
	gb.placeShip("A1","S",ship)
	expect(gb.receiveAttack("B1")).toBe(true)
	console.log(gb.toString())
	expect(gb.receiveAttack("B1")).toBe(false)
	expect(gb.receiveAttack("A1")).toBe(true)
	console.log(gb.toString())
	expect(gb.grid[0][0].ship.hits).toBe(1)
})

test("Will autogenerate a valid placement", () => {
	let gb = new GameBoard;
	gb.toggleVisible()
	expect(gb.autoGenerateShips()).toBe(true)
	console.log(gb.toString())
})
