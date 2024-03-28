const canvas = document.getElementById('juliaCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const max_iter = 256;
const c = { x: -0.7, y: 0.27015 };

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
    const color = m === max_iter ? 0 : 255 - Math.floor(255 * m / max_iter);
    ctx.fillStyle = `rgb(${color}, 0, 0)`;
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

