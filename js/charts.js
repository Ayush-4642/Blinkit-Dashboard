/* ============================================================
   RetailIQ – charts.js
   All Chart.js renderers · Dark theme · Transparent backgrounds
   ============================================================ */

/* ── Global Chart.js Defaults ────────────────────────────── */
Chart.defaults.color              = 'rgba(255,255,255,0.6)';
Chart.defaults.borderColor        = 'rgba(255,255,255,0.05)';
Chart.defaults.font.family        = "'Inter', sans-serif";
Chart.defaults.font.size          = 11;
Chart.defaults.plugins.legend.labels.color = 'rgba(255,255,255,0.65)';
Chart.defaults.plugins.legend.labels.boxWidth = 10;
Chart.defaults.plugins.legend.labels.padding  = 14;
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(15,15,30,0.92)';
Chart.defaults.plugins.tooltip.borderColor     = 'rgba(255,255,255,0.12)';
Chart.defaults.plugins.tooltip.borderWidth     = 1;
Chart.defaults.plugins.tooltip.titleColor      = '#F0F0F8';
Chart.defaults.plugins.tooltip.bodyColor       = 'rgba(255,255,255,0.65)';
Chart.defaults.plugins.tooltip.padding         = 10;
Chart.defaults.plugins.tooltip.cornerRadius    = 8;

/* ── Shared axis config ──────────────────────────────────── */
function darkAxes(opts = {}) {
  return {
    x: {
      grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false },
      ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 10 }, ...opts.xTicks },
      border: { color: 'rgba(255,255,255,0.05)' },
      ...opts.x,
    },
    y: {
      grid: { color: 'rgba(255,255,255,0.05)', drawBorder: false },
      ticks: { color: 'rgba(255,255,255,0.5)', font: { size: 10 }, ...opts.yTicks },
      border: { color: 'rgba(255,255,255,0.05)' },
      beginAtZero: true,
      ...opts.y,
    },
  };
}

/* ── Registry of active charts (for filter refresh) ─────── */
const _charts = {};

function reg(id, chart) {
  _charts[id] = chart;
  return chart;
}

/* ============================================================
   EXECUTIVE PAGE
   ============================================================ */
function renderMonthlyRevenue() {
  const ctx = document.getElementById('monthlyRevenue');
  if (!ctx) return;
  const d = RetailData.monthlyRevenue;
  reg('monthlyRevenue', new Chart(ctx, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: [{
        label: 'Revenue (₹)',
        data: d.values,
        borderColor: '#FACC15',
        backgroundColor: 'rgba(250,204,21,0.08)',
        borderWidth: 2.5,
        pointBackgroundColor: '#FACC15',
        pointRadius: 3,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: darkAxes({ yTicks: { callback: v => '₹' + (v/100000).toFixed(1) + 'L' } }),
      plugins: { legend: { display: false } },
    },
  }));
}

function renderPaymentMethods() {
  const ctx = document.getElementById('paymentMethods');
  if (!ctx) return;
  const d = RetailData.paymentMethods;
  reg('paymentMethods', new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: d.labels,
      datasets: [{
        data: d.values,
        backgroundColor: d.colors,
        borderColor: 'rgba(255,255,255,0.05)',
        borderWidth: 2,
        hoverOffset: 8,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '65%',
      plugins: { legend: { position: 'bottom' } },
    },
  }));
}

function renderExecSegments() {
  const ctx = document.getElementById('execSegments');
  if (!ctx) return;
  const d = RetailData.customerSegments;
  reg('execSegments', new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: d.labels,
      datasets: [{
        data: d.values,
        backgroundColor: d.colors,
        borderColor: 'rgba(255,255,255,0.05)',
        borderWidth: 2,
        hoverOffset: 8,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '65%',
      plugins: { legend: { position: 'bottom' } },
    },
  }));
}

function renderCategoryRevenue() {
  const ctx = document.getElementById('categoryRevenue');
  if (!ctx) return;
  const d = RetailData.categoryRevenue;
  reg('categoryRevenue', new Chart(ctx, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [{
        label: 'Revenue (₹)',
        data: d.values,
        backgroundColor: d.colors,
        borderColor: 'rgba(255,255,255,0.06)',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      indexAxis: 'y',
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: 'rgba(255,255,255,0.5)', callback: v => '₹' + (v/100000).toFixed(0) + 'L' },
          border: { color: 'rgba(255,255,255,0.05)' },
        },
        y: {
          grid: { display: false },
          ticks: { color: 'rgba(255,255,255,0.6)', font: { size: 10 } },
          border: { color: 'rgba(255,255,255,0.05)' },
        },
      },
      plugins: { legend: { display: false } },
    },
  }));
}

