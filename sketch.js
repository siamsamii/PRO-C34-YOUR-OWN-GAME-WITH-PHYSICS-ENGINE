const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world, backgroundImg;
var canvas, angle, ground, monkey;
var darts = [];
var balloons = [], balloonimg;
var balloon
var score = 0;

function preload() {
  backgroundImg = loadImage("1084979.jpg");
  balloonimg = loadImage("balloon.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  monkey = new Monkey(180, 410, 130, 100, angle);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);
  textSize(20);
  fill(255);
  text("Score: " + score, 20, 30);
  Engine.update(engine);

  push();
  translate(ground.position.x, ground.position.y);
  fill("brown");
  rectMode(CENTER);
  rect(0, 0, width * 2, 1);
  pop();

  for (var i = 0; i < darts.length; i++) {
    showDarts(darts[i], i);
  }

  monkey.display();
  spawnBalloon();
  drawSprites(); 
}

function collide(body, sprite) {
  if (body != null) {
    var d = dist(
      body.position.x,
      body.position.y,
      sprite.position.x,
      sprite.position.y
    );
    if (d <= 80) {
    
      score += 15;

   
      darts.splice(0, 1);

      sprite.remove();

      return true;
    } else {
      return false;
    }
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var dart = new Dart(monkey.x, monkey.y);
    dart.trajectory = [];
    Matter.Body.setAngle(dart.body, dart.angle);
    darts.push(dart);
  }
}

function spawnBalloon() {
  if (frameCount % 60 === 0) {
    var balloon = createSprite(1200, Math.round(random(60, 200)), 40, 10);
    balloon.addImage(balloonimg);
    balloon.scale = 0.1;
    balloon.velocityX = -3;
    balloon.lifetime = 400;
    balloon.depth = monkey.depth - 1;

    balloons.push(balloon); 
  }
}
function showDarts(darts, index) {
  if (darts) {
    darts.display();
    darts.animate();
    if (darts.body.position.x >= width || darts.body.position.y >= height - 50) {
      if (!darts.isSink) {
   
        darts.remove(index);
      }
    } else {
   
      if (balloons.length > 0) {

        for (var j = 0; j < balloons.length; j++) {
          if (collide(darts.body, balloons[j])) {
        
            score += 15;

  
            darts.remove(index);

          
            balloons[j].remove();
            balloons.splice(j, 1);

            break; 
          }
        }
      }
    }
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    darts[darts.length - 1].shoot();
  }
}