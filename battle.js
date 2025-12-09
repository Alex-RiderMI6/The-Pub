class Player{
    constructor(health, damage, defense, speed){
        this.health = health;
        this.damage = damage;
        this.defense = defense;
        this.speed = speed;

        this.tolerance = 10;
        this.money = 0;
        this.experience = 0;
        this.level = 0;


        //powers (as long as you have tolerance)
        //beer fetching machine
        //
        this.drunkPowers = [];

        //items the player has (once per fight)
        this.items = [];
    }

    //basic fight move
    throwHands() {

        //fail to hit
        if((Math.floor(Math.random() * 20)) == 1){
            return(false);
        }

        //does hit
        return(true);
    }

    checkLevelUp(){
        if(this.experience >= level + 100){
            this.level += 1;
            return (true);
        }
        return (false);
    }

}

class Enemy{
    constructor(name, health, damage, defense, speed){
        this.name = name;
        this.health = health;
        this.damage = damage;
        this.defense = defense;
        this.speed = speed;

        this.money = 0;
        this.experience = 0;
        this.level = 0;
    }

    //basic fight move
    throwHands() {

        //fail to hit
        if(Math.floor(Math.random() * 20) == 1){
            return(false);
        }

        //does hit
        return(true);
    }
}

//normal stats
class AverageDrunk extends Enemy{
    constructor(name, health, damage, defense, speed){
        super(name, health, damage, defense, speed);
    }


}

//can bore you and make your defense go down
class DrunkBussinesman extends Enemy{
    constructor(name, health, damage, defense, speed){
        super(name, health, damage, defense, speed);
    }

    
}

//Strong, with a high tolerance
class ShirtlessFratBros extends Enemy{
    constructor(name, health, damage, defense, speed){
        super(name, health, damage, defense, speed);
    }

    
}

//has special moves, but normal stats
class WifeBeater extends Enemy{
    constructor(name, health, damage, defense, speed){
        super(name, health, damage, defense, speed);
    }
}


function createNewEnemy(playerLevel){
    var number = Math.floor(Math.random() * 4);
    if(number == 0){
        document.getElementById('enemyPicture').src = "Images/averageDrunk.jpg";
        return( new AverageDrunk(
            "average drunk", //name
            Math.floor((playerLevel * 2) + 10), //health
            Math.floor((playerLevel * .5) + 1), //damage
            Math.floor((playerLevel * .5) + 1), //defense
            Math.floor((playerLevel * .3) + 1), //speed
        ));
    }
    else if(number == 1){
        document.getElementById('enemyPicture').src = "Images/drunkBusiness.jpg";
        return( new DrunkBussinesman(
            "drunk bussinesman", //name
            Math.floor((playerLevel * 2) + 10), //health
            Math.floor((playerLevel * .5) + 1), //damage
            Math.floor((playerLevel * .5) + 1), //defense
            Math.floor((playerLevel * .3) + 1), //speed
        ))
    }
    else if(number == 2){
        document.getElementById('enemyPicture').src = "Images/shirtlessFratBros.jpg";
        return( new ShirtlessFratBros(
            "shirtless frat bros", //name
            Math.floor((playerLevel * 2) + 10), //health
            Math.floor((playerLevel) + 2), //damage
            Math.floor((playerLevel * .5) + 1), //defense
            Math.floor((playerLevel * .3) + 1), //speed
        ))
    }
    else{
        document.getElementById('enemyPicture').src = "Images/wifeBeater.jpg";
        return ( new WifeBeater(
            "wife beater", //name
            Math.floor((playerLevel * 2) + 10), //health
            Math.floor((playerLevel * .5) + 1), //damage
            Math.floor((playerLevel) + 2), //defense
            Math.floor((playerLevel * .1) + 1), //speed
        ))
    }
}

function savePlayer(){
    //saves the player data in json
    const jsonString = JSON.stringify(player);
    localStorage.setItem('player', jsonString);

}

function loadPlayer(){
    //loads player from JSON to object, if no player JSON creates one

}

