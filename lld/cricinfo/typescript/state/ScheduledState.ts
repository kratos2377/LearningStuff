import { MatchState } from "./MatchState";
import { Match } from "../models/Match";
import { Ball } from "../models/Ball";

export class ScheduledState implements MatchState {
    public processBall(match: Match, ball: Ball): void {
        console.error("ERROR: Match is scheduled but not started. Cannot process ball.");
    }

    public startNextInnings(match: Match): void {
        console.error("ERROR: Cannot start innings. Match must be started first.");
    }
}
