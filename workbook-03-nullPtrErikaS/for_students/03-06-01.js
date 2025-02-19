// @ts-check
export {};

const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");

let angle = 0;
let motorAngle = 0;
const propellerSpeeds = [1, 1.2, 1.4, 1.6]; // Different speeds for each propeller

const quadcopters = [
    { x: 100, y: 100, angle: 0, color: "red", path: "circle" },
    { x: 200, y: 200, angle: 0, color: "green", path: "zigzag" },
    { x: 300, y: 300, angle: 0, color: "blue", path: "random" }
];

function drawQuadcopter(context, x, y, angle, color) {
    context.save();
    context.translate(x, y);
    context.rotate(angle);

    const armLength = 30;
    const propellerLength = 10;
    context.strokeStyle = "black";
    context.lineWidth = 2;

    // Draw the body of the quadcopter
    context.fillStyle = color;
    context.fillRect(-10, -10, 20, 20);

    // Draw a more prominent marker for the front (arrow shape)
    context.fillStyle = "blue";
    context.beginPath();
    context.moveTo(0, -15); // Start at the front center
    context.lineTo(5, -25); // Right corner of the triangle
    context.lineTo(-5, -25); // Left corner of the triangle
    context.closePath();
    context.fill();

    for (let i = 0; i < 4; i++) {
        context.save();
        // Position arms at 90 degree intervals
        context.rotate(Math.PI / 2 * i);
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(armLength, 0);
        context.stroke();

        // Draw propellers at the end of each arm
        context.translate(armLength, 0); // Move to the end of the arm
        context.rotate(motorAngle * propellerSpeeds[i]); // Rotate propeller based on its speed
        context.fillStyle = "red";
        context.beginPath();
        context.moveTo(-propellerLength, -2);
        context.lineTo(propellerLength, -2);
        context.lineTo(propellerLength, 2);
        context.lineTo(-propellerLength, 2);
        context.closePath();
        context.fill();
        context.restore();
    }
    context.restore();
}

function updateQuadcopters() {
    quadcopters.forEach((quadcopter) => {
        switch (quadcopter.path) {
            case "circle":
                quadcopter.x = 200 + 100 * Math.cos(angle);
                quadcopter.y = 200 + 100 * Math.sin(angle);
                quadcopter.angle = angle;
                break;
            case "zigzag":
                quadcopter.x += Math.sin(angle) * 2;
                quadcopter.y += Math.cos(angle) * 2;
                quadcopter.angle += 0.05;
                break;
            case "random":
                quadcopter.x += (Math.random() - 0.5) * 4;
                quadcopter.y += (Math.random() - 0.5) * 4;
                quadcopter.angle += (Math.random() - 0.5) * 0.1;
                break;
        }
    });
}

// ...existing code...

const dog = {
    x: 400,
    y: 400,
    tailAngle: 0,
    tailDirection: 1
};

function drawDog(context, x, y, tailAngle) {
    context.save();
    context.translate(x, y);

    // Draw the body
    context.fillStyle = "brown";
    context.fillRect(-20, -10, 40, 20);

    // Draw the head
    context.beginPath();
    context.arc(-20, -15, 10, 0, Math.PI * 2);
    context.fill();

    // Draw the tail
    context.save();
    context.translate(20, 0);
    context.rotate(tailAngle);
    context.fillRect(0, -2, 20, 4);
    context.restore();

    context.restore();
}

function updateDog() {
    dog.tailAngle += dog.tailDirection * 0.1;
    if (dog.tailAngle > 0.5 || dog.tailAngle < -0.5) {
        dog.tailDirection *= -1;
    }
}

// ...existing code...

const lasers = [];

function drawLaser(context, x, y) {
    context.save();
    context.strokeStyle = "red";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + 10, y);
    context.stroke();
    context.restore();
}

function updateLasers() {
    for (let i = lasers.length - 1; i >= 0; i--) {
        lasers[i].x += 5;
        if (lasers[i].x > canvas.width) {
            lasers.splice(i, 1);
        }
    }
}

function shootLaser(quadcopter) {
    lasers.push({ x: quadcopter.x, y: quadcopter.y });
}

setInterval(() => {
    const greenQuadcopter = quadcopters.find(q => q.color === "green");
    if (greenQuadcopter) {
        shootLaser(greenQuadcopter);
    }
}, 1000);

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    quadcopters.forEach((quadcopter) => {
        drawQuadcopter(context, quadcopter.x, quadcopter.y, quadcopter.angle, quadcopter.color);
    });
    drawDog(context, dog.x, dog.y, dog.tailAngle);
    lasers.forEach(laser => drawLaser(context, laser.x, laser.y));
    motorAngle += 0.1;
    angle += 0.01;
    updateQuadcopters();
    updateDog();
    updateLasers();
    requestAnimationFrame(draw);
}

canvas.addEventListener("keydown", (event) => {
    const speed = 5;
    const blueQuadcopter = quadcopters.find(q => q.color === "blue");
    if (!blueQuadcopter) return;

    switch (event.key) {
        case "ArrowUp":
            blueQuadcopter.y -= speed;
            break;
        case "ArrowDown":
            blueQuadcopter.y += speed;
            break;
        case "ArrowLeft":
            blueQuadcopter.x -= speed;
            break;
        case "ArrowRight":
            blueQuadcopter.x += speed;
            break;
    }
});

canvas.setAttribute("tabindex", "0");
canvas.focus();

draw();