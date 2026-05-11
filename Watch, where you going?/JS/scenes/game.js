var gameindex = 0;
var actuallevel = 0;
var gamemaps = [
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

function game() {
  rectMode(CENTER);
  if (gameindex == -1) {
    p.timedustmax = 2000;
    p.timedustlevel = 200;
    p.leveltimedust = 200;
    p.collected = [];
    p.corruptlevel = 0;
    p.levelcorrupt = 0;
    p.logs = [];
    gameindex = 0;
  }
  if (reload) {
    reload = false;
    fillLevel(gamemaps, gameindex);
  }
  
  for (var i in level) {
    blockG(level[i].x - addon, level[i].y, level[i].l);
  }
  update(gamemaps, gameindex);
}
