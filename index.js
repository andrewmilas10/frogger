
var a;
var lives = 3;
var seconds;
var score = 0;
var highScore = getCookie('high score');
var round = 0;
var highRound = getCookie('high round');
var timeLeft = 30;
var disableFrog = false;

var roundBackground = createImage("resources/greenScreen.jpg", 00, 800, 600);
roundBackground.shouldDraw = false;


var skull = createImage("resources/skull.png", 0, 0, 50, 50);
skull.shouldDraw = false;

var frog = createRotatingImage("resources/frog.png", 375, 500, 50, 50, 0, 0, 0);
var frogOnLilyPads = createRotatingImage("resources/frog.png", 0, 0, 50, 50, 180, 0, 0);
var frogLives = createImage("resources/frogLife.png", 75, 550, 20, 20);

var snake = createMovingImage("resources/snake.png", -160, 260, 158, 30, 3, 0);
var snakeTime = Math.trunc(Math.random() * 5 + 20);
snake.checkBoundaries = function () {
    if (this.left >= 800) {
        snakeTime = -1;
    }
};


var roundInfo = [{carSpeeds: [-1.5, 2.5, 2, -3], carXValues: [[750, 1000, 1250], [-200, -650], [-150, -400, -700], [950, 1250]],   //round 1 Info
                  stepSpeeds: [1.5, -1.65, 1.55, -1.9], stepXValues: [[550, 150, -150], [400, 750], [-150, -400, -700], [950, 1250]], 
                  divingTurtlesIndices: [3], crocIndices: [9]}, 
                  
                  {carSpeeds: [-1.5, 5, 2, -3], carXValues: [[750, 1000, 1250], [-200], [-150, -400, -700], [950, 1250]],  //round 2 Info
                  stepSpeeds: [1.5, -1.65, 1.55, -1.9], stepXValues: [[550, 150, -150], [400, 750], [-150, -400, -700], [950, 1250]], 
                  divingTurtlesIndices: [3], crocIndices: [8, 9]}]

// var cars = createMovingImageArray(
//     [{ src: "resources/car1.png", width: 80, y: 450, speed: -1.5, xValues: [750, 1000, 1250] },
//     { src: "resources/car2.png", width: 82, y: 400, speed: 2.5, xValues: [-200, -650] },
//     { src: "resources/car3.png", width: 81.5, y: 350, speed: 2, xValues: [-150, -400, -700] },
//     { src: "resources/car4.png", width: 85, y: 300, speed: -3, xValues: [950, 1250] }]);
var cars;

// var steps = createMovingImageArray(
//     [{ src: "resources/log1.png", width: 140, y: 200, speed: 1.5, xValues: [550, 150, -150] },
//     { src: "resources/turtle.png", width: 180, y: 150, speed: -1.65, xValues: [400, 750] },
//     { src: "resources/log1.png", width: 140, y: 100, speed: 1.55, xValues: [-150, -400, -700] },
//     { src: "resources/log2.1.png", width: 160, y: 50, speed: -1.9, xValues: [200, 550] }]);
var steps;

var splash = createImage("resources/splashing.png", 0, 0, 180, 77.4);
// steps[9].src = "resources/croc.png";

var lilyPads = [];
for (i = 0; i < 5; i++) {
    lilyPads.push(createImage("resources/lilypad.png", 137.5 * i + 100, 0, 50, 50));
    lilyPads[i].isOccupied = false;
}

var goingToIndex = Math.trunc(Math.random() * 3);
var flySpots = [[-60, 100], [810, 300], [200, 610],
[300, 500], [460, 200], [100, 300], [100, 200], [400, 150], [500, 450], [650, 200], [700, 370]];
var fly = createRotatingImage("resources/fly.png", flySpots[goingToIndex][0], flySpots[goingToIndex][1], 50, 50, 0, 0, 0);
var flyTime = [26][Math.trunc(Math.random())];
//        var flyTime = [-1, -1, -1, -1, 14, 15, 18, 23, 24, 26, 27][Math.trunc(Math.random()*11)];
var shouldDrawFly = true;

