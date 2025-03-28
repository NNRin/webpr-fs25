const CoordPair = x => y => fnc => fnc(x)(y);
const north = CoordPair(0)(-1);
const east  = CoordPair(1)(0);
const south = CoordPair(0)(1);
const west  = CoordPair(-1)(0);

let direction = north;

const clockwise = [north, east, south, west, north];
const countercw = [north, west, south, east, north];

const getX = x => y => x;
const getY = x => y => y;

const snake = [
    CoordPair(10)(5),
    CoordPair(10)(6),
    CoordPair(10)(7),
    CoordPair(10)(8),
];

let food = CoordPair(15)(15);

function snakeEquals(a , b) {
    return a(getX) === b(getX) && a(getY) === b(getY);
}

function changeDirection(orientation) {
    direction = orientation.at(orientation.findIndex((o) => o === direction) + 1);
}

function start() {
    const canvas  = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const rightArrow = 39;
    const leftArrow  = 37;
    window.onkeydown = evt => {
        const orientation = (evt.keyCode === rightArrow) ? clockwise : countercw;
        changeDirection(orientation);
    };

    setInterval(() => {
        nextBoard();
        display(context);
    }, 1000 / 5);
}

const rdmCordPair = CoordPair(Math.floor(Math.random() * 20))(Math.floor(Math.random() * 20))

function nextBoard() {
    const maxX = 20;
    const maxY = 20;
    const oldHead = snake[0];

    /**
     * Calculates next pos for snake head and adjusts for bounds if necessary.
     * @param x X or Y Pos of snake
     * @param max Maximum bound value
     * @returns {*|number} new X or Y Pos of snake
     */
    function inBounds(x, max) {
        if (x < 0)   { return max - 1 }
        if (x > max) { return 0 }
        return x
    }

    const head = CoordPair(inBounds(oldHead(getX) + direction(getX), maxX))
                            (inBounds(oldHead(getY) + direction(getY), maxY));



    if (snakeEquals(food, head)) {  // check for found food
        food = rdmCordPair;
    } else {
        // no food found => no growth despite new head => remove last element
        snake.pop()
    }

    snake.unshift(head); // move snake by adding a new snake body piece in front of the snake (in the moving direction)
}

function display(context) {
    // clear
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    // draw all elements
    context.fillStyle = "cyan";
    snake.forEach(element =>
        fillBox(context, element)
    );
    context.fillStyle = "green";
    fillBox(context, snake[0]);
    // draw food
    context.fillStyle = "red";
    fillBox(context, food);
}

function fillBox(context, element) {
    context.fillRect(element(getX) * 20 + 1, element(getY) * 20 + 1, 18, 18);
}


