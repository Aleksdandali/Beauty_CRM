import { useState, useEffect, useRef, useMemo } from "react";

/* ═══════════════════════════════════════════════════
   SHINE SHOP — VALENTINE'S DAY BANNER PRO
   Level: 10x PROFESSIONAL
   Features: 3D Parallax, Particles, Glassmorphism, 
             Countdown, Carousel, Advanced Animations
═══════════════════════════════════════════════════ */

// ─── Types ───
interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  badge?: string;
  component: () => JSX.Element;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
}

// ─── SVG Products (Enhanced with filters) ───
function Frezer1() {
  return (
    <svg viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <filter id="f1-glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="f1body" x1="28" y1="88" x2="172" y2="192">
          <stop stopColor="#F8F4F0" />
          <stop offset=".5" stopColor="#F0ECE8" />
          <stop offset="1" stopColor="#D8D2CC" />
        </linearGradient>
        <radialGradient id="f1shine" cx=".3" cy=".3">
          <stop stopColor="#fff" stopOpacity=".8" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="f1knob" x1="101" y1="138" x2="129" y2="166">
          <stop stopColor="#F8F2EC" />
          <stop offset="1" stopColor="#C8C0B8" />
        </linearGradient>
        <linearGradient id="f1hp" x1="26" y1="170" x2="86" y2="186">
          <stop stopColor="#6A6570" />
          <stop offset="1" stopColor="#4A4550" />
        </linearGradient>
      </defs>
      
      {/* Body with glow */}
      <ellipse cx="100" cy="140" rx="72" ry="52" fill="url(#f1body)" filter="url(#f1-glow)" />
      <ellipse cx="100" cy="140" rx="72" ry="52" fill="url(#f1shine)" opacity=".4" />
      <ellipse cx="100" cy="136" rx="65" ry="46" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="1.5" />
      
      {/* Vents with shimmer */}
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x={72 + i * 12} y="108" width="4" height="2" rx="1" fill="rgba(255,255,255,.12)" />
          <rect x={72 + i * 12} y="108" width="4" height="0.5" rx="0.5" fill="rgba(255,255,255,.3)" />
        </g>
      ))}
      
      {/* Enhanced knob */}
      <circle cx="115" cy="152" r="14" fill="url(#f1knob)" />
      <circle cx="115" cy="152" r="10" fill="#E8E4E0" />
      <circle cx="115" cy="152" r="8" fill="url(#f1knob)" />
      <circle cx="113" cy="150" r="2" fill="rgba(255,255,255,.6)" />
      
      {/* Animated LED */}
      <circle cx="85" cy="148" r="3" fill="#22C55E" opacity=".9">
        <animate attributeName="opacity" values=".9;.4;.9" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="85" cy="148" r="6" fill="#22C55E" opacity=".2">
        <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
      </circle>
      
      {/* Handpiece */}
      <rect x="26" y="170" width="60" height="16" rx="8" fill="url(#f1hp)" />
      <rect x="16" y="168" width="30" height="20" rx="6" fill="#5A5560" />
      <rect x="16" y="168" width="30" height="4" rx="2" fill="rgba(255,255,255,.1)" />
      <rect x="6" y="175" width="14" height="6" rx="2" fill="#4A4550" />
      
      {/* Enhanced cord with gradient */}
      <path d="M86 178 C100 200, 140 195, 150 165 C158 140, 168 120, 165 105" 
            stroke="url(#cordGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M86 178 C100 200, 140 195, 150 165 C158 140, 168 120, 165 105" 
            stroke="rgba(255,255,255,.08)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      
      <linearGradient id="cordGrad" x1="86" y1="178" x2="165" y2="105">
        <stop stopColor="#3A3540" />
        <stop offset="1" stopColor="#2A2530" />
      </linearGradient>
      
      {/* Holder */}
      <path d="M132 110 L128 95 L142 95 L138 110" fill="rgba(220,200,240,.3)" 
            stroke="rgba(255,255,255,.15)" strokeWidth="1" />
      
      {/* Enhanced shadow */}
      <ellipse cx="100" cy="210" rx="65" ry="10" fill="rgba(80,40,60,.1)" />
      <ellipse cx="100" cy="210" rx="50" ry="6" fill="rgba(80,40,60,.06)" />
    </svg>
  );
}

