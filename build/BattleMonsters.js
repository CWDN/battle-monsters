var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BattleMonsters;
(function (BattleMonsters) {
    var States;
    (function (States) {
        var Intro = (function (_super) {
            __extends(Intro, _super);
            function Intro() {
                _super.call(this, 'Intro');
            }
            Intro.prototype.create = function () {
                this.game.states.switchState("Play");
            };
            return Intro;
        }(Kiwi.State));
        States.Intro = Intro;
    })(States = BattleMonsters.States || (BattleMonsters.States = {}));
})(BattleMonsters || (BattleMonsters = {}));
var BattleMonsters;
(function (BattleMonsters) {
    var States;
    (function (States) {
        var Loading = (function (_super) {
            __extends(Loading, _super);
            function Loading() {
                _super.call(this, 'Loading');
            }
            Loading.prototype.preload = function () {
                _super.prototype.preload.call(this);
                this.addImage('kiwiName', 'assets/img/kiwijs-name.png');
                this.addSpriteSheet('icons', 'assets/img/kiwijs-icons.png', 100, 90);
                this.addSpriteSheet('tiles', 'assets/textures/tileset.png', 96, 96);
                this.addJSON('tilemap', 'assets/tilemaps/arena.json');
                this.addSpriteSheet('character', 'assets/textures/character.png', 96, 96);
            };
            Loading.prototype.create = function () {
                this.game.states.switchState('Play');
            };
            return Loading;
        }(Kiwi.State));
        States.Loading = Loading;
    })(States = BattleMonsters.States || (BattleMonsters.States = {}));
})(BattleMonsters || (BattleMonsters = {}));
var BattleMonsters;
(function (BattleMonsters) {
    var States;
    (function (States) {
        var Play = (function (_super) {
            __extends(Play, _super);
            function Play() {
                _super.call(this, 'Play');
            }
            Play.prototype.update = function () {
                _super.prototype.update.call(this);
            };
            Play.prototype.create = function () {
                this.tilemap = new Kiwi.GameObjects.Tilemap.TileMap(this, 'tilemap', this.textures.tiles);
                this.character = new BattleMonsters.Entities.TileEntity(this, this.textures.character, 0, 0);
                this.character.animation.add('idle', [0], 0.1, false);
                this.character.animation.add('down', [0, 1, 2, 3, 0], 0.2, false);
                this.character.animation.add('up', [12, 13, 14, 15, 12], 0.2, false);
                this.character.animation.add('left', [8, 9, 10, 11, 8], 0.2, false);
                this.character.animation.add('right', [4, 5, 6, 7, 4], 0.2, false);
                this.addChild(this.tilemap.layers[0]);
                this.addChild(this.character);
            };
            return Play;
        }(Kiwi.State));
        States.Play = Play;
    })(States = BattleMonsters.States || (BattleMonsters.States = {}));
})(BattleMonsters || (BattleMonsters = {}));
var gameOptions = {
    renderer: Kiwi.RENDERER_WEBGL,
    width: window.innerWidth,
    height: window.innerHeight,
    debug: Kiwi.DEBUG_OFF
};
var game = new Kiwi.Game('content', 'BattleMonsters', null, gameOptions);
game.states.addState(BattleMonsters.States.Loading);
game.states.addState(BattleMonsters.States.Intro);
game.states.addState(BattleMonsters.States.Play);
game.states.switchState("Loading");
var BattleMonsters;
(function (BattleMonsters) {
    var Components;
    (function (Components) {
        var KeyboardMovement = (function (_super) {
            __extends(KeyboardMovement, _super);
            function KeyboardMovement(child, name) {
                _super.call(this, child, name);
                this.leftKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.A);
                this.rightKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.D);
                this.downKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.S);
                this.upKey = this.game.input.keyboard.addKey(Kiwi.Input.Keycodes.W);
            }
            KeyboardMovement.prototype.update = function () {
                _super.prototype.update.call(this);
                var owner = this.owner;
                if (this.leftKey.isDown) {
                    owner.moveLeft();
                }
                else if (this.rightKey.isDown) {
                    owner.moveRight();
                }
                else if (this.downKey.isDown) {
                    owner.moveDown();
                }
                else if (this.upKey.isDown) {
                    owner.moveUp();
                }
                else {
                    owner.idle();
                }
            };
            return KeyboardMovement;
        }(Kiwi.Component));
        Components.KeyboardMovement = KeyboardMovement;
    })(Components = BattleMonsters.Components || (BattleMonsters.Components = {}));
})(BattleMonsters || (BattleMonsters = {}));
var BattleMonsters;
(function (BattleMonsters) {
    var Entities;
    (function (Entities) {
        var TileEntity = (function (_super) {
            __extends(TileEntity, _super);
            function TileEntity(state, texture, x, y) {
                _super.call(this, state, texture, x, y);
                this.speed = 200;
                this.nextXPos = 0;
                this.nextYPos = 0;
                this.prevDx = 0;
                this.prevDy = 0;
                this.dx = 0;
                this.dy = 0;
                this.nextXPos = x;
                this.nextYPos = y;
                this.components.add(new BattleMonsters.Components.KeyboardMovement(this, 'KeyboardMovement'));
            }
            TileEntity.prototype.update = function () {
                _super.prototype.update.call(this);
                var delta = this.game.time.delta();
                var xChange = this.prevDx * (delta / 1000);
                var yChange = this.prevDy * (delta / 1000);
                this.nextXPos += xChange;
                this.nextYPos += yChange;
                if (this.dx === 0 && this.prevDx !== 0) {
                    var progress = this.x / this.width;
                    var lowest = Math.floor(progress);
                    var leftPercentage = 1 - (progress - lowest);
                    if (this.prevDx < 0) {
                        leftPercentage = 1 - leftPercentage;
                    }
                    var left = leftPercentage * this.width;
                    if (left !== 0) {
                        if (left < Math.abs(xChange)) {
                            this.x += left * (xChange / Math.abs(xChange));
                            this.prevDx = 0;
                        }
                        else {
                            this.x = this.nextXPos;
                        }
                    }
                    else {
                        this.prevDx = 0;
                    }
                }
                if (this.dy === 0 && this.prevDy !== 0) {
                    var progress = this.y / this.width;
                    var lowest = Math.floor(progress);
                    var leftPercentage = 1 - (progress - lowest);
                    if (this.prevDy < 0) {
                        leftPercentage = 1 - leftPercentage;
                    }
                    var left = leftPercentage * this.width;
                    if (left !== 0) {
                        if (left < Math.abs(yChange)) {
                            this.y += left * (yChange / Math.abs(yChange));
                            this.prevDy = 0;
                        }
                        else {
                            this.y = this.nextYPos;
                        }
                    }
                    else {
                        this.prevDy = 0;
                    }
                }
                if (this.dx !== 0) {
                    this.prevDx = this.dx;
                }
                if (this.dy !== 0) {
                    this.prevDy = this.dy;
                }
                this.x += this.dx * (delta / 1000);
                this.y += this.dy * (delta / 1000);
                this.dx = 0;
                this.dy = 0;
            };
            TileEntity.prototype.moveUp = function () {
                this.resetHorizontalMovement();
                this.animation.play('up');
                if (this.prevDx === 0) {
                    this.dy = -this.speed;
                }
            };
            TileEntity.prototype.moveDown = function () {
                this.resetHorizontalMovement();
                this.animation.play('down');
                if (this.prevDx === 0) {
                    this.dy = this.speed;
                }
            };
            TileEntity.prototype.moveRight = function () {
                this.resetVerticalMovement();
                this.animation.play('right');
                if (this.prevDy === 0) {
                    this.dx = this.speed;
                }
            };
            TileEntity.prototype.moveLeft = function () {
                this.resetVerticalMovement();
                this.animation.play('left');
                if (this.prevDy === 0) {
                    this.dx = -this.speed;
                }
            };
            TileEntity.prototype.idle = function () {
                this.animation.play('idle');
            };
            TileEntity.prototype.resetVerticalMovement = function () {
                this.dy = 0;
            };
            TileEntity.prototype.resetHorizontalMovement = function () {
                this.dx = 0;
            };
            return TileEntity;
        }(Kiwi.GameObjects.Sprite));
        Entities.TileEntity = TileEntity;
    })(Entities = BattleMonsters.Entities || (BattleMonsters.Entities = {}));
})(BattleMonsters || (BattleMonsters = {}));
