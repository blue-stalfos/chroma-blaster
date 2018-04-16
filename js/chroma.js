// window.onload = () => {
// 	canvas = <HTMLCanvasElement>document.getElementById('cnvs');
// 	ctx = canvas.getContext("2d");
// 	gameLoop();
// }

// function gameLoop() {
//    requestAnimationFrame(gameLoop);
//    ctx.fillStyle = "black";
//    ctx.fillRect(0, 0, 1280, 720);
// }

var gameRules = [	"Blow up the UFOs before they blow up your ship!", 
					"Aim and fire your laser to destroy the UFOs flying around you in space.", 
					"Use lasers of a complimentary color to destroy:", 
					"🚀 Red destroys Cyan", 
					"🛸 Blue destroys Yellow", 
					"👾 Green destroys Magenta", 
					"Using the wrong color will make them bigger.", 
					"See how long you can last!", 
					"User ARROW KEYS to move and Z, X, C to fire different colored lasers."];

function Sprite(color, spriteImg) {
	this.color = color;
	this.spriteImg = spriteImg;
}

$(document).ready(function() {
	var width = 800,
		height = 700,
		canvas = document.getElementById("theCanvas")
		context = canvas.getContext('2d');
	canvas.width = width;
	canvas.height = height;

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
	

	// image.src = "img/ufo-cyan.png";
	
	function draw(x, y, degrees) {	
		// context.clearRect(image.x, image.y, image.width, image.height);
		// context.clearRect(0,0,600,600);

		context.translate(x + image.width / 2, y + image.height / 2);
		context.rotate(degrees * Math.PI / 180);
		context.drawImage(image, 0, 0, image.width, image.height, -image.width / 2, -image.height / 2, image.width, image.height);
		context.rotate(-degrees * Math.PI / 180);
		context.translate(-x - image.width / 2, -y - image.height / 2);
	}

	// TODO: Wrap the following loop in an if statement so that only enemies are constantly rotating

	image.onload = function () {
		var degrees = 0;
		function loop() {
			degrees = (degrees + 1) % 360;
			draw(0, 0, degrees);
			window.requestAnimationFrame(loop);
		};
		window.requestAnimationFrame(loop);
	};

	// ====================================================================================
};