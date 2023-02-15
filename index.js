const gameContainer = document.getElementById("game");
const scoreContainer = document.getElementById("score");
let score = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown"
];

let cards = [];
let flippedCards = [];
let matchedCards = [];

// Create an array of cards with randomized colors
function createCards(numCards) {
  for (let i = 0; i < numCards / 2; i++) {
    const color = COLORS[i];
    cards.push(color);
    cards.push(color);
  }

  shuffleCards(cards);
}

// Shuffle the cards using the Fisher-Yates algorithm
function shuffleCards(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

// Create the HTML for the game board
function createBoard() {
  for (let i = 0; i < cards.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.color = cards[i];
    card.addEventListener("click", flipCard);
    gameContainer.appendChild(card);
  }
}

// Flip a card over and check for a match
function flipCard() {
  if (flippedCards.length < 2 && !flippedCards.includes(this) && !matchedCards.includes(this)) {
    this.style.backgroundColor = this.dataset.color;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }
}

// Check if the two flipped cards match
function checkForMatch() {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];

  if (card1.dataset.color === card2.dataset.color) {
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
    matchedCards.push(card1, card2);
    score += 10;

    if (matchedCards.length === cards.length) {
      endGame();
    }
  } else {
    score -= 2;
    setTimeout(() => {
      card1.style.backgroundColor = "";
      card2.style.backgroundColor = "";
      flippedCards = [];
    }, 1000);
  }

  updateScore();
}

// Update the score display
function updateScore() {
  scoreContainer.innerText = `Score: ${score}`;
}

// End the game and save the high score
function endGame() {
  alert("Congratulations, you won!");
  const highScore = parseInt(localStorage.getItem("highScore")) || 0;

  if (score > highScore) {
    localStorage.setItem("highScore", score);
    alert(`New high score: ${score}`);
  } else {
    alert(`High score: ${highScore}`);
  }

  resetGame();
}

// Reset the game
function resetGame() {
  gameContainer.innerHTML = "";
  score = 0;
  cards = [];
  flippedCards = [];
  matchedCards = [];
  updateScore();
  startGame();
}

// Start the game with a specified number of cards
function startGame(numCards) {
  createCards(numCards);
  createBoard();
}

// Start the game when the window loads
window.onload = function() {
  startGame(16); // Change this to adjust the number of cards in the game
};
