'use client';

import {
  Activity,
  ArrowDownRight,
  ArrowRight,
  Compass,
  Menu,
  Pause,
  Play,
  Search,
  Sparkles,
  Volume2,
  VolumeX,
  Waves,
  X,
  Zap,
} from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

type Realm = {
  id: string;
  index: string;
  short: string;
  eyebrow: string;
  title: string;
  italic: string;
  description: string;
  prompt: string;
  stories: string[];
};

const realms: Realm[] = [
  {
    id: 'meadow',
    index: '01',
    short: 'Meadow',
    eyebrow: 'Enchanted Meadow',
    title: 'Where wonder',
    italic: 'takes root.',
    description:
      'Morning light moves through wildflowers and floating lanterns. This is Disney at its most timeless: warm, lyrical and full of possibility.',
    prompt: 'Follow the golden light',
    stories: ['Tangled', 'Sleeping Beauty', 'Tinker Bell'],
  },
  {
    id: 'ocean',
    index: '02',
    short: 'Ocean',
    eyebrow: 'Ocean of Adventure',
    title: 'Go beyond',
    italic: 'the horizon.',
    description:
      'The page slips beneath the surface. Light bends, bubbles rise and every current points toward a new story waiting to be discovered.',
    prompt: 'Dive into adventure',
    stories: ['Moana', 'The Little Mermaid', 'Lilo & Stitch'],
  },
  {
    id: 'city',
    index: '03',
    short: 'City',
    eyebrow: 'City of Heroes',
    title: 'Courage changes',
    italic: 'the skyline.',
    description:
      'Glass, steel and electric light replace the soft landscape. Signals, sparks and a pulse of red turn the journey into a heroic cityscape.',
    prompt: 'Enter the action',
    stories: ['Avengers', 'Big Hero 6', 'Spider-Man'],
  },
  {
    id: 'sands',
    index: '04',
    short: 'Sands',
    eyebrow: 'Sands of Wonder',
    title: 'A wish can',
    italic: 'change everything.',
    description:
      'The noise falls away. Warm dunes, deep indigo skies and drifting stardust create a quieter chapter filled with mystery and possibility.',
    prompt: 'Follow the starlit path',
    stories: ['Aladdin', 'Jasmine', 'A Whole New World'],
  },
  {
    id: 'frost',
    index: '05',
    short: 'Frost',
    eyebrow: 'The Frozen North',
    title: 'Let your true',
    italic: 'colours show.',
    description:
      'A crystalline world catches every movement. Frost blooms at the edges while the centre stays clear, bright and emotionally warm.',
    prompt: 'Step into the unknown',
    stories: ['Frozen', 'Frozen II', 'Olaf Presents'],
  },
  {
    id: 'cosmic',
    index: '06',
    short: 'Cosmic',
    eyebrow: 'Galactic Frontier',
    title: 'Stories reach',
    italic: 'beyond the stars.',
    description:
      'The final portal opens into deep space. Constellations, orbital trails and distant colour make the Disney universe feel genuinely limitless.',
    prompt: 'Launch into the galaxy',
    stories: ['Star Wars', 'WALL-E', 'Lightyear'],
  },
];

const hubLinks = [
  { id: 'watch', label: 'Watch', title: 'Stories for tonight', text: 'Find films and series across every realm.', image: 'cosmic' },
  { id: 'visit', label: 'Visit', title: 'Magic in the real world', text: 'Explore parks, cruises and live experiences.', image: 'lanterns' },
  { id: 'play', label: 'Play', title: 'Be part of the adventure', text: 'Games, activities and worlds made to explore.', image: 'city' },
  { id: 'shop', label: 'Shop', title: 'Take wonder with you', text: 'Characters, collections and gifts for every fan.', image: 'meadow' },
];

