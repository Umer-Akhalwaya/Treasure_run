var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

var fc;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
  // Moving background
  path=createSprite(width/2,200);
  path.addImage(pathImg);
  path.velocityY = 8;

  //creating boy running
  boy = createSprite(width/2,height - 20,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;
  boy.setCollider("circle",0,0,600);

  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);

  if (path.y > height){
    path.y = height/4;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection + 150;

      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection + 100;

      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState = END;
        swordGroup.destroyEach();
    }
  }

  if (gameState === END) {
    end = createSprite (width/2,200,10,10);
    end.addAnimation("over",endImg);
    boy.y = height/2;
    boy.x = width/2;

    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    swordGroup.destroyEach();
  
   

  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,width/2 - 50,30);
  
  }

}

function createCash() {
  if (World.frameCount % 160 == 0) {
  var cash = createSprite(Math.round(random(50, width - 50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 8;
  cash.lifetime = 150;
  cashG.add(cash);
  fc = Math.round(random(50,500))
  }
}

function createDiamonds() {
  if (World.frameCount % 270 == 0) {
  var diamonds = createSprite(Math.round(random(50, width - 50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 8;
  diamonds.lifetime = 120;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 190 == 0) {
  var jwellery = createSprite(Math.round(random(50, width - 50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 8;
  jwellery.lifetime = 120;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 130 === 0) {
  var sword = createSprite(Math.round(random(50, width - 50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 8;
  sword.lifetime = 120;
  swordGroup.add(sword);
  
  
  }
}