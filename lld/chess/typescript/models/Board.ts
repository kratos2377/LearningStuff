import { Color } from "../enum/Color";
import Cell from "./Cell";
import { Piece } from "./Piece";
import { King } from "./pieces/King";
import { Queen } from "./pieces/Queen";
import { Rook } from "./pieces/Rook";
import { Bishop } from "./pieces/Bishop";
import { Knight } from "./pieces/Knight";
import { Pawn } from "./pieces/Pawn";

export default class Board {
    private cells: Cell[][];

    constructor() {
        this.cells = [];
        this.resetBoard();
    }

    public getCell(x: number, y: number): Cell {
        if (!this.isValidCoordinate(x, y)) {
            throw new Error("Invalid coordinate");
        }
        return this.cells[x][y];
    }

    public isValidCoordinate(x: number, y: number): boolean {
        return x >= 0 && x < 8 && y >= 0 && y < 8;
    }

    public resetBoard(): void {
        // Initialize cells
        for (let i = 0; i < 8; i++) {
            this.cells[i] = [];
            for (let j = 0; j < 8; j++) {
                this.cells[i][j] = new Cell(i, j, null);
            }
        }

        // Initialize Black Pieces (Row 0)
        this.cells[0][0].setPiece(new Rook(Color.BLACK));
        this.cells[0][1].setPiece(new Knight(Color.BLACK));
        this.cells[0][2].setPiece(new Bishop(Color.BLACK));
        this.cells[0][3].setPiece(new Queen(Color.BLACK));
        this.cells[0][4].setPiece(new King(Color.BLACK));
        this.cells[0][5].setPiece(new Bishop(Color.BLACK));
        this.cells[0][6].setPiece(new Knight(Color.BLACK));
        this.cells[0][7].setPiece(new Rook(Color.BLACK));

        for (let j = 0; j < 8; j++) {
            this.cells[1][j].setPiece(new Pawn(Color.BLACK));
        }

        for (let j = 0; j < 8; j++) {
            this.cells[6][j].setPiece(new Pawn(Color.WHITE));
        }

        // Initialize White Pieces (Row 7)
        this.cells[7][0].setPiece(new Rook(Color.WHITE));
        this.cells[7][1].setPiece(new Knight(Color.WHITE));
        this.cells[7][2].setPiece(new Bishop(Color.WHITE));
        this.cells[7][3].setPiece(new Queen(Color.WHITE));
        this.cells[7][4].setPiece(new King(Color.WHITE));
        this.cells[7][5].setPiece(new Bishop(Color.WHITE));
        this.cells[7][6].setPiece(new Knight(Color.WHITE));
        this.cells[7][7].setPiece(new Rook(Color.WHITE));
    }
}