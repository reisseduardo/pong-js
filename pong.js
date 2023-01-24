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

const leftPaddle = {
    x: 10,
    y: 240,
    w: line.w,
    h: 200,
    draw: function () {
        //desenho da raquete esquerda
        canvasCtx.fillStyle = "#FFFFFF";
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
    }
}

const rightPaddle = {
    x: field.w - line.w - 10,
    y: 240,
    w: line.w,
    h: 200,
    draw: function () {
        //desenho da raquete direita
        canvasCtx.fillStyle = "#FFFFFF";
        canvasCtx.fillRect(this.x, this.y, this.w, this.h);
    }
}

const ball = {
    x: 120,
    y: 240,
    r: 20,
    draw: function () {
        //desenho da bolinha
        canvasCtx.fillStyle = "#FFFFFF";
        canvasCtx.beginPath();
        canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        canvasCtx.fill();
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

setup();

draw();
