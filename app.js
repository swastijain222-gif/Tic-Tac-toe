let boxes = document.querySelectorAll(".box1");
let reset= document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-btn")
let msgContainer= document.querySelector(".msg-container")
let msg = document.querySelector("#msg")
let turn0 = true;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
const resetGame = ()=>{
    turn0=true;
    enableBoxes();
    msgContainer.classList.add("hide")
};
boxes.forEach((box) => {
    box.addEventListener("click", ()=>{
        if(turn0){
            box.innerText = "O";
            turn0= false;
        }
        else{
            box.innerText = "X";
            turn0= true;
        }
        box.disabled = true
        checkWinner();
    });
});

const disableBoxes= () => {
    for(let box of boxes){
        box.disabled= true;
    }
}
const enableBoxes= () => {
    for(let box of boxes){
        box.disabled= false;
        box.innerText="";
    }
}

const showWinner= (winner)=>{
msg.innerText=`congratulations! winner is ${winner}`;
msgContainer.classList.remove("hide");
disableBoxes();
}

const checkWinner = ()=> {
    let winnerFound = false;
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos1Va2 = boxes[pattern[1]].innerText;
        let pos1Va3 = boxes[pattern[2]].innerText;
        if(pos1Val != "" && pos1Va2 != "" && pos1Va3 != ""){
            if(pos1Val===pos1Va2 && pos1Va2===pos1Va3){
                winnerFound= true;
                showWinner(pos1Val);
                return;
               
            }
        }
    }
    const allFilled = Array.from(boxes).every(box => box.innerText !== "");
    if (!winnerFound && allFilled) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

newGameBtn.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);
