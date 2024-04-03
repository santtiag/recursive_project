const canvas = document.getElementById('juliaCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const c = { x: -0.7, y: 0.27015 };


let baseColor = { r: 255, g: 0, b: 0 };

document.getElementById('iterations').addEventListener('input', function() {
    max_iter = this.value;
    drawJuliaRow(0);
});

document.getElementById('colorR').addEventListener('input', function() {
    baseColor.r = parseInt(this.value);
    drawJuliaRow(0);
});

document.getElementById('colorG').addEventListener('input', function() {
    baseColor.g = parseInt(this.value);
    drawJuliaRow(0);
});

document.getElementById('colorB').addEventListener('input', function() {
    baseColor.b = parseInt(this.value);
    drawJuliaRow(0);
});



function julia(z, c, n = 0) {
    if (n >= max_iter) {
        return max_iter;
    }

    const z_next = {
        x: z.x * z.x - z.y * z.y + c.x,
        y: 2 * z.x * z.y + c.y
    };

    if (z_next.x * z_next.x + z_next.y * z_next.y > 4) {
        return n;
    }

    return julia(z_next, c, n + 1);
}

function drawJuliaPixel(x, y) {
    const min_x = -1.5, max_x = 1.5;
    const min_y = -1.5, max_y = 1.5;
    const z = {
        x: min_x + (x / width) * (max_x - min_x),
        y: min_y + (y / height) * (max_y - min_y)
    };
    const m = julia(z, c);
    const scale = m === max_iter ? 0 : 255 - Math.floor(255 * m / max_iter);

    const color = `rgb(${baseColor.r + scale % 255}, ${baseColor.g + scale % 255}, ${baseColor.b + scale % 255})`;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
}

function drawJuliaRow(y) {
    if (y >= height) {
        return;
    }

    for (let x = 0; x < width; x++) {
        drawJuliaPixel(x, y);
    }

    requestAnimationFrame(() => drawJuliaRow(y + 1));
}

drawJuliaRow(0);