function Frezer2() {
  return (
    <svg viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <filter id="f2-glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="f2body" x1="56" y1="100" x2="144" y2="220">
          <stop stopColor="#F0ECE8" />
          <stop offset=".5" stopColor="#E0D8D0" />
          <stop offset="1" stopColor="#C0B8B0" />
        </linearGradient>
        <linearGradient id="f2base" x1="55" y1="215" x2="145" y2="245">
          <stop stopColor="#F5F0EC" />
          <stop offset="1" stopColor="#D8D0C8" />
        </linearGradient>
      </defs>
      
      {/* Base */}
      <path d="M55 230 C55 245, 145 245, 145 230 L145 220 C145 215, 55 215, 55 220 Z" 
            fill="url(#f2base)" filter="url(#f2-glow)" />
      <ellipse cx="100" cy="220" rx="45" ry="8" fill="rgba(255,255,255,.08)" />
      
      {/* Body */}
      <rect x="56" y="100" width="88" height="120" rx="16" fill="url(#f2body)" filter="url(#f2-glow)" />
      <rect x="56" y="100" width="88" height="120" rx="16" fill="url(#f2bodyShine)" opacity=".25" />
      
      {/* Vents pattern */}
      {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
        <circle key={i} 
                cx={122 + (i % 4) * 5} 
                cy={135 + Math.floor(i / 4) * 5} 
                r="1.2" 
                fill="rgba(0,0,0,.12)" />
      ))}
      
      {/* Panel */}
      <rect x="62" y="106" width="44" height="108" rx="8" fill="#2A2830" />
      <rect x="62" y="106" width="44" height="108" rx="8" fill="url(#f2panelGrad)" opacity=".4" />
      
      {/* Display with glow */}
      <rect x="72" y="115" width="24" height="16" rx="3" fill="#0A0A0F" />
      <rect x="72" y="115" width="24" height="16" rx="3" fill="#FF3030" opacity=".05">
        <animate attributeName="opacity" values=".05;.12;.05" dur="1.5s" repeatCount="indefinite" />
      </rect>
      <text x="84" y="127" textAnchor="middle" fill="#FF3030" fontSize="10" 
            fontFamily="monospace" fontWeight="700">8.8</text>
      
      {/* Knob with ring */}
      <circle cx="84" cy="145" r="11" fill="none" stroke="rgba(232,25,77,.35)" strokeWidth="1.5">
        <animateTransform attributeName="transform" type="rotate" 
                          from="0 84 145" to="360 84 145" dur="20s" repeatCount="indefinite" />
      </circle>
      <circle cx="84" cy="145" r="9" fill="#E8E0D8" />
      <circle cx="84" cy="145" r="7" fill="url(#f2knobGrad)" />
      <circle cx="86" cy="143" r="1.5" fill="rgba(255,255,255,.5)" />
      
      {/* Buttons with states */}
      {[165, 178, 191].map((y, i) => (
        <g key={i}>
          <circle cx={74 + (i % 2) * 20} cy={y} r="5.5" fill="rgba(0,0,0,.15)" />
          <circle cx={74 + (i % 2) * 20} cy={y} r="5" fill="rgba(255,255,255,.08)" 
                  stroke="rgba(255,255,255,.12)" strokeWidth=".5" />
          <circle cx={74 + (i % 2) * 20} cy={y} r="2" fill="rgba(255,255,255,.1)" />
        </g>
      ))}
      
      {/* Handpiece */}
      <rect x="62" y="225" width="76" height="10" rx="5" fill="#2A2830" />
      <rect x="55" y="222" width="50" height="8" rx="4" fill="#1A1820" />
      <rect x="55" y="222" width="50" height="2" rx="1" fill="rgba(255,255,255,.06)" />
      <rect x="42" y="223" width="16" height="6" rx="2" fill="#3A3540" />
      
      {/* Shadow layers */}
      <ellipse cx="100" cy="248" rx="50" ry="8" fill="rgba(80,40,60,.08)" />
      <ellipse cx="100" cy="248" rx="35" ry="5" fill="rgba(80,40,60,.04)" />
      
      <radialGradient id="f2bodyShine" cx=".3" cy=".2">
        <stop stopColor="#fff" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="f2panelGrad" x1="62" y1="106" x2="106" y2="214">
        <stop stopColor="#4A4850" />
        <stop offset="1" stopColor="#1A1820" />
      </linearGradient>
      <linearGradient id="f2knobGrad" x1="77" y1="138" x2="91" y2="152">
        <stop stopColor="#F5EDE5" />
        <stop offset="1" stopColor="#C8C0B8" />
      </linearGradient>
    </svg>
  );
}

