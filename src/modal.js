
function makeModal(modalChild,title) {
	let titleHeader = document.createElement('h1')
	titleHeader.appendChild(document.createTextNode(title));

	let overlay = document.createElement("div")
	let closeBtn  = document.createElement('button')
	closeBtn.appendChild(document.createTextNode('Cancel'))
	closeBtn.addEventListener('click',()=>{
		closeModal()
	})
	overlay.classList.add('overlay')
	let modal = document.createElement("dialog") 
	modal.appendChild(titleHeader)
	modal.classList.add('modal')
	modal.id="modal"
	modal.appendChild(modalChild)
	//wrapper.appendChild(modal)
	modal.appendChild(closeBtn)
	document.body.appendChild(modal)
	modal.showModal()
}

function closeModal(){
	let modalcontainer = document.getElementById("modal")
	document.body.removeChild(modalcontainer);
}


export {
	makeModal,
	closeModal
}
