export class Board {
  width;
  height;
  shape;
  previousShape;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.shape = "...\n...\n...\n";
    this.previousShape = undefined;
  }

  drop(tetrominoe) {
    if (this.shape.indexOf("X") == 1) {
      throw "already falling";
    }
    this.previousShape = this.shape;
    this._splitAndNormalize();
    this.shape[0] = ["." + tetrominoe + "."];
    this._joinAndNormalize();
  }

  tick() {
    this.previousShape = this.shape;
    // check if there was something below previously

    // last row has something
    if (this.shape.indexOf("X") > 5) {
      this._splitAndNormalize();
      this._moveMiddleRow();
      this._joinAndNormalize();
      this.canMove();
    }
    // last row is empty
    if (this.shape.indexOf("X") <= 5) {
      this._splitAndNormalize();
      this._popLast();
      this._joinAndNormalize();
      this.canMove();
    }
  }

  canMove() {
    this.fallingPiece = this.shape !== this.previousShape;
  }

  toString() {
    return this.shape;
  }

  hasFalling() {
    return this.fallingPiece;
  }

  _joinAndNormalize() {
    if (Array.isArray(this.shape)) {
      this.shape = this.shape.join("\n") + "\n";
    }
  }
  _splitAndNormalize() {
    if (!Array.isArray(this.shape)) {
      this.shape = this.shape.split("\n");
      this.shape.pop();
    }
  }
  _popLast() {
    this.shape.pop(); // string
    this.shape.unshift("...");
  }
  _moveMiddleRow() {
    const firstRow = this.shape[0];
    this.shape[1] = firstRow;
    this.shape.shift();
    this.shape.unshift("...");
  }

  _print() {
    console.log("-current-");
    console.log(this.toString());
    console.log("---------");
  }
  _printPrevious() {
    console.log("-previous-");
    console.log(this.previousShape);
    console.log("----------");
  }
}
