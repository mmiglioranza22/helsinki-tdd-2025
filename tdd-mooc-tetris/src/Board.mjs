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
    this.shape = ".X.\n...\n...\n";
  }

  tick() {
    this.shape = "...\n.X.\n...\n";
  }

  toString() {
    return this.shape;
  }
}
