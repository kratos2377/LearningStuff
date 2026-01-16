import { Player } from "../models/Player";

export class PlayerRepository {
    private players: Map<string, Player>;

    constructor() {
        this.players = new Map<string, Player>();
    }

    public save(player: Player): void {
        this.players.set(player.getId(), player);
    }

    public findById(id: string): Player | undefined {
        return this.players.get(id);
    }
}
