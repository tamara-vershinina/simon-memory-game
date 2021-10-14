var defaultFlashDelay = 700;
var flashDelay = defaultFlashDelay;
var colorSeq = [];
var highestScore = 0;
var lastScore = 0;
var checkIndex = 0;
var gameIsRunning = false;
var endGameTimer = null;

function startGame() {
  gameIsRunning = true;
  flashDelay = defaultFlashDelay;
  colorSeq = [];
  switchLight();
  startRound();
}

function startRound() {
  addColorToSeq();
  if (colorSeq.length == 5 || colorSeq.length == 9 || colorSeq.length == 13) {
    flashDelay -= 80;
  }
  flashSeq(0);
}

//flash a certain element
function flash(e) {
  var elementToFlash = document.getElementById(e);
  elementToFlash.classList.remove("flashElement");
  void elementToFlash.offsetWidth;
  elementToFlash.classList.add("flashElement");
}

//flash the sequence
function flashSeq(index) {
  if(index >= colorSeq.length) {
    checkInput(0, new Date().getTime());
    return;  //hit the end, base case
  }
  flash(colorSeq[index]);
  setTimeout(function() {flashSeq(index + 1);}, flashDelay);
}

//add a new color to the sequence
function addColorToSeq() {
  var newColor = Math.floor((Math.random() * 4) + 1);
  if (newColor == 1) {
    //document.getElementById("green").click();
    id = "green";
  }
  else if (newColor == 2) {
    //document.getElementById("red").click();
    id = "red";
  }
  else if (newColor == 3) {
    //document.getElementById("yellow").click();
    id = "yellow";
  }
  else {
    //document.getElementById("blue").click();
    id = "blue";
  }
  //add to the sequence
  colorSeq.push(id);  
}

//flash the button clicked by user
function userClicksTheButton(id) {
  flash(id);
  if (endGameTimer != null) {
    clearTimeout(endGameTimer);
  }
  if (gameIsRunning) {
    if (id == colorSeq[checkIndex]) {
      checkInput(checkIndex + 1, new Date().getTime());
    } else {
      endGame();
    }
  }
}

//switch the color of indicator red <-> green
function switchLight() {
  var light = document.querySelector("#indicator");
  var stylesApplied = window.getComputedStyle(light);
  if (stylesApplied.backgroundColor == 'rgb(255, 0, 0)') {
    document.getElementById("indicator").style.backgroundColor = '#8ef623';
  }
	else {
    document.getElementById("indicator").style.backgroundColor = 'red';
  }
}

function checkInput(index, startTime) {
  if (index >= colorSeq.length) {
    checkIndex = 0;
    setTimeout(startRound, 800);
    return;
  }
  checkIndex = index;
  endGameTimer = setTimeout(endGame, 5000);
}

function flashAllButtons(times) {
  if (times <= 0) {
    return;
  }
  flash('green');
  flash('red');
  flash('blue');
  flash('yellow');
  setTimeout(function() { flashAllButtons(times - 1); }, 800);
}

//end the game
function endGame() {
	switchLight();
  endGameTimer = null;
  checkIndex = 0;
  lastScore = colorSeq.length - 1;
  document.getElementById("rightButton").innerHTML = lastScore;
  flashAllButtons(4);
  if(lastScore > highestScore) {
    highestScore = lastScore;
    document.getElementById("leftButton").innerHTML = highestScore;
  }  
}