function ParticleCanvas({ mode }: { mode: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let animationFrame = 0;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      drift: number;
      alpha: number;
      phase: number;
    }> = [];

    const palette: Record<string, string> = {
      meadow: '245, 214, 134',
      ocean: '155, 229, 255',
      city: '255, 85, 89',
      sands: '255, 215, 142',
      frost: '221, 247, 255',
      cosmic: '205, 185, 255',
    };

    function resize() {
      if (!canvas || !context) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = reduceMotion ? 0 : width < 720 ? 42 : 108;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 1.1 + Math.random() * 3.9,
        speed: 0.3 + Math.random() * 1.08,
        drift: -0.42 + Math.random() * 0.84,
        alpha: 0.25 + Math.random() * 0.62,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function drawParticle(particle: (typeof particles)[number]) {
      if (!context) return;
      const color = palette[mode] || palette.meadow;
      context.save();
      context.globalAlpha = particle.alpha;
      context.strokeStyle = `rgba(${color}, .9)`;
      context.fillStyle = `rgba(${color}, .9)`;
      context.translate(particle.x, particle.y);

      if (mode === 'city') {
        context.rotate(-0.55);
        context.fillRect(0, 0, particle.size * 8, Math.max(0.75, particle.size * 0.42));
      } else if (mode === 'ocean') {
        context.beginPath();
        context.arc(0, 0, particle.size * 1.7, 0, Math.PI * 2);
        context.stroke();
      } else if (mode === 'frost') {
        context.beginPath();
        context.moveTo(-particle.size * 2, 0);
        context.lineTo(particle.size * 2, 0);
        context.moveTo(0, -particle.size * 2);
        context.lineTo(0, particle.size * 2);
        context.stroke();
      } else if (mode === 'meadow') {
        context.rotate(Math.sin(frame * 0.01 + particle.phase));
        context.beginPath();
        context.ellipse(0, 0, particle.size * 1.9, particle.size * 0.75, 0, 0, Math.PI * 2);
        context.fill();
      } else {
        context.beginPath();
        context.arc(0, 0, particle.size, 0, Math.PI * 2);
        context.fill();
      }
      context.restore();
    }

    function animate() {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      frame += 1;

      particles.forEach((particle) => {
        const direction = mode === 'ocean' || mode === 'cosmic' ? -1 : 1;
        particle.y += particle.speed * direction;
        particle.x += particle.drift + Math.sin(frame * 0.008 + particle.phase) * 0.18;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;
        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        drawParticle(particle);
      });

      animationFrame = window.requestAnimationFrame(animate);
    }

    resize();
    if (!reduceMotion) animate();
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  }, [mode]);

  return <canvas ref={canvasRef} className="magic-particles" aria-hidden="true" />;
}

function MagicCursor({ mode }: { mode: string }) {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (!cursor || !trail || reduced || coarse) return;

    let lastX = 0;
    let lastY = 0;
    let lastSpark = 0;
    const onMove = (event: PointerEvent) => {
      cursor.style.opacity = '1';
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      const now = performance.now();
      const distance = Math.hypot(event.clientX - lastX, event.clientY - lastY);
      if (distance > 13 && now - lastSpark > 42) {
        const spark = document.createElement('i');
        spark.className = 'cursor-spark';
        spark.style.left = `${event.clientX}px`;
        spark.style.top = `${event.clientY}px`;
        spark.style.setProperty('--spark-x', `${((event.clientX * 17) % 44) - 22}px`);
        spark.style.setProperty('--spark-y', `${-18 - ((event.clientY * 11) % 34)}px`);
        spark.style.setProperty('--spark-size', `${4 + ((event.clientX + event.clientY) % 8)}px`);
        trail.appendChild(spark);
        window.setTimeout(() => spark.remove(), 950);
        lastSpark = now;
      }
      lastX = event.clientX;
      lastY = event.clientY;
    };
    const onLeave = () => { cursor.style.opacity = '0'; };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={trailRef} className={`cursor-trail cursor-trail--${mode}`} aria-hidden="true" />
      <div ref={cursorRef} className={`magic-cursor magic-cursor--${mode}`} aria-hidden="true">
        <span>✦</span><i />
      </div>
    </>
  );
}

