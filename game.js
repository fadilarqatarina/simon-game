// 2.3) create array
// 2.5) create array of random colours
// 4.3) create array of colours user clicked
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// 2.1) create function
// 2 generate new number
// 2.4) select colour by using random numbers
// 2.6) push into new array
// 3.1) select the button with same id
// 3.2) animate a flash (using fadein & fadeout)
// 4.1) detect buttons
// 4.2) userChosenColour equals the id of the button
// 4.4) added the pattern into new array
// 5.4) refactor the code

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  // 5.1)  when you press this button, make attribute of userChosenColour equal the value (id) of the button thats been pressed
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(lastColour) {
  if (userClickedPattern[lastColour] === gamePattern[lastColour]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function nextSequence() {
  // re initialize userClickedPattern to empty for the next level
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  console.log("Random colour: " + randomChosenColour);

  gamePattern.push(randomChosenColour);

  console.log("Game pattern: " + gamePattern);
  console.log("User pattern: " + userClickedPattern);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

// 5.2) create a new function
// 5.3) move audio to the new function
function playSound(name) {
  // 3.3) adding audio
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
