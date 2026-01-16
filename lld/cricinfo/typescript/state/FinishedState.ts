import { MatchState } from "./MatchState";
import { Match } from "../models/Match";
import { Ball } from "../models/Ball";

export class FinishedState implements MatchState {
    public processBall(match: Match, ball: Ball): void {
        console.error("ERROR: Cannot process a ball for a finished match.");
    }

    public startNextInnings(match: Match): void {
        console.error("ERROR: Cannot start the next innings from the current state.");
    }
}
