import React, { useRef, useEffect, useState } from 'react';
import './Hero.css';

/* ── PHP code for canvas portrait ── */
const PHP_CODE = `<?php namespace App\\Http\\Controllers; use Illuminate\\Http\\Request; use App\\Models\\User; use App\\Models\\Post; use Illuminate\\Support\\Facades\\Auth; use Illuminate\\Support\\Facades\\Hash; use Illuminate\\Support\\Facades\\DB; use Illuminate\\Support\\Facades\\Cache; use Illuminate\\Support\\Facades\\Log; use Illuminate\\Validation\\Rule; class UserController extends Controller { public function __construct() { $this->middleware('auth'); $this->middleware('verified')->only('store'); } public function index(Request $request) { $users = User::query() ->when($request->search, function($q, $s) { $q->where('name', 'like', "%{$s}%") ->orWhere('email', 'like', "%{$s}%"); }) ->with(['posts', 'roles', 'permissions']) ->withCount('posts') ->orderBy('created_at', 'desc') ->paginate(15); return view('users.index', compact('users')); } public function store(Request $request) { $validated = $request->validate([ 'name' => 'required|string|max:255', 'email' => 'required|email|unique:users', 'password' => 'required|min:8|confirmed', 'role' => 'required|in:admin,editor,viewer', 'avatar' => 'nullable|image|max:2048', ]); $user = User::create([ 'name' => $validated['name'], 'email' => $validated['email'], 'password' => Hash::make($validated['password']), ]); $user->assignRole($validated['role']); if ($request->hasFile('avatar')) { $path = $request->file('avatar')->store('avatars', 'public'); $user->update(['avatar_path' => $path]); } event(new UserRegistered($user)); Cache::tags(['users'])->flush(); Log::info('User created', ['id' => $user->id]); return redirect()->route('users.show', $user) ->with('success', 'User created successfully'); } public function show(User $user) { $user->load(['posts' => function($query) { $query->latest()->limit(10); }, 'permissions', 'roles']); $stats = [ 'posts_count' => $user->posts()->count(), 'comments_count' => $user->comments()->count(), 'last_login' => $user->last_login_at?->diffForHumans(), ]; return view('users.show', compact('user', 'stats')); } public function update(Request $request, User $user) { $this->authorize('update', $user); $validated = $request->validate([ 'name' => 'sometimes|string|max:255', 'email' => ['sometimes', 'email', Rule::unique('users')->ignore($user)], 'bio' => 'nullable|string|max:1000', ]); DB::transaction(function() use ($user, $validated, $request) { $user->update($validated); if ($request->hasFile('avatar')) { $path = $request->file('avatar')->store('avatars', 'public'); $user->update(['avatar_path' => $path]); } }); Cache::tags(['users'])->flush(); return back()->with('success', 'Profile updated'); } public function destroy(User $user) { $this->authorize('delete', $user); DB::transaction(function() use ($user) { $user->posts()->delete(); $user->comments()->delete(); $user->tokens()->delete(); $user->delete(); }); Cache::tags(['users'])->flush(); return redirect()->route('users.index'); } protected function getActiveUsers() { return Cache::remember('active_users', 3600, function() { return User::where('is_active', true) ->where('last_login_at', '>=', now()->subDays(30)) ->with('roles') ->get(); }); } }`;

