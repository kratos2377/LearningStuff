import { Color } from "../enum/Color";

export class Player {
    private name: string;
    private color: Color;
    private isWhiteSide: boolean;

    constructor(name: string, color: Color) {
        this.name = name;
        this.color = color;
        this.isWhiteSide = color === Color.WHITE;
    }

    public getColor(): Color {
        return this.color;
    }

    public isWhite(): boolean {
        return this.isWhiteSide;
    }

    public getName(): string {
        return this.name;
    }
}
