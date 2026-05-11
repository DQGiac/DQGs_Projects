function setup() {
  createCanvas(750, 600);
  textAlign(CENTER, CENTER);
  textFont("Consolas");
  rectMode(CENTER);
  noStroke();
  imageMode(CENTER);
  tran = -width * 6 / 5;
  trashType = [bag, bag1, bag2, cohe, cohe1, cohe2, sharbuck, sharbuck1, sharbuck2];
  trW = [52 * width / 500, 64 * width / 500, 64 * width / 500, 32 * width / 500, 64 * width / 500, 64 * width / 500, 34 * width / 500, 64 * width / 500, 64 * width / 500];
  trH = [64 * height / 400, 52 * height / 400, 52 * height / 400, 64 * height / 400, 32 * height / 400, 32 * height / 400, 64 * height / 400, 34 * height / 400, 34 * height / 400];
}

var scene = "menu";
var toScene = "";

var startnum = 600;
var trash = [];
var del = 0;
var num;
var budget = 0;
var over = [];

function preload() {
  cur = loadImage("assets/cursor.png");
  bag = loadImage("assets/bag.png");
  bag1 = loadImage("assets/bag1.png");
  bag2 = loadImage("assets/bag2.png");
  cohe = loadImage("assets/cohe.png");
  cohe1 = loadImage("assets/cohe1.png");
  cohe2 = loadImage("assets/cohe2.png");
  sharbuck = loadImage("assets/sharbuck.png");
  sharbuck1 = loadImage("assets/sharbuck1.png");
  sharbuck2 = loadImage("assets/sharbuck2.png");
}

var hover = (p1x, p1y, p2x, p2y) => {
  if (mouseX > p1x && mouseX < p2x && mouseY > p1y && mouseY < p2y) return true;
};

var trashType = [], trW = [], trH = [];

function addTrash(num) {
  let i = [];
  if (i.length == 0) i.push(trash.length);
  while (trash.length < i[0] + num) {
    trash.push({
      x: random(30 * width / 500, 310 * width / 500),
      y: random(100 * height / 400, 310 * height / 400),
      tp: floor(random(trashType.length)),
    });
  }
}

var clicked = false;
var Trash = function () {
  for (var i = trash.length - 1; i >= 0; i--) {
    let t = trash[i];
    image(trashType[t.tp], t.x, t.y);
    over[i] = hover(t.x - trW[t.tp] / 2, t.y - trH[t.tp] / 2, t.x + trW[t.tp] / 2, t.y + trH[t.tp] / 2);
  }
};

var doneTran = true; //Checks if Transit() is done
var tran;

var randomNum;
function transit() {
  rectMode(CENTER);

  noStroke();
  if (!doneTran) {
    tran += abs(tran) / 40 + 0.5;

    for (let i = 0; i < 6; i++) {
      fill(255 - i * 25, 255, 0);
      rect((i % 2 == 0 ? 1 : -1) * tran + width / 2, (i * 2 + 1) * height / 12, width * 1.2, height / 6 + 2);
      fill(255, 0, 0);
      textSize(30 * width / 500);
      text("    𝗪ᵒʳˡᵈʷᶦᵈᵉ        ", width / 2 + tran, 1 * height / 12);
      text("    𝗛ᵃᶻᵃʳᵈˡᵉˢˢ       ", width / 2 - tran, 3 * height / 12);
      text("    𝗔ⁿⁿᶦʰᶦˡᵃᵗᶦᵒⁿ ⁽ᵒᶠ⁾", width / 2 + tran, 5 * height / 12);
      text("    𝗟ᶦᵗᵗᵉʳ ⁽ᶠᵒʳ ᵗʰᵉ⁾ ", width / 2 - tran, 7 * height / 12);
      text("    𝗘ⁿᵛᶦʳᵒⁿᵐᵉⁿᵗ      ", width / 2 + tran, 9 * height / 12);
      text("   𝗜𝗻𝗰ᵒʳᵖᵒʳᵃᵗᵉᵈ      ", width / 2 - tran, 11 * height / 12);

    }
  }
  if (tran >= width * 1.3) {
    doneTran = true;
    tran = -width * 6 / 5;
    scene = toScene;
    toScene = "";
  }
}

var addT = [20, 40, 80, 200, 500];
var addTN = [
  "Buy a net",
  "Hire a kid",
  "Hire a worker",
  "Rent a truck",
  "Rent Ocean\nCleanup bot",
];

