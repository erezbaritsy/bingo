
// Global variables
let tabaleArreys = [];
let ballsPool = arrInit();
let numOfPlayers = 4;
let won = [];
for (let i = 0; i < numOfPlayers; i++) {
    won.push(false);
}
let places = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "last"];
// create arry of numbers (1-99)
function arrInit() {
    let arr = [];
    for (let i = 0; i < 99; i++) {
        arr[i] = i + 1;
    }
    return arr;
}
// get number of players input  from "select options" + restart game
function playerNum() {
    let x = document.getElementById("players").selectedIndex;
    let y = document.getElementById("players").options;
    numOfPlayers = y[x].text;
    restart();
}
// Create objects with random numbers and ID properties for each player and return as 2d array
function randNums(arr) {
    let arrRands = [];
    for (let j = 1; j <= numOfPlayers; j++) {
        for (i = 1; i <= 25; i++) {
            randIndex = Math.floor(Math.random() * (arr.length));
            arrRands[i - 1] = {
                number: arr[randIndex],
                marked: false,
                id: "i" + j + "-" + i
            };
            arr.splice(randIndex, 1);
        }
        tabaleArreys[j - 1] = arrRands;
        arrRands = [];
        arr = arrInit();
    }
    return tabaleArreys;
}
//print tables on screen
function createTables() {
    let index = 0;
    strTable = "";
    for (let i = 1; i <= numOfPlayers; i++) {
        strTable += "<div class=" + "table" + "><p>player " + i + "</p><div class=" + "verticalHead" + "><h2></h2></div> ";
        for (let j = 1; j <= 25; j++) {
            strTable += "<div class=" + "cell " + "><span class=" + "marked " + "id=" + "i" + i + "-" + j + ">t</span></div>";
        }
        strTable += "</div>";
    }
    document.getElementById("tables").innerHTML = strTable;
}
//insert random number(1-99)to every cell
function insertNums() {
    for (let i = 0; i < tabaleArreys.length; i++) {
        for (let j = 0; j < tabaleArreys[i].length; j++) {
            document.getElementById(tabaleArreys[i][j].id).innerHTML = tabaleArreys[i][j].number;
        }
    }
}
//if random number from pool array equal to number in cell - mark with yellow color 
function markNum() {
    let randIndex = Math.floor(Math.random() * (ballsPool.length));
    let ball = ballsPool[randIndex];
    ballsPool.splice(randIndex, 1);
    for (let i = 0; i < tabaleArreys.length; i++) {
        if (won[i] === true) { continue; }
        for (let j = 0; j < tabaleArreys[i].length; j++) {
            document.getElementById("ball").innerText = ball;
            if (tabaleArreys[i][j].number === ball) {
                tabaleArreys[i][j].marked = true;
                document.getElementById(tabaleArreys[i][j].id).classList.add("markYellow");
            }
        }
    }
    checkWin();
}
//print player place next to player table when win
function printPlace(i) {
    let placeHeads = document.getElementsByTagName("h2");
    placeHeads[i].innerHTML = places[0] + " place";
    places.shift();
}
//check each row, column and diagonal - if all "marked" -win and turn to red color
function checkWin() {
    let win = false;
    let counter = 0;
    for (let i = 0; i < tabaleArreys.length; i++) {
        if (won[i] === true) { continue; }//skip if alreay won
        for (let j = 0; j < tabaleArreys[i].length; j++) { // check all rows
            for (let k = 0; k < 5; k++) {
                if (tabaleArreys[i][j + k].marked) {
                    counter++;
                }
            }
            if (counter === 5) {
                won[i] = true;
                printPlace(i)
                for (let k = 0; k < 5; k++) {
                    document.getElementById(tabaleArreys[i][j + k].id).parentNode.classList.add("afterMarked");
                    document.getElementById(tabaleArreys[i][j + k].id).classList.add("markRed");
                }
            }
            counter = 0;
            j += 4;
        }
        if (won[i] === true) { continue; }
        for (let j = 0; j < 5; j++) { // check all columns
            for (let k = 0; k < tabaleArreys[i].length; k++) {
                if (tabaleArreys[i][j + k].marked) {
                    counter++;
                }
                k += 4;
            }
            if (counter === 5) { //if all 5 cells are marked(property "marked" inside object = true)- change to red color and print "place position"
                won[i] = true;
                printPlace(i)
                for (let k = 0; k < tabaleArreys[i].length; k++) {
                    document.getElementById(tabaleArreys[i][j + k].id).parentNode.classList.add("afterMarked");
                    document.getElementById(tabaleArreys[i][j + k].id).classList.add("markRed");
                    k += 4;
                }
            }
            counter = 0;
        }
        if (won[i] === true) { continue; }
        for (let j = 0; j < tabaleArreys[i].length; j++) { // checks first diagonal
            if (tabaleArreys[i][j].marked) {
                counter++;
            }
            if (counter === 5) {
                won[i] = true;
                printPlace(i)
                for (let k = 0; k < tabaleArreys[i].length; k++) {
                    document.getElementById(tabaleArreys[i][k].id).parentNode.classList.add("afterMarked");
                    document.getElementById(tabaleArreys[i][k].id).classList.add("markRed");
                    k += 5;
                }
            }
            j += 5;
        }
        counter = 0;
        if (won[i] === true) { continue; }
        for (let j = 4; j < tabaleArreys[i].length - 4; j++) {// check second diagonal
            if (tabaleArreys[i][j].marked) {
                counter++;
            }
            if (counter === 5) {
                won[i] = true;
                printPlace(i)
                for (let k = 4; k < tabaleArreys[i].length - 4; k++) {
                    document.getElementById(tabaleArreys[i][k].id).parentNode.classList.add("afterMarked");
                    document.getElementById(tabaleArreys[i][k].id).classList.add("markRed");
                    k += 3;
                }
            }
            j += 3;
        }
        counter = 0;
        if (won[i] === true) { continue; }
    }
}
// States the interval game speed
function gameSpeed(speed) {
    if (speed == "normal") {
        clearInterval(startGame);//stop old interval
        startGame = setInterval(markNum, 1500);
    } else if (speed == "fast") {
        clearInterval(startGame);
        startGame = setInterval(markNum, 500);
    } else if (speed == "fastest") {
        clearInterval(startGame);
        startGame = setInterval(markNum, 250);
    }
}
// initialize all variables and arrys and start interval again
function restart() {
    clearInterval(startGame); //stop old interval
    tabaleArreys = [];
    ballsPool = arrInit();
    won = [];
    for (let i = 0; i < numOfPlayers; i++) {
        won.push(false);
    }
    places = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "last"];
    createTables();
    tabaleArreys = randNums(arrInit());
    insertNums();
    startGame = setInterval(markNum, 1500);
}
// start the game
createTables();
tabaleArreys = randNums(arrInit());
insertNums();
let startGame = setInterval(markNum, 1200);











