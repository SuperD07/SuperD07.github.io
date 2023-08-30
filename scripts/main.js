
const pieces = [];

let selectedPiece = null;
let inGamePieces = [];

document.createAttribute('pieceId');
document.createAttribute('disabled');

const selectedImg = document.createElement('img');
const selectedBox = document.querySelector('.selectedPiece')
selectedBox.appendChild(selectedImg);

const c = document.querySelector('.pieces');


const selectPiece = e => {
    console.log(e);
    const target = e.target.nodeName == 'IMG' ? e.target.parentNode : e.target;
    if (target.getAttribute('disabled')) return;
    const p = pieces.find(p => 'piece'+p.id == target.id);
    if (p === selectedPiece) {
        selectedPiece = null;
        selectedBox.classList.add('hidden');
    } else {
        selectedImg.src = p.toImg(105);
        selectedPiece = p;
        selectedBox.classList.remove('hidden');
    }
};
const rotatePiece = e => {
    const target = e.target.parentNode.previousSibling;
    if (target.getAttribute('disabled')) return;
    const p = pieces.find(p => 'piece'+p.id == target.id);
    p.rotate();
    document.querySelector('#img'+p.id).src = p.toImg();
    selectedPiece = null;
    selectedBox.classList.add('hidden');
};
const flipPiece = e => {
    const target = e.target.parentNode.previousSibling;
    if (target.getAttribute('disabled')) return;
    const p = pieces.find(p => 'piece'+p.id == target.id);
    p.flip();
    document.querySelector('#img'+p.id).src = p.toImg();
    selectedPiece = null;
    selectedBox.classList.add('hidden');
};

const updateAvailablePieces = () => {
    [...c.children].forEach(b => {
        const el = b.children[0];
        if (inGamePieces.some(p => 'piece'+p.id == el.id)) {
            el.setAttribute('disabled', 'true');
        } else {
            el.removeAttribute('disabled');
        }
    });
};


for (let i = 0; i < 10; i++) {
    const p = new Piece(i, 0);
    pieces.push(p);

    const el = document.createElement('div');
    el.className = 'box';

    const pieceContainer = document.createElement('div');
    pieceContainer.className = 'piece';
    pieceContainer.id = 'piece' + p.id;
    pieceContainer.onclick = selectPiece;
    pieceContainer.ontouchstart = selectPiece;

    const img = document.createElement('img');
    img.src = p.toImg();
    img.id = 'img' + p.id;
    pieceContainer.onclick = selectPiece;
    pieceContainer.ontouchstart = selectPiece;
    pieceContainer.appendChild(img);

    el.appendChild(pieceContainer);

    const controls = document.createElement('div');
    controls.className = 'controls';

    const rotate = document.createElement('div');
    rotate.className = 'rotate';
    rotate.id = 'rotate'+p.id;
    rotate.innerText = '➡️';
    rotate.onclick = rotatePiece;
    rotate.ontouchstart = rotatePiece;
    controls.appendChild(rotate);

    const flip = document.createElement('div');
    flip.className = 'flip';
    flip.id = 'flip'+p.id;
    flip.innerText = '🪞';
    flip.onclick = flipPiece;
    flip.ontouchstart = flipPiece;
    controls.appendChild(flip);

    el.appendChild(controls);

    c.appendChild(el);
}


document.onmousemove = e => {
    if (selectedPiece) {
        if (e.clientX > 1084 || e.clientY > 554) {
            selectedBox.classList.add('hidden');
            return;
        }
        selectedBox.classList.remove('hidden');
        selectedBox.style.top = (e.clientY - selectedPiece.hitbox[0] * 0.5 * 105) +'px';
        selectedBox.style.left = (e.clientX - selectedPiece.hitbox[1] * 0.5 * 105)+'px';
    }
}
document.ontouchmove = e => {
    if (selectedPiece) {
        if (e.touches[0].clientX > 1084 || e.touches[0].clientY > 554) {
            selectedBox.classList.add('hidden');
            return;
        }
        selectedBox.classList.remove('hidden');
        selectedBox.style.top = (e.touches[0].clientY - selectedPiece.hitbox[0] * 0.5 * 105) +'px';
        selectedBox.style.left = (e.touches[0].clientX - selectedPiece.hitbox[1] * 0.5 * 105)+'px';
    }
}

document.onmousedown = e => {
    let [x, y] = [e.clientX, e.clientY];
    x -= 20;
    y -= 20;
    if (x > 1064 || y > 534) {
        return;
    }

    if (!selectedPiece) {
        const posX = Math.floor(x/105);
        const posY = Math.floor(y/105);
        const pos = posX + posY * 10;
        console.log(pos);
        const cell = document.querySelector('#cell'+pos);
        const pId = cell.getAttribute('pieceId');
        [...document.querySelectorAll('td[pieceId="'+pId+'"]')].forEach(td => {
            td.removeAttribute('pieceId');
            td.style.backgroundColor = 'white';
        });
        inGamePieces = inGamePieces.filter(p => p.id != pId);
        updateAvailablePieces();
        return;
    }

    x -= selectedPiece.hitbox[1] * 0.5 * 105;
    y -= selectedPiece.hitbox[0] * 0.5 * 105;
    x = Math.round(x);
    y = Math.round(y);
    const posX = Math.round(x/105);
    const posY = Math.round(y/105);
    const pos = posX + posY * 10;

    const res = selectedPiece.render(pos);
    console.log(res)
    if (res) {
        inGamePieces.push(selectedPiece);
        selectedPiece = null;
        selectedBox.classList.add('hidden');
    }

    updateAvailablePieces ();
}

document.ontouchend = e => {
    let [x, y] = [e.touches[0].clientX, e.touches[0].clientY];
    x -= 20;
    y -= 20;
    if (x > 1064 || y > 534) {
        return;
    }

    if (!selectedPiece) {
        const posX = Math.floor(x/105);
        const posY = Math.floor(y/105);
        const pos = posX + posY * 10;
        const cell = document.querySelector('#cell'+pos);
        const pId = cell.getAttribute('pieceId');
        [...document.querySelectorAll('td[pieceId="'+pId+'"]')].forEach(td => {
            td.removeAttribute('pieceId');
            td.style.backgroundColor = 'white';
        });
        inGamePieces = inGamePieces.filter(p => p.id != pId);
        updateAvailablePieces();
        return;
    }

    x -= selectedPiece.hitbox[1] * 0.5 * 105;
    y -= selectedPiece.hitbox[0] * 0.5 * 105;
    x = Math.round(x);
    y = Math.round(y);
    const posX = Math.round(x/105);
    const posY = Math.round(y/105);
    const pos = posX + posY * 10;

    const res = selectedPiece.render(pos);
    if (res) {
        inGamePieces.push(selectedPiece);
        selectedPiece = null;
        selectedBox.classList.add('hidden');
    }

    updateAvailablePieces ();
}