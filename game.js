//alert("Game on!");
const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on("keypress", function (event) {
  if (!started && event.which == 97) {
    $("#level-title").text("level " + level);

    nextSequence();
    started = true;
    $(".btn").on("click", function () {
      var userChosenColour = this.id;
      userClickedPattern.push(userChosenColour);
      console.log(userClickedPattern);
      playSound(userChosenColour);
      animatePress(this.id);
      nextSequence();
    });
  }
});

function nextSequence() {
  level++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

function playSound(name) {
  var colorSound = new Audio("./sounds/" + name + ".mp3");
  colorSound.play();
}

function animatePress(currentColour) {
  console.log(currentColour);
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
