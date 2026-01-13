import { Piece } from "../Piece";
import { Color } from "../../enum/Color";
import { PieceType } from "../../enum/PieceType";
import Cell from "../Cell";
import Board from "../Board";

export class Rook extends Piece {
    constructor(color: Color) {
        super(color, PieceType.ROOK);
    }

    public canMove(board: Board, start: Cell, end: Cell): boolean {
        if (end.getPiece()?.getColor() === this.color) {
            return false;
        }

        if (start.getX() === end.getX()) {
            // Vertical movement
            const minY = Math.min(start.getY(), end.getY());
            const maxY = Math.max(start.getY(), end.getY());
            for (let y = minY + 1; y < maxY; y++) {
                if (board.getCell(start.getX(), y).isOccupied()) {
                    return false;
                }
            }
            return true;
        } else if (start.getY() === end.getY()) {
            // Horizontal movement
            const minX = Math.min(start.getX(), end.getX());
            const maxX = Math.max(start.getX(), end.getX());
            for (let x = minX + 1; x < maxX; x++) {
                if (board.getCell(x, start.getY()).isOccupied()) {
                    return false;
                }
            }
            return true;
        }

        return false;
    }
}
