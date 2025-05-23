import { describe, test } from "vitest";
import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.mjs";

function distinctOrientations(shape) {
  const distinct = new Set();
  let goingRight = shape;
  let goingLeft = shape;

  for (let i = 0; i < 10; i++) {
    distinct.add(goingRight.rotateRight());
    // goingRight = goingRight.rotateRight();
    distinct.add(goingLeft.rotateLeft());
    // goingLeft = goingLeft.rotateLeft();
  }
  console.log(distinct);
  return distinct;
}

describe("The T shape", () => {
  const shape = Tetromino.T_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.T.
       TTT
       ...`
    );
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.T.
       .TT
       .T.`
    );
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.T.
       TT.
       .T.`
    );
  });

  test("has 4 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(4);
  });
});

describe("The I shape", () => {
  const shape = Tetromino.I_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.....
       .....
       IIII.
       .....
       .....`
    );
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `..I..
       ..I..
       ..I..
       ..I..
       .....`
    );
  });

  test("can be rotated left/counter-clockwise", () => {
    console.log(shape.toString());
    const a = shape.rotateLeft().toString();
    console.log(a);
    expect(a).to.equalShape(
      `..I..
       ..I..
       ..I..
       ..I..
       .....`
    );
  });

  test.skip("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(2);
  });
});

/*
describe("The O shape", () => {
  const shape = Tetromino.O_SHAPE;

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  test.skip("cannot be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  test.skip("cannot be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });

  test.skip("has 1 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(1);
  });
});
*/
