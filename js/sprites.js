var Sprite = function(x, y, vx, vy, image) {
	this.image = image;
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
}

var enableMovement = true;


var Player = function(x, y, velocity, angle, imagePath, rLaserLevel, gLaserLevel, bLaserLevel, hit, laserFired) {
	vx = 0;
	vy = 0;
	Sprite.call(this, x, y, vx, vy);

	this.playerImage = new Image();
	this.playerImage.src = imagePath;
	this.angle = angle;
	this.velocity = velocity;
	this.acceleration = 0;
	this.rLaserLevel = rLaserLevel;
	this.gLaserLevel = gLaserLevel;
	this.bLaserLevel = bLaserLevel;
}


Player.prototype = Object.create(Sprite.prototype);
Player.prototype.constructor = Player;


Player.prototype.reDraw = function() {

	var centerx = canvas.width / 2 - 42.5;
	var centery = canvas.height / 2 - 42.5;

/*	ctx.save();
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.drawImage(this.playerImage, centerx, centery);
	ctx.translate(canvas.width/2,canvas.height/2);
	ctx.rotate(this.angle *  Math.PI/180);
	ctx.drawImage(this.playerImage,-this.playerImage.width/2,-this.playerImage.width/2);
	ctx.restore(); */

	drawRotated(this.playerImage, this.x, this.y, this.angle);
	//ctx.drawImage(this.playerImage, this.x, this.y, 85, 85);
}

Player.prototype.handleInput = function(event) {
	event.preventDefault();

	if(enableMovement) {
		if(event.keyCode === 38) { // Up Arrow
			console.log("Up Arrow!");
			this.acceleration = 2;
		}

		if(event.keyCode === 37) { // Left Arrow, counterclockwise
			this.angle = (this.angle + Math.PI/4) % (2*Math.PI); // +5 degrees in radians
			console.log("Left Arrow!")
		}

		if(event.keyCode === 39) { // Right Arrow
			console.log("Right Arrow!")
			this.angle =  (this.angle - Math.PI/4) % (2*Math.PI); // -5 degrees in radians
		}
			/* switch(this.angle) {
				case "N":
					this.angle = "NE";
					playerImage.src = "img/player-nevent.png";
					break;
				case "NE":
					this.angle = "E";
					playerImage.src = "img/player-event.png";
					break;
				case "E":
					this.angle = "SE";
					playerImage.src = "img/player-sevent.png";
					break;
				case "SE":
					this.angle = "S";
					playerImage.src = "img/player-s.png";
					break;
				case "S":
					this.angle = "SW";
					playerImage.src = "img/player-sw.png";
					break;
				case "SW":
					this.angle = "W";
					playerImage.src = "img/player-w.png";
					break;
				case "W":
					this.angle = "NW";
					playerImage.src = "img/player-nw.png";
					break;
				case "NW":
					this.angle = "N";
					playerImage.src = "img/player-n.png";
					break;
			}
		} */

		if(event.keyCode === 90) { // fire red

			playerX = currentGame.player.x;
			playerY = currentGame.player.y;

			laserLength = 125;

			// Endpoint x and y offsets
			lx = laserLength * Math.cos(currentGame.player.angle);
			ly = laserLength * Math.sin(currentGame.player.angle);

			currentGame.laser = { exists: true };

			currentGame.laser.y = playerY;
			currentGame.laser.x = playerX;

			currentGame.laser.endpointy = playerY - ly;
			currentGame.laser.endpointx = playerX + lx;

			setTimeout(function(){
				currentGame.laser.exists = false;
			},400)
		}

		if(event.keyCode === 88) { //fire green

		}

		if(event.keyCode === 67) { //fire blue

		}

		console.log(this.x, this.y);
		// refreshCanvas();
	}
}

Player.prototype.updatePhysics = function() {
	if (this.acceleration != 0) {
		this.vy += this.acceleration * Math.sin(this.angle);
		this.vx += this.acceleration * Math.cos(this.angle);
		this.acceleration = 0;
	}

	this.x += this.vx;
	this.y -= this.vy;
}

var UFO = function(x, y, vx, vy, imagePath, color, angle = 0, hit) {
	Sprite.call(this, x, y, vx, vy, imagePath);
	this.color = color;
	this.image = new Image();
	this.image.src = imagePath;
	this.angle = angle;
	this.hit = false;
}
UFO.prototype = Object.create(Sprite.prototype);
UFO.prototype.constructor = UFO;

UFO.prototype.updatePhysics = function() {
	this.angle += (Math.PI/64) % (2*Math.PI);
}
UFO.prototype.reDraw = function() {
	///console.log("ufo.prototype.reDraw was called 😈");

	drawRotated(this.image, this.x, this.y, this.angle, 80);
	//ctx.drawImage(image, this.x, this.y, 85, 85);
}

// UFO.prototype.moveAround = function() {
// 	var randomDirectionSeed = 3;

// 	setInterval(function() {
// 		randomDirectionSeed = Math.floor(Math.random() * 8);
// 	},2000);

