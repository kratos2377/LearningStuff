export interface MatchFormatStrategy {
    getTotalInnings(): number;
    getTotalOvers(): number;
    getFormatName(): string;
}
