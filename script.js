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


let isFalling = false;

function everythingFalls() {
  if (isFalling) return;
  isFalling = true;

  const els = [...document.querySelectorAll('.name-row, .about, .links, .project-card, .pill, .heading, .projects-btn')];
  const savedStyles = els.map(el => el.getAttribute('style') || '');
  const homeRects = els.map(el => el.getBoundingClientRect());

  // phase 1: rise with shake
  els.forEach(el => {
    el.style.animation = 'rise-and-shake 1s ease forwards';
  });

  setTimeout(() => {
    const { Engine, Bodies, Composite, Body } = Matter;
    const W = window.innerWidth;
    const H = window.innerHeight;
    const T = 100;

    const engine = Engine.create({ gravity: { y: 2 }, enableSleeping: true });

    Composite.add(engine.world, [
      Bodies.rectangle(W / 2, H + T / 2, W * 2, T, { isStatic: true }),
      Bodies.rectangle(W / 2, -T / 2,    W * 2, T, { isStatic: true }),
      Bodies.rectangle(-T / 2, H / 2,    T, H * 2, { isStatic: true }),
      Bodies.rectangle(W + T / 2, H / 2, T, H * 2, { isStatic: true }),
    ]);

    const items = els.map((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return null;

      el.style.animation = 'none';
      el.style.transition = 'none';
      el.style.transform = 'none';
      el.style.position = 'fixed';
      el.style.left = rect.left + 'px';
      el.style.top = rect.top + 'px';
      el.style.width = rect.width + 'px';
      el.style.height = rect.height + 'px';
      el.style.margin = '0';
      el.style.zIndex = '999';
      el.style.boxSizing = 'border-box';
      el.style.transformOrigin = 'center center';

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const body = Bodies.rectangle(cx, cy, rect.width, rect.height, {
        restitution: 0.65, frictionAir: 0.008, friction: 0.05,
        sleepThreshold: 30,
      });

      const dx = cx - W / 2;
      const dy = cy - H / 2;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      const speed = 15 + Math.random() * 20;
      Body.setVelocity(body, {
        x: (dx / len) * speed * (0.5 + Math.random()),
        y: -18 - Math.random() * 18,
      });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.4);
      Composite.add(engine.world, body);

      return { el, body, rect, home: homeRects[i], savedStyle: savedStyles[i] };
    }).filter(Boolean);

    const start = performance.now();
    let rafId;

    function step(now) {
      Engine.update(engine, 1000 / 60);
      items.forEach(({ el, body, rect }) => {
        el.style.left = (body.position.x - rect.width / 2) + 'px';
        el.style.top = (body.position.y - rect.height / 2) + 'px';
        el.style.transform = `rotate(${body.angle}rad)`;
      });

      const elapsed = now - start;
      const maxSpeed = Math.max(...items.map(({ body }) => Math.hypot(body.velocity.x, body.velocity.y)));
      const done = (maxSpeed < 0.8 && elapsed > 2000) || elapsed > 9000;

      if (!done) { rafId = requestAnimationFrame(step); return; }
      cancelAnimationFrame(rafId);

      // animate back to home positions while still fixed
      items.forEach(({ el, home }) => {
        el.style.transition = 'left 0.9s cubic-bezier(0.4, 0, 0.2, 1), top 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 0.9s ease';
        el.style.left = home.left + 'px';
        el.style.top = home.top + 'px';
        el.style.transform = 'rotate(0deg)';
      });

      setTimeout(() => {
        items.forEach(({ el, savedStyle }) => {
          if (savedStyle) el.setAttribute('style', savedStyle);
          else el.removeAttribute('style');
        });
        isFalling = false;
      }, 950);
    }

    rafId = requestAnimationFrame(step);
  }, 1000);
}

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') everythingFalls();
});


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
