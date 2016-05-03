module BattleMonsters.Entities {
    export class TileEntity extends Kiwi.GameObjects.Sprite {
        /**
         * Speed of the Actor.
         *
         * @type {number}
         */
        public speed: number = 225;

        /**
         * Next X Pos which is the actual X position.
         *
         * @type {number}
         */
        private nextXPos: number = 0;

        /**
         * Next Y Pos which is the actual Y position.
         *
         * @type {number}
         */
        private nextYPos: number = 0;

        /**
         * Previous dx (velocity)
         *
         * @type {number}
         */
        private prevDx: number = 0;

        /**
         * Previous dy (velocity)
         *
         * @type {number}
         */
        private prevDy: number = 0;

        /**
         * Current X velocity
         *
         * @type {number}
         */
        public dx : number = 0;

        /**
         * Current Y velocity
         *
         * @type {number}
         */
        public dy : number = 0;

        constructor(state : Kiwi.State, texture : Kiwi.Textures.SpriteSheet, x, y) {
            super(state, texture, x, y);
            this.nextXPos = x;
            this.nextYPos = y;

            this.components.add(
                new BattleMonsters.Components.KeyboardMovement(this, 'KeyboardMovement')
            );
        }

        public update() {
            super.update();
            var delta : number = this.game.time.delta();

            // run emulated update
            var xChange = this.prevDx * (delta / 1000);
            var yChange = this.prevDy * (delta / 1000);
            this.nextXPos += xChange;
            this.nextYPos += yChange;

            /*
             * X Movement
             */
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
                        this.idle();
                    } else {
                        this.x = this.nextXPos;
                    }
                } else {
                    this.idle();
                    this.prevDx = 0;
                }
            }

            /*
             * Y Movement
             */
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
                        this.idle();
                    } else {
                        this.y = this.nextYPos;
                    }
                } else {
                    this.prevDy = 0;
                    this.idle();
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
        }

        /**
         * Moves the actor upwards.
         *
         * @return {void}
         */
        public moveUp() {
            this.resetHorizontalMovement();
            this.playAnimation('up');

            if (this.prevDx === 0) {
                this.dy = -this.speed;
            }
        }

        /**
         * Moves the actor downwards.
         *
         * @return {void}
         */
        public moveDown() {
            this.resetHorizontalMovement();
            this.playAnimation('down');

            if (this.prevDx === 0) {
                this.dy = this.speed;
            }
        }

        /**
         * Moves the actor right
         *
         * @return {void}
         */
        public moveRight() {
            this.resetVerticalMovement();
            this.playAnimation('right');

            if (this.prevDy === 0) {
                this.dx = this.speed;
            }
        }

        /**
         * Moves the actor left.
         *
         * @return {void}
         */
        public moveLeft() {
            this.resetVerticalMovement();
            this.playAnimation('left');

            if (this.prevDy === 0) {
                this.dx = -this.speed;
            }
        }

        public idle() {
            this.playAnimation('idle');
        }

        /**
         * Resets the velocity of the vertical movement.
         *
         * @return {void}
         */
        public resetVerticalMovement() {
            this.dy = 0;
        }

        /**
         * Resets the velocity of the horizontal movement.
         *
         * @return {void}
         */
        public resetHorizontalMovement() {
            this.dx = 0;
        }

        public playAnimation(name : string) {
            this.animation.play(name, false);
        }
    }
}
