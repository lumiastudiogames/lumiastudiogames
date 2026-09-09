/* ==========================================================================
   LumiaStudio Portfolio - Interactive JavaScript Engine
   ========================================================================== */

// Detailed Game Information Database
const GAMES_DATABASE = [
  {
    id: "derby-destruction",
    title: "Demolition Derby: Crash Arena 3D",
    genre: "Racing",
    badgeType: "badge-gold",
    badgeLabel: "3D Crash & Demolition Derby",
    image: "./assets/derby_destruction.jpg",
    folder: "./derby-destruction-3d/index.html",
    tagline: "Smash opponent cars in high-octane 3D arenas with realistic deformation physics and garage tuning!",
    description: "Demolition Derby: Crash Arena 3D is a full 3D vehicular combat and destruction derby game featuring high-impact collision physics, dynamic chassis deformation, 4 distinct battle arenas (including car soccer!), boss fights, and deep garage upgrades.",
    tags: ["3D Physics Engine", "Vehicle Deformation", "Custom Garage", "Boss Battles"],
    features: [
      "Real-time 3D rigid body crash physics and dynamic bodywork deformation",
      "4 action-packed battle arenas: Mud Pit Oval, Figure-8 Cross, Dark Forest & Car Soccer",
      "Massive MegaMonster Truck arena boss encounter",
      "Deep garage customization: V8 Engines, Armor Plating, Spiked Bumpers & Nitro Boosts",
      "Smooth 60 FPS performance with full keyboard, mouse, and mobile touch controls"
    ]
  },
  {
    id: "tribal-wars",
    title: "Remix Tribal Wars: Merge",
    genre: "Strategy",
    badgeType: "badge-cyan",
    badgeLabel: "Chibi Strategy & Merge",
    image: "./assets/tribal_wars.jpg",
    folder: "./remix-tribal-wars_-merge/index.html",
    tagline: "Unleash chibi warriors through strategic card merging and slingshot battlefield launches!",
    description: "Remix Tribal Wars is a vibrant tactical battle simulator combining card-merging mechanics with precision slingshot unit launching. Command chibi tribal factions, merge recruit cards into elite warriors, and storm enemy fortresses.",
    tags: ["Card Merge", "Chibi Pixel Art", "Tactical Physics", "Wave Defense"],
    features: [
      "Merge card crafting system to create upgraded champion units",
      "Dynamic slingshot launcher for precision battle tactical deployment",
      "Chibi pixel art graphics with vibrant tribal animations",
      "Strategic resource management and wave-based boss fights",
      "Multiple tribal clans with unique elemental abilities"
    ]
  },
  {
    id: "star-sector",
    title: "Star Sector: Void Raiders",
    genre: "Action",
    badgeType: "badge-purple",
    badgeLabel: "Arcade Space Shooter",
    image: "./assets/star_sector.jpg",
    folder: "./star-sector_-void-raiders/index.html",
    tagline: "Blast through deep space with procedural upgrades, custom audio, and high-speed dogfights!",
    description: "Star Sector: Void Raiders is an adrenaline-fueled space shooter equipped with custom Web Audio synthesis, procedural weapon upgrades, an interactive ship hangar, and high-velocity space dogfights.",
    tags: ["Web Audio Engine", "Space Dogfights", "Hangar Customization", "Sci-Fi Action"],
    features: [
      "Custom synthesized Web Audio engine for zero-lag dynamic soundscapes",
      "Dynamic tactical wingman radio providing real-time combat status and briefings",
      "Deep ship hangar upgrades: plasma cannons, shield boosters & drones",
      "Procedural wave generation with intense boss encounters",
      "High-velocity bullet-hell space combat"
    ]
  },
  {
    id: "zombie-survivor",
    title: "Topdown Survivor: Zombie Maze",
    genre: "Survival",
    badgeType: "badge-emerald",
    badgeLabel: "Survival Stealth Puzzle",
    image: "./assets/zombie_survivor.jpg",
    folder: "./topdown-survivor_-zombie-maze-strategy/index.html",
    tagline: "Navigate 45 intense stealth survival levels using real-time path-drawing and tactical combat!",
    description: "Topdown Survivor combines tactical maze navigation with horror stealth. Draw your escape routes in real time, manage limited 9mm ammo, and utilize flashlight vision cones to evade lurking zombie hordes.",
    tags: ["45 Tactical Levels", "Path-Drawing Mechanics", "Flashlight Stealth", "9mm Combat"],
    features: [
      "45 handcrafted stealth maze levels with dynamic zombie patrol routines",
      "Innovative real-time path-drawing mechanic for tactical movement",
      "Flashlight fog-of-war vision cone requiring careful stealth planning",
      "Resource scavenging: 9mm ammo, keycards, and medical kits",
      "Challenging environmental puzzle traps and escape routes"
    ]
  },
  {
    id: "trapecave",
    title: "TRAPECAVE - Tricky Caves Gravity",
    genre: "Platformer",
    badgeType: "badge-gold",
    badgeLabel: "Gravity Flip Rage Platformer",
    image: "./assets/trapecave.jpg",
    folder: "./trapecave---crazygames/index.html",
    tagline: "Conquer 100 level-devil style troll levels packed with gravity flips and hidden traps!",
    description: "TRAPECAVE is a retro precision rage platformer featuring 100 troll-filled levels. Expect unexpected floor collapses, inverted gravity zones, and sudden spike traps designed to test your reflexes and persistence.",
    tags: ["100 Troll Levels", "Gravity Flip", "Level Devil Style", "Retro 8-Bit"],
    features: [
      "100 brutal troll levels filled with tricky gravity-shifting mechanics",
      "Dynamic gravity flip fields that invert floor and ceiling platforming",
      "Instant quick-respawn engine for fast speedrunning attempts",
      "Hidden trap triggers, vanishing platforms, and surprise obstacles",
      "Charming retro 8-bit visual art style and nostalgic chiptune vibe"
    ]
  },
  {
    id: "trench-war",
    title: "Trench War WWI",
    genre: "Strategy",
    badgeType: "badge-pink",
    badgeLabel: "8-Bit Military Defense",
    image: "./assets/trench_war.jpg",
    folder: "./trench-war-wwi/index.html",
    tagline: "Master trench conquest, artillery strikes, and squad deployment in classic 8-bit warfare!",
    description: "Trench War WWI is an authentic retro base-defense and trench warfare strategy game. Deploy riflemen, machine gunners, and officers across battlefields, command artillery strikes, and conquer enemy trenches.",
    tags: ["WWI Trench Conquest", "Multi-Unit Waves", "Artillery Strikes", "Tech Upgrades"],
    features: [
      "Authentic trench-by-trench conquest strategy gameplay",
      "Multiple unit classes: Infantry, Heavy Gunners, Officers & Snipers",
      "Devastating artillery bombardments and tactical air support",
      "Command bunker tech upgrades to bolster front-line defenses",
      "Detailed 8-bit pixel art war aesthetic with epic battle sound SFX"
    ]
  }
];

