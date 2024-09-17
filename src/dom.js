const GameBoard = require('./gameboard');
const Player = require('./player');
import {Game, GAMESTATES} from "./game.js";

function renderPlayer(player,visible) {
	let header = document.createElement("h1")
	let playerId= player.id
	let playerText= player.name
	header.innerText = playerText
	let playerBox = document.getElementById(playerId);
	playerBox = document.createElement("div")
	playerBox.classList.add("player")
	playerBox.id=playerId
	player.gameboard.setVisible(visible)
	let boardDiv = renderBoard(player.gameboard)
	playerBox.appendChild(header);
	playerBox.appendChild(boardDiv);
	let radiobox = document.createElement("div")
	let radio_vis  = document.createElement("input")

	return playerBox
}

function applyCellStyling(cell,board){
	cell.classList.remove(...cell.classList)
	cell.innerText = ""
	cell.classList.add('cell')
	let cellobj = board.getCell(cell.id.split("-")[1])
	if (cellobj.attacked && cellobj.ship){
		cell.classList.add('attacked-filled-cell')
		cell.innerText = "x"
	} else if (cellobj.attacked){
		cell.classList.add('attacked-empty-cell')
		cell.innerText = '-'
	} else if (cellobj.ship && cellobj.visible){
		cell.classList.add('filled-cell')
	}
}



function renderBoard(board){
	let fullboard = document.createElement("div")
	fullboard.classList.add('board')
	let gridsize = board.size+1 // Accounting for labels
	fullboard.style.gridTemplateColumns = `repeat(minmax(72px,1fr),${gridsize})`
	fullboard.style.gridTemplateRows = `repeat(minmax(72px,1fr),${gridsize})`
	for (let i = 0; i < gridsize; i+=1){
		for (let j = 0; j < gridsize; j+=1){
			let cell = document.createElement('div')
			cell.style.gridColumn = i+1
			cell.style.gridRow = j+1
			cell.onclick = (e)=>board.onCellClick(e)
			if (i>0 && j > 0) {
				let board_i = i-1
				let board_j = j-1
				cell.id = `${board.player.id}-${board.translateRowColToCoord(board_j,board_i)}`

				applyCellStyling(cell,board)
				fullboard.appendChild(cell)

			} else {
				cell.classList.add("label-cell")
				if (i==0 && j==0){
					cell.innerText = ""
				}
				else if (j == 0){
					cell.innerText = String.fromCharCode("A".charCodeAt(0)+i-1)
				}
				else {
					cell.innerText = String(j)
				}
				fullboard.appendChild(cell)
			}
		}
	}
	return fullboard
}

function closeMenu(){
	document.getElementById("menu").remove()
}

function startButton (game){
	let btn = document.createElement('button')
	btn.id="startbtn"
	btn.innerText = "Start Game"
	btn.addEventListener("click", ()=>{game.startGame(); closeMenu()})
	return btn
}



function renderMenu(game){
	if (game.state==GAMESTATES.INIT || game.state == GAMESTATES.END){
		let menudiv = document.createElement('div')
		menudiv.id="menu"
		menudiv.classList.add('menu')
		let menu = document.createElement('ul')
		menu.classList.add("startmenulist")
		let common_classes = "menuitem"
		const menu_items = [
			[startButton ,[game],[common_classes]]
		]
		menu_items.forEach((arr, idx)=>{
			let [callback,args,className] = arr;
			let li = document.createElement("li");
			li.classList.add(className)
			let btn = callback(...args)
			li.appendChild(btn)
			menu.appendChild(li)
		})
		menudiv.appendChild(menu)
		return menudiv
	}
	return null
}

function renderMessageBox(){
	let messagebox = document.createElement("div")
	messagebox.classList.add('messagebox')
	let p = document.createElement('p')
	p.id = "message";
	messagebox.appendChild(p)
	document.body.appendChild(messagebox)
}

function renderMessage(msg){
	(document.getElementById('message')||{}).innerText=msg;
}

function clearMessage(){
	(document.getElementById('message')||{}).innerText="";
}

function removeMessageBox(){
	let msgbox = document.getElementById('message');
	if(msgbox!==null)
		msgbox.remove()
}


function initPage(game){
	document.title = "BattleShip";
	game.configNewGame(10)
	let title = document.createElement("h1")
	title.innerText = "Battleship"
	document.body.appendChild(title);
	let playArea = document.createElement("div")
	playArea.classList.add("container")
	document.body.appendChild(playArea)
	playArea.appendChild(renderPlayer(game.player1,true));
	game.player2.setCpu(true);
	playArea.appendChild(renderPlayer(game.player2,false));
	renderPage(game)
}

function renderPage(game){
	document.getElementById('player1').replaceWith(renderPlayer(game.player1,game.player1.gameboard.visible))
	document.getElementById('player2').replaceWith(renderPlayer(game.player2,game.player2.gameboard.visible))
	let currmenu = document.getElementById('menu')
	if (currmenu === null){
		let menudiv = renderMenu(game);
		if (menudiv !==null)
			document.body.appendChild(menudiv);
	}
}


export {
	renderPlayer,
	renderBoard,
	initPage,
	renderMenu,
	renderMessage,
	renderMessageBox,
	clearMessage,
	removeMessageBox,
	renderPage
}
