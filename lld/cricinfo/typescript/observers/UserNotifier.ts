import { MatchObserver } from "./MatchObserver";
import { Match } from "../models/Match";
import { Ball } from "../models/Ball";
import { MatchStatus } from "../enums/MatchStatus";

export class UserNotifier implements MatchObserver {
    public update(match: Match, lastBall: Ball): void {
        const status = match.getCurrentStatus() as MatchStatus;

        if (status === MatchStatus.FINISHED) {
            console.log("[NOTIFICATION]: Match has finished!");
        } else if (status === MatchStatus.IN_BREAK) {
            console.log("[NOTIFICATION]: Inning has ended!");
        } else if (lastBall.isWicket()) {
            console.log("[NOTIFICATION]: Wicket! A player is out.");
        } else if (lastBall.isBoundary()) {
            console.log(`[NOTIFICATION]: It's a boundary! ${lastBall.getRunsScored()} runs.`);
        }
    }
}
