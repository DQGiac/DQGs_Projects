var bossindex = -1;
var bossmaps = [
  [
    "                                        ", //0
    "                                        ", //1
    "                                        ", //2
    "                                        ", //3
    "                                        ", //4
    "                                        ", //5
    "                                        ", //6
    "                                        ", //7
    "                                        ", //8
    "                                        ", //9
    "                                        ", //10
    "                                        ", //11
    "d                                      d", //12
    "                                        ", //13
    "                                        ", //14
    "                                        ", //15
    "                                        ", //16
    "                                        ", //17
    "     b       s      p     s             ", //18
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww", //19
  ],
  [
    "                                        ", //0
    "                                        ", //1
    "                                        ", //2
    "                                        ", //3
    "                                        ", //4
    "                                        ", //5
    "                                        ", //6
    "                                        ", //7
    "                                        ", //8
    "                                        ", //9
    "                                        ", //10
    "                                        ", //11
    "d                                      d", //12
    "                                        ", //13
    "                                        ", //14
    "ww                                    ww", //15
    "                                        ", //16
    "                                        ", //17
    "     n       s            s             ", //18
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww", //19
  ],
];

var Boss = {
  // for the boss, i need to do come up with some special abilities for him.
  // also, i need to add a level where the user can pick up a sword or some kind of weapon to deal with this mofo.

  //boss's special abilities:
  //  the stomp - landing on player = death --> get away from there, lures him into the spikes.
  //  spawns spikes - (combine with swing) --> jump on top of the blocks.
  //  the swing - sword (grows after every few times) swinging - hits player = death --> hides under the blocks
  x: 600,
  y: -100,
  vx: 0,
  vy: 2,
  w: blocksize * 3,
  h: blocksize * 5,
  grav: p.grav / 4,
  timer: 0,

  depletes: 0,
  health: 100,

  currentattack: -1,
  stomping: false,
  stomptimer: 0,
  locked: false,
  locked_x: 0,
  locked_y: 0,
};

function bossfight() {
  updateBoss();

  if (bossindex == -1) {
    bossindex = 0;
    fillLevel(bossmaps, bossindex);
  }
  for (var i in level) {
    blockG(level[i].x - addon, level[i].y, level[i].l);
  }

  update(bossmaps, bossindex);
}

function stomp() {
  if (!Boss.locked) {
    if (Boss.y > 200) return;
    else {
      Boss.y = 200;
      Boss.vy = 0;
    }
    Boss.vx = (p.x - Boss.x) / 40;
    if (round(abs(Boss.x - p.x), 1) < 2 && p.vx < 0.02) {
      Boss.locked = true;
      Boss.vx = 0;
      Boss.locked_x = p.x;
      Boss.locked_y = p.y;
    }
    return;
  } else {
    stroke(0, 255, 0);
    noFill();
    ellipse(Boss.locked_x - addon, Boss.locked_y, blocksize * 1.5);
    noStroke();
    fill(0, 255, 0);
    text("LOCKED", Boss.locked_x - addon, Boss.locked_y - blocksize * 1.5);
    Boss.stomptimer += 1;
    if (Boss.stomptimer > 100) {
      Boss.x = Boss.locked_x;
      Boss.stomping = true;
    } else {
      if (Boss.x >= Boss.locked_x + 3) Boss.x -= 6;
      Boss.x += 1;
      return;
    }
  }

  //stomp
  if (Boss.stomping == true && Boss.y + Boss.h / 2 < height - blocksize) {
    Boss.vy += Boss.grav;
    if (Boss.y + Boss.h / 2 >= height - (blocksize * 3) / 2 - 1) {
      if (
        (Boss.x - Boss.w / 2 > 300 && Boss.x + Boss.w / 2 < 510) ||
        (Boss.x - Boss.w / 2 > 690 && Boss.x + Boss.w / 2 < 900)
      )
        Boss.depletes = 10;
    }

    if (
      Boss.x > 0 &&
      Boss.x - Boss.w / 2 < blocksize * 2 &&
      Boss.y + Boss.h / 2 >= height - blocksize * 5 - 1 &&
      bossindex == 1
    ) {
      print("lol");
      Boss.vy = -3;
      Boss.stomping = false;
      Boss.locked = false;
      Boss.stomptimer = 0;
      screenshake(20, 5);
    }
    if (colliding(p, Boss)) gameIsOver = true;
  } else {
    Boss.stomping = false;
    Boss.locked = false;
    Boss.stomptimer = 0;
    screenshake(20, 5);
    if (Boss.health <= 100) {
      Boss.currentattack = -1;
      Boss.vy = 0;
      Boss.y = height - blocksize - Boss.h / 2;
      return;
    }
    Boss.vy = -3;
  }
}

function spike() {
  if (Boss.x > 598 || Boss.x < 602) {
    Boss.vx = (600 - Boss.x) / 40;
    return;
  } else {
    Boss.x = 600;
    Boss.vx = 0;
  }
}

function swing() {
  return;
}

function updateBoss() {
  print(Boss.currentattack);
  if (Boss.health <= 100) {
    if (Boss.currentattack == 1) spike();
    if (Boss.currentattack == 2) swing();
  }
  if (Boss.currentattack == 0) stomp();

  if (Boss.depletes > 0.2 && !Boss.stomping) {
    Boss.health -= 0.2;
    Boss.depletes -= 0.2;
  }
  Boss.y += Boss.vy;
  Boss.x += Boss.vx;
  fill(0);
  rect(Boss.x - addon, Boss.y, Boss.w, Boss.h);
  // print(Boss);

  if (Boss.currentattack == -1) {
    if (Boss.health == 100) {
      if (198 < Boss.y && Boss.y < 202) {
        Boss.vy = 0;
        Boss.y = 200;
        Boss.timer += 1;
      } else return;
      // do some dialogue?
      if (Boss.timer > 20) {
        Boss.currentattack = 0;
        Boss.timer = 0;
      }
    } else if (Boss.health > 20) {
      print(Boss.timer)
      Boss.timer += 1;
      if (Boss.timer > 50) {
        if (Boss.x < 598 || Boss.x > 602) {
          Boss.vx = (600 - Boss.x) / 40;
          Boss.timer = 0
          return;
        } else {
          Boss.x = 600;
          Boss.vx = 0;
        }
        if (Boss.timer > 100) {
          Boss.currentattack = 1;
          Boss.timer = 0;
        }
      } else return;
    }
  }
  // health bar
  rect(width / 2, 50, width / 2 + 10, 40);
  rectMode(CORNER);
  fill(300 - Boss.health * 2.55, Boss.health * 3, 0);
  rect(width / 4, 35, (Boss.health * width) / 200, 30);
  rectMode(CENTER);
  fill(255);
  text(Boss.health.toFixed(1), width / 2, 50);
}
