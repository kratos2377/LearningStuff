import { Match } from "../models/Match";
import { Ball } from "../models/Ball";

export interface MatchState {
    processBall(match: Match, ball: Ball): void;
    startNextInnings(match: Match): void; // default implementation in classes
}
