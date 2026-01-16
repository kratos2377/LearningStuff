import { MatchRepository } from "./repositories/MatchRepository";
import { PlayerRepository } from "./repositories/PlayerRepository";
import { Match } from "./models/Match";
import { Team } from "./models/Team";
import { MatchFormatStrategy } from "./strategy/MatchFormatStrategy";
import { LiveState } from "./state/LiveState";
import { FinishedState } from "./state/FinishedState";
import { MatchObserver } from "./observers/MatchObserver";
import { Ball } from "./models/Ball";
import { Player } from "./models/Player";
import { PlayerRole } from "./enums/PlayerRole";
import { MatchStatus } from "./enums/MatchStatus";

export class CricInfoService {
    private static instance: CricInfoService;
    private matchRepository: MatchRepository;
    private playerRepository: PlayerRepository;

    private constructor() {
        this.matchRepository = new MatchRepository();
        this.playerRepository = new PlayerRepository();
    }

    public static getInstance(): CricInfoService {
        if (!CricInfoService.instance) {
            CricInfoService.instance = new CricInfoService();
        }
        return CricInfoService.instance;
    }

    public createMatch(team1: Team, team2: Team, format: MatchFormatStrategy): Match {
        // Generate UUID or simpler ID
        const matchId = "MATCH-" + Math.random().toString(36).substr(2, 9).toUpperCase();
        const match = new Match(matchId, team1, team2, format);
        this.matchRepository.save(match);
        console.log(`Match ${format.getFormatName()} created between ${team1.getName()} and ${team2.getName()}.`);
        return match;
    }

    public startMatch(matchId: string): void {
        const match = this.matchRepository.findById(matchId);
        if (match) {
            match.setState(new LiveState());
            match.setCurrentStatus(MatchStatus.LIVE); // Explicitly set LIVE status
            console.log(`Match ${matchId} is now LIVE.`);
        }
    }

    public processBallUpdate(matchId: string, ball: Ball): void {
        const match = this.matchRepository.findById(matchId);
        if (match) {
            match.processBall(ball);
        }
    }

    public startNextInnings(matchId: string): void {
        const match = this.matchRepository.findById(matchId);
        if (match) {
            match.startNextInnings();
        }
    }

    public subscribeToMatch(matchId: string, observer: MatchObserver): void {
        const match = this.matchRepository.findById(matchId);
        if (match) {
            match.addObserver(observer);
        }
    }

    public endMatch(matchId: string): void {
        const match = this.matchRepository.findById(matchId);
        if (match) {
            match.setState(new FinishedState());
            match.setCurrentStatus(MatchStatus.FINISHED);
            console.log(`Match ${matchId} has FINISHED.`);
        }
    }

    public addPlayer(playerId: string, playerName: string, playerRole: PlayerRole): Player {
        const player = new Player(playerId, playerName, playerRole);
        this.playerRepository.save(player);
        return player;
    }
}
