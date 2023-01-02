let PICTURE = null;
let CANVAS = null;
let CONTEXT = null;
let SCALER = 0.8; // about how much screen space will be used bt image
// 10% of margin will be right and left from photo
let SIZE = { x: 0, y: 0, width: 0, height: 0, rows: 3, columns: 3 };
let PIECES = [];

function main() {
  CANVAS = document.getElementById("myCanvas");
  CONTEXT = CANVAS.getContext("2d");
  PICTURE = document.createElement("img");
  PICTURE.src = "./boat.jfif";
  handleResize();
  window.addEventListener("resize", handleResize); // when screen size changes
  updateCanvas();
}

function handleResize() {
  // formula for location picture in canvas
  CANVAS.width = window.innerWidth;
  CANVAS.height = window.innerHeight;

  const resizer =
    SCALER *
    Math.min(
      window.innerWidth / PICTURE.width,
      window.innerHeight / PICTURE.height
    );

  console.log("width picture", PICTURE.width);
  console.log("height picture", PICTURE.height);

  SIZE.width = resizer * PICTURE.width;
  SIZE.height = resizer * PICTURE.height;

  SIZE.x = window.innerWidth / 2 - SIZE.width / 2;
  SIZE.y = window.innerHeight / 2 - SIZE.height / 2;
}

function updateCanvas() {
  CONTEXT.drawImage(PICTURE, SIZE.x, SIZE.y, SIZE.width, SIZE.height);

  for (let i = 0; i < PIECES.length; i++) {
    // PIECES.length - number of puzzles in general (3 , 3) = 9 pieces
    PIECES[i].draw(CONTEXT);
  }
  initializePieces();
  window.requestAnimationFrame(updateCanvas); // for making video;
}

function initializePieces() {
  PIECES = [];
  for (let i = 0; i < SIZE.rows; i++) {
    for (let j = 0; j < SIZE.columns; j++) {
      PIECES.push(new Piece(i, j));
    }
  }
}

class Piece {
  constructor(rowIndex, colIndex) {
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
    // TODO: check
    this.x = SIZE.x + (SIZE.width * this.colIndex) / SIZE.columns; // local variable
    this.y = SIZE.y + (SIZE.height * this.rowIndex) / SIZE.rows;
    this.width = SIZE.width / SIZE.columns;
    this.height = SIZE.height / SIZE.rows;
    this.centerHeight = (this.height - this.y) / 2;
  }

  draw(context) {
    context.beginPath(); // function in canvas that gives a command to draw
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = "#ff4747";
    context.font = "32px Comic Sans MS ";
    const coordinatesText = `Piece (${this.rowIndex}, ${this.colIndex})`;
    // 271
    context.fillText(coordinatesText, this.x + 8, this.y + 142); // TODO: write location with formula
    context.stroke(); // start to draw everything
  }
}