function Sterilizer() {
  return (
    <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <filter id="st-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <linearGradient id="stBody" x1="20" y1="40" x2="200" y2="170">
          <stop stopColor="#F8F4F0" />
          <stop offset=".5" stopColor="#F0ECE8" />
          <stop offset="1" stopColor="#E0D8D0" />
        </linearGradient>
        <linearGradient id="stLid" x1="16" y1="32" x2="204" y2="48">
          <stop stopColor="#FBF7F3" />
          <stop offset="1" stopColor="#E8E2DC" />
        </linearGradient>
      </defs>
      
      {/* Main body */}
      <rect x="20" y="40" width="180" height="130" rx="8" fill="url(#stBody)" filter="url(#st-glow)" />
      <rect x="20" y="40" width="180" height="130" rx="8" fill="url(#stShine)" opacity=".3" />
      
      {/* Lid */}
      <rect x="16" y="32" width="188" height="16" rx="4" fill="url(#stLid)" />
      <rect x="16" y="32" width="188" height="16" rx="4" fill="url(#stLidShine)" opacity=".2" />
      
      {/* Handle */}
      <rect x="90" y="26" width="40" height="8" rx="4" fill="#D8D0C8" />
      <rect x="90" y="26" width="40" height="3" rx="1.5" fill="rgba(255,255,255,.3)" />
      
      {/* Lock mechanism */}
      <circle cx="110" cy="40" r="4.5" fill="#C8C0B8" stroke="rgba(255,255,255,.15)" strokeWidth="1" />
      <circle cx="110" cy="40" r="2.5" fill="#B0A8A0" />
      <circle cx="111" cy="39" r="0.8" fill="rgba(255,255,255,.4)" />
      
      {/* Panel */}
      <path d="M30 60 Q30 55, 35 55 L90 55 Q95 55, 95 60 L95 155 Q95 160, 90 160 L35 160 Q30 160, 30 155 Z" 
            fill="url(#stPanelGrad)" opacity=".95" />
      
      {/* Branding */}
      <text x="62" y="78" textAnchor="middle" fill="rgba(100,80,120,.6)" 
            fontSize="8" fontWeight="600" fontStyle="italic" letterSpacing="1">MicroSTOP</text>
      <text x="62" y="95" textAnchor="middle" fill="rgba(100,80,120,.8)" 
            fontSize="16" fontWeight="800">M-2</text>
      
      {/* Temperature display with glow */}
      <rect x="40" y="110" width="44" height="20" rx="3" fill="#0A0A0F" />
      <rect x="40" y="110" width="44" height="20" rx="3" fill="#22C55E" opacity=".03">
        <animate attributeName="opacity" values=".03;.08;.03" dur="2s" repeatCount="indefinite" />
      </rect>
      <text x="62" y="124" textAnchor="middle" fill="#22C55E" 
            fontSize="10" fontFamily="monospace" fontWeight="700">180°</text>
      
      {/* Status LED */}
      <circle cx="62" cy="142" r="2.8" fill="#22C55E" opacity=".95">
        <animate attributeName="opacity" values=".95;.5;.95" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="62" cy="142" r="5" fill="#22C55E" opacity=".15">
        <animate attributeName="r" values="5;7;5" dur="1.5s" repeatCount="indefinite" />
      </circle>
      
      {/* Timer display */}
      <rect x="140" y="70" width="44" height="24" rx="3" fill="#0A0A0F" />
      <rect x="140" y="70" width="44" height="24" rx="3" fill="#FF6B00" opacity=".04">
        <animate attributeName="opacity" values=".04;.1;.04" dur="1.8s" repeatCount="indefinite" />
      </rect>
      <text x="162" y="86" textAnchor="middle" fill="#FF6B00" 
            fontSize="11" fontFamily="monospace" fontWeight="700">0:30</text>
      
      {/* Vent pattern */}
      {Array.from({length: 20}).map((_, i) => (
        <circle key={i} 
                cx={145 + (i % 5) * 7} 
                cy={105 + Math.floor(i / 5) * 7} 
                r="1" 
                fill="rgba(100,80,120,.08)" />
      ))}
      
      {/* Feet */}
      <rect x="32" y="168" width="12" height="6" rx="3" fill="#1A1820" />
      <rect x="176" y="168" width="12" height="6" rx="3" fill="#1A1820" />
      <rect x="32" y="168" width="12" height="1.5" rx="0.75" fill="rgba(255,255,255,.05)" />
      <rect x="176" y="168" width="12" height="1.5" rx="0.75" fill="rgba(255,255,255,.05)" />
      
      {/* Shadow layers */}
      <ellipse cx="110" cy="180" rx="80" ry="8" fill="rgba(80,40,60,.08)" />
      <ellipse cx="110" cy="180" rx="60" ry="5" fill="rgba(80,40,60,.04)" />
      
      <radialGradient id="stShine" cx=".25" cy=".2">
        <stop stopColor="#fff" stopOpacity=".6" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="stLidShine" cx=".3" cy=".3">
        <stop stopColor="#fff" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="stPanelGrad" x1="30" y1="55" x2="95" y2="160">
        <stop stopColor="rgba(230,210,240,.35)" />
        <stop offset=".5" stopColor="rgba(210,190,230,.2)" />
        <stop offset="1" stopColor="rgba(245,230,240,.25)" />
      </linearGradient>
    </svg>
  );
}

