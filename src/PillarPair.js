var PillarPair = cc.Node.extend({
    ctor: function() {
	      this._super();
        this.topPillar = cc.Sprite.create( 'res/images/pillar-top.png' );
        this.topPillar.setAnchorPoint( new cc.Point( 0.5, 0 ) );
        this.topPillar.setPosition( new cc.Point( 0, 100 ) );
        this.addChild( this.topPillar );
        this.bottomPillar = cc.Sprite.create( 'res/images/pillar-bottom.png' );
        this.bottomPillar.setAnchorPoint( new cc.Point( 0.5, 1 ) );
        this.bottomPillar.setPosition( new cc.Point( 0, -100 ) );
        this.addChild( this.bottomPillar );
    },

    update: function( dt ) {
        if( this.getPositionX() < 0 ) {
            this.randomPositionY();
            this.setPositionX( 800 );
        } else {
            this.setPositionX( this.getPositionX() - 5 );
        }
    },

    randomPositionY: function() {
        this.setPositionY( (Math.random()*300) + 200 );
    },

    hit: function( player ) {
        var playerPos = player.getPosition();
        var myPos = this.getPosition();
        return checkPlayerPillarCollision( playerPos.x, playerPos.y, myPos.x, myPos.y );
    }
});
