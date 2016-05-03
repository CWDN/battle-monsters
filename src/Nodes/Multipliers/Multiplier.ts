module BattleMonsters.Nodes.Multipliers {
    export class Multiplier extends Kiwi.Plugins.DamagePipeline.PipelineNode {

        multiplier: number;

        constructor(multiplier: number, name: string, tags: any) {
            super({
                name: name,
                tags: tags
            });

            this.multiplier = multiplier;
        }

        _operate(pack: Kiwi.Plugins.DamagePipeline.Pack) {
            pack.value *= this.multiplier;
            return pack;
        }
    }
}
