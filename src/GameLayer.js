var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.player = new Player();
        this.player.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( this.player, 1 );
        this.addKeyboardHandlers();
        this.state = GameLayer.STATES.FRONT;
        this.player.scheduleUpdate();
        this.scheduleUpdate();
        return true;
    },

    update: function( dt ) {
        if ( this.state == GameLayer.STATES.STARTED ) {
            if ( this.pillarPair && this.pillarPair.hit( this.player ) ) {
                this.endGame();
                this.state = GameLayer.STATES.DEAD;
            }
            if ( this.pillarPair2 && this.pillarPair2.hit( this.player ) ) {
                this.endGame();
                this.state = GameLayer.STATES.DEAD;
            }
            if ( this.pillarPair3 && this.pillarPair3.hit( this.player ) ) {
                this.endGame();
                this.state = GameLayer.STATES.DEAD;
            }
        }
    },

    createPillarPair: function() {
        this.pillarPair = new PillarPair();
        this.pillarPair.setPosition( new cc.Point( 800, 300 ) );
        this.addChild( this.pillarPair );
        this.pillarPair2 = new PillarPair();
        this.pillarPair2.setPosition( new cc.Point( 1050, 300 ) );
        this.addChild( this.pillarPair2 );
        this.pillarPair3 = new PillarPair();
        this.pillarPair3.setPosition( new cc.Point( 1300, 300 ) );
        this.addChild( this.pillarPair3 );
        this.pillarPair.scheduleUpdate();
        this.pillarPair2.scheduleUpdate();
        this.pillarPair3.scheduleUpdate();
    },

    addKeyboardHandlers: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed : function( keyCode, event ) {
                self.onKeyDown( keyCode, event );
            },
            onKeyReleased: function( keyCode, event ) {
                self.onKeyUp( keyCode, event );
            }
        }, this);

    },

    onKeyDown: function( keyCode, event ) {
        if ( this.state == GameLayer.STATES.FRONT || this.state == GameLayer.STATES.DEAD ) {
            this.startGame();
            this.state = GameLayer.STATES.STARTED;
        } else if ( this.state == GameLayer.STATES.STARTED ) {
            this.player.jump();
        }
    },

    startGame: function() {
        this.removeChild(this.pillarPair);
        this.removeChild(this.pillarPair2);
        this.removeChild(this.pillarPair3);
        this.createPillarPair();
        this.player.setPositionY( screenHeight / 2 )
        this.player.start();
        this.player.jump();
    },

    endGame: function() {
        this.player.stop();
        if ( this.pillarPair ) {
            this.pillarPair.unscheduleUpdate();
        }
        if ( this.pillarPair2 ) {
            this.pillarPair2.unscheduleUpdate();
        }
        if ( this.pillarPair3 ) {
            this.pillarPair3.unscheduleUpdate();
        }

        console.log('end game');
    },

    onKeyUp: function( keyCode, event ) {
    }
});

GameLayer.STATES = {
    FRONT: 1,
    STARTED: 2,
    DEAD: 3
};

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});
