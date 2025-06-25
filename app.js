// Variable declarations
const topicSelect = document.getElementById("topicSelect");     //chose the topic
const cardDisplay = document.getElementById("cardDisplay");     //displays the card
const questionInput = document.getElementById("questionInput");
const answerInput = document.getElementById("answerInput");
const addButton = document.getElementById("addCardButton");     //adds new question to local storage

let currentTopic = topicSelect.value;   //the selected topic
let currentCards = [];                  //cards for the current topic
let currentIndex = 0;

//change the topic from dropdown
topicSelect.addEventListener("change", () => {
  currentTopic = topicSelect.value;
  loadAndRenderCards(currentTopic);
});

//add new card to local storage
addButton.addEventListener("click", () => {
  const question = questionInput.value.trim();
  const answer = answerInput.value.trim();
  if (question && answer) {
    addFlashcard(currentTopic, question, answer);
    questionInput.value = "";
    answerInput.value = "";
    loadAndRenderCards(currentTopic);
  }
});
function addFlashcard(topic, question, answer) {
  const card = { question, answer };
  const saved = JSON.parse(localStorage.getItem(topic)) || [];
  saved.push(card);
  localStorage.setItem(topic, JSON.stringify(saved));
}

function getSavedCards(topic) {
  return JSON.parse(localStorage.getItem(topic)) || [];
}

//load data
async function loadStaticCards(topic) {
  // Return embedded data from data.js
  return staticFlashcards[topic] || [];
}

//render cards
function renderFlashcard(card) {
  cardDisplay.textContent = card.question;
  cardDisplay.dataset.flipped = "false";
}

//flips to answer
function flipCard() {
  const flipped = cardDisplay.dataset.flipped === "true";
  const card = currentCards[currentIndex];
  cardDisplay.textContent = flipped ? card.question : card.answer;
  cardDisplay.dataset.flipped = (!flipped).toString();
}

//go to next card
function nextCard() {
  if (currentCards.length === 0) return;
  currentIndex = (currentIndex + 1) % currentCards.length;
  renderFlashcard(currentCards[currentIndex]);
}

//load and merge the static and the user-made cards
async function loadAndRenderCards(topic) {
  const staticCards = await loadStaticCards(topic);
  const savedCards = getSavedCards(topic);
  currentCards = staticCards.concat(savedCards);
  currentIndex = 0;

  if (currentCards.length > 0) {
    renderFlashcard(currentCards[currentIndex]);
  } else {
    cardDisplay.textContent = "No cards available.";
  }
}

//initialize the app
loadAndRenderCards(currentTopic);

