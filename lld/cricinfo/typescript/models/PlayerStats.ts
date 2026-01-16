export class PlayerStats {
    private runs: number;
    private ballsPlayed: number;
    private wickets: number;

    constructor() {
        this.runs = 0;
        this.ballsPlayed = 0;
        this.wickets = 0;
    }

    public updateRuns(runScored: number): void {
        this.runs += runScored;
    }

    public incrementBallsPlayed(): void {
        this.ballsPlayed += 1;
    }

    public incrementWickets(): void {
        this.wickets += 1;
    }

    public getRuns(): number {
        return this.runs;
    }

    public getWickets(): number {
        return this.wickets;
    }

    public getBallsPlayed(): number {
        return this.ballsPlayed;
    }

    public toString(): string {
        return `Runs: ${this.runs}, Balls Played: ${this.ballsPlayed}, Wickets: ${this.wickets}`;
    }
}
