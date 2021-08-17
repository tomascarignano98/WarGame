let computerScore = 0;
let myScore = 0;

// DOM elements
const container1 = document.querySelector("#card-container1");
const container2 = document.querySelector("#card-container2");
const computerScoreEl = document.querySelector("#computer-score");
const myScoreEl = document.querySelector("#my-score");
const remaining = document.querySelector("#remaining");
const title = document.querySelector("h1");

// Set deck id

let deckId = "";

async function getNewDeck() {
  computerScore = 0;
  myScore = 0;
  computerScoreEl.innerHTML = computerScore;
  myScoreEl.innerHTML = myScore;
  title.textContent = `War!`;

  deckId = await fetch(
    "https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/"
  )
    .then((response) => response.json())
    .then((data) => data.deck_id);
}

// Draw cards

document.getElementById("draw-cards").addEventListener("click", async () => {
  if (!deckId) {
    await getNewDeck();
    // console.log(deckId);
  }

  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const card1 = data.cards[0];
      const card2 = data.cards[1];
      const winner = getWinner(card1.value, card2.value);

      renderCards(card1, card2);

      // Update points
      setTimeout(() => {
        renderPoints(winner);
        remaining.textContent = data.remaining / 2;
      }, 1000);

      // Check if deck is empty
      if (data.remaining === 0) {
        deckId = "";

        setTimeout(getWarWinner, 2000);
      }
    });
});

// Render Card Images
function renderCards(card1, card2) {
  container1.innerHTML = `<img class="fade-first" src="${card1.image}"  />`;
  container2.innerHTML = `<img class="fade-last" src="${card2.image}"  />`;
}

// Declare a winner
const cardValues = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  JACK: 11,
  QUEEN: 12,
  KING: 13,
  ACE: 14
};

function getWinner(card1, card2) {
  const computer = cardValues[card1];
  const me = cardValues[card2];

  if (computer > me) {
    return 1;
  } else if (computer < me) {
    return 2;
  }
}

//
function renderPoints(winner) {
  if (winner === 1) {
    computerScore += 1;
    computerScoreEl.innerHTML = computerScore;
  } else if (winner === 2) {
    myScore += 1;
    myScoreEl.innerHTML = myScore;
  }
}

// Declare the winner of the entire game
function getWarWinner() {
  if (computerScore > myScore) {
    title.textContent = `Computer Wins the War!`;
  } else title.textContent = `You Win the War!`;
}
