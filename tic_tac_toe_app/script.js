const gridInfo = document.querySelector(".gameInfo");
const boxes = document.querySelectorAll(".box");
const startBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winners = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


//Every time this function will be call
function init(){
    currentPlayer = 'X';
    gameGrid = ["","","","","","","","",""];
    startBtn.classList.remove('active');
    boxes.forEach((box)=>{
        box.innerText = "";
        box.style.pointerEvents="all";
    })

    boxes.forEach((box)=>{
        box.classList.remove("win");
    })



    gridInfo.innerText = `Current Player - ${currentPlayer}`;
}

init();


function checkWinner(){
    let win = "";

    winners.forEach((position)=>{

        if(gameGrid[position[0]] !="" && gameGrid[position[1]] !="" && gameGrid[position[2]] !=""
        && gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]]){

            if(gameGrid[position[0]]=='X'){
                win='X';

            }
            else{
                win='O';
            }

            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');

            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })
        }
    })

    if(win!=""){
        gridInfo.innerText=`Winner is - ${win}`;
        startBtn.classList.add("active");
    }

    // when their is no winner
    let clickCount = 0;
    gameGrid.forEach((box)=>{
        if(box!=""){
            clickCount++;
        }
    })

    if(clickCount===9){
        gridInfo.innerText="Match Tied";
        startBtn.classList.add('active');
    }

}

function playerChange(){
    if(currentPlayer == 'X'){
        currentPlayer = 'O';
    }
    else{
        currentPlayer = 'X';
    }

    gridInfo.innerText = `Current Player- ${currentPlayer}`;
}

function handleClick(index){
    if(gameGrid[index] == ""){
        gameGrid[index] = currentPlayer;
        boxes[index].innerText = currentPlayer;
        //player change after one turn
        playerChange();

        //Check who's winner
        checkWinner(index);
    }
}

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);
    })
})


startBtn.addEventListener("click",init);