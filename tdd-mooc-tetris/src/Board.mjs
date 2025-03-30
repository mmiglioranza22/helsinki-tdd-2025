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
    this.shape = ".X.\n...\n...\n";
  }

  tick() {
    this.shape = "...\n.X.\n...\n";
  }

  toString() {
    return this.shape;
  }
}
