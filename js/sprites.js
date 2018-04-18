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

	playerImage.onload = function() {
		ctx.drawImage(playerImage, that.x, that.y, 62, 85);
	}
}

Player.prototype.move = function(e) {
	switch(e) {
		case e.keyCode === 38:
			if(this.degrees % 90 !== 0) {
				this.x += Math.cos(this.degrees);
				this.y += Math.sin(this.degrees);
			}
			if(player.degrees === 0) {
				this.y -= 2;
			}
			if(player.degrees === 90) {
				this.x += 2;
			}
			if(player.degrees === 180) {
				this.y =+ 2;
			}
			if(player.degrees === 270) {
				this.x -= 2;
			}
			break;
		
		case e.keyCode === 37:
			this.degrees -= 2;
			break;
		
		case e.keyCode === 39:
			this.degrees += 2;
			break;
	}
	// this.draw();
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

	this.push(new UFO(randomColor, randomX, randomY, 0, 0));
}

UFO.prototype.move = function() {
	if(this.degrees % 90 !== 0) {
		this.x += Math.cos(player.degrees);
		this.y += Math.sin(player.degrees);
	}
	if(player.degrees === 0) {
		this.y -= 2;
	}
	if(player.degrees === 90) {
		this.x += 2;
	}
	if(player.degrees === 180) {
		this.y =+ 2;
	}
	if(player.degrees === 270) {
		this.x -= 2;
	}
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