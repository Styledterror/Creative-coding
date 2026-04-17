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

// Obstacles array
var obstacles = [
    { x: 300, y: 300, size: 50, speedX: 2, speedY: 1.5, color: [255, 0, 0], shape: 'circle' },
    { x: 400, y: 100, size: 40, speedX: -1, speedY: 2, color: [0, 0, 255], shape: 'rect' },
    { x: 500, y: 500, size: 60, speedX: 1.5, speedY: -2, color: [255, 255, 0], shape: 'circle' }
];

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
        for (var i = 0; i < obstacles.length; i++) {
            var obs = obstacles[i];
            obs.x += obs.speedX + random(-0.5, 0.5);
            obs.y += obs.speedY + random(-0.5, 0.5);
            if (obs.x > width) obs.x = 0;
            else if (obs.x < 0) obs.x = width;
            if (obs.y > height) obs.y = 0;
            else if (obs.y < 0) obs.y = height;
        }

        // Draw obstacles
        for (var i = 0; i < obstacles.length; i++) {
            var obs = obstacles[i];
            fill(obs.color[0], obs.color[1], obs.color[2]);
            if (obs.shape === 'circle') {
                circle(obs.x, obs.y, obs.size);
            } else if (obs.shape === 'rect') {
                rect(obs.x - obs.size/2, obs.y - obs.size/2, obs.size, obs.size);
            }
        }

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