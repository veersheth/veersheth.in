function scramble(el) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*?';
  const original = el.textContent;
  const duration = 2000;
  const frameRate = 35;
  const totalFrames = duration / frameRate;
  let frame = 0;

  const interval = setInterval(() => {
    el.textContent = original.split('').map((char, i) => {
      if (char === ' ') return ' ';
      if (frame >= (i / original.length) * totalFrames) return char;
      return chars[Math.floor(Math.random() * chars.length)];
    }).join('');

    if (++frame > totalFrames) {
      el.textContent = original;
      clearInterval(interval);
    }
  }, frameRate);
}

setTimeout(() => scramble(document.querySelector('.about')), 300);

document.querySelector('.copy-email').addEventListener('click', function () {
  const email = this.dataset.email;
  navigator.clipboard.writeText(email).then(() => {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  });
});

const projectsList = document.querySelector('.projects-list');
document.querySelector('.projects-prev').addEventListener('click', () => {
  projectsList.scrollBy({ left: -projectsList.querySelector('.project-card').offsetWidth, behavior: 'smooth' });
});
document.querySelector('.projects-next').addEventListener('click', () => {
  projectsList.scrollBy({ left: projectsList.querySelector('.project-card').offsetWidth, behavior: 'smooth' });
});

function circleGoesRogue() {
  const circle = document.querySelector('.name-circle');
  const rect = circle.getBoundingClientRect();
  const radius = circle.offsetWidth / 2;

  const rogue = document.createElement('div');
  rogue.style.cssText = `
    position: fixed;
    width: ${radius * 2}px;
    height: ${radius * 2}px;
    border-radius: 50%;
    background: var(--accent);
    left: ${rect.left}px;
    top: ${rect.top}px;
    z-index: 9999;
    pointer-events: none;
  `;
  document.body.appendChild(rogue);
  circle.style.opacity = '0';

  const { Engine, Bodies, Composite, Body } = Matter;
  const W = window.innerWidth;
  const H = window.innerHeight;
  const T = 100;

  const engine = Engine.create({ gravity: { y: 2 } });

  const ball = Bodies.circle(rect.left + radius, rect.top + radius, radius, {
    restitution: 0.7,
    frictionAir: 0.01,
  });
  Body.setVelocity(ball, { x: (Math.random() - 0.5) * 20, y: -12 });

  Composite.add(engine.world, [
    ball,
    Bodies.rectangle(W / 2, H + T / 2, W * 2, T, { isStatic: true }),
    Bodies.rectangle(-T / 2, H / 2, T, H * 2, { isStatic: true }),
    Bodies.rectangle(W + T / 2, H / 2, T, H * 2, { isStatic: true }),
    Bodies.rectangle(W / 2, -T / 2, W * 2, T, { isStatic: true }),
  ]);

  let rafId;
  const start = performance.now();
  const duration = 4000;

  function step(now) {
    Engine.update(engine, 1000 / 60);
    rogue.style.left = (ball.position.x - radius) + 'px';
    rogue.style.top = (ball.position.y - radius) + 'px';

    if (now - start >= duration) {
      cancelAnimationFrame(rafId);
      rogue.style.transition = 'left 0.7s cubic-bezier(0.4, 0, 0.2, 1), top 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
      rogue.style.left = rect.left + 'px';
      rogue.style.top = rect.top + 'px';
      setTimeout(() => {
        circle.style.opacity = '';
        rogue.remove();
      }, 700);
      return;
    }

    rafId = requestAnimationFrame(step);
  }

  rafId = requestAnimationFrame(step);
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !document.querySelector('.name-circle').style.opacity) circleGoesRogue();
});

function scheduleRogue() {
  setTimeout(() => {
    circleGoesRogue();
    scheduleRogue();
  }, 20000 + Math.random() * 15000);
}

scheduleRogue();

const allPills = document.querySelectorAll('.pill');

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    if (card.dataset.url) window.open(card.dataset.url, '_blank');
  });

  card.addEventListener('mouseenter', () => {
    const skills = card.dataset.skills.split(',').map(s => s.trim());
    allPills.forEach(pill => {
      if (skills.includes(pill.textContent.trim())) {
        pill.classList.add('active');
        pill.classList.remove('inactive');
      } else {
        pill.classList.add('inactive');
        pill.classList.remove('active');
      }
    });
  });

  card.addEventListener('mouseleave', () => {
    allPills.forEach(pill => pill.classList.remove('active', 'inactive'));
  });
});
