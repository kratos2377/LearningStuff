import { Player } from "./Player";

export class Team {
    private id: string;
    private name: string;
    private players: Player[];

    constructor(id: string, name: string, players: Player[]) {
        this.id = id;
        this.name = name;
        this.players = players;
    }

    public getName(): string {
        return this.name;
    }

    public getPlayers(): Player[] {
        return this.players;
    }
}
