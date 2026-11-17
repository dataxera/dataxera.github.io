/**
 * Dataxera Sdn Bhd — Executive & Business-Focused Interactive Experience
 */

const HERO_STAGE_INSIGHTS = {
  collect: {
    title: '01 // Automated Data Collection — Powered by Apache NiFi & Kafka',
    desc: 'Continuously gathers data from legacy databases, IoT sensors, cloud APIs, and enterprise applications into one reliable stream—replacing fragile manual file transfers and custom scripts.'
  },
  govern: {
    title: '02 // Reliable Workflows & Data Catalog — Powered by Airflow & Hive Metastore',
    desc: 'Ensures every dataset is validated, scheduled, and cataloged consistently across departments—giving leadership complete confidence in the accuracy and lineage of every report.'
  },
  analyze: {
    title: '03 // Instant Analytics Without Moving Data — Powered by Trino, Doris & PostgreSQL',
    desc: 'Combines sub-second operational reporting with cross-department querying, allowing teams to join finance, operations, HR, and customer records in real time.'
  },
  decide: {
    title: '04 // Executive Dashboards & Maps — Powered by Apache Superset',
    desc: 'Delivers interactive command-center dashboards, geospatial heatmaps, and self-service reporting with corporate single sign-on—without per-seat BI licensing fees.'
  }
};

const CITADEL_STACK_DATA = {
  nifi: {
    id: 'nifi',
    name: 'Apache NiFi',
    badge: 'Data Collection',
    category: 'ingestion',
    categoryLabel: 'Automated Data Collection & Routing',
    summary: 'Connects to hundreds of databases, sensors, and enterprise applications with visual dataflow control.',
    description: 'Apache NiFi acts as the universal intake valve for your organization. Whether collecting real-time weather/river sensor feeds or syncing nightly ERP extracts, it guarantees no data is lost—even during network outages.',
    businessValue: 'Eliminates months of custom integration coding and prevents silent data loss.',
    idealFor: 'IoT sensor networks, legacy system integration, multi-agency data sharing, and automated file ingestion.',
    governanceNote: 'Built-in data provenance tracks where every record came from and how it was transformed.'
  },
  kafka: {
    id: 'kafka',
    name: 'Apache Kafka',
    badge: 'Real-Time Streaming',
    category: 'ingestion',
    categoryLabel: 'High-Speed Event Streaming',
    summary: 'Streams live operational events across your organization in milliseconds with zero downtime.',
    description: 'Apache Kafka provides a resilient digital nervous system. As customer transactions, emergency alerts, or supply chain updates happen, Kafka distributes them simultaneously to analytics engines and alert systems.',
    businessValue: 'Shifts decision-making from "yesterday’s batch report" to real-time operational awareness.',
    idealFor: 'Early-warning disaster alerts, real-time fraud detection, live customer activity tracking, and fleet telemetry.',
    governanceNote: 'Encrypted end-to-end with automatic fault tolerance across cluster nodes.'
  },
  airflow: {
    id: 'airflow',
    name: 'Apache Airflow',
    badge: 'Workflow Automation',
    category: 'orchestration',
    categoryLabel: 'Scheduled Pipeline Orchestration',
    summary: 'Automates complex daily, hourly, or event-driven data preparation workflows with full auditability.',
    description: 'Apache Airflow ensures that your data cleaning, enrichment, and reporting pipelines run on schedule, in the exact right order, with automatic retries and instant alerts if an upstream source changes.',
    businessValue: 'Replaces manual spreadsheet preparation and fragile cron jobs with auditable enterprise automation.',
    idealFor: 'Daily executive KPIs, regulatory compliance reporting, and Entity 360 identity matching.',
    governanceNote: 'Integrated with corporate Git version control and enterprise SSO access policies.'
  },
  trino: {
    id: 'trino',
    name: 'Trino',
    badge: 'Federated Queries',
    category: 'compute',
    categoryLabel: 'Cross-System Analytics Engine',
    summary: 'Queries data across multiple databases and cloud storage simultaneously—without expensive data duplication.',
    description: 'Trino lets analysts and executives ask questions that span departments—joining CRM records, financial ledgers, and historical archives in a single query without waiting for data to be copied.',
    businessValue: 'Breaks down departmental data silos immediately while avoiding redundant storage costs.',
    idealFor: 'Cross-agency intelligence, ad-hoc executive investigations, and unified Entity 360 views.',
    governanceNote: 'Centralized access control ensures users only query datasets they are authorized to see.'
  },
  doris: {
    id: 'doris',
    name: 'Apache Doris',
    badge: 'Sub-Second BI',
    category: 'compute',
    categoryLabel: 'High-Speed Analytical Warehouse',
    summary: 'Powers interactive dashboards and high-concurrency reporting with sub-second response times.',
    description: 'Apache Doris is built for speed at scale. Whether 10 executives or 5,000 operational staff are filtering dashboards simultaneously, Doris returns answers in fractions of a second.',
    businessValue: 'Keeps executive briefings and command-center dashboards fast and responsive even on billions of rows.',
    idealFor: 'Real-time disaster command centers, Customer 360 profiles, and high-traffic operational portals.',
    governanceNote: 'Scales linearly on commodity hardware or cloud instances with predictable cost.'
  },
  superset: {
    id: 'superset',
    name: 'Apache Superset',
    badge: 'Executive BI',
    category: 'bi',
    categoryLabel: 'Dashboards & Geospatial Intelligence',
    summary: 'Modern interactive dashboards, geospatial maps, and self-service analytics—with zero per-user licensing fees.',
    description: 'Apache Superset replaces costly proprietary BI licenses with a rich, intuitive visual workspace. Leaders get interactive KPIs, regional risk maps, and drill-down reports accessible from any browser.',
    businessValue: 'Eliminates escalating per-seat BI software fees as you roll out analytics across your entire organization.',
    idealFor: 'Executive scorecards, geospatial flood & infrastructure maps, and department self-service reporting.',
    governanceNote: 'Pre-configured with corporate Single Sign-On (SSO) and role-based dashboard permissions.'
  },
  hive_metastore: {
    id: 'hive_metastore',
    name: 'Hive Metastore',
    badge: 'Data Catalog',
    category: 'orchestration',
    categoryLabel: 'Unified Lakehouse Catalog',
    summary: 'Maintains a single, authoritative directory of all datasets stored in your enterprise data lake.',
    description: 'Hive Metastore ensures every analytics tool sees the exact same table definitions, schemas, and historical partitions—creating a single source of truth across your organization.',
    businessValue: 'Prevents conflicting numbers between departments by standardizing dataset definitions.',
    idealFor: 'Long-term historical archives, regulatory data retention, and cost-effective object storage lakes.',
    governanceNote: 'Works seamlessly with any S3-compatible on-premise or cloud object storage.'
  },
  pgsql: {
    id: 'pgsql',
    name: 'PostgreSQL (HA)',
    badge: 'Core Reliability',
    category: 'compute',
    categoryLabel: 'High-Availability Enterprise Database',
    summary: 'Enterprise-grade relational database with automated failover for mission-critical operational records.',
    description: 'Deployed in a self-healing high-availability configuration, PostgreSQL safeguards your core operational registries, user permissions, and Entity 360 master records with zero single points of failure.',
    businessValue: 'Provides bank-grade transactional reliability without proprietary database licensing costs.',
    idealFor: 'Master Entity 360 registries, reference tables, and mission-critical operational applications.',
    governanceNote: 'Automated backups, encrypted connections, and instant replica failover.'
  }
};

