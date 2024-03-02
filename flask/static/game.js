// JavaScript for the game logic

let points = 0;

let last_tick = performance.now();
let elapsed_ms_this_tick = 0;


function PGenerator(name, production, production_type, price, scaling) {
  this.count = 0;
  this.name = name;
  this.production = production;
  this.production_type = production_type;
  this.price = price;
  this.scaling = scaling;
}

const generatorList = [
  new PGenerator(
    'pointGen1',
    1,
    'points',
    10,
    1.2
  ),
  new PGenerator(
    'pointGen2',
    1,
    'pointGen1',
    500,
    1.5
  ),
]

const msPerTick = 66;

//Helper functions
const select = document.querySelector.bind(document);
const selectAll = document.querySelectorAll.bind(document);

function getGenerator(target_name) {
  return generatorList.find(item => item.name === target_name);
}

function init_window(){
  // hide all tabs except the default one
  selectAll('.tab').forEach(function(el) {
    el.style.display = 'none';
  });
  select('.tab').style.display = '';

  // setup event listeners
  // Event listener for button click
  select('#button_click').addEventListener('click', pointClick);

  for (let generator of generatorList) {
    id = '#button_' + generator.name;
    let el = select(id);
    el.addEventListener('click', buyGenerator);
  }

  // Handle tab click
  selectAll('.tab-link').forEach(function(el) {
    el.addEventListener('click', handleTabClick);
  });

  // Misc stuff
  updateGeneratorLabels();
  updatePoints();
}

// Functions for updating labels
function updatePoints() {
  select('#points').textContent = points.toFixed(2);
}

function updateGeneratorLabels() {
  for (let generator of generatorList) {
    id = '#button_' + generator.name;
    select(id + '_amount').textContent = Math.trunc(generator.count);
    select(id + '_cost').textContent = generator.price.toFixed(2);
  }
}

// Functions for handling clicks
function pointClick() {
  points += 1; // Increase points by 1 on each click
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

// Functions for the actual game logic
function buyGenerator(event) {
  // get matching generator from button attributes
  let target_name = event.currentTarget.getAttribute('data-name');
  let target_generator = getGenerator(target_name);
  
  if (points >= target_generator.price) {
    points -= target_generator.price;
    target_generator.price *= target_generator.scaling;
    target_generator.count += 1;
  }
  updateGeneratorLabels();
}

function productionTick() {
  for (let generator of generatorList) {
    let production_this_tick = generator.count * generator.production * elapsed_ms_this_tick / 1000;

    if (generator.production_type === 'points') {
      points += production_this_tick;
    } else if (generator.production_type.startsWith('pointGen')) {
      let target_gen = getGenerator(generator.production_type);
      target_gen.count += production_this_tick;
    }
  }
}

function gameLoop() {
  let start_of_tick = performance.now();
  elapsed_ms_this_tick = start_of_tick - last_tick;
  last_tick = start_of_tick
  // update buttons for styling
  for (let generator of generatorList) {
    id = '#button_' + generator.name;
    let el = select(id);
    if (points >= generator.price) {
      el.classList.add('buyableGenerator');
      el.classList.remove('notBuyableGenerator');
    } else {
      el.classList.remove('buyableGenerator');
      el.classList.add('notBuyableGenerator');
    }
  }

  productionTick();

  updatePoints(); // Update points on the page
  updateGeneratorLabels();

  let end_of_tick = performance.now();
  select('#elapsed_tick_time').textContent = end_of_tick - start_of_tick;
}

// Logic when the game is loaded
document.addEventListener('DOMContentLoaded', function() {
  init_window();
  setInterval(gameLoop, msPerTick);
});
// localStorage.setItem("save",JSON.stringify(g));