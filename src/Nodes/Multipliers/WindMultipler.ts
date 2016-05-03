/// <reference path="./Multiplier.ts"/>

module BattleMonsters.Nodes.Multipliers {
    export class WindMultiplier extends Multiplier {

        constructor(multiplier: number) {
            super(
                multiplier,
                "Wind Multiplier",
                "WIND"
            );
        }
    }
}
