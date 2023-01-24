const canvasEl = document.querySelector("canvas");
const canvasCtx = canvasEl.getContext("2d");

const field = {
    w: window.innerWidth,
    h: window.innerHeight,
    draw: function () {
        //desenho do campo
        canvasCtx.fillStyle = "#286047";
        canvasCtx.fillRect(0, 0, this.w, this.h)
    }
}

const line = {
    w: 15,
    h: field.h,
    draw: function () {
        //desnho da linha central
        canvasCtx.fillStyle = "#FFFFFF";
        canvasCtx.fillRect(field.w / 2 - this.w / 2, 0, this.w, field.h);
    }
}

const mouse = {
    x: 0,
    y: 0
}

const leftPaddle = {
    x: 10,
    y: field.h / 2,
    w: line.w,
    h: 200,
    _move: function () {
        this.y = mouse.y;
    },
    draw: function () {
        //desenho da raquete esquerda
        canvasCtx.fillStyle = "#FFFFFF";
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
        this._move();
    }
}

const rightPaddle = {
    x: field.w - line.w - 10,
    y: field.h / 2,
    w: line.w,
    h: 200,
    _move: function () {
        this.y = ball.y;
    },
    draw: function () {
        //desenho da raquete direita
        canvasCtx.fillStyle = "#FFFFFF";
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
        this._move();
    }
}

const ball = {
    x: field.w / 2,
    y: field.h / 2,
    r: 20,
    speed: 5,
    yDir: 1,
    xDir: 1,
    _calcPosition: function () {
        if (this.y > field.h || this.y < 0) {
            this._reverseY();
        }
        if (this.x > field.w || this.x < 0) {
            this._reverseX();
        }
    },
    _reverseX: function () {
        this.xDir *= -1;
    },
    _reverseY: function () {
        this.yDir *= -1;
    },
    _move: function () {
        this.x += this.xDir * this.speed;
        this.y += this.yDir * this.speed;
    },
    draw: function () {
        //desenho da bolinha
        canvasCtx.fillStyle = "#FFFFFF";
        canvasCtx.beginPath();
        canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        canvasCtx.fill();
        this._move();
        this._calcPosition();
    }

}

function setup() {
    canvasEl.width = canvasCtx.width = window.innerWidth;
    canvasEl.height = canvasCtx.height = window.innerHeight;
}

function draw() {
    //campo
    field.draw();
    line.draw();
    //raquetes
    leftPaddle.draw();
    rightPaddle.draw();
    //bolinha
    ball.draw();
}

window.animateFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, 1000 / 60)
        }
    )
})()

function main() {
    animateFrame(main);
    draw();
}

setup();
main();

canvasEl.addEventListener('mousemove', function (e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
})
