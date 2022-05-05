var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  ghost = createSprite(200,300);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.45;
  spookySound.loop();
  ghost.debug = true;
  ghost.setCollider("rectangle",0,0,ghost.width-40,ghost.height,0)
}

function draw() {
  background(200);
  if(gameState === "play"){
    spawnDoors();
    ghost.velocityY = ghost.velocityY + 0.8;
    if(keyDown("up")){
      ghost.velocityY = -12;
    }
    if(keyDown("left")){
      ghost.x = ghost.x - 5;
    }
    if(keyDown("right")){
      ghost.x = ghost.x + 5;
    }
    ghost.collide(climbersGroup);
    if(ghost.isTouching(invisibleBlockGroup) || ghost.y > 600 ||ghost.y < 0|| ghost.x>600||ghost.x<0){
      gameState = "end";
    }
  if(tower.y > 400){
      tower.y = 300;
    }
    drawSprites();
  }
  if(gameState === "end"){
    textSize(50);
    fill("red");
    stroke("red");
    text("GAME OVER",150,300);
  }
}
function spawnDoors(){
  if(frameCount%240===0){
  door = createSprite(random(120,400),-50);
  door.addImage("door",doorImg);
  door.velocityY = 1;
  doorsGroup.add(door);
  climber = createSprite(door.x, 10);
  climber.addImage("climber",climberImg);
  climber.velocityY = 1;
  climbersGroup.add(climber);
  invisibleBlock = createSprite(door.x, 20);
  invisibleBlock.width = climber.width;
  invisibleBlock.height = 3;
  invisibleBlock.velocityY = 1;
  invisibleBlock.visible = false;
  invisibleBlockGroup.add(invisibleBlock);
  ghost.depth = door.depth + climber.depth;
  }
}