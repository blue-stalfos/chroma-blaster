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
	this.handleInput = function() {};
  }

window.onload = function() {
	var currentGame;
	canvas = document.getElementById("theCanvas")
	ctx = canvas.getContext('2d');

	startGame();
}

function drawRotated(image, locx, locy, angle, scale = 100)
{
	scaleFactor = 1.0 * (scale / 100);
	width = image.width * scaleFactor;
	height = image.height * scaleFactor;

   ctx.save();
   ctx.translate(locx, locy); // change origin
   ctx.rotate((-1*angle) + (Math.PI/2));
   ctx.drawImage(image,-0.5*width,-0.5*height,width,height);
   ctx.restore();
}

function cleanDeadUFOS() {
	arrayLen = currentGame.ufo.length;

	for(i = 0; i < arrayLen; ++i)
	{
		if (currentGame.ufo[i].hit === true) {
			currentGame.ufo.splice(i, 1);
			arrayLen--;
		}
	}
}

// This is where the game updates player position, spawns enemies,
// handles collisions, and computes physics
function logicUpdate()
{
//	console.log("Player angle: " + ((360/(2*Math.PI))*currentGame.player.angle));
//	console.log("Player velocity: " + currentGame.player.vx +","+currentGame.player.vy);
//	console.log("Player accel: " + currentGame.player.acceleration);
	currentGame.player.updatePhysics();

	currentGame.ufo.forEach(function(oneUFO){
		oneUFO.updatePhysics();
	});

	detectCollision();
	cleanDeadUFOS();
}

function redrawBackground() {
	var bgImage = new Image();
	ctx.clearRect(0,0,1100,800);
	bgImage.src = "img/starfield.jpg";
}

function redrawLaser()
{
	if(currentGame.laser.exists){
		ctx.beginPath();
		ctx.moveTo(currentGame.laser.x, currentGame.laser.y);
		ctx.lineTo(currentGame.laser.endpointx, currentGame.laser.endpointy);
		ctx.strokeStyle="red";
		ctx.stroke();
		ctx.closePath();
	}
}

function redrawEverything()
{
	redrawBackground();
	currentGame.player.reDraw();

	currentGame.ufo.forEach(function(oneUFO){
		oneUFO.reDraw();
	});

	redrawLaser();
}


var canStart = true;

function startGame() {
	if(canStart) {
		currentGame = new Game();
		var player = new Player(canvas.width / 2, canvas.height / 2, 0, Math.PI/2,
			"img/player-n.png", 10, 10, 10);

		currentGame.player = player;

		// Draw the player for the first time
		//currentGame.player.draw();

		// Process Input
		currentGame.handleInput = function(event) {
			currentGame.player.handleInput(event);
		}
		document.onkeydown = currentGame.handleInput;

		// Update - Respond to Input & Produce Enemies
		setInterval(spawnUFO, 1000);
		setInterval(logicUpdate,(1000.0/60));

		// Render the changes
		setInterval(redrawEverything, (1000.0/60));
	}
}
