/**
 * Created by Eliran on 04/05/2017.
 */
 var context = canvas.getContext("2d");
 var shape=new Object();
 var board;
 var score;
 var pac_color;
 var start_time;
 var time_elapsed;
 var interval;
 var way = "right";
 var lastDirection = -1;
 var start;
 var candy ;
 var cherryBonus;
 var pill ;
 var deathPill ;
 var death;
 var Time;
 var pacman_remain;
 var clock;
 var ghost_radius=8;
 var ghosts=[];
 var cherry;
 var pacman_life;
 var ghostInterval = 2;
 var numOfGhosts;
 var caught =false;



 function Ghost(xCord, yCord, gColor){
    this.x = xCord;
    this.y = yCord;
    this.initX = xCord;
    this.initY = yCord;
    this.color = gColor;
    this.dist =100;
    this.candyType = 0; // for restore candies
}
Ghost.prototype.ghostMove = function(direction){
    var center = new Object();
    center.x = this.x  * 25 + 12;
    center.y = this.y * 25 + 12;
    var argColor = "white";
    drawGhost(center,argColor);
    board[this.x][this.y] = this.candyType;
    if(this.candyType!=0){
        drawBonus(this.candyType,this.x,this.y);
    }
    switch (direction) {
        case "right":
        this.x++;
        break;
        case "left":
        this.x--;
        break;
        case "down":
        this.y++;
        break;
        case "up":
        this.y--;
        break;
        default:
            // statements_def
            break;
        }
        this.candyType = board[this.x][this.y];
        board[this.x][this.y] = 200;
        center = new Object();
        center.x = this.x  * 25 + 12;
        center.y = this.y  * 25 + 12;
        drawGhost(center,this.color);
    };

    Ghost.prototype.initialize =function(){

        var center = new Object();
        center.x = this.x  * 25 + 12;
        center.y = this.y * 25 + 12;
        var argColor = "white";

    // earase the ghost
    drawGhost(center,argColor);
    board[this.x][this.y] = this.candyType;
    if(this.candyType!=0)
        drawBonus(this.candyType,this.x,this.y);
    //

    this.x = this.initX;
    this.y = this.initY;
    this.candyType = board[this.x][this.y];
    board[this.initX][this.initY] = 200;
    center = new Object();
    center.x = this.initX  * 25 + 12;
    center.y = this.initY  * 25 + 12;
    drawGhost(center,this.color);
};


function MovingBonus(xCord, yCord){
    this.x = xCord;
    this.y = yCord;
    this.candyType = 0; // for restore candies
    this.runBonus = function(direction){
        var center = new Object();
        center.x = this.x  * 25 + 12;
        center.y = this.y * 25 + 12;
        var argColor = "white";
        drawMovingBonus(center,argColor);
        board[this.x][this.y] = this.candyType;
        if(this.candyType!=0){
            drawBonus(this.candyType,this.x,this.y);
        }
        switch (direction) {
            case "right":
                this.x++;
                break;
            case "left":
                this.x--;
                break;
            case "down":
                this.y++;
                break;
            case "up":
                this.y--;
                break;
            default:
                // statements_def
                break;
        }
        this.candyType = board[this.x][this.y];
        board[this.x][this.y] = 777;
        center = new Object();
        center.x = this.x  * 25 + 12;
        center.y = this.y  * 25 + 12;
        var color = "black";
        drawMovingBonus(center,color);
    };

}
function drawBoard() {

    var ctx = canvas.getContext("2d");

    //frame

    ctx.strokeStyle = "#193fff";
    ctx.lineWidth = 1.5;
    ctx.zIndex = +1;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(755, 0);
    ctx.lineTo(755, 275);
    ctx.moveTo(755,300);
    ctx.lineTo(755,505);
    ctx.lineTo(0,505);



    ctx.lineTo(0,300);
    ctx.moveTo(0,275);
    ctx.lineTo(0,0);
    // left gap

    ctx.moveTo(0,275);
    ctx.lineTo(70,275);
    ctx.moveTo(0,300);
    ctx.lineTo(70,300);

    // right gap
    ctx.moveTo(755,275);
    ctx.lineTo(685,275);
    ctx.moveTo(755,300);
    ctx.lineTo(685,300);


    ctx.stroke();
    ctx.closePath();
}