function EffectParticles({ count, className }: { count: number; className: string }) {
  return Array.from({ length: count }, (_, index) => (
    <i
      key={index}
      className={className}
      style={{
        '--i': index,
        '--x': `${(index * 37 + 11) % 100}%`,
        '--y': `${(index * 53 + 7) % 100}%`,
        '--delay': `${-(index % 11) * .41}s`,
        '--duration': `${3.2 + (index % 7) * .63}s`,
        '--scale': .58 + (index % 5) * .24,
      } as CSSProperties}
    />
  ));
}

function RealmEffects({ realm }: { realm: string }) {
  return (
    <div className={`realm-fx realm-fx--${realm}`} aria-hidden="true">
      {realm === 'meadow' && (
        <>
          <div className="magic-comet"><i /><i /><i /></div>
          <div className="lantern-field"><EffectParticles count={14} className="fx-lantern" /></div>
          <div className="glitter-field"><EffectParticles count={30} className="fx-glitter" /></div>
        </>
      )}
      {realm === 'ocean' && (
        <>
          <div className="wave-stack"><i /><i /><i /><i /></div>
          <div className="caustic-ribbons"><i /><i /><i /><i /><i /></div>
          <div className="bubble-field"><EffectParticles count={34} className="fx-bubble" /></div>
          <div className="depth-scan"><span>Surface +04m</span><i /></div>
        </>
      )}
      {realm === 'city' && (
        <>
          <div className="speed-field"><EffectParticles count={24} className="fx-speed" /></div>
          <div className="energy-core"><i /><i /><i /><span /></div>
          <div className="action-flash" />
          <div className="hero-reticle"><i /><i /><i /><i /><span>Threat scan · active</span></div>
        </>
      )}
      {realm === 'sands' && (
        <>
          <div className="heat-bands"><i /><i /><i /></div>
          <div className="sand-whirl"><EffectParticles count={34} className="fx-dust" /></div>
          <div className="wish-star"><i /><span>Make a wish</span></div>
        </>
      )}
      {realm === 'frost' && (
        <>
          <div className="frost-prism"><i /><i /><i /></div>
          <div className="snow-field"><EffectParticles count={38} className="fx-snow" /></div>
          <div className="ice-scan"><i /><span>Crystal resonance</span></div>
        </>
      )}
      {realm === 'cosmic' && (
        <>
          <div className="warp-field"><EffectParticles count={38} className="fx-warp" /></div>
          <div className="shooting-stars"><i /><i /><i /><i /></div>
          <div className="galaxy-orbit"><i /><i /><i /><span /></div>
          <div className="star-coordinate">RA 05h 34m · DEC +22° 01′</div>
        </>
      )}
    </div>
  );
}

