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
    // check if there was something below previously
    this.previousShape = this.shape;

    // TODO refactor to check any char in any relevant position (last and middle row)
    if (this.shape.indexOf("Y") === 5) {
      this.canMove();
      return;
    }
    if (this.shape.indexOf("X") > 6) {
      // last row has something
      this._splitAndNormalize();
      this._moveMiddleRow();
      this._joinAndNormalize();
      this.canMove();
      return;
    }
    // last row is empty
    if (this.shape.indexOf("X") <= 6) {
      this._splitAndNormalize();
      this._popLast();
      this._joinAndNormalize();
      this.canMove();
      return;
    }
  }

  // if the previous state is equal to the current state, then the piece dropped should no longer move
  // if they differ, the piece is still falling OR is the first time reaching its limit and should not move ONLY in the next tick
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

  // when piece just dropped and there is no piece in the bottom row
  _popLast() {
    this.shape.pop(); // string
    this.shape.unshift("...");
  }

  // when a piece just dropped and the bottom row has already been filled
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