// ─── Heart Component ───
function Heart({ size = 20, opacity = 0.06, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#E8194D" opacity={opacity} className={className}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

// ─── Countdown Timer Component ───
function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="vbp-timer">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="vbp-timer-block">
          <div className="vbp-timer-value">{value.toString().padStart(2, '0')}</div>
          <div className="vbp-timer-label">{unit}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Products Data ───
const PRODUCTS: Product[] = [
  { id: 1, name: "Фрезер Marathon M1", price: 4500, discount: 14, badge: "ТОП", component: Frezer1 },
  { id: 2, name: "Фрезер Strong 210", price: 5200, discount: 14, badge: "ХІТ", component: Frezer2 },
  { id: 3, name: "Стерилізатор MicroSTOP", price: 3800, discount: 14, component: Sterilizer },
];

// ─── Main Banner Component ───
export default function ValentineBannerPro() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(1);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bannerRef.current) return;
    const rect = bannerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  // Initialize particles
  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 8 + Math.random() * 16,
      opacity: 0.02 + Math.random() * 0.06,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.5,
    }));
    setParticles(newParticles);

    // Animate particles
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.vx + 100) % 100,
        y: (p.y + p.vy + 100) % 100,
        rotation: (p.rotation + p.rotationSpeed) % 360,
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Auto-rotate products
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProduct(prev => (prev % PRODUCTS.length));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const targetDate = new Date('2026-02-14T23:59:59');

  return (
    <>
      <style>{CSS}</style>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@600;700;800&family=Unbounded:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      <div className="vbp-wrapper">
        <div 
          ref={bannerRef}
          className={`vbp-main ${isHovered ? 'vbp-hovered' : ''}`}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transform: `perspective(1000px) rotateX(${mousePos.y * 2}deg) rotateY(${mousePos.x * 2}deg)`,
          }}
        >
          {/* Animated gradient mesh */}
          <div className="vbp-mesh" />
          
          {/* Holographic layers */}
          <div className="vbp-shimmer" style={{
            transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
          }} />
          
          {/* Glassmorphism overlay */}
          <div className="vbp-glass" />
          
          {/* Noise texture */}
          <div className="vbp-noise" />

          {/* Particle system */}
          <div className="vbp-particles">
            {particles.map(p => (
              <div
                key={p.id}
                className="vbp-particle"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                  opacity: p.opacity,
                  transform: `rotate(${p.rotation}deg)`,
                }}
              >
                <Heart size={p.size} opacity={1} />
              </div>
            ))}
          </div>

          {/* Corner ornaments */}
          <div className="vbp-ornament vbp-ornament-tl" />
          <div className="vbp-ornament vbp-ornament-tr" />
          <div className="vbp-ornament vbp-ornament-bl" />
          <div className="vbp-ornament vbp-ornament-br" />

          {/* Content */}
          <div className="vbp-content" style={{
            transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
          }}>
            {/* Logo */}
            <div className="vbp-logo">
              <span className="vbp-logo-s">SHINE</span>
              <span className="vbp-logo-h">SHOP</span>
              <div className="vbp-logo-glow" />
            </div>

            {/* Tag */}
            <div className="vbp-tag">
              <span className="vbp-tag-dot" />
              <span className="vbp-tag-text">День закоханих 2026</span>
            </div>

            {/* Title */}
            <h2 className="vbp-title">
              ЗНИЖКИ ДЛЯ<br />
              <span className="vbp-title-accent">ВАШОЇ КРАСИ</span>
            </h2>

            {/* Subtitle */}
            <p className="vbp-sub">
              Професійне обладнання для nail-майстрів<br />
              за найкращими святковими цінами
            </p>

            {/* Discount */}
            <div className="vbp-discount">
              <div className="vbp-disc-main">
                <div className="vbp-disc-num">
                  <span>-14</span>
                  <span className="vbp-disc-percent">%</span>
                </div>
                <div className="vbp-disc-glow" />
              </div>
              <div className="vbp-disc-meta">
                <span className="vbp-disc-label">На обладнання</span>
                <span className="vbp-disc-desc">фрезери · стерилізатори · витяжки</span>
              </div>
            </div>

            {/* Countdown */}
            <div className="vbp-countdown-wrap">
              <div className="vbp-countdown-label">⏰ До кінця акції:</div>
              <CountdownTimer targetDate={targetDate} />
            </div>

            {/* CTA */}
            <button className="vbp-cta">
              <span className="vbp-cta-bg" />
              <span className="vbp-cta-content">
                <span>Обрати зі знижкою</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <span className="vbp-cta-shine" />
            </button>
          </div>

          {/* Products Carousel */}
          <div className="vbp-products" style={{
            transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
          }}>
            <div className="vbp-products-stage">
              {PRODUCTS.map((product, i) => {
                const ProductComponent = product.component;
                const offset = (i - currentProduct + PRODUCTS.length) % PRODUCTS.length;
                const isActive = offset === 0;
                
                return (
                  <div
                    key={product.id}
                    className={`vbp-product ${isActive ? 'vbp-product-active' : ''}`}
                    style={{
                      transform: `
                        translateX(${offset * 100}%)
                        scale(${isActive ? 1 : 0.8})
                        translateZ(${isActive ? '0px' : '-100px'})
                      `,
                      opacity: isActive ? 1 : 0.3,
                      zIndex: isActive ? 10 : 1,
                    }}
                    onClick={() => setCurrentProduct(i)}
                  >
                    {product.badge && (
                      <div className="vbp-product-badge">{product.badge}</div>
                    )}
                    <div className="vbp-product-discount">-{product.discount}%</div>
                    <div className="vbp-product-img">
                      <ProductComponent />
                    </div>
                    <div className="vbp-product-info">
                      <div className="vbp-product-name">{product.name}</div>
                      <div className="vbp-product-prices">
                        <span className="vbp-product-old">{product.price} ₴</span>
                        <span className="vbp-product-new">
                          {Math.round(product.price * (1 - product.discount / 100))} ₴
                        </span>
                      </div>
                    </div>
                    <div className="vbp-product-glow" />
                  </div>
                );
              })}
            </div>

            {/* Carousel dots */}
            <div className="vbp-carousel-dots">
              {PRODUCTS.map((_, i) => (
                <button
                  key={i}
                  className={`vbp-dot ${i === currentProduct ? 'vbp-dot-active' : ''}`}
                  onClick={() => setCurrentProduct(i)}
                />
              ))}
            </div>
          </div>

          {/* Date badge */}
          <div className="vbp-date">
            <span className="vbp-date-line" />
            <span className="vbp-date-text">акція до 14.02.2026</span>
          </div>

          {/* Border */}
          <div className="vbp-border" />
        </div>

        {/* Promo strip */}
        <div className="vbp-strip">
          {[
            { from: 3000, discount: 3 },
            { from: 6000, discount: 5 },
            { from: 10000, discount: 10 },
            { from: 20000, discount: 14, bonus: "🚚 безкоштовна доставка" },
          ].map((tier, i) => (
            <div key={i} className="vbp-strip-item">
              <div className="vbp-strip-badge">-{tier.discount}%</div>
              <div className="vbp-strip-text">
                від {tier.from.toLocaleString('uk-UA')} ₴
                {tier.bonus && <span className="vbp-strip-bonus">{tier.bonus}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── CSS ───
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@600;700;800&family=Unbounded:wght@400;500;600;700;800;900&display=swap');

:root {
  --coral: #E8194D;
  --coral2: #FF6B8A;
  --coral3: #FF8FA3;
  --dark: #0A0A0F;
  --bg-pink: #FFF5F7;
  --bg-pink2: #FFE8EE;
  --text2: #7A6B70;
  --text3: #B09098;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: radial-gradient(ellipse at top, #F8F0EB 0%, #F0E8E3 50%, #E8E0DB 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 32px;
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
}

/* ═══ WRAPPER ═══ */
.vbp-wrapper {
  width: 100%;
  max-width: 1280px;
  position: relative;
}

/* ═══ MAIN BANNER ═══ */
.vbp-main {
  position: relative;
  width: 100%;
  aspect-ratio: 2.5 / 1;
  border-radius: 32px;
  overflow: hidden;
  background: linear-gradient(155deg, 
    var(--bg-pink) 0%, 
    var(--bg-pink2) 25%, 
    #FDDDE6 45%, 
    #F8C8D8 70%, 
    #F0B0C8 90%,
    #E8A0C0 100%
  );
  box-shadow:
    0 2px 8px rgba(0,0,0,.015),
    0 8px 32px rgba(200,100,130,.06),
    0 24px 64px rgba(200,100,130,.04),
    inset 0 1px 0 rgba(255,255,255,.6);
  cursor: pointer;
  transition: all .6s cubic-bezier(.4,0,.2,1);
  transform-style: preserve-3d;
}

.vbp-main.vbp-hovered {
  box-shadow:
    0 4px 12px rgba(0,0,0,.02),
    0 16px 48px rgba(200,100,130,.12),
    0 32px 96px rgba(200,100,130,.08),
    inset 0 1px 0 rgba(255,255,255,.7);
}

/* ─── Animated Gradient Mesh ─── */
.vbp-mesh {
  position: absolute;
  inset: -50%;
  background: 
    radial-gradient(ellipse at 20% 30%, rgba(255,200,220,.15) 0%, transparent 40%),
    radial-gradient(ellipse at 80% 70%, rgba(200,180,255,.12) 0%, transparent 35%),
    radial-gradient(ellipse at 50% 10%, rgba(255,220,230,.18) 0%, transparent 30%),
    radial-gradient(ellipse at 10% 80%, rgba(255,180,210,.1) 0%, transparent 40%);
  animation: vbpMeshFloat 20s ease-in-out infinite;
  z-index: 1;
  pointer-events: none;
}

@keyframes vbpMeshFloat {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(2%, -2%) rotate(1deg); }
  66% { transform: translate(-2%, 2%) rotate(-1deg); }
}

/* ─── Holographic Shimmer ─── */
.vbp-shimmer {
  position: absolute;
  inset: -20%;
  background: 
    radial-gradient(ellipse at 25% 15%, rgba(255,255,255,.7) 0%, transparent 45%),
    radial-gradient(ellipse at 75% 80%, rgba(255,200,220,.3) 0%, transparent 40%),
    radial-gradient(ellipse at 90% 20%, rgba(200,180,255,.15) 0%, transparent 35%);
  z-index: 2;
  pointer-events: none;
  transition: transform .3s ease-out;
}

/* ─── Glassmorphism Overlay ─── */
.vbp-glass {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,.02) 100%);
  backdrop-filter: blur(1px);
  z-index: 3;
  pointer-events: none;
}

/* ─── Noise ─── */
.vbp-noise {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.015'/%3E%3C/svg%3E");
  z-index: 4;
  pointer-events: none;
}

/* ─── Particles ─── */
.vbp-particles {
  position: absolute;
  inset: 0;
  z-index: 5;
  pointer-events: none;
}

.vbp-particle {
  position: absolute;
  transition: all .05s linear;
  will-change: transform, left, top;
}

/* ─── Corner Ornaments ─── */
.vbp-ornament {
  position: absolute;
  width: 80px;
  height: 80px;
  background: radial-gradient(circle at center, rgba(232,25,77,.08) 0%, transparent 70%);
  z-index: 6;
  pointer-events: none;
  animation: vbpPulseGlow 4s ease-in-out infinite;
}

.vbp-ornament-tl { top: 0; left: 0; border-top-left-radius: 32px; }
.vbp-ornament-tr { top: 0; right: 0; border-top-right-radius: 32px; animation-delay: 1s; }
.vbp-ornament-bl { bottom: 0; left: 0; border-bottom-left-radius: 32px; animation-delay: 2s; }
.vbp-ornament-br { bottom: 0; right: 0; border-bottom-right-radius: 32px; animation-delay: 3s; }

@keyframes vbpPulseGlow {
  0%, 100% { opacity: 1; }
  50% { opacity: .4; }
}

/* ═══ CONTENT ═══ */
.vbp-content {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 48%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 56px 64px;
  z-index: 20;
  transition: transform .2s ease-out;
}

/* ─── Logo ─── */
.vbp-logo {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: 0;
  margin-bottom: 32px;
  animation: vbpSlideDown .8s cubic-bezier(.4,0,.2,1);
}

@keyframes vbpSlideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

.vbp-logo-s, .vbp-logo-h {
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  font-size: 22px;
  letter-spacing: -.8px;
  position: relative;
  z-index: 2;
}

.vbp-logo-s {
  color: var(--dark);
  text-shadow: 0 2px 4px rgba(10,10,15,.04);
}

.vbp-logo-h {
  color: var(--coral);
  margin-left: 6px;
  animation: vbpLogoShine 3s ease-in-out infinite;
}

@keyframes vbpLogoShine {
  0%, 100% { text-shadow: 0 2px 8px rgba(232,25,77,.2); }
  50% { text-shadow: 0 2px 16px rgba(232,25,77,.4), 0 0 24px rgba(232,25,77,.2); }
}

.vbp-logo-glow {
  position: absolute;
  inset: -8px;
  background: radial-gradient(ellipse at 60% 50%, rgba(232,25,77,.12) 0%, transparent 70%);
  filter: blur(12px);
  z-index: 1;
  animation: vbpPulseGlow 3s ease-in-out infinite;
}

/* ─── Tag ─── */
.vbp-tag {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(232,25,77,.06);
  border: 1.5px solid rgba(232,25,77,.15);
  border-radius: 100px;
  padding: 8px 20px;
  width: fit-content;
  margin-bottom: 24px;
  backdrop-filter: blur(8px);
  animation: vbpSlideDown .8s cubic-bezier(.4,0,.2,1) .1s backwards;
}

.vbp-tag-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--coral);
  box-shadow: 0 0 8px rgba(232,25,77,.5);
  animation: vbpPulseDot 2s ease-in-out infinite;
}

