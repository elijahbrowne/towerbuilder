/* 
Header Comment: Delete this and write in this comment:
-Tower Builder
-The player will stack pieces on top of each other to build a tower. For every piece the player puts down the speed that the next piece moves is faster. Each piece has its own name and dimensions that make building the tower harder. Miss the build plate and GAME OVER!! 
*/

//preload any assets in this function, like images, sounds, etc.

//Global Variables
var gameStart = false
var wallGroup
var piecesGroup
var towerGroup
var lastpiece
var currentlvl= 1
var towerHeight= 0
var speed = 2.0
var boundup= 450
var boundary

//this is where you load images & sounds
function preload() {
  //images
  buildImage= loadImage("assets/pictures/build.png")
  goImage= loadImage("assets/pictures/go.png")
  bg= loadImage("assets/pictures/bg.png")
  gl= loadImage("assets/pictures/ghost_left.png")
  gr= loadImage("assets/pictures/ghost_right.png")
  //cloudsImage= loadImage("assets/pictures/clouds.gif")
  
  //sounds
  backgroundMusic = loadSound("assets/sounds/384963__ispeakwaves__upbeat-funky-loop-electronic.mp3")
}

function setup() {

  //grid in the background is by 200 and game size is 200. 
  //Multiply all cooridnates by 200.
  createCanvas(500,500)
  
  wallGroup = new Group()
  lastpiece = new Group()
  piecesGroup = new Group()
  towerGroup = new Group()


  leftwall = createSprite(0,0, 50, height*2)
  leftwall.setCollider('rectangle')
  leftwall.immovable= true
  leftwall.addToGroup(wallGroup)
  leftwall.visible= false

  topwall = createSprite(0,0, width * 2, 50)
  topwall.setCollider('rectangle')
  topwall.immovable= true
  topwall.addToGroup(wallGroup)
  topwall.visible= false

  rightwall = createSprite(500,0, 50, height *2)
  rightwall.setCollider('rectangle')
  rightwall.immovable= true
  rightwall.addToGroup(wallGroup)
  rightwall.visible= false

  buildwall = createSprite(width/2,490, 50, 50)
  buildwall.addImage(buildImage)
  buildwall.setCollider('rectangle')
  buildwall.scale = 0.09

  boundary = createSprite(0,boundup, width*2, 2)
  boundary.visible = true

  pieces = createSprite(width/2, 480, 40, 40);
  pieces.velocity.y = 3.0
  pieces.visible=true
  
}

//this function loops
function draw() {
  
  background(bg)
  if (gameStart == false) {
    textSize(20)
    text("Click to start",160, 250,200)
    if (mouseDown()) {
      gameStart = true
      backgroundMusic.play()
      backgroundMusic.loop = true
      backgroundMusic.volume = .5 
      
    }
  }
  else {
    //displays
    textSize(20)
    text("Current Level:" + currentlvl, 0, 30)
    text("Current speed:" + (speed), 0 , 50)
    text("Tower Height:" + towerHeight, 0, 70)
    

    //physics
    piecesGroup.bounce(wallGroup)
    towerGroup.bounce(wallGroup)
    piecesGroup.collide(buildwall, speedup)
    piecesGroup.collide(towerGroup, speedup)
    

    //win/lose function
    if(towerHeight== 10){
      text("you win", width/2, height/2, 200)
      removeAllSprites()
      noLoop()
    }else if(pieces.position.y>500){
      text("you lose ", width/2, height/2, 200)
      removeAllSprites()
      noLoop()
    }
    drawSprites() 
  }
}
  

function speedup (spriteA, spriteB){
  spriteA.velocity.y=0
  speed +=0.5
  towerHeight++
  spriteA.addToGroup(towerGroup)
  spriteA.addToGroup(lastpiece)
  piecesGroup.remove(spriteA)
  if (towerHeight % 3 == 0 && towerHeight > 0) {
    speed += 2
  }
}

function mousePressed(){
  if(mouseY < boundary.position.y+5){
    pieces = createSprite(width/2, height/2, random(20, 50), random(20, 50));
    pieces.velocity.x = speed;
    pieces.addToGroup(piecesGroup)
    pieces.position.x = mouseX;
    pieces.position.y = mouseY;
  }
  else{
    return false
  }
}

function keyPressed() {
  if (key == ' ') {
    pieces.velocity.x=0;
    pieces.addSpeed(2, 90);
  }//debug modes 
  else if (key == 'q'){
    towerHeight=9
  }else if (key == 'w'){
    text("Bound Height:" + boundup, 0, 90)
  }else if (key == '2'){
    towerHeight = 3
  }else if (key == '3'){
    towerHeight = 6
  }else if (key == '4'){
    towerHeight = 9
  }
}

