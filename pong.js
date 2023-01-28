const canvasEl = document.querySelector("canvas");
const canvasCtx = canvasEl.getContext("2d");
//setup
function setup() {
    canvasEl.width = canvasCtx.width = window.innerWidth;
    canvasEl.height = canvasCtx.height = window.innerHeight;
}
let gameSpeed = 0.5;
//placar
let playerScore = 0;
let computerScore = 0;
//campo
let fieldW = window.innerWidth;
let fieldH = window.innerHeight;
let lineW = 15;
let gapX = 10;
//bola
let ballR = 15;
let ballX = fieldW / 2;
let ballY = fieldH / 2;
let dirX = 1;
let dirY = Math.floor(Math.random() * 2) - 0.5;
let ballSpeed = 5;
//raquete do jogador
let leftPaddleW = lineW;
let leftPaddleH = 200;
let leftPaddleX = gapX;
let leftPaddleY = fieldH / 2 - leftPaddleH / 2
let leftPaddleSpeed = 15;
//raquete do computador
let rightPaddleW = lineW;
let rightPaddleH = 200;
let rightPaddleX = fieldW - gapX - rightPaddleW;
let rightPaddleY = fieldH / 2 - rightPaddleH / 2;
let rightPaddleSpeed = 1;
//desenhos
function draw() {
    fieldDraw();
    scoreDraw();
    lineDraw();
    ballDraw();
    leftPaddleDraw();
    rightPaddleDraw();
}
function scoreDraw() {
    canvasCtx.font = "bold 2rem Arial";
    canvasCtx.textAlign = "center";
    canvasCtx.textBaseline = "top";
    canvasCtx.fillStyle = "#FEFAE0";
    canvasCtx.fillText(playerScore, fieldW / 4, 30);
    canvasCtx.fillText(computerScore, fieldW / 2 + fieldW / 4, 30);
}
function fieldDraw() {
    canvasCtx.fillStyle = "#283618";
    canvasCtx.fillRect(0, 0, fieldW, fieldH);
}
function lineDraw() {
    canvasCtx.fillStyle = "#FEFAE0";
    canvasCtx.fillRect(fieldW / 2 - lineW / 2, 0, lineW, fieldH);
}
function ballDraw() {
    canvasCtx.fillStyle = "#FEFAE0";
    canvasCtx.beginPath();
    canvasCtx.arc(ballX, ballY, ballR, 0, 2 * Math.PI, false);
    canvasCtx.fill();
}
function leftPaddleDraw() {
    canvasCtx.fillStyle = "#BC6C25";
    canvasCtx.fillRect(leftPaddleX, leftPaddleY, leftPaddleW, leftPaddleH);
}
function rightPaddleDraw() {
    canvasCtx.fillStyle = "#BC6C25";
    canvasCtx.fillRect(rightPaddleX, rightPaddleY, rightPaddleW, rightPaddleH);
}
//funções do jogo
function game() {
    draw();
    ballMove();
    ballCollision();
    computerMove();
}
function ballMove() {
    ballX += dirX * ballSpeed;
    ballY += dirY * ballSpeed;
}
function ballCollision() {
    if (ballX > fieldW - ballR - rightPaddleW - gapX) {
        if (ballY + ballR > rightPaddleY && ballY - ballR < rightPaddleY + rightPaddleH) {
            dirX *= -1; //colisão raquete oponente
        } else {
            increasePlayer();//ponto    
            speedUp();
            ballReset();
        }
    }
    if (ballX < ballR + leftPaddleW + gapX) {
        if (ballY + ballR > leftPaddleY && ballY - ballR < leftPaddleY + leftPaddleH) {
            dirX *= -1; //colisão raquete jogador
        } else {
            increaseComputer();//ponto   
            speedDown();
            ballReset();
        }
    }
    if (ballY > fieldH - ballR || ballY < ballR) {
        dirY *= -1; //colisão borda inferior e superior do campo
    }
}
function ballReset() {
    ballX = fieldW / 2;
    ballY = fieldH / 2;
}
function increasePlayer() {
    playerScore++;
    dirY = Math.floor(Math.random() * 2) - 0.5;
    rightPaddleX = fieldW - gapX - rightPaddleW;
    rightPaddleY = fieldH / 2 - rightPaddleH / 2;
}
function increaseComputer() {
    computerScore++;
    dirY = Math.floor(Math.random() * 2) - 0.5;
    rightPaddleX = fieldW - gapX - rightPaddleW;
    rightPaddleY = fieldH / 2 - rightPaddleH / 2;
}
function playerMove(event) {
    let path = event.keyCode;
    if (path == "38") {
        leftPaddleY += leftPaddleSpeed * -1;        
    };
    if (path == "40") {
        leftPaddleY += leftPaddleSpeed * 1;        
    };
    if (leftPaddleY + leftPaddleH >= fieldH) {
        leftPaddleY = fieldH - leftPaddleH;
    }
    if (leftPaddleY <= 0) {
        leftPaddleY = 0;
    }
}
function computerMove() {
    if (rightPaddleY + rightPaddleH / 2 < ballY + ballR) {
        rightPaddleY += rightPaddleSpeed;
    } else {
        rightPaddleY -= rightPaddleSpeed;
    }
    if (rightPaddleY + rightPaddleH >= fieldH) {
        rightPaddleY = fieldH - rightPaddleH;
    }
    if (rightPaddleY <= 0) {
        rightPaddleY = 0;
    }
}
function speedUp() {
    rightPaddleSpeed = rightPaddleSpeed + 0.5;
    if(rightPaddleSpeed >= 2){
        rightPaddleSpeed = 2;
    }
}
function speedDown() {
    rightPaddleSpeed = rightPaddleSpeed - 0.5;
    if(rightPaddleSpeed <= 0.5){
        rightPaddleSpeed = 0.5;
    }
}
//CHAMADAS TEMP
setup();
setInterval(game, gameSpeed);

document.onkeydown = playerMove;
