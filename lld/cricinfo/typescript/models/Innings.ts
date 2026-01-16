import { Team } from "./Team";
import { Ball } from "./Ball";
import { Player } from "./Player";
import { PlayerStats } from "./PlayerStats";
import { ExtraType } from "../enums/ExtraType";

export class Innings {
    private battingTeam: Team;
    private bowlingTeam: Team;
    private score: number;
    private wickets: number;
    private balls: Ball[];
    private playerStats: Map<Player, PlayerStats>;

    constructor(battingTeam: Team, bowlingTeam: Team) {
        this.battingTeam = battingTeam;
        this.bowlingTeam = bowlingTeam;
        this.score = 0;
        this.wickets = 0;
        this.balls = [];
        this.playerStats = new Map<Player, PlayerStats>();

        // Initialize stats for all players
        for (const player of battingTeam.getPlayers()) {
            this.playerStats.set(player, new PlayerStats());
        }
        for (const player of bowlingTeam.getPlayers()) {
            this.playerStats.set(player, new PlayerStats());
        }
    }

    public addBall(ball: Ball): void {
        this.balls.push(ball);
        const runsScored = ball.getRunsScored();
        this.score += runsScored;

        if (ball.getExtraType() === ExtraType.WIDE || ball.getExtraType() === ExtraType.NO_BALL) {
            this.score += 1;
        } else {
            // Update stats for global player object and local map
            ball.getFacedBy().getStats().updateRuns(runsScored);
            ball.getFacedBy().getStats().incrementBallsPlayed();

            this.getLocalPlayerStats(ball.getFacedBy()).updateRuns(runsScored);
            this.getLocalPlayerStats(ball.getFacedBy()).incrementBallsPlayed();
        }

        if (ball.isWicket()) {
            this.wickets++;
            ball.getBowledBy().getStats().incrementWickets();
            this.getLocalPlayerStats(ball.getBowledBy()).incrementWickets();
        }
    }

    // Helper to get stats safely
    private getLocalPlayerStats(player: Player): PlayerStats {
        let stats = this.playerStats.get(player);
        if (!stats) {
            stats = new PlayerStats();
            this.playerStats.set(player, stats);
        }
        return stats;
    }

    public printPlayerStats(): void {
        for (const [player, stats] of this.playerStats) {
            if (stats.getBallsPlayed() > 0 || stats.getWickets() > 0) {
                console.log(`Player: ${player.getName()} - Stats: ${stats.toString()}`);
            }
        }
    }

    public getScore(): number {
        return this.score;
    }

    public getWickets(): number {
        return this.wickets;
    }

    public getBattingTeam(): Team {
        return this.battingTeam;
    }

    public getOvers(): number {
        const validBalls = this.balls.filter(b =>
            b.getExtraType() !== ExtraType.WIDE && b.getExtraType() !== ExtraType.NO_BALL
        ).length;

        const completedOvers = Math.floor(validBalls / 6);
        const ballsInCurrentOver = validBalls % 6;

        return completedOvers + (ballsInCurrentOver / 10.0);
    }
}
