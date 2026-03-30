let playerOInput = document.querySelector("#player1");
let playerXInput = document.querySelector("#player2");
let turnMsg = document.querySelector("#turn-msg");

let playerO = "Player O";
let playerX = "Player X";

turnMsg.innerText = `${playerO}'s Turn`;


let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGamebutton = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg")
let playerContainer = document.querySelector("#player-container");

let turnO = true;  //PLAYER X OR Y

const checkAndHideInput = () => {
    if(playerOInput.value.trim() !== "" && playerXInput.value.trim() !== ""){
        playerO = playerOInput.value;
        playerX = playerXInput.value;
        playerContainer.style.display = "none";
        turnMsg.innerText = `${playerO}'s Turn`;
    }
};

playerOInput.addEventListener("change",()=>{
    playerO = playerOInput.value || "Player O";
    checkAndHideInput();
});

playerXInput.addEventListener("change", () => {
    playerX = playerXInput.value || "Player X";
    checkAndHideInput();
});

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let buttonClickedCount = 0;

const hideName = () => {
    playerOInput.value = "";
    playerXInput.value = "";
}

const gameOver = () => {
    msg.innerText = "Match is a Tie";
    msgContainer.classList.remove("hide");
    hideName();
    disableBoxes();
}

boxes.forEach((box)=>{
    box.addEventListener("click",() =>{
        buttonClickedCount++;
        
        console.log("box is clicked");
        if(turnO)
        {
            box.innerText = "O";
            turnO = false;
            turnMsg.innerText = `${playerX}'s Turn`;
        }
        else{
            box.innerText = "X";
            turnO=true;
            turnMsg.innerText = `${playerO}'s Turn`;
        }
        box.disabled = true;
        
        let isWinner = checkWinner();

        if(buttonClickedCount === 9 && !isWinner)
            {
                gameOver();
            }
    });
});

const disableBoxes = () => {
    for(let box of boxes)
    {
        box.disabled = true;
    }
}

const enableboxes = () => {
    for(let box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
    }
}


const showWinner = (winner)=>{
    let winnerName = winner === "O" ? playerO : playerX;
    msg.innerText = `Congratulations,Winner is ${winnerName}`;
    msgContainer.classList.remove("hide");
};

const checkWinner = () => {
    for(let pattern of winPatterns)
    {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "")
        {
            if(pos1Val === pos2Val && pos2Val === pos3Val)
            {
                //Got the winner
                showWinner(pos1Val);
                disableBoxes();
                return true;
            }
        }
    }
    return false;
    
};

const resetGame = () => {
    buttonClickedCount = 0;
    turnO = true;
    enableboxes();
    turnMsg.innerText = `${playerO}'s Turn`;
    msgContainer.classList.add("hide");
    playerContainer.style.display = "block";
    hideName();

    //Reset to Default Names
    playerO = "Player O";
    playerX = "Player X";
    turnMsg.innerText = `${playerO}'s Turn`
};

newGamebutton.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

