// JavaScript for the game logic

let points = 0;

let generator1 = {
  count: 0,
  production: 1,
  production_type: 'points',
  price: 10 
}

let msPerTick = 66;

const select = document.querySelector.bind(document);
const selectAll = document.querySelectorAll.bind(document);

// Function to update points on the page
function updatePoints() {
  select('#points').textContent = points.toFixed(2);
}

function updateGeneratorLabels() {
  select('#button_pointGen1_amount').textContent = generator1.count;
  select('#button_pointGen1_cost').textContent = generator1.price.toFixed(2);
}

// Function to handle button click event
function pointClick() {
  points += 1; // Increase points by 1 on each click
}

function buyGenerator1() {
  if (points >= generator1.price) {
    points -= generator1.price;
    generator1.price *= 1.2;
    generator1.count += 1;
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
  if (points >= generator1.price) {
    select('#button_pointGen1').classList.add('buyableGenerator');
    select('#button_pointGen1').classList.remove('notBuyableGenerator');
  } else {
    select('#button_pointGen1').classList.remove('buyableGenerator');
    select('#button_pointGen1').classList.add('notBuyableGenerator');
  }

  points += generator1.count * generator1.production * msPerTick / 1000;
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
  select('#button_click .button_amount').style.display = 'none';
  select('#button_click .button_cost').style.display = 'none';

  select('#button_pointGen1').addEventListener('click', buyGenerator1);

  // Handle tab click
  selectAll('.tab-link').forEach(function(el) {
    el.addEventListener('click', handleTabClick);
  });
  //select('.tab-link').addEventListener('click', handleTabClick);


  updateGeneratorLabels();
  updatePoints();
  setInterval(gameLoop, msPerTick);
});
// localStorage.setItem("save",JSON.stringify(g));