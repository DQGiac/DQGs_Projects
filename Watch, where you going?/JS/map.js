var colliding = function (a, b) {
  return (
    a.x + a.w / 2 > b.x - b.w / 2 &&
    a.x - a.w / 2 < b.x + b.w / 2 &&
    a.y + a.h / 2 > b.y - b.h / 2 &&
    a.y - a.h / 2 < b.y + b.h / 2
  );
};

// here are the stats for each individual type of block
var blocks = {
  // wall
  w: {
    x_off: 0,
    y_off: 0,
    w: blocksize,
    h: blocksize,
    damage: 0,
    sink: 0,
  },

  // time dust
  d: {
    x_off: 0,
    y_off: 0,
    w: blocksize,
    h: blocksize,
    damage: 0,
    sink: 1,
  },

  // button
  b: {
    x_off: 0,
    y_off: blocksize / 4,
    w: blocksize,
    h: (blocksize * 9) / 16,
    damage: 0,
    sink: 1,
  },

  // pressed button (non-button)
  n: {
    x_off: 0,
    y_off: blocksize / 4,
    w: blocksize,
    h: blocksize / 2,
    damage: 0,
    sink: 1,
  },

  // spikes (bottom)
  s: {
    x_off: 0,
    y_off: blocksize / 4,
    w: blocksize - 2,
    h: blocksize / 2,
    damage: 1,
    sink: 0,
  },

  // spikes (up)
  5: {
    x_off: 0,
    y_off: -blocksize / 4,
    w: blocksize - 2,
    h: blocksize / 2,
    damage: 1,
    sink: 0,
  },

  // laser - horizontal - left
  ">": {
    x_off: 0,
    y_off: 0,
    w: blocksize - 2,
    h: blocksize / 2,
    damage: 0,
    sink: 1,
  },

  // laser - horizontal - right
  "<": {
    x_off: 0,
    y_off: 0,
    w: blocksize - 2,
    h: blocksize / 2,
    damage: 0,
    sink: 1,
  },

  // laser beam - horizontal
  "-": {
    x_off: 0,
    y_off: 0,
    w: blocksize,
    h: (blocksize * 3) / 16,
    damage: 1,
    sink: 1,
  },

  // laser - vertical - up
  v: {
    x_off: 0,
    y_off: 0,
    w: blocksize / 2,
    h: blocksize - 2,
    damage: 0,
    sink: 1,
  },

  // laser - vertical - down
  "^": {
    x_off: 0,
    y_off: 0,
    w: blocksize / 2,
    h: blocksize - 2,
    damage: 0,
    sink: 1,
  },

  // laser beam - vertical
  "|": {
    x_off: 0,
    y_off: 0,
    w: (blocksize * 3) / 16,
    h: blocksize,
    damage: 1,
    sink: 1,
  },

  // portal
  "+": {
    x_off: 0,
    y_off: -blocksize / 4,
    w: (blocksize * 3) / 2,
    h: (blocksize * 3) / 2,
    damage: 0,
    sink: 1,
  },

  // space
  " ": {
    x_off: 0,
    y_off: 0,
    w: blocksize,
    h: blocksize,
    damage: 0,
    sink: 1,
  },
};

