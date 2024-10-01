const WORD = 'APPLE';  // You can change this to any word you want
let currentGuess = '';
let rowIndex = 0;
let colIndex = 0;
let gameActive = true;

const grid = document.getElementById('grid');
const keyboard = document.getElementById('keyboard');

// Initialize the grid
for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.id = `cell-${i}-${j}`;
        grid.appendChild(cell);
    }
}

// Initialize the keyboard
const keys = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
keys.forEach((key) => {
    const keyButton = document.createElement('button');
    keyButton.className = 'key';
    keyButton.textContent = key;
    keyButton.addEventListener('click', () => handleKeyInput(key));
    keyboard.appendChild(keyButton);
});

const enterButton = document.createElement('button');
enterButton.className = 'key';
enterButton.textContent = 'Enter';
enterButton.addEventListener('click', submitGuess);
keyboard.appendChild(enterButton);

const deleteButton = document.createElement('button');
deleteButton.className = 'key';
deleteButton.textContent = 'Del';
deleteButton.addEventListener('click', deleteLetter);
keyboard.appendChild(deleteButton);

// Handle key input
function handleKeyInput(key) {
    if (colIndex < 5 && gameActive) {
        document.getElementById(`cell-${rowIndex}-${colIndex}`).textContent = key;
        currentGuess += key;
        colIndex++;
    }
}

// Handle guess submission
function submitGuess() {
    if (currentGuess.length === 5 && gameActive) {
        validateGuess();
        currentGuess = '';
        rowIndex++;
        colIndex = 0;
        if (rowIndex === 6) {
            alert(`Game Over! The word was ${WORD}.`);
            gameActive = false;
        }
    }
}

// Handle deleting a letter
function deleteLetter() {
    if (colIndex > 0) {
        colIndex--;
        currentGuess = currentGuess.slice(0, -1);
        document.getElementById(`cell-${rowIndex}-${colIndex}`).textContent = '';
    }
}

// Validate the guess
function validateGuess() {
    const guess = currentGuess.toUpperCase();
    for (let i = 0; i < 5; i++) {
        const cell = document.getElementById(`cell-${rowIndex}-${i}`);
        const letter = guess[i];

        if (letter === WORD[i]) {
            cell.classList.add('correct');
        } else if (WORD.includes(letter)) {
            cell.classList.add('partial');
        } else {
            cell.classList.add('wrong');
        }
    }

    if (guess === WORD) {
        alert('Congratulations, You Win!');
        gameActive = false;
    }
}
