const VOWELS = ['a', 'e', 'i', 'o', 'u', 'y'];
const RANDOM_VOWEL = VOWELS[Math.floor(Math.random() * VOWELS.length)];
let gameOver = false;
const gameOverScreen = document.querySelector('.game-over-screen');
const gameOverText = document.querySelector('.game-over-text');
const retryButton = document.querySelector('.retry-button');
const extremeLink = document.querySelector('.extreme-link');

const gameOverTexts = {
    a: 'You gotta bring your <strong>A</strong> game.',
    e: 'I before <strong>E</strong>, except for this time.',
    i: `Even <strong>I</strong> didn't see that coming.`,
    o: `<strong>O</strong>oops...`,
    u: `Dang, <strong>U</strong> got this one.`,
    y: `Yikes. Sometimes there\'s a <strong>Y</strong>`,
};

buildBoard();
let input = document.querySelector('.board-piece');
setUpRound();

function buildBoard() {
    const rounds = document.querySelectorAll('.game-round');
    rounds.forEach((round, index) => {
        const gamePiece = document.createElement('input');
        gamePiece.type = 'text';
        gamePiece.classList.add('board-piece');
        gamePiece.id = `board-piece-${index}`;
        gamePiece.name = `board-piece-${index}`;
        gamePiece.maxLength = 1;
        gamePiece.disabled = true;
        round.appendChild(gamePiece);
    });
}

function setUpRound() {
    input.disabled = false;
    input.focus();
}
function gameLoop() {
    input.disabled = true;
    input.classList.replace('board-piece', 'board-piece-played');

    if (input.value.toLowerCase() === RANDOM_VOWEL) {
        input.parentElement.classList.add('right');
        gameOverText.innerText = 'Well Done!';
        gameOverScreen.style.display = 'block';
        extremeLink.style.display = 'block';
        gameOver = true;
    } else {
        input.parentElement.classList.add('wrong');
    }
    input = document.querySelector('.board-piece');

    if (!gameOver) {
        input = document.querySelector('.board-piece');
        if (input) setUpRound();
        else {
            gameOverText.innerHTML = gameOverTexts[RANDOM_VOWEL];
            gameOverScreen.style.display = 'block';
        }
    }
}

window.addEventListener('keydown', (e) => {
    if (input && input.value && e.key === 'Enter') {
        gameLoop();
    }
});

window.addEventListener('click', ()=>{
   if(input) input.focus();
});

retryButton.addEventListener('click', () => {
    window.location.reload();
});