var addon = function (y, i) {
  stroke(0);
  fill(0, 40);
  if (budget >= addT[i] && trash.length > 0) {
    noFill();
    if (hover(width * 18 / 25, y - height * 3 / 40, width * 49 / 50, y + height * 3 / 40, true)) {
      noStroke();
      fill(255);
      rect(width * 31 / 50, y, width * 7 / 50, height * 7 / 80);
      fill(255);
      triangle(width * 0.69, y + height * 7 / 400, width * 0.71, y, width * 0.69, y - height * 7 / 400);
      fill(0);
      textSize(height * 3 / 80);
      text("Add " + round(addT[i] / 10), width * 0.62, y);

      noFill();
      stroke(0);
      if (mouseIsPressed) {
        del += addT[i] / 500;
        addTrash(addT[i]);
        num = trash.length;
        mouseIsPressed = false;
      }
    }
  }
  rect(width * 0.85, y, width * 0.26, height * 0.15);
  noStroke();
  textSize(height * 0.04);
  fill(255, 0, 0);
  text(addTN[i] + "\n(Need " + addT[i] + ")", width * 0.85, y);
};

var warn = false;
function warnPopup() {
  fill(255);
  rect(width / 2, 7 * height / 8, 2 * width / 5, height / 5, 5);
  triangle(width * 0.3, height * 15 / 16, width * 0.28, height * 73 / 80, width * 0.3, height * 71 / 80);
  fill(0);
  textSize(20);
  text("Quit?", width / 2, height * 33 / 40);
  button(width * 0.42, height * 0.9, width * 0.14, height * 3 / 40, "Yes", () => {
    startgame = true;
    diff = undefined;
  });
  button(width * 29 / 50, height * 0.9, 7 * width / 50, 3 * height / 40, "No", () => (warn = false));
}

var Inver = function (milisec) {
  milisec_ = (milisec % 60).toFixed(2);
  if (milisec_ < 10) milisec_ = "0" + milisec_;

  var min = floor(floor(milisec / 10) / 6);
  if (min < 10) min = "0" + min;
  return min + ":" + milisec_;
};

var done = false;
var mili = 0;
var Time,
  timearr = [];
var userName, Window;
function game() {
  budget = startnum - trash.length;
  background(240);
  fill(0, 120, 255);
  rect(width * 0.35, height * 5 / 8, width * 0.7, height * 6 / 8);
  Trash();
  for (var i = 0; i < trash.length; i++) {
    if (over[i] && mouseIsPressed) {
      trash.splice(i, 1);
      num = trash.length;
      mouseIsPressed = false;
    }
  }

  if (trash.length > 0) Time = (millis() - mili) / 1000;
  else if (timearr.length == 0) {
    timearr.push(mili);
    Time = (millis() - timearr[0]) / 1000;
  }
  textSize(height / 10);
  fill(255, 0, 0);
  text("Left:" + ceil(num), width / 5, height / 8);
  textSize(height * 3 / 80);
  text("Budget: " + budget, width * 29 / 50, height * 5 / 80);
  text("Trash/sec ≈" + round(del * 50), width * 29 / 50, height * 9 / 80);
  text("Time:" + Inver(Time), width * 29 / 50, height * 13 / 80);
  stroke(0);
  line(width * 0.7, 0, width * 0.7, height);
  noStroke();
  textSize(height / 16);
  text("Shop:", width * 0.86, height / 16);
  for (let i = 0; i < 5; i++) addon(height / 5 + i * height * 0.15, i);

  if (trash.length < startnum && !done) {
    addTrash(startnum);
    background(0, 120);
    fill(255, 0, 0);
    textSize(height / 8);
    text("loading trash...", width * 0.46, height / 2);
  } else {
    done = true;
    if (del != 0 && ceil(num) >= num && num > del) num -= del;
    if (num < del) num = 0;
    if (num > -1) trash.length = ceil(num);
  }

  button(width * 0.14, height * 73 / 80, width * 0.24, height * 7 / 80, "Q.U.I.T.", () => (warn = true));

  if (warn) warnPopup();

  if (trash.length == 0) {
    background(0, 120);
    fill(255, 0, 0);
    textSize(height / 8);
    text("You won!", width / 2, height * 0.35);
    textSize(height / 20);
    fill(0, 200, 0);
    text("Your time: " + Inver(Time) + "\nYour T/S: " + round(del * 50), width / 2, height / 2);
    noStroke();
    button(width / 2, height * 13 / 20, width * 0.28, height * 7 / 80, "A.G.A.I.N.", () => {
      startgame = true;
      diff = undefined;
    });
    button(width / 2, height * 0.8, width * 0.28, height * 7 / 80, "M.E.N.U.", () => {
      mouseReleased = function () {
        if (scene == "game" && hover(width * 0.36, height * 303 / 400, width * 0.64, height * 337 / 400)) toScene = "menu";
      };
    }, true);
  }
}