function waiting(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//variables for strings and counter

var disableButton = false; //counted in milliseconds
var player = new Player(10, 4, 1, 10);
var theEnemy;
var outputToDisplay = document.getElementById('outputBanner')
var playerHealthDisplay = document.getElementById('playerHealth');
var enemyHealthDisplay = document.getElementById('enemyHealth');
var enemyImageToMove = document.getElementById('enemyPicture');

//function to disable all buttons
function disableAllButtons(){
    document.getElementById('fightButtons').disabled = true;
    document.getElementById('showItemButton').disabled = true;
}

function enableAllButtons(){
    document.getElementById('fightButtons').disabled = false;
    document.getElementById('showItemButton').disabled = false;
}



//who goes first (no text)
function firstToBrawl(){
    if(player.speed <= theEnemy.speed) return false;
    return true;
}

//player chooses brawl (text)
function playerBrawl(){
    //player succeeds
    if(player.throwHands()){
        theEnemy.health -= (player.damage - theEnemy.defense);
        console.log(theEnemy.defense);
        outputToDisplay.innerHTML = theEnemy.name + " has taken " + (player.damage - theEnemy.defense) + " points of damage";
        return;
    }

    //player fails
    outputToDisplay.innerHTML = "Player missed";

}

function enemyBrawl(){
    //enemy succeeds
    if(theEnemy.throwHands()){
        player.health -= (theEnemy.damage - player.defense);
    }

    //enemy fails
}




//check if dead
function check_F_Upped(){
    if(theEnemy.health <= 0 || player.health <= 0) return (true);
    return(false);
}

//if the player is dead
function playerDead(){

}


//if the enemy is dead
function enemyDead(){

}


window.onload = function(){
    disableAllButtons();
    theEnemy = createNewEnemy(0);
    enemyHealthDisplay.innerHTML = "Health: " + theEnemy.health;
    playerHealthDisplay.innerHTML = "Health: " + player.health + "\n" + "Tolerance: " + player.tolerance;
    outputToDisplay.innerHTML = theEnemy.name + ' has appeared';
    waiting(1500).then(() => outputToDisplay.innerHTML = 'Choose an attack');
    waiting(2000).then(() => enableAllButtons());
    
}

function updateDisplays(){
    enemyHealthDisplay.innerHTML = "Health: " + theEnemy.health;
    playerHealthDisplay.innerHTML = "Health: " + player.health + "\n" + "Tolerance: " + player.tolerance;
}

//stops the function from going through for the number of milliseconds
function sleep(time){
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function enemyAnimation(){
    var numberOfLoops = 4;
    while(numberOfLoops > 0){
        enemyImageToMove.style.marginLeft = 40 + "px";
        await sleep(25);
        enemyImageToMove.style.marginLeft = 80 + "px";
        await sleep(25);
        enemyImageToMove.style.marginLeft = 40 + "px";
        await sleep(25);
        enemyImageToMove.style.marginLeft = 0 + "px";
        await sleep(25);
        enemyImageToMove.style.marginRight = 40 + "px";
        await sleep(25);
        enemyImageToMove.style.marginRight = 80 + "px";
        await sleep(25);
        enemyImageToMove.style.marginRight = 40 + "px";
        await sleep(25);
        enemyImageToMove.style.marginRight = 0 + "px";
        numberOfLoops -= 1;
    }
}

async function battle(){
    //disable all the buttons
    disableAllButtons();

    //enemy first



    //while loop all wait is over

    //enable all the buttons again
    updateDisplays();

    await enemyAnimation();

    enableAllButtons();
}


//side bar buttons

//check to see what buttons to show

//display sidebar
var drunkPowersSidebar = document.getElementById('drunkPowersSidebar');
var itemsSidebar = document.getElementById('itemsSidebar');

function showSidebar(number){
    //powers sidebar
    if(number == 1){
        if(drunkPowersSidebar.style.display == 'block'){
            drunkPowersSidebar.style.display = 'none';
        }
        else{
            itemsSidebar.style.display = 'none';
            drunkPowersSidebar.style.display = 'block';
        }
    }
    //items sidebar
    else if(number == 0){
        if(itemsSidebar.style.display == 'block'){
            itemsSidebar.style.display = 'none';
        }
        else{
            itemsSidebar.style.display = 'block';
            drunkPowersSidebar.style.display = 'none';
        }
    }
}