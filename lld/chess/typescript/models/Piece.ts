import { Color } from "../enum/Color";
import { PieceType } from "../enum/PieceType";
import Cell from "./Cell";
import Board from "./Board";

export abstract class Piece {
    protected color: Color;
    protected type: PieceType;

    constructor(color: Color, type: PieceType) {
        this.color = color;
        this.type = type;
    }

    public getColor(): Color {
        return this.color;
    }

    public getType(): PieceType {
        return this.type;
    }

    public abstract canMove(board: Board, start: Cell, end: Cell): boolean;
}