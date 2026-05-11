let menubutton = 0;
function menu() {
  if (menubutton < width / 2)
    menubutton += abs(menubutton - width / 2) / 30 + 0.1;

  textFont(BoKi);
  textSize(40);
  textLeading(70);
  fill(56, 102, 65);
  text("WATCH, WHERE\nYOU GOING?", width / 2 - 2, menubutton - 253);
  fill(255, 0, 0);
  text("WATCH, WHERE\nYOU GOING?", width / 2, menubutton - 250);
  textFont(font);
  buttonscene(
    menubutton,
    400,
    blocksize * 10,
    blocksize,
    "PLAY",
    "game",
    () => {
      p.timedustlevel = p.leveltimedust;
      p.corruptlevel = p.levelcorrupt;
    },
    0
  );
  buttonscene(
    width - menubutton,
    500,
    blocksize * 10,
    blocksize,
    "TUTO",
    "tuto",
    () => {},
    1
  );
  // buttonscene(menubutton, 440, width / 2, 40, "B O S S", "boss", () => {}, 2);
  fill(0);
  textSize(30);
  text("DELAG: " + (delag ? "ON" : "OFF"), width / 2, 1100 - menubutton);
  if (hover(300, 500, 680, 720)) {
    cursor(HAND);
    if (mouseIsPressed) {
      delag = !delag;
      mouseIsPressed = false;
    }
  }
}
