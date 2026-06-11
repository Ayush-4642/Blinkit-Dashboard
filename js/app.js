/* ============================================================
   RetailIQ – app.js
   Live clock · Count-up · Filter bar · Active nav · Loading
   ============================================================ */

/* ── 1. Loading Screen ───────────────────────────────────── */
(function initLoadingScreen() {
  const ls = document.getElementById('loading-screen');
  if (!ls) return;
  window.addEventListener('load', () => {
    setTimeout(() => ls.classList.add('hidden'), 1500);
  });
})();

/* ── 2. Active Nav Item ──────────────────────────────────── */
(function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'executive.html';
  document.querySelectorAll('.nav-item').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });
})();

/* ── 3. Mobile Menu Toggle ───────────────────────────────── */
(function mobileMenu() {
  const btn = document.getElementById('menuBtn');
  const sidebar = document.querySelector('.sidebar');
  if (!btn || !sidebar) return;
  btn.addEventListener('click', () => sidebar.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (!sidebar.contains(e.target) && !btn.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
})();

/* ── 4. Live Clock ───────────────────────────────────────── */
(function startLiveClock() {
  const el = document.getElementById('liveClock');
  if (!el) return;

  const days  = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  function update() {
    const now = new Date();
    const d   = days[now.getDay()];
    const dd  = String(now.getDate()).padStart(2,'0');
    const mon = months[now.getMonth()];
    const yr  = now.getFullYear();
    const hh  = String(now.getHours()).padStart(2,'0');
    const mm  = String(now.getMinutes()).padStart(2,'0');
    const ss  = String(now.getSeconds()).padStart(2,'0');
    el.textContent = `${d}, ${dd} ${mon} ${yr} · ${hh}:${mm}:${ss}`;
  }

  update();
  setInterval(update, 1000);
})();

/* ── 5. Count-Up Animation ───────────────────────────────── */
function animateCountUp(el, target, decimals, prefix, suffix, duration) {
  const start     = 0;
  const startTime = performance.now();

  function step(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current  = start + (target - start) * ease;
    const formatted = decimals > 0
      ? current.toFixed(decimals)
      : Math.floor(current).toLocaleString('en-IN');

    // Format with Indian number system if no decimals
    let display;
    if (decimals > 0) {
      display = current.toFixed(decimals);
      if (!suffix && !prefix) display = parseFloat(display).toLocaleString('en-IN', { minimumFractionDigits: decimals });
    } else {
      display = Math.floor(current).toLocaleString('en-IN');
    }

    el.textContent = (prefix || '') + display + (suffix || '');

    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function initCountUps() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el       = entry.target;
      const target   = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const prefix   = el.dataset.prefix || '';
      const suffix   = el.dataset.suffix || '';
      animateCountUp(el, target, decimals, prefix, suffix, 1600);
      observer.unobserve(el);
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
}

/* ── 6. Filter Bar Logic ─────────────────────────────────── */

// Master data store — populated by data.js
// Filters apply a visual update to KPI cards (scaling values by matching fraction)
// and re-render charts via charts.js helpers when available.

const FilterState = {
  category:        'all',
  segment:         'all',
  paymentMethod:   'all',
  deliveryStatus:  'all',
};

// Category → approximate revenue fraction of total
const CATEGORY_FRACTIONS = {
  'all':                 1.000,
  'dairy-breakfast':     0.113,
  'household-care':      0.103,
  'pet-care':            0.102,
  'fruits-veg':          0.099,
  'pharmacy':            0.096,
  'snacks':              0.095,
  'grocery':             0.091,
  'personal-care':       0.091,
  'cold-drinks':         0.075,
  'frozen-food':         0.067,
  'baby-care':           0.067,
};

// Segment → customer fraction
const SEGMENT_FRACTIONS = {
  'all':      1.00,
  'regular':  0.608,
  'premium':  0.584,
  'new':      0.563,
  'inactive': 0.548,
};

// Payment → order fraction (uniform distribution ~25% each)
const PAYMENT_FRACTIONS = {
  'all':    1.00,
  'card':   0.252,
  'cash':   0.248,
  'wallet': 0.251,
  'upi':    0.249,
};

// Delivery status
const DELIVERY_FRACTIONS = {
  'all':     1.00,
  'on-time': 0.694,
  'delayed': 0.306,
};

function getCombinedFraction() {
  return (
    CATEGORY_FRACTIONS[FilterState.category]       *
    SEGMENT_FRACTIONS[FilterState.segment]          *
    PAYMENT_FRACTIONS[FilterState.paymentMethod]    *
    DELIVERY_FRACTIONS[FilterState.deliveryStatus]
  );
}

function applyFiltersToKPIs() {
  const frac = getCombinedFraction();

  document.querySelectorAll('[data-count]').forEach(el => {
    const base     = parseFloat(el.dataset.baseCount || el.dataset.count);
    // Store original
    if (!el.dataset.baseCount) el.dataset.baseCount = el.dataset.count;

    const newVal   = base * frac;
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix   = el.dataset.prefix || '';
    const suffix   = el.dataset.suffix || '';
    animateCountUp(el, newVal, decimals, prefix, suffix, 800);
  });
}

function applyFiltersToCharts() {
  // Charts module exposes window.RetailCharts.refresh(filterState)
  if (window.RetailCharts && typeof window.RetailCharts.refresh === 'function') {
    window.RetailCharts.refresh(FilterState);
  }
}

function applyFilters() {
  applyFiltersToKPIs();
  applyFiltersToCharts();
}

function resetFilters() {
  FilterState.category       = 'all';
  FilterState.segment        = 'all';
  FilterState.paymentMethod  = 'all';
  FilterState.deliveryStatus = 'all';

  // Reset selects
  ['filterCategory','filterSegment','filterPayment','filterDelivery'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = 'all';
  });

  // Restore base counts
  document.querySelectorAll('[data-count]').forEach(el => {
    if (el.dataset.baseCount) {
      const base     = parseFloat(el.dataset.baseCount);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const prefix   = el.dataset.prefix || '';
      const suffix   = el.dataset.suffix || '';
      animateCountUp(el, base, decimals, prefix, suffix, 800);
    }
  });

  applyFiltersToCharts();
}

function initFilters() {
  const selectors = {
    filterCategory:  'category',
    filterSegment:   'segment',
    filterPayment:   'paymentMethod',
    filterDelivery:  'deliveryStatus',
  };

  Object.entries(selectors).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('change', () => {
      FilterState[key] = el.value;
      applyFilters();
    });
  });

  const resetBtn = document.getElementById('resetFilters');
  if (resetBtn) resetBtn.addEventListener('click', resetFilters);
}

