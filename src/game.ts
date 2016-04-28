/// <reference path="../lib/kiwi.js/build/kiwi.d.ts"/>
/// <reference path="./States/Intro.ts"/>
/// <reference path="./States/Loading.ts"/>
/// <reference path="./States/Play.ts"/>

var gameOptions = {
  renderer: Kiwi.RENDERER_WEBGL,
  width: window.innerWidth,
  height: window.innerHeight,
  debug: Kiwi.DEBUG_OFF
}

var game = new Kiwi.Game('content', 'BattleMonsters', null, gameOptions);

//Add all the States we are going to use.
game.states.addState(BattleMonsters.States.Loading);
game.states.addState(BattleMonsters.States.Intro);
game.states.addState(BattleMonsters.States.Play);

game.states.switchState("Loading");
