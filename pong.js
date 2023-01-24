const canvasEl = document.querySelector("canvas");
const canvasCtx = canvasEl.getContext("2d");
//campo
const field = {
    w: window.innerWidth,
    h: window.innerHeight,
    draw: function () {
        canvasCtx.fillStyle = "#286047";
        canvasCtx.fillRect(0, 0, this.w, this.h)
    }
}
//linha central
const line = {
    w: 15,
    h: field.h,
    draw: function () {
        canvasCtx.fillStyle = "#FFFFFF";
        canvasCtx.fillRect(field.w / 2 - this.w / 2, 0, this.w, field.h);
    }
}

const mouse = {
    x: 0,
    y: 0
}
const gapX = 10;
//raquete jogador
const leftPaddle = {
    x: gapX,
    y: field.h / 2,
    w: line.w,
    h: 200,
    _move: function () {
        this.y = mouse.y;
    },
    draw: function () {
        canvasCtx.fillStyle = "#FFFFFF";
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
        this._move();
    }
}
//raquete oponente
const rightPaddle = {
    x: field.w - line.w - gapX,
    y: field.h / 2,
    w: line.w,
    h: 200,
    _move: function () {
        this.y = ball.y;
    },
    draw: function () {
        canvasCtx.fillStyle = "#FFFFFF";
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
        this._move();
    }
}
//bolinha
const ball = {
    x: field.w / 2,
    y: field.h / 2,
    r: 20,
    speed: 5,
    yDir: 1,
    xDir: 1,
    _calcPosition: function () {
        if (this.x > field.w - this.r - rightPaddle.w - gapX) {
            if (this.y + this.r > rightPaddle.y && this.y - this.r < rightPaddle.y + rightPaddle.h) {
                this.xDir *= -1; //colisão raquete oponente
            } else {
                //ponto
            }
        }
        if (this.x < this.r + leftPaddle.w + gapX) {
            if (this.y + this.r > leftPaddle.y && this.y - this.r < leftPaddle.y + leftPaddle.h) {
                this.xDir *= -1; //colisão raquete jogador
            } else {
                //ponto
            }
        }
        if (this.y > field.h - this.r || this.y < this.r) {
            this.yDir *= -1; //colisão borda inferior e superior do campo
        }
        if (this.x > field.w || this.x < 0) {
            this.xDir *= -1; //temp colisão bordas laterais a ser substituida pelo ponto
        }
    },
    _move: function () {
        this.x += this.xDir * this.speed;
        this.y += this.yDir * this.speed;
    },
    draw: function () {
        canvasCtx.fillStyle = "#FFFFFF";
        canvasCtx.beginPath();
        canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        canvasCtx.fill();
        this._move();
        this._calcPosition();
    }

}
//setup
function setup() {
    canvasEl.width = canvasCtx.width = window.innerWidth;
    canvasEl.height = canvasCtx.height = window.innerHeight;
}
//desenhos
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
//animação
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
//função principal a ser chamada no carregamento
function main() {
    animateFrame(main);
    draw();
}
//chamadas
setup();
main();
//temp
canvasEl.addEventListener('mousemove', function (e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
})