@keyframes vbpPulseDot {
  0%, 100% { opacity: 1; transform: scale(1); box-shadow: 0 0 8px rgba(232,25,77,.5); }
  50% { opacity: .6; transform: scale(.8); box-shadow: 0 0 4px rgba(232,25,77,.3); }
}

.vbp-tag-text {
  font-family: 'Unbounded', cursive;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--coral);
  text-shadow: 0 1px 2px rgba(232,25,77,.1);
}

/* ─── Title ─── */
.vbp-title {
  font-family: 'Unbounded', cursive;
  font-weight: 900;
  font-size: clamp(28px, 3.2vw, 44px);
  line-height: 1.08;
  color: var(--dark);
  letter-spacing: -1px;
  margin-bottom: 16px;
  text-shadow: 0 2px 8px rgba(10,10,15,.03);
  animation: vbpSlideDown .8s cubic-bezier(.4,0,.2,1) .2s backwards;
}

.vbp-title-accent {
  color: var(--coral);
  position: relative;
  display: inline-block;
  animation: vbpTitleShine 4s ease-in-out infinite;
}

@keyframes vbpTitleShine {
  0%, 100% { text-shadow: 0 2px 12px rgba(232,25,77,.25); }
  50% { text-shadow: 0 4px 24px rgba(232,25,77,.45), 0 0 32px rgba(232,25,77,.2); }
}