/* ============================================================
   CUSTOMER PAGE
   ============================================================ */
function renderCustomerSegments() {
  const ctx = document.getElementById('customerSegments');
  if (!ctx) return;
  const d = RetailData.customerSegments;
  reg('customerSegments', new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: d.labels,
      datasets: [{
        data: d.values,
        backgroundColor: d.colors,
        borderColor: 'rgba(255,255,255,0.05)',
        borderWidth: 2,
        hoverOffset: 8,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '60%',
      plugins: { legend: { position: 'bottom' } },
    },
  }));
}

function renderRatingDist() {
  const ctx = document.getElementById('ratingDist');
  if (!ctx) return;
  const d = RetailData.customers.ratingDistribution;
  reg('ratingDist', new Chart(ctx, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [{
        label: 'Reviews',
        data: d.values,
        backgroundColor: [
          'rgba(239,68,68,0.8)','rgba(249,115,22,0.8)','rgba(250,204,21,0.8)',
          'rgba(22,163,74,0.8)','rgba(59,130,246,0.8)',
        ],
        borderRadius: 6,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: darkAxes(),
      plugins: { legend: { display: false } },
    },
  }));
}

function renderSentimentDist() {
  const ctx = document.getElementById('sentimentDist');
  if (!ctx) return;
  const d = RetailData.customers.sentimentDistribution;
  reg('sentimentDist', new Chart(ctx, {
    type: 'pie',
    data: {
      labels: d.labels,
      datasets: [{
        data: d.values,
        backgroundColor: d.colors,
        borderColor: 'rgba(255,255,255,0.05)',
        borderWidth: 2,
        hoverOffset: 8,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } },
    },
  }));
}

function renderFeedbackCats() {
  const ctx = document.getElementById('feedbackCats');
  if (!ctx) return;
  const d = RetailData.customers.feedbackCategories;
  reg('feedbackCats', new Chart(ctx, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [{
        label: 'Mentions',
        data: d.values,
        backgroundColor: [
          'rgba(250,204,21,0.8)','rgba(22,163,74,0.8)','rgba(59,130,246,0.8)',
          'rgba(139,92,246,0.8)','rgba(249,115,22,0.8)',
        ],
        borderRadius: 6,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: darkAxes(),
      plugins: { legend: { display: false } },
    },
  }));
}

function renderTopAreas() {
  const ctx = document.getElementById('topAreas');
  if (!ctx) return;
  const d = RetailData.customers.topAreas;
  reg('topAreas', new Chart(ctx, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [{
        label: 'Revenue (₹)',
        data: d.values,
        backgroundColor: 'rgba(250,204,21,0.75)',
        borderColor: 'rgba(250,204,21,0.3)',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      indexAxis: 'y',
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: 'rgba(255,255,255,0.5)', callback: v => '₹' + (v/1000).toFixed(0) + 'K' },
          border: { color: 'rgba(255,255,255,0.05)' },
        },
        y: {
          grid: { display: false },
          ticks: { color: 'rgba(255,255,255,0.6)' },
          border: { color: 'rgba(255,255,255,0.05)' },
        },
      },
      plugins: { legend: { display: false } },
    },
  }));
}

/* ============================================================
   DELIVERY PAGE
   ============================================================ */
function renderDeliveryStatus() {
  const ctx = document.getElementById('deliveryStatus');
  if (!ctx) return;
  const d = RetailData.delivery.deliveryStatus;
  reg('deliveryStatus', new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: d.labels,
      datasets: [{
        data: d.values,
        backgroundColor: d.colors,
        borderColor: 'rgba(255,255,255,0.05)',
        borderWidth: 2,
        hoverOffset: 8,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '62%',
      plugins: { legend: { position: 'bottom' } },
    },
  }));
}

function renderOnTimeTrend() {
  const ctx = document.getElementById('onTimeTrend');
  if (!ctx) return;
  const d = RetailData.delivery.onTimeTrend;
  reg('onTimeTrend', new Chart(ctx, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: [{
        label: 'On-Time Rate (%)',
        data: d.values,
        borderColor: '#16A34A',
        backgroundColor: 'rgba(22,163,74,0.08)',
        borderWidth: 2.5,
        pointBackgroundColor: '#16A34A',
        pointRadius: 3,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: darkAxes({
        y: { min: 60, max: 75 },
        yTicks: { callback: v => v + '%' },
      }),
      plugins: { legend: { display: false } },
    },
  }));
}