// Carousel State
let currentIndex = 0;
let autoPlayInterval = null;
const totalGames = GAMES_DATABASE.length;

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  initParticleCanvas();
  renderCarouselCards();
  renderGamesGrid("all");
  setupEventListeners();
  updateCarouselState();
  startAutoPlay();
});

/* ==========================================================================
   3D Carousel Implementation
   ========================================================================== */
function renderCarouselCards() {
  const track = document.getElementById("carousel-track");
  const dotsContainer = document.getElementById("carousel-dots");

  if (!track || !dotsContainer) return;

  track.innerHTML = "";
  dotsContainer.innerHTML = "";

  GAMES_DATABASE.forEach((game, index) => {
    // Card Element
    const card = document.createElement("div");
    card.className = `carousel-card`;
    card.setAttribute("data-index", index);

    card.innerHTML = `
      <div class="card-media">
        <img src="${game.image}" alt="${game.title}">
        <div class="card-media-overlay"></div>
        <div class="card-badge-container">
          <span class="badge ${game.badgeType}">${game.badgeLabel}</span>
        </div>
      </div>
      <div class="card-body">
        <div class="card-title-row">
          <h3 class="card-title">${game.title}</h3>
        </div>
        <p class="card-desc">${game.description}</p>
        <div class="card-footer">
          <div class="card-tags">
            ${game.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <div style="display:flex; gap:10px;">
            <button class="btn btn-glass" onclick="openGameModal('${game.id}')" style="padding: 8px 16px; font-size: 0.8rem;">
              <i class="fa-solid fa-circle-info"></i> Details
            </button>
            <a href="${game.folder}" target="_blank" class="btn btn-primary" style="padding: 8px 18px; font-size: 0.8rem;">
              <i class="fa-solid fa-gamepad"></i> Play
            </a>
          </div>
        </div>
      </div>
    `;

    track.appendChild(card);

    // Indicator Dot Element
    const dot = document.createElement("div");
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
}

function updateCarouselState() {
  const cards = document.querySelectorAll(".carousel-card");
  const dots = document.querySelectorAll(".dot");

  cards.forEach((card, i) => {
    card.className = "carousel-card";

    // Calculate relative index wrapped around 6 cards
    let offset = (i - currentIndex + totalGames) % totalGames;
    if (offset > totalGames / 2) offset -= totalGames;

    if (offset === 0) {
      card.classList.add("active");
    } else if (offset === 1) {
      card.classList.add("next");
    } else if (offset === -1) {
      card.classList.add("prev");
    } else if (offset === 2) {
      card.classList.add("far-next");
    } else if (offset === -2) {
      card.classList.add("far-prev");
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalGames;
  updateCarouselState();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + totalGames) % totalGames;
  updateCarouselState();
}

function goToSlide(index) {
  currentIndex = index;
  updateCarouselState();
}

function startAutoPlay() {
  stopAutoPlay();
  autoPlayInterval = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
  if (autoPlayInterval) clearInterval(autoPlayInterval);
}

/* ==========================================================================
   Filterable Games Grid
   ========================================================================== */
function renderGamesGrid(filter = "all") {
  const grid = document.getElementById("games-grid");
  if (!grid) return;

  grid.innerHTML = "";

  const filteredGames = filter === "all" 
    ? GAMES_DATABASE 
    : GAMES_DATABASE.filter(game => {
        if (filter.toLowerCase() === "racing") {
          return game.genre.toLowerCase() === "racing";
        }
        return game.genre.toLowerCase() === filter.toLowerCase();
      });

  filteredGames.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-grid-card";
    card.innerHTML = `
      <div class="grid-card-media">
        <img src="${game.image}" alt="${game.title}">
        <div style="position: absolute; top: 16px; left: 16px;">
          <span class="badge ${game.badgeType}">${game.genre}</span>
        </div>
      </div>
      <div class="grid-card-body">
        <div>
          <h3 class="grid-card-title">${game.title}</h3>
          <p class="grid-card-desc">${game.tagline}</p>
        </div>
        <div class="grid-card-actions">
          <button class="btn btn-glass" onclick="openGameModal('${game.id}')" style="padding: 10px 18px; font-size: 0.8rem;">
            Quick View
          </button>
          <a href="${game.folder}" target="_blank" class="btn btn-primary" style="padding: 10px 20px; font-size: 0.8rem;">
            Play Game
          </a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ==========================================================================
   Game Detail Quick-View Modal
   ========================================================================== */
function openGameModal(gameId) {
  const game = GAMES_DATABASE.find(g => g.id === gameId);
  if (!game) return;

  const backdrop = document.getElementById("game-modal-backdrop");
  const modalBody = document.getElementById("modal-dynamic-content");

  if (!backdrop || !modalBody) return;

  modalBody.innerHTML = `
    <div class="modal-header-banner">
      <img src="${game.image}" alt="${game.title}">
      <div class="modal-banner-overlay"></div>
    </div>
    <div class="modal-body">
      <div class="modal-meta-row">
        <span class="badge ${game.badgeType}">${game.badgeLabel}</span>
        <span class="tag"><i class="fa-solid fa-gamepad"></i> LumiaStudio Title</span>
      </div>
      <h2 class="modal-game-title">${game.title}</h2>
      <p class="modal-text">${game.description}</p>

      <h3 class="modal-section-heading">Key Features & Gameplay</h3>
      <ul class="modal-features-list">
        ${game.features.map(feat => `<li><i class="fa-solid fa-circle-check"></i> ${feat}</li>`).join('')}
      </ul>

      <h3 class="modal-section-heading">Technology & Architecture</h3>
      <div class="card-tags" style="gap: 10px; margin-top: 10px;">
        ${game.tags.map(t => `<span class="tag" style="padding: 6px 12px; font-size: 0.85rem;">${t}</span>`).join('')}
      </div>

      <div class="modal-actions-row">
        <a href="${game.folder}" target="_blank" class="btn btn-primary" style="padding: 14px 32px;">
          <i class="fa-solid fa-play"></i> Launch Game Now
        </a>
        <button class="btn btn-glass" onclick="closeGameModal()">
          Close Window
        </button>
      </div>
    </div>
  `;

  backdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeGameModal() {
  const backdrop = document.getElementById("game-modal-backdrop");
  if (backdrop) backdrop.classList.remove("active");
  document.body.style.overflow = "";
}

/* ==========================================================================
   Event Listeners & Navbar Scroll
   ========================================================================== */
function setupEventListeners() {
  // Carousel Buttons
  document.getElementById("prev-btn")?.addEventListener("click", () => {
    prevSlide();
    startAutoPlay();
  });

  document.getElementById("next-btn")?.addEventListener("click", () => {
    nextSlide();
    startAutoPlay();
  });

  // Pause carousel auto-play on hover
  const viewport = document.getElementById("carousel-viewport");
  viewport?.addEventListener("mouseenter", stopAutoPlay);
  viewport?.addEventListener("mouseleave", startAutoPlay);

  // Mobile Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;
  viewport?.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  viewport?.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diffX = touchEndX - touchStartX;
    if (Math.abs(diffX) > 40) {
      if (diffX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      startAutoPlay();
    }
  }, { passive: true });

  // Keyboard navigation for carousel and modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "Escape") closeGameModal();
  });

  // Category Tabs Filter
  const tabs = document.querySelectorAll(".filter-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const category = tab.getAttribute("data-filter");
      renderGamesGrid(category);
    });
  });

  // Navbar background change on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });

  // Modal Backdrop Click to close
  document.getElementById("game-modal-backdrop")?.addEventListener("click", (e) => {
    if (e.target.id === "game-modal-backdrop") {
      closeGameModal();
    }
  });
}

/* ==========================================================================
   Background Particle Canvas Effect
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 65;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.5,
      color: Math.random() > 0.5 ? "rgba(0, 240, 255, " : "rgba(112, 0, 255, ",
      alpha: Math.random() * 0.5 + 0.1,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ")";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}
