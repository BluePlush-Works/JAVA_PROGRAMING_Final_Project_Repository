//global variables used troughout the game
let x = 1; let y = 1; let player_x = 0; let player_y = 0; let shop_x = 0; let shop_y = 0; let exit_x = 0; let exit_y = 0; //Axes for max map location, player, map and stairs location
const map = Array.from({ length: 10 }, () => Array(10).fill(" ")); //map array
let text = ""; //map check message
let incombat = 0; //boolean to keep track of combat: 0 = no, 1 = yes
let player_hp = 10; let player_gold = 0; let player_items = 0; //track of player's content
let floors = 0; //current floor number
let rng_1 = 0; let rng_2= 0; let rng_3 = 0; //rng trackers
let enemy_hp = 0; //enemy hp tracker

//global variables to keep track of elements
var GameImage = document.getElementById("GameImage"); //images
var Narration = document.getElementById("Narration"); //game text
var playerHPtext = document.getElementById("playerhp"); //player hp text
var enemyHPtext = document.getElementById("enemyhp"); //player hp text
var moveW = document.getElementById("moveW"); //Button - Move Up
var moveA = document.getElementById("moveA"); //Button - Move Left
var moveD = document.getElementById("moveD"); //Button - Move Right
var moveS = document.getElementById("moveS"); //Button - Move Down
var mapcheck = document.getElementById("mapcheck"); //Button - Check Map
var fight = document.getElementById("fight"); //Button - Attack
var guard = document.getElementById("guard"); //Button - Guard
var item = document.getElementById("item"); //Button - Item
var run = document.getElementById("run"); //Button - Flee
var modal = document.getElementById("map"); //small window where the map is showed
var span = document.getElementsByClassName("close")[0]; //close button for the map window

//map window actions

//clicking the check map button, which draws the map on the window
mapcheck.onclick = function() {
	Draw_Map();
	document.getElementById("Modal_Text").innerHTML = text;
	modal.style.display = "block";
}

//clicking on the x, closing the window
span.onclick = function() {
	modal.style.display = "none";
}

//clicking outside the window, closing it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}  

//game start
function Game_Start(){
	Create_Map();
	Draw_Map();
    GameImage.src = "Media/Background_Empty.png";
    Narration.innerHTML = "You awake with no memory of how you got here. All you have is an ever-shifting map to guide you to an exit that may never lead you out of this dungeon.";
	fight.style.display = "none";
	guard.style.display = "none";
	item.style.display = "none";
	run.style.display = "none";
	player_gold = 0;
	player_items = 3;
	item.innerHTML = "Use Item (" + player_items + " left)";
	playerHPtext.innerHTML = "Your HP: " + player_hp;
	enemyHPtext.innerHTML = "";
}

//map related functions

//Randomly create the map
function Create_Map() {
	x = Math.floor(Math.random() * 10);
	y = Math.floor(Math.random() * 10);
	for(let i = 0; i <= y; i++){
		for(let o = 0; o <= x; o++){
			map[i][o] = " ";
		}
	}
	player_x = 0;
	player_y = 0;
	exit_x = Math.floor(Math.random() * x);
	exit_y = Math.floor(Math.random() * y);
	while (exit_x === player_x && exit_y === player_y) {
		exit_x = Math.floor(Math.random() * (x + 1));
		exit_y = Math.floor(Math.random() * (y + 1));
	}
	shop_x = Math.floor(Math.random() * x);
	shop_y = Math.floor(Math.random() * y);
	while (shop_x === player_x && shop_y === player_y) {
		shop_x = Math.floor(Math.random() * (x + 1));
		shop_y = Math.floor(Math.random() * (y + 1));
	}
	while (shop_x === exit_x && shop_y === exit_y) {
		shop_x = Math.floor(Math.random() * (x + 1));
		shop_y = Math.floor(Math.random() * (y + 1));
	}
	floors += 1;
}

//Visualise the map (for the map check funtion)
function Draw_Map(){
	text = "";
	map[player_y][player_x] = "X";
    map[shop_y][shop_x] = "S";
    map[exit_y][exit_x] = "E";
	text += "Floor " + floors + "<br>";
	text += "<br>-----------------------------------------<br>";
    for (let i = 0; i <= y; i++) //Y
	{
		text += "|";
        for (let j = 0; j <= x; j++) //X
		{
			text += map[i][j];
			if (j <= x) text += "|";
		}
	
		text += "<br>";
		
		if (i <= y) text += "-----------------------------------------<br>";
	}
}

