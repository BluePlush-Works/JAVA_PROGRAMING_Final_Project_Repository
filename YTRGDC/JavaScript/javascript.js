let x = 1; let y = 1; let player_x = 0; let player_y = 0;
const map = Array.from({ length: 99 }, () => Array(99).fill("   "));
let text = "";

function Create_Map() {
  x = Math.floor(Math.random() * 16);
  y = Math.floor(Math.random() * 16);
  if(x == 0){
	x = 1;
  }
  if(y == 0){
	y = 1;
  }
  for(let i = 0; i <= x; i++){
	for(let o = 0; o <= y; o++){
		map[i][o] = " ";
	}
  }
  map[0][0] = "X";
  player_x = 0;
  player_y = 0;
}

Create_Map();

function Draw_Map(){
	map[player_x][player_y] = "z";
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

function Show_Map(){
	text = "";
    Draw_Map();
    document.getElementById("Modal_Text").innerHTML = text;
    
    // Get the modal
	var modal = document.getElementById("myModal");

	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks the button, open the modal 
	btn.onclick = function() {
	  modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	  modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	  if (event.target == modal) {
		modal.style.display = "none";
	  }
	}  
}