function Start(ghost_num) {
    numOfGhosts =ghost_num;
    createGhosts(ghost_num);
    limitTime.value = 60+ parseInt(document.getElementById("timeRange").value)*1.2;
    Time = 60+ parseInt(document.getElementById("timeRange").value)*1.2;
    start = 0;
    candy = 1;
    pill = 1;
    clock = 1;
    pacman_life = 3;
    deathPill = 1;
    cherryBonus = 1;
    death = 0;
    board = new Array();
    score = 0;
    pac_color="yellow";
    var cnt = 600;
    var food_remain = 90;
    time = 30;
    var pacman_remain = 1;
    shape.addScore =0; // will be 1 when pacman eat the special candy
    var first_food = Math.floor(food_remain * 0.6);
    var second_food = Math.floor(food_remain * 0.3);
    var third_food = food_remain -first_food- second_food ;
    start_time= new Date();
    for (var i = 0; i < 30; i++) { // cols
        board[i] = new Array();
        //put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
        for (var j = 0; j < 20; j++) {
            if ((i<3 && j==11)  || (i>26 && j==11))
            {
                board[i][j] = 5;

            }
            else if((i==2 && j<5) || (i==8 && j>10) || (i>12 && i<17 && j==12) || (i>7 && i<12 && j==13) || (i>15 && i<22 && j%4==3 && j<10) || (i>20 && i<25 && j==16) 
                || (i>20 && i<24 && j%16==2) || (i>2 && i<8 && j%11==4) || (i==18 && j>3 && j<7) ||  (i==19 && j>10 && j<16) || (i==14 && j>13 && j<18) || (i>24 && i<28 && j>15 && j<18))
            {
                board[i][j] = 4;
            }
            else  if(ghost_num>0 &&(i==29 && j == 0) || (ghost_num>1 && i==0 && j==19) || (ghost_num>2 && i==29 && j==19) ){
                board[i][j] = 200;
            }
            else if(i==1 && j==1){
                            cherry = new MovingBonus(i,j);
                            cherry.exist = false;
            }
            else{
                var randomNum = Math.random();
                if (randomNum <= 1.0 * food_remain / cnt) {
                    var rand = Math.random()
                    if (rand<=0.1 && third_food>0)
                    {
                        board[i][j] = 111;
                        third_food--;
                        food_remain--;
                    }
                    else if (rand<=0.3 && second_food>0)
                    {
                        board[i][j] = 11;
                        second_food--;
                        food_remain--;

                    }
                    else if (first_food>0)
                    {
                        board[i][j] = 1;
                        first_food--;
                        food_remain--;
                    }
                }
                else if (randomNum < 1.0 * (pacman_remain + food_remain) / cnt) {
                    shape.i=i;
                    shape.j=j;
                    pacman_remain=0;
                    board[i][j] = 2;
                    shape.initX = i;
                    shape.initY = j;
                }
                else {
                    board[i][j] = 0;
                }
                cnt--;
            }
        }
    }
    while(food_remain>0){
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 1;
        food_remain--;
    }
    while(pacman_remain>0){
        var emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 2;
        shape.i=emptyCell[0];
        shape.j=emptyCell[1];
        pacman_remain=0;
        shape.initX = emptyCell[0];
        shape.initY = emptyCell[1];
    }
    keysDown = {};
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        keysDown[e.keyCode] = false;
    }, false);

    interval=setInterval(UpdatePosition, 180);
}


function findRandomEmptyCell(board){
    var i = Math.floor((Math.random() * 29) + 1);
    var j = Math.floor((Math.random() * 19) + 1);
    while(board[i][j]!=0)
    {
        i = Math.floor((Math.random() * 29) + 1);
        j = Math.floor((Math.random() * 19) + 1);
    }
    return [i,j];
}


function GetKeyPressed() {
    if (keysDown[38]) { // up
        return 1;
    }
    if (keysDown[40]) {  // down
        return 2;
    }
    if (keysDown[37]) {  //left
        return 3;
    }
    if (keysDown[39]) { //right
        return 4;
    }
}

