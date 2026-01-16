import { PlayerRole } from "../enums/PlayerRole";
import { PlayerStats } from "./PlayerStats";

export class Player {
    private id: string;
    private name: string;
    private role: PlayerRole;
    private stats: PlayerStats;

    constructor(id: string, name: string, role: PlayerRole) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.stats = new PlayerStats();
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getStats(): PlayerStats {
        return this.stats;
    }
}
