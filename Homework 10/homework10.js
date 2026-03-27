var redColor = 123;
var greenColor = 39;
var blueColor = 21;

var x = 100;
var y = 200;
var diameter = 50;
var speed = .5;

var x2 = 300;
var y2 = 300;
var diameter2 = 50;
var speed2 = 3;

var x3 = 400;
var y3 = 100;
var diameter3 = 50;
var speedY3 = 1.5;

var x4 = 500;
var y4 = 500;
var diameter4 = 50;
var speedY4 = 5;

var x5 = 600;
var y5 = 400;
var diameter5 = 50;
var speedX5 = 2;
var speedY5 = 2;

var titleBaseSize = 20;
var titleAmplitude = 80;
var titleSpeed = 0.05;

 // this function is called only once
function setup()
{

    createCanvas(800,600);
}
/* this function is called continuously
    while the sketch is open in the browser
*/
function draw()
{
    background(redColor,greenColor,blueColor);
    textAlign(CENTER);
    textSize(titleBaseSize + titleAmplitude * sin(frameCount * titleSpeed));
    text("Self-Portrait", width/2, 100
    );
    circle(x,y,diameter);
    x += speed;
    if (x > width - diameter/2 || x < diameter/2) {
        speed = -speed;
    }

    rect(x2 - diameter2/2, y2 - diameter2/2, diameter2, diameter2);
    x2 += speed2;
    if (x2 > width - diameter2/2 || x2 < diameter2/2) {
        speed2 = -speed2;
    }

    circle(x3, y3, diameter3);
    y3 += speedY3;
    if (y3 > height - diameter3/2 || y3 < diameter3/2) {
        speedY3 = -speedY3;
    }

    rect(x4 - diameter4/2, y4 - diameter4/2, diameter4, diameter4);
    y4 += speedY4;
    if (y4 > height - diameter4/2 || y4 < diameter4/2) {
        speedY4 = -speedY4;
    }
    circle(x5, y5, diameter5);
    x5 += speedX5;
    y5 += speedY5;
    if (x5 > width - diameter5/2 || x5 < diameter5/2) {
        speedX5 = -speedX5;
    }
    if (y5 > height - diameter5/2 || y5 < diameter5/2) {
        speedY5 = -speedY5;
    }
}