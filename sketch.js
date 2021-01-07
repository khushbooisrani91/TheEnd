/*var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cars, car1, car2, car3, car4;
var cImg1, cImg2, cImg3, cImg4;
var bImg, groundImg;

function preload(){
  cImg1 = loadImage("images/car1.png");
  cImg2 = loadImage("images/car2.png");
  cImg3 = loadImage("images/car3.png");
  cImg4 = loadImage("images/car4.png");
  bImg = loadImage("images/track.png");
  groundImg = loadImage("images/ground.png");
}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){

  background(groundImg);

  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}*/

var trex, trexImage, trexCollided;
var ground, groundImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score;
var invisibleGround;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstaclesGroup;
var cloudImg, cloudsGroup;
var gameOver, restart, gameOverImg, restartImg;

function preload() {
  trexImage = loadAnimation("images/trex1.png", "images/trex3.png", "images/trex4.png");
  trexCollided = loadImage("images/trex_collided.png");

  groundImage = loadImage("images/ground2.png");

  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle2.png");
  obstacle3 = loadImage("images/obstacle3.png");
  obstacle4 = loadImage("images/obstacle4.png");
  obstacle5 = loadImage("images/obstacle5.png");
  obstacle6 = loadImage("images/obstacle6.png");

  cloudImg = loadImage("images/cloud.png");
  
  gameOverImg = loadImage("images/gameOver.png");
  restartImg = loadImage("images/restart.png");

}


function setup() {
  createCanvas(800, 200);

  trex = createSprite(50, 180, 10, 10);
  trex.addAnimation("trexRunning", trexImage);
  trex.scale = 0.5;
  //trex.debug = true;
  trex.setCollider("circle",0,0,30);
  //trex.velocityX = 2;

  ground = createSprite(200, 180, 10, 10);
  ground.addImage("ground", groundImage);

  invisibleGround = createSprite(200, 185, 600, 10);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();
  obstaclesGroup.debugEach = true;
  cloudsGroup = new Group();

  gameState = PLAY;

  gameOver = createSprite(300, 80, 10, 10);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  restart = createSprite(300, 110, 10, 10);
  restart.addImage("restart",restartImg);
  restart.scale = 0.5;
  restart.visible = false;
  
  score = 0;

}

function draw() {
  background("white");

  trex.collide(invisibleGround);
  
  text("Score: "+ score, 20, 20);

  if (gameState === PLAY) {


    if (keyDown("space") && trex.y > 150) {
      trex.velocityY = -12;

    }
    trex.velocityY = trex.velocityY + 0.8;

    ground.velocityX = -4;
   // ground.velocityX = -(6 + 3*score/100);

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    
    score = score +  Math.round(World.frameRate/60);

    gameOver.visible = false;
    restart.visible = false;
    
    //spawn the clouds
    spawnClouds();

    //spawn obstacles
    spawnObstacles();

    //End the game when trex is touching the obstacle
    if (obstaclesGroup.isTouching(trex)) {
      gameState = END;
      //change the trex animation
    trex.addImage("trexCollided",trexCollided);

    }



  } //end of play if




 else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    
    trex.changeImage("trexCollided",trexCollided);
    
    
    
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }









  drawSprites();
}

function spawnObstacles() {

  if (frameCount % 100 === 0) {

    
    var obstacles = createSprite(810, 160, 10, 10);

    var num = Math.round(random(1, 6));

    switch (num) {
      case 1:
        obstacles.addImage(obstacle1);
        break;

      case 2:
        obstacles.addImage(obstacle2);
        break;

      case 3:
        obstacles.addImage(obstacle3);
        break;

      case 4:
        obstacles.addImage(obstacle4);
        break;

      case 5:
        obstacles.addImage(obstacle5);
        break;

      case 6:
        obstacles.addImage(obstacle6);
        break;

      default:
        break;
    }

    obstacles.scale = 0.5;
    obstacles.lifetime = 300;
    obstacles.velocityX = -4;
    obstaclesGroup.add(obstacles);

  }
}

function spawnClouds() {

  if (frameCount % 80 === 0) {

    var rand = Math.round(random(40, 80));

    var clouds = createSprite(810, rand, 50, 50);

    clouds.addImage(cloudImg);
    clouds.scale = 0.5;
    clouds.lifetime = 300;
    clouds.velocityX = -3;
    cloudsGroup.add(clouds);

    //adjust the depth
    clouds.depth = trex.depth;
    trex.depth = trex.depth + 1;


  }


}


function reset(){
  
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("trexRunning", trexImage);
  score = 0;
  score = score +  Math.round(World.frameRate/60);
  
}