var startgame = true;
var diff;
function start() {
  background(220);
  fill(0);
  textSize(height / 20);
  text("Choose difficulty: " + (diff ? diff : ""), width / 2, height / 5);
  textSize(height * 0.04);
  text("(Mode-number of trash)\n(Lag warning for hard mode!)", width * 0.28, height * 0.9);

  if (diff) {
    fill(0);
    textSize(height / 20);
    text("Timer will start when you click go!", width / 2, height / 2);
    button(width / 2, height * 0.6, width * 0.45, height / 10, "GOOO!", () => {
      startgame = false;
      warn = false;
      trash = [];
      num = 0;
      done = false;
      del = 0;

      if (diff == "Easy") startnum = 500;
      else if (diff == "Medium") startnum = 1000;
      else if (diff == "Hard") startnum = 3000;
      num = startnum;
      mili = millis();
      mouseIsPressed = false;
    });
  } else text("(Please choose your difficulty before starting)", width / 2, height * 0.55);

  button(width * 9 / 50, height * 0.35, width * 0.3, height * 7 / 80, "Easy-500", () => (diff = "Easy"));
  button(width * 25 / 50, height * 0.35, width * 0.3, height * 7 / 80, "Med-1000", () => (diff = "Medium"));
  button(width * 41 / 50, height * 0.35, width * 0.3, height * 7 / 80, "Hard-3000", () => (diff = "Hard"));
  button(width * 21 / 25, height * 0.9, width * 0.26, height * 7 / 80, "B.A.C.K.", () => {
    toScene = "menu";
    diff = undefined;
    num = 0;
    mili = 0;
  }, true);
}

function movText(txt, x, y, s) {
  textSize(s);
  fill(255, 55, 55);
  text(txt, x, sin(millis() / 500) * height / 40 + y);
}

function button(x, y, w, h, txt, f, transtf) {
  let addY = 0;
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  fill(200, 0, 0);
  rect(x, y + h * 0.45, w, h / 3, height / 100);
  fill(235, 0, 0);
  if (hover(x - w / 2, y - h / 2, x + w / 2, y + h / 2)) {
    fill(255, 0, 0);
    if (mouseIsPressed) {
      addY = height / 150;
      if (transtf) doneTran = false;
      f();
    }
  }
  rect(x, y + addY, w, h, height / 80);
  textSize(h * 3 / 4 - txt.length / 2);
  fill(0);
  noStroke();
  text(txt, x, y + h / 25 + addY);
}

function draw_whale(x, y, text_size, moving, reverse_) {
  let t = [
    "        ░░  ░░                          ",
    "      ░░  ░░  ░░                        ",
    "          ░░                            ",
    "                                        ",
    "    ██████████████                      ",
    "  ██░░░░░░░░░░░░░░████                  ",
    "██░░░░░░░░░░░░░░░░░░░░██                ",
    "██░░░░░░░░░░░░░░░░░░░░░░██      ██  ██  ",
    "██░░░░░░░░░░░░░░░░░░░░░░██    ██░░██░░██",
    "██░░░░░░  ██░░░░░░░░░░░░██    ██░░░░░░██",
    "██░░░░░░████░░░░░░░░░░░░██    ██░░░░░░██",
    "██░░░░░░░░░░░░░░░░░░░░░░░░██    ██░░██  ",
    "██          ░░░░░░░░░░░░░░░░████░░░░██  ",
    "  ██        ██░░░░      ░░░░░░░░░░██    ",
    "    ████████████░░████████████████      ",
    "        ████    ████                    ",    
  ];
  
  textSize(text_size);
  for (let i = 0; i < t.length; i ++) {
    if (reverse_) t[i] = t[i].split("").reverse().join("");
    if (moving) movText(t[i], x, y + (i - t.length / 2) * text_size, text_size);
    else text(t[i], x, y + (i - t.length / 2) * text_size);
  }
}

function menu() {
  background(250);
  noStroke();
  movText("W.H.A.L.E.", width * 0.4, height * 7 / 40, height / 10);
  movText("inc.", width * 0.73, height * 73 / 400, height * 3 / 40);

  textSize(height / 20);
  fill(0);
  text("by DQG", width * 0.44, height * 0.32);
  draw_whale(width * 23 / 40, height * 0.32, height / 200, false, false);

  textSize(height / 26);
  text("V2.0.1", width * 47 / 50, height * 39/40)

  button(width / 2, height * 18 / 40, width * 0.44, height / 10, "P.L.A.Y.", () => {
    toScene = "game";
    startgame = true;
  }, true);
  button(width / 2, height * 25 / 40, width * 0.44, height / 10, "H.O.W.", () => (toScene = "how"), true);
  button(width / 2, height * 32 / 40, width * 0.44, height / 10, "A.B.O.U.T.", () => (toScene = "about"), true);
}