var ladyFrog = createRotatingImage("resources/ladyFrog.png", 400, 300, 40, 40, 0, 0, 0);
ladyFrog.onALog = false;
var logIndices;
// var logIndices = [];
// for (var i = 0; i < steps.length; i++) {
//     if (steps[i].src.indexOf("/resources/log1.png") >= 0 || steps[i].src.indexOf("/resources/log2.1.png") >= 0) {
//         logIndices.push(i);
//     }
// }

function createMovingImageArray(values) {
    var array = [];
    for (i = 0; i < values.length; i++) {
        for (k = 0; k < values[i].xValues.length; k++) {
            array.push(createMovingImage(values[i].src, values[i].xValues[k], values[i].y, values[i].width, 50, values[i].speed, 0));
        }
    }
    return array;
}

function turnRoundInfoIntoVariables(round){
    cars = createMovingImageArray(
        [{ src: "resources/car1.png", width: 80, y: 450, speed: roundInfo[round].carSpeeds[0], xValues: roundInfo[round].carXValues[0]},
        { src: "resources/car2.png", width: 82, y: 400, speed: roundInfo[round].carSpeeds[1], xValues: roundInfo[round].carXValues[1]},
        { src: "resources/car3.png", width: 81.5, y: 350, speed: roundInfo[round].carSpeeds[2], xValues: roundInfo[round].carXValues[2]},
        { src: "resources/car4.png", width: 85, y: 300, speed: roundInfo[round].carSpeeds[3], xValues: roundInfo[round].carXValues[3]}]);

    steps = createMovingImageArray(
        [{ src: "resources/log1.png", width: 140, y: 200, speed: roundInfo[round].stepSpeeds[0], xValues: roundInfo[round].stepXValues[0]},
        { src: "resources/turtle.png", width: 180, y: 150, speed: roundInfo[round].stepSpeeds[1], xValues: roundInfo[round].stepXValues[1]},
        { src: "resources/log1.png", width: 140, y: 100, speed: roundInfo[round].stepSpeeds[2], xValues: roundInfo[round].stepXValues[2]},
        { src: "resources/log2.1.png", width: 160, y: 50, speed: roundInfo[round].stepSpeeds[3], xValues: roundInfo[round].stepXValues[3]}]);

    for (var i = 0; i < roundInfo[round].crocIndices.length; i++) {
        steps[roundInfo[round].crocIndices[i]].src="resources/croc.png";
    }

    logIndices = [];
    for (var i = 0; i < steps.length; i++) {
    if (steps[i].src.indexOf("/resources/log1.png") >= 0 || steps[i].src.indexOf("/resources/log2.1.png") >= 0) {
        logIndices.push(i);
    }
}
}

//starts the animation when the program is run
function initialize() {
    seconds = (new Date() + '').substr(22, 2);
    startRound(round);
    animate();
}

//stops the animation
function stopAnimation() {
    cancelAnimationFrame(a);
}

var safe;
//repeatedly draws the appropriate
function animate() {
    a = requestAnimationFrame(animate);
    if (drawBackground.shouldDraw) {
        drawRound();
    }
    else {
        drawBackground();
        drawSteps();
        drawLilyPads();
        frog.drawImage();
        drawCars();

        if (timeLeft <= snakeTime) {
            snake.drawImage();
            if (frog.checkCollision(snake)) {
                safe = false;
            }
        }

        if (ladyFrog.onALog !== false && ladyFrog.onALog !== 'no more') {
            drawLadyFrog();
        }

        if (shouldDrawFly) {
            drawFly();
        }

        drawText('Score: ' + score, 15, 590);
        if (score > highScore) {
            highScore = score;
            document.cookie = "high score=" + highScore + "; expires=Thu, 18 Dec 2017 12:00:00 UTC";
        }
        drawText('High Score: ' + highScore, 140, 590);

        if (!safe) {
            death();
        }

        if (skull.shouldDraw) {
            skull.drawImage();
        }

        checkGameLost();
        checkGameWon();
    }
}

function death() {
    lives -= 1;
    skull.left = frog.left;        
    skull.top = frog.top;
    skull.shouldDraw = true; 
    newTime();
}

