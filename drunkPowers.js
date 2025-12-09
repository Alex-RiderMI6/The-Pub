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

//localStorage.removeItem("playerDataPub");

//setup
var player = loadData();
var playerCoinsDisplay = document.getElementById('playerCoins');
var bigHitButton = document.getElementById("bigHitButton");
var healButton = document.getElementById("healButton");
var randomItemButton = document.getElementById("randomItemButton");
var defenseUpButton = document.getElementById("defenseUpButton");
var speedUpButton = document.getElementById("speedUpButton");

var buySound = new Audio('Audio/moneySound.mp3');

playerCoinsDisplay.innerHTML = "Player Wallet: " + player.money;


//test if have power
function testIfHavePower(){
    if(player.bigHitAttack == true){
        bigHitButton.disabled = true;
        bigHitButton.style.color = "red";
    }
    if(player.healPlayerPower){
        healButton.disabled = true;
        healButton.style.color = "red";
    }
    if(player.randomItemPower){
        randomItemButton.disabled = true;
        randomItemButton.style.color = "red";
    }
    if(player.defenseUpPower){
        defenseUpButton.disabled = true;
        defenseUpButton.style.color = "red";
    }
    if(player.speedUpPower){
        speedUpButton.disabled = true;
        speedUpButton.style.color = "red";
    }

}
testIfHavePower();

//test to buy
function testToBuy(powerToBuy){
    if(powerToBuy == 1 && player.money >= 30){
        player.bigHitAttack = true
        player.money -= 30;
        buySound.play();
    }
    else if(powerToBuy == 2 && player.money >= 20){
        player.healPlayerPower = true;
        player.money -= 20;
        buySound.play();
    }
    else if(powerToBuy == 3 && player.money >= 35){
        player.randomItemPower = true;
        player.money -= 35;
        buySound.play();
    }
    else if(powerToBuy == 4 && player.money >= 15){
        player.defenseUpPower = true;
        player.money -= 15;
        buySound.play();
    }
    else if(powerToBuy == 5 && player.money >= 15){
        player.speedUpPower = true
        player.money -= 15;
        buySound.play();
    }

    else{

    }

    saveData();
    playerCoinsDisplay.innerHTML = "Player Wallet: " + player.money;
    testIfHavePower();
}