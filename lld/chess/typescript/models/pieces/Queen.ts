import { Piece } from "../Piece";
import { Color } from "../../enum/Color";
import { PieceType } from "../../enum/PieceType";
import Cell from "../Cell";
import Board from "../Board";
import { Rook } from "./Rook";
import { Bishop } from "./Bishop";

export class Queen extends Piece {
    constructor(color: Color) {
        super(color, PieceType.QUEEN);
    }

    public canMove(board: Board, start: Cell, end: Cell): boolean {
        // Queen moves like Rook OR Bishop
        // Reuse logic? Or copy paste?
        // Reusing via delegation or just new instance is cleaner if we want to avoid duplication,
        // but simple conditionals are also fine.
        // Let's use simple logic here to avoid circular deps or extra instantiations if possible,
        // but reusing Rook and Bishop logic is safer.

        // Actually, simple static checks or helper functions would be best.
        // But for time, let's just delegate.

        // NOTE: This creates instances on every check, might be inefficient but clean for LLD task.
        // Optimization: Use static methods or mixins, but let's stick to simple logic duplication for clarity without overhead
        // of creating heavy objects (though they are light here).
        // Actually, let's just write the logic. It's combination of both.

        const xDiff = Math.abs(start.getX() - end.getX());
        const yDiff = Math.abs(start.getY() - end.getY());

        // Check diagonal (Bishop)
        if (xDiff === yDiff) {
            return new Bishop(this.color).canMove(board, start, end);
        }

        // Check straight (Rook)
        if (start.getX() === end.getX() || start.getY() === end.getY()) {
            return new Rook(this.color).canMove(board, start, end);
        }

        return false;
    }
}