function renderDistanceDist() {
  const ctx = document.getElementById('distanceDist');
  if (!ctx) return;
  const d = RetailData.delivery.distanceDistribution;
  reg('distanceDist', new Chart(ctx, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [{
        label: 'Orders',
        data: d.values,
        backgroundColor: [
          'rgba(59,130,246,0.8)','rgba(250,204,21,0.8)','rgba(22,163,74,0.8)',
          'rgba(139,92,246,0.8)','rgba(249,115,22,0.8)','rgba(239,68,68,0.8)',
        ],
        borderRadius: 6,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: darkAxes(),
      plugins: { legend: { display: false } },
    },
  }));
}

function renderAvgTimeByDist() {
  const ctx = document.getElementById('avgTimeByDist');
  if (!ctx) return;
  const d = RetailData.delivery.avgTimeByDistance;
  reg('avgTimeByDist', new Chart(ctx, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: [{
        label: 'Avg Time (min)',
        data: d.values,
        borderColor: '#F97316',
        backgroundColor: 'rgba(249,115,22,0.08)',
        borderWidth: 2.5,
        pointBackgroundColor: '#F97316',
        pointRadius: 4,
        pointHoverRadius: 7,
        fill: true,
        tension: 0.3,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: darkAxes({ yTicks: { callback: v => v + ' min' } }),
      plugins: { legend: { display: false } },
    },
  }));
}

/* ============================================================
   INVENTORY PAGE
   ============================================================ */
function renderInvCatRevenue() {
  const ctx = document.getElementById('invCatRevenue');
  if (!ctx) return;
  const d = RetailData.categoryRevenue;
  reg('invCatRevenue', new Chart(ctx, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [{
        label: 'Revenue (₹)',
        data: d.values,
        backgroundColor: d.colors,
        borderRadius: 6,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      indexAxis: 'y',
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: 'rgba(255,255,255,0.5)', callback: v => '₹' + (v/100000).toFixed(0) + 'L' },
          border: { color: 'rgba(255,255,255,0.05)' },
        },
        y: {
          grid: { display: false },
          ticks: { color: 'rgba(255,255,255,0.6)', font: { size: 10 } },
          border: { color: 'rgba(255,255,255,0.05)' },
        },
      },
      plugins: { legend: { display: false } },
    },
  }));
}

function renderCategoryMargin() {
  const ctx = document.getElementById('categoryMargin');
  if (!ctx) return;
  const d = RetailData.inventory.categoryMargins;
  reg('categoryMargin', new Chart(ctx, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [{
        label: 'Margin %',
        data: d.values,
        backgroundColor: d.colors(),
        borderRadius: 6,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: darkAxes({ yTicks: { callback: v => v + '%' } }),
      plugins: { legend: { display: false } },
    },
  }));
}

function renderCategoryOrders() {
  const ctx = document.getElementById('categoryOrders');
  if (!ctx) return;
  const d = RetailData.inventory.categoryOrders;
  reg('categoryOrders', new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: d.labels,
      datasets: [{
        data: d.values,
        backgroundColor: RetailData.categoryRevenue.colors,
        borderColor: 'rgba(255,255,255,0.05)',
        borderWidth: 2,
        hoverOffset: 8,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '55%',
      plugins: { legend: { position: 'right', labels: { font: { size: 9 }, padding: 8 } } },
    },
  }));
}

/* ============================================================
   MARKETING PAGE
   ============================================================ */
function renderSpendRevTrend() {
  const ctx = document.getElementById('spendRevTrend');
  if (!ctx) return;
  const d = RetailData.marketing.monthlySpendRevenue;
  reg('spendRevTrend', new Chart(ctx, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: [
        {
          label: 'Revenue (₹)',
          data: d.revenue,
          borderColor: '#16A34A',
          backgroundColor: 'rgba(22,163,74,0.08)',
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: '#16A34A',
        },
        {
          label: 'Ad Spend (₹)',
          data: d.spend,
          borderColor: '#FACC15',
          backgroundColor: 'rgba(250,204,21,0.06)',
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointBackgroundColor: '#FACC15',
        },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: darkAxes({ yTicks: { callback: v => '₹' + (v/100000).toFixed(1) + 'L' } }),
      plugins: { legend: { display: true, position: 'top' } },
    },
  }));
}

