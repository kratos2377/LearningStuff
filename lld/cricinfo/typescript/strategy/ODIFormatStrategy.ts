import { MatchFormatStrategy } from "./MatchFormatStrategy";

export class ODIFormatStrategy implements MatchFormatStrategy {
    public getTotalInnings(): number {
        return 2;
    }

    public getTotalOvers(): number {
        return 50;
    }

    public getFormatName(): string {
        return "ODI";
    }
}