.vbp-title-accent::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--coral), var(--coral2), var(--coral3));
  border-radius: 2px;
  opacity: .35;
  animation: vbpUnderlineGrow .8s cubic-bezier(.4,0,.2,1) .5s backwards;
}

@keyframes vbpUnderlineGrow {
  from { transform: scaleX(0); transform-origin: left; }
  to { transform: scaleX(1); }
}

/* ─── Subtitle ─── */
.vbp-sub {
  font-size: clamp(13px, 1.3vw, 15px);
  color: var(--text2);
  font-weight: 400;
  line-height: 1.7;
  margin-bottom: 32px;
  max-width: 340px;
  animation: vbpSlideDown .8s cubic-bezier(.4,0,.2,1) .3s backwards;
}

/* ─── Discount ─── */
.vbp-discount {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
  animation: vbpSlideDown .8s cubic-bezier(.4,0,.2,1) .4s backwards;
}

.vbp-disc-main {
  position: relative;
}

.vbp-disc-num {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 800;
  font-size: clamp(48px, 5.5vw, 76px);
  line-height: 1;
  color: var(--coral);
  letter-spacing: -4px;
  position: relative;
  z-index: 2;
  display: flex;
  align-items: baseline;
  text-shadow: 0 4px 16px rgba(232,25,77,.2);
  animation: vbpNumberPulse 3s ease-in-out infinite;
}

