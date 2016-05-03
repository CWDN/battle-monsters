/// <reference path="./Multiplier.ts"/>

module BattleMonsters.Nodes.Multipliers {
    export class EarthMultiplier extends Multiplier {

        constructor(multiplier: number) {
            super(
                multiplier,
                "Earth Multiplier",
                "EARTH"
            );
        }
    }
}
