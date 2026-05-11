var tutoindex = 0;
var tutomaps = [
  [
    "wwwwwwwwwwwwwwwwwwww", //0
    "w       555        w", //1
    "w                  w", //2
    "w                  w", //16
    "w                  w", //3
    "wp   sss           w", //4
    "wwwwwwwwwwwwwww    w", //5
    "w           v w    w", //6
    "w           | w    w", //8
    "w           ^ w b  w", //9
    "w>--<wwwwwwwwwwwwwww", //10
    "w                  w", //12
    "w d  d  d  d  d    w", //13
    "wwwwwwwwwwwwwww    w", //14
    "w                  w", //15
    "w                  w", //16
    "w                  w", //16
    "w                  w", //17
    "w +                w", //18
    "wwwwwww     wwwwwwww", //19
  ],
  [
    "wwwwwwwwwwwwwwwwwwww", //0
    "w       555        w", //1
    "w                  w", //2
    "w                  w", //16
    "w                  w", //3
    "w    sss           w", //4
    "wwwwwwwwwwwwwww    w", //5
    "w           v      w", //6
    "w           |      w", //8
    "w           ^   n  w", //9
    "w>--<wwwwwwwwwwwwwww", //10
    "w                  w", //12
    "w d  d  d  d  d    w", //13
    "wwwwwwwwwwwwwww    w", //14
    "w                  w", //15
    "w                  w", //16
    "w                  w", //16
    "w                  w", //17
    "w +                w", //18
    "wwwwwww     wwwwwwww", //19
  ],
  [
    "wwwwwwwwwwwwwwwwwwww", //0
    "w                  w", //1
    "w         p        w", //2
    "w  ww  w   w  ww   w", //3
    "w w   w w w w w w  w", //4
    "w w   w w w w w w  w", //5
    "w w w w w w w w w  w", //6
    "w  w   w   w  ww   w", //7
    "w                  w", //8
    "w                  w", //9
    "w                  w", //10
    "w                  w", //11
    "w  w   w w  ww w w w", //12
    "w  w   w w w   w w w", //13
    "w  w   w w w   ww  w", //14
    "w  w   w w w   w w w", //15
    "w  www  ww  ww w w w", //16
    "w                  w", //17
    "w                  w", //18
    "wwwwwwwwwwwwwwwwwwww", //19
  ],
];

function tuto() {
  rectMode(CENTER);
  if (reload) {
    reload = false;
    fillLevel(tutomaps, tutoindex);
  }
  for (var i in level) {
    blockG(level[i].x - addon, level[i].y, level[i].l);
  }
  update(tutomaps, tutoindex);
  textSize(20);
  textLeading(26);
  fill(242, 232, 207);

  if (tutoindex == 2) {
    text(
      "P to pause. R to restart.\nThat's it! Happy gaming!",
      width / 2,
      height / 2
    );
  } else {
    if (p.y < blocksize * 7) {
      text("These are spikes, able to\nkill you in one touch.", 300, 130);
    } else if (p.y < blocksize * 11) {
      text("Just-a-\n3D-button!", 680, 280);
      text(
        "Lasers will shut off every\n1 second. Time correctly, and\nyour hands will stay intact.",
        270,
        340
      );
      fill(188, 71, 73);
      text("v", 663, 350);
    } else {
      fill(242, 232, 207);
      text("Time dust is the fuel of your watch - a time looper.", 400, 456);

      if (p.y > blocksize * 14) {
        text(
          "Also, you can jump 3 blocks vertically\nand 5 blocks horizontally.",
          400,
          700
        );
        stroke(188, 71, 73);
        strokeWeight(5);
        line(750, height - blocksize, 750, height - blocksize * 4);
        line(
          blocksize * 7,
          height - blocksize / 2,
          blocksize * 12,
          height - blocksize / 2
        );
        strokeWeight(1);
        noStroke();
      }

      if (p.collected.length == 5) {
        textSize(18);
        fill(188, 71, 73);

        text("Press space to loop back in time & space again to stop!", 400, 495);
        text(
          "The watch still uses some time dust when not used.\nBe careful, once time dust runs out, the unstable watch\nstarts corrupting. When 100% corrupted, it will explode.",
          400,
          600
        );
        textSize(13);
        text("Time dust level (%) ->", 100, 20);
        text("<- Corruption level (%)", 705, 20);
        textSize(25);
      }
      for (let i = 0; i < 5 - p.collected.length; i++) {
        text("v", 580 - blocksize * 3 * i, 475);
      }
    }
  }
}