@keyframes vbpNumberPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.vbp-disc-percent {
  font-size: 0.6em;
  margin-left: 4px;
}

.vbp-disc-glow {
  position: absolute;
  inset: -20px;
  background: radial-gradient(ellipse at center, rgba(232,25,77,.25) 0%, transparent 70%);
  filter: blur(24px);
  z-index: 1;
  animation: vbpPulseGlow 3s ease-in-out infinite;
}

.vbp-disc-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.vbp-disc-label {
  font-family: 'Unbounded', cursive;
  font-size: 12px;
  font-weight: 700;
  color: var(--dark);
  letter-spacing: .5px;
}

.vbp-disc-desc {
  font-size: 11px;
  color: var(--text3);
  font-weight: 400;
}

/* ─── Countdown Timer ─── */
.vbp-countdown-wrap {
  margin-bottom: 32px;
  animation: vbpSlideDown .8s cubic-bezier(.4,0,.2,1) .5s backwards;
}

.vbp-countdown-label {
  font-size: 11px;
  color: var(--text3);
  margin-bottom: 12px;
  font-weight: 500;
  letter-spacing: .3px;
}

.vbp-timer {
  display: flex;
  gap: 12px;
}

.vbp-timer-block {
  background: rgba(255,255,255,.5);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(232,25,77,.12);
  border-radius: 12px;
  padding: 12px 16px;
  min-width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 8px rgba(200,100,130,.06);
}

.vbp-timer-value {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 800;
  font-size: 20px;
  color: var(--coral);
  letter-spacing: -1px;
  line-height: 1;
}

.vbp-timer-label {
  font-size: 9px;
  color: var(--text3);
  text-transform: uppercase;
  letter-spacing: .5px;
  font-weight: 600;
}

/* ─── CTA Button ─── */
.vbp-cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 36px;
  border-radius: 16px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: .3px;
  border: none;
  cursor: pointer;
  width: fit-content;
  overflow: hidden;
  animation: vbpSlideDown .8s cubic-bezier(.4,0,.2,1) .6s backwards;
}

.vbp-cta-bg {
  position: absolute;
  inset: 0;
  background: var(--dark);
  border-radius: 16px;
  transition: all .4s cubic-bezier(.4,0,.2,1);
  z-index: 1;
}

.vbp-cta:hover .vbp-cta-bg {
  background: linear-gradient(135deg, var(--dark) 0%, #1A1A20 100%);
  transform: scale(1.02);
}

.vbp-cta-content {
  position: relative;
  z-index: 2;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 10px;
}

.vbp-cta svg {
  width: 16px;
  height: 16px;
  transition: transform .3s cubic-bezier(.4,0,.2,1);
}

.vbp-cta:hover svg {
  transform: translateX(4px);
}

.vbp-cta-shine {
  position: absolute;
  inset: -100%;
  background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,.15) 50%, transparent 100%);
  transform: translateX(-100%) translateY(-100%) rotate(45deg);
  transition: transform .6s cubic-bezier(.4,0,.2,1);
  z-index: 3;
  pointer-events: none;
}

.vbp-cta:hover .vbp-cta-shine {
  transform: translateX(100%) translateY(100%) rotate(45deg);
}

/* ═══ PRODUCTS CAROUSEL ═══ */
.vbp-products {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 52%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 32px;
  z-index: 15;
  transition: transform .2s ease-out;
}

.vbp-products-stage {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-style: preserve-3d;
  perspective: 1200px;
}

.vbp-product {
  position: absolute;
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all .8s cubic-bezier(.4,0,.2,1);
  transform-style: preserve-3d;
}

.vbp-product-active {
  pointer-events: auto;
}

.vbp-product-badge {
  position: absolute;
  top: 12px;
  right: 20px;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #1A1A20;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 800;
  font-size: 11px;
  padding: 6px 14px;
  border-radius: 10px;
  letter-spacing: .5px;
  box-shadow: 0 4px 12px rgba(255,215,0,.3);
  z-index: 10;
  animation: vbpBadgeBounce 2s ease-in-out infinite;
}

@keyframes vbpBadgeBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

.vbp-product-discount {
  position: absolute;
  top: 12px;
  left: 20px;
  background: var(--coral);
  color: #fff;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 10px;
  letter-spacing: -.5px;
  box-shadow: 0 4px 12px rgba(232,25,77,.3);
  z-index: 10;
}

.vbp-product-img {
  width: 100%;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 8px 24px rgba(80,40,60,.12));
  transition: filter .4s;
  margin-bottom: 20px;
}