const SOLUTION_BLUEPRINTS = {
  disaster: {
    tag: 'DESIGNED FOR PUBLIC SECTOR & INFRASTRUCTURE',
    isEntity: false,
    headline: 'Natural Disaster Analytics & Multi-Agency Early Warning',
    narrative: 'Architected for disaster management and civil defense operations, Dataxera Citadel unifies live rainfall, river-level, seismic, and weather telemetry with critical infrastructure and population registries—enabling command centers to anticipate impact and coordinate response faster.',
    outcomes: [
      { metric: 'Real-Time', label: 'Continuous monitoring of hydrological, weather & seismic feeds' },
      { metric: 'Sub-Second', label: 'Interactive geospatial risk maps & catchment drills for commanders' },
      { metric: '100% Sovereign', label: 'Full national & agency control over sensitive infrastructure data' }
    ],
    stages: [
      {
        num: '01 // COLLECT',
        engine: 'Automated Sensor Intake',
        detail: 'Gathers live telemetry from river gauges, weather radar, satellite feeds, and regional agency reports.'
      },
      {
        num: '02 // STREAM',
        engine: 'Live Event Bus',
        detail: 'Routes threshold breaches and emergency alerts in real time without bottlenecks during peak storms.'
      },
      {
        num: '03 // ENRICH',
        engine: 'Automated Risk Scoring',
        detail: 'Combines live readings with historical flood baselines and watershed terrain models.'
      },
      {
        num: '04 // UNIFY',
        engine: 'Cross-Agency Analytics',
        detail: 'Joins hazard zones with hospital capacities, evacuation shelters, and vulnerable population registries.'
      },
      {
        num: '05 // ACT',
        engine: 'Command Center Maps',
        detail: 'Delivers live geospatial dashboards to coordinate civil defense, logistics, and public advisories.'
      }
    ],
    questionsTitle: 'Decisions Enabled for Crisis & Operations Leaders',
    questionsDesc: 'Commanders and agency directors get immediate, unified answers without waiting for manual spreadsheet consolidation across ministries.',
    questions: [
      'Which river basins have crossed 90% critical flood thresholds in the last 15 minutes?',
      'How many hospitals, schools, and residents sit inside the projected 6-hour inundation zone?',
      'Which evacuation shelters have remaining capacity and unobstructed road access?',
      'How does current catchment rainfall compare against historical 10-year severe flood events?'
    ]
  },
  customer360: {
    tag: 'ENTITY 360 BLUEPRINT // FINANCIAL, TELECOM & RETAIL',
    isEntity: true,
    headline: 'Customer 360: Unified Customer Intelligence & Retention',
    narrative: 'Most enterprises store customer data across separate billing, CRM, mobile app, and support systems. Dataxera Citadel unifies these fragments into a single, real-time Golden Customer Record—unlocking personalized service, accurate lifetime value, and proactive churn prevention.',
    outcomes: [
      { metric: 'Single View', label: 'Unified customer profile across 15+ operational & digital channels' },
      { metric: 'Instant', label: 'Real-time cohort segmentation & churn risk detection' },
      { metric: 'Zero Lock-In', label: 'Full ownership of proprietary customer insights & models' }
    ],
    stages: [
      {
        num: '01 // COLLECT',
        engine: 'Omnichannel Intake',
        detail: 'Syncs CRM records, billing ledgers, branch interactions, and support tickets automatically.'
      },
      {
        num: '02 // STREAM',
        engine: 'Live Digital Signals',
        detail: 'Captures mobile app journeys, web checkouts, and payment events as they happen.'
      },
      {
        num: '03 // RESOLVE',
        engine: 'Identity Matching',
        detail: 'Deduplicates and links fragmented accounts into one trusted Golden Customer Record.'
      },
      {
        num: '04 // ANALYZE',
        engine: '360° Customer Hub',
        detail: 'Calculates real-time Customer Lifetime Value (LTV), product affinity, and churn propensity.'
      },
      {
        num: '05 // ACT',
        engine: 'Executive & Sales BI',
        detail: 'Equips relationship managers and marketing teams with live retention & growth dashboards.'
      }
    ],
    questionsTitle: 'Decisions Enabled for Commercial & Revenue Leaders',
    questionsDesc: 'Marketing, sales, and customer experience teams operate from one shared truth of customer health and profitability.',
    questions: [
      'Which high-value enterprise accounts experienced repeated digital checkout or service failures today?',
      'What is the true total relationship value of a customer across all subsidiaries and product lines?',
      'Which customer segments show early churn signals before renewal or contract expiration?',
      'Which acquisition channels deliver the highest 12-month retained revenue rather than just clicks?'
    ]
  },
  hr360: {
    tag: 'ENTITY 360 BLUEPRINT // ENTERPRISE WORKFORCE & TALENT',
    isEntity: true,
    headline: 'HR 360: Workforce Capacity, Skills & Retention Intelligence',
    narrative: 'Unifies disconnected HRIS records, payroll systems, corporate directories, training certifications, and project utilization into a governed Workforce 360 foundation—helping CHROs and business unit leaders align talent with strategic growth.',
    outcomes: [
      { metric: 'Enterprise SSO', label: 'Integrates directly with corporate LDAP & Active Directory' },
      { metric: '360° History', label: 'Complete visibility across hiring, skills, mobility & attrition' },
      { metric: 'Automated', label: 'Eliminates manual monthly headcount & compliance reporting' }
    ],
    stages: [
      {
        num: '01 // COLLECT',
        engine: 'HRIS & Directory Sync',
        detail: 'Consolidates payroll, org charts, learning platforms, and project time-tracking systems.'
      },
      {
        num: '02 // STREAM',
        engine: 'Workforce Updates',
        detail: 'Reflects role changes, onboarding milestones, and certification completions continuously.'
      },
      {
        num: '03 // MODEL',
        engine: 'Skills & Tenure Hub',
        detail: 'Builds longitudinal employee profiles and organization-wide capability matrices.'
      },
      {
        num: '04 // ANALYZE',
        engine: 'Capacity & Risk Analytics',
        detail: 'Correlates billable utilization, overtime patterns, and training gaps across divisions.'
      },
      {
        num: '05 // ACT',
        engine: 'CHRO Scorecards',
        detail: 'Provides leadership with workforce forecasting, succession planning, and retention alerts.'
      }
    ],
    questionsTitle: 'Decisions Enabled for HR & Executive Leadership',
    questionsDesc: 'Move beyond static annual headcount spreadsheets to proactive workforce planning and talent retention.',
    questions: [
      'Do we have enough certified specialists in each region to deliver next quarter’s committed projects?',
      'Which high-performing teams show elevated burnout or flight-risk indicators?',
      'How effectively are internal training investments translating into billable capability and promotion?',
      'What is our real-time headcount, contractor spend, and attrition rate by business unit?'
    ]
  },
  asset360: {
    tag: 'ENTITY 360 BLUEPRINT // ENERGY, LOGISTICS & MANUFACTURING',
    isEntity: true,
    headline: 'Asset & Vendor 360: Infrastructure Health & Supply Chain',
    narrative: 'Creates a unified operational view of physical equipment, facility networks, spare-parts inventories, and multi-tier vendor performance—reducing unplanned downtime and optimizing procurement spend.',
    outcomes: [
      { metric: 'Proactive', label: 'Early anomaly detection before critical equipment failure occurs' },
      { metric: 'Unified', label: 'Links live sensor health directly to ERP spare-parts & vendors' },
      { metric: 'Resilient', label: 'Built to scale across distributed plants, fleets & warehouses' }
    ],
    stages: [
      {
        num: '01 // COLLECT',
        engine: 'Equipment & ERP Intake',
        detail: 'Ingests industrial IoT telemetry, fleet GPS logs, maintenance tickets, and vendor invoices.'
      },
      {
        num: '02 // STREAM',
        engine: 'Condition Monitoring',
        detail: 'Streams temperature, vibration, and power load readings in real time.'
      },
      {
        num: '03 // ENRICH',
        engine: 'Failure Patterning',
        detail: 'Tracks Mean-Time-Between-Failure (MTBF) and historical maintenance costs per asset.'
      },
      {
        num: '04 // UNIFY',
        engine: 'Inventory & Vendor Join',
        detail: 'Matches at-risk assets against regional spare-parts stock and supplier lead times.'
      },
      {
        num: '05 // ACT',
        engine: 'Operations Command',
        detail: 'Prioritizes preventive maintenance schedules and scores vendor SLA compliance.'
      }
    ],
    questionsTitle: 'Decisions Enabled for Operations & Procurement Leaders',
    questionsDesc: 'Connect factory floor or field equipment telemetry directly to inventory and supplier decisions.',
    questions: [
      'Which critical assets are showing early mechanical anomalies and require scheduled maintenance?',
      'Do our regional warehouses hold enough spare parts to cover projected 30-day replacements?',
      'Which vendors consistently miss delivery SLAs or drive higher warranty failure rates?',
      'What is the true total cost of ownership (TCO) per asset class across all operating sites?'
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNavigation();
  initHeroInteractiveStage();
  initStackExplorer();
  initSolutionBlueprints();
  initEnterpriseInquiryForm();
});

function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 16) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initMobileNavigation() {
  const header = document.getElementById('site-header');
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  if (!header || !toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = header.classList.toggle('mobile-open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      header.classList.remove('mobile-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

function initHeroInteractiveStage() {
  const modeButtons = document.querySelectorAll('.stage-tab-btn');
  const flowView = document.getElementById('hero-topology-view');
  const readinessView = document.getElementById('hero-cp-view');

  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.getAttribute('data-stage-mode');
      if (target === 'control-plane') {
        flowView.classList.remove('active');
        readinessView.classList.add('active');
      } else {
        readinessView.classList.remove('active');
        flowView.classList.add('active');
      }
    });
  });

  const stepCards = document.querySelectorAll('.flow-step-card');
  const titleEl = document.getElementById('hero-insight-title');
  const descEl = document.getElementById('hero-insight-desc');

  stepCards.forEach(card => {
    card.addEventListener('click', () => {
      stepCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const key = card.getAttribute('data-flow-step');
      const data = HERO_STAGE_INSIGHTS[key];
      if (data && titleEl && descEl) {
        titleEl.textContent = data.title;
        descEl.textContent = data.desc;
      }
    });
  });
}

