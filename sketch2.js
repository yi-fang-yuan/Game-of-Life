let gridWidth = 20;
let game;
let numX;
let numY;
class Game {
    constructor(numX, numY) {
        this.numX = numX;
        this.numY = numY;
        this.array = [];
        for (let i = 0; i < this.numX; i++) {
            this.array[i] = [];
            for (let j = 0; j < this.numY; j++) {
                this.array[i][j] = floor(random(2));
            }
        }
    }
    display() {
        for (let i = 0; i < this.numX; i++) {
            for (let j = 0; j < this.numY; j++) {
                let x = i * gridWidth;
                let y = j * gridWidth;
                if (this.array[i][j] == 1) {
                    fill(250);
                    square(x, y, gridWidth);
                }
            }
        }
    }
    nextGen() {
        let next = [];
        for (let i = 0; i < this.numX; i++) {
            next[i] = [];
            for (let j = 0; j < this.numY; j++) {
                next[i][j] = [];
            }
        }

        for (let i = 0; i < this.numX; i++) {
            for (let j = 0; j < this.numY; j++) {
                if (i === 0 && j < this.numY || i < this.numX && j == 0 || i < this.numX && j == this.numY - 1 || i == this.numX - 1 && j < this.numY) {
                    let x = i * gridWidth;
                    let y = j * gridWidth;
                    fill(0);
                    square(x, y, gridWidth);
                }
                else {
                    let neighbors = this.array[i][j - 1] + this.array[i][j + 1] + this.array[i - 1][j] + this.array[i - 1][j + 1] + this.array[i - 1][j-1] + this.array[i + 1][j - 1] + this.array[i + 1][j] + this.array[i + 1][j + 1];

                    if (this.array[i][j] == 0) {
                        if (neighbors == 3) {
                            next[i][j] = 1;
                        }
                        else {
                            next[i][j] = 0;
                        }
                    }
                    else {
                        if (neighbors == 2 || neighbors == 3) {
                            next[i][j] = 1;
                        }
                        else {
                            next[i][j] = 0;
                        }
                    }
                }
            }
        }
        this.array = next;
    }
    check(a, b) {
        if (a >= 0 && b >= 0) {
            return true;
        }
        else {
            return false;
        }
    }
    mouseClick() {
        let i = Math.floor(mouseX / gridWidth);
        let j = Math.floor(mouseY / gridWidth);
        this.array[i][j] = 1; 
       
    }   
}


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    numX = Math.floor(window.innerWidth / gridWidth);
    numY = Math.floor(window.innerHeight / gridWidth);
    game = new Game(numX, numY);

}

//renomme rows a numX, cols a numY pour meilleure comprehension

function draw() {
    background(0);
    game.display();
    game.nextGen();
}

function mousePressed() {
    game.mouseClick();
}