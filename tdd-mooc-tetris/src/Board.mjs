export class Board {
  width;
  height;
  shape;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.shape = "...\n...\n...\n";
  }
  drop(tetrominoe) {
    if (this.shape.indexOf("X") == 1) {
      throw "already falling";
    }
    this._splitAndNormalize();
    this.shape[0] = ["." + tetrominoe + "."];
    this._joinAndNormalize();
  }

  tick() {
    // last row has something
    if (this.shape.indexOf("X") > 5) {
      this._splitAndNormalize();
      this._moveMiddleRow();
      this._joinAndNormalize();
      this.fallingPiece = false;
    }
    // last row is empty
    if (this.shape.indexOf("X") <= 5) {
      this._splitAndNormalize();
      this._popLast();
      this._joinAndNormalize();
      this.fallingPiece = true;
    }
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
    console.log(this.toString());
  }
}