function initStackExplorer() {
  const catalogContainer = document.getElementById('stack-catalog-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!catalogContainer) return;

  let currentCategory = 'all';
  let selectedServiceId = 'nifi';

  function renderCatalog() {
    catalogContainer.innerHTML = '';
    const entries = Object.values(CITADEL_STACK_DATA).filter(item =>
      currentCategory === 'all' ? true : item.category === currentCategory
    );

    entries.forEach(item => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.id = `stack-card-${item.id}`;
      btn.className = `stack-service-item ${item.id === selectedServiceId ? 'selected' : ''}`;
      btn.innerHTML = `
        <div class="stack-item-head">
          <span class="stack-item-name">${item.name}</span>
          <span class="stack-item-badge">${item.badge}</span>
        </div>
        <span class="stack-item-category">${item.categoryLabel}</span>
        <p class="stack-item-summary">${item.summary}</p>
      `;
      btn.addEventListener('click', () => {
        selectedServiceId = item.id;
        renderCatalog();
        updateDossier(item.id);
      });
      catalogContainer.appendChild(btn);
    });
  }

  function updateDossier(serviceId) {
    const item = CITADEL_STACK_DATA[serviceId];
    if (!item) return;

    document.getElementById('dossier-category').textContent = item.categoryLabel;
    document.getElementById('dossier-title').textContent = item.name;
    document.getElementById('dossier-desc').textContent = item.description;
    document.getElementById('dossier-value').textContent = item.businessValue;
    document.getElementById('dossier-ideal').textContent = item.idealFor;
    document.getElementById('dossier-governance').textContent = item.governanceNote;
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter');
      const matching = Object.values(CITADEL_STACK_DATA).filter(i =>
        currentCategory === 'all' ? true : i.category === currentCategory
      );
      if (matching.length > 0 && !matching.some(m => m.id === selectedServiceId)) {
        selectedServiceId = matching[0].id;
        updateDossier(selectedServiceId);
      }
      renderCatalog();
    });
  });

  renderCatalog();
  updateDossier(selectedServiceId);
}

