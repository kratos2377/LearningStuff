import { MatchFormatStrategy } from "./MatchFormatStrategy";

export class T20FormatStrategy implements MatchFormatStrategy {
    public getTotalInnings(): number {
        return 2;
    }

    public getTotalOvers(): number {
        return 20;
    }

    public getFormatName(): string {
        return "T20";
    }
}
