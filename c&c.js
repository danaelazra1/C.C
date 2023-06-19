var playerName = "";
var Email = "";

function Login(){
    playerName = prompt("Enter your name:");
    if (playerName.trim() === "") {
        alert("Please enter your name");
        return;
      }
    Email = prompt("Enter your Email: ");
    if (Email.trim() === "") {
        alert("Please enter your Email:");
        return;
      }
    
    }