/// <reference path="../lib/kiwijs/build/kiwi.d.ts"/>
/// <reference path="../plugins/DamagePipeline.d.ts"/>
/// <reference path="../plugins/PathFinding.d.ts"/>
import { Intro, Loading, Play } from './States';

var gameOptions = {
  renderer: Kiwi.RENDERER_WEBGL,
  width: window.innerWidth,
  height: window.innerHeight,
  debug: Kiwi.DEBUG_OFF,
  plugins: ['DamagePipeline', 'PathFinding']
};

var game = new Kiwi.Game('content', 'BattleMonsters', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(Loading);
game.states.addState(Intro);
game.states.addState(Play);

game.states.switchState("Loading");
