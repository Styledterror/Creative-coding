var redColor = 123;
var greenColor = 39;
var blueColor = 21;

// Player variables
var playerX = 100;
var playerY = 200;
var playerSize = 30;
var playerSpeed = 5;

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
}

/* this function is called continuously
    while the sketch is open in the browser
*/
function draw()
{
    background(redColor,greenColor,blueColor);

    if (!won) {
        // Move player with keyboard
        if (keyIsPressed) {
            if (keyCode === LEFT_ARROW || key === 'a' || key === 'A') {
                playerX -= playerSpeed;
            } else if (keyCode === RIGHT_ARROW || key === 'd' || key === 'D') {
                playerX += playerSpeed;
            } else if (keyCode === UP_ARROW || key === 'w' || key === 'W') {
                playerY -= playerSpeed;
            } else if (keyCode === DOWN_ARROW || key === 's' || key === 'S') {
                playerY += playerSpeed;
            }
        }

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