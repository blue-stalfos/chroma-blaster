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

var gameRules = ["Blow up the UFOs before they blow up your ship!", "Aim and fire your laser to destroy the UFOs flying around you in space.", "Use lasers of a complimentary color to destroy:", "🚀 Red destroys Cyan", "🛸 Blue destroys Yellow", "👾 Green destroys Magenta", "Using the wrong color will make them bigger.", "See how long you can last!", "User ARROW KEYS to move and Z, X, C to fire different colored lasers."];

$(document).ready(function() {
	var MyCanvas = document.getElementById("theCanvas");
	var ctx = MyCanvas.getContext("2d");

});

function rotateSprite() {

	var width = 600,
		height = 600,
		canvas = document.getElementById(cnvs)
		context = canvas.getContext('2d');
	canvas.width = width;
	canvas.height = height;
	var image = new Image();
	image.src = 'http://www.dialfredo.com/wp-content/uploads/2015/05/redapplepic.jpg';
	
	function draw(x, y, degrees) {
		context.translate(x + image.width / 2, y + image.height / 2);
		context.rotate(degrees * Math.PI / 180);
		context.drawImage(image, 0, 0, image.width, image.height,
			-image.width / 2, -image.height / 2, image.width, image.height);
		context.rotate(-degrees * Math.PI / 180);
		context.translate(-x - image.width / 2, -y - image.height / 2);
	}

	image.onload = function () {
		var degrees = 0;
		function loop() {
		degrees = (degrees + 1) % 360;
		draw(0, 0, degrees);
		window.requestAnimationFrame(loop);
		};
		window.requestAnimationFrame(loop);
	};
};

	
	
	



