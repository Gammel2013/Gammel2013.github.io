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

function handleTabClick() {
  var targetTabId = $(this).data('target');

  // Hide all tabs
  $('.tab').hide();

  // Show the target tab
  $('#' + targetTabId).show();
}


$( document ).ready(function() {
  $('.tab').not(':first').hide();

  // Event listener for button click
  $('#click-button').on('click', handleClick);

  // Handle tab click
  $('.tab-link').on('click', handleTabClick);
});