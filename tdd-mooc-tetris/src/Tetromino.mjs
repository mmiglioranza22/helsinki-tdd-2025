import { RotatingShape } from "../src/RotatingShape.mjs";

export class Tetromino {
  static T_SHAPE = RotatingShape.fromString(`.T.
       TTT
       ...`);
  static I_SHAPE = RotatingShape.fromString(`.....
       .....
       IIII.
       .....
       .....`);
}
