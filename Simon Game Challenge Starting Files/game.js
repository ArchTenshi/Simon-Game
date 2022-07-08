"use strict";
const colorSet = ["green", "red", "yellow", "blue"];
let colorSequence = [];
let playerSequence = [];
let started = false;
let counter = 1;

function newSequence() {
  let newColor = colorSet[Math.floor(Math.random() * 4)];
  let btnSelection = $(`#${newColor}`).toggleClass("pressed");
  setTimeout(() => btnSelection.toggleClass("pressed"), 100);
  colorSequence.push(newColor);
}
function gameOver() {
  soundPlay("wrong");
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $("body").toggleClass("game-over");
  setTimeout(() => {
    $("body").toggleClass("game-over");
  }, 200);
  started = false;
}
function soundPlay(target) {
  let audio = "";
  switch (target) {
    case "blue":
      audio = new Audio("./sounds/blue.mp3");
      break;
    case "green":
      audio = new Audio("./sounds/green.mp3");
      break;
    case "red":
      audio = new Audio("./sounds/red.mp3");
      break;
    case "yellow":
      audio = new Audio("./sounds/yellow.mp3");
      break;
    case "wrong":
      audio = new Audio("./sounds/wrong.mp3");
      break;
    default:
      break;
  }
  return audio.play();
}
//Game reset
$(document).on("keypress", () => {
  if (!started) {
    colorSequence = [];
    $("#level-title").text(`Level ${(counter = 1)}`);
    newSequence();
    started = true;
  }
});

$(".btn").on("click", (event) => {
  if (started) {
    let btnClicked = event.target.id;
    // Player click
    playerSequence.push(btnClicked);
    soundPlay(btnClicked);
    $(`#${btnClicked}`).toggleClass("pressed");
    setTimeout(() => $(`#${btnClicked}`).toggleClass("pressed"), 100);
    //
    if (playerSequence.length < colorSequence.length) {
      playerSequence.forEach((color, i) => {
        color !== colorSequence[i] ? gameOver() : "";
      });
    } else {
      counter++;
      $("#level-title").text(`Level ${counter}`);
      setTimeout(() => {
        playerSequence = [];
        newSequence();
      }, 500);
    }
  }
});
