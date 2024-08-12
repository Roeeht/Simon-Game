//alert("Game on!");
const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var doneSequence = false;
var clicksCount = 0;


$(document).on("keypress", function (event) {
  if (!started && event.which == 97) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
    $(".btn").on("click", function () {
      console.log("gamePattern.length", gamePattern.length)
      var userChosenColour = this.id;
      userClickedPattern.push(userChosenColour);
      console.log("userClickedPattern.length: ", userClickedPattern.length )
      console.log("userClickedPattern: ", userClickedPattern);
      playSound(userChosenColour);
      animatePress(this.id);
      if (checkAnswer()){
        console.log("clicksCount: ", clicksCount,"level: ", level)
        if (clicksCount == level) {
          setTimeout(function(){
            nextSequence()}, 1000);
        }
      }
    });
  }
});

function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  started = false;
  doneSequence = false;
  clicksCount = 0;
  console.log("started over")
}

function checkAnswer(){
  console.log("clicksCount:", clicksCount)
  console.log("gamePattern[clicksCount]:", gamePattern[clicksCount] )
  console.log("userClickedPattern[clicksCount]", userClickedPattern[clicksCount] )

  if (gamePattern[clicksCount] != userClickedPattern[clicksCount]){
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $('body').addClass('game-over')
    setTimeout(function(){
      $('body').removeClass('game-over')
    }, 200)
    startOver()
  }
  else{
    clicksCount++;
    return true
  }
}


function nextSequence() {
  doneSequence = false;
  level++;
  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log("gamePattern", gamePattern);
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
  userClickedPattern = [];
  clicksCount = 0
}

function playSound(name) {
  var colorSound = new Audio("./sounds/" + name + ".mp3");
  colorSound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
