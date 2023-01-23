const canvasEl = document.querySelector("canvas");
const canvasCtx = canvasEl.getContext("2d");

const lineW = 15;

function setup(){
    canvasEl.width = canvasCtx.width = window.innerWidth;
    canvasEl.height = canvasCtx.height = window.innerHeight;
}

function draw(){
    //desenho do campo
    canvasCtx.fillStyle = "#286047";
    canvasCtx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    //desnho da linha central
    canvasCtx.fillStyle = "#FFFFFF";
    canvasCtx.fillRect(window.innerWidth/2 - lineW/2, 0, lineW, window.innerHeight);
    //desenho da raquete esquerda
    canvasCtx.fillRect(10, 240, lineW, 200);
    //desenho da raquete direita
    canvasCtx.fillRect(window.innerWidth - lineW - 10, 240, lineW, 200);
    //desenho da bolinha
    canvasCtx.beginPath();
    canvasCtx.arc(120, 240, 20, 0, 2* Math.PI, false);
    canvasCtx.fill();
}

setup();

draw();
