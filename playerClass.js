class Player{
    constructor(health, damage, defense, speed){
        this.health = health;
        this.damage = damage;
        this.defense = defense;
        this.speed = speed;

        this.tolerance = 10;
        this.money = 0;
        this.experience = 0;


        //powers (as long as you have tolerance)
        //beer fetching machine
        //
        this.drunkPowers = [];

        //items (once per fight)
        this.items = [];
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

    checkLevelUp(){
        if(this.experience >= level + 100){
            this.level += 1;
            return (true);
        }
        return (false);
    }

}

export var player = new Player(10, 1, 1, 2);

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



export function createNewEnemy(playerLevel){
    var number = Math.floor(Math.random() * 4);

    if(number == 0){
        return( new AverageDrunk(
            "average drunk", //name
            Math.floor((playerLevel * 2) + 10), //health
            Math.floor((playerLevel * .5) + 1), //damage
            Math.floor((playerLevel * .5) + 1), //defense
            Math.floor((playerLevel * .3) + 1), //speed
        ));
    }
    else if(number == 1){
        return( new DrunkBussinesman(
            "drunk bussinesman", //name
            Math.floor((playerLevel * 2) + 10), //health
            Math.floor((playerLevel * .5) + 1), //damage
            Math.floor((playerLevel * .5) + 1), //defense
            Math.floor((playerLevel * .3) + 1), //speed
        ))
    }
    else if(number == 2){
        return( new ShirtlessFratBros(
            "shirtless frat bros", //name
            Math.floor((playerLevel * 2) + 10), //health
            Math.floor((playerLevel) + 2), //damage
            Math.floor((playerLevel * .5) + 1), //defense
            Math.floor((playerLevel * .3) + 1), //speed
        ))
    }
    else{
        return ( new WifeBeater(
            "wife beater", //name
            Math.floor((playerLevel * 2) + 10), //health
            Math.floor((playerLevel * .5) + 1), //damage
            Math.floor((playerLevel) + 2), //defense
            Math.floor((playerLevel * .1) + 1), //speed
        ))
    }
}

export var theEnemy = createNewEnemy(0);

export function savePlayer(){
    //saves the player data in json
    const jsonString = JSON.stringify(player);
    localStorage.setItem('player', jsonString);

}

export function loadPlayer(){
    //loads player from JSON to object, if no player JSON creates one

}