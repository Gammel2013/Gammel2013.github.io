// JavaScript for the game logic

let points = 0;
let generator1 = 0;
let generator1production = 1;
let generator1price = 10;

let msPerTick = 66;

const select = document.querySelector.bind(document);
const selectAll = document.querySelectorAll.bind(document);

// Function to update points on the page
function updatePoints() {
  select('#points').textContent = points.toFixed(2);
}

function updateGeneratorLabels() {
  select('#button_pointGen1_amount').textContent = '(' + generator1 + ')';
}

// Function to handle button click event
function pointClick() {
  points += 1; // Increase points by 1 on each click
}

function buyGenerator1() {
  if (points >= generator1price) {
    points -= generator1price;
    generator1price *= 1.2;
    generator1 += 1;
  }
  updateGeneratorLabels();
}

function handleTabClick() {
  var targetTabId = this.getAttribute('data-target');

  // Hide all tabs
  selectAll('.tab').forEach(function(el) {
    el.style.display = 'none';
  });
  // Show the target tab
  select('#' + targetTabId).style.display = '';
}

function gameLoop() {
  if (points >= generator1price) {
    select('#button_pointGen1').classList.add('buyableGenerator');
    select('#button_pointGen1').classList.remove('notBuyableGenerator');
  } else {
    select('#button_pointGen1').classList.remove('buyableGenerator');
    select('#button_pointGen1').classList.add('notBuyableGenerator');
  }

  points += generator1 * generator1production * msPerTick / 1000;
  updatePoints(); // Update points on the page
}

document.addEventListener('DOMContentLoaded', function() {
  // hide all tabs except the default one
  selectAll('.tab').forEach(function(el) {
    el.style.display = 'none';
  });
  select('.tab').style.display = '';

  // Event listener for button click
  select('#button_click').addEventListener('click', pointClick);
  select('#button_click_amount').style.display = 'none';

  select('#button_pointGen1').addEventListener('click', buyGenerator1);

  // Handle tab click
  selectAll('.tab-link').forEach(function(el) {
    el.addEventListener('click', handleTabClick);
  });
  //select('.tab-link').addEventListener('click', handleTabClick);

  setInterval(gameLoop, msPerTick);
});
// localStorage.setItem("save",JSON.stringify(g));