function Draw() {
    //canvas.width=canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;

    for (var i = 0; i < 30; i++) {
        for (var j = 0; j < 20; j++) {
            var center = new Object();
            center.x = i * 25 + 12;
            center.y = j * 25 + 12;
            var candy_type =board[i][j];
            if (board[i][j] == 2) {
                drawPacman(center);
            }
            else if (board[i][j] == 4) {
                context.beginPath();
                context.rect(center.x-2, center.y-9, 10,18);
                context.fillStyle = "grey"; //color
                context.fill();
            }
            else if (board[i][j] ==11 || board[i][j] ==1 || board[i][j]==111)
                drawBonus(candy_type,i,j);
            else if(board[i][j]==200){
                var ghostColor;
                for(var m = 0;m<ghosts.length;m++){
                    if(ghosts[m].x == i && ghosts[m].y==j)
                        ghostColor = ghosts[m].color;
                }
                drawGhost(center,ghostColor);
            }
        }
    }

}

function UpdatePosition() {
    if(start==0){
        start=1;
        Draw();
    }
    if(candy || pill || deathPill || clock ) // add remains bonus
        addNewCandies();
    shape.lastX = shape.i; //rows
    shape.lastY = shape.j; // cols
    board[shape.i][shape.j]=0;
    var location = board[shape.i][shape.j]
    var x = GetKeyPressed();
    move(x);
    updateBoard(false); // draw pacman
    for(var g = 0; g<ghosts.length;g++){
        if(ghosts[g].dist==0)
            caught = true;
    }
    if(cherry.exist)
        runCherry();
    if(location==200|| caught){
        pacman_life --;
        window.alert("Bang Bang the monster shot you down");
        if(pacman_life ==0){
        caught = false;
        window.clearInterval(interval);
        window.alert("You lost!. Score:" + score );
        }
        else {
            initializeAfterDeath();
            caught = false;
        }
    }
    else
        addBonus(); //     board[shape.i][shape.j]= 2;
    if(ghostInterval>0){
        for(var i =0; i<ghosts.length;i++){
            runAfterPacman(ghosts[i]);
        }
        ghostInterval =ghostInterval-1;
    }
    else
        ghostInterval = 2;
    location = board[shape.i][shape.j];
    for(var g = 0; g<ghosts.length;g++){
        if(ghosts[g].dist==0)
            caught = true;
    }
    if(location==200|| caught){
        pacman_life --;
        window.alert("Bang Bang the monster shot you down");
        if(pacman_life ==0){
        caught = false;
        window.clearInterval(interval);
        window.alert("You lost. Score:" + score );
        }
        else {
            initializeAfterDeath();
            caught = false;
        }
    }
    var currentTime=new Date();
    time_elapsed=(currentTime-start_time)/1000;
    if(time_elapsed>Time || death)
    {
        window.clearInterval(interval);
        if(death)
        {
            window.alert("You took the death pill - Game Over. Score:" + score );
        }
        else if(score<150)
        {
            window.alert("You can do better. Score:" + score );
            massageBox.value = "time run out.. try again!";
        }
        else
        {
            window.alert("We have a Winner!!!. Score:" + score);
            massageBox.value = "You rock! What a winner" ;
        }
    }
    else
    {
        updateBoard(false);
    }
}

