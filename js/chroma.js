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
	
	// function Game() {
		
	// 	 // new UFO objects will have to be pushed into this array as needed
		
	// 	// modal dialog that displays rules
	// 	player.draw();
	
	// 	// main loop where we ask for input, blank screen, redraw, then ask for input, etc…
		
	// 	this.redrawScreen();
	// }
	startGame();
}

var canStart = true;

function startGame() {
	if(canStart) {
		currentGame = new Game();
		// var Player = function(x, y, vx, vy, degrees, rLaserLevel, gLaserLevel, bLaserLevel)
		var player = new Player(canvas.width / 2, canvas.height / 2, 0, 0, 0, 10, 10, 10);
		var ufo = [new UFO("img/ufo.cyan.png", 200, 200, 0, 0, "cyan")];
		currentGame.player = player;
		currentGame.ufo = ufo;
		currentGame.player.draw();
		document.onkeydown = function(e) { currentGame.player.move(e); };
	}
}