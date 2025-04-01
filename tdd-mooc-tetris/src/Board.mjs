export class Board {
  width;
  height;
  shape;
  previousShape;
  droppedPieces;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.shape = "...\n...\n...\n";
    this.previousShape = undefined;
    this.droppedPieces = [];
  }

  drop(tetrominoe) {
    if (this.shape.indexOf("X") == 1) {
      throw "already falling";
    }

    // save the previous state, since the current state will be updated next with a new drop
    this.previousShape = this.shape;
    this._splitAndNormalize();
    this.shape[0] = ["." + tetrominoe + "."];
    this._joinAndNormalize();

    this.droppedPieces.push(tetrominoe);
  }

  tick() {
    this.previousShape = this.shape;
    // update the previous state with the current one, since the current will be manipulated
    // if it should and THEN we will check if the piece should be able to move or not

    // check the rows in this order:
    // 1- if the last row is empty, pop it an insert an empty one on top. // this.shape[2] === "..."
    //  Otherwise check:
    // 1.1 - if the middle row is empty, remove it and set the first row there, adding an empty row on top // this.shape[1] = this.shape[0]; this.shape[0] = "..."
    //  What does empty mean? -> that the row is not equal to "..." OR that the row does not have any of the dropped shapes

    this._splitAndNormalize(); // split for checks, but if NO case is found, it should join again
    if (this.shape[1] === "...") {
      const currentRow = this.shape[0]; // always the one before the one it is checking against
      this.shape[1] = currentRow;
      this.shape[0] = "...";
      this._joinAndNormalize();
      this.canMove();

      return;
    }
    if (this.shape[2] === "...") {
      const currentRow = this.shape[1];
      const aboveRow = this.shape[0];
      this.shape[2] = currentRow;
      this.shape[1] = aboveRow;
      this.shape[0] = "...";
      this._joinAndNormalize();
      this.canMove();
      return;
    }
    this._joinAndNormalize(); // no case is found, must join again
    this.canMove(); // should also check this
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

  _print() {
    console.log("-currents-");
    console.log(this.toString());
    console.log("---------");
  }

  _printPrevious() {
    console.log("-previous-");
    console.log(this.previousShape);
    console.log("----------");
  }
}
