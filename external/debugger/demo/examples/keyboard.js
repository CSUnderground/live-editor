// Use the arrow keys to move the red circle
// click on the canvas for keyboard focus

var x = 200;
var y = 200;
var vx = 0;
var vy = 0;

draw = function() {
    background(255);
    fill(255, 0, 0);
    ellipse(x, y, 60, 60);
    x += vx;
    y += vy;
};

var speed = 5;

keyPressed = function() {
    if (keyCode === LEFT) {
        vx = -speed;
    }
    if (keyCode === RIGHT) {
        vx = speed;
    }
    if (keyCode === UP) {
        vy = -speed
    }
    if (keyCode === DOWN) {
        vy = speed;
    }
};

keyReleased = function() {
    if (keyCode === LEFT) {
        vx = 0;
    }
    if (keyCode === RIGHT) {
        vx = 0;
    }
    if (keyCode === UP) {
        vy = 0;
    }
    if (keyCode === DOWN) {
        vy = 0;
    }
};
