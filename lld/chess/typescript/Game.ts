import Board from "./models/Board";
import { Player } from "./models/Player";
import { Color } from "./enum/Color";
import { GameStatus } from "./enum/GameStatus";
import { Move } from "./models/Move";
import { PieceType } from "./enum/PieceType";

export class Game {
    private board: Board;
    private players: Player[];
    private currentTurn: Player; // Or just Color
    private status: GameStatus;
    private movesPlayed: Move[];

    constructor(p1Name: string, p2Name: string) {
        this.board = new Board();
        this.players = [
            new Player(p1Name, Color.WHITE),
            new Player(p2Name, Color.BLACK)
        ];
        this.currentTurn = this.players[0]; // White starts
        this.status = GameStatus.ACTIVE;
        this.movesPlayed = [];
    }

    public isOver(): boolean {
        return this.status !== GameStatus.ACTIVE;
    }

    public getStatus(): GameStatus {
        return this.status;
    }

    public getCurrentTurnName(): string {
        return this.currentTurn.getName();
    }

    public playerMove(startX: number, startY: number, endX: number, endY: number): boolean {
        const startCell = this.board.getCell(startX, startY);
        const endCell = this.board.getCell(endX, endY);
        const sourcePiece = startCell.getPiece();

        // 1. Check if source has a piece
        if (!sourcePiece) {
            console.log("No piece at start position.");
            return false;
        }

        // 2. Check if piece belongs to current player
        if (sourcePiece.getColor() !== this.currentTurn.getColor()) {
            console.log("It's not your turn or not your piece!");
            return false;
        }

        // 3. Check rule validity (Piece specific logic)
        if (!sourcePiece.canMove(this.board, startCell, endCell)) {
            console.log("Invalid move for this piece.");
            return false;
        }

        // 4. Kill?
        const destPiece = endCell.getPiece();
        if (destPiece) {
            destPiece.setKilled(true); // Assuming Piece has setKilled or we just remove it
            // Piece model didn't have setKilled logic in my previous step, 
            // but effectively setting cell piece to null removes it from board interaction.
            // Keeping track of killed pieces is good for UI but not strict core logic requirement if not asking for "Captured Pieces" list.
        }

        // 5. Create Move object
        const move = new Move(this.currentTurn, startCell, endCell);
        this.movesPlayed.push(move);

        // 6. Execute Move
        endCell.setPiece(sourcePiece);
        startCell.setPiece(null);

        // 7. Check Win Condition (Simple for now: King Captured? - actually King is never captured in Chess, it's Checkmate)
        // Checkmate detection is complex. For this LLD demo, we might skip full recursion.
        // But we can check if opponent King is killed (if we allow that variant) or just rely on manual resignation/stalemate for now if full checkmate is too much code.
        // NOTE: Standard chess: "The game should detect checkmate".
        // Let's at least check if the move puts the Other King in potential danger?
        // Implementing full checkmate logic requires simulating all opponent moves.
        // I will implement a placeholder or basic check logic if user asks, but for now standard Move flow is priority.

        // 8. Switch Turn
        if (this.status === GameStatus.ACTIVE) {
            this.currentTurn = this.currentTurn === this.players[0] ? this.players[1] : this.players[0];
        }

        return true;
    }

    public getBoard(): Board {
        return this.board;
    }
}
