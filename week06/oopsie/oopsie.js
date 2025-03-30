// create a proper Player construction with
// state:
//   fallbackIndex = 0 // place to fall back on oopsie
//   progressIndex = 0 // place having been proceeding to
// and functions:
//   proceed(stride) // proceed so many places
//   fallback()      // "oopsie": go back to last start (fallback position)
//   turn()          // cash in your win, update fallback position for next turn
//
const goal = 99;

function Player(c) {
    return {
        fallbackIndex : 0,
        progressIndex : 0,
        color: c,

        getColor : function(){
            return this.color},
        getFallbackIndex : function() {return this.fallbackIndex},
        getProgressIndex : function() {return this.progressIndex},
        proceed : function(stride){this.progressIndex += stride},
        fallback : function(){this.progressIndex = this.fallbackIndex},
        turn : function(){this.fallbackIndex = this.progressIndex},
    }
}

function GameState() {
    return {
        activePlayer : player1,
        endmsg: "game over, press f5 to restart",
        gameOver: false,

        switchTurn : function() {
            if (this.activePlayer === player1) {
                this.activePlayer = player2;
            } else {
                this.activePlayer = player1;
            }
        },
        getPlayer: function (){return this.activePlayer},
        endGame: function(){this.gameOver = true},
    }
}
player1 = Player("blue");
player2 = Player("red");

gameState = GameState();


function start() {
    const fields = document.getElementById('fields');

    for (let i = 0; i < 100; i++) {
        const field = document.createElement("DIV");
        field.setAttribute("ID", "FIELD-"+i);
        field.textContent = " ";
        fields.appendChild(field);
    }
    display();
}

function dice() {
    if (gameState.gameOver == true) {
        return;
    }
    const stride                              = Math.round(1 + Math.random() * 5);
    document.getElementById('dice').innerText = ""+ stride;
    let currentPlayer = gameState.getPlayer(); // Cache the current player

    if (stride === 3) {
        currentPlayer.fallback();
        //gameState.switchTurn(); // Move switchTurn after the winner check
    } else {
        currentPlayer.proceed(stride);
    }

    if (currentPlayer.getProgressIndex() >= goal) {
        declareWinner(currentPlayer);
    }

    if (stride === 3){
        gameState.switchTurn();
    }
    display();
}

function turn() {
    if (gameState.gameOver == true) {
        return;
    }
    gameState.getPlayer().turn();
    gameState.switchTurn()
    display();
}

function display() {
    for (let i = 0; i < 100; i++) {
        const field = document.getElementById("FIELD-" + i);
        field.setAttribute("CLASS", "field");
    }

    if (player1.fallbackIndex === player2.fallbackIndex && player1.getProgressIndex() === player2.getProgressIndex()) {
        let fallbackField = document.getElementById("FIELD-" + player1.getFallbackIndex());
        fallbackField.setAttribute("CLASS", "field bothOnPos");
    }else {
        const fallbackField = document.getElementById("FIELD-" + player1.getFallbackIndex());
        fallbackField.setAttribute("CLASS", "field fallback");
        const progressField = document.getElementById("FIELD-" + player1.getProgressIndex());
        progressField.setAttribute("CLASS", "field progress");
        const fallbackField1 = document.getElementById("FIELD-" + player2.getFallbackIndex());
        fallbackField1.setAttribute("CLASS", "field fallbackInactive");
        const progressField1 = document.getElementById("FIELD-" + player2.getProgressIndex());
        progressField1.setAttribute("CLASS", "field progressInactive");
    }
}

function declareWinner(winner) {
    document.getElementById('goal').innerText = "winner "+ winner.getColor() + " " + gameState.endmsg;
    gameState.endGame();
}

