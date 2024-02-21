// JavaScript for the game logic

let points = 0;

// Function to update points on the page
function updatePoints() {
  document.getElementById('points').textContent = points;
}

// Function to handle button click event
function handleClick() {
  points += 1; // Increase points by 1 on each click
  updatePoints(); // Update points on the page
}

// Event listener for button click
document.getElementById('click-button').addEventListener('click', handleClick);