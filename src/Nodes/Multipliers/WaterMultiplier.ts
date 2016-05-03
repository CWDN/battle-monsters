/// <reference path="./Multiplier.ts"/>

module BattleMonsters.Nodes.Multipliers {
    export class WaterMultiplier extends Multiplier {

        constructor(multiplier: number) {
            super(
                multiplier,
                "Water Multiplier",
                "WATER"
            );
        }
    }
}
