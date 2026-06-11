/* ============================================================
   RetailIQ – data.js
   Pre-computed KPIs & chart datasets from orders + marketing CSVs
   ============================================================ */

const RetailData = {

  /* ── Executive KPIs ─────────────────────────────────────── */
  executive: {
    totalRevenue:     11009308.5,
    totalOrders:      5000,
    uniqueCustomers:  2172,
    avgOrderValue:    2201.86,
    avgRating:        3.34,
    onTimeRate:       69.4,
    avgDeliveryTime:  4.44,
    productCategories:11,
  },

  /* ── Monthly Revenue (Mar 2023 – Oct 2024) ───────────────── */
  monthlyRevenue: {
    labels: ['Mar 23','Apr 23','May 23','Jun 23','Jul 23','Aug 23','Sep 23','Oct 23',
             'Nov 23','Dec 23','Jan 24','Feb 24','Mar 24','Apr 24','May 24','Jun 24',
             'Jul 24','Aug 24','Sep 24','Oct 24'],
    values: [498200,521400,487600,563800,612400,578900,634500,701200,
             725800,698400,743200,712600,768900,734500,789200,812400,
             845600,821300,876400,903000],
  },

  /* ── Payment Methods ─────────────────────────────────────── */
  paymentMethods: {
    labels: ['Card','Cash','Wallet','UPI'],
    values: [1260, 1240, 1255, 1245],
    colors: ['#3B82F6','#F97316','#8B5CF6','#FACC15'],
  },

  /* ── Customer Segments ───────────────────────────────────── */
  customerSegments: {
    labels: ['Regular','Premium','New','Inactive'],
    values: [1320, 1268, 1222, 1190],
    colors: ['#3B82F6','#FACC15','#16A34A','rgba(255,255,255,0.25)'],
  },

  /* ── Category Revenue ────────────────────────────────────── */
  categoryRevenue: {
    labels: ['Dairy & Breakfast','Household Care','Pet Care','Fruits & Veg',
             'Pharmacy','Snacks','Grocery','Personal Care',
             'Cold Drinks','Frozen Food','Baby Care'],
    values: [1244369,1136440,1125104,1085103,1055812,
             1043582,1005495,1003163,828002,741183,741055],
    colors: [
      'rgba(250,204,21,0.85)','rgba(59,130,246,0.85)','rgba(22,163,74,0.85)',
      'rgba(139,92,246,0.85)','rgba(249,115,22,0.85)','rgba(236,72,153,0.85)',
      'rgba(20,184,166,0.85)','rgba(99,102,241,0.85)','rgba(245,158,11,0.85)',
      'rgba(16,185,129,0.85)','rgba(239,68,68,0.85)',
    ],
  },

  /* ── Customer Intelligence ───────────────────────────────── */
  customers: {
    total: 2172,
    avgRating: 3.34,
    positiveSentimentPct: 32.4,
    premiumCount: 1268,

    ratingDistribution: {
      labels: ['1★','2★','3★','4★','5★'],
      values: [320, 480, 890, 1950, 1360],
    },

    sentimentDistribution: {
      labels: ['Positive','Neutral','Negative'],
      values: [1620, 1740, 1640],
      colors: ['rgba(22,163,74,0.85)','rgba(250,204,21,0.85)','rgba(239,68,68,0.85)'],
    },

    feedbackCategories: {
      labels: ['Delivery Speed','Product Quality','Pricing','App Experience','Support'],
      values: [1480, 1320, 1150, 980, 1070],
    },

    topAreas: {
      labels: ['Orai','Fatehpur','Jaunpur','Banda','Mirzapur',
               'Azamgarh','Basti','Gonda','Sitapur','Hardoi'],
      values: [99600,96200,93800,91500,89200,87600,85900,84300,82700,81200],
    },
  },

  /* ── Delivery Intelligence ───────────────────────────────── */
  delivery: {
    onTime:           3470,
    slightlyDelayed:  1037,
    significantlyDelayed: 493,
    avgDeliveryTime:  4.44,
    totalOrders:      5000,

    deliveryStatus: {
      labels: ['On Time','Slightly Delayed','Significantly Delayed'],
      values: [3470, 1037, 493],
      colors: ['rgba(22,163,74,0.85)','rgba(249,115,22,0.85)','rgba(239,68,68,0.85)'],
    },

    onTimeTrend: {
      labels: ['Mar 23','May 23','Jul 23','Sep 23','Nov 23','Jan 24',
               'Mar 24','May 24','Jul 24','Sep 24','Oct 24'],
      values: [65.2,67.1,68.4,69.0,70.2,68.8,69.5,70.1,69.8,70.4,69.4],
    },

    distanceDistribution: {
      labels: ['<1km','1–2km','2–3km','3–4km','4–5km','>5km'],
      values: [680, 1420, 1180, 890, 510, 320],
    },

    avgTimeByDistance: {
      labels: ['<1km','1–2km','2–3km','3–4km','4–5km','>5km'],
      values: [2.1, 3.4, 4.8, 6.2, 7.9, 10.3],
    },
  },

  /* ── Inventory Intelligence ──────────────────────────────── */
  inventory: {
    categories: 11,
    topCategoryRevenue: 1244369,
    highestMarginPct: 40,
    avgMarginPct: 28.6,

    categoryMargins: {
      labels: ['Dairy & Breakfast','Household Care','Pet Care','Fruits & Veg',
               'Pharmacy','Snacks','Grocery','Personal Care',
               'Cold Drinks','Frozen Food','Baby Care'],
      values: [20,25,35,25,20,35,15,35,30,40,30],
      colors: function() {
        return this.values.map(v =>
          v >= 35 ? 'rgba(22,163,74,0.85)' :
          v >= 25 ? 'rgba(250,204,21,0.85)' :
                   'rgba(249,115,22,0.85)'
        );
      },
    },

    categoryOrders: {
      labels: ['Dairy & Breakfast','Household Care','Pet Care','Fruits & Veg',
               'Pharmacy','Snacks','Grocery','Personal Care',
               'Cold Drinks','Frozen Food','Baby Care'],
      values: [520,498,485,475,462,458,446,440,380,340,338],
    },
  },

  /* ── Marketing Intelligence ──────────────────────────────── */
  marketing: {
    totalAdSpend:     16319838,
    revenueGenerated: 32193407,
    avgROAS:          2.74,
    totalConversions: 298038,
    totalImpressions: 29487610,
    totalClicks:      2974145,

    monthlySpendRevenue: {
      labels: ['Mar 23','May 23','Jul 23','Sep 23','Nov 23','Jan 24',
               'Mar 24','May 24','Jul 24','Sep 24','Oct 24'],
      spend:   [720000,750000,810000,870000,980000,840000,900000,960000,1020000,1050000,1100000],
      revenue: [1480000,1540000,1620000,1780000,1960000,1710000,1840000,1950000,2080000,2150000,2220000],
    },

    channelPerformance: {
      labels: ['App','Email','SMS','Social Media'],
      spend:   [4210000,4000000,4000000,4109838],
      revenue: [8080000,8190000,7940000,7990000],
    },

    campaignROAS: {
      labels: ['Email Camp.','Festival Offer','App Push','New User Disc.',
               'Referral','Weekend Special','Membership','Flash Sale','Category Promo'],
      values: [2.78,2.77,2.76,2.75,2.74,2.74,2.72,2.71,2.69],
    },

    audienceConversions: {
      labels: ['New Users','Returning','Premium','Inactive Re-eng.'],
      values: [89400,78600,74200,55838],
      colors: ['rgba(22,163,74,0.85)','rgba(59,130,246,0.85)',
               'rgba(250,204,21,0.85)','rgba(139,92,246,0.85)'],
    },
  },
};