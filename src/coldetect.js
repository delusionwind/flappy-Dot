var checkPlayerPillarCollision = function( playerX, playerY, pillarX, pillarY ) {
    if ( playerX + 20 > pillarX - 26 && playerX - 20 < pillarX + 26 && (playerY + 20 > pillarY + 100 || playerY - 20 < pillarY - 100)) {
       return true;
    } else {
       return false;
    }
};
