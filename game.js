//alert("Game on!");
const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;
let doneSequence = false;
let clicksCount = 0;

$(document).on("keypress", function (event) {
  if (!started && event.which == 97) {
    started = true;
    nextSequence();
  }
});

$(".btn").on("click", function () {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  console.log("userClickedPattern: ", userClickedPattern);

  playSound(userChosenColour);
  animatePress(this.id);
  if (checkAnswer()) {
    //check current color
    console.log("clicksCount: ", clicksCount, "level: ", level);
    if (clicksCount == level) {
      //finished sequence
      setTimeout(nextSequence(), 1000);
    }
  } else {
    startOver();
  }
});

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
  doneSequence = false;
  clicksCount = 0;
  console.log("started over");
}

function checkAnswer() {
  console.log("gamePattern[clicksCount]:", gamePattern[clicksCount]);
  console.log(
    "userClickedPattern[clicksCount]",
    userClickedPattern[clicksCount]
  );

  if (gamePattern[clicksCount] != userClickedPattern[clicksCount]) {
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    return false;
  } else {
    clicksCount++;
    return true;
  }
}

function nextSequence() {
  doneSequence = false;
  level++;

  $("#level-title").text("level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  console.log("gamePattern", gamePattern);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);

  userClickedPattern = [];
  clicksCount = 0;
}

function playSound(name) {
  let colorSound = new Audio("./sounds/" + name + ".mp3");
  colorSound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
