// = loadImage("Assets/Images/.png");

function preload() {
  font = loadFont("Assets/Font.ttf");
  BoKi = loadFont("Assets/BoKi.ttf");

  // Images
  button_og = loadImage("Assets/Images/button_og.png");
  button_pressed = loadImage("Assets/Images/button_pressed.png");
  char_jump = loadImage("Assets/Images/char_jump.png");
  char_stand = loadImage("Assets/Images/char_stand.png");
  char_walkright = loadImage("Assets/Images/char_walkright.gif");
  char_walkleft = loadImage("Assets/Images/char_walkleft.gif");
  laser_beam_vertical = loadImage("Assets/Images/laser_beam_vertical.png");
  laser_beam_horizontal = loadImage("Assets/Images/laser_beam_horizontal.png");
  laser_down = loadImage("Assets/Images/laser_down.png");
  laser_up = loadImage("Assets/Images/laser_up.png");
  laser_left = loadImage("Assets/Images/laser_left.png");
  laser_right = loadImage("Assets/Images/laser_right.png");
  portal = loadImage("Assets/Images/portal.png");
  spike_bot = loadImage("Assets/Images/spike_bot.png");
  spike_top = loadImage("Assets/Images/spike_top.png");
  time_dust = loadImage("Assets/Images/time_dust.png");

  scene_button_down = loadImage("Assets/Images/scene_button_down.png");
  scene_button_up = loadImage("Assets/Images/scene_button_up.png");

  // tuto keys
  wad = loadImage("Assets/buttons/wad.gif");
  arrow = loadImage("Assets/buttons/arrow.gif");
  menuImg = loadImage("Assets/buttons/menu.png");
  rKey = loadImage("Assets/buttons/r.gif");
  pKey = loadImage("Assets/buttons/p.gif");
  eKey = loadImage("Assets/buttons/e.gif");

  // sound
  clicksound = loadSound("Assets/Sounds/clk.mp3", () => (loaded = true));
}
