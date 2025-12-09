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

//save function
function saveData(){
    localStorage.setItem("playerDataPub", JSON.stringify(player.toJSON()));
    console.log(localStorage.getItem("playerDataPub"));
}

//setup
var player = loadData();
var playerCoinsDisplay = document.getElementById('playerCoins');
var knifeButton = document.getElementById("knifeButton");
var WCSGButton = document.getElementById("wcsgButton");
var STBButton = document.getElementById("stbButton");
var HBCButton = document.getElementById("hbcButton");
var BFMButton = document.getElementById("bfmButton");
var ESButton = document.getElementById("esButton");

var buySound = new Audio('Audio/moneySound.mp3');

playerCoinsDisplay.innerHTML = "Player Wallet: " + player.money;

//test if have item
function testIfHaveItem(){
    var number = player.items.length;
    knifeButton.style.color = "black";
    knifeButton.disabled = false;
    WCSGButton.style.color = "black";
    WCSGButton.disabled = false;
    STBButton.style.color = "black";
    STBButton.disabled = false;
    HBCButton.style.color = "black";
    HBCButton.disabled = false;
    BFMButton.style.color = "black";
    BFMButton.disabled = false;
    ESButton.style.color = "black";
    ESButton.disabled = false;

    for(let i = 0; i < number; i++){
        console.log(player.items[i]);
        if(player.items[i] == 'knife'){ 
            knifeButton.style.color = "red";
            knifeButton.disabled = true;
        }
        else if(player.items[i] == 'wcsg'){ 
            WCSGButton.style.color = "red";
            WCSGButton.disabled = true;
        }
        else if(player.items[i] == 'stb')  {
            STBButton.style.color = "red";
            STBButton.disabled = true;
        }
        else if(player.items[i] == 'bfm')  {
            HBCButton.style.color = "red";
            HBCButton.disabled = true;
        }
        else if(player.items[i] == 'hbc')  {
            BFMButton.style.color = "red";
            BFMButton.disabled = true;
        }
        else if(player.items[i] == 'sed')  {
            ESButton.style.color = "red";
            ESButton.disabled = true;
        }
    }

}
testIfHaveItem();


//test to buy
function testToBuy(itemToBuy){
    if(itemToBuy == 1 && player.money >= 3){
        player.items.push("knife");
        player.money -= 3;
        buySound.play();
    }
    else if(itemToBuy == 2 && player.money >= 5){
        player.items.push("wcsg");
        player.money -= 5;
        buySound.play();
    }
    else if(itemToBuy == 3 && player.money >= 2){
        player.items.push("stb");
        player.money -= 2;
        buySound.play();
    }
    else if(itemToBuy == 4 && player.money >= 10){
        player.items.push("bfm");
        player.money -= 10;
        buySound.play();
    }
    else if(itemToBuy == 5 && player.money >= 3){
        player.items.push("hbc");
        player.money -= 3;
        buySound.play();
    }
    else if(itemToBuy == 6 && player.money >= 2){
        player.items.push("sed");
        player.money -= 2;
        buySound.play();
    }

    saveData();
    playerCoinsDisplay.innerHTML = "Player Wallet: " + player.money;
    testIfHaveItem();
}