function drawPacman(center){
    switch (way) {
        case "right":
        context.beginPath();
            context.arc(center.x, center.y, 10, 0.15 * Math.PI, 1.80 * Math.PI); // half circle
            context.lineTo(center.x, center.y);
            context.fillStyle = pac_color; //color
            context.fill();
            context.beginPath();
            context.arc(center.x -1, center.y - 6, 2, 0, 2 * Math.PI); // circle
            context.fillStyle = "red"; //color
            context.fill();
            break;
            case "left":
            context.beginPath();
            context.arc(center.x, center.y, 10, 1.2 * Math.PI, 0.85* Math.PI); // half circle
            context.lineTo(center.x, center.y);
            context.fillStyle = pac_color; //color
            context.fill();
            context.beginPath();
            context.arc(center.x + 1, center.y - 6, 2, 0, 2 * Math.PI); // circle
            context.fillStyle = "red"; //color
            context.fill();
            break;
            case "up":
            context.beginPath();
            context.arc(center.x, center.y, 10, 1.7 * Math.PI, 1.3* Math.PI); // half circle
            context.lineTo(center.x, center.y);
            context.fillStyle = pac_color; //color
            context.fill();
            context.beginPath();
            context.arc(center.x +5, center.y+2, 2, 0, 2 * Math.PI); // circle
            context.fillStyle = "red"; //color
            context.fill();
            break;
            case "down":
            context.beginPath();
            context.arc(center.x, center.y, 10, 0.7 * Math.PI, 0.3* Math.PI); // half circle
            context.lineTo(center.x, center.y);
            context.fillStyle = pac_color; //color
            context.fill();
            context.beginPath();
            context.arc(center.x + 5, center.y-3, 2, 0, 2 * Math.PI); // circle
            context.fillStyle = "red"; //color
            context.fill();
            break;
            default:
            break;
        }
    }


    function move(x){   
    if(x==1) // up
    {
        if ((shape.i<3 && shape.j==11) || (shape.i>26 && shape.j==11))
        {
            shape.lastY = shape.j;
            way = "up";
            lastDirection =x;
        }
        else if(shape.j>0 && board[shape.i][shape.j-1]!=4 && board[shape.i][shape.j-1]!=5)
        {
            shape.lastY = shape.j;
            way = "up";
            shape.j--;
            lastDirection =x;
        }

    }
    if(x==2) // down
    {
        if ((shape.i<3 && shape.j==11) || (shape.i>26 && shape.j==11))
        {
            shape.lastY = shape.j;
            way = "down";
            lastDirection =x;
        }
        else if(shape.j<19 && board[shape.i][shape.j+1]!=4 && board[shape.i][shape.j+1]!=5)
        {
            shape.lastY = shape.j;
            way = "down";
            shape.j++;
            lastDirection =x;
        }
    }
    if(x==3)  // left
    {
        if(shape.i==0 && shape.j==11)
        {
            shape.lastX = shape.i;
            shape.i=29;
            way = "left";
            lastDirection =x;
        }
        else if(shape.i>0 && board[shape.i-1][shape.j]!=4)
        {
            shape.lastX = shape.i;
            way = "left";
            shape.i--;
            lastDirection =x;
        }
    }
    if(x==4)  // right
    {
        if(shape.i==29 && shape.j==11)
        {
            shape.lastX = shape.i;
            shape.i=0;
            way = "right";
            lastDirection =x;
        }
        else if(shape.i<29 && board[shape.i+1][shape.j]!=4)
        {
            shape.lastX = shape.i;
            way = "right";
            shape.i++;
            lastDirection =x;
        }
    }
}


function updateBoard(isDead){
    lblScore.value = score;
    lblTime.value = time_elapsed;
    paclife.value = pacman_life;
    lblUser.value = currentUser;

    var center = new Object();
    center.x = shape.lastX * 25 + 12;
    center.y = shape.lastY * 25 + 12;
    context.beginPath();
    context.arc(center.x, center.y, 11, 0 * Math.PI, 2* Math.PI); // half circle
    context.lineTo(center.x, center.y);
    context.fillStyle = "white"; //color
    context.fill();

    center = new Object();
    center.x = shape.i * 25 + 12;
    center.y = shape.j * 25 + 12;
    context.beginPath();
    context.arc(center.x, center.y, 11, 0 * Math.PI, 2* Math.PI); // half circle
    context.lineTo(center.x, center.y);
    context.fillStyle = "white"; //color
    context.fill();
    if(!isDead){
        drawPacman(center);}
    }


    function addBonus(){
        var locationType =board[shape.i][shape.j];
        if(board[shape.i][shape.j]==8)
        {
            score += 100;
            pac_color="pink";
            shape.addScore=1;
            massageBox.value = "Seeing trough pink eyes.Bonus 100 points and an extera point for each food eaten.";
        }
        else if(locationType==7)
        {
            score += 200;        
            score+=shape.addScore;
            massageBox.value = "Bonus 200 point";

        }
        else if(locationType==9)
        {
            death --;
            massageBox.value = "Game Over";

        }
        else if(locationType==10)
        {
            Time += 10;
            limitTime.value = Time;
            massageBox.value = "+10 seconds";
        }
        else if(locationType==1)
        {
            score += 5;
            score+=shape.addScore;
        }
        else if(locationType==11)
        {
            score += 15;
            score+=shape.addScore;
        }
        else if(locationType==111)
        {
            score+= 25;
            score+=shape.addScore;
        }
        if(locationType == 777){
        cherry.exist = false;
        score += 50;
        score+=shape.addScore;
        massageBox.value = "You ate my eyes!!!! +50 points";
    }

        board[shape.i][shape.j]=2;

    //not deleting the pass
    if ((shape.lastX <3 && shape.lastY==11) || (shape.lastX >26 && shape.lastY==11))
    {
        board[shape.lastX][shape.lastY]=5;
    }
}
function addNewCandies(){
    if (time_elapsed>3 && score>100 && candy >0)
    {
        var emptyCandyCell = findRandomEmptyCell(board);
        if(emptyCandyCell ===undefined)
            return;
        else{
            board[emptyCandyCell[0]][emptyCandyCell[1]] = 7;
            drawBonus(7,emptyCandyCell[0],emptyCandyCell[1]);
            candy--;
        }
    }

    if (time_elapsed>10 && score>10 && pill >0)
    {
        var emptyCandyCell = findRandomEmptyCell(board);
        if(emptyCandyCell ===undefined)
            return;
        else{
            board[emptyCandyCell[0]][emptyCandyCell[1]] = 8;
            drawBonus(8,emptyCandyCell[0],emptyCandyCell[1]);
            pill--;
        }
    }

    if (time_elapsed>20 && score>100 && deathPill >0 && candy==0)
    {
        var emptyCandyCell = findRandomEmptyCell(board);
        if(emptyCandyCell ===undefined)
            return;
        else{
            board[emptyCandyCell[0]][emptyCandyCell[1]] = 9;
            deathPill--;
            drawBonus(9,emptyCandyCell[0],emptyCandyCell[1]);
        }
    }

    if (time_elapsed>2 && score>130 && clock)
    {
        var emptyCandyCell = findRandomEmptyCell(board);
        if(emptyCandyCell ===undefined)
            return;
        else{
            board[emptyCandyCell[0]][emptyCandyCell[1]] = 10;
            clock--;
            drawBonus(10,emptyCandyCell[0],emptyCandyCell[1]);
        }
    }
    if (time_elapsed>0 && cherryBonus)
    {
        var emptyCandyCell = findRandomEmptyCell(board);
        if(emptyCandyCell ===undefined)
            return;
        else{
            board[1][1] = 777;
            var i =1;
            var j = 1;
            cherryBonus--;
            var center = new Object();
            center.x = i * 25 + 12;
            center.y = j * 25 + 12;
            cherry.exist = true;
            drawMovingBonus(center);
        }
    }
}



