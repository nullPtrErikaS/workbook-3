/**
 *
 * @param {HTMLCanvasElement} canvas
 */
function picture(canvas) {
    const context = canvas.getContext("2d");
    // Translate to the center of the canvas
    context.translate(canvas.width / 2, canvas.height / 2);
    // Scale to go from -100 to 100 in both x and y, and invert the y-axis
    context.scale(canvas.width / 200, -canvas.height / 200);
    // now I'll draw something...
    context.fillStyle = "lightgray";
    context.beginPath();
    context.moveTo(0, -100);
    context.lineTo(100, 0);
    context.lineTo(0, 100);
    context.lineTo(-100, 0);
    context.fill();
    // draw the plus in the center
    context.strokeStyle = "darkred";
    context.lineWidth = 2;
    context.beginPath();
    const dx = 20;
    context.moveTo(0, -dx);
    context.lineTo(0, dx);
    context.moveTo(-dx, 0);
    context.lineTo(dx, 0);
    context.stroke();
    // draw the T
    context.strokeStyle = 'darkblue';
    context.beginPath();
    context.moveTo(-90, 90);
    context.lineTo(-70, 90);
    context.moveTo(-80, 90);
    context.lineTo(-80, 70);
    context.stroke();
}

["canvas1", "canvas2", "canvas3"].forEach(function (name) {
    picture( /** @type {HTMLCanvasElement} */ (document.getElementById(name)));
});