/* ── Background typing lines – trimmed for speed ── */
const BG_LINES = [
  '<?php',
  'namespace App\\Http\\Controllers;',
  '',
  'use Illuminate\\Http\\Request;',
  'use App\\Models\\User;',
  'use Illuminate\\Support\\Facades\\Auth;',
  'use Illuminate\\Support\\Facades\\Hash;',
  'use Illuminate\\Support\\Facades\\DB;',
  'use Illuminate\\Support\\Facades\\Cache;',
  'use Illuminate\\Support\\Facades\\Log;',
  '',
  'class UserController extends Controller',
  '{',
  '    public function __construct()',
  '    {',
  '        $this->middleware(\'auth\');',
  '        $this->middleware(\'verified\')->only(\'store\');',
  '    }',
  '',
  '    public function index(Request $request)',
  '    {',
  '        $search = $request->input(\'search\');',
  '        $users = Cache::remember("users_page_{$request->page}_{$search}", 3600, function() use ($search) {',
  '            return User::query()',
  '                ->when($search, function($q) use ($search) {',
  '                    $q->where(\'name\', \'like\', "%{$search}%")',
  '                      ->orWhere(\'email\', \'like\', "%{$search}%");',
  '                })',
  '                ->with([\'roles\', \'permissions\'])',
  '                ->latest()',
  '                ->paginate(15);',
  '        });',
  '',
  '        return view(\'users.index\', compact(\'users\'));',
  '    }',
  '',
  '    public function store(Request $request)',
  '    {',
  '        $validated = $request->validate([',
  '            \'name\' => \'required|string|max:255\',',
  '            \'email\' => \'required|email|unique:users\',',
  '            \'password\' => \'required|min:8|confirmed\',',
  '            \'role\' => \'required|exists:roles,name\',',
  '        ]);',
  '',
  '        return DB::transaction(function() use ($validated) {',
  '            $user = User::create([',
  '                \'name\' => $validated[\'name\'],',
  '                \'email\' => $validated[\'email\'],',
  '                \'password\' => Hash::make($validated[\'password\']),',
  '            ]);',
  '',
  '            $user->assignRole($validated[\'role\']);',
  '            Log::info("New user registered: {$user->email}");',
  '            ',
  '            return redirect()->route(\'users.show\', $user)',
  '                ->with(\'success\', \'User created successfully\');',
  '        });',
  '    }',
  '',
  '    public function show(User $user)',
  '    {',
  '        $user->load([\'posts\' => function($q) { $q->latest()->limit(5); }, \'roles\']);',
  '        return view(\'users.show\', compact(\'user\'));',
  '    }',
  '',
  '    public function update(Request $request, User $user)',
  '    {',
  '        $this->authorize(\'update\', $user);',
  '        ',
  '        $validated = $request->validate([',
  '            \'name\' => \'sometimes|string|max:255\',',
  '            \'bio\' => \'nullable|string|max:1000\',',
  '            \'avatar\' => \'nullable|image|max:1024\',',
  '        ]);',
  '',
  '        if ($request->hasFile(\'avatar\')) {',
  '            $path = $request->file(\'avatar\')->store(\'avatars\', \'public\');',
  '            $user->avatar_url = $path;',
  '        }',
  '',
  '        $user->update($validated);',
  '        Cache::tags([\'users\'])->flush();',
  '',
  '        return back()->with(\'status\', \'profile-updated\');',
  '    }',
  '',
  '    public function destroy(User $user)',
  '    {',
  '        $this->authorize(\'delete\', $user);',
  '        $user->delete();',
  '        return redirect()->route(\'users.index\');',
  '    }',
  '}',
];

/* ── Timing ── */
const REVEAL_DELAY = 1200;
const REVEAL_DURATION = 800;

/* ── Simple PHP syntax highlighter ── */
function highlightLine(line) {
  if (!line) return '\u00A0';
  let html = line
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  html = html
    .replace(/(\/\/.*)$/gm, '<span class="syn-cmt">$1</span>')
    .replace(/(&lt;\?php)/g, '<span class="syn-tag">$1</span>')
    .replace(/('(?:[^'\\]|\\.)*')/g, '<span class="syn-str">$1</span>')
    .replace(/("(?:[^"\\]|\\.)*")/g, '<span class="syn-str">$1</span>')
    .replace(/\b(namespace|use|class|extends|implements|public|private|protected|function|return|new|if|else|elseif|foreach|as|static|const|throw|try|catch|finally|fn)\b/g, '<span class="syn-kw">$1</span>')
    .replace(/(\$[a-zA-Z_]\w*)/g, '<span class="syn-var">$1</span>')
    .replace(/(->|=>|::)/g, '<span class="syn-op">$1</span>')
    .replace(/\b(\d+)\b/g, '<span class="syn-num">$1</span>');
  return html;
}

/* ── Floating particles data ── */
const FLOAT_PARTICLES = [
  '$user', '=>', '::', '->', 'function', '{', '}', 'class',
  '$request', 'return', 'public', '<?php', 'Route', 'Auth',
  'Cache', '$data', 'DB', 'Hash', 'validate', '[]',
];

