class Shape {
  shape;

  constructor(shape) {
    this.shape = shape.replaceAll(" ", "") + "\n";
  }

  toString() {
    return this.shape;
  }

  rotateRight() {
    let final = [];
    this.shape = this.shape.split("\n");
    this.shape.pop();

    const multiplier = this.shape[0].length; // 3, 5, etc

    for (let i = 0; i < multiplier; i++) {
      final[i] = new Array(multiplier);
    }

    this.shape = this.shape.reverse();
    for (let i = multiplier - 1; i >= 0; i--) {
      for (let j = multiplier - 1; j >= 0; j--) {
        final[j][i] = this.shape[i][j];
      }
    }

    for (let i = 0; i < final.length; i++) {
      final[i] = final[i].join("");
    }

    final = final.join("\n") + "\n";

    this.shape = final;
    return final;
  }

  rotateLeft() {
    let final = [];
    this.shape = this.shape.split("\n");
    this.shape.pop();

    const multiplier = this.shape[0].length; // 3, 5, etc

    for (let i = 0; i < multiplier; i++) {
      final[i] = new Array(multiplier);
    }

    // this.shape = this.shape.reverse();
    for (let i = 0; i < multiplier; i++) {
      for (let j = multiplier - 1; j >= 0; j--) {
        console.log(this.shape[i][j]);
        final[i][multiplier - 1 - j] = this.shape[i][j];
      }
    }

    final = final.reverse();
    for (let i = 0; i < final.length; i++) {
      final[i] = final[i].join("");
    }
    final = final.join("\n") + "\n";

    this.shape = final;
    return final;
  }
}

export class RotatingShape {
  static fromString(shape) {
    return new Shape(shape);
  }
}
