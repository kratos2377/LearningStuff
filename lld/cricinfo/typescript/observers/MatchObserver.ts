import { Match } from "../models/Match";
import { Ball } from "../models/Ball";

export interface MatchObserver {
    update(match: Match, lastBall: Ball): void;
}
