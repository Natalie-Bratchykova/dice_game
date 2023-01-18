"using strict";

const rezultedMess = document.querySelector(".resulted_message");
const gameField = document.querySelector(".wrap");
const userCard = document.querySelector(".user_card");
const userName = document.querySelector("#user_name");
const userRating = document.querySelector("#user_rating");
const userDicePlace = document.querySelector("#user_dice_holder");
const userRollDiceBtn = document.getElementById("user_roll_btn");

const opponentName = document.querySelector("#opponent_name");
const opponentRating = document.querySelector("#opponent_rating");
const opponentDicePlace = document.querySelector("#opponent_dice_holder");
const opponentRollDiceBtn = document.getElementById("opponent_roll_btn");

const gameResultPopUp = document.querySelector("#game_result_pop_up");
const moveOnBtn = document.querySelector(".move_on");
const backToMenuBtn = document.querySelector("#back_to_menu");

const gameMenu = document.querySelector(".game_menu");
const startGameBtn = document.querySelector(".start_game_btn");

const getUsersDataPopUp = document.querySelector(".pop_up_for_user");
const popUpPage1 = document.querySelector(".page1");
const userNameFromInput = document.querySelector("#name");
const popUpPage2 = document.querySelector(".page2");
const opponentNameFromInput = document.querySelector("#opponent__name");

let userAccount = {
  name: "",
  currentRating: 0,
  history: [],
};
let opponentAccount = {
  name: "",
  currentRating: 0,
  history: [],
};

document.querySelector(".change_theme").addEventListener("click", () => {
  if (document.querySelector("body").classList.contains("light")) {
    document.querySelector("body").classList.remove("light");
    document.querySelector("body").classList.add("dark");
  } else {
    document.querySelector("body").classList.add("light");
    document.querySelector("body").classList.remove("dark");
  }
});
function resetAllData() {
  userName.innerHTML = "";
  userRating.innerHTML = 0;
  userDicePlace.innerHTML = "";
  opponentName.innerHTML = "";
  opponentRating.innerHTML = 0;
  opponentDicePlace.innerHTML = "";
}

function clearInput(InputArray) {
  InputArray.forEach((input) => {
    input.value = "";
  });
  resetAllData();
}

startGameBtn.addEventListener("click", () => {
  gameMenu.classList.add("disabled");

  getUsersDataPopUp.classList.remove("disabled");
  if (
    !getUsersDataPopUp.classList.contains("disabled") ||
    !gameMenu.classList.contains("disabled")
  ) {
    gameField.classList.add("disabled");
  }
  if (popUpPage1.classList.contains("disabled")) {
    popUpPage2.classList.add("disabled");
    popUpPage1.classList.remove("disabled");
    clearInput(document.querySelectorAll('input[type = "text"]'));
  }
});

function getInputedData(
  dataInputSelector,
  dataInsertSelector,
  page1Selector,
  page2Selector
) {
  if (document.querySelector(dataInputSelector).value != "") {
    document.querySelector(dataInsertSelector).innerHTML =
      document.querySelector(dataInputSelector).value;
    document.querySelector(page2Selector).classList.remove("disabled");
    document.querySelector(page1Selector).classList.add("disabled");
  }
}

document.querySelector(".continue").addEventListener("click", () => {
  if (!popUpPage1.classList.contains("disabled")) {
    getInputedData("#name", "#user_name", ".page1", ".page2");
    userAccount.name = userNameFromInput.value;
  }
  if (!popUpPage2.classList.contains("disabled")) {
    getInputedData(
      "#opponent__name",
      "#opponent_name",
      ".pop_up_for_user",
      ".wrap"
    );

    opponentAccount.name = opponentNameFromInput.value;
    if (!gameField.classList.contains("disabled")) {
      userCard.classList.remove("disactive_player_card");
    }
  }
});

function defineWinner(player1, player2) {
  gameResultPopUp.classList.remove("disabled");
  userCard.classList.toggle("disactive_player_card");
  if (player1.currentRating > player2.currentRating) {
    rezultedMess.innerHTML = `${player1.name} is winner`;
  } else if (player1.currentRating < player2.currentRating) {
    rezultedMess.innerHTML = `${player2.name} is winner`;
  } else {
    rezultedMess.innerHTML = "no one is winner/looser";
  }
}

moveOnBtn.addEventListener("click", () => {
  gameResultPopUp.classList.add("disabled");
  userCard.classList.toggle("disactive_player_card");
});

backToMenuBtn.addEventListener("click", () => {
  gameResultPopUp.classList.add("disabled");
  gameMenu.classList.remove("disabled");
  gameField.classList.add("disabled");
});

function rollTheDice(
  placeForDiceInsertionSelector,
  ratingSelector,
  playerFieldSelector,
  opponentFieldSelector
) {
  let randomValue = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  if (document.querySelector(ratingSelector).text === "0") {
    document.querySelector(ratingSelector).innerHTML = randomValue;
  } else {
    document.querySelector(ratingSelector).innerHTML =
      randomValue + Number(document.querySelector(ratingSelector).textContent);
  }
  document.querySelector(
    placeForDiceInsertionSelector
  ).innerHTML = `<img src="images/${randomValue}-dotes-dice.png" >`;

  setTimeout(() => {
    document
      .querySelector(playerFieldSelector)
      .classList.add("disactive_player_card");
    document
      .querySelector(opponentFieldSelector)
      .classList.remove("disactive_player_card");
  }, 100);
}

userRollDiceBtn.addEventListener("click", () => {
  rollTheDice(
    "#user_dice_holder",
    "#user_rating",
    ".user_card",
    ".opponent_card"
  );
  userAccount.currentRating = Number(userRating.textContent);
});

opponentRollDiceBtn.addEventListener("click", () => {
  rollTheDice(
    "#opponent_dice_holder",
    "#opponent_rating",
    ".opponent_card",
    ".user_card"
  );
  opponentAccount.currentRating = Number(opponentRating.textContent);
  setTimeout(() => {
    defineWinner(userAccount, opponentAccount);
  }, 100);
});