// 	switch(randomDirectionSeed) {
// 		case 0:
// 			this.y -= playerSpeed;
// 			break;
// 		case 1:
// 			this.x += playerSpeed;
// 			this.y -= playerSpeed;
// 			break;
// 		case 2:
// 			this.x += playerSpeed;
// 			break;
// 		case 3:
// 			this.x += playerSpeed;
// 			this.y += playerSpeed;
// 			break;
// 		case 4:
// 			this.y += playerSpeed;
// 			break;
// 		case 5:
// 			this.x -= playerSpeed;
// 			this.y += playerSpeed;
// 			break;
// 		case 6:
// 			this.x -= playerSpeed;
// 			break;
// 		case 7:
// 			this.x -= playerSpeed;
// 			this.y -= playerSpeed;
// 			break;
// 	}
// }

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
			image = "img/ufo-cyan.png";
			var color = "cyan";
			break;
		case 1:
			image = "img/ufo-magenta.png"
			var color = "magenta";
			break;
		case 2:
			image = "img/ufo-yellow.png"
			var color = "yellow";
			break;
		default:
			console.log("UFO spawn failed. :(");
			break;
	}
//	var UFO = function(x, y, vx, vy, image, color)
	if (currentGame.ufo.length < 10) {
		currentGame.ufo.push(new UFO(randomX, randomY, 0, 0, image, color));
	}
// 	console.log(index);
// 	currentGame.ufo[index].moveAround();
// 	index++;
// 	console.log(currentGame.ufo)
}


// function rotateSprite(whichSprite) {
// 	var image = new Image();
// 	switch(whichSprite) {
// 		case 0:
// 			image.src = "img/player.png";
// 			break;
// 		case 1:
// 			image.src = "img/ufo-cyan.png";
// 			break;
// 		case 2:
// 			image.src = "img/ufo-magenta.png";
// 			break;
// 		case 3:
// 			image.src = "img/ufo-yellow.png";
// 			break;
// 		default:
// 			console.log("Uh oh.");
// 			break;
// 	}

// 	function draw(x, y, degrees) {

// 		ctx.translate(x + image.width / 2, y + image.height / 2);
// 		ctx.rotate(degrees * Math.PI / 180);
// 		ctx.drawImage(image, 0, 0, image.width, image.height, -image.width / 2, -image.height / 2, image.width, image.height);
// 		ctx.rotate(-degrees * Math.PI / 180);
// 		ctx.translate(-x - image.width / 2, -y - image.height / 2);
// 	}

// 	// TODO: Wrap the following loop in an if statement so that only enemies are constantly rotating

// 	image.onload = function () {
// 		var degrees = 0;

// 		function loop() {
// 			// ctx.clearRect(0, 0, 800,700);
// 			degrees = (degrees + 1) % 360;
// 			draw(0, 0, degrees);
// 			window.requestAnimationFrame(loop);
// 		};

// 		window.requestAnimationFrame(loop);
// 	};
// 	// ====================================================================================
// };


function distanceToPoint(x1,y1,x2,y2)
{
	var xdiff = Math.pow(x2-x1,2);
	var ydiff = Math.pow(y2-y1,2);

	return Math.sqrt(xdiff + ydiff);
}

function detectCollision() {
	currentGame.ufo.forEach(function(oneUFO) {
		if (((oneUFO.x + 62.5) - (currentGame.player.x + 42.5) <= 40 &&
			(oneUFO.y + 62.5) - (currentGame.player.y + 42.5) <= 40)) {
				currentGame.player.hit = true;
			};

		// laser colissions
		if (currentGame.laser.exists === true) {
			ufoRadius = oneUFO.image.width / 2;
			console.log("radius: " + ufoRadius);
			console.log("Im a survivor");
			
			var theDistance = distanceToPoint(currentGame.laser.x, oneUFO.x,
				                currentGame.laser.y, oneUFO.y) ;

			console.log("🔫1: " + theDistance);
			if (theDistance < 50)
			{
				oneUFO.hit = true;
			}
			theDistance = distanceToPoint(currentGame.laser.x, oneUFO.x,
				                currentGame.laser.y, oneUFO.y)

			console.log("🔫2: " + theDistance);
			if (theDistance < 50)
			{
				oneUFO.hit = true;
			}
		}

		/*if (currentGame.laser.exists === true &&
			(((oneUFO.x + 62.5) - (currentGame.player.x + 42.5)) <= 124 && ((oneUFO.y + 62.5) - (currentGame.player.y + 42.5)) <= 124) ||
			(((currentGame.player.x + 42.5) - (oneUFO.x + 42.5)) <= 124 && ((currentGame.player.y + 42.5) - (oneUFO.y + 62.5)) <= 124)) {
				oneUFO.hit = true;
			}; */
		// if (currentGame.player.hit = true) {
			// enableMovement = false;
			// playerImage.src = "img/mindblown.png"; };
	});
};