function initSolutionBlueprints() {
  const tabs = document.querySelectorAll('.solution-tab');
  if (!tabs.length) return;

  function renderBlueprint(key) {
    const bp = SOLUTION_BLUEPRINTS[key];
    if (!bp) return;

    const tagEl = document.getElementById('bp-tag');
    tagEl.textContent = bp.tag;
    tagEl.className = `blueprint-status-tag ${bp.isEntity ? 'entity-tag' : ''}`;

    document.getElementById('bp-headline').textContent = bp.headline;
    document.getElementById('bp-narrative').textContent = bp.narrative;

    const outcomesContainer = document.getElementById('bp-outcomes');
    outcomesContainer.innerHTML = bp.outcomes.map(o => `
      <div class="outcome-row">
        <span class="outcome-metric">${o.metric}</span>
        <span class="outcome-label">${o.label}</span>
      </div>
    `).join('');

    const stagesContainer = document.getElementById('bp-stages');
    stagesContainer.innerHTML = bp.stages.map(s => `
      <div class="pipeline-stage-step">
        <div class="stage-step-num">${s.num}</div>
        <div class="stage-step-engine">${s.engine}</div>
        <p class="stage-step-detail">${s.detail}</p>
      </div>
    `).join('');

    document.getElementById('bp-questions-title').textContent = bp.questionsTitle;
    document.getElementById('bp-questions-desc').textContent = bp.questionsDesc;
    document.getElementById('bp-questions-list').innerHTML = bp.questions.map(q => `
      <div class="exec-question-card">${q}</div>
    `).join('');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderBlueprint(tab.getAttribute('data-solution'));
    });
  });

  renderBlueprint('disaster');
}

function initEnterpriseInquiryForm() {
  const form = document.getElementById('enterprise-inquiry-form');
  const feedback = document.getElementById('inquiry-feedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const org = document.getElementById('inquiry-org').value.trim();
    const usecase = document.getElementById('inquiry-usecase').value;
    const env = document.getElementById('inquiry-env').value;

    feedback.textContent = `Thank you. Your executive briefing request for ${org} (${usecase} — ${env}) has been prepared. Our team at Dataxera Sdn Bhd can also be reached via github.com/dataxera/citadel.`;
    feedback.classList.add('visible');
    form.reset();
  });
}
