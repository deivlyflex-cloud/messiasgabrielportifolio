/* ============================================
   MESSIAS GABRIEL — PORTFOLIO v3
   script.js
   ============================================ */

/* ---- 1. NAVBAR ---- */
const navbar = document.getElementById('navbar');
const toggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('solid', window.scrollY > 50);
});

toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    toggle.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ---- 2. ACTIVE NAV ON SCROLL ---- */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navItems.forEach(a => a.classList.remove('active'));
      const match = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (match) match.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' }).observe
  ? sections.forEach(s => {
      new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            navItems.forEach(a => a.classList.remove('active'));
            const m = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
            if (m) m.classList.add('active');
          }
        });
      }, { rootMargin: '-40% 0px -55% 0px' }).observe(s);
    })
  : null;

/* ---- 3. SCROLL REVEAL + BARS + COUNTERS ---- */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');

    // Animate skill bars
    e.target.querySelectorAll('.bf[data-w]').forEach(b => {
      b.style.width = b.dataset.w + '%';
    });

    // Animate counters
    e.target.querySelectorAll('.sval[data-to]').forEach(el => {
      const target = +el.dataset.to;
      const dur = 1500;
      const start = performance.now();
      const tick = now => {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

/* ---- 4. TYPED TEXT ---- */
(function () {
  const el = document.getElementById('typed');
  if (!el) return;
  const words = ['Desenvolvedor Web', 'Criador de Bots IA', 'Trader Casino', 'Estudante de Marketing Digital'];
  let wi = 0, ci = 0, del = false;

  const tick = () => {
    const w = words[wi];
    el.textContent = '> ' + (del ? w.slice(0, ci - 1) : w.slice(0, ci + 1));
    del ? ci-- : ci++;
    if (!del && ci === w.length)  { del = true;  return setTimeout(tick, 1800); }
    if (del && ci === 0)          { del = false; wi = (wi + 1) % words.length; }
    setTimeout(tick, del ? 52 : 90);
  };
  setTimeout(tick, 1000);
})();

/* ---- 5. PARTICLE CANVAS ---- */
(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];

  const resize = () => {
    const hero = document.querySelector('.hero');
    W = canvas.width  = hero.offsetWidth;
    H = canvas.height = hero.offsetHeight;
  };

  const init = () => {
    pts = [];
    const n = Math.floor(W / 18);
    for (let i = 0; i < n; i++) {
      pts.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.2 + .3, dx: (Math.random() - .5) * .25, dy: -Math.random() * .35 - .08, a: Math.random() * .45 + .08 });
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59,130,246,${p.a})`; ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
      if (p.x < -4) p.x = W + 4;
      if (p.x > W + 4) p.x = -4;
    });
    requestAnimationFrame(draw);
  };

  resize(); init(); draw();
  window.addEventListener('resize', () => { resize(); init(); });
})();

/* ---- 6. BUTTON RIPPLE ---- */
document.querySelectorAll('.btn, .c-btn').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const rpl = document.createElement('span');
    rpl.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:rgba(255,255,255,.13);top:${e.clientY - rect.top - size / 2}px;left:${e.clientX - rect.left - size / 2}px;transform:scale(0);animation:_rpl .55s ease-out forwards;pointer-events:none;`;
    this.style.position = 'relative'; this.style.overflow = 'hidden';
    this.appendChild(rpl);
    setTimeout(() => rpl.remove(), 600);
  });
});

// Inject ripple keyframe once
const st = document.createElement('style');
st.textContent = '@keyframes _rpl{to{transform:scale(1);opacity:0}}';
document.head.appendChild(st);