function drawLadyFrog() {
    ladyFrog.drawImage();

    if ((ladyFrog.left >= 1000 && ladyFrog.changeX > 0) || (ladyFrog.left + ladyFrog.width <= 0 && ladyFrog.changeX < 0)) {
        ladyFrog.onALog = 'no more';

    }
    if (frog.checkCollision(ladyFrog)) {
        frog.src = "resources/doubleFrog.png";
        ladyFrog.onALog = 'no more';
    }
    if (Math.trunc(Math.random() * 150) === 0) {
        if (ladyFrog.left >= steps[ladyFrog.onALog].left + 35) {
            ladyFrog.left -= 30;
            ladyFrog.currentDeg = 270;
        }
    }

    if (Math.trunc(Math.random() * 150) === 0) {
        if ((ladyFrog.left + ladyFrog.width <= steps[ladyFrog.onALog].left + steps[ladyFrog.onALog].width - 35)) {
            ladyFrog.left += 30;
            ladyFrog.currentDeg = 90;
        }
    }


}

var toBeCleared = [];
function drawFly() {
    var arrivedAtCoordinate = ((fly.left <= flySpots[goingToIndex][0] && fly.changeX < 0) ||
        (fly.left >= flySpots[goingToIndex][0] && fly.changeX > 0));
    if ((arrivedAtCoordinate || goingToIndex < 3) && timeLeft <= flyTime) {
        var goTo = Math.trunc(Math.random() * flySpots.length);
        while (goTo === goingToIndex || goTo < 3) {
            goTo = Math.trunc(Math.random() * flySpots.length)
        }
        goingToIndex = goTo;

        for (var i = 0; i < toBeCleared.length; i++) {
            clearTimeout(toBeCleared[i]);
        }
        toBeCleared.push(setTimeout(setFlyData, 1000));
        fly.yDist = flySpots[goingToIndex][1] - fly.top;
        fly.xDist = flySpots[goingToIndex][0] - fly.left;
        fly.currentDeg = 90 - (Math.atan(fly.yDist * -1 / fly.xDist) * 180 / Math.PI);  //good thing I'm taking trig!
        if (fly.xDist < 0) {
            fly.currentDeg += 180;
        }
        fly.changeX = 0;
        fly.changeY = 0;
    }

    if (frog.checkCollision(fly)) {
        score += 7;
        shouldDrawFly = false;
    }

    fly.drawImage();
}

function setFlyData() {
    fly.changeX = fly.xDist * 2 / Math.sqrt(Math.pow(fly.xDist, 2) + Math.pow(fly.yDist, 2));
    fly.changeY = fly.yDist * 2 / Math.sqrt(Math.pow(fly.xDist, 2) + Math.pow(fly.yDist, 2));
}

var flickerCounter = 0;
function drawSteps() {
    safe = (frog.top > 200);
    for (var i = 0; i < steps.length; i++) {
        if (logIndices.indexOf(i) >= 0 && ladyFrog.onALog === false && Math.trunc(Math.random() * 5) === 0 &&
            ((steps[i].left >= 1000 && steps[i].changeX > 0) || (steps[i].left + steps[i].width <= 0 && steps[i].changeX < 0))) {
            ladyFrog.left = steps[i].left;
            ladyFrog.top = steps[i].top + 5;
            ladyFrog.onALog = i;
            ladyFrog.changeX = steps[i].changeX;
        }
        if (roundInfo[round].divingTurtlesIndices.indexOf(i)>=0 && timeLeft % 5 > 2) {
            steps[i].updateCoords();
        }
        else {
            steps[i].drawImage();
            if (roundInfo[round].divingTurtlesIndices.indexOf(i)>=0 && timeLeft % 5 === 0) {
                splash.left = steps[i].left + 2;
                flickerCounter+=1;
                splash.top = steps[i].top - 11.5;
                if (flickerCounter%16<8) {
                    splash.drawImage();
                }
            }
        }
        if ( frog.checkCollision(steps[i]) &&       
            (roundInfo[round].divingTurtlesIndices.indexOf(i)<0 || timeLeft % 5 < 3) &&   //safe if on a turtle and is not hidden 
            (!(roundInfo[round].crocIndices.indexOf(i)>=0 && frog.left < steps[i].left + 26))) {       //safe if not on croc's mouth
            safe = true;

            //move frog along with the step if it's on the screen
            if (frog.left + steps[i].changeX > 0 && frog.left + frog.width + steps[i].changeX < 800) {   
                frog.left += steps[i].changeX;
            }
        }
    }
}

