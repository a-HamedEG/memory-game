import "../css/style.css";

const cardWrapper = document.querySelector('.card-wrapper');
const wrongTries = document.querySelector('.wrong-tries span');

const cards = Array.from(document.querySelectorAll(".card"));

const numberOfCardsArray = Array.from(Array(cards.length).keys());

const duration = 1000;

document.querySelector(".start-btn button").onclick = function () {
  const name = prompt("What's your name");

  if (name == null || name == "") {
    document.querySelector(".name span").innerHTML = "Player";
  } else {
    document.querySelector(".name span").innerHTML = name;
  }

document.querySelector(".start-btn").remove();
};

shuffle(numberOfCardsArray);

document.querySelectorAll(".card").forEach((card, index) => {
  card.style.order = numberOfCardsArray[index];
  card.addEventListener("click", () => flipCard(card));
});

function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];

    array[current] = array[random];

    array[random] = temp;
  }
}

function flipCard(card) {
  card.classList.add("is-flipped");
  if (document.querySelectorAll(".is-flipped").length == 2) {
    preventClickingOnCards()
    let firstPickCard = document.querySelectorAll(".is-flipped")[0]
    let secondPickCard = document.querySelectorAll(".is-flipped")[1]
    MatchCheck(firstPickCard,secondPickCard);
    setTimeOutFor(secondPickCard,'is-flipped')
    setTimeOutFor(firstPickCard,'is-flipped')
  }
}

function MatchCheck(firstPickCard, secondPickCard) {
    if (firstPickCard.dataset.techology === secondPickCard.dataset.techology) {
        firstPickCard.classList.add("match")
        secondPickCard.classList.add("match")
    } else {
        wrongTries.innerHTML = parseInt(wrongTries.innerHTML) + 1;
    }
}

function preventClickingOnCards() {
    cardWrapper.classList.add('no-clicking');
    setTimeOutFor(cardWrapper,'no-clicking')
}

function setTimeOutFor(element, classname) {
    setTimeout(() => {
        element.classList.remove(classname);
    }, duration);
}