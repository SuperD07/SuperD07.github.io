
class Piece {
    static shapes = [
        [
            [0, 0, 1, 1],
            [1, 1, 1, 0]
        ],
        [
            [1, 1, 1, 1, 1],
        ],
        [
            [0, 0, 0, 1],
            [1, 1, 1, 1],
        ],
        [
            [1, 1, 1],
            [0, 0, 1],
            [0, 0, 1],
        ],
        [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 1],
        ],
        [
            [1, 0, 1],
            [1, 1, 1],
        ],
        [
            [0, 1, 0],
            [0, 1, 0],
            [1, 1, 1],
        ],
        [
            [1, 1, 1],
            [1, 1, 0],
        ],
        [
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 1],
        ],
        [
            [0, 1, 0, 0],
            [1, 1, 1, 1],
        ]
    ];
    static colors = [
        '#ff66b3',
        '#0000a0',
        '#6ce609',
        'lightblue',
        'orange',
        '#600080',
        '#ffd900',
        '#0079f2',
        'green',
        '#f70000'
    ];

    constructor (id) {
        this.id = id;

        this.shape = JSON.parse(JSON.stringify(Piece.shapes[this.id]));
        this.hitbox = [this.shape.length, this.shape[0].length];

        this.color = Piece.colors[this.id];
    }

    render (pos) {
        const t = x => x.toString().padStart(2, '0')[0];
        try {
            if (t(pos + this.hitbox[1] - 1) !== t(pos)) throw new Error('Exceeding X limit');
            if (pos + (this.hitbox[0] - 1) * 10 >= 50) throw new Error('Exceeding Y limit');
        } catch (e) {
            console.error(e);
            return false;
        }

        const cells = [];
        let valid = true;
        this.shape.forEach((row, i) => {
            for (let j = 0; j < row.length; j++) {
                if (row[j]) {
                    const cell = document.querySelector('#cell' + (i * 10 + j + pos));
                    if (cell.getAttribute('pieceId')) {
                        valid = false;
                    }
                    cells.push(cell);
                }
            }
        });
        if (!valid) return false;
        cells.forEach(cell => {
            cell.style.backgroundColor = this.color;
            cell.setAttribute('pieceId', this.id);
        });
        return true;
    }


    toImg (size = 12) {
        const canvas = document.createElement('canvas');
        canvas.width = this.hitbox[1] * size;
        canvas.height = this.hitbox[0] * size;
        const ctx = canvas.getContext('2d');
        
        for (let i = 0; i < this.shape.length; i++) {
            const row = this.shape[i];
            for (let j = 0; j < row.length; j++) {
                const cell = row[j];
                if (cell) {
                    ctx.fillStyle = this.color;
                    ctx.fillRect(j * size, i * size, size, size);
                }
            }
        }

        return canvas.toDataURL('image/png');
    }


    rotate () {
        const newShape = [];
        for (let j = 0; j < this.shape[0].length; j++) {
            const newRow = [];
            for (let k = 0; k < this.shape.length; k++) {
                newRow.push(this.shape[this.shape.length - 1 - k][j]);
            }
            newShape.push(newRow);
        }
        this.shape = newShape;
        this.hitbox = [this.shape.length, this.shape[0].length];
    }
    flip () {
        const newShape = [];
        for (let j = 0; j < this.shape.length; j++) {
            const newRow = this.shape[j].reverse();
            newShape.push(newRow);
        }
        this.shape = newShape;
        this.hitbox = [this.shape.length, this.shape[0].length];
    }
}