function drawLilyPads() {
    frog.width = 30;      //adjusts the width of the frog so that its not as easy to land on the lily pad
    frog.left += 10;
    for (i = 0; i < lilyPads.length; i++) {
        lilyPads[i].drawImage();
        if (frog.checkCollision(lilyPads[i])) {
            lilyPads[i].isOccupied = true;
            if (frog.src.indexOf("resources/doubleFrog.png") >= 0) {
                lives += 1;
            }
            safe = true;
            if (timeLeft > 23) {
                score += 14;
            }
            else if (timeLeft > 17) {
                score += 12;
            }
            else if (timeLeft > 10) {
                score += 11;
            }
            else {
                score += 10;
            }
            newTime();
        }
        if (lilyPads[i].isOccupied) {
            frogOnLilyPads.left = 137.5 * i + 100;
            frogOnLilyPads.drawImage();
        }
    }
    frog.width = 50;
    frog.left -= 10;
}

function drawCars() {
    for (i = 0; i < cars.length; i++) {
        cars[i].drawImage();
        if (frog.checkCollision(cars[i])) {
            safe = false;
        }
    }
}

function startFrog(){
    disableFrog=false;
    frog.changeY = 0;
    frog.top = 500;
    skull.shouldDraw = false;
    
}

function drawRound () {
    roundBackground.drawImage();
    drawText("Round "+(parseInt(round)+1), 350, 300);
}

function startRound(){
    roundBackground.shouldDraw = true;
    setTimeout(function() {roundBackground.shouldDraw = true;}, 1000);
    turnRoundInfoIntoVariables(round);
    newTime();
}

function newTime() {
    frog.src = "resources/frog.png";
    frog.currentDeg = 0;
    frog.left = 375;
    frog.top = 550;
    disableFrog = true;
    frog.changeY=-1.5;
    seconds = (new Date() + '').substr(22, 2);
    timeLeft = 30;
    snakeTime = Math.trunc(Math.random() * 5 + 20);
    snake.left = -200;
    // flyTime = [24][Math.trunc(Math.random())];
    flyTime = [-1, -1, 18, 23, 24, 25, 26, 26, 27][Math.trunc(Math.random()*11)];
    goingToIndex = Math.trunc(Math.random() * 3);
    fly = createRotatingImage("resources/fly.png", flySpots[goingToIndex][0], flySpots[goingToIndex][1], 50, 50, 0, 0, 0);
    shouldDrawFly = true;
    for (var i = 0; i < toBeCleared.length; i++) {
        clearTimeout(toBeCleared[i]); // will do nothing if no timeout with id is present
    }
    ladyFrog.onALog = false;
    ladyFrog.currentDeg = 0;
    setTimeout(startFrog, 500);
}

function checkGameWon() {
    var allLilies = true;
    for (i = 0; i < lilyPads.length; i++) {
        if (!lilyPads[i].isOccupied) {
            allLilies = false;
        }
    }
    if (allLilies) {
        // drawRect('118a33', 0, 500, 650, 50);
        stopAnimation();
        drawText("You Win", 200, 250)
    }
}

function checkGameLost() {
    if (lives === 0) {
        // drawRect('118a33', 75, 550, 20, 20);
        stopAnimation();
        drawText("Game Over", 200, 250)
    }
}

function drawBackground() {
    drawRect('118a33', 0, 250, 800, 600);
    drawRect('0088FF', 0, 0, 800, 250);
    drawRect('444444', 0, 300, 800, 200);
    drawText('Lives: ', 15, 565);
    for (var i = 0; i < lives; i++) {
        frogLives.left = 75 + 25 * i;
        frogLives.drawImage();
    }
    updateTime();

    drawText('Round: ' + (parseInt(round)+1), 500, 590);
    if (round > highRound) {
        highRound = round;
        document.cookie = "high round=" + highRound + "; expires=Thu, 18 Dec 2017 12:00:00 UTC";
    }
    drawText('Highest Round: ' + (parseInt(highRound)+1), 620, 590);
}

