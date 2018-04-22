var Sprite = function(x, y, vx, vy, image) {
	this.image = image;
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
}

var enableMovement = true;
var playerSpeed = 15;
var playerImage = new Image();
var Player = function(x, y, vx, vy, direction, image, rLaserLevel, gLaserLevel, bLaserLevel, hit, laserFired) {
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

	if(enableMovement) {

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

		if(e.keyCode === 90) { // fire red

			currentGame.laser = { exists: true };
		
			console.log(currentGame);
			switch(this.direction) {
				case "N":
					currentGame.laser.x = currentGame.player.x + 42.5;
					currentGame.laser.y = currentGame.player.y + 0;
					currentGame.laser.endpointx = currentGame.player.x + 0 + 42.5;
					currentGame.laser.endpointy = currentGame.player.y - 125 + 0;
					// ctx.moveTo(currentGame.player.x, currentGame.player.y);
					// ctx.lineTo(currentGame.player.x + 0, currentGame.player.y - 25);
					// ctx.strokeStyle="red";
					// ctx.stroke();
					break;
				case "NE":
					currentGame.laser.x = currentGame.player.x + 85;
					currentGame.laser.y = currentGame.player.y + 0;
					currentGame.laser.endpointx = currentGame.player.x + 125 + 85;
					currentGame.laser.endpointy = currentGame.player.y - 125 + 0;
					// ctx.moveTo(currentGame.player.x, currentGame.player.y);
					// ctx.lineTo(currentGame.player.x + 25, currentGame.player.y - 25);
					// ctx.strokeStyle="red";
					// ctx.stroke();
					break;
				case "E":
					currentGame.laser.x = currentGame.player.x + 85;
					currentGame.laser.y = currentGame.player.y + 42.5;
					currentGame.laser.endpointx = currentGame.player.x + 125 + 85;
					currentGame.laser.endpointy = currentGame.player.y + 0 + 42.5;
					// ctx.moveTo(currentGame.player.x, currentGame.player.y);
					// ctx.lineTo(currentGame.player.x + 25, currentGame.player.y + 0);
					// ctx.strokeStyle="red";
					// ctx.stroke();
					break;
				case "SE":
					currentGame.laser.x = currentGame.player.x + 85;
					currentGame.laser.y = currentGame.player.y + 85;
					currentGame.laser.endpointx = currentGame.player.x + 125 + 85;
					currentGame.laser.endpointy = currentGame.player.y + 125 + 85;
					// ctx.moveTo(currentGame.player.x, currentGame.player.y);
					// ctx.lineTo(currentGame.player.x + 25, currentGame.player.y +25);
					// ctx.strokeStyle="red";
					// ctx.stroke();
					break;
				case "S":
					currentGame.laser.x = currentGame.player.x + 42.5;
					currentGame.laser.y = currentGame.player.y + 85;
					currentGame.laser.endpointx = currentGame.player.x + 0 + 42.5;
					currentGame.laser.endpointy = currentGame.player.y + 125 + 85;
					// ctx.moveTo(currentGame.player.x, currentGame.player.y);
					// ctx.lineTo(currentGame.player.x + 0, currentGame.player.y + 25);
					// ctx.strokeStyle="red";
					// ctx.stroke();
					break;
				case "SW":
					currentGame.laser.x = currentGame.player.x + 0;
					currentGame.laser.y = currentGame.player.y + 85;
					currentGame.laser.endpointx = currentGame.player.x - 125 + 0;
					currentGame.laser.endpointy = currentGame.player.y + 125 + 85;
					// ctx.moveTo(currentGame.player.x, currentGame.player.y);
					// ctx.lineTo(currentGame.player.x - 25, currentGame.player.y + 25);
					// ctx.strokeStyle="red";
					// ctx.stroke();
					break;
				case "W":
					currentGame.laser.x = currentGame.player.x + 0;
					currentGame.laser.y = currentGame.player.y + 42.5;
					currentGame.laser.endpointx = currentGame.player.x - 125 + 0;
					currentGame.laser.endpointy = currentGame.player.y + 0 + 42.5;
					// ctx.moveTo(currentGame.player.x, currentGame.player.y);
					// ctx.lineTo(currentGame.player.x + 25, currentGame.player.y + 0);
					// ctx.strokeStyle="red";
					// ctx.stroke();
					break;
				case "NW":
					currentGame.laser.x = currentGame.player.x + 0;
					currentGame.laser.y = currentGame.player.y + 0;
					currentGame.laser.endpointx = currentGame.player.x - 125 + 0;
					currentGame.laser.endpointy = currentGame.player.y - 125 + 0;
					// ctx.moveTo(currentGame.player.x, currentGame.player.y);
					// ctx.lineTo(currentGame.player.x - 25, currentGame.player.y - 25);
					// ctx.strokeStyle="red";
					// ctx.stroke();
					break;
			}

			setTimeout(function(){
				currentGame.laser.exists = false;
			},400)
		}

		if(e.keyCode === 88) { //fire green
			
		}

		if(e.keyCode === 67) { //fire blue
			
		}

		console.log(this.x, this.y);
		// refreshCanvas();
	}
}

