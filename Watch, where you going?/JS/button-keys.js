var add = [0, 0, 0, 0, 0];
var addtf = [];

function button(x, y, w, h, txt, func, transtf, num) {
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(25);
  fill(0);
  noStroke();
  if (hover(x - w / 2, x + w / 2, y - h / 2, y + h / 2)) {
    if (mouseIsPressed) {
      clicksound.play();
      mouseIsPressed = false;
      if (transtf) transition = true;
      func();
    }
    image(scene_button_down, x, y + (h * 4) / 32, w, h);
    text(txt, x, y + h / 8);
    fill(0, 100);
    text(txt, x - (w / 24 * txt.length) + (w / 24 * txt.length) * abs(x - width / 2) / width * 2, y + h / 8);
    text(txt, x + (w / 24 * txt.length) - (w / 24 * txt.length) * abs(x - width / 2) / width * 2, y + h / 8);
  } else {
    image(scene_button_up, x, y, w, (h * 40) / 32);
    text(txt, x, y - h / 8);
    fill(0, 100);
    text(txt, x - (w / 24 * txt.length) + (w / 24 * txt.length) * abs(x - width / 2) / width * 2, y - h / 8);
    text(txt, x + (w / 24 * txt.length) - (w / 24 * txt.length) * abs(x - width / 2) / width * 2, y - h / 8);
  }
}

var nextscene = "";
function buttonscene(x, y, w, h, txt, scene, add, num) {
  button(x, y, w, h, txt, () => { nextscene = scene; add(); }, true, num);
}

var hover = (x1, x2, y1, y2) => {
  return mouseX > x1 && mouseX < x2 && mouseY > y1 && mouseY < y2;
};

var keys = [];
keyPressed = () => (keys[keyCode] = true);
keyReleased = () => (keys[keyCode] = false);