function updateTime() {
    var seconds2 = (new Date() + '').substr(22, 2);
    if (seconds2 >= seconds) {
        timeLeft = 30 - parseInt(seconds2) + parseInt(seconds);
    }
    else {
        timeLeft = -30 - parseInt(seconds2) + parseInt(seconds);
    }
    drawText('Time: ' + timeLeft, 690, 565);
    if (timeLeft === 0) {
        death();
    }
}

function drawRect(color, startX, startY, width, height) {
    var ctx = document.getElementById('myCanvas').getContext("2d");
    ctx.fillStyle = '#' + color;
    ctx.fillRect(startX, startY, width, height);
}

function createImage(src, xcoord, ycoord, width, height) {
    var img = new Image();
    img.src = src;
    img.left = xcoord;
    img.top = ycoord;
    img.width = width;
    img.height = height;
    img.drawImage = function () {
        var ctx = document.getElementById('myCanvas').getContext("2d");
        ctx.drawImage(this, this.left, this.top, this.width, this.height)
    };

    img.checkCollision = function (pict2) {
        if (this.left + this.width > pict2.left && this.left < pict2.left + pict2.width &&
            this.top + this.height > pict2.top && this.top < pict2.top + pict2.height) {
            return (true);
        }
        return (false);
    };
    return img;
}

$(document).keydown(function (event) {  //jQuery code to recognize a keydown event
    var keycode = (event.keyCode ? event.keyCode : event.which);

    if (keycode == 87 && frog.top >= 50 && !disableFrog) {
        frog.top -= 50;
        frog.currentDeg = 0;
    }

    if (keycode == 65 && frog.left >= 50 && !disableFrog) {
        frog.left -= 50;
        frog.currentDeg = 270;
    }

    if (keycode == 68 && frog.left + frog.width <= 750 && !disableFrog) {
        frog.left += 50;
        frog.currentDeg = 90;
    }

    if (keycode == 83 && frog.top + frog.height <= 500 && !disableFrog) {
        frog.top += 50;
        frog.currentDeg = 180;
    }
});

//creates a moving picture object
function createMovingImage(src, xcoord, ycoord, width, height, changeX, changeY) {
    var temp = createImage(src, xcoord, ycoord, width, height);
    temp.changeX = changeX;
    temp.changeY = changeY;
    temp.drawImage = function () {
        this.updateCoords();
        var ctx = document.getElementById('myCanvas').getContext("2d");
        ctx.drawImage(this, this.left, this.top, this.width, this.height)
    };

    temp.updateCoords = function () {
        this.checkBoundaries();
        this.left += this.changeX;
        this.top += this.changeY;
    };

    temp.checkBoundaries = function () {
        if (this.left >= 1000 && this.changeX > 0) {
            this.left = -this.width;
        }
        else if (this.left + this.width <= 0 && this.changeX < 0) {
            this.left = 800;
        }

    };
    return temp;
}

//creates a rotating picture object
function createRotatingImage(src, xcoord, ycoord, width, height, currDeg, changeX, changeY) {
    var temp = createMovingImage(src, xcoord, ycoord, width, height, changeX, changeY);
    temp.currentDeg = currDeg;
    temp.drawImage = function () {
        this.updateCoords();
        var ctx = document.getElementById('myCanvas').getContext("2d");
        ctx.save();
        ctx.translate(this.left + this.width / 2, this.top + this.height / 2);
        ctx.rotate(this.currentDeg * Math.PI / 180);
        ctx.drawImage(this, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    };
    return temp;
}

//given text, and draws it on the top of the canvas
function drawText(text, x, y) {
    var ctx = document.getElementById('myCanvas').getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.font = "20px Arial";
    ctx.fillText(text, x, y);
}

//takes in the left hand side of a cookie equation from the list of equations document.cookie returns.
//returns the right hand side of the specified equation..
function getCookie(cookieName) {
    var cookieArray = document.cookie.split(';');   //puts all the equations in an array
    for (var i = 0; i < cookieArray.length; i++) {  //loops through the array
        var cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {  //removes any beginning whitespaces
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName + "=") === 0) {  //checks to see if the current cookie equation is the desired one
            return cookie.substring(cookieName.length + 1, cookie.length);
        }
    }
    return 0;
}