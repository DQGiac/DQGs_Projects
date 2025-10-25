function setup() {
  createCanvas(800, 800);
  textFont(font);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  noStroke();
  imageMode(CENTER);
}

var delag = false;
var scene = "menu";
var blocksize = 40;
var next = false;
var restarting = false;

var pausing = false;
function paused() {
  background(255, 200);
  textSize(80);
  fill(0);
  text("PAUSING...", width / 2 + 2, 152);
  fill(255, 0, 0);
  text("PAUSING...", width / 2, 150);
  button(
    width / 2,
    270,
    blocksize * 10,
    blocksize,
    "RESUME",
    () => (pausing = false),
    false,
    0
  );
  button(
    width / 2,
    350,
    blocksize * 10,
    blocksize,
    "RESTART",
    () => {
      restarting = true;
      pausing = false;
    },
    false,
    1
  );
  buttonscene(
    width / 2,
    430,
    blocksize * 10,
    blocksize,
    "MENU",
    "menu",
    () => {
      restarting = true;
      pausing = false;
    },
    2
  );
}

var transition = false;
var levelalpha = 0;
var backgroundalpha = 0;
var loaded = false;
function draw() {
  cursor(AUTO);
  background(113, 207, 132);
  if (scene == "menu") menu();
  else if (scene == "story") story();
  else {
    if (scene == "game") {
      game();
      fill(0);
      textAlign(RIGHT);
      textSize(20);
      text("Framerate: " + frameRate().toFixed(0), width - 10, 10);
      textAlign(CENTER, CENTER);
    } else if (scene == "boss") {
      bossfight();
    } else if (scene == "tuto") {
      tuto();
    }

    if (restarting) {
      endAl = 0;
      addon = 0;
      if (scene == "game") {
        levelindex = actuallevel;
        fillLevel(levelmaps, levelindex);
        p.timedustlevel = p.leveltimedust;
        p.corruptlevel = p.levelcorrupt;
        p.collected = [];
      } else if (scene == "boss") {
        bossindex = 0;
        fillLevel(bossmaps, bossindex);
      } else if (scene == "tuto") {
        tutoindex = 0;
        fillLevel(tutomaps, tutoindex);
      }
      p.logs = [];
      p.vx = 0;
      p.vy = 0;
      gameIsOver = false;
      restarting = false;
    }

    if (next) {
      if (levelalpha < 255) {
        levelalpha += 5;
      } else if (levelalpha == 255) {
        next = false;
        addon = 0;
        p.logs = [];
        p.vx = 0;
        p.vy = 0;
        if (scene == "game") {
          levelindex++;
          actuallevel = levelindex;
          fillLevel(levelmaps, levelindex);
          p.leveltimedust = p.timedustlevel;
          p.levelcorrupt = p.corruptlevel;
          p.collected = [];
        } else if (scene == "tuto") {
          tutorialindex++;
          actuallevel = levelindex;
          fillLevel(tutorialmaps, tutorialindex);
        }
      }
    }
    if (levelalpha > 0 && next == false) levelalpha -= 5;

    if (gameIsOver) gameOver();
    else {
      if (keys[82]) {
        level = [];
        if (scene == "game") restarting = true;
        else if (scene == "tuto") restarting = true;
      } else if (keys[32] && p.timedustlevel > 0 && !next) {
        backtracking = !backtracking;
        particles = []
        keys[32] = false;
      }
    }

    if (pausing) paused();
  }

  /**    BUTTON ANIMATION    **/
  for (var i in addtf) {
    if (addtf[i]) {
      if (add[i] < 4) add[i] += 0.3;
    } else if (add[i] > 0) add[i] -= 0.6;
  }

  /**    PAUSE    **/
  if (keys[80] && scene != "menu" && !gameIsOver) {
    pausing = !pausing;
    keys[80] = false;
  }

  /** Background alpha **/
  background(0, backgroundalpha);
  if (transition) {
    if (backgroundalpha < 255) backgroundalpha += 15;
    else if (backgroundalpha == 255) {
      transition = false;
    }
  } else if (backgroundalpha > 0) backgroundalpha -= 15;
  if (nextscene != "" && backgroundalpha == 255) scene = nextscene;
  background(255, levelalpha);
}
