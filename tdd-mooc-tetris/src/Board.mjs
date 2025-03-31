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
    if (this.shape.indexOf("X") > -1) {
      throw "already falling";
    }
    this._splitAndNormalize();
    this.shape[0] = ["." + tetrominoe + "."];
    this._joinAndNormalize();
  }

  tick() {
    if (this.shape.indexOf("X") <= 5) {
      this._splitAndNormalize();
      this._moveBoard();
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
  _moveBoard() {
    this.shape.pop();
    this.shape.unshift("...");
  }

  _print() {
    console.log(this.toString());
  }
}