function drawBonus(bonus_id,i,j){
    var center = new Object();
    center.x = i * 25 + 12;
    center.y = j * 25 + 12;
    switch (bonus_id) {
        case 1:  // add candy 200 point
        context.beginPath();
                context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
                context.fillStyle = document.getElementById("clrlarge").value; //color
                context.fill();                
                context.font = "10px Verdana";
                context.beginPath();
                context.fillStyle = "white"; //color
                context.fillText("5",center.x-5, center.y+5);
                context.fill();
                break;
                case 11:
                context.beginPath();
                context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
                context.fillStyle = document.getElementById("clrmed").value; //color
                context.fill();
                context.font = "10px Verdana";
                context.beginPath();
                context.fillStyle = "white"; //color
                context.fillText("15",center.x-5, center.y+5);
                break;
                case 111:
                context.beginPath();
                context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
                /*context.fillStyle = "purple"; //color*/
                context.fillStyle = document.getElementById("clrsmall").value;
                context.fill();
                context.font = "10px Verdana";
                context.beginPath();
                context.fillStyle = "white"; //color
                context.fillText("25",center.x-5, center.y+5);
                context.fill();
                break;
                case 7:  // add candy 200 point
                context.beginPath();
            context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
            context.arc(center.x, center.y, 6, 0, 2 * Math.PI); // circle
            context.strokeStyle="green";
            context.lineWidth=5;
            context.fillStyle = "#2d2";
            context.stroke();
            context.fill();
            break;
            case 8:
            context.beginPath();
            context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
            context.strokeStyle="orange";
            context.lineWidth=5;
            context.fillStyle = "pink";
            context.stroke();
            context.fill();
            break;
            case 9:
            context.beginPath();
            context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
            context.strokeStyle="red";
            context.lineWidth=5;
            context.fillStyle = "black";
            context.stroke();
            context.fill();
            break;
            case 10:
            context.beginPath();
            context.arc(center.x, center.y, 7, 0, 2 * Math.PI); // circle
            context.strokeStyle="blue";
            context.lineWidth=5;
            context.fillStyle = "grey";
            context.stroke();
            context.fill();
            break;
            default:

            break;
        }
    }

    function createGhosts(ghost_num){
        if(ghost_num>0){
            ghosts[0] = new Ghost(29,0,"pink");
            if(ghost_num>1){
                ghosts[1] = new Ghost(0,19,"orange");
            }
            if(ghost_num==3){
                ghosts[2] = new Ghost(29,19,"purple");
            }
        }
    }

    function drawGhost(center,ghost_color){
        if(ghost_color == "white")
            ghost_radius+=1;
        context.fillStyle = ghost_color;
        context.beginPath();
        context.arc(center.x, center.y, ghost_radius, Math.PI, 0, false);
        context.moveTo(center.x-ghost_radius, center.y);

        context.lineTo(center.x-ghost_radius, center.y+ghost_radius);
        context.lineTo(center.x-ghost_radius+ghost_radius/3, center.y+ghost_radius-ghost_radius/4);
        context.lineTo(center.x-ghost_radius+ghost_radius/3*2, center.y+ghost_radius);
        context.lineTo(center.x, center.y+ghost_radius-ghost_radius/4);
        context.lineTo(center.x+ghost_radius/3, center.y+ghost_radius);
        context.lineTo(center.x+ghost_radius/3*2, center.y+ghost_radius-ghost_radius/4);

        context.lineTo(center.x+ghost_radius, center.y+ghost_radius);
        context.lineTo(center.x+ghost_radius, center.y);
        context.fill();
        if(ghost_color == "white")
            ghost_radius-=1;
        if(ghost_color != "white" ){
        context.fillStyle = "white"; //left eye
        context.beginPath();
        context.arc(center.x-ghost_radius/2.5, center.y-ghost_radius/5, ghost_radius/3, 0, Math.PI*2, true); // white
        context.fill();

        context.fillStyle = "white"; //right eye
        context.beginPath();
        context.arc(center.x+ghost_radius/2.5, center.y-ghost_radius/5, ghost_radius/3, 0, Math.PI*2, true); // white
        context.fill();


        context.fillStyle="black"; //left eyeball
        context.beginPath();
        context.arc(center.x-ghost_radius/2.5, center.y-ghost_radius/5, ghost_radius/6, 0, Math.PI*2, true); //black
        context.fill();

        context.fillStyle="black"; //right eyeball
        context.beginPath();
        context.arc(center.x+ghost_radius/2.5, center.y-ghost_radius/5, ghost_radius/6, 0, Math.PI*2, true); //black
        context.fill();
    }
}

