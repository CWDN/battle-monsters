/// <reference path="./Multiplier.ts"/>

module BattleMonsters.Nodes.Multipliers {
    export class FireMultiplier extends Multiplier {

        constructor(multiplier: number) {
            super(
                multiplier,
                "Fire Multiplier",
                "FIRE"
            );
        }
    }
}
