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
	this.laser ={};
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

function redrawBackground() {
	var bgImage = new Image();
	bgImage.src = "img/starfield.jpg";
}

function refreshCanvas() {
	setInterval(function(){
		ctx.clearRect(0,0,1100,800);
		redrawBackground();
		currentGame.player.reDraw();
		currentGame.ufo.forEach(function(oneUFO){
			oneUFO.reDraw();
			
		});		//forEach
		if(currentGame.laser.exists){
			ctx.beginPath();
			ctx.moveTo(currentGame.laser.x, currentGame.laser.y);
			ctx.lineTo(currentGame.laser.endpointx, currentGame.laser.endpointy);
			ctx.strokeStyle="red";
			ctx.stroke();
			ctx.closePath();
			detectCollision();
		}


	}, 100);	//setInverval
}

var canStart = true;

function startGame() {
	if(canStart) {
		currentGame = new Game();
		// var Player = function(x, y, vx, vy, direction, image, rLaserLevel, gLaserLevel, bLaserLevel)
		var player = new Player(canvas.width / 2, canvas.height / 2, 0, 0, "N", "img/player-n.png", 10, 10, 10);
		currentGame.player = player;
		// spawnUFO();
		currentGame.player.draw();
		document.onkeydown = function(e) { currentGame.player.move(e); };
	}

	setInterval(function(){
		spawnUFO();
	},1000)

	refreshCanvas();
}

// 	currentGame.ufo.forEach(function(oneUFO){
// 		oneUFO.moveAround();
// 	});	

// 	refreshCanvas();
// }
