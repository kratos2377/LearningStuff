import { CricInfoService } from "./CricInfoService";
import { PlayerRole } from "./enums/PlayerRole";
import { Team } from "./models/Team";
import { T20FormatStrategy } from "./strategy/T20FormatStrategy";
import { ScorecardDisplay } from "./observers/ScorecardDisplay";
import { CommentaryDisplay } from "./observers/CommentaryDisplay";
import { UserNotifier } from "./observers/UserNotifier";
import { BallBuilder } from "./models/Ball";
import { WicketType } from "./enums/WicketType";
import { Wicket } from "./models/Wicket";

function main() {
    // Get the Singleton service instance
    const service = CricInfoService.getInstance();

    // 1. Setup Players and Teams
    const p1 = service.addPlayer("P1", "Virat", PlayerRole.BATSMAN);
    const p2 = service.addPlayer("P2", "Rohit", PlayerRole.BATSMAN);
    const p3 = service.addPlayer("P3", "Bumrah", PlayerRole.BOWLER);
    const p4 = service.addPlayer("P4", "Jadeja", PlayerRole.ALL_ROUNDER);

    const p5 = service.addPlayer("P5", "Warner", PlayerRole.BATSMAN);
    const p6 = service.addPlayer("P6", "Smith", PlayerRole.BATSMAN);
    const p7 = service.addPlayer("P7", "Starc", PlayerRole.BOWLER);
    const p8 = service.addPlayer("P8", "Maxwell", PlayerRole.ALL_ROUNDER);

    const india = new Team("T1", "India", [p1, p2, p3, p4]);
    const australia = new Team("T2", "Australia", [p5, p6, p7, p8]);

    // 2. Create a T20 Match using the service
    const t20Match = service.createMatch(india, australia, new T20FormatStrategy());
    const matchId = t20Match.getId();

    // 3. Create and subscribe observers
    const scorecard = new ScorecardDisplay();
    const commentary = new CommentaryDisplay();
    const notifier = new UserNotifier();

    service.subscribeToMatch(matchId, scorecard);
    service.subscribeToMatch(matchId, commentary);
    service.subscribeToMatch(matchId, notifier);

    // 4. Start the match
    service.startMatch(matchId);

    console.log("\n--- SIMULATING FIRST INNINGS ---");
    service.processBallUpdate(matchId, new BallBuilder()
        .setBowledBy(p7).setFacedBy(p1).withRuns(2).build());
    service.processBallUpdate(matchId, new BallBuilder()
        .setBowledBy(p7).setFacedBy(p1).withRuns(1).build());
    service.processBallUpdate(matchId, new BallBuilder()
        .setBowledBy(p7).setFacedBy(p2).withRuns(6).build());

    const p2Wicket = new Wicket(WicketType.BOWLED, p2);
    service.processBallUpdate(matchId, new BallBuilder()
        .setBowledBy(p7).setFacedBy(p2).withRuns(0).withWicket(p2Wicket).build());

    const p3Wicket = new Wicket(WicketType.LBW, p3);
    service.processBallUpdate(matchId, new BallBuilder()
        .setBowledBy(p7).setFacedBy(p3).withRuns(0).withWicket(p3Wicket).build());

    service.processBallUpdate(matchId, new BallBuilder()
        .setBowledBy(p7).setFacedBy(p4).withRuns(4).build());

    const p4Wicket = new Wicket(WicketType.CAUGHT, p4, p6);
    service.processBallUpdate(matchId, new BallBuilder()
        .setBowledBy(p7).setFacedBy(p4).withRuns(0).withWicket(p4Wicket).build());

    // The system is now in an IN_BREAK state
    console.log("\n\n--- INNINGS BREAK ---");
    console.log("Players are off the field. Preparing for the second innings.");

    // 2. Start the second innings
    service.startNextInnings(matchId);

    console.log("\n--- SIMULATING SECOND INNINGS ---");
    // Simulate a few balls of the second innings to show it works
    // Now Australia is batting (p5, p6) and India is bowling (p3)
    service.processBallUpdate(matchId, new BallBuilder()
        .setBowledBy(p3).setFacedBy(p5).withRuns(4).build());

    service.processBallUpdate(matchId, new BallBuilder()
        .setBowledBy(p3).setFacedBy(p5).withRuns(1).build());

    const p5Wicket = new Wicket(WicketType.BOWLED, p5);
    service.processBallUpdate(matchId, new BallBuilder()
        .setBowledBy(p3).setFacedBy(p5).withRuns(0).withWicket(p5Wicket).build());

    const p7Wicket = new Wicket(WicketType.LBW, p7);
    service.processBallUpdate(matchId, new BallBuilder()
        .setBowledBy(p3).setFacedBy(p7).withRuns(0).withWicket(p7Wicket).build());

    const p8Wicket = new Wicket(WicketType.STUMPED, p8);
    service.processBallUpdate(matchId, new BallBuilder()
        .setBowledBy(p3).setFacedBy(p8).withRuns(0).withWicket(p8Wicket).build());

    service.endMatch(matchId);
}

try {
    main();
} catch (e: any) {
    console.error("Error:", e);
}
