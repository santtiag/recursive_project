const canvas = document.getElementById('barnsleyCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;

function barnsleyFern(x, y, depth) {
    if (depth === 0) return;

    const r = Math.random();
    let nextX, nextY;

    if (r < 0.01) {
        nextX = 0;
        nextY = 0.16 * y;
    } else if (r < 0.86) {
        nextX = 0.85 * x + 0.04 * y;
        nextY = -0.04 * x + 0.85 * y + 1.6;
    } else if (r < 0.93) {
        nextX = 0.2 * x - 0.26 * y;
        nextY = 0.23 * x + 0.22 * y + 1.6;
    } else {
        nextX = -0.15 * x + 0.28 * y;
        nextY = 0.26 * x + 0.24 * y + 0.44;
    }

    const plotX = width / 2 + nextX * width / 10;
    const plotY = height - nextY * height / 12;

    ctx.fillStyle = 'green';
    ctx.fillRect(plotX, plotY, 1, 1);

    barnsleyFern(nextX, nextY, depth - 1);
}

barnsleyFern(0, 0, 5000); 

