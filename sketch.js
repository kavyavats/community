var monkey,scene,monkey_anim,scene_img,invisibleGround,rock,rock_img,banana_img,monkey_str;

var obstacleGroup;
var bananaGroup;
var score=0;

var gameState="play";
var gameState="end";
var gameState="start";
function preload() {
  
monkey_anim=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
scene_img=loadImage("jungle.jpg");
rock_img=loadImage("stone.png");
banana_img=loadImage("Banana.png");
monkey_str=loadAnimation("Monkey_01.png");
  
}

function setup() {
  createCanvas(400,400);

  scene=createSprite(200,150,400,200);
  scene.addImage("hi",scene_img);
    
  
  monkey=createSprite(30,height-60,10,10);
  monkey.addAnimation("hello",monkey_anim);
  monkey.scale=0.1;
  monkey.setCollider("circle",0,0,200);
  obstacleGroup=new Group();
  bananaGroup=new Group();
  
  
  invisibleGround=createSprite(200,375,400,10);
  invisibleGround.visible=false;

}

function draw() {
  background("white");
  edges=createEdgeSprites();
  
  textSize(20)
  stroke("white");
  fill("white");

  
  if( keyDown("S")&&gameState=="start"){

    monkey.addAnimation("hello",monkey_anim);
    obstacleGroup.destroyEach();
    bananaGroup.destroyEach();
    score=0;
    gameState="play";

  }
  
if(gameState=="play"){
  
  if(monkey.collide(invisibleGround) && keyDown("space")){
    monkey.velocityY=-15;
  }
  
  scene.velocityX=-4;
  
  if(scene.x<0){
   scene.x=200;
  }
  
  if(bananaGroup.isTouching(monkey)){
    score=score+1;
    bananaGroup.destroyEach();
  }
    
  monkey.velocityY=monkey.velocityY+0.8;
  
  switch(score){
    case 10: monkey.scale=0.12;
      break
      
    case 20: monkey.scale=0.14;
      break
      
    case 30: monkey.scale=0.16;
      break
      
    default: break;
  }
  
      if(obstacleGroup.isTouching(monkey)){
    gameState="end";
    }
  
  banana();
  stone();
 
}

  if(gameState=="end"){
     monkey.addAnimation("hello",monkey_anim); 
     monkey.velocityY=0;
     scene.velocityX=0;
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
     obstacleGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
  }
  
  
  if(keyWentDown("R")&& gameState=="end"){
      gameState="start";
      monkey.addAnimation("hello",monkey_anim);
  }

  
  drawSprites();
  
  if(gameState=="start"){
    text("press S to start",130,190);
    text("be careful of the obstacles!!!!!!!",80,130)
    text("press space key to jump",100,250)
    scene.velocityX=0;
    monkey.addAnimation("hello",monkey_str)
  }
  
    if(gameState=="end"){
    text("press R to  restart",130,190);
  }
    
  text("score:"+score,300,60)
 
}     



function stone(){
  if(frameCount%300==0){
    rock=createSprite(width,375,100,100);
    rock.velocityX=-3;
    rock.scale=0.3;
    rock.addImage(rock_img);
    rock.scale=0.1;
    rock.lifetime=200;
    obstacleGroup.add(rock);
    
  }
}

function banana(){
  
  if(frameCount%150==0){
    fruit=createSprite(400,random(200,250),100,100);
    fruit.velocityX=-3;
    fruit.addImage(banana_img);
    fruit.scale=0.030;
    fruit.lifetime=200;
    bananaGroup.add(fruit);
    
  }
}
