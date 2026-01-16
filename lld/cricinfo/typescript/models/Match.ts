import { Team } from "./Team";
import { MatchFormatStrategy } from "../strategy/MatchFormatStrategy";
import { Innings } from "./Innings";
import { MatchState } from "../state/MatchState";
import { MatchStatus } from "../enums/MatchStatus";
import { MatchObserver } from "../observers/MatchObserver";
import { ScheduledState } from "../state/ScheduledState";
import { Ball } from "./Ball";

export class Match {
    private id: string;
    private team1: Team;
    private team2: Team;
    private formatStrategy: MatchFormatStrategy;
    private innings: Innings[];
    private currentState: MatchState;
    private currentStatus: MatchStatus;
    private observers: MatchObserver[];
    private winner?: Team;
    private resultMessage: string;

    constructor(id: string, team1: Team, team2: Team, formatStrategy: MatchFormatStrategy) {
        this.id = id;
        this.team1 = team1;
        this.team2 = team2;
        this.formatStrategy = formatStrategy;
        this.innings = [];
        this.observers = [];
        this.currentState = new ScheduledState();
        this.currentStatus = MatchStatus.SCHEDULED;
        this.resultMessage = "";

        // Start first innings
        this.innings.push(new Innings(team1, team2));
    }

    public processBall(ball: Ball): void {
        this.currentState.processBall(this, ball);
    }

    public startNextInnings(): void {
        this.currentState.startNextInnings(this);
    }

    public setState(state: MatchState): void {
        this.currentState = state;
    }

    public setCurrentStatus(status: MatchStatus): void {
        this.currentStatus = status;
    }

    public setWinner(winner: Team | undefined): void {
        this.winner = winner;
    }

    public setResultMessage(message: string): void {
        this.resultMessage = message;
    }

    public startNewInnings(): void {
        if (this.innings.length >= this.formatStrategy.getTotalInnings()) {
            console.log("Cannot create a new innings, match has already reached its limit.");
            return;
        }

        // Determine batting team for next innings.
        // Simplified logic as per Java reference: Swap teams relative to original.
        // If 2 innings: 1st is T1, 2nd is T2.
        // If we want to be more generic:
        const lastInnings = this.getCurrentInnings();
        const nextBattingTeam = (lastInnings.getBattingTeam() === this.team1) ? this.team2 : this.team1;
        const nextBowlingTeam = (lastInnings.getBattingTeam() === this.team1) ? this.team1 : this.team2;

        const nextInnings = new Innings(nextBattingTeam, nextBowlingTeam);
        this.innings.push(nextInnings);

        // Also we probably need to set state back to Live or similar?
        // In Java logic, `InBreakState.startNextInnings` calls `match.createNewInnings()`.
        // But who sets the state to LIVE?
        // Java `InBreakState`:
        /*
        public void startNextInnings(Match match) {
            match.createNewInnings();
            match.setState(new LiveState());
            match.setCurrentStatus(MatchStatus.LIVE);
            System.out.println("New innings started!");
        }
        */
        // I need to update my `InBreakState` implementation in TS to do this too.
        // I missed checking Java `InBreakState`. 
        // I will update `InBreakState.ts` after this.
    }

    public addObserver(observer: MatchObserver): void {
        this.observers.push(observer);
    }

    public removeObserver(observer: MatchObserver): void {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    public notifyObservers(ball: Ball): void {
        for (const observer of this.observers) {
            observer.update(this, ball);
        }
    }

    public getCurrentInnings(): Innings {
        return this.innings[this.innings.length - 1];
    }

    public getTeam1(): Team {
        return this.team1;
    }

    public getTeam2(): Team {
        return this.team2;
    }

    public getWinner(): Team | undefined {
        return this.winner;
    }

    public getResultMessage(): string {
        return this.resultMessage;
    }

    public getInnings(): Innings[] {
        return this.innings;
    }

    public getId(): string {
        return this.id;
    }

    public getCurrentStatus(): MatchStatus {
        return this.currentStatus;
    }

    public getFormatStrategy(): MatchFormatStrategy {
        return this.formatStrategy;
    }
}
