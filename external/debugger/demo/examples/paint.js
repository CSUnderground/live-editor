background(255);

var lineWidth = 10;
var firstPress = true;
var col;

fill(0);
textSize(24);
textAlign(CENTER, CENTER);
text("draw on me", 200, 200);

strokeWeight(lineWidth);

var randomColor = function () {
    return color(random(255), random(255), random(255));
};

mousePressed = function () {
    if (firstPress) {
        background(255);
        firstPress = false;
    }
    col = randomColor();
    fill(col);
    noStroke();
    ellipse(mouseX, mouseY, lineWidth, lineWidth);
};

mouseDragged = function () {
    stroke(col);
    line(pmouseX, pmouseY, mouseX, mouseY);
};
