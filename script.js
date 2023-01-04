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
  // window.addEventListener("resize", handleResize); // when screen size changes
  initializePieces(SIZE.rows, SIZE.columns);
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
  CONTEXT.clearRect(0, 0, CANVAS.width, CANVAS.height);

  CONTEXT.globalAlpha = 0.5;
  CONTEXT.drawImage(PICTURE, SIZE.x, SIZE.y, SIZE.width, SIZE.height);
  CONTEXT.globalAlpha = 1; // how it works?

  for (let i = 0; i < PIECES.length; i++) {
    // PIECES.length - number of puzzles in general (3 , 3) = 9 pieces
    PIECES[i].draw(CONTEXT);
  }

  window.requestAnimationFrame(updateCanvas); // for making video;
}

function initializePieces(rows, cols) {
  SIZE.rows = rows;
  SIZE.columns = cols;
  PIECES = [];
  for (let i = 0; i < SIZE.rows; i++) {
    for (let j = 0; j < SIZE.columns; j++) {
      PIECES.push(new Piece(i, j));
    }
  }
}

function randomizePieces() {
  for (let i = 0; i < PIECES.length; i++) {
    // 9 pieces
    let location = {
      x: Math.random() * (CANVAS.width - PIECES[i].width),
      y: Math.random() * (CANVAS.height - PIECES[i].height),
    };
    // any available value of width and height on the screen
    PIECES[i].x = location.x;
    PIECES[i].y = location.y;
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
    context.drawImage(
      PICTURE,
      (this.colIndex * PICTURE.width) / SIZE.columns,
      (this.rowIndex * PICTURE.height) / SIZE.rows,
      PICTURE.width / SIZE.columns,
      PICTURE.height / SIZE.rows,
      this.x,
      this.y,
      this.width,
      this.height
    );
    // console.log("posX", (this.colIndex * PICTURE.width) / SIZE.columns); // 0, 900, 1000
    context.rect(this.x, this.y, this.width, this.height);

    // for text in canvas of position
    // context.fillStyle = "#ff4747";
    // context.font = "32px Comic Sans MS ";
    // const coordinatesText = `Piece (${this.rowIndex}, ${this.colIndex})`;
    // context.fillText(coordinatesText, this.x + 8, this.y + 142); // TODO: write location with formula
    context.stroke(); // start to draw everything
  }
}
