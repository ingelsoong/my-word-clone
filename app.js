const wordToGuess = "APPLE"; // The word to guess
const maxAttempts = 6; // Maximum number of attempts
let currentAttempt = 0; // Track current attempt
let currentGuess = ""; // Store the current guess

const gridElement = document.getElementById("grid"); // Get grid element
const submitBtn = document.getElementById("submitBtn"); // Get submit button
const messageElement = document.getElementById("message"); // Get message element
const guessInput = document.getElementById("guessInput"); // Get input field

// Create grid cells for the input
for (let i = 0; i < maxAttempts; i++) {
    for (let j = 0; j < 5; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        gridElement.appendChild(cell);
    }
}

// Listen for the submit button click
submitBtn.addEventListener("click", () => {
    if (currentGuess.length === 5) {
        evaluateGuess(currentGuess); // Evaluate the guess if it's 5 letters long
        currentGuess = ""; // Reset current guess
        guessInput.value = ""; // Clear the input field
    } else {
        alert("Please enter a 5-letter word."); // Alert if guess is not 5 letters
    }
});

// Listen for key presses to capture the guess
guessInput.addEventListener("input", (event) => {
    currentGuess = event.target.value.toUpperCase(); // Capture user input
});

// Function to evaluate the guess
function evaluateGuess(guess) {
    const cells = document.querySelectorAll(".cell");
    const currentRow = Array.from(cells).slice(currentAttempt * 5, currentAttempt * 5 + 5);
    const guessArray = guess.split("");

    // Track letters to check for duplicates
    const wordToGuessArray = wordToGuess.split("");
    const correctLetters = Array(5).fill(false); // Track correct positions

    // First pass: Check for correct positions
    guessArray.forEach((letter, index) => {
        if (letter === wordToGuessArray[index]) {
            currentRow[index].classList.add("correct");
            currentRow[index].textContent = letter; // Show correct letter
            correctLetters[index] = true; // Mark this letter as correctly positioned
            wordToGuessArray[index] = null; // Remove it from further checks
        }
    });

    // Second pass: Check for present letters
    guessArray.forEach((letter, index) => {
        if (!correctLetters[index]) { // Skip if already marked correct
            const letterIndex = wordToGuessArray.indexOf(letter);
            if (letterIndex !== -1) {
                currentRow[index].classList.add("present");
                currentRow[index].textContent = letter; // Show present letter
                wordToGuessArray[letterIndex] = null; // Remove it from further checks
            } else {
                currentRow[index].classList.add("absent");
                currentRow[index].textContent = letter; // Show absent letter
            }
        }
    });

    currentAttempt++; // Move to the next attempt

    // Check for win or loss conditions
    if (guess === wordToGuess) {
        messageElement.textContent = "Congratulations! You've guessed the word!";
        submitBtn.disabled = true; // Disable button if guessed correctly
    } else if (currentAttempt === maxAttempts) {
        messageElement.textContent = `Game Over! The correct word was "${wordToGuess}".`;
        submitBtn.disabled = true; // Disable button if max attempts reached
    }
}
