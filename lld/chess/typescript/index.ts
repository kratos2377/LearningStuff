import { Game } from "./Game";
import { GameStatus } from "./enum/GameStatus";

const game = new Game("Alice", "Bob");

// Helper to print board
function printBoard() {
    const board = game.getBoard();

    // Header
    process.stdout.write("  ");
    for (let j = 0; j < 8; j++) process.stdout.write(j + " ");
    console.log();

    for (let i = 0; i < 8; i++) {
        process.stdout.write(i + " ");
        for (let j = 0; j < 8; j++) {
            const cell = board.getCell(i, j);
            if (cell.getPiece()) {
                const p = cell.getPiece()!;
                const typeChar = p.getType() === 0 ? 'K' :
                    p.getType() === 1 ? 'Q' :
                        p.getType() === 2 ? 'R' :
                            p.getType() === 3 ? 'B' :
                                p.getType() === 4 ? 'N' : 'P';

                // Use color? Uppercase for White, Lowercase for Black
                const displayChar = p.getColor() === 0 ? typeChar : typeChar.toLowerCase();
                process.stdout.write(displayChar + " ");
            } else {
                process.stdout.write(". ");
            }
        }
        console.log();
    }
    console.log("Current Turn: " + game.getCurrentTurnName());
    console.log("--------------------------");
}

console.log("Chess Game Started!");
printBoard();

// Simulate Moves
// White Pawn from (6,0) to (5,0) - Valid
console.log("\nMove: White Pawn (6,0) -> (5,0)");
game.playerMove(6, 0, 5, 0);
printBoard();

// Black Pawn from (1,0) to (2,0) - Valid
console.log("\nMove: Black Pawn (1,0) -> (2,0)");
game.playerMove(1, 0, 2, 0);
printBoard();

// Invalid Move (White Rook blocked)
console.log("\nMove: White Rook (7,0) -> (6,0) [Blocked by Pawn(Start)] - Or invalid move logic");
// Actually Rook (7,0) is blocked by Pawn at (6,0) if it wasn't moved. But we moved (6,0).
// Wait, we moved (6,0) -> (5,0). So (6,0) is empty.
// Rook (7,0) to (6,0) is valid?
// Rook moves vertical. (7,0) -> (6,0). Distance 1. Loop 7->6. Empty? Yes.
// So this should be valid.
game.playerMove(7, 0, 6, 0);
printBoard();

// Knight Jump
console.log("\nMove: Black Knight (0,1) -> (2,2)");
game.playerMove(0, 1, 2, 2);
printBoard();

