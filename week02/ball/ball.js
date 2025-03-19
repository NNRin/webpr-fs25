
const radius = 10;
const ball = {x:20, y:10, dx: 5, dy: 1};
let ballSpeed = {x:0, y:0}


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

        // handle ball is hitting the bounds
        if(ball.x > 400 || ball.x < 0){
            ballSpeed.x *= -1;
        }
        if(ball.y > 400 || ball.y < 0){
            ballSpeed.y *= -1;
            ball.y = 400;
        }

        // increase vertical velocity if falling
        if(ballSpeed.y > 2){
            ballSpeed.y *= 1.15;
        } else if(ballSpeed.y < -2) {
            ballSpeed.y /= 1.26;
        }else{
            if (ballSpeed.y < -0.5) {
                ballSpeed.y /= 5;
            }else if (ballSpeed.y < 0.01){
                ballSpeed.y = 0.02;
            } else {
                ballSpeed.y *= 5;
            }
        }

        // decrease vertical velocity if rising
        if(ballSpeed.y > 35){
            ballSpeed.y = 35;
        }

        ball.x += ballSpeed.x;
        ball.y += ballSpeed.y;



}

function display(context) {
    //fill canvas
    context.fillStyle = "blue";
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawBall(context)
}

function drawBall(context) {
    context.fillStyle = "yellow";
    context.beginPath();
    context.arc(ball.x, ball.y, radius, 0, 6.3, false);
    context.fill();
}



