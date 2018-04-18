// Chroma Blaster by Richard Batista, April 2018

var gameRules = [	"Blow up the UFOs before they blow up your ship!", 
					"Aim and fire your laser to destroy the UFOs flying around you in space.", 
					"Use lasers of a complimentary color to destroy:", 
					"🚀 Red destroys Cyan", 
					"🛸 Blue destroys Yellow", 
					"👾 Green destroys Magenta", 
					"Using the wrong color will make them bigger.", 
					"See how long you can last!", 
					"User ARROW KEYS to move and Z, X, C to fire different colored lasers."];

var Game = function(){
	this.player = {};
	this.ufo = [];
  }
					
window.onload = function() {
	var currentGame;
	canvas = document.getElementById("theCanvas")
	ctx = canvas.getContext('2d');
	// var player = new Player(300, 300);
	var bgImage = new Image();
	bgImage.src = "img/starfield.jpg";
	ctx.drawImage(bgImage, 800, 1100);
	startGame();
}

var canStart = true;

function startGame() {
	if(canStart) {
		currentGame = new Game();
		// var Player = function(x, y, vx, vy, direction, image, rLaserLevel, gLaserLevel, bLaserLevel)
		var player = new Player(canvas.width / 2, canvas.height / 2, 0, 0, "N", "img/player-n.png", 10, 10, 10);
		var ufo = [];
		currentGame.player = player;
		currentGame.ufo = ufo;
		spawnUFO();
		currentGame.player.draw();
		document.onkeydown = function(e) { currentGame.player.move(e); };
	}
}

function redrawBackground() {
	var bgImage = new Image();
	bgImage.src = "img/starfield.jpg";
}
function refreshCanvas() {
	ctx.clearRect(0,0,1100,800);
	redrawBackground();
	currentGame.player.reDraw();
	currentGame.ufo.reDraw();
}