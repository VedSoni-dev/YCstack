// ============================================================
// /fc — FounderCode
// ============================================================

function copyToClipboard(el) {
  const code = el.querySelector('code').textContent;
  navigator.clipboard.writeText(code).then(() => {
    el.classList.add('copied');
    const btn = el.querySelector('.copy-btn');
    const og = btn.textContent;
    btn.textContent = 'copied!';
    setTimeout(() => { el.classList.remove('copied'); btn.textContent = og; }, 2000);
  });
}

// ============================================================
// TERMINAL TYPEWRITER
// ============================================================

const commands = [
  {
    cmd: '/fc review',
    output: `<div class="out-section">You're a strong engineer. Let's make you a founder.</div>
<br>
<div>I see a well-architected codebase with clean patterns.</div>
<div>But I don't see <span class="out-warn">a single user interview</span> in your</div>
<div>git history. No analytics. No feedback loop.</div>
<br>
<div class="out-section">The gap between coding and building:</div>
<div>You can ship features. But do you know <em>which</em> ones</div>
<div>matter? PG's "Do Things That Don't Scale" (2013):</div>
<div><span class="out-action">"The most important thing is to get your first</span></div>
<div><span class="out-action">users by recruiting them manually, one at a time."</span></div>
<br>
<div class="out-action">Do this TODAY: Message 3 people who have the</div>
<div class="out-action">problem you're solving. Ask what they use now.</div>`
  },
  {
    cmd: '/fc roast',
    output: `<div class="out-section">What you're actually building:</div>
<div>Yet another task management app. You've dressed it up</div>
<div>with "AI-powered prioritization" but I see a todo list</div>
<div>with a ChatGPT wrapper.</div>
<br>
<div class="out-section">The hard truth:</div>
<div>You have <span class="out-warn">0 users</span> and <span class="out-warn">47 features</span>. That ratio is</div>
<div>the problem. You're building because building feels</div>
<div>like progress. It's not.</div>
<br>
<div class="out-action">Do this TODAY: Close your laptop. Text 3 friends</div>
<div class="out-action">who manage teams. Ask what sucks about their tools.</div>`
  },
  {
    cmd: '/fc-interview',
    output: `<div class="out-section">MOCK INTERVIEW</div>
<div>Two mentors walk in. Michael looks up.</div>
<br>
<div><span class="out-action">Michael:</span> "So — what does TaskFlow do?"</div>
<br>
<div style="color: var(--text-3)">▸ "It's an AI-powered task management platform..."</div>
<br>
<div><span class="out-action">Michael:</span> "Hold on. You said 'platform' and 'AI-</div>
<div>powered.' I don't know what that means. What does</div>
<div>a user actually DO with it?"</div>
<br>
<div><span style="color: var(--purple)">Dalton:</span> "How many people are using this?"</div>
<div style="color: var(--text-3)">▸ "We're pre-launch, but we have a waitlist of—"</div>
<div><span style="color: var(--purple)">Dalton:</span> "Waitlists don't count. Ship it."</div>`
  }
];

let currentCmd = 0;
const typewriterEl = document.getElementById('typewriter');
const heroOutput = document.getElementById('hero-output');

function typeCommand(cmd, cb) {
  let i = 0;
  typewriterEl.textContent = '';
  heroOutput.innerHTML = '';
  (function type() {
    if (i < cmd.length) {
      typewriterEl.textContent += cmd[i++];
      setTimeout(type, 45 + Math.random() * 55);
    } else setTimeout(cb, 350);
  })();
}

function showOutput(html) {
  heroOutput.innerHTML = html;
  heroOutput.style.opacity = '0';
  heroOutput.style.transform = 'translateY(8px)';
  requestAnimationFrame(() => {
    heroOutput.style.transition = 'opacity 0.4s, transform 0.4s';
    heroOutput.style.opacity = '1';
    heroOutput.style.transform = 'translateY(0)';
  });
}

function runDemo() {
  const { cmd, output } = commands[currentCmd];
  typeCommand(cmd, () => {
    showOutput(output);
    setTimeout(() => {
      heroOutput.style.transition = 'opacity 0.4s';
      heroOutput.style.opacity = '0';
      setTimeout(() => { currentCmd = (currentCmd + 1) % commands.length; runDemo(); }, 500);
    }, 5500);
  });
}

setTimeout(runDemo, 600);

// ============================================================
// SCROLL REVEAL
// ============================================================

const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.animationPlayState = 'running'; obs.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.skill-card, .mentor-card, .problem-card, .data-card').forEach((el, i) => {
  el.style.animationDelay = `${i * 0.08}s`;
  obs.observe(el);
});

// ============================================================
// SMOOTH SCROLL
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