function renderChannelPerf() {
  const ctx = document.getElementById('channelPerf');
  if (!ctx) return;
  const d = RetailData.marketing.channelPerformance;
  reg('channelPerf', new Chart(ctx, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [
        {
          label: 'Revenue',
          data: d.revenue,
          backgroundColor: 'rgba(22,163,74,0.8)',
          borderRadius: 5,
          borderSkipped: false,
        },
        {
          label: 'Spend',
          data: d.spend,
          backgroundColor: 'rgba(250,204,21,0.8)',
          borderRadius: 5,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: darkAxes({ yTicks: { callback: v => '₹' + (v/100000).toFixed(0) + 'L' } }),
      plugins: { legend: { display: true, position: 'top' } },
    },
  }));
}

function renderCampaignROAS() {
  const ctx = document.getElementById('campaignROAS');
  if (!ctx) return;
  const d = RetailData.marketing.campaignROAS;
  reg('campaignROAS', new Chart(ctx, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [{
        label: 'ROAS',
        data: d.values,
        backgroundColor: d.values.map((v, i) =>
          i === 0 ? 'rgba(22,163,74,0.85)' :
          i <= 2   ? 'rgba(59,130,246,0.8)' :
          i <= 5   ? 'rgba(250,204,21,0.8)' :
                     'rgba(249,115,22,0.8)'
        ),
        borderRadius: 6,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      scales: darkAxes({ y: { min: 2.6, max: 2.85 }, yTicks: { callback: v => v + 'x' } }),
      plugins: { legend: { display: false } },
    },
  }));
}

function renderAudienceConv() {
  const ctx = document.getElementById('audienceConv');
  if (!ctx) return;
  const d = RetailData.marketing.audienceConversions;
  reg('audienceConv', new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: d.labels,
      datasets: [{
        data: d.values,
        backgroundColor: d.colors,
        borderColor: 'rgba(255,255,255,0.05)',
        borderWidth: 2,
        hoverOffset: 8,
      }],
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout: '60%',
      plugins: { legend: { position: 'bottom' } },
    },
  }));
}

/* ============================================================
   BOOT — render charts for current page
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Executive
  renderMonthlyRevenue();
  renderPaymentMethods();
  renderExecSegments();
  renderCategoryRevenue();

  // Customers
  renderCustomerSegments();
  renderRatingDist();
  renderSentimentDist();
  renderFeedbackCats();
  renderTopAreas();

  // Delivery
  renderDeliveryStatus();
  renderOnTimeTrend();
  renderDistanceDist();
  renderAvgTimeByDist();

  // Inventory
  renderInvCatRevenue();
  renderCategoryMargin();
  renderCategoryOrders();

  // Marketing
  renderSpendRevTrend();
  renderChannelPerf();
  renderCampaignROAS();
  renderAudienceConv();
});

/* ── Filter Refresh API ──────────────────────────────────── */
window.RetailCharts = {
  refresh(filterState) {
    // For a fully offline dashboard, we scale chart data by the combined filter fraction
    // In a real app this would re-query the dataset
    const frac = (
      ({ all:1,      'dairy-breakfast':0.113,'household-care':0.103,'pet-care':0.102,
         'fruits-veg':0.099,'pharmacy':0.096,'snacks':0.095,'grocery':0.091,
         'personal-care':0.091,'cold-drinks':0.075,'frozen-food':0.067,'baby-care':0.067
       }[filterState.category] || 1) *
      ({ all:1, regular:0.608, premium:0.584, new:0.563, inactive:0.548 }[filterState.segment] || 1) *
      ({ all:1, card:0.252, cash:0.248, wallet:0.251, upi:0.249 }[filterState.paymentMethod] || 1) *
      ({ all:1, 'on-time':0.694, delayed:0.306 }[filterState.deliveryStatus] || 1)
    );

    // Scale revenue-based charts
    ['monthlyRevenue','spendRevTrend'].forEach(id => {
      const c = _charts[id];
      if (!c) return;
      c.data.datasets.forEach(ds => {
        if (!ds._base) ds._base = [...ds.data];
        ds.data = ds._base.map(v => Math.round(v * frac));
      });
      c.update('active');
    });
  },
};