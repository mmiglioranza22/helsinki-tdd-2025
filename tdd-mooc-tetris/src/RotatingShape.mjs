class Shape {
  shape;

  constructor(shape) {
    this.shape = shape.replaceAll(" ", "") + "\n";
  }

  toString() {
    return this.shape;
  }
}

export class RotatingShape {
  static fromString(shape) {
    return new Shape(shape);
  }
}
