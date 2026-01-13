import { Piece } from "../Piece";
import { Color } from "../../enum/Color";
import { PieceType } from "../../enum/PieceType";
import Cell from "../Cell";
import Board from "../Board";

export class Bishop extends Piece {
    constructor(color: Color) {
        super(color, PieceType.BISHOP);
    }

    public canMove(board: Board, start: Cell, end: Cell): boolean {
        if (end.getPiece()?.getColor() === this.color) {
            return false;
        }

        const xDiff = Math.abs(start.getX() - end.getX());
        const yDiff = Math.abs(start.getY() - end.getY());

        if (xDiff !== yDiff) {
            return false;
        }

        // Check path
        const xDir = start.getX() < end.getX() ? 1 : -1;
        const yDir = start.getY() < end.getY() ? 1 : -1;

        let currX = start.getX() + xDir;
        let currY = start.getY() + yDir;

        while (currX !== end.getX() && currY !== end.getY()) {
            if (board.getCell(currX, currY).isOccupied()) {
                return false;
            }
            currX += xDir;
            currY += yDir;
        }

        return true;
    }
}
