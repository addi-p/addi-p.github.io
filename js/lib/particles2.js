// Define parameters for the Lorenz attractor
const sigma = 10;
const rho = 28;
const beta = 8 / 3;
const dt = 0.01;

class Particle {
  constructor(width, height) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.z = Math.random() * 50 - 25;
  }

  update() {
    const dx = sigma * (this.y - this.x);
    const dy = this.x * (rho - this.z) - this.y;
    const dz = this.x * this.y - beta * this.z;

    this.x += dx * dt;
    this.y += dy * dt;
    this.z += dz * dt;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.closePath();
  }
}

class ParticleSystem {
  constructor(numParticles, canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.particles = [];

    for (let i = 0; i < numParticles; i++) {
      this.particles.push(new Particle(this.width, this.height));
    }
  }

  update() {
    this.pparticles.forEach(particle => particle.update());
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.particles.forEach(particle => particle.draw(this.ctx));
  }

  start() {
    const loop = () => {
      this.update();
      this.draw();
      requestAnimationFrame(loop);
    };
    loop();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particles-js');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  if (canvas.getContext) {
    const particleSystem = new ParticleSystem(100, canvas);
    particleSystem.start();
  } else {
    console.error('Canvas not supported in this browser.');
  }
});
