export class Board {
  width;
  height;
  shape;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.shape = "...\n...\n...\n";
  }
  drop() {
    if (this.shape.indexOf("X") > -1) {
      throw "already falling";
    }
    this._splitAndNormalize();
    this.shape[0] = [".X."];
    this._joinAndNormalize();
  }

  tick() {
    // split in 3 portions, move all to the right each tick, set left side empty
    this.shape = "...\n.X.\n...\n";
  }

  toString() {
    return this.shape;
  }

  _joinAndNormalize() {
    this.shape = this.shape.join("\n") + "\n";
  }
  _splitAndNormalize() {
    this.shape = this.shape.split("\n");
    this.shape.pop();
  }
}