var blockG = function (x, y, l) {
  switch (l) {
    case "w":
      fill(242, 232, 207);
      rect(x, y, blocks[l].w, blocks[l].h);
      break;
    case "+":
      image(portal, x, y, blocks[l].w, blocks[l].h);
      break;
    case "s": //spikes (bottum)
      image(spike_bot, x, y, blocks[l].w, blocks[l].h);
      break;
    case "5": //spikes (top)
      image(spike_top, x, y, blocks[l].w, blocks[l].h);
      break;
    case "b": //buttons
      image(button_og, x, y, blocks[l].w, blocks[l].h);
      break;
    case "n":
      image(button_pressed, x, y, blocks[l].w, blocks[l].h);
      break;
    case "d": //timedust
      image(time_dust, x, y, blocks[l].w, blocks[l].h);
      break;
    case ">":
      image(laser_left, x, y, blocks[l].w, blocks[l].h * 2);

      if (round(millis() / 1000) % 2 == 0) {
        blocks[">"].damage = 1;
      } else {
        blocks[">"].damage = 0;
      }
      break;
    case "<":
      image(laser_right, x, y, blocks[l].w, blocks[l].h * 2);

      if (round(millis() / 1000) % 2 == 0) {
        blocks["<"].damage = 1;
      } else {
        blocks["<"].damage = 0;
      }
      break;

    case "-":
      if (round(millis() / 1000) % 2 == 0) {
        image(laser_beam_horizontal, x, y, blocks[l].w, blocks[l].h);
        blocks["-"].damage = 1;
      } else {
        blocks["-"].damage = 0;
      }
      break;
    case "v":
      image(laser_up, x, y, blocks[l].w * 2, blocks[l].h);

      if (round(millis() / 1000) % 2 == 0) {
        blocks.v.damage = 1;
      } else {
        blocks.v.damage = 0;
      }
      break;
    case "^":
      image(laser_down, x, y, blocks[l].w * 2, blocks[l].h);

      if (round(millis() / 1000) % 2 == 0) {
        blocks["^"].damage = 1;
      } else {
        blocks["^"].damage = 0;
      }
      break;
    case "|":
      if (round(millis() / 1000) % 2 == 0) {
        image(laser_beam_vertical, x, y, blocks[l].w, blocks[l].h);
        blocks["|"].damage = 1;
      } else {
        blocks["|"].damage = 0;
      }
      break;
  }
};

var level = [];

var newBlock = function (x, y, l) {
  return {
    x: x + blocks[l].x_off,
    y: y + blocks[l].y_off,
    w: blocks[l].w,
    h: blocks[l].h,
    damage: blocks[l].damage,
    l: l,
    sink: blocks[l].sink,
  };
};

var fillLevel = function (maps, lvl) {
  level = [];
  lvl = maps[lvl];

  for (var y = 0; y < lvl.length; y++) {
    for (var x = 0; x < lvl[y].length; x++) {
      let bl = lvl[y][x];
      if (bl == "p") {
        p.x = x * blocksize + p.w / 2;
        p.y = y * blocksize;
        if (p.x > width / 2) addon = p.x - width / 2;
        p.ox = x * blocksize;
        p.oy = y * blocksize;
        level.push(
          newBlock(
            x * blocksize + blocksize / 2,
            y * blocksize + blocksize / 2,
            " "
          )
        );
      } else {
        level.push(
          newBlock(
            x * blocksize + blocksize / 2,
            y * blocksize + blocksize / 2,
            lvl[y][x]
          )
        );
      }
    }
  }
};

var collide = function (vx, vy) {
  for (var i in level) {
    var b = level[i];
    if (colliding(p, b)) {
      if (blocks[b.l].damage == 1) gameIsOver = true;

      if (b.sink == 0) {
        if (vx > 0) {
          p.x = b.x - b.w / 2 - p.w / 2;
          if (adding) addon -= p.vx;
          p.vx = 0;
        } else if (vx < 0) {
          p.x = b.x + b.w / 2 + p.w / 2;
          if (adding) addon -= p.vx;
          p.vx = 0;
        }
        
        if (vy > 0) {
          p.y = b.y - b.h / 2 - p.h / 2;
          p.vy = 0;
          p.jump = true;
        } else if (vy < 0) {
          p.jumptimer = 0;
          p.y = b.y + b.h / 2 + p.h / 2;
          p.vy = 0;
        }
      }

      switch (b.l) {
        case "+":
          next = true;
          p.x = b.x;
          p.y = b.y;
          p.vx = 0;
          p.vy = p.grav;
          break;
        case "b": //buttons
          if (scene == "game") {
            gameindex += 1;
            fillLevel(gamemaps, gameindex);
          } else if (scene == "tuto") {
            tutoindex += 1;
            fillLevel(tutomaps, tutoindex);
          }
          while (p.collected.length > 0) {
            level[parseInt(p.collected[p.collected.length - 1])].l = " ";
            p.collected.pop();
          }
          return;
        case "d":
          p.collected.push(i);
          p.timedustlevel = min(
            p.timedustmax,
            p.timedustlevel + p.timedustmax / 10
          );
          b.l = " ";
          break;
      }
    }
  }
};
