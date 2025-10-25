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

  if (endAl < width / 2) endAl += abs(endAl - width / 2) / 15 + 0.1;
  textSize(80);
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
      menubutton = 0;
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

function game() {
  rectMode(CENTER);
  if (levelindex == -1) {
    p.timedustmax = 2000;
    p.timedustlevel = 200;
    p.leveltimedust = 200;
    p.collected = [];
    p.corruptlevel = 0;
    p.levelcorrupt = 0;
    p.logs = [];
    levelindex = 0;
    fillLevel(levelmaps, levelindex);
  }
  for (var i in level) {
    blockG(level[i].x - addon, level[i].y, level[i].l);
  }
  update(levelmaps, levelindex);
}
