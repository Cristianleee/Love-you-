const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 300;

const cuteWords = [
    "Ты чудо! ✨", 
    "Люблю тебя! ❤️", 
    "Ты моё счастье 😊", 
    "Ты такая милота 💕", 
    "Сияй ярко, как звезда! ✨"
];

function drawHeart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const type = Math.floor(Math.random() * 3);
    
    ctx.fillStyle = getRandomColor();
    
    if (type === 0) {
        animateClassicHeart();
    } else if (type === 1) {
        animatePixelHeart();
    } else {
        animateBezierHeart();
    }

    document.getElementById("cuteText").textContent = 
        cuteWords[Math.floor(Math.random() * cuteWords.length)];
}

function animateClassicHeart() {
    let scale = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.translate(150, 150);
        ctx.scale(scale, scale);
        ctx.translate(-150, -150);
        drawClassicHeart();
        ctx.restore();
        
        if (scale < 1) {
            scale += 0.05;
            requestAnimationFrame(animate);
        }
    }
    animate();
}

function animatePixelHeart() {
    let opacity = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = opacity;
        drawPixelHeart();
        ctx.globalAlpha = 1;
        
        if (opacity < 1) {
            opacity += 0.05;
            requestAnimationFrame(animate);
        }
    }
    animate();
}

function animateBezierHeart() {
    let progress = 0;
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 3;
        ctx.strokeStyle = getRandomColor();
        
        drawBezierHeart(progress);
        
        if (progress < 1) {
            progress += 0.03;
            requestAnimationFrame(animate);
        }
    }
    animate();
}

function drawClassicHeart() {
    ctx.beginPath();
    ctx.moveTo(150, 200);
    ctx.bezierCurveTo(50, 100, 100, 20, 150, 70);
    ctx.bezierCurveTo(200, 20, 250, 100, 150, 200);
    ctx.fill();
}

function drawPixelHeart() {
    const size = 10;
    for (let y = 5; y >= 0; y--) {
        for (let x = 0; x < 5; x++) {
            if ((y === 5 && (x === 1 || x === 3)) ||
                (y === 4 && (x >= 0 && x <= 4)) ||
                (y === 3 && (x === 0 || x === 4)) ||
                (y === 2 && (x === 0 || x === 4)) ||
                (y === 1 && (x === 1 || x === 3)) ||
                (y === 0 && x === 2)) {
                ctx.fillRect(100 + x * size, 100 + y * size, size, size);
            }
        }
    }
}

function drawBezierHeart(progress) {
    ctx.beginPath();
    ctx.moveTo(150, 180);
    
    ctx.bezierCurveTo(80, 120, 110, 40, 150, 70);
    ctx.bezierCurveTo(190, 40, 220, 120, 150, 180);
    
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(150, 180);
    
    if (progress > 0.5) {
        ctx.bezierCurveTo(80, 120, 110, 40, 150, 70);
    }
    if (progress > 0.75) {
        ctx.bezierCurveTo(190, 40, 220, 120, 150, 180);
    }
    
    ctx.fill();
}

function getRandomColor() {
    return `hsl(${Math.random() * 360}, 80%, 60%)`;
}

drawHeart();