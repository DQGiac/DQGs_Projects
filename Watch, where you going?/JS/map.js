var colliding = function (a, b) {
  return (
    a.x + a.w / 2 > b.x - b.w / 2 &&
    a.x - a.w / 2 < b.x + b.w / 2 &&
    a.y + a.h / 2 > b.y - b.h / 2 &&
    a.y - a.h / 2 < b.y + b.h / 2
  );
};

var levelindex = -1;
var actuallevel = 0;
var levelmaps = [
  // 1 --> introduce time dust
  [
    "                              ", //161
    "                              ", //171
    "                              ", //181
    " wwwwwwwwwwwwwwwwwwwwwwwwwwww ", //01
    "w                            w", //11
    "w                            w", //21
    "w                            w", //31
    "w p                        + w", //41
    " wwwwwwwwwwwww  wwwwwwwwwwwww ", //51
    "                              ", //61
    "                              ", //71
    "                              ", //81
    "                              ", //91
    "                              ", //101
    "             wwww             ", //111
    "                              ", //121
    "        d            d        ", //131
    "                              ", //141
    "                              ", //151
    "                              ", //191
  ],

  // 2 - introduce button
  [
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    " p  w   d    w  b ssssss  +",
    "wwwwwwwwwwwwwwwwwwwwwwwwwww",
  ],
  [
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                           ",
    "                    ww     ",
    "    w   d    w  n ssssss  +w",
    "wwwwwwwwwwwwwwwwwwwwwwwwwww",
  ],
  // 3 - more advanced parkour
  [
    "                              ", //01
    "                              ", //11
    "                              ", //21
    "                              ", //31
    "                              ", //41
    "               wwww   w       ", //51
    "                              ", //61
    "                              ", //71
    "                              ", //81
    "                              ", //91
    "                              ", //101
    "                           +  ", //111
    "                              ", //121
    "         w    w               ", //131
    "       sw                     ", //141
    "       w                      ", //151
    "     sw                       ", //161
    "     w                        ", //171
    "p   w               b   d     ", //181
    "wwww               www        ", //191
  ],
  [
    "                              ", //01
    "                              ", //11
    "                              ", //21
    "                              ", //31
    "                              ", //41
    "               wwww   w       ", //51
    "                              ", //61
    "          w                   ", //71
    "           w                  ", //81
    "            w                 ", //91
    "             w                ", //101
    "                           +  ", //111
    "                              ", //121
    "         w    w               ", //131
    "       sw                     ", //141
    "       w                      ", //151
    "     sw                       ", //161
    "     w                        ", //171
    "    w               n   d     ", //181
    "wwww               www        ", //191
  ],
  //  -> medium + sophisticated
  [
    "                                        ", //01
    "                                        ", //11
    "       b                           p    ", //21
    "       ww                 w      wwww   ", //31
    "                          w      w      ", //41
    "                          w      w   d  ", //51
    "           w    w     ww  w      w      ", //61
    "       w                  w      wssssss", //71
    "   ww                     w      wwwwwww", //81
    "  ssssssssssssssssssssssssw   b         ", //91
    "  wwwwwwwwwwwwwwwwwwwwwwwwwwwwww        ", //101
    "                                w    d  ", //111
    "                                 w      ", //121
    "                                  wwwwww",
    "                 b                      ", //131
    "ss            w         +               ", //141
    "ww   ww   ww                            ", //151
    "                                        ", //161
    "                         wd             ", //181
    "                          ww            ", //191
  ],
  [
    "                                        ", //01
    "                                        ", //11
    "       b                                ", //21
    "       ww                 wwwwwwwwwww   ", //31
    "                          w      w      ", //41
    "                          w      w   d  ", //51
    "           w    w     ww  w      w      ", //61
    "       w                  w      wssssss", //71
    "   ww                     w      wwwwwww", //81
    "  ssssssssssssssssssssssssw   n         ", //91
    "  wwwwwwwwwwwwwwwwwwwwwwwwwwwwww        ", //101
    "                                w    d  ", //111
    "                                 w      ", //121
    "                                  wwwwww",
    "                 b                      ", //131
    "ss            w         +               ", //141
    "ww    w    w                            ", //151
    "                                        ", //161
    "                         wd             ", //181
    "                          ww            ", //191
  ],
  [
    "                                        ", //01
    "                                        ", //11
    "       n                                ", //21
    "       ww                 wwwwwwwwwww   ", //31
    "                          w      w      ", //41
    "                          w      w   d  ", //51
    "           w    w     ww  w      w      ", //61
    "       w                  w      wssssss", //71
    "   ww                     w      wwwwwww", //81
    "  ssssssssssssssssssssssssw   n         ", //91
    "  wwwwwwwwwwwwwwwwwwwwwwwwwwwwww        ", //101
    "                                w    d  ", //111
    "                                 w      ", //121
    "                                  wwwwww",
    "                 b                      ", //131
    "              w         +               ", //141
    "ww    w    w                            ", //151
    "                                        ", //161
    "                         wd             ", //181
    "                          ww            ", //191
  ],
  [
    "                                        ", //01
    "                                        ", //11
    "       n                                ", //21
    "       ww                 wwwwwwwwwww   ", //31
    "                          w      w      ", //41
    "                          w      w   d  ", //51
    "           w    w     ww  w      w      ", //61
    "       w                  w      wssssss", //71
    "   ww                     w      wwwwwww", //81
    "  ssssssssssssssssssssssssw   n         ", //91
    "  wwwwwwwwwwwwwwwwwwwwwwwwwwwwww        ", //101
    "                                w    d  ", //111
    "                                 w      ", //121
    "                                  wwwwww",
    "                 n                      ", //131
    "              w      s  +               ", //141
    "ww    w    w      wwwwwww               ", //151
    "                                        ", //171
    "                         wd             ", //181
    "                          ww            ", //191
  ],
  // --> could be an intro for laser
  [
    "wwwwwwwwwwwwwwwwwwww", //0
    "55555555555555555555", //1
    "                    ", //2
    " p                + ", //3
    "wwwwwwwwwwwwwww  www", //4
    "      v    v     w  ", //5
    "      |    |     w  ", //6
    "      |    | d   w  ", //7
    "      ^    ^     w  ", //8
    "    wwwwwwwwwwwwww  ", //9
    "          5         ", //10
    "                    ", //12
    "                    ", //11
    "                    ", //12
    "sss    ss   ss      ", //13
    "wwwwwwwwwwwwwwww    ", //14
    "                    ", //15
    "                  + ", //17
    "                    ", //18
    "                    ", //19
  ],

  //
  [
    "                   w", //0
    "                   w", //1
    "                   w", //2
    "p  d               w", //3
    "wwww               w", //4
    "   w               w", //5
    "   w               w", //6
    "   w               w", //7
    "   w               w", //8
    "   w               w", //9
    "   w               w", //10
    "   w               w", //11
    "   w               w", //12
    "   w               w", //13
    "   w>-------------<w", //14
    "                    ", //15
    "                    ", //16
    "       ss    ss  +  ", //17
    "   wwwwwwwwwwwwwwwww", //18
    "                    ", //19
  ],
  // --> harder
  [
    "                      wwwwwwww", //0
    "                       v  v   ", //1
    "                       |  |   ", //2
    "                       |  |   ", //3
    " p                     ^  ^ + ", //4
    "wwww>----<w           wwwwwwww", //5
    "   w>----<w                   ", //6
    "                              ", //7
    "       ss         w           ", //8
    "       ww                     ", //9
    "                              ", //10
    "                      w       ", //11
    "                              ", //12
    "              sss             ", //13
    "    wwww    wwwwwww           ", //14
    "                              ", //15
    "                              ", //16
    "                              ", //17
    "                              ", //18
    "                              ", //19
  ],
  
  
  
  
  
  
  
  
  // end level
    [ 
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwww", //0 
    "w                           w", //1 
    "w  >-< w w  w  ww  w w  ww  w", //2 
    "w   w  w w w+w w w ww  ww   w", //3 
    "w   w  www www w w w w   w  w", //4 
    "w   w  w w w w w w w w ww   w", //5 
    "w                           w", //6 
    "w             p             w", //7 
    "w        www  w  ww         w", //8 
    "w        w   w w w w        w", //9 
    "w        ww  w w ww         w", //10 
    "w        w    w  w w        w", //11 
    "w                           w", //12 
    "w                           w", //13 
    "w ww  w    w  w w v ww   ww w", //14 
    "w w5w w   wsw  ww | w w w   w", //15 
    "w ww  w   www   w | w w w w w", //16 
    "w w    ww w w ww  ^ w w  w  w", //17 
    "w                           w", //18 
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwww", //19 
  ], 
  
];

var tutorialmaps = [];

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

var collidedx = false;
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
            levelindex += 1;
            fillLevel(levelmaps, levelindex);
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
