//global variables used troughout the game
let x = 1; let y = 1; let player_x = 0; let player_y = 0; let shop_x = 0; let shop_y = 0; let exit_x = 0; let exit_y = 0; //Axes for max map location, player, map and stairs location
const map = Array.from({ length: 10 }, () => Array(10).fill("_")); //map array
let text = ""; //map check message
let incombat = 0; //boolean to keep track of combat: 0 = no, 1 = yes
let player_gold = 0; let player_items = 0; //track of player gold and items
let floors = 0; //current floor number
let rng_1 = 0; let rng_2= 0; let rng_3 = 0; //rng trackers

//global variables to keep track of elements
var GameImage = document.getElementById("GameImage"); //images
var Narration = document.getElementById("Narration"); //text
var moveW = document.getElementById("moveW"); //Button - Move Up
var moveA = document.getElementById("moveA"); //Button - Move Left
var moveD = document.getElementById("moveD"); //Button - Move Right
var moveS = document.getElementById("moveS"); //Button - Move Down
var mapcheck = document.getElementById("mapcheck"); //Button - Check Map
var engage = document.getElementById("engage"); //Button - Fight
var fight = document.getElementById("fight"); //Button - Attack
var guard = document.getElementById("guard"); //Button - Guard
var item = document.getElementById("item"); //Button - Item
var run = document.getElementById("run"); //Button - Flee

//game start
function Game_Start(){
	Create_Map();
    GameImage.src = "Media/Background_Empty.png";
    Narration.innerHTML = "You awake with no memory of how you got here. All you have is an ever-shifting map to guide you to an exit that may never lead you out of this dungeon.";
	engage.style.display = "none";
	fight.style.display = "none";
	guard.style.display = "none";
	item.style.display = "none";
	run.style.display = "none";
}

//map related functions

//Randomly create the map
function Create_Map() {
	x = Math.floor(Math.random() * 10) + 1;
	y = Math.floor(Math.random() * 10) + 1;
	for(let i = 0; i <= y; i++){
		for(let o = 0; o <= x; o++){
			map[i][o] = " ";
		}
	}
	player_x = 0;
	player_y = 0;
	exit_x = Math.floor(Math.random() * (x + 1));
	exit_y = Math.floor(Math.random() * (y + 1));
	if(exit_x == player_x){
		exit_x += 1;
		if(exit_x > x){
			exit_x -= 1;
		}
	}
	if(exit_y == player_y){
		exit_y += 1;
		if(exit_y > y){
			exit_y -= 1;
		}
	}
	shop_x = Math.floor(Math.random() * (x + 1));
	shop_y = Math.floor(Math.random() * (y + 1));
	if(shop_x == player_x || shop_x == exit_x){
		shop_x += 1;
		if(shop_x > x){
			shop_x -= 1;
		}
	}
	if(shop_y == player_y || shop_y == exit_y){
		shop_y += 1;
		if(shop_y > y){
			shop_y -= 1;
		}
	}
	floors += 1;
}

//Visualise the map (for the map check funtion)
function Draw_Map(){
	text = "";
	map[player_x][player_y] = "X";
    map[shop_x][shop_y] = "S";
    map[exit_x][exit_y] = "E";
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

//Create a small window to show the map 
function Show_Map(){
	Draw_Map();

	var modal = document.getElementById("myModal");
	var span = document.getElementsByClassName("close")[0];
		
	document.getElementById("Modal_Text").innerHTML = text;

	mapcheck.onclick = function() {
		modal.style.display = "block";
	}

	span.onclick = function() {
		modal.style.display = "none";
	}

	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}  
}

//movement related functions

//The actual movement function
function movement(direction){
	if(direction == "w"){
		map[player_x][player_y] = "_";
		player_y -= 1;
		map[player_x][player_y] = "X";
	}
	if(direction == "s"){
		map[player_x][player_y] = "_";
		player_y += 1;
		map[player_x][player_y] = "X";
	}
	if(direction == "a"){
		map[player_x][player_y] = "_";
		player_x -= 1;
		map[player_x][player_y] = "X";
	}
	if(direction == "d"){
		map[player_x][player_y] = "_";
		player_x += 1;
		map[player_x][player_y] = "X";
	}
	rng_1 = Math.floor(Math.random() * 10) + 1; //encounter
	if(rng_1 == 10){
		Narration.innerHTML = "Encounter time mother fucker!";
	}else{
		Narration.innerHTML = "As you walk through these halls, everything looks the same, you can barely tell where you are.";
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
