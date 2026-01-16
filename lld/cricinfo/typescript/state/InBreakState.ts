import { MatchState } from "./MatchState";
import { Match } from "../models/Match";
import { Ball } from "../models/Ball";
import { LiveState } from "./LiveState";
import { MatchStatus } from "../enums/MatchStatus";

export class InBreakState implements MatchState {
    public processBall(match: Match, ball: Ball): void {
        console.error("ERROR: Cannot process a ball. The match is currently in a break.");
    }

    public startNextInnings(match: Match): void {
        console.log("Starting the next innings...");
        match.startNewInnings();
        match.setState(new LiveState());
        match.setCurrentStatus(MatchStatus.LIVE);
    }
}
