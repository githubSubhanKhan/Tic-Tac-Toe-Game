let boxes = document.querySelectorAll( ".box" );
let newBtn = document.querySelector( ".newBtn" );
let msgContainer = document.querySelector( ".msgContainer" );
let msg = document.querySelector( ".msg" );
let audio = document.querySelector( "#clickAudio" );
let winneraudio = document.querySelector( "#winnerAudio" );
let overaudio = document.querySelector( "#gameOveraudio" );
let winIcon = '<i class="fa-solid fa-chess-king"></i>';
let overIcon = '<i class="fa-solid fa-skull-crossbones"></i>';

let turnX = true;

let count = 0;

let winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach( ( box ) => {
    box.addEventListener( "click",() => {
        audio.play();
        if( turnX ) {
            turnX = false;
            box.innerText = "X";
            newBtn.addEventListener( "click", newGame );
        } else {
            turnX = true;
            box.innerText = "O";
            newBtn.addEventListener( "click", newGame );
        }
        box.disabled = true;
        count++;
        
        let iswinner = checkWInner();
        
        if( count === 9 && !iswinner ) {
            gameDraw();
        }
    } );
});

const gameDraw = () => {
    overaudio.play();
    msg.innerHTML = `${overIcon} Game Tied ${ overIcon }`;
    msgContainer.classList.remove( "hide" );
};

const disabledboxes = () => {
    for( box of boxes ) {
        box.disabled = true;
    }
};

const enabledboxes = () => {
    for( box of boxes ) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = ( winner ) => {
    msg.innerHTML = `${winIcon} Congratulations! Player '${ winner }' ${ winIcon }`;
    msgContainer.classList.remove( "hide" );
};

const newGame = () => {
    turnX = true;
    count = 0;
    enabledboxes();
    msgContainer.classList.add( "hide" );
};

const checkWInner = () => {
    for( let pattern of winPattern ) {
        let pos1Val = boxes[ pattern[0] ].innerText;
        let pos2Val = boxes[ pattern[1] ].innerText;
        let pos3Val = boxes[ pattern[2] ].innerText;

        if( pos1Val != "" && pos2Val != "" && pos3Val != "" ) {
            if( pos1Val === pos2Val && pos2Val === pos3Val ) {
                disabledboxes();
                winneraudio.play();
                showWinner( pos1Val );
            }
        }
    }
};

newBtn.addEventListener( "click", newGame );