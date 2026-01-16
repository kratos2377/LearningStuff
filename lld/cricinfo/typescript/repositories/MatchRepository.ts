import { Match } from "../models/Match";

export class MatchRepository {
    private matches: Map<string, Match>;

    constructor() {
        this.matches = new Map<string, Match>();
    }

    public save(match: Match): void {
        this.matches.set(match.getId(), match);
    }

    public findById(id: string): Match | undefined {
        return this.matches.get(id);
    }
}
