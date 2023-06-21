class Dart {
  constructor(x, y) {
    var options = {
      isStatic: true
    };
    this.r = 30;
    this.speed = 0.05;
    this.body = Bodies.circle(x, y, this.r, options);
    this.image = loadImage("good_dart-removebg-preview.png");
    this.animation = [this.image];
    this.trajectory = [];
    this.isSink = false;
    World.add(world, this.body);
  }

  animate() {
    this.speed += 0.05;
  }

  remove(index) {
      this.isSink = true;
      Matter.Body.setVelocity(this.body, { x: 0, y: 0 });
    
      this.speed = 0.05;
      this.r = 150;
      setTimeout(() => {
        Matter.World.remove(world, this.body);
        darts.splice(index, 1);
      }, 1000);
  }

  shoot() {
    var newAngle = monkey.angle - 28;
    newAngle = newAngle * (Math.PI / 180);
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(0.5);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, {
      x: velocity.x * (180 / Math.PI),
      y: velocity.y * (180 / Math.PI)
    });
  }

  display() {
    var angle = this.body.angle;
    var pos = this.body.position;
    var index = floor(this.speed % this.animation.length);

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.r, this.r);
    pop();

    if (this.body.velocity.x > 0 && pos.x > 10 && !this.isSink) {
      var position = [pos.x, pos.y];
      this.trajectory.push(position);
    }

    for (var i = 0; i < this.trajectory.length; i++) {
      image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5, 5);
    }
  }
}
