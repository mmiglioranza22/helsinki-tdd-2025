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
      console.log("error");
      this._print();
      throw "already falling";
    }
    this._splitAndNormalize();
    this.shape[0] = ["." + tetrominoe + "."];
    this._joinAndNormalize();
  }

  tick() {
    // I am in the last row
    if (this.shape.indexOf("X") > 5) {
      this._splitAndNormalize();
      this._moveMiddleRow();
      this._joinAndNormalize();
      this.fallingPiece = true;
    }
    if (this.shape.indexOf("X") <= 5) {
      this._splitAndNormalize();
      this._moveLastRow();
      this._joinAndNormalize();
      this.fallingPiece = true;
    } else {
      this.fallingPiece = false;
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
  _moveLastRow() {
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
