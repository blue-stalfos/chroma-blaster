var Sprite = function(x, y, vx, vy, image) {
	this.image = image;
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
}

var playerSpeed = 15;
var playerImage = new Image();
var Player = function(x, y, vx, vy, direction, image, rLaserLevel, gLaserLevel, bLaserLevel) {
	Sprite.call(this, x, y, vx, vy);
	this.direction = direction;
	this.image = image;
	this.rLaserLevel = rLaserLevel;
	this.gLaserLevel = gLaserLevel;
	this.bLaserLevel = bLaserLevel;
}

Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.draw = function() {
	playerImage.src = currentGame.player.image;
	console.log(this.x, this.y);

	var that = this;

	playerImage.onload = function() {
		ctx.drawImage(playerImage, that.x, that.y, 85, 85);
	}
}
Player.prototype.reDraw = function() {
	ctx.drawImage(playerImage, this.x, this.y, 85, 85);
}
Player.prototype.move = function(e) {
	e.preventDefault();

	if(e.keyCode === 38) { // Up Arrow
		console.log("Up Arrow!");
		switch(this.direction) {
			case "N":
				this.y -= playerSpeed;
				break;
			case "NE":
				this.x += playerSpeed;
				this.y -= playerSpeed;
				break;
			case "E":
				this.x += playerSpeed;
				break;
			case "SE":
				this.x += playerSpeed;
				this.y += playerSpeed;
				break;
			case "S":
				this.y += playerSpeed;
				break;
			case "SW":
				this.x -= playerSpeed;
				this.y += playerSpeed;
				break;
			case "W":
				this.x -= playerSpeed;
				break;
			case "NW":
				this.x -= playerSpeed;
				this.y -= playerSpeed;
				break;
		}
	} 

	if(e.keyCode === 37) { // Left Arrow
		console.log("Left Arrow!")
		switch(this.direction) {
			case "N":
				this.direction = "NW";
				playerImage.src = "img/player-nw.png";
				break;
			case "NE":
				this.direction = "N";
				playerImage.src = "img/player-n.png";
				break;
			case "E":
				this.direction = "NE";
				playerImage.src = "img/player-ne.png";
				break;
			case "SE":
				this.direction = "E";
				playerImage.src = "img/player-e.png";
				break;
			case "S":
				this.direction = "SE";
				playerImage.src = "img/player-se.png";
				break;
			case "SW":
				this.direction = "S";
				playerImage.src = "img/player-s.png";
				break;
			case "W":
				this.direction = "SW";
				playerImage.src = "img/player-sw.png";
				break;
			case "NW":
				this.direction = "W";
				playerImage.src = "img/player-w.png";
				break;
		}
	}

	if(e.keyCode === 39) { // Right Arrow
		console.log("Right Arrow!")
		switch(this.direction) {
			case "N":
				this.direction = "NE";
				playerImage.src = "img/player-ne.png";
				break;
			case "NE":
				this.direction = "E";
				playerImage.src = "img/player-e.png";
				break;
			case "E":
				this.direction = "SE";
				playerImage.src = "img/player-se.png";
				break;
			case "SE":
				this.direction = "S";
				playerImage.src = "img/player-s.png";
				break;
			case "S":
				this.direction = "SW";
				playerImage.src = "img/player-sw.png";
				break;
			case "SW":
				this.direction = "W";
				playerImage.src = "img/player-w.png";
				break;
			case "W":
				this.direction = "NW";
				playerImage.src = "img/player-nw.png";
				break;
			case "NW":
				this.direction = "N";
				playerImage.src = "img/player-n.png";
				break;
		}
	}
	console.log(this.x, this.y);
	refreshCanvas();
}

var UFO = function(x, y, vx, vy, image, color) {
	Sprite.call(this, x, y, vx, vy, image);
	this.color = color;
	this.image = image;
}	
UFO.prototype = Object.create(UFO.prototype);
UFO.prototype.constructor = UFO;
UFO.prototype.reDraw = function(index) {
	ctx.drawImage(this[index].image, this.x, this.y, 85, 85);
}
function spawnUFO() {
	var randomX = Math.floor(Math.random() * canvas.width);
	var randomY = Math.floor(Math.random() * canvas.height);
	var randomColorSeed = Math.floor(Math.random() * 3);
	var image = null;
	var color = null;

	switch(randomColorSeed) {
		case 0:
			var image = "img/ufo-cyan.png";
			var color = "cyan";
			break;
		case 1:
			var image = "img/ufo-magenta.png"
			var color = "magenta";
			break;
		case 2:
			var image = "img/ufo-yellow.png"
			var color = "yellow";
			break;
		default:
			console.log("UFO spawn failed. :(");
			break;
	}
//	var UFO = function(x, y, vx, vy, image, color)
	currentGame.ufo.push(new UFO(randomX, randomY, 0, 0, image, color));
}
// UFO.prototype.move = function() {
	
// }

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