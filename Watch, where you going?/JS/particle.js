var particles = [];
function Particle(ob) {
  for (let i in ob) {
    if (ob[i] == "") continue;
    let particle = ob[i];
    let x = particle.x / 80;
    let y = particle.y / 80;
    particle.x += ob[i].velx;
    particle.y += ob[i].vely;
    fill(particle.Color);
    rect(particle.x, particle.y, ob[i].w);
    ob[i].w -= 0.1;
    if (ob[i].w <= 0) {
      ob[i] = "";
      break;
    }
  }
}