function runAfterPacman(ghost){
    var upDist =1000;
    var downDist=1000;
    var leftDist=1000;
    var rightDist=1000;
    var minDist;

    if(boardValidation(ghost.x,ghost.y-1)==true){ // up
        upDist = Math.sqrt(Math.pow( (ghost.x - shape.i)  ,2)+Math.pow( (ghost.y-1) - shape.j,2));
    }
    if(boardValidation(ghost.x,ghost.y+1)==true){ // down
        downDist = Math.sqrt(Math.pow( (ghost.x - shape.i)  ,2)+Math.pow( (ghost.y+1) - shape.j,2));
    }
    if(boardValidation(ghost.x+1,ghost.y)==true){ // right
        rightDist = Math.sqrt(Math.pow( ghost.x+1 - shape.i  ,2)+Math.pow( ghost.y - shape.j,2));
    }
    if(boardValidation(ghost.x-1,ghost.y)==true){ // left
        leftDist = Math.sqrt(Math.pow( ghost.x-1 - shape.i  ,2)+Math.pow( ghost.y - shape.j,2));
    }
    minDist = Math.min(Math.min(leftDist, rightDist), Math.min(upDist, downDist));
    var direction;
    switch(minDist){
        case leftDist:
        direction = "left";
        break;
        case rightDist:
        direction = "right";
        break;
        case upDist:
        direction = "up";
        break;
        case downDist:
        direction = "down";
        break;
    }
    this.dist = minDist;
    ghost.ghostMove(direction);
}

function boardValidation(i,j){
    if(i<30 && i>=0 && j >= 0 && j<20){
        var location =board[i][j];
        return location != 4 && location != 5 && location != 200;
    }
    return false;
}

function runCherry(){
    var randomNum = Math.random();
    var options = 0;
    var direction=[];
    var i = 0;
        if(boardValidation(cherry.x,cherry.y-1)==true){ // up
            options++;
            direction[i++] = "up";
    }
    if(boardValidation(cherry.x,cherry.y+1)==true){ // down
            options++;
            direction[i++] = "down";
    }
    if(boardValidation(cherry.x+1,cherry.y)==true){ // right
            options ++;
            direction[i++] = "right";

    }
    if(boardValidation(cherry.x-1,cherry.y)==true){ // left
            options++;
            direction[i++] = "left";
    }
    
    var randomNum_2 = Math.ceil(randomNum*options);
        cherry.runBonus(direction[randomNum_2-1]);

}



