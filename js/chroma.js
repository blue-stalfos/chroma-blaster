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

window.onload = function() {
	canvas = document.getElementById("theCanvas")
	ctx = canvas.getContext('2d');
	var player = new Player(300, 300);
	var bgImage = new Image();
	bgImage.src = "img/starfield.jpg";
	ctx.drawImage(bgImage, 0, 0);
	
	function Game() {
		var player = new Player(canvas.width / 2, canvas.height / 2, 0, 0, 0, 10, 10, 10);
		var ufo = [new UFO("img/ufo.cyan.png", 200, 200, 0, 0, "cyan")] // new UFO objects will have to be pushed into this array as needed
		
		// modal dialog that displays rules
		player.draw();
	
		// main loop where we ask for input, blank screen, redraw, then ask for input, etc…
		document.onkeydown = function(e) { player.move(e); };
		this.redrawScreen();
	}

	function startGame() {
		// if(canStart){
		currentGame = new Game();
		var player = new Player();
		currentGame.player = player;
		currentGame.player.draw();
	}
	
	
	Game.prototype = Object.create(Game.prototype);
	Game.prototype.constructor = Game;
	
	Game.prototype.redrawScreen = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(bgImage, 0, 0);
		console.log("in game that gives an error")
		player.draw();
	
	
	
	
	
		
		// Score
		// ctx.fillStyle = "rgb(250, 250, 250)";
		// ctx.font = "24px Helvetica";
		// ctx.textAlign = "left";
		// ctx.textBaseline = "top";
		// ctx.fillText("Monsterrs caught: " + monstersCaught, 32, 32);
	};
}
// *******