/* ── Main Component ── */
const Hero = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const startTimeRef = useRef(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const [phase, setPhase] = useState('init'); // init → portrait → revealed
  const [canvasOpacity, setCanvasOpacity] = useState(0);
  const [heroReady, setHeroReady] = useState(false);

  /* ── Trigger hero entrance after a short mount delay ── */
  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  /* ── Background code typing – faster tick ── */
  useEffect(() => {
    let lineIdx = 0;
    const startTimer = setTimeout(() => {
      setPhase('portrait');
      setCanvasOpacity(1);
    }, 200);

    const isMobile = window.innerWidth <= 768;
    const interval = setInterval(() => {
      lineIdx++;
      setVisibleLines(lineIdx);
      if (lineIdx >= BG_LINES.length) {
        clearInterval(interval);
      }
    }, isMobile ? 15 : 30);

    return () => {
      clearInterval(interval);
      clearTimeout(startTimer);
    };
  }, []);

  /* ── Canvas portrait animation ── */
  useEffect(() => {
    if (phase !== 'portrait') return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/profile.jpg';

    img.onload = () => {
      const off = document.createElement('canvas');
      const offCtx = off.getContext('2d');
      const imgAspect = img.width / img.height;
      let drawW, drawH;
      if (w / h > imgAspect) {
        drawH = h * 0.92;
        drawW = drawH * imgAspect;
      } else {
        drawW = w * 0.92;
        drawH = drawW / imgAspect;
      }
      const ox = (w - drawW) / 2;
      const oy = (h - drawH) / 2;
      off.width = Math.floor(drawW);
      off.height = Math.floor(drawH);
      offCtx.drawImage(img, 0, 0, off.width, off.height);
      const data = offCtx.getImageData(0, 0, off.width, off.height);

      const fontSize = Math.max(5, Math.min(8, w / 45));
      const cw2 = fontSize * 0.58;
      const ch2 = fontSize * 1.08;
      const cols = Math.floor(drawW / cw2);
      const rows = Math.floor(drawH / ch2);
      const chars = PHP_CODE.replace(/\n/g, ' ').split('');
      let ci = 0;
      const particles = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const px = Math.floor(c * cw2);
          const py = Math.floor(r * ch2);
          if (px >= off.width || py >= off.height) continue;
          const idx = (py * off.width + px) * 4;
          const red = data.data[idx];
          const green = data.data[idx + 1];
          const blue = data.data[idx + 2];
          const alpha = data.data[idx + 3];
          if (alpha < 40) continue;

          const brightness = (red * 0.299 + green * 0.587 + blue * 0.114) / 255;
          const ch3 = chars[ci % chars.length];
          ci++;
          if (ch3 === ' ' && brightness < 0.1) continue;

          const norm = (r / rows) * 0.5 + (c / cols) * 0.5;
          const delay = norm * 900 + Math.random() * 200;
          const angle = Math.random() * Math.PI * 2;
          const dist = 100 + Math.random() * 250;

          particles.push({
            tx: ox + px, ty: oy + py,
            sx: ox + px + Math.cos(angle) * dist,
            sy: oy + py + Math.sin(angle) * dist,
            sz: Math.random() * 400 - 200,
            char: ch3,
            r: red, g: green, b: blue,
            brightness, delay, fontSize,
          });
        }
      }

      startTimeRef.current = performance.now();

      const animate = (ts) => {
        const elapsed = ts - startTimeRef.current;
        ctx.clearRect(0, 0, w, h);
        ctx.textBaseline = 'top';
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        if (elapsed > REVEAL_DELAY) {
          const revT = Math.min(1, (elapsed - REVEAL_DELAY) / REVEAL_DURATION);
          setCanvasOpacity(1 - revT * 0.92);
          if (revT >= 1) {
            setPhase('revealed');
          }
        }

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const rawT = (elapsed - p.delay) / 800;
          if (rawT < -0.02) continue;
          const t = Math.max(0, Math.min(1, rawT));
          const ease = 1 - Math.pow(1 - t, 3);
          const x = p.sx + (p.tx - p.sx) * ease;
          const y = p.sy + (p.ty - p.sy) * ease;
          const z = p.sz * (1 - ease);

          let fx = 0, fy = 0;
          if (t >= 1) {
            const tm = (elapsed - p.delay - 800) * 0.001;
            fx = Math.sin(tm * 0.4 + p.tx * 0.008) * 1;
            fy = Math.cos(tm * 0.35 + p.ty * 0.008) * 1;
          }

          const op = ease * Math.max(0.2, Math.min(1, p.brightness * 1.5));
          if (op < 0.02) continue;

          const persp = 800;
          const scale = persp / (persp + z);
          const px2 = z * 0.01;
          const dx = x + mx * px2 + fx;
          const dy = y + my * px2 + fy;

          ctx.globalAlpha = op;
          ctx.font = `${p.fontSize * scale}px 'Fira Code',monospace`;
          ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`;
          ctx.fillText(p.char, dx, dy);

          if (p.brightness > 0.6 && t > 0.5) {
            ctx.globalAlpha = op * 0.15;
            ctx.shadowColor = `rgb(${p.r},${p.g},${p.b})`;
            ctx.shadowBlur = 6;
            ctx.fillText(p.char, dx, dy);
            ctx.shadowBlur = 0;
          }
        }

        ctx.globalAlpha = 1;
        if (phase !== 'revealed') {
          animRef.current = requestAnimationFrame(animate);
        }
      };

      animRef.current = requestAnimationFrame(animate);
    };

    // Simplistic cleanup, no 3D tilt required anymore
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [phase]);

  return (
    <section id="home" className={`hero ${heroReady ? 'hero--entered' : ''}`}>
      {/* ── Background typing code ── */}
      <div className="hero-bg-code" aria-hidden="true">
        <div className="bg-code-inner">
          {BG_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className="bg-code-line"
              style={{ animationDelay: `${Math.min(i * 0.005, 0.2)}s` }}
            >
              <span className="bg-line-num">{String(i + 1).padStart(2, '0')}</span>
              <span
                className="bg-line-text"
                dangerouslySetInnerHTML={{ __html: highlightLine(line) }}
              />
            </div>
          ))}
          <span className={`bg-cursor ${visibleLines < BG_LINES.length ? 'blink' : 'hide'}`}>▊</span>
        </div>
      </div>

      {/* ── Floating particles ── */}
      <div className="hero-float-particles" aria-hidden="true">
        {FLOAT_PARTICLES.map((p, i) => (
          <span
            key={i}
            className="float-p"
            style={{
              '--fx': `${10 + Math.random() * 80}%`,
              '--fy': `${10 + Math.random() * 80}%`,
              '--fd': `${8 + Math.random() * 12}s`,
              '--fdelay': `${Math.random() * 5}s`,
            }}
          >
            {p}
          </span>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="hero-split">
        <div className="hero-text">
          <div className="hero-badge hero-stagger" style={{ '--stagger': 0 }}>
            <span className="badge-dot" />
            <span>Available for hire</span>
          </div>
          <p className="role-line hero-stagger" style={{ '--stagger': 1 }}>
            Full-Stack Developer — PHP / Laravel / React
          </p>
          <h1 className="title hero-stagger" style={{ '--stagger': 2 }}>
            Ar Kar<br />Moe Myint
          </h1>
          <p className="description hero-stagger" style={{ '--stagger': 3 }}>
            I build reliable web applications with clean workflows and practical product experience. Based in Yangon, Myanmar.
          </p>
          <p className="hero-cred hero-stagger" style={{ '--stagger': 4 }}>
            My focus is backend-first Laravel systems with clear permissions, secure payment flows, and maintainable architecture.
          </p>
          <div className="hero-actions hero-stagger" style={{ '--stagger': 5 }}>
            <a href="#projects" className="btn btn-primary">View Projects</a>
            <a href="#contact" className="btn btn-secondary glass">Contact</a>
          </div>
        </div>

        {/* ── Portrait ── */}
        <div className="hero-portrait-wrapper hero-stagger" style={{ '--stagger': 1 }}>
          <div className="hero-portrait-container" ref={containerRef}>
            <img
              src="/profile.jpg"
              alt="Ar Kar Moe Myint"
              className="hero-real-photo"
              loading="eager"
            />
            <canvas
              ref={canvasRef}
              className="hero-code-canvas"
              style={{ opacity: canvasOpacity }}
            />
          </div>
          <div className={`hero-canvas-label ${phase === 'revealed' ? 'show' : ''}`}>
            <span className="label-tag">&lt;?php</span> echo "Ar Kar Moe Myint";
          </div>
        </div>
      </div>

      {/* ── Proof strip ── */}
      <div className="proof-strip hero-stagger" style={{ '--stagger': 6 }}>
        <span>4 Real Projects</span>
        <span className="proof-divider" aria-hidden="true">|</span>
        <span>PHP &middot; Laravel &middot; React</span>
        <span className="proof-divider" aria-hidden="true">|</span>
        <span>Yangon, Myanmar</span>
      </div>
    </section>
  );
};

export default Hero;
