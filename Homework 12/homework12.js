var redColor = 123;
var greenColor = 39;
var blueColor = 21;

// Player variables
var playerX = 0;
var playerY = 0;
var playerSize = 0;
var playerSpeed = 0;

function createPlayer(startX, startY, size, speed) {
    playerX = startX;
    playerY = startY;
    playerSize = size;
    playerSpeed = speed;
}
function updatePlayerMovement() {
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        playerX -= playerSpeed;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        playerX += playerSpeed;
    }
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
        playerY -= playerSpeed;
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        playerY += playerSpeed;
    }
}
//Border function
function drawBorders(borderThickness) {
    noFill();
    stroke(39, 100, 39);
    strokeWeight(borderThickness);
    rect(borderThickness / 2, borderThickness / 2, width - borderThickness, height - borderThickness);
    strokeWeight(1);
}

// Obstacle 1
var obs1X = 300;
var obs1Y = 300;
var obs1Size = 50;
var obs1SpeedX = 2;
var obs1SpeedY = 1.5;

// Obstacle 2
var obs2X = 400;
var obs2Y = 100;
var obs2Size = 40;
var obs2SpeedX = -1;
var obs2SpeedY = 2;

// Obstacle 3
var obs3X = 500;
var obs3Y = 500;
var obs3Size = 60;
var obs3SpeedX = 1.5;
var obs3SpeedY = -2;

// Static obstacle added by mouse click
var staticObsX = -100; // Off-screen initially
var staticObsY = -100;
var staticObsSize = 35;

// Exit
var exitX = 700;
var exitY = 500;
var exitSize = 50;

// Game state
var won = false;

 // this function is called only once
function setup()
{
    createCanvas(800,600);
    createPlayer(100, 200, 30, 5);
}

/* this function is called continuously
    while the sketch is open in the browser
*/
function draw()
{
    background(redColor,greenColor,blueColor);
    drawBorders(10);

    if (!won) {
        // Move player with keyboard
        updatePlayerMovement();

        // Keep player on screen (wrap around)
        if (playerX > width) {
            playerX = 0;
        } else if (playerX < 0) {
            playerX = width;
        }
        if (playerY > height) {
            playerY = 0;
        } else if (playerY < 0) {
            playerY = height;
        }

        // Draw player
        fill(0, 255, 0); // Green player
        circle(playerX, playerY, playerSize);

        // Move obstacles randomly and wrap around
        obs1X += obs1SpeedX + random(-0.5, 0.5);
        obs1Y += obs1SpeedY + random(-0.5, 0.5);
        if (obs1X > width) obs1X = 0;
        else if (obs1X < 0) obs1X = width;
        if (obs1Y > height) obs1Y = 0;
        else if (obs1Y < 0) obs1Y = height;

        obs2X += obs2SpeedX + random(-0.5, 0.5);
        obs2Y += obs2SpeedY + random(-0.5, 0.5);
        if (obs2X > width) obs2X = 0;
        else if (obs2X < 0) obs2X = width;
        if (obs2Y > height) obs2Y = 0;
        else if (obs2Y < 0) obs2Y = height;

        obs3X += obs3SpeedX + random(-0.5, 0.5);
        obs3Y += obs3SpeedY + random(-0.5, 0.5);
        if (obs3X > width) obs3X = 0;
        else if (obs3X < 0) obs3X = width;
        if (obs3Y > height) obs3Y = 0;
        else if (obs3Y < 0) obs3Y = height;

        // Draw obstacles
        fill(255, 0, 0); // Red obstacle 1
        circle(obs1X, obs1Y, obs1Size);

        fill(0, 0, 255); // Blue obstacle 2
        rect(obs2X - obs2Size/2, obs2Y - obs2Size/2, obs2Size, obs2Size);

        fill(255, 255, 0); // Yellow obstacle 3
        circle(obs3X, obs3Y, obs3Size);

        // Draw static obstacle if added
        if (staticObsX >= 0 && staticObsY >= 0) {
            fill(255, 0, 255); // Magenta static obstacle
            rect(staticObsX - staticObsSize/2, staticObsY - staticObsSize/2, staticObsSize, staticObsSize);
        }

        // Draw exit
        fill(0, 255, 255); // Cyan exit
        rect(exitX - exitSize/2, exitY - exitSize/2, exitSize, exitSize);

        // Check win condition (using logical operators)
        if (playerX > exitX - exitSize/2 && playerX < exitX + exitSize/2 &&
            playerY > exitY - exitSize/2 && playerY < exitY + exitSize/2) {
            won = true;
        }
    } else {
        // Win message
        textAlign(CENTER);
        textSize(50);
        fill(0, 255, 0);
        text("You Won!", width/2, height/2);
    }
}

function mousePressed() {
    // Add static obstacle at mouse position
    staticObsX = mouseX;
    staticObsY = mouseY;
}