var UFO = function(x, y, vx, vy, image, color, direction, hit) {
	Sprite.call(this, x, y, vx, vy, image);
	this.color = color;
	this.image = image;
	this.direction = direction;
}	
UFO.prototype = Object.create(Sprite.prototype);
UFO.prototype.constructor = UFO;

UFO.prototype.reDraw = function() {
	var theImage = new Image();
	theImage.src = this.image;
	ctx.drawImage(theImage, this.x, this.y, 85, 85);
}

UFO.prototype.moveAround = function() {
	var randomDirectionSeed = 3;
	
	setInterval(function() {
		randomDirectionSeed = Math.floor(Math.random() * 8);
	},2000);

	switch(randomDirectionSeed) {
		case 0:
			this.y -= playerSpeed;
			break;
		case 1:
			this.x += playerSpeed;
			this.y -= playerSpeed;
			break;
		case 2:
			this.x += playerSpeed;
			break;
		case 3:
			this.x += playerSpeed;
			this.y += playerSpeed;
			break;
		case 4:
			this.y += playerSpeed;
			break;
		case 5:
			this.x -= playerSpeed;
			this.y += playerSpeed;
			break;
		case 6:
			this.x -= playerSpeed;
			break;
		case 7:
			this.x -= playerSpeed;
			this.y -= playerSpeed;
			break;
	}
}

var index = 0;
function spawnUFO() {
	// var index = 0;
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
// 	console.log(index);
// 	currentGame.ufo[index].moveAround();
// 	index++;
// 	console.log(currentGame.ufo)
}


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

function detectCollision() {
	currentGame.ufo.forEach(function(oneUFO) {
		if (((oneUFO.x + 62.5) - (currentGame.player.x + 42.5) <= 40 && 
			(oneUFO.y + 62.5) - (currentGame.player.y + 42.5) <= 40)) {
				currentGame.player.hit = true;
			};
		if (currentGame.laser.exists = true && 
			(((oneUFO.x + 62.5) - (currentGame.player.x + 42.5)) <= 124 && ((oneUFO.y + 62.5) - (currentGame.player.y + 42.5)) <= 124) ||
			(((currentGame.player.x + 42.5) - (oneUFO.x + 42.5)) <= 124 && ((currentGame.player.y + 42.5) - (oneUFO.y + 62.5)) <= 124)) {
				oneUFO.hit = true;
			};
		if (oneUFO.hit === true) { oneUFO.image = "img/blank.png"; };
		// if (currentGame.player.hit = true) { 
			// enableMovement = false;
			// playerImage.src = "img/mindblown.png"; };
	});
};