// JavaScript for the game logic

const resources = {
  points: 0,
}

let lastTick = performance.now();
let elapsedMsEachTick = 0;


function PGenerator(name, production, productionType, price, scaling) {
  this.count = 0;
  this.name = name;
  this.production = production;
  this.productionType = productionType;
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
  updateVisuals();
}

// Functions for updating labels
function updateVisuals() {
  // Update points
  select('#points').textContent = resources.points.toFixed(2);

  // Update generator labels
  for (let generator of generatorList) {
    id = '#button_' + generator.name;
    select(id + '_amount').textContent = Math.trunc(generator.count);
    select(id + '_cost').textContent = generator.price.toFixed(2);
  }

  // Update buttons for styling
  for (let generator of generatorList) {
    id = '#button_' + generator.name;
    let el = select(id);
    if (resources.points >= generator.price) {
      el.classList.add('buyableGenerator');
      el.classList.remove('notBuyableGenerator');
    } else {
      el.classList.remove('buyableGenerator');
      el.classList.add('notBuyableGenerator');
    }
  }
}

// Functions for handling clicks
function pointClick() {
  resources.points += 1; // Increase points by 1 on each click
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
  let targetGenerator = getGenerator(target_name);
  
  if (resources.points >= targetGenerator.price) {
    resources.points -= targetGenerator.price;
    targetGenerator.price *= targetGenerator.scaling;
    targetGenerator.count += 1;
  }
}

function productionTick() {
  for (let generator of generatorList) {
    let productionThisTick = generator.count * generator.production * elapsedMsEachTick / 1000;

    if (generator.productionType === 'points') {
      resources.points += productionThisTick;
    } else if (generator.productionType.startsWith('pointGen')) {
      let targetGen = getGenerator(generator.productionType);
      targetGen.count += productionThisTick;
    }
  }
}

function gameLoop() {
  let startOfTick = performance.now();
  elapsedMsEachTick = startOfTick - lastTick;
  lastTick = startOfTick;

  productionTick();

  updateVisuals(); // Update points on the page

  let endOfTick = performance.now();
  select('#elapsed_tick_time').textContent = endOfTick - startOfTick;
}

// Logic when the game is loaded
document.addEventListener('DOMContentLoaded', function() {
  init_window();
  setInterval(gameLoop, msPerTick);
});
// localStorage.setItem("save",JSON.stringify(g));