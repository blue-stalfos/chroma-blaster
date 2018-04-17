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

function Sprite(x, y, vx, vy, degrees, image) {
	this.image = image;
	this.degrees = degrees;
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
}

function Player(x, y, vx, vy, degrees, rLaserLevel, gLaserLevel, bLaserLevel) {
	Sprite.call(this, x, y, vx, vy, degrees);
	this.image = "img/player.png";
	this.rLaserLevel = rLaserLevel;
	this.gLaserLevel = gLaserLevel;
	this.bLaserLevel = bLaserLevel;
}

Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;

var playerImage = new Image();
Player.prototype.draw = function() {
playerImage.src = this.image;
console.log(this.x, this.y);

var that = this;

playerImage.onload = function(){
	ctx.drawImage(playerImage, that.x, that.y, 62, 85)
}

}

function UFO(image, x, y, vx, vy, color) {
	Sprite.call(this, image, x, y, vx, vy);
	this.color = color;
}	

UFO.prototype = Object.create(UFO.prototype);
UFO.prototype.constructor = UFO;

UFO.prototype.spawn = function() {
	var randomX = Math.floor(Math.random() * canvas.width);
	var randomY = Math.floor(Math.random() * canvas.height);
	var randomColorSeed = Math.floor(Math.random() * 3);
	
	switch(randomColorSeed) {
		case 0:
			var randomColor = "img/ufo-cyan.png"
			break;
		case 1:
			var randomColor = "img/ufo-magenta.png"
			break;
		case 2:
			var randomColor = "img/ufo-yellow.png"
			break;
		default:
			var randomColor = "img/player.png"
			break;
	}

	ufo.push(new UFO(randomColor, randomX, randomY, 0, 0));
}

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "img/starfield.jpg";

function Game() {
	// var player = new Player("img/player.png", 0, canvas.width / 2, canvas.height / 2, 0, 0, 10, 10, 10);
	var ufo = []; // new UFO objects will have to be pushed into this array as needed

	// modal dialog that displays rules

	// draw canvas background

	// draw player sprite

	// spawn and draw enemy sprites

	// main loop where we ask for input, blank screen, redraw, then ask for input, etc…

	
}

Game.prototype = Object.create(Game.prototype);
Game.prototype.constructor = Game;

Game.prototype.redrawScreen = function() {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (playerReady) {
		ctx.drawImage(player.image, player.x, player.y);
	}

	if (enemyReady) {
		ctx.drawImage(enemyUFO.image, player.x, player.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	// ctx.fillText("Monsterrs caught: " + monstersCaught, 32, 32);
};

$(document).ready(function() {
	// var width = 800,
	// 	height = 800,
		canvas = document.getElementById("theCanvas")
		ctx = canvas.getContext('2d');
	// canvas.width = width;
	// canvas.height = height;
	// document.body.appendChild(canvas);

	var player = new Player(300, 300);
	console.log(player);
	player.draw();


});

function rotateSprite(whichSprite) {
	var image = new Image();
	switch(whichSprite) {
		case 0:
			image.src = "img/player.png";
			break;
		case 1:
			image.src = "img/ufo-cyan.png";
			break;
		case 2:
			image.src = "img/ufo-magenta.png";
			break;
		case 3:
			image.src = "img/ufo-yellow.png";
			break;
		default:
			console.log("Uh oh.");
			break;
	}
	
	function draw(x, y, degrees) {	

		ctx.translate(x + image.width / 2, y + image.height / 2);
		ctx.rotate(degrees * Math.PI / 180);
		ctx.drawImage(image, 0, 0, image.width, image.height, -image.width / 2, -image.height / 2, image.width, image.height);
		ctx.rotate(-degrees * Math.PI / 180);
		ctx.translate(-x - image.width / 2, -y - image.height / 2);
	}

	// TODO: Wrap the following loop in an if statement so that only enemies are constantly rotating

	image.onload = function () {
		var degrees = 0;

		function loop() {
			// ctx.clearRect(0, 0, 800,700);
			degrees = (degrees + 1) % 360;
			draw(0, 0, degrees);
			window.requestAnimationFrame(loop);
		};

		window.requestAnimationFrame(loop);
	};

	// ====================================================================================
};