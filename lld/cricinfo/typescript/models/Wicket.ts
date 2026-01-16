import { WicketType } from "../enums/WicketType";
import { Player } from "./Player";

export class Wicket {
    private wicketType: WicketType;
    private playerOut: Player;
    private caughtBy?: Player;
    private runoutBy?: Player;

    constructor(wicketType: WicketType, playerOut: Player, caughtBy?: Player, runoutBy?: Player) {
        this.wicketType = wicketType;
        this.playerOut = playerOut;
        this.caughtBy = caughtBy;
        this.runoutBy = runoutBy;
    }

    public getWicketType(): WicketType {
        return this.wicketType;
    }

    public getPlayerOut(): Player {
        return this.playerOut;
    }

    public getCaughtBy(): Player | undefined {
        return this.caughtBy;
    }

    public getRunoutBy(): Player | undefined {
        return this.runoutBy;
    }
}
