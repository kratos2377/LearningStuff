import { Player } from "./Player";
import Cell from "./Cell";
import { Piece } from "./Piece";

export class Move {
    private player: Player;
    private start: Cell;
    private end: Cell;
    private pieceMoved: Piece;
    private pieceKilled: Piece | null;

    constructor(player: Player, start: Cell, end: Cell) {
        this.player = player;
        this.start = start;
        this.end = end;
        this.pieceMoved = start.getPiece()!;
        this.pieceKilled = end.getPiece();
    }

    public isCastlingMove(): boolean {
        return false;
    }

    public getStart(): Cell {
        return this.start;
    }

    public getEnd(): Cell {
        return this.end;
    }

    public getPieceMoved(): Piece {
        return this.pieceMoved;
    }

    public getPieceKilled(): Piece | null {
        return this.pieceKilled;
    }
}
