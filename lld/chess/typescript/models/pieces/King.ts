import { Piece } from "../Piece";
import { Color } from "../../enum/Color";
import { PieceType } from "../../enum/PieceType";
import Cell from "../Cell";
import Board from "../Board";

export class King extends Piece {
    constructor(color: Color) {
        super(color, PieceType.KING);
    }

    public canMove(board: Board, start: Cell, end: Cell): boolean {
        if (end.getPiece()?.getColor() === this.color) {
            return false;
        }

        const x = Math.abs(start.getX() - end.getX());
        const y = Math.abs(start.getY() - end.getY());

        return x + y <= 2 && x <= 1 && y <= 1; // 1 step in any direction
    }
}
