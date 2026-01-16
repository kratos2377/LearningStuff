# Cricket Information System (TypeScript)

## Problem Statement

Design and implement a Cricket Information System similar to CricInfo that provides comprehensive information about cricket matches, teams, players, and live scores. The system handles real-time updates, match statistics, and user interactions.

---

## Requirements

1. **Match Information Management:**
   - Store and manage cricket match details
   - Track match schedules and results
   - Support real-time score updates
   - Handle match status transitions

2. **Team and Player Management:**
   - Maintain team rosters and player information
   - Track player roles and statistics

3. **Scorecard Management:**
   - Record detailed match statistics
   - Track innings, overs, and ball-by-ball information
   - Maintain batting and bowling statistics

4. **System Requirements:**
   - Handle concurrent access (simulation via Observer/State patterns)
   - Ensure data consistency
   - Support scalability
   - Allow for future extensions

---

## Core Entities

- **Match:** Represents a cricket match with state and observers.
- **Team:** Represents a cricket team.
- **Player:** Represents a player with specific role and stats.
- **Innings:** Manages the score and balls for a specific inning.
- **Ball:** Represents a single delivery/ball.
- **CricInfoService:** Singleton service to manage the system.

## Enums

- **MatchStatus:** `SCHEDULED`, `LIVE`, `IN_BREAK`, `FINISHED`, `ABANDONED`
- **PlayerRole:** `BATSMAN`, `BOWLER`, `ALL_ROUNDER`, `WICKET_KEEPER`
- **WicketType:** `BOWLED`, `CAUGHT`, `LBW`, `RUN_OUT`, `STUMPED`
- **ExtraType:** `WIDE`, `NO_BALL`, `BYE`, `LEG_BYE`

---

## Design Patterns Used

- **Singleton Pattern:** `CricInfoService`, `CommentaryManager`.
- **Builder Pattern:** `BallBuilder`, `WicketBuilder` (constructor/methods).
- **Observer Pattern:** `MatchObserver` interface, `ScorecardDisplay`, `CommentaryDisplay`, `UserNotifier`.
- **State Pattern:** `MatchState` interface, `ScheduledState`, `LiveState`, `InBreakState`, `FinishedState`.
- **Strategy Pattern:** `MatchFormatStrategy` interface, `ODIFormatStrategy`, `T20FormatStrategy`.

---

## Code Structure

- `enums/`: Enumerations.
- `models/`: Data models (Match, Player, Ball, etc.).
- `observers/`: Observer pattern implementations.
- `state/`: State pattern implementations.
- `strategy/`: Strategy pattern implementations.
- `repositories/`: Simple in-memory storage.
- `managers/`: Helper managers (Commentary).
- `CricInfoService.ts`: Main service class.
- `main.ts`: Demo application.

---

## Running the Demo

To run the demo, ensure you have `ts-node` installed, or compile with `tsc`.

```bash
npx ts-node main.ts
```
