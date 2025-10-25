var p = {
  x: 50,
  y: 50,
  x_backtrack: 0,
  y_backtrack: 0,

  ox: 0,
  oy: 0,

  w: (blocksize * 3) / 4,
  h: (blocksize * 3) / 2,

  vx: 0,
  vy: 0,

  grav: blocksize / 60,

  timedustmax: 2000,
  timedustlevel: 200,
  leveltimedust: 200,
  collected: [],
  corruptlevel: 0,
  levelcorrupt: 0,

  jump: false,

  logs: [],
};

var m = {
  x: 0,
  y: 0,

  // width and height
  w: 0,
  h: 0,

  // velocity in x and y directions
  vx: 0,
  vy: 0,
};

var addon = 0;
var timer = 0;
var backtracking = false;
var update = function (maps, ind) {
  if (gameIsOver || pausing) {
    return;
  }
  if (p.corruptlevel >= 100) {
    gameIsOver = true;
  }
  //time dust bar
  fill(0);
  rect((width * 3) / 8 - 5, 20, width / 4 + 5, 30);
  rectMode(CORNER);
  fill(300 - p.timedustlevel * 1.3, p.timedustlevel * 0.3, 0);
  rect(width / 4 - 5, 7.5, (p.timedustlevel * width) / 4 / p.timedustmax, 25);
  fill(255);
  textSize(40);
  text(
    ((p.timedustlevel / p.timedustmax) * 100).toFixed(1),
    (width * 3) / 8,
    17.5
  );
  rectMode(CENTER);

  //corrupt level
  fill(0);
  rect((width * 5) / 8 + 5, 20, width / 4 + 5, 30);
  rectMode(CORNER);
  fill(188, 40, 40);
  rect(width / 2 + 5, 7.5, (p.corruptlevel * width) / 400, 25);
  fill(255);
  text(p.corruptlevel.toFixed(1), (width * 5) / 8, 17.5);
  rectMode(CENTER);

  // fill(0, 255, 0);
  // rect(p.x - addon, p.y, p.w, p.h);
  if (backtracking) tint(255, 127);
  if (p.vy != 0) {
    image(char_jump, p.x - addon, p.y, p.w, p.h);
  } else if (abs(p.vx) < 0.1) {
    image(char_stand, p.x - addon, p.y, p.w, p.h);
  } else if (p.vx > 0) {
    if (millis() % 100 < 10 && !backtracking && frameRate() > 30 && !delag)
      particles.push({
        x: p.x - addon,
        y: p.y + p.h / 2,
        w: random(3, 5),
        velx: random(-2, -1),
        vely: random(-2, -1),
        Color: color(242),
      });
    image(char_walkright, p.x - addon, p.y, p.w, p.h);
  } else {
    if (millis() % 100 < 10 && !backtracking && frameRate() > 30 && !delag)
      particles.push({
        x: p.x - addon,
        y: p.y + p.h / 2,
        w: random(3, 5),
        velx: random(-2, -1),
        vely: random(-2, -1),
        Color: color(242),
      });

    image(char_walkleft, p.x - addon, p.y, p.w, p.h);
  }
  Particle(particles);
  tint(255, 255);

  // fill(0);
  // rect(p.x - addon, p.y, p.w, p.h);
  // noFill();
  // strokeWeight(blocksize);
  // for (var i = 1; i < 29; i++) {
  //   stroke(0, i * 25);
  //   ellipse(p.x - addon, p.y, blocksize * 4 + blocksize * i * 2);
  // }
  // strokeWeight(1);
  // noStroke();

  timer += 1;
  if (backtracking && !next) {
    if (millis() % 100 < 40 && frameRate() > 30 && !delag)
      particles.push({
        x: p.x - addon,
        y: p.y,
        w: random(3, 5),
        velx: random(-2, 2),
        vely: random(-2, 2),
        Color: color(106, 153, 78),
      });

    if (p.x_backtrack == 0) {
      p.x_backtrack = p.x;
      p.y_backtrack = p.y;
    }
    image(char_jump, p.x_backtrack - addon, p.y_backtrack, p.w, p.h);
    if (timer >= 2 && p.logs.length > 0) {
      p.timedustlevel -= 1;
      p.x = p.logs[p.logs.length - 1].x;
      p.y = p.logs[p.logs.length - 1].y;
      p.vx = p.logs[p.logs.length - 1].vx;
      p.vy = p.logs[p.logs.length - 1].vy;
      addon = p.logs[p.logs.length - 1].addon;
      p.logs.pop();
      timer = 0;
    }
    if (p.logs.length == 0 || p.timedustlevel <= 0) {
      backtracking = false;
    }
    return;
  } else {
    p.x_backtrack = 0;
    p.y_backtrack = 0;
  }
  if (timer >= 2) {
    if (p.timedustlevel > 0.01) p.timedustlevel -= 0.01;
    else p.corruptlevel += 0.1;
    p.logs.push({
      x: p.x,
      y: p.y,
      vx: p.vx,
      vy: p.vy,
      addon: addon,
    });
    timer = 0;
  }

  if ((keys[38] || keys[87]) && p.jump) {
    p.vy = -blocksize * 0.35;
  }
  if (keys[37] || keys[65]) {
    p.vx += -blocksize * 0.03;
  }
  if (keys[39] || keys[68]) {
    p.vx += blocksize * 0.03;
  }

  p.vy += p.grav;
  p.vx *= 0.8;
  p.jump = false;

  p.x = constrain(
    p.x + p.vx,
    p.w / 2,
    maps[ind][0].length * blocksize - p.w / 2
  );
  if (
    width / 2 < p.x &&
    p.x < maps[ind][0].length * blocksize - width / 2 &&
    0 <= addon &&
    addon <= maps[ind][0].length * blocksize - width
  ) {
    addon += p.vx;
    adding = true;
  } else {
    adding = false;
    if (addon < 0) addon = 0;
    if (addon > maps[ind][0].length * blocksize - width)
      addon = maps[ind][0].length * blocksize - width;
  }
  collide(p.vx, 0);

  p.y += p.vy;
  collide(0, p.vy);

  if (p.y > height) {
    gameIsOver = true;
  }
};
