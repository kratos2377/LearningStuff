import { MatchState } from "./MatchState";
import { MatchStatus } from "../enums/MatchStatus";
import { Match } from "../models/Match";
import { Ball } from "../models/Ball";
import { Team } from "../models/Team";
import { FinishedState } from "./FinishedState";
import { InBreakState } from "./InBreakState";
import { Innings } from "../models/Innings";

export class LiveState implements MatchState {
    public processBall(match: Match, ball: Ball): void {
        // 1. Process the ball as usual
        const currentInnings = match.getCurrentInnings();
        if (currentInnings) {
            currentInnings.addBall(ball);
        }
        match.notifyObservers(ball); // Notify observers about this specific ball

        // 2. Check for win/end conditions
        this.checkForMatchEnd(match);
    }

    public startNextInnings(match: Match): void {
        console.error("ERROR: Cannot start next innings while match is LIVE.");
    }

    private checkForMatchEnd(match: Match): void {
        const currentInnings = match.getCurrentInnings();
        if (!currentInnings) return;

        const inningsCount = match.getInnings().length;
        const totalInnings = match.getFormatStrategy().getTotalInnings();
        const isFinalInnings = (inningsCount === totalInnings);

        // --- A. WIN CONDITION: Chasing team surpasses the target ---
        if (isFinalInnings) {
            const firstInnings = match.getInnings()[0];
            const targetScore = firstInnings.getScore() + 1;
            if (currentInnings.getScore() >= targetScore) {
                const battingTeam = currentInnings.getBattingTeam();
                // Assumes typical 11 players per team, so 10 wickets falls means all out.
                // 11 players - 1 (current batsman) - wickets lost = remaining wickets effectively?
                // Actually wickets remaining = 10 - wickets lost. 
                // Or (TeamSize - 1) - wickets.
                // If team size is N, wickets to fail is N-1.
                // So remaining wickets = (N-1) - currentWickets.
                // Example: 11 players -> 10 wickets capacity. Wickets = 4. Remaining = 6.
                const wicketsRemaining = (battingTeam.getPlayers().length - 1) - currentInnings.getWickets();
                this.declareWinner(match, battingTeam, `won by ${wicketsRemaining} wickets`);
                return; // Match is over
            }
        }

        // --- B. END OF INNINGS CONDITION: All out or overs completed ---
        if (this.isInningsOver(match)) {
            if (isFinalInnings) {
                // The whole match is over, determine winner by runs or a tie
                const score1 = match.getInnings()[0].getScore();
                const score2 = currentInnings.getScore();
                const team1 = match.getTeam1(); // Assumes getTeam1 exists
                const battingTeam = currentInnings.getBattingTeam();

                if (score1 > score2) {
                    this.declareWinner(match, team1, `won by ${score1 - score2} runs`);
                } else if (score2 > score1) {
                    // Should be handled above usually, but for safety
                    const wicketsRemaining = (battingTeam.getPlayers().length - 1) - currentInnings.getWickets();
                    this.declareWinner(match, battingTeam, `won by ${wicketsRemaining} wickets`);
                } else {
                    this.declareWinner(match, undefined, "Match Tied"); // No winner in a tie
                }
            } else {
                // It's just an innings break, not the end of the match
                console.log("End of the innings!");
                match.setState(new InBreakState());
                match.setCurrentStatus(MatchStatus.IN_BREAK);
                match.notifyObservers(new Ball({} as any)); // Signal innings break, passing dummy ball or make Ball optional
                // Note: notifyObservers expects Ball. I should check if I can pass null/undefined or create a dummy ball.
                // In Java "match.notifyObservers(null)" was used.
                // In TS MatchObserver interface: "update(match: Match, lastBall: Ball): void"
                // I should probably make Ball optional in interface or pass dummy.
                // I will update MatchObserver interface to allow undefined Ball? Or just pass a dummy ball.
                // A dummy ball is safer to avoid changing interface in many places if not needed.
            }
        }
    }

    private declareWinner(match: Match, winningTeam: Team | undefined, message: string): void {
        console.log("MATCH FINISHED!");
        match.setWinner(winningTeam);
        const resultMessage = (winningTeam) ? `${winningTeam.getName()} ${message}` : message;
        match.setResultMessage(resultMessage);

        match.setState(new FinishedState());
        match.setCurrentStatus(MatchStatus.FINISHED);
        match.notifyObservers(new Ball({} as any)); // Signal match end
    }

    private isInningsOver(match: Match): boolean {
        const currentInnings = match.getCurrentInnings();
        if (!currentInnings) return false;

        // Condition 1: All out
        const allOut = currentInnings.getWickets() >= currentInnings.getBattingTeam().getPlayers().length - 1;
        // Condition 2: Overs finished
        const oversFinished = currentInnings.getOvers() >= match.getFormatStrategy().getTotalOvers();

        return allOut || oversFinished;
    }
}
