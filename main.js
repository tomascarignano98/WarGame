// DOM elements
const container1 = document.querySelector("#card-container1");
const container2 = document.querySelector("#card-container2");

// Set deck id

let deckId = "";

async function getDeckId() {
  if (!deckId) {
    deckId = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    )
      .then((response) => response.json())
      .then((data) => data.deck_id);
  }

  return deckId;
}

// Draw cards
document.getElementById("draw-cards").addEventListener("click", async () => {
  const deckId = await getDeckId();

  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      container1.innerHTML = `<img class="fade-first" src="${data.cards[0].image}"  />`;
      container2.innerHTML = `<img class="fade-last" src="${data.cards[1].image}"  />`;
    });
});
