import { MatchObserver } from "./MatchObserver";
import { Match } from "../models/Match";
import { Ball } from "../models/Ball";
import { MatchStatus } from "../enums/MatchStatus";

export class CommentaryDisplay implements MatchObserver {
    public update(match: Match, lastBall: Ball): void {
        const status = match.getCurrentStatus() as MatchStatus;

        if (status === MatchStatus.FINISHED) {
            console.log("[COMMENTARY]: Match has finished!");
        } else if (status === MatchStatus.IN_BREAK) {
            console.log("[COMMENTARY]: Inning has ended!");
        } else {
            // Need to ensure lastBall is valid and has commentary
            if (lastBall && lastBall.getCommentary) {
                console.log(`[COMMENTARY]: ${lastBall.getCommentary()}`);
            }
        }
    }
}
