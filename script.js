const cardValues = ['🐱', '🐶', '🐭', '🐱', '🐶', '🐭']; // Yeh 3 pairs hain
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;

// Game Board Setup
const gameBoard = document.getElementById('game-board');

// Cards ko shuffle karna
function shuffleCards() {
    cardValues.sort(() => 0.5 - Math.random());
}

// Game ko shuru karna
function startGame() {
    shuffleCards(); // Shuffle karke game shuru karo
    gameBoard.innerHTML = ''; // Board ko clear karo
    firstCard = secondCard = null; // Reset cards
    matchesFound = 0; // Reset matches
    lockBoard = false; // Allow clicks again
    
    cardValues.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.innerHTML = ''; // Card start me blank hoga
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Card flip karna aur check karna agar pair match hua ya nahi
function flipCard() {
    if (lockBoard) return; // Agar board locked hai toh kuch mat karo
    if (this === firstCard) return; // Same card dobara click mat karo

    this.innerHTML = this.dataset.value; // Card ko flip karo aur value dikhao

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch(); // Doosre card ke baad match check karo
}

// Check karna agar dono cards match kar rahe hain
function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        disableCards(); // Agar match kiya toh cards ko disable kar do
        matchesFound++;
        if (matchesFound === cardValues.length / 2) {
            setTimeout(() => alert('You win!'), 500);
        }
    } else {
        unflipCards(); // Agar match nahi kiya toh unflip kar do
    }
}

// Disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

// Unflip cards agar match nahi hua
function unflipCards() {
    lockBoard = true; // Board ko lock karo jab tak animation chal rahi ho
    setTimeout(() => {
        firstCard.innerHTML = '';
        secondCard.innerHTML = '';
        resetBoard();
    }, 1000); // 1 second ke baad card phir se flip kar do
}

// Reset variables after each turn
function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// Restart button functionality
document.getElementById('restart').addEventListener('click', startGame);

// Start the game initially
startGame();