var clicked = false;
let test;
let a = 5;
function how() {
  frameRate(90);
  background(240);
  movText("H.O.W", width / 2, height / 10, height / 12.5);
  draw_whale(width / 3, height / 10, height / 200, true, true);
  draw_whale(width * 2 / 3, height / 10, height / 200, true, false);
  fill(0);
  textSize(height / 26);
  text(
    "This is trash. Click to erase 🡪\n" + (clicked ? "See? EZ :))" : ""),
    width * 9 / 25,
    height * 13 / 40
  );
  if (!clicked) {
    if (floor(millis() / 100) % 2 == 0)
      a = floor(random(trashType.length))
    image(trashType[a], width * 0.84, height * 0.3);
  }
  if (!clicked && hover(width * 0.84 - width * 0.06, height * 7 / 40, width * 0.84 + width * 0.06, height * 13 / 40) && mouseIsPressed) clicked = true;
  
  fill(0);
  text(
    "This is shop, clicking raise your Trash\nper sec (T/s) to clean trash faster 🡪",
    width * 0.36,
    height / 2
  );
  stroke(0);
  fill(0, 40);

  if (clicked) {
    noFill();
    if (hover(width * 0.72, height * 17 / 40, width * 0.98, height * 23 / 40)) {
      noStroke();
      fill(255);
      rect(width * 31 / 50, height / 2, width * 0.14, height / 10);
      fill(255);
      triangle(width * 0.69, height * 21 / 40, width * 0.71, height / 2, width * 0.69, height * 19 / 40);
      fill(0);
      textSize(height / 27);
      text("Add 69", width * 31 / 50, height / 2);
      stroke(0, 0, 255);
      fill(0, 0, 255);
      text("Name of item\n\n\n\n\nHow many trash\nit drops back", width * 0.85, height * 207 / 400);
      text("Add this\nto T/s", width * 0.62, height * 49 / 80);
      stroke(0);
      text("🡫\n\n\n🡩", width * 0.85, height / 2);
      text("🡩", width * 0.62, height * 0.55);

      noFill();
      stroke(0);
    }
  } else if (hover(width * 0.72, height * 17 / 40, width * 0.98, height * 23 / 40)) {
    fill(0);
    text("Click the trash\nto 'unlock' this", width * 0.85, height * 51 / 80);
    fill(0, 40);
  }

  rect(width * 0.85, height / 2, width * 0.26, height * 0.15);
  noStroke();
  textSize(height / 25);
  fill(255, 0, 0);
  text("Click this??\n(Need 420)", width * 0.85, height / 2);

  fill(0);
  text(
    "T/s decreases a certain number of trash every second.\nThe bigger the T/s, the faster it will clean your trash!",
    width / 2,
    height * 0.75
  );
  fill(0, 0, 255);
  textSize(height / 16);
  text("GOOD LUCK! :)", width * 0.24, height * 37 / 40);
}

function about() {
  background(240);
  movText("A.B.O.U.T", width / 2, height / 10, height / 12.5);
  draw_whale(width / 4, height / 10, height / 200, true, true);
  draw_whale(width * 3 / 4, height / 10, height / 200, true, false);

  fill(0);
  textSize(height / 22);
  text(
    "W.H.A.L.E. inc. is an organization whose\ngoal is to remove trash out of the ocean to\nsave all of marine lives from extinction.\n\nThe name is an acronym for:",
    width / 2,
    height * 0.35
  );
  textAlign(LEFT);
  text(
    "𝗪orldwide\n𝗛azardless\n𝗔nnihilation (of)\n𝗟itter (for the)\n𝗘nvironment\n𝗜𝗻𝗰orporated",
    width / 10,
    height * 27 / 40
  );
  textAlign(CENTER);
  textSize(height / 25);
  fill(255, 0, 0);
  text(
    "What does it mean??\nWell I have no idea :L\nDid it I spent an whole\nday figuring out the name?\nDefinitely not :D",
    width * 38 / 50,
    height * 27 / 40
  );
  fill(0);
  textSize(height / 26);
  text("Made in a week (12 hours total)\nfor #Seajam and #Teamseas!", width * 0.28, height * 0.95);
}

function draw() {
  noSmooth()
  noCursor();
  if (scene == "menu") menu();
  else if (scene == "game") {
    if (startgame) start();
    else game();
  } else if (scene == "how" || scene == "about") {
    if (scene == "about") about();
    else how();
    button(width * 0.84, height * 37 / 40, width * 0.26, height * 3 / 40, "M.E.N.U.", () => (toScene = "menu"), true);
  }

  transit();
  if (tran > 0) scene = toScene;

  image(cur, mouseX + 16, mouseY + 7);
}