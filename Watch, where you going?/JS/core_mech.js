var endAl = 0;
var gameIsOver = false;
function gameOver() {
  if (particles.length < 50 && frameRate() > 30 && !delag) {
    particles.push({
      x: p.x - addon,
      y: p.y,
      w: random(6, 10),
      // h: random(3, 6),
      velx: random(-2, 2),
      vely: random(-2, 2),
      // angle: random(-90, -270),
      Color: color(0),
    });
  }
  Particle(particles);
  
  if (delag) endAl = width / 2;
  else if (endAl < width / 2) endAl += abs(endAl - width / 2) / 15 + 0.1;
  
  textSize(60);
  fill(0);
  text("GAME OVER.", width / 2 + 2, 152);
  fill(255, 0, 0);
  text("GAME OVER.", width / 2, 150);
  buttonscene(
    width - endAl,
    350,
    blocksize * 10,
    blocksize,
    "MENU",
    "menu",
    () => {
      restarting = true;
      if (delag) menubutton = width / 2;
      else menubutton = 0;
      endAl = 0;
    },
    0
  );
  button(
    endAl,
    430,
    blocksize * 10,
    blocksize,
    "RESTART",
    () => {
      restarting = true;
      particles = [];
    },
    false,
    1
  );
}

var screenshaketime = 0;
var shaking = true;
function screenshake(time, magnitude) {
  if (shaking && screenshaketime < time) {
    screenshaketime += 1;
    translate(random(-magnitude, magnitude), random(-magnitude, magnitude));
  } else {
    screenshaketime = 0;
    shaking = false;
    translate(0, 0);
  }
}
