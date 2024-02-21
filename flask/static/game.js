// JavaScript for the game logic

let points = 0;

// Function to update points on the page
function updatePoints() {
  console.log("Updating points!")
  document.getElementById('points').textContent = points;
}

// Function to handle button click event
function handleClick() {
  points += 1; // Increase points by 1 on each click
  updatePoints(); // Update points on the page
}

// Event listener for button click
$( document ).ready(function() {
  $('#click-button').on('click', handleClick);
});