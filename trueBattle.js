//change the parameters to help with loading and saving into cache JSON object
class Player{
    constructor(health, damage, defense, speed, tolerance, money, experience, level, nh, nd, ndfs, ns, nt, items=[], bha, hpp, rip, dup, sup){
        this.health = health;
        this.damage = damage;
        this.defense = defense;
        this.speed = speed;

        this.tolerance = tolerance;
        this.money = money;
        this.experience = experience;
        this.level = level;

        //max stats and normal stats, just use playerLevel to figure this out
        this.maxTolerance = nt;
        this.maxHealth = nh;
        this.normalDamage = nd;
        this.normalSpeed = ns;
        this.normalDefense = ndfs;


        //powers are booleans that are turned true only if the player has purchased them
        this.bigHitAttack = bha;
        this.healPlayerPower = hpp;
        this.randomItemPower = rip;
        this.defenseUpPower = dup;
        this.speedUpPower = sup;

        //items the player has (once per fight)
        this.items = items;

        this.chanceOfMiss = 20;
        this.normalChanceOfMiss = 20;
    }

    //basic fight move
    throwHands() {

        //fail to hit
        if((Math.floor(Math.random() * this.chanceOfMiss)) == 1){
            return(false);
        }

        //does hit
        return(true);
    }

    checkLevelUp(){
        if(this.experience >= (this.level * 100) + 100){
            this.level += 1;
            return (true);
        }
        return (false);
    }

    levelUp(){
        if(this.level % 2 == 1){
            this.maxHealth += (this.level * .5) + 4;
            this.maxTolerance += (this.level * .5) + 4;
            this.health = this.maxHealth;
            this.tolerance = this.maxTolerance;
            console.log(this.health);
        }
        else{
            this.normalDamage += (this.level * .5) + 4;
            this.normalDefense += (this.level * .5) + 4;
            this.normalSpeed += (this.level * .5) + 4;
        }
        Audio('Audio/levelUp.mp3').play();
    }

    toJSON(){
        return{
            health: this.health,
            damage: this.damage,
            defense: this.defense,
            speed: this.speed,
            tolerance: this.tolerance,
            money: this.money,
            experience: this.experience,
            level: this.level,
            maxHealth: this.maxHealth,
            maxTolerance: this.maxTolerance,
            normalDamage: this.normalDamage,
            normalDefense: this.normalDefense,
            normalSpeed: this.normalSpeed,
            items: this.items,
            bigHit: this.bigHitAttack,
            healPower: this.healPlayerPower,
            randomItem: this.randomItemPower,
            defensePower: this.defenseUpPower,
            speedPower: this.speedUpPower
        };
    }
}

class Enemy{
    constructor(name, health, damage, defense, speed, money, experience){
        this.name = name;
        this.health = health;
        this.damage = damage;
        this.defense = defense;
        this.speed = speed;

        this.money = money;
        this.experience = experience;
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

    //create a dissision function

}


//create more balanced enemys
function createNewEnemy(playerLevel){
    var number = Math.floor(Math.random() * 4);
    if(number == 0){
        document.getElementById('enemyPicture').src = "Images/averageDrunk.jpg";
        return( new Enemy(
            "average drunk", //name
            Math.floor((playerLevel * .2) + 10), //health
            Math.floor((playerLevel * .2) + 4), //damage
            Math.floor((playerLevel * .2) + 2), //defense
            Math.floor((playerLevel * .2) + 1), //speed, change all speed when the battle section is done
            3, //money
            100 //xp
        ));
    }
    else if(number == 1){
        document.getElementById('enemyPicture').src = "Images/drunkBusiness.jpg";
        return( new Enemy(
            "drunk bussinesman", //name
            Math.floor((playerLevel * .2) + 13), //health
            Math.floor((playerLevel * .2) + 2), //damage
            Math.floor((playerLevel * .2) + 2), //defense
            Math.floor((playerLevel * .2) + 1), //speed
            3, //money
            100 //xp
        ))
    }
    else if(number == 2){
        document.getElementById('enemyPicture').src = "Images/shirtlessFratBros.jpg";
        return( new Enemy(
            "shirtless frat bros", //name
            Math.floor((playerLevel * .2) + 10), //health
            Math.floor((playerLevel) + .2), //damage
            Math.floor((playerLevel * .2) + 2), //defense
            Math.floor((playerLevel * .2) + 3), //speed
            3, //money
            100 //xp
        ))
    }
    else{
        document.getElementById('enemyPicture').src = "Images/wifeBeater.jpg";
        return ( new Enemy(
            "wife beater", //name
            Math.floor((playerLevel * .2) + 10), //health
            Math.floor((playerLevel * .2) + 4), //damage
            Math.floor((playerLevel) + .2), //defense
            Math.floor((playerLevel * .2) + 1), //speed
            3, //money
            100 //xp
        ))
    }
}

//stops the function from going through for the number of milliseconds
function sleep(time){
    return new Promise((resolve) => setTimeout(resolve, time));
}

//localStorage.removeItem("playerDataPub");

//load function
function loadData(){
    var gameData;
    if(localStorage.getItem("playerDataPub") != null){
        gameData = JSON.parse(localStorage.getItem("playerDataPub"));
        return new Player(gameData["health"], gameData["damage"], gameData["defense"], gameData["speed"],
            gameData.tolerance, gameData["money"], gameData["experience"],
            gameData["level"], gameData["maxHealth"], gameData["normalDamage"],
            gameData["normalDefense"],gameData["normalSpeed"], gameData["maxTolerance"], gameData["items"],
            gameData["bigHit"], gameData["healPower"], gameData["randomItem"], gameData["defensePower"],
            gameData["speedPower"]
        );
    }
    else{
        return new Player(10, 4, 1, 10, 10, 0, 0, 0, 10, 4, 1, 10, 10, [], false, false, false, false, false);
    }

}

//setting up player and enemy
var player = loadData();
var theEnemy = createNewEnemy(player.level);

//save function
function saveData(){
    localStorage.setItem("playerDataPub", JSON.stringify(player.toJSON()));
    console.log(localStorage.getItem("playerDataPub"));
}

//DOMs for sidebars and displays
var outputToDisplay = document.getElementById('outputBanner')
var playerHealthDisplay = document.getElementById('playerHealth');
var enemyHealthDisplay = document.getElementById('enemyHealth');
var enemyImageToMove = document.getElementById('enemyPicture');
var drunkPowersSidebar = document.getElementById('drunkPowersSidebar');
var itemsSidebar = document.getElementById('itemsSidebar');
var stopTurn = false;

var punchSound = new Audio('Audio/punchSound.mp3');

//DOMs for items and drunk powers
var bigHitButton = document.getElementById('bitHit');
var healButton = document.getElementById('heal');
var randItemButton = document.getElementById('randItem');
var defenseUpButton = document.getElementById('defenseUp');
var speedUpButton = document.getElementById('speedUp');

var knifeButton = document.getElementById('knifeItem');
var scotchGlassButton = document.getElementById('wcsg');
var bootButton = document.getElementById('stb');
var BFMButton = document.getElementById('bfm');
var blueCrystalButton = document.getElementById('hbc');
var enemySlowerButton = document.getElementById('sed');


//function to remove an item from a list
function removeItem(arr, itemToRemove){
    var index =  arr.indexOf(itemToRemove);
    if(index != -1){
        arr.splice(index, 1);
    }
}

//starts the first battle senario
window.onload = function(){
    enemyHealthDisplay.innerHTML = "Health: " + theEnemy.health;
    playerHealthDisplay.innerHTML = "Health: " + player.health + "\n" + "Tolerance: " + player.tolerance;
    outputToDisplay.innerHTML = theEnemy.name + ' has appeared';
    shownDrunkPowers();
    shownItems();
}


//function to disable all buttons
function disableAllButtons(){
    document.getElementById('fightButtons').disabled = true;
    document.getElementById('showItemButton').disabled = true;
    document.getElementById('showDrunkPowersButton').disabled = true;
    document.getElementById('runAwayButton').disabled = true;
    drunkPowersSidebar.style.display = 'none';
    itemsSidebar.style.display = 'none';
}

//function to enable all buttons
function enableAllButtons(){
    document.getElementById('fightButtons').disabled = false;
    document.getElementById('showItemButton').disabled = false;
    document.getElementById('showDrunkPowersButton').disabled = false;
    document.getElementById('runAwayButton').disabled = false;
}

//enemy damage animation
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

//update shown stats
function updateDisplays(){
    enemyHealthDisplay.innerHTML = "Health: " + theEnemy.health;
    playerHealthDisplay.innerHTML = "Health: " + player.health + "\n" + "Tolerance: " + player.tolerance;
}


//display sidebar
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


///////////////////////
//aftermath functions//
///////////////////////

function testIfDead(){
    if(theEnemy.health <= 0 || player.health <= 0) return true;
    else return false;
}

async function playerDead(){
    outputToDisplay.innerHTML = "The Player was knocked senseless";
    await sleep(2000);
    player.health = player.maxHealth;
    player.tolerance = player.maxTolerance;
    saveData();
    window.location.href = 'homePage.html';
}

//still need money and leveling
async function enemyDead() {
    outputToDisplay.innerHTML = "The Player curb stomped the " + theEnemy.name;
    await sleep(2000);

    //gain levels and money
    outputToDisplay.innerHTML = "The Player found " + theEnemy.money + "$ in the " + theEnemy.name + "'s pockets";
    player.money += theEnemy.money;
    await sleep(2000);
    outputToDisplay.innerHTML = "The Player gained " + theEnemy.experience + " points of experience";
    player.experience += theEnemy.experience;
    if(player.checkLevelUp()){
        await sleep(2000);
        player.levelUp();
        outputToDisplay.innerHTML = "The Player went up a level";
    }
    await sleep(2000);
    player.health = player.maxHealth;
    player.tolerance = player.maxTolerance;
    player.damage = player.normalDamage;
    player.defense = player.normalDefense;
    player.speed = player.normalSpeedl;
    player.chanceOfMiss = player.normalChanceOfMiss;

    await sleep(2000);
    theEnemy = createNewEnemy(player.level);
    outputToDisplay.innerHTML = theEnemy.name + " has appeared";
    updateDisplays();
    saveData();
}

//function used when the player runs away
async function runAway() {
    outputToDisplay.innerHTML = "The Player ran away like a coward";
    saveData();
    await sleep(2000);
    window.location.href = 'homePage.html';
}

//////////////////////
//fighting functions//
//////////////////////

//returns true if the player choice is first
function firstToFight(){
    if(player.speed <= theEnemy.speed) return false;
    return true;
}

//action for hitting the fight button
async function playerBrawl(){
    outputToDisplay.innerHTML = "The Player threw a punch";
    if(player.throwHands()){
        await sleep(2000);
        punchSound.play();
        enemyAnimation();
        outputToDisplay.innerHTML = "The Player did " + (player.damage - theEnemy.defense) + " points of damage";
        theEnemy.health -= (player.damage - theEnemy.defense);
    }
    else{
        await sleep(2000);
        outputToDisplay.innerHTML = "The Player missed";
    }
}

//when the enemy chooses to fight
async function enemyBrawl(){
    outputToDisplay.innerHTML = "The " + theEnemy.name + " threw a punch";
    if(theEnemy.throwHands()){
        await sleep(2000);
        punchSound.play();
        if(theEnemy.damage - player.defense <= 0){
            outputToDisplay.innerHTML = "The " + theEnemy.name + " did 1 point of damage to the player";
            player.health -= 1;
        }
        else{
            outputToDisplay.innerHTML = "The " + theEnemy.name + " did " + (theEnemy.damage - player.defense) + " points of damage to the Player";
            player.health -= (theEnemy.damage - player.defense);
        }
    }
    else{
        await sleep(2000);
        outputToDisplay.innerHTML = "The " + theEnemy.name + " missed";
    }
}

//DP
////////////////

//Big hit  5tp
async function bigHit(){
    outputToDisplay.innerHTML = "The Player threw a wild haymaker";
    await sleep(2000);
    enemyAnimation();
    outputToDisplay.innerHTML = theEnemy.name + " took " + (player.damage + (Math.ceil(player.damage / 2))) + " points of damage";
    theEnemy.health -= player.damage + (Math.ceil(player.damage / 2));
    player.tolerance -= 5;
}

//heal  8tp
async function healPlayer() {
    outputToDisplay.innerHTML = "The Player decided to impersonate Wolverine by healing";
    await sleep(2000);
    outputToDisplay.innerHTML = "The Player healed half their health";
    if(player.health + (player.maxHealth / 2) > player.maxHealth) player.health = player.maxHealth;
    else player.health = player.maxHealth;
    player.tolerance -= 8;
}

//random item  3tp
async function randomItem() {
    var randomNumber = Math.floor(Math.random() * 6);
    outputToDisplay.innerHTML = "The Player used the power of being blackout drunk to will an item into existance"
    await sleep(2000);

    if(randomNumber == 0){ 
        player.items.push("knife");
        outputToDisplay.innerHTML = "The Player got a knife";
    }
    else if(randomNumber == 1){
        player.items.push("wcsg");
        outputToDisplay.innerHTML = "The Player got Winston Churchill's Actual Scotch Glass";
    }
    else if(randomNumber == 2){ 
        player.items.push("stb");
        outputToDisplay.innerHTML = "The Player got a steel toed boot";
    }
    else if(randomNumber == 3){ 
        player.items.push("bfm");
        outputToDisplay.innerHTML = "The Player got a beer fetching machine";
    }
    else if(randomNumber == 4){ 
        player.items.push("hbc");
        outputToDisplay.innerHTML = "The Player got Hiesenburg's blue crystal";
    }
    else if(randomNumber == 5){ 
        player.items.push("sed");
        outputToDisplay.innerHTML = "The Player got SOMETHING TO MAKE THE ENEMY SLOWER";
    }
    player.tolerance -= 3;
    shownItems();
}

//defense up  4tp
async function defenseUp() {
    outputToDisplay.innerHTML = "The Player became numb due to alchol intake";
    await sleep(2000);
    outputToDisplay.innerHTML = "The Player gained 3 defense points";
    player.defense += 3;
    player.tolerance -= 4;
}

//speed up  2tp
async function speedUp() {
    outputToDisplay.innerHTML = "The Player became faster";
    player.speed += 1;
    player.tolerance -= 2;
}

//Item powers
///////////////

//knife - more damge
async function useKnife() {
    outputToDisplay.innerHTML = "The Player brandished a knife";
    await sleep(2000);
    outputToDisplay.innerHTML = "The Player gained 5 points of damage";
    player.damage += 5;
    removeItem(player.items, "knife");
    shownItems();
}

//WCSG - more tolerance
async function WCSG() {
    outputToDisplay.innerHTML = "The Player used Winston Churchill's actual scotch glass";
    await sleep(2000);
    outputToDisplay.innerHTML = "The Player gained 5 tolerance points";
    if(player.tolerance + 5 > player.maxTolerance) player.tolerance = player.maxTolerance;
    else player.tolerance += 5;
    removeItem(player.items, "wcsg");
    shownItems();
}

//Steel toed boot - more defense
async function STB() {
    outputToDisplay.innerHTML = "The Player put on a pair of steel toed boots";
    await sleep(2000);
    outputToDisplay.innerHTML = "The Player gained 2 points of defense";
    player.defense += 2;
    removeItem(player.items, "stb");
    shownItems();
}

//beer fetching machine -throws a child, large damage
async function BFM() {
    outputToDisplay.innerHTML = "The Player threw a beer fetching machine";
    await sleep(2000);
    outputToDisplay.innerHTML = "The beer fetching machine did " + (8 - theEnemy.defense) + "points of damage";
    theEnemy.health -= (8 + theEnemy.defense);
    removeItem(player.items, "bfm");
    shownItems();
}

//Hiesenburg's blue crystal - more speed and defense, higher chance of missing 1 in 20 to 1 in 10
async function HBC() {
    outputToDisplay.innerHTML = "The Player used Hiesenburg's blue crystal";
    await sleep(2000);
    outputToDisplay.innerHTML = "The Player gained 3 points of speed and defense, but lost some accuracy";
    player.speed += 3;
    player.defense += 3;
    player.chanceOfMiss = 10;
    removeItem(player.items, "hbc");
    shownItems();
}

//something to make the enemy slower
async function SED() {
    outputToDisplay.innerHTML = "The Player used an item to make the enemy slower";
    await sleep(2000);
    outputToDisplay.innerHTML = theEnemy.name + " became slower";
    theEnemy.speed -= 2;
    removeItem(player.items, "sed");
    shownItems();
}


//function to see what drunk powers to show
function shownDrunkPowers(){
    if(player.bigHitAttack == true) bigHitButton.style.display = 'block';
    else bigHitButton.style.display = 'none';
    if(player.healPlayerPower == true) healButton.style.display = 'block';
    else healButton.style.display = 'none';
    if(player.randomItemPower == true) randItemButton.style.display = 'block';
    else randItemButton.style.display = 'none';
    if(player.defenseUpPower == true) defenseUpButton.style.display = 'block';
    else defenseUpButton.style.display = 'none';
    if(player.speedUpPower == true) speedUpButton.style.display = 'block';
    else speedUpButton.style.display = 'none';
}

//function to update list of items shown
function shownItems(){
    var number = player.items.length;
    knifeButton.style.display = 'none';
    scotchGlassButton.style.display = 'none'
    bootButton.style.display = 'none';
    BFMButton.style.display = 'none';
    blueCrystalButton.style.display = 'none'
    enemySlowerButton.style.display = 'none';

    for(let i = 0; i < number; i++){
        console.log(player.items[i]);
        if(player.items[i] == 'knife') knifeButton.style.display = 'block';
        else if(player.items[i] == 'wcsg') scotchGlassButton.style.display = 'block';
        else if(player.items[i] == 'stb') bootButton.style.display = 'block';
        else if(player.items[i] == 'bfm') BFMButton.style.display = 'block';
        else if(player.items[i] == 'hbc') blueCrystalButton.style.display = 'block';
        else if(player.items[i] == 'sed') enemySlowerButton.style.display = 'block';
    }
}


//function to display not enough tp
async function notEnoughTP() {
    outputToDisplay.innerHTML = "Player doesn't have enough tolerance points";
    stopTurn = true;
}

//function to execute when a turn is terminated
async function endTurnEarly() {
    await sleep(2000);
    outputToDisplay.innerHTML = "Choose an attack";
}

//function used to execute the player's choice
async function playerBrawling(playerChoice){
    //player fight button
    if(playerChoice == 0) await playerBrawl();

    //drunk powers
    else if(playerChoice == 1 && player.tolerance >= 5) await bigHit();
    else if(playerChoice == 2 && player.tolerance >= 8) await healPlayer();
    else if(playerChoice == 3 && player.tolerance >= 3) await randomItem();
    else if (playerChoice == 4 && player.tolerance >= 4) await defenseUp();
    else if (playerChoice == 5 && player.tolerance >= 2) await speedUp();

    //items
    else if(playerChoice == 6) await useKnife();
    else if(playerChoice == 7) await WCSG();
    else if(playerChoice == 8) await STB();
    else if(playerChoice == 9) await BFM();
    else if(playerChoice == 10) await HBC();
    else if(playerChoice == 11) await SED();

    //not enough tp
    else{
        await notEnoughTP();
    }

}


//function used to execute the enemy's choice
async function enemyBrawling(enemyChoice){
    //enemy chooses fight button
    if(enemyChoice == 0) await enemyBrawl();
}


//one turn of the battle
async function battleTurn(playerChoice) {
    disableAllButtons();
    if(firstToFight()) {
        //player attack
        await playerBrawling(playerChoice);
        if(stopTurn == true){
            stopTurn = false;
            await endTurnEarly();
            enableAllButtons();
            return;
        }
        updateDisplays();
        await sleep(2000);

        //test if enemy is dead
        if(testIfDead()){
            await enemyDead();
            enableAllButtons();
            return;
        }

        //enemy attack
        await enemyBrawling(0); //add a function to make the enemy choose different attacks
        updateDisplays();
        await sleep(2000);

        //test if player is dead
        if(testIfDead()){
            await playerDead();
        }

        updateDisplays();
        outputToDisplay.innerHTML = "choose an attack";
        enableAllButtons();
    }

    else{
        //enemy attack
        await enemyBrawling(0);
        updateDisplays();
        await sleep(1000);

        //test if player is dead
        if(testIfDead()){
            await playerDead();
        }

        //player attack
        await playerBrawling(playerChoice);
        if(stopTurn == true){
            await endTurnEarly();
            enableAllButtons();
            return;
        }
        updateDisplays();
        await sleep(1000);

        //test if enemy is dead
        if(testIfDead()){
            await enemyDead();
            enableAllButtons();
            return;
        }
        outputToDisplay.innerHTML = "choose an attack";
        enableAllButtons();
    }
}


