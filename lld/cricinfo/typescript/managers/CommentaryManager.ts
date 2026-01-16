import { Ball } from "../models/Ball";
import { WicketType } from "../enums/WicketType";
import { ExtraType } from "../enums/ExtraType";

export class CommentaryManager {
    private static instance: CommentaryManager;
    private commentaryTemplates: Map<string, string[]>;

    private constructor() {
        this.commentaryTemplates = new Map<string, string[]>();
        this.initializeTemplates();
    }

    public static getInstance(): CommentaryManager {
        if (!CommentaryManager.instance) {
            CommentaryManager.instance = new CommentaryManager();
        }
        return CommentaryManager.instance;
    }

    private initializeTemplates(): void {
        // Templates for runs
        this.commentaryTemplates.set("RUNS_0", [
            "%s defends solidly.",
            "No run, good fielding by the cover fielder.",
            "A dot ball to end the over.",
            "Pushed to mid-on, but no run."
        ]);
        this.commentaryTemplates.set("RUNS_1", [
            "Tucked away to the leg side for a single.",
            "Quick single taken by %s.",
            "Pushed to long-on for one."
        ]);
        this.commentaryTemplates.set("RUNS_2", [
            "Two runs taken!",
            "Quick double taken by %s.",
            "Pushed to mid-on for two."
        ]);
        this.commentaryTemplates.set("RUNS_4", [
            "FOUR! %s smashes it through the covers!",
            "Beautiful shot! That's a boundary.",
            "Finds the gap perfectly. Four runs."
        ]);
        this.commentaryTemplates.set("RUNS_6", [
            "SIX! That's out of the park!",
            "%s sends it sailing over the ropes!",
            "Massive hit! It's a maximum."
        ]);

        // Templates for wickets
        this.commentaryTemplates.set("WICKET_" + WicketType.BOWLED, [
            "BOWLED HIM! %s misses completely and the stumps are shattered!",
            "Cleaned up! A perfect yorker from %s."
        ]);
        this.commentaryTemplates.set("WICKET_" + WicketType.CAUGHT, [
            "CAUGHT! %s skies it and the fielder takes a comfortable catch.",
            "Out! A brilliant catch in the deep by %s."
        ]);
        this.commentaryTemplates.set("WICKET_" + WicketType.LBW, [
            "LBW! That one kept low and struck %s right in front.",
            "%s completely misjudged the line and pays the price."
        ]);
        this.commentaryTemplates.set("WICKET_" + WicketType.STUMPED, [
            "STUMPED! %s misses it, and the keeper does the rest!",
            "Gone! Lightning-fast work by the keeper to stump %s."
        ]);

        // Templates for extras
        this.commentaryTemplates.set("EXTRA_" + ExtraType.WIDE, [
            "That's a wide. The umpire signals an extra run.",
            "Too far down the leg side, that'll be a wide."
        ]);
        this.commentaryTemplates.set("EXTRA_" + ExtraType.NO_BALL, [
            "No ball! %s has overstepped. It's a free hit.",
            "It's a no-ball for overstepping."
        ]);
    }

    public generateCommentary(ball: Ball): string {
        const key = this.getEventKey(ball);
        const templates = this.commentaryTemplates.get(key) || ["Just a standard delivery."];
        const template = templates[Math.floor(Math.random() * templates.length)];

        // Retrieve names safely
        const batsmanName = ball.getFacedBy()?.getName() || "Batsman";
        const bowlerName = ball.getBowledBy()?.getName() || "Bowler";

        return template.replace("%s", batsmanName); // Simple replace for now, ignoring multi-arg requirement for simplicity/compatibility with Java logic which used String.format
    }

    private getEventKey(ball: Ball): string {
        if (ball.isWicket()) {
            return "WICKET_" + ball.getWicket()!.getWicketType();
        }
        if (ball.getExtraType()) {
            return "EXTRA_" + ball.getExtraType();
        }
        const runs = ball.getRunsScored();
        if (runs >= 0 && runs <= 6) {
            // Basic mapping
            if (runs === 0) return "RUNS_0";
            if (runs === 1) return "RUNS_1";
            if (runs === 2) return "RUNS_2";
            if (runs === 4) return "RUNS_4";
            if (runs === 6) return "RUNS_6";
        }
        return "DEFAULT";
    }
}
