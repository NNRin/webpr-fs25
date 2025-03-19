
const radius = 10;
const ball = {x:20, y:10, dx: 5, dy: 1};
let ballSpeed = {x:0, y:0}
let lastHeight = [];
let running = true;
let lastPositions = [];
const maxTrackedPastPositions = 50;


function start() {
    const canvas  = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    context.fillStyle = "black";

    initializeSpeed();

    setInterval(() => {
        nextBoard();
        display(context);
    }, 1000 / 20);
}

function initializeSpeed() {
    ballSpeed.x = Math.random() * 4.75;
    ballSpeed.y = Math.random() * 7.5;
}

function nextBoard() {
    if(running) {
        // handle ball is hitting the bounds
        if (ball.x > 400 || ball.x < 0) {
            ballSpeed.x *= -1;
        }
        if (ball.y > 400 || ball.y < 0) {
            ballSpeed.y *= -1;
            ball.y = 400;
        }

        // increase vertical velocity if falling
        if (ballSpeed.y > 2) {
            ballSpeed.y *= 1.15;
        } else if (ballSpeed.y < -2) {
            ballSpeed.y /= 1.26;
        } else {
            if (ballSpeed.y < -0.5) {
                ballSpeed.y /= 5;
            } else if (ballSpeed.y < 0.01) {
                ballSpeed.y = 0.02;
            } else {
                ballSpeed.y *= 5;
            }
        }

        // decrease vertical velocity if rising
        if (ballSpeed.y > 35) {
            ballSpeed.y = 35;
        }

        saveCurrentPosToArr();

        ball.x += ballSpeed.x;
        ball.y += ballSpeed.y;


        // save last 10 heights to prevent infinite bouncing
        lastHeight.unshift(400 - ball.y)
        if(lastHeight.length > 10){
            lastHeight.pop()
        }

        //if last 10 heights haven't been further apart than 5px we stop the bouncing.
        let cumulativeVal = lastHeight.reduce((p, c) => p + c, 0);
        if(cumulativeVal < 42){
            running = false;
        }
    }

}

function saveCurrentPosToArr(){
    lastPositions.unshift({ // important to copy object, not just copy reference...
        x: ball.x,
        y: ball.y,
    });

}

function display(context) {
    //fill canvas
    context.fillStyle = "blue";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawPastBalls(context);
    drawBall(context)
}

function drawBall(context) {
    context.globalAlpha = 1;
    context.fillStyle = "black";
    context.beginPath();
    context.arc(ball.x, ball.y, radius, 0, 6.3, false);
    context.fill();
}

function drawPastBalls(context) {
    context.fillStyle = "white";
    let opacityCnt = 0.3;
    let opacityStepper = opacityCnt / maxTrackedPastPositions + 1;
    lastPositions.forEach(p => {
        context.globalAlpha = opacityCnt;
        opacityCnt -= opacityStepper;
        context.beginPath();
        context.arc(p.x, p.y, radius, 0, 6.3, false);
        context.fill();
    }
    );
}