function RealmSection({ realm, side }: { realm: Realm; side: 'left' | 'right' }) {
  return (
    <section
      className={`realm-section realm--${realm.id}`}
      id={realm.id}
      data-realm={realm.id}
      aria-labelledby={`${realm.id}-title`}
    >
      <div className="realm-stage">
        <div className="realm-backdrop" data-parallax aria-hidden="true" />
        <div className="realm-shade" aria-hidden="true" />
        <div className="realm-light" aria-hidden="true" />
        <div className="realm-texture" aria-hidden="true" />
        <RealmEffects realm={realm.id} />

        <div className={`realm-content realm-content--${side}`}>
          <div className="realm-number" aria-hidden="true">{realm.index}</div>
          <p className="realm-eyebrow">{realm.eyebrow}</p>
          <h2 id={`${realm.id}-title`}>{realm.title}<br /><em>{realm.italic}</em></h2>
          <p className="realm-description">{realm.description}</p>
          <div className="story-links" aria-label={`Featured stories in ${realm.eyebrow}`}>
            {realm.stories.map((story) => <span key={story}>{story}</span>)}
          </div>
          <a className="realm-cta" href="#story-hub">
            {realm.prompt} <ArrowDownRight aria-hidden="true" size={19} />
          </a>
        </div>

        <a
          className={`story-marker story-marker--${side === 'left' ? 'right' : 'left'}`}
          href="#story-hub"
          aria-label={`Explore ${realm.stories[0]}`}
        >
          <span className="marker-pulse" aria-hidden="true"><i /><b /><em /></span>
          <div>
            <small>Story signal</small>
            <strong>{realm.stories[0]}</strong>
            <span>Open this story portal ↗</span>
          </div>
        </a>

        <nav
          className={`story-orbits story-orbits--${side === 'left' ? 'right' : 'left'}`}
          aria-label={`Story portals in ${realm.eyebrow}`}
        >
          {realm.stories.map((story, index) => (
            <a key={story} className={`story-orb story-orb--${index + 1}`} href="#story-hub" aria-label={`Explore ${story}`}>
              <span>0{index + 1}</span><small>{story}</small>
            </a>
          ))}
        </nav>

        <div className="section-coordinate" aria-hidden="true">
          <span>Realm {realm.index}</span>
          <i />
          <span>{realm.short}</span>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [activeRealm, setActiveRealm] = useState('meadow');
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [autoTour, setAutoTour] = useState(false);
  const [fxMax, setFxMax] = useState(true);
  const audioRef = useRef<AudioContext | null>(null);
  const autoIndexRef = useRef(0);

  useEffect(() => {
    const realmSections = Array.from(document.querySelectorAll<HTMLElement>('[data-realm]'));
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('.realm-section, .reveal'));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('has-entered');
        });
      },
      { threshold: 0.13 },
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        document.documentElement.style.setProperty('--journey-progress', String(window.scrollY / max));
        let nextRealm = 'meadow';
        realmSections.forEach((section) => {
          const bounds = section.getBoundingClientRect();
          if (bounds.top <= window.innerHeight * .52 && bounds.bottom >= window.innerHeight * .48) {
            nextRealm = section.dataset.realm || 'meadow';
          }
        });
        setActiveRealm((current) => current === nextRealm ? current : nextRealm);
        document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((element) => {
          const stage = element.parentElement;
          if (!stage) return;
          const bounds = stage.getBoundingClientRect();
          const shift = Math.max(-1, Math.min(1, (bounds.top + bounds.height / 2 - window.innerHeight / 2) / window.innerHeight));
          element.style.setProperty('--section-shift', String(shift));
        });
        ticking = false;
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--mouse-x', String(event.clientX / window.innerWidth - 0.5));
      document.documentElement.style.setProperty('--mouse-y', String(event.clientY / window.innerHeight - 0.5));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      revealObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointerMove);
      void audioRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (!autoTour) return;
    let timer = 0;
    const advance = () => {
      if (autoIndexRef.current >= realms.length) {
        document.getElementById('story-hub')?.scrollIntoView({ behavior: 'smooth' });
        setAutoTour(false);
        return;
      }
      document.getElementById(realms[autoIndexRef.current].id)?.scrollIntoView({ behavior: 'smooth' });
      autoIndexRef.current += 1;
    };
    timer = window.setTimeout(advance, 350);
    const interval = window.setInterval(advance, 5600);
    return () => {
      window.clearTimeout(timer);
      window.clearInterval(interval);
    };
  }, [autoTour]);

  const toggleSound = async () => {
    if (soundOn) {
      await audioRef.current?.close();
      audioRef.current = null;
      setSoundOn(false);
      return;
    }

    const AudioContextClass = window.AudioContext;
    const context = new AudioContextClass();
    const master = context.createGain();
    const filter = context.createBiquadFilter();
    const first = context.createOscillator();
    const second = context.createOscillator();
    const lfo = context.createOscillator();
    const lfoGain = context.createGain();

    master.gain.value = 0.018;
    filter.type = 'lowpass';
    filter.frequency.value = 720;
    first.type = 'sine';
    first.frequency.value = 164.81;
    second.type = 'sine';
    second.frequency.value = 246.94;
    lfo.frequency.value = 0.09;
    lfoGain.gain.value = 0.009;
    lfo.connect(lfoGain);
    lfoGain.connect(master.gain);
    first.connect(filter);
    second.connect(filter);
    filter.connect(master);
    master.connect(context.destination);
    first.start();
    second.start();
    lfo.start();
    audioRef.current = context;
    setSoundOn(true);
  };

  const toggleAutoTour = () => {
    if (!autoTour) {
      autoIndexRef.current = Math.max(0, realms.findIndex((realm) => realm.id === activeRealm));
    }
    setAutoTour((value) => !value);
  };

  const activeRealmData = realms.find((realm) => realm.id === activeRealm) || realms[0];

  return (
    <main className={`site-shell theme--${activeRealm} ${fxMax ? 'fx--max' : 'fx--soft'}`}>
      <div className="journey-progress" aria-hidden="true"><i /></div>
      <ParticleCanvas mode={activeRealm} />
      <MagicCursor mode={activeRealm} />

      <header className="site-header" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Disney concept home">
          <img src="/assets/disney-logo.png" width="190" height="80" alt="Disney" />
        </a>

        <nav className="primary-nav" aria-label="Primary">
          <a className="is-active" href="#realm-map">Explore</a>
          <a href="#watch">Watch</a>
          <a href="#visit">Visit</a>
          <a href="#play">Play</a>
        </nav>

        <div className="header-actions">
          <button className="search-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Open realm finder">
            <Search aria-hidden="true" size={17} />
          </button>
          <button className="sound-toggle" type="button" onClick={toggleSound} aria-label={soundOn ? 'Turn ambient sound off' : 'Turn ambient sound on'}>
            {soundOn ? <Volume2 aria-hidden="true" size={17} /> : <VolumeX aria-hidden="true" size={17} />}
            <span>Sound {soundOn ? 'on' : 'off'}</span>
          </button>
          <button className="menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu aria-hidden="true" size={21} />
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X aria-hidden="true" /></button>
        <span>Choose a destination</span>
        {realms.map((realm) => (
          <a key={realm.id} href={`#${realm.id}`} onClick={() => setMenuOpen(false)}>
            <small>{realm.index}</small>{realm.eyebrow}
          </a>
        ))}
      </div>

      <nav className="realm-rail" aria-label="Realm journey">
        <span className="rail-title"><Compass aria-hidden="true" size={15} /> Your journey</span>
        <div className="rail-track" aria-hidden="true"><i /></div>
        {realms.map((realm) => (
          <a
            key={realm.id}
            className={activeRealm === realm.id ? 'is-active' : ''}
            href={`#${realm.id}`}
            aria-label={realm.eyebrow}
          >
            <i aria-hidden="true" />
            <span>{realm.short}</span>
          </a>
        ))}
      </nav>

      <aside className="experience-hud" aria-label="Experience controls">
        <div className="hud-live">
          <Activity aria-hidden="true" size={15} />
          <span>Live realm</span>
          <strong>{activeRealmData.short}</strong>
        </div>
        <div className="hud-readout" aria-hidden="true">
          <i /><i /><i /><i /><i />
        </div>
        <button type="button" onClick={toggleAutoTour} aria-pressed={autoTour}>
          {autoTour ? <Pause aria-hidden="true" size={14} /> : <Play aria-hidden="true" size={14} />}
          {autoTour ? 'Pause journey' : 'Auto journey'}
        </button>
        <button type="button" onClick={() => setFxMax((value) => !value)} aria-pressed={fxMax}>
          {fxMax ? <Zap aria-hidden="true" size={14} /> : <Waves aria-hidden="true" size={14} />}
          FX {fxMax ? 'MAX' : 'SOFT'}
        </button>
      </aside>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-image hero-image--meadow" aria-hidden="true" />
        <div className="hero-image hero-image--ocean" aria-hidden="true" />
        <div className="hero-image hero-image--city" aria-hidden="true" />
        <div className="hero-image hero-image--cosmic" aria-hidden="true" />
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />

        <div className="hero-copy">
          <p className="eyebrow"><Sparkles aria-hidden="true" size={15} /> A world made of stories</p>
          <h1 id="hero-title">One Castle.<br /><em>Many Realms.</em></h1>
          <p className="hero-intro">
            Journey from enchanted meadows to oceans, cities and stars—each world
            changing around you as Disney stories come alive.
          </p>
          <div className="hero-actions">
            <a className="primary-cta" href="#realm-map">Begin the journey <ArrowDownRight aria-hidden="true" size={20} /></a>
            <a className="text-cta" href="#realm-map">View all realms <ArrowRight aria-hidden="true" size={16} /></a>
          </div>
        </div>

        <aside className="journey-card" aria-label="Journey introduction">
          <span className="journey-index">01 / 06</span>
          <div>
            <strong>Enchanted Meadow</strong>
            <span>Where every path begins with a little wonder.</span>
          </div>
        </aside>

        <div className="portal-orbit" aria-hidden="true">
          <span className="orbit orbit--outer" />
          <span className="orbit orbit--inner" />
          <span className="orbit-star">✦</span>
        </div>

        <a className="scroll-cue" href="#realm-map">
          <span>Scroll to travel</span>
          <i aria-hidden="true" />
        </a>
      </section>

      <section className="realm-map reveal" id="realm-map" aria-labelledby="realm-map-title">
        <div className="map-intro">
          <p className="section-kicker">The story map</p>
          <h2 id="realm-map-title">Six worlds.<br /><em>One seamless journey.</em></h2>
          <p>
            Each realm has its own colour, texture and movement. Scroll naturally,
            or choose a destination and step through the portal.
          </p>
        </div>
        <div className="map-grid">
          {realms.map((realm) => (
            <a key={realm.id} className={`map-gate map-gate--${realm.id}`} href={`#${realm.id}`}>
              <span>{realm.index}</span>
              <div>
                <small>{realm.eyebrow}</small>
                <strong>{realm.short}</strong>
              </div>
              <ArrowDownRight aria-hidden="true" size={20} />
            </a>
          ))}
        </div>
        <div className="map-instruction" aria-hidden="true">
          <span>Start here</span><i /><Sparkles size={14} />
        </div>
      </section>

      {realms.map((realm, index) => (
        <RealmSection key={realm.id} realm={realm} side={index % 2 === 0 ? 'left' : 'right'} />
      ))}

      <section className="story-hub reveal" id="story-hub" aria-labelledby="hub-title">
        <div className="hub-backdrop" aria-hidden="true" />
        <div className="hub-intro">
          <p className="section-kicker">Your Disney, your way</p>
          <h2 id="hub-title">Where will the story<br /><em>take you next?</em></h2>
          <p>
            The journey ends by reconnecting every realm to the things people come
            to Disney for: watching, visiting, playing and bringing stories home.
          </p>
        </div>

        <div className="hub-links">
          {hubLinks.map((item, index) => (
            <a key={item.id} className={`hub-link hub-link--${item.image}`} id={item.id} href="#top">
              <span className="hub-index">0{index + 1}</span>
              <div>
                <small>{item.label}</small>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
              <ArrowRight aria-hidden="true" size={22} />
            </a>
          ))}
        </div>
      </section>

      <section className="finale reveal" aria-labelledby="finale-title">
        <div className="finale-halo" aria-hidden="true">
          <i /><i /><i />
        </div>
        <img src="/assets/disney-logo.png" width="190" height="80" alt="" aria-hidden="true" />
        <p>Every story begins with a little wonder.</p>
        <h2 id="finale-title">Your next adventure<br /><em>is waiting.</em></h2>
        <a className="primary-cta primary-cta--dark" href="#realm-map">
          Explore the realms <Compass aria-hidden="true" size={18} />
        </a>
      </section>

      <footer className="site-footer">
        <div className="footer-brand">
          <img src="/assets/disney-logo.png" width="190" height="80" alt="Disney" />
          <p>An independent portfolio redesign concept exploring a more immersive Disney homepage.</p>
        </div>
        <div className="footer-links">
          <a href="#realm-map">Explore</a>
          <a href="#watch">Watch</a>
          <a href="#visit">Visit</a>
          <a href="#play">Play</a>
          <a href="#shop">Shop</a>
        </div>
        <div className="footer-meta">
          <span>Concept direction: One Castle. Many Realms.</span>
          <span>Unofficial student portfolio work · 2026</span>
        </div>
      </footer>
    </main>
  );
}
