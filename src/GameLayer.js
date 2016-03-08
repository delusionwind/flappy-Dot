var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.player = new Player();
        this.player.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild( this.player, 1 );
        this.addKeyboardHandlers();
        this.pillarPair = null;
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
        }
    },

    createPillarPair: function() {
        this.pillarPair = new PillarPair();
        this.pillarPair.setPosition( new cc.Point( 800, 300 ) );
        this.addChild( this.pillarPair );
        this.pillarPair.scheduleUpdate();
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
        if ( this.state == GameLayer.STATES.FRONT ) {
            this.startGame();
            this.state = GameLayer.STATES.STARTED;
        } else if ( this.state == GameLayer.STATES.STARTED ) {
            this.player.jump();
        }
    },

    startGame: function() {
        this.createPillarPair();
        this.player.start();
        this.player.jump();
    },

    endGame: function() {
        this.player.stop();
        if ( this.pillarPair ) {
            this.pillarPair.unscheduleUpdate();
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