.vbp-product:hover .vbp-product-img {
  filter: drop-shadow(0 12px 32px rgba(80,40,60,.18));
}

.vbp-product-info {
  text-align: center;
  z-index: 2;
}

.vbp-product-name {
  font-family: 'Unbounded', cursive;
  font-size: 13px;
  font-weight: 700;
  color: var(--dark);
  margin-bottom: 8px;
  letter-spacing: -.3px;
}

.vbp-product-prices {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.vbp-product-old {
  font-size: 13px;
  color: var(--text3);
  text-decoration: line-through;
  font-weight: 400;
}

.vbp-product-new {
  font-family: 'JetBrains Mono', monospace;
  font-size: 18px;
  font-weight: 800;
  color: var(--coral);
  letter-spacing: -.5px;
}

.vbp-product-glow {
  position: absolute;
  inset: -40px;
  background: radial-gradient(ellipse at center, rgba(232,25,77,.15) 0%, transparent 60%);
  filter: blur(32px);
  z-index: -1;
  opacity: 0;
  transition: opacity .4s;
}

.vbp-product-active .vbp-product-glow {
  opacity: 1;
}

/* ─── Carousel Dots ─── */
.vbp-carousel-dots {
  display: flex;
  gap: 10px;
  margin-top: 24px;
}

.vbp-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(232,25,77,.2);
  border: none;
  cursor: pointer;
  transition: all .3s;
  padding: 0;
}

.vbp-dot-active {
  background: var(--coral);
  width: 24px;
  border-radius: 4px;
}

/* ═══ DATE BADGE ═══ */
.vbp-date {
  position: absolute;
  bottom: 24px;
  left: 64px;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: vbpSlideUp .8s cubic-bezier(.4,0,.2,1) .7s backwards;
}

@keyframes vbpSlideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.vbp-date-line {
  width: 28px;
  height: 1.5px;
  background: linear-gradient(90deg, var(--coral), var(--text3));
}

.vbp-date-text {
  font-family: 'Unbounded', cursive;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text3);
}

/* ═══ BORDER ═══ */
.vbp-border {
  position: absolute;
  inset: 0;
  border-radius: 32px;
  border: 1.5px solid rgba(232,25,77,.08);
  z-index: 50;
  pointer-events: none;
  transition: border-color .4s;
}

.vbp-main.vbp-hovered .vbp-border {
  border-color: rgba(232,25,77,.15);
}

/* ═══ PROMO STRIP ═══ */
.vbp-strip {
  margin-top: 16px;
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  animation: vbpSlideUp .8s cubic-bezier(.4,0,.2,1) .8s backwards;
}

.vbp-strip-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: rgba(255,255,255,.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(232,25,77,.1);
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(200,100,130,.04);
  transition: all .3s cubic-bezier(.4,0,.2,1);
}

.vbp-strip-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(200,100,130,.08);
  border-color: rgba(232,25,77,.18);
}

.vbp-strip-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  font-weight: 800;
  color: var(--coral);
  letter-spacing: -.5px;
}

.vbp-strip-text {
  font-size: 12px;
  color: var(--text2);
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.vbp-strip-bonus {
  font-size: 10px;
  color: var(--text3);
}

/* ═══ RESPONSIVE ═══ */
@media (max-width: 1024px) {
  .vbp-main { aspect-ratio: 2 / 1; }
  .vbp-content { width: 55%; padding: 40px 48px; }
  .vbp-products { width: 45%; padding: 32px 24px; }
  .vbp-product { width: 220px; }
  .vbp-product-img { height: 200px; }
}

@media (max-width: 768px) {
  .vbp-main { 
    aspect-ratio: auto; 
    min-height: 640px;
  }
  .vbp-content { 
    width: 100%; 
    padding: 32px 28px 280px; 
  }
  .vbp-products { 
    width: 100%; 
    top: auto; 
    bottom: 0; 
    height: 280px; 
    padding: 0 20px 20px;
  }
  .vbp-product { width: 160px; }
  .vbp-product-img { height: 140px !important; }
  .vbp-timer { gap: 8px; }
  .vbp-timer-block { 
    min-width: 50px; 
    padding: 10px 12px; 
  }
  .vbp-timer-value { font-size: 16px; }
  .vbp-date { left: 28px; bottom: auto; top: calc(100% - 260px); }
}

@media (max-width: 480px) {
  body { padding: 16px; }
  .vbp-main { border-radius: 24px; min-height: 580px; }
  .vbp-content { padding: 24px 20px 260px; }
  .vbp-logo-s, .vbp-logo-h { font-size: 18px; }
  .vbp-title { font-size: 24px; }
  .vbp-disc-num { font-size: 44px; }
  .vbp-cta { padding: 14px 28px; font-size: 13px; }
  .vbp-strip { gap: 8px; }
  .vbp-strip-item { padding: 10px 14px; font-size: 11px; }
  .vbp-timer-block { min-width: 44px; padding: 8px 10px; }
  .vbp-timer-value { font-size: 14px; }
}
`;