//movement related functions

//The actual movement function
function movement(direction){
	if(direction == "w"){ //up
		map[player_y][player_x] = " ";
		player_y -= 1;
		map[player_y][player_x] = "X";
	}
	if(direction == "s"){//down
		map[player_y][player_x] = " ";
		player_y += 1;
		map[player_y][player_x] = "X";
	}
	if(direction == "a"){//left
		map[player_y][player_x] = " ";
		player_x -= 1;
		map[player_y][player_x] = "X";
	}
	if(direction == "d"){//right
		map[player_y][player_x] = " ";
		player_x += 1;
		map[player_y][player_x] = "X";
	}
	rng_1 = Math.floor(Math.random() * 5) + 1; //encounter
	if(rng_1 == 5){ //encounter happens
		rng_2 = Math.floor(Math.random() * 6) + 1; //enemy type
		switch(rng_2) {
			case 1: //Assassin
				GameImage.src = "Media/Background_Assassin.png";
				Narration.innerHTML = "An assassin blocks your path.";
				enemy_hp = 10;
				break;
			case 2: //Bandit
				GameImage.src = "Media/Background_Bandit.png";
				Narration.innerHTML = "A bandit blocks your path.";
				enemy_hp = 8;
				break;
            case 3: //Bat
				GameImage.src = "Media/Background_Bat.png";
				Narration.innerHTML = "A bat blocks your path.";
				enemy_hp = 5;
				break;
            case 4: //Skeleton
				GameImage.src = "Media/Background_Skeleton.png";
				Narration.innerHTML = "A skeleton blocks your path.";
				enemy_hp = 12;
				break;
            case 5: //Werewolf
				GameImage.src = "Media/Background_Werewolf.png";
				Narration.innerHTML = "A werewolf blocks your path.";
				enemy_hp = 15;
				break;
			case 6: //Zombie
				GameImage.src = "Media/Background_Zombie.png";
				Narration.innerHTML = "A zombie blocks your path.";
				enemy_hp = 10;
				break;
		}
		moveW.style.display = "none";
		moveA.style.display = "none";
		moveS.style.display = "none";
		moveD.style.display = "none";
		mapcheck.style.display = "none";
		fight.style.display = "block";
		guard.style.display = "block";
		item.style.display = "block";
		run.style.display = "block";
		enemyHPtext.innerHTML = "Enemy HP: " + enemy_hp;
	}else{ //encounter doesn't happen
		if (player_x === exit_x && player_y === exit_y) {// next floor
			Narration.innerHTML = "It looks like you've found a staircase. Although it leads further down into this dungeon, you have little choice but to go down it.";
			Create_Map();
		}else if (player_x === shop_x && player_y === shop_y) {// open shop
			Narration.innerHTML = "You seem to have come across a shop. Rather than wonder how or why a shop would be here, you decide to browse it's wares.";
		}else{
			Narration.innerHTML = "As you walk through these halls, everything looks the same, you can barely tell where you are.";
		}
	}
}

//Up
function moveUp(){
	if(player_y == 0){
		Narration.innerHTML = "A wall stands before you. You can't go that way.";
	}else{
		movement("w");
	}
}

//Down
function moveDown(){
	if(player_y == y){
		Narration.innerHTML = "A wall stands before you. You can't go that way.";
	}else{
		movement("s");
	}
}

//Left
function moveLeft(){
	if(player_x == 0){
		Narration.innerHTML = "A wall stands before you. You can't go that way.";
	}else{
		movement("a");
	}
}

//Right
function moveRight(){
	if(player_x == x){
		Narration.innerHTML = "A wall stands before you. You can't go that way.";
	}else{
		movement("d");
	}
}

//battle related functions

//fight button
function fight(){
	
}

//guard button
function guard(){
	
}

//item button
function item(){
	
}

//flee button
function flee(){
	moveW.style.display = "block";
	moveA.style.display = "block";
	moveS.style.display = "block";
	moveD.style.display = "block";
	mapcheck.style.display = "block";
	fight.style.display = "none";
	guard.style.display = "none";
	item.style.display = "none";
	run.style.display = "none";
	enemyHPtext.innerHTML = "";
	Narration.innerHTML = "You safely ran away.";
	GameImage.src = "Media/Background_Empty.png";
}
