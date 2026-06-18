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
    el.style.animation = 'rise-and-shake 1s ease-in forwards';
  });

  setTimeout(() => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const T = 100;

    // read ALL positions first before touching the DOM
    const dims = els.map(el => {
      const rect = el.getBoundingClientRect();
      return { w: rect.width, h: rect.height, left: rect.left, top: rect.top };
    });

    // then apply fixed positioning to all
    els.forEach((el, i) => {
      const { w, h, left, top } = dims[i];
      el.style.animation = 'none';
      el.style.transition = 'none';
      el.style.transform = 'none';
      el.style.position = 'fixed';
      el.style.left = left + 'px';
      el.style.top = top + 'px';
      el.style.width = w + 'px';
      el.style.height = h + 'px';
      el.style.margin = '0';
      el.style.zIndex = '999';
      el.style.boxSizing = 'border-box';
      el.style.transformOrigin = 'center center';
    });

    document.body.offsetHeight; // force reflow

    // constrict towards center using transform (GPU-accelerated, no layout jump)
    els.forEach((el, i) => {
      const { w, h, left, top } = dims[i];
      const tx = (W / 2 - (left + w / 2)) * 0.05;
      const ty = (H / 2 - (top  + h / 2)) * 0.05;
      el.style.transition = 'transform 0.05s cubic-bezier(0.4, 0, 0.8, 1)';
      el.style.transform = `translate(${tx}px, ${ty}px)`;
    });

    setTimeout(() => {
      const { Engine, Bodies, Composite, Body } = Matter;
      const engine = Engine.create({ gravity: { y: 2 }, enableSleeping: true });

      Composite.add(engine.world, [
        Bodies.rectangle(W / 2, H + T / 2, W * 2, T, { isStatic: true }),
        Bodies.rectangle(W / 2, -T / 2,    W * 2, T, { isStatic: true }),
        Bodies.rectangle(-T / 2, H / 2,    T, H * 2, { isStatic: true }),
        Bodies.rectangle(W + T / 2, H / 2, T, H * 2, { isStatic: true }),
      ]);

      const items = els.map((el, i) => {
        const { w, h, left, top } = dims[i];
        if (w === 0 || h === 0) return null;
        const tx = (W / 2 - (left + w / 2)) * 0.05;
        const ty = (H / 2 - (top  + h / 2)) * 0.05;
        const cx = left + tx + w / 2;
        const cy = top  + ty + h / 2;
        el.style.transition = 'none';
        el.style.transform = 'none';
        el.style.left = (cx - w / 2) + 'px';
        el.style.top  = (cy - h / 2) + 'px';

        const body = Bodies.rectangle(cx, cy, w, h, {
          restitution: 0.65, frictionAir: 0.008, friction: 0.05, sleepThreshold: 30,
        });

        const ddx = cx - W / 2;
        const ddy = cy - H / 2;
        const len = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
        const randAngle = Math.random() * Math.PI * 2;
        const chaos = 0.65;
        const speed = 6 + Math.random() * 28;
        Body.setVelocity(body, {
          x: ((ddx / len) * (1 - chaos) + Math.cos(randAngle) * chaos) * speed,
          y: ((ddy / len) * (1 - chaos) + Math.sin(randAngle) * chaos) * speed - (6 + Math.random() * 14),
        });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.7);
        Composite.add(engine.world, body);

        return { el, body, w, h, home: homeRects[i], savedStyle: savedStyles[i] };
      }).filter(Boolean);

      const start = performance.now();
      let rafId;

      function step(now) {
        Engine.update(engine, 1000 / 60);
        items.forEach(({ el, body, w, h }) => {
          el.style.left = (body.position.x - w / 2) + 'px';
          el.style.top  = (body.position.y - h / 2) + 'px';
          el.style.transform = `rotate(${body.angle}rad)`;
        });

        const elapsed = now - start;
        const maxSpeed = Math.max(...items.map(({ body }) => Math.hypot(body.velocity.x, body.velocity.y)));
        const done = (maxSpeed < 0.8 && elapsed > 2000) || elapsed > 9000;

        if (!done) { rafId = requestAnimationFrame(step); return; }
        cancelAnimationFrame(rafId);

        items.forEach(({ el, home }) => {
          el.style.transition = 'left 0.9s cubic-bezier(0.4, 0, 0.2, 1), top 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 0.9s ease';
          el.style.left = home.left + 'px';
          el.style.top  = home.top  + 'px';
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
    }, 50);
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