/* ── 7. AI Insights (Executive page) ────────────────────── */
function renderInsights() {
  const grid = document.getElementById('insightsGrid');
  if (!grid) return;

  const insights = [
    { icon: '💰', tag: 'Revenue', text: 'Revenue of ₹1.10 Cr across 5,000 orders shows strong unit economics at ₹2,202 AOV. A 5% AOV increase through upselling could add ₹55L annually.' },
    { icon: '🚚', tag: 'Delivery', text: '30.6% of orders face delays — all traffic-related. Route-optimization during peak hours could lift on-time rate from 69.4% to 80%+ within one quarter.' },
    { icon: '⭐', tag: 'Ratings', text: 'Avg rating of 3.34 is below the 3.5 target. Delivery improvements alone could push it to 3.6+, directly reducing churn among Premium customers.' },
    { icon: '📦', tag: 'Inventory', text: 'Frozen Food has 40% margin but only 6.8% revenue share. Increasing visibility with in-app placement could add ₹3–4L with zero added cost.' },
    { icon: '📣', tag: 'Marketing', text: 'ROAS of 2.74x across all channels is healthy. Email at 2.78x outperforms. Reallocating 15% of App budget to Email can yield ₹2.4L incremental monthly revenue.' },
    { icon: '👑', tag: 'Customers', text: '1,190 inactive customers at ₹2,202 AOV = ₹2.6M latent revenue. A targeted win-back campaign with 10% conversion rate delivers ₹2.6L with minimal CAC.' },
  ];

  grid.innerHTML = insights.map(i => `
    <div class="insight-item">
      <div class="insight-header">
        <span class="insight-icon">${i.icon}</span>
        <span class="insight-tag">${i.tag}</span>
      </div>
      <p class="insight-text">${i.text}</p>
    </div>
  `).join('');
}

/* ── 8. Boot ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCountUps();
  initFilters();
  renderInsights();
});