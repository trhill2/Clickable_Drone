
/***********************************************************************************
  ClickableAllocator
  by Scott Kildall
  
  Start your localhost before running this, otherwise no PNGs will display

  Shows an example of how to use allocation tables with the
  modified p5.clickable class. This uses a ClickableManager class to
  (1) allocate and set variables from a .csv file
  (2) draw all the clickables that are visible in a single function


***********************************************************************************/

// the manager class
var clickablesManager;

var droneImage;
var dronelightImage;
var move; 

// an array of clickable objects
var clickables;

// indexes into the array (constants)
const droneIndex = 0;
const leftIndex = 1;
const rightIndex = 2;
const lightIndex = 3;



// variables for the ballon
var ellipseDiameter = startEllipseDiameter;

// pop soun
var popSound;

// ALWAYS allocate the ClickableManager in the preload() function
// if you get an error here, it is likely the .csv file that is not the
// correct filename or path
function preload(){
  droneImage = loadImage('assets/drone.png');

  dronelightImage = loadImage('assets/dronelight.png');

  clickablesManager = new ClickableManager('assets/clickableLayout.csv');
}

// ALWAYS call the setup() funciton for ClickableManager in the setup(), after
// the class has been allocated in the preload() function.
function setup() {
  createCanvas(800,600);

  // load the pop sound
  soundFormats('mp3');
  popSound = loadSound('assets/drone.mp3');

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 
}


// Just draw the button
function draw() {
  background(173,228,231);

  // draw "drone"
  drawDrone();

  // draw the p5.clickables
  clickablesManager.draw();
}

function drawDrone() {
  drawDrone.image = droneImage;
}

// change individual fields of the clickables
function setupClickables() {
  clickables[leftIndex].visible = false;
  clickables[rightIndex].visible = false;
  // These are the CALLBACK functions. Right now, we do the SAME function for all of the clickables
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onPress = clickableButtonPressed;
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;
  }
}

//--- CLICKABLE CALLBACK FUNCTIONS ----

clickableButtonPressed = function () {
// PLAY SOUND WHEN MOVING
if(this.id === lightIndex ) {
  drawDrone.image = dronelightImage;
}
  else if( this.id === rightIndex ) {
    popSound.play();
    droneImage.x += 5;
  }
  else if( this.id === leftIndex ) {
    popSound.play();
    droneImage.x -= 5;
  }
}

// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#AA33AA";
  this.noTint = false;
  this.tint = "#FF0000";
}

// color a light gray if off
clickableButtonOnOutside = function () {
  // Change colors based on the id #
  if( this.id === leftIndex || this.id === rightIndex ) {
    this.color = "#FFFFFF";
  }
  else {
    this.color = "#AAAAAA";
  }

  this.noTint = true;
}