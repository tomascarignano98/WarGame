// Set deck id

let deckId = "";

async function getDeckId() {
  if (!deckId) {
    deckId = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    )
      .then((res) => res.json())
      .then((data) => data.deck_id);
  }

  return deckId;
}

// Draw cards
document.getElementById("draw-cards").addEventListener("click", async () => {
  const deckId = await getDeckId();

  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((response) => response.json())
    .then((data) => console.log(data));
});