function drawMovingBonus(center,color) {

        context.fillStyle = "white"; //left eye
        context.beginPath();
        context.arc(center.x-ghost_radius/2.5, center.y-ghost_radius/5, ghost_radius/3, 0, Math.PI*2, true); // white
        context.fill();

        context.fillStyle = "white"; //right eye
        context.beginPath();
        context.arc(center.x+ghost_radius/2.5, center.y-ghost_radius/5, ghost_radius/3, 0, Math.PI*2, true); // white
        context.fill();


        context.fillStyle=color; //left eyeball
        context.beginPath();
        context.arc(center.x-ghost_radius/2.5, center.y-ghost_radius/5, ghost_radius/6, 0, Math.PI*2, true); //black
        context.fill();

        context.fillStyle=color; //right eyeball
        context.beginPath();
        context.arc(center.x+ghost_radius/2.5, center.y-ghost_radius/5, ghost_radius/6, 0, Math.PI*2, true); //black
        context.fill();
}


function initializeAfterDeath(){
    for(let i = 0; i<ghosts.length;i++)
        ghosts[i].initialize();
    updateBoard(true);
    var center = new Object();
    center.x = shape.initX * 25 + 12;
    center.y = shape.initY * 25 + 12;
    drawPacman(center);
    shape.lastX = shape.initX;
    shape.lastY = shape.initY;
    shape.i = shape.initX;
    shape.j = shape.initY;
}

/*function Draw() {
    //canvas.width=canvas.width; //clean board    
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (var i = 0; i < 30; i++) {
        for (var j = 0; j < 20; j++) {
            var center = new Object();
            center.x = i * 25 + 12;
            center.y = j * 25 + 12;
            var candy_type =board[i][j];
            if (board[i][j] == 2) {
                drawPacman(center);
            }
            else if (board[i][j] == 1) {
                context.beginPath();
                context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
                context.fillStyle = "red"; //color
                context.fill();                
                context.font = "10px Verdana";
                context.beginPath();
                context.fillStyle = "white"; //color
                context.fillText("5",center.x-5, center.y+5);
                context.fill();

                
            }
            else if (board[i][j] == 11) {
                context.beginPath();
                context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
                context.fillStyle = "green"; //color
                context.fill();
                context.font = "10px Verdana";
                context.beginPath();
                context.fillStyle = "white"; //color
                context.fillText("15",center.x-5, center.y+5);

                context.fill();
            }
            else if (board[i][j] == 111) {
                context.beginPath();
                context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
                context.fillStyle = "purple"; //color
                context.fill();
                context.font = "10px Verdana";
                context.beginPath();
                context.fillStyle = "white"; //color
                context.fillText("25",center.x-5, center.y+5);

                context.fill();
            }
            else if (board[i][j] == 4) {
                context.beginPath();
                context.rect(center.x-2, center.y-9, 10,18);
                context.fillStyle = "grey"; //color
                context.fill();
            }
        }
    }

}*/
/*function UpdatePosition() {
    if(start==0){
        start=1;        
        Draw();
    }

    if(candy || pill || deathPill || clock ) // add remains bonus
        addNewCandies();
    shape.lastX = shape.i; //rows
    shape.lastY = shape.j; // cols
    board[shape.i][shape.j]=0;
    var x = GetKeyPressed();
    move(x);
    updateBoard(false);

    if( x==undefined && lastDirection!=-1){
        move(lastDirection);

    }
    addBonus();
    board[shape.i][shape.j]=2;
    var currentTime=new Date();
    time_elapsed=(currentTime-start_time)/1000;
    if(time_elapsed>Time || death)
    {
        window.clearInterval(interval);
        document.getElementById('myaudio').pause();
        if(death)
        {
            window.alert("You took the death pill - Game Over. Score:" + score );
        }
        else if(score<150)
        {
            window.alert("You can do better. Score:" + score );
            massageBox.value = "time run out.. try again!";
        }
        else
        {
            window.alert("We have a Winner!!!. Score:" + score);
            massageBox.value = "You rock! What a winner" ;
        }
    }
    else
    {
        updateBoard();
    }
}*/