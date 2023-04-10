import "../css/style.css";
const cardWrapper = document.querySelector(".card-wrapper");
const wrongTries = document.querySelector(".wrong-tries span");
const winningSound = document.querySelector(".niceTry");
const losingSound = document.querySelector(".tryAgain");

// Game Variables
const duration = 1000;
const timeInSecond = 120;

class Timer {
  constructor(root, remainingSeconds) {
    root.innerHTML = Timer.getHTML();
    this.timerElements = {
      minutes: root.querySelector(".minutes"),
      seconds: root.querySelector(".seconds"),
    };
    this.remainingSeconds = remainingSeconds;
    this.start();
  }

  updateTimeInterface() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.timerElements.minutes.textContent = minutes
      .toString()
      .padStart(2, "0");
    this.timerElements.seconds.textContent = seconds
      .toString()
      .padStart(2, "0");
  }

  start() {
    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateTimeInterface();

      if (this.remainingSeconds == 0) {
        this.stop();
      }
    }, 1000);
  }

  stop() {
    document.querySelector(".root-timer").classList.add("time-out");
    clearInterval(this.interval);
    document.querySelector(".game-over").classList = 'lost';
    cardWrapper.classList.add("no-clicking");
  }

  static getHTML() {
    return `        
      <span class="minutes">00</span>
      :
      <span class="seconds">00</span>`;
  }
}

const cardsdata = [{
  cardName : "code",
  imgName : "code.svg"
},{
  cardName : "css",
  imgName : "css.svg"
},{
  cardName : "html",
  imgName : "html.svg"
},{
  cardName : "php",
  imgName : "php.svg"
},{
  cardName : "nodejs",
  imgName : "nodejs.svg"
},{
  cardName : "react",
  imgName : "react.svg"
},{
  cardName : "vuejs",
  imgName : "vuejs.svg"
},{
  cardName : "wordpress",
  imgName : "wordpress.svg"
},{
  cardName : "laravel",
  imgName : "laravel.svg"
},{
  cardName : "javascript",
  imgName : "javascript.svg"
}]

async function shuffle(array) {
  // Simply Change the index of the Array
  // 1- Stores the last index value in a -Temp- Variable
  // 2- Replace that index value with 'random' index value in same array
  // 3- change that 'random' value with the -Temp-

  let current = array.length,
    temp,
    random;

  while (current > 0) {
    console.log(current)
    random = Math.floor(Math.random() * current);
    current--;
    // 1- Stores the last index value in a -Temp- Variable
    temp = array[current];
    // 2- Replace that index value with 'random' index value in same array
    array[current] = array[random];
    // 3- change that 'random' value with the -Temp-
    array[random] = temp;
  }
}

const load = async () => {
  await generateCards(cardsdata)

  const cards = Array.from(document.querySelectorAll(".card"));
  const numberOfCardsArray = Array.from(Array(cards.length).keys());

  // Shuffle Array Numbers to Get a Random order
  shuffle(numberOfCardsArray);

  document.querySelectorAll(".card").forEach((card, index) => {
    // Shuffle Cards location
    card.style.order = numberOfCardsArray[index];
    // Add onClick Event
    card.addEventListener("click", () => flipCard(card));
  });
}

document.addEventListener('load', load())

// generate html for Cards
async function generateCards(cardsdata) {
  let cardsHtml='';
  for (let i = 0; i < cardsdata.length; i++) {
    const card = 
    `<div class="card" data-techology="${cardsdata[i].cardName}">
        <div class="face front"></div>
        <div class="face back">
          <img src="./public/imgs/${cardsdata[i].imgName}" alt="${cardsdata[i].cardName}">
        </div>
      </div>

      <div class="card" data-techology="${cardsdata[i].cardName}">
        <div class="face front"></div>
        <div class="face back">
          <img src="./public/imgs/${cardsdata[i].imgName}" alt="${cardsdata[i].cardName}">
        </div>
      </div>
    `;
    cardsHtml += card
  }
  cardWrapper.innerHTML = cardsHtml
}


// Example usage:

document.querySelector(".start-btn button").onclick = function () {
  // Store Player Name
  const name = prompt("What's your name");
  // Check if name exists
  if (name == null || name == "") {
    document.querySelector(".name span").innerHTML = "Player";
  } else {
    document.querySelector(".name span").innerHTML = name;
  }
  // remove start Game Overlay
  document.querySelector(".start-btn").remove();
  const Time = new Timer(document.querySelector(".root-timer"), timeInSecond);
};

document.querySelector(".game-over button").onclick = function () {
  location.reload();
}




function flipCard(card) {
  card.classList.add("is-flipped");
  
  // Checking if Two Cards is Selected to Check thier Match
  if (document.querySelectorAll(".is-flipped").length == 2) {
    // prevent any Clicking on Cards Wrapper For better Experience
    preventClickingOnCards();
    let firstPickCard = document.querySelectorAll(".is-flipped")[0];
    let secondPickCard = document.querySelectorAll(".is-flipped")[1];
    // Check thier Match
    MatchCheck(firstPickCard, secondPickCard);
    setTimeOutFor(secondPickCard, "is-flipped");
    setTimeOutFor(firstPickCard, "is-flipped");
  }
}

function MatchCheck(firstPickCard, secondPickCard) {
  if (firstPickCard.dataset.techology === secondPickCard.dataset.techology) {
    firstPickCard.classList.add("match");
    secondPickCard.classList.add("match");
    winningSound.play();
  } else {
    wrongTries.innerHTML = parseInt(wrongTries.innerHTML) + 1;
    losingSound.play();
  }
}

function preventClickingOnCards() {
  cardWrapper.classList.add("no-clicking");
  setTimeOutFor(cardWrapper, "no-clicking");
}

function setTimeOutFor(element, classname) {
  setTimeout(() => {
    element.classList.remove(classname);
  }, duration);
}
