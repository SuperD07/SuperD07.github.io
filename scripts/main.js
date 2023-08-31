
const selectedPieceScalingFactor = window.innerWidth >= 768 ? 105 : 34;
const pieceScalingFactor = 12;

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
    const target = e.target.nodeName == 'IMG' ? e.target.parentNode : e.target;
    if (target.getAttribute('disabled')) return;
    const p = pieces.find(p => 'piece'+p.id == target.id);
    if (p === selectedPiece) {
        selectedPiece = null;
        selectedBox.classList.add('hidden');
    } else {
        selectedImg.src = p.toImg(selectedPieceScalingFactor);
        selectedPiece = p;
        selectedBox.classList.remove('hidden');
    }
};
const rotatePiece = e => {
    const target = e.target.parentNode.previousSibling;
    if (target.getAttribute('disabled')) return;
    const p = pieces.find(p => 'piece'+p.id == target.id);
    p.rotate();
    document.querySelector('#img'+p.id).src = p.toImg(pieceScalingFactor);
    selectedPiece = null;
    selectedBox.classList.add('hidden');
};
const flipPiece = e => {
    const target = e.target.parentNode.previousSibling;
    if (target.getAttribute('disabled')) return;
    const p = pieces.find(p => 'piece'+p.id == target.id);
    p.flip();
    document.querySelector('#img'+p.id).src = p.toImg(pieceScalingFactor);
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

const moveSelected = e => {
    if (!selectedPiece) return;
    let x = e.clientX || e.touches[0].clientX;
    let y = e.clientY || e.touches[0].clientY;
    if (
        x > table.offsetWidth + table.offsetLeft || 
        y > table.offsetHeight + table.offsetTop || 
        x < table.offsetLeft || 
        y < table.offsetTop 
    ) {
        selectedBox.classList.add('hidden');
        return;
    }

    selectedBox.classList.remove('hidden');
    selectedBox.style.top = (y - selectedPiece.hitbox[0] * 0.5 * selectedPieceScalingFactor) +'px';
    selectedBox.style.left = (x - selectedPiece.hitbox[1] * 0.5 * selectedPieceScalingFactor)+'px';
};

const placeDeletePiece = e => {
    let x = e.clientX || e.touches[0]?.clientX || e.changedTouches[0].clientX;
    let y = e.clientY || e.touches[0]?.clientY || e.changedTouches[0].clientY;
        console.log(x, y)
    x -= table.offsetLeft;
    y -= table.offsetTop;
    if (
        x > table.offsetWidth || 
        y > table.offsetHeight || 
        x < 0 || 
        y < 0 
    ) {
        return;
    }

    if (selectedPiece) {
        x -= selectedPiece.hitbox[1] * 0.5 * selectedPieceScalingFactor;
        y -= selectedPiece.hitbox[0] * 0.5 * selectedPieceScalingFactor;
        const posX = Math.round(x/selectedPieceScalingFactor);
        const posY = Math.round(y/selectedPieceScalingFactor);
        const pos = posX + posY * 10;

        console.log(posX, posY);
        console.log(pos);
        const res = selectedPiece.render(pos);
        console.log(res);
        if (res) {
            inGamePieces.push(selectedPiece);
            selectedPiece = null;
            selectedBox.classList.add('hidden');
        }
    } else {
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
    }
    updateAvailablePieces ();
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
    controls.appendChild(rotate);

    const flip = document.createElement('div');
    flip.className = 'flip';
    flip.id = 'flip'+p.id;
    flip.innerText = '🪞';
    flip.onclick = flipPiece;
    controls.appendChild(flip);

    el.appendChild(controls);

    c.appendChild(el);
}


document.onmousemove = moveSelected;
document.ontouchmove = moveSelected;

document.addEventListener('mousedown', placeDeletePiece);
document.addEventListener('touchend', placeDeletePiece);