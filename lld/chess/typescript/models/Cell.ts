import { Color } from "../enum/Color";
import { Piece } from "./Piece";

export default class Cell {
    private x: number;
    private y: number;
    private piece: Piece | null;
    // We can infer cell color from x,y usually, but keeping it explicit is fine too
    // private color: Color; 

    constructor(x: number, y: number, piece: Piece | null) {
        this.x = x;
        this.y = y;
        this.piece = piece;
    }

    public getPiece(): Piece | null {
        return this.piece;
    }

    public setPiece(piece: Piece | null): void {
        this.piece = piece;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public isOccupied(): boolean {
        return this.piece != null;
    }
}