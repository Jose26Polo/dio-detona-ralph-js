const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        score: document.querySelector("#score"),
        timeLeft: document.querySelector("#time-left")
    },
    values: {

       hitPosition: 0,
       scorePoints: 0,
       curretTime: 60,
    },
    actions: {
       timerId: setInterval(randomSquare, 1000), 
       countDownTimerId: setInterval(countDown, 1000),
    }
};

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert ("Game Over! Sua pontuação foi: " + state.values.scorePoints);
    }
}

function playSound() {
    let audio = new Audio("./src/sounds/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    })
    let randoNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randoNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
        
            if (square.id === state.values.hitPosition) {
                state.values.scorePoints ++;
                state.view.score.textContent = state.values.scorePoints;
                state.values.hitPosition = null;
                playSound();
            } 
        })
    });
}
function init() {
    addListenerHitBox();
}

init();
