const canvas = document.getElementById('mandelbrotCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;


let baseColor = { r: 0, g: 0, b: 0 };


document.getElementById('iterations').addEventListener('input', function() {
    max_iter = this.value;
    drawMandelbrotRow(0);
});


document.getElementById('colorR').addEventListener('input', function() {
    baseColor.r = parseInt(this.value);
    drawMandelbrotRow(0);
});

document.getElementById('colorG').addEventListener('input', function() {
    baseColor.g = parseInt(this.value);
    drawMandelbrotRow(0);
});

document.getElementById('colorB').addEventListener('input', function() {
    baseColor.b = parseInt(this.value);
    drawMandelbrotRow(0);
});




function mandelbrot(c, z = { x: 0, y: 0 }, n = 0) {
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

    return mandelbrot(c, z_next, n + 1);
}

function drawPixel(x, y) {
    const min_x = -2, max_x = 1;
    const min_y = -1.5, max_y = 1.5;
    const c = {
        x: min_x + (x / width) * (max_x - min_x),
        y: min_y + (y / height) * (max_y - min_y)
    };

    const m = mandelbrot(c);
    const scale = m === max_iter ? 0 : 255 - Math.floor(255 * m / max_iter);
    const color = `rgb(${baseColor.r + scale % 255}, ${baseColor.g + scale % 255}, ${baseColor.b + scale % 255})`;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
}

function drawMandelbrotRow(y) {
    if (y >= height) {
        return;
    }

    for (let x = 0; x < width; x++) {
        drawPixel(x, y);
    }

    // Llamada recursiva para la siguiente fila
    requestAnimationFrame(() => drawMandelbrotRow(y + 1));
}

drawMandelbrotRow(0);

