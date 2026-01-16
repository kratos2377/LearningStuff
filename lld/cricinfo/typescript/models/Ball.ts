import { Player } from "./Player";
import { Wicket } from "./Wicket";
import { ExtraType } from "../enums/ExtraType";
import { CommentaryManager } from "../managers/CommentaryManager";

export class Ball {
    private ballNumber: number;
    private bowledBy: Player;
    private facedBy: Player;
    private runsScored: number;
    private wicket?: Wicket;
    private extraType?: ExtraType;
    private commentary: string;

    constructor(builder: BallBuilder) {
        this.ballNumber = builder.ballNumber;
        this.bowledBy = builder.bowledBy;
        this.facedBy = builder.facedBy;
        this.runsScored = builder.runsScored;
        this.wicket = builder.wicket;
        this.extraType = builder.extraType;
        this.commentary = builder.commentary!;
    }

    public isWicket(): boolean {
        return !!this.wicket;
    }

    public isBoundary(): boolean {
        return this.runsScored === 4 || this.runsScored === 6;
    }

    public getCommentary(): string {
        return this.commentary;
    }

    public getRunsScored(): number {
        return this.runsScored;
    }

    public getFacedBy(): Player {
        return this.facedBy;
    }

    public getBowledBy(): Player {
        return this.bowledBy;
    }

    public getWicket(): Wicket | undefined {
        return this.wicket;
    }

    public getExtraType(): ExtraType | undefined {
        return this.extraType;
    }
}

export class BallBuilder {
    public ballNumber: number = 0;
    public bowledBy!: Player;
    public facedBy!: Player;
    public runsScored: number = 0;
    public wicket?: Wicket;
    public extraType?: ExtraType;
    public commentary?: string;

    public withBallNumber(ballNumber: number): BallBuilder {
        this.ballNumber = ballNumber;
        return this;
    }

    public setBowledBy(bowler: Player): BallBuilder {
        this.bowledBy = bowler;
        return this;
    }

    public setFacedBy(batsman: Player): BallBuilder {
        this.facedBy = batsman;
        return this;
    }

    public withRuns(runs: number): BallBuilder {
        this.runsScored = runs;
        return this;
    }

    public withWicket(wicket: Wicket): BallBuilder {
        this.wicket = wicket;
        return this;
    }

    public withExtraType(extra: ExtraType): BallBuilder {
        this.extraType = extra;
        return this;
    }

    public withCommentary(commentary: string): BallBuilder {
        this.commentary = commentary;
        return this;
    }

    public build(): Ball {
        if (!this.commentary) {
            // Create a temporary ball object to generate commentary
            // This is a bit tricky with the circular dependency, but in TS constructor runs after imports.
            // However, Ball isn't fully constructed. 
            // We can rely on a partial object or just pass 'this' (the builder) if we modify generateCommentary
            // to accept Builder, or simpler: use a dummy ball or unsafe cast.

            // Replicating Java logic: "Ball tempBall = new Ball(this);" 
            // But we can't create Ball because Ball constructor calls... wait, Ball constructor doesn't call commentary manager.
            // The Builder calls CommentaryManager.

            // To pass a "Ball" to generateCommentary, expected to have getters.
            // We can create a temporary object that looks like a Ball.
            const tempBall = {
                isWicket: () => !!this.wicket,
                getWicket: () => this.wicket,
                getExtraType: () => this.extraType,
                getRunsScored: () => this.runsScored,
                getFacedBy: () => this.facedBy,
                getBowledBy: () => this.bowledBy,
                getName: () => "" // Dummy
            } as unknown as Ball;

            this.commentary = CommentaryManager.getInstance().generateCommentary(tempBall);
        }
        return new Ball(this);
    }
}
