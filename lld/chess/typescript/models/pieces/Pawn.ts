import { Piece } from "../Piece";
import { Color } from "../../enum/Color";
import { PieceType } from "../../enum/PieceType";
import Cell from "../Cell";
import Board from "../Board";

export class Pawn extends Piece {
    constructor(color: Color) {
        super(color, PieceType.PAWN);
    }

    public canMove(board: Board, start: Cell, end: Cell): boolean {
        if (end.getPiece()?.getColor() === this.color) {
            return false;
        }

        const direction = this.color === Color.WHITE ? -1 : 1; // White moves up (decreasing index), Black down
        const startRow = this.color === Color.WHITE ? 6 : 1;

        const xDiff = end.getX() - start.getX(); // Vertical movement (using X as Row based on previous Board impl cell[x][y])
        // Wait, Board implementation: cells[i][j] = new Cell(i, j...).
        // Usually i is row (x), j is col (y).
        // My Board.ts: this.cells[x][y].
        // So X is Row (0-7), Y is Col (0-7).

        const yDiff = Math.abs(end.getY() - start.getY());

        // Forward move (no capture)
        if (yDiff === 0) {
            if (xDiff === direction) {
                // 1 step forward
                return end.getPiece() === null;
            } else if (xDiff === 2 * direction) {
                // 2 steps forward (only from start)
                if (start.getX() !== startRow) return false;

                // Check intermediate cell
                const intermediateCell = board.getCell(start.getX() + direction, start.getY());
                if (intermediateCell.isOccupied()) return false;

                return end.getPiece() === null;
            }
        }
        // Diagonal capture
        else if (yDiff === 1) {
            if (xDiff === direction) {
                return end.getPiece() !== null && end.getPiece()!.getColor() !== this.color;
            }
        }

        return false;
    }
}
