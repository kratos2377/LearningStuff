import { MatchObserver } from "./MatchObserver";
import { Match } from "../models/Match";
import { Ball } from "../models/Ball";
import { MatchStatus } from "../enums/MatchStatus";
import { Innings } from "../models/Innings";

export class ScorecardDisplay implements MatchObserver {
    public update(match: Match, lastBall: Ball): void {
        const status = match.getCurrentStatus() as MatchStatus;

        if (status === MatchStatus.FINISHED) {
            console.log("\n--- MATCH RESULT ---");
            console.log(match.getResultMessage().toUpperCase());
            console.log("--------------------");

            console.log("Player Stats:");
            let counter = 1;
            const innings = match.getInnings() as Innings[];
            for (const inning of innings) {
                console.log("Inning " + counter++);
                inning.printPlayerStats();
            }

        } else if (status === MatchStatus.IN_BREAK) {
            console.log("\n--- END OF INNINGS ---");
            const innings = match.getInnings() as Innings[];
            const lastInnings = innings[innings.length - 1];
            if (lastInnings) {
                console.log(`Final Score: ${lastInnings.getBattingTeam().getName()}: ${lastInnings.getScore()}/${lastInnings.getWickets()} (Overs: ${lastInnings.getOvers().toFixed(1)})`);
            }
            console.log("------------------------");
        } else {
            console.log("\n--- SCORECARD UPDATE ---");
            const currentInnings = match.getCurrentInnings() as Innings;
            if (currentInnings) {
                console.log(`${currentInnings.getBattingTeam().getName()}: ${currentInnings.getScore()}/${currentInnings.getWickets()} (Overs: ${currentInnings.getOvers().toFixed(1)})`);
            }
            console.log("------------------------");
        }
    }
}
