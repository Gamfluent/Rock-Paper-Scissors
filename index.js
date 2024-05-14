let gameState = "start";
let winner = "";
let playerMove = "";
let robotMove = "";

let gameStateDisplay = document.getElementById('state-display');

let audio = new Audio('Cat Laughing At You.mp3');
let lostImage = document.getElementById("lost");

audio.addEventListener('ended', function() {
    setTimeout(() => {
        lostImage.style.display = 'none';
    }, 1000)
});

const RobotMove = () => {
    gameStateDisplay.innerHTML = 'Robot is thinking...'

    let random = Math.floor(Math.random() * 3);
    console.log(random);

    robotMove = 'paper';

    /* if (random === 0) {
        robotMove = "rock";
    } else if (random === 1) {
        robotMove = "paper";
    } else {
        robotMove = "scissors";
    } */
    
    gameStateDisplay.innerHTML = "Robot is thinking...";

    setTimeout(() => {
        gameStateDisplay.innerHTML = `Robot chose: ${robotMove}`;

        setTimeout(() => {
            DetermineWinner();

            setTimeout(() => {
                const buttons = document.querySelectorAll("button");

                buttons.forEach(button => {
                    button.disabled = false;
                }); 
            }, 1000)
        }, 1000)
    }, 2000)

}

const controlButtons = (input) => {
    const buttons = document.querySelectorAll("button");

    switch(input){
        case "enable":
            console.log("Enabled Buttons")
            buttons.forEach(button => {
                button.disabled = true;
            });

        case "disable":
            console.log("Disabled Buttons")
            buttons.forEach(button => {
                button.disabled = false;
            });
    }
}

const PlayerMove = (move) => {
    playerMove = move;
    console.log(playerMove);

     const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.disabled = true;
    }); 

    RobotMove();
}

const lost = () => {
    gameStateDisplay.innerHTML = "You Lost";
    audio.play()
    lostImage.style.display = 'block';

    PlayIncreaseAnimation();

    /* lostImage.classList.add('increase');
    setTimeout(() => {
        lostImage.classList.remove('increase');
    }, 500);  */
}

const PlayIncreaseAnimation = () => {
    let currentWidth = lostImage.offsetWidth;
    let currentHeight = lostImage.offsetHeight;

    let targetWidth = currentWidth * 1.5;
    let targetHeight = currentHeight * 1.5;

    lostImage.style.transition = 'width 0.5s, height 0.5s';
    lostImage.style.width = targetWidth + 'px';
    lostImage.style.height = targetHeight + 'px';

    setTimeout(() => {
        lostImage.style.transition = 'none';
        lostImage.style.width = currentWidth + 'px';
        lostImage.style.height = currentHeight + 'px';
    }, 500);
}

const DetermineWinner = () => {
    console.log(robotMove, playerMove);
    
    if (playerMove == robotMove){
        gameStateDisplay.innerHTML = "Its a TIE!";
    } else {
        switch(playerMove){
            case "rock":
                (robotMove === "scissors") ? gameStateDisplay.innerHTML = "you win :|" : lost()
                break;

            case "paper":
                (robotMove === "rock") ? gameStateDisplay.innerHTML = "you win :|" : lost()
                break;

            case "scissors":
                (robotMove === "paper") ? gameStateDisplay.innerHTML = "you win :|" : lost()
                break;
        }
    }
}
