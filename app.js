/**
 * Dataxera Sdn Bhd — Corporate Website & Dataxera Citadel Interactive Engine
 */

const CITADEL_STACK_DATA = {
  nifi: {
    id: 'nifi',
    name: 'Apache NiFi',
    version: '2.9.0',
    category: 'ingestion',
    categoryLabel: 'Ingestion & Routing',
    chart: 'ghcr.io/konpyutaika/helm-charts/nifi-cluster:1.17.0',
    image: 'apache/nifi:2.9.0',
    operator: 'NiFiKop Operator v1.17.0',
    endpoint: 'https://nifi.{project}.{cluster-domain}:8443/nifi',
    summary: 'Visual dataflow ingestion, edge routing, backpressure management, and end-to-end data provenance.',
    description: 'Orchestrated via NiFiKop on Kubernetes with automated per-node JKS certificate provisioning, ZooKeeper/K8s state coordination, and Envoy Gateway TLS termination. Ideal for high-frequency sensor streams, legacy file drops, and API connectors.',
    yaml: `# Rendered by Citadel Platform Service (nifi/10-application.yml.j2)
apiVersion: nifi.konpyutaika.com/v1
kind: NifiCluster
metadata:
  name: dcx-nifi-cluster
  namespace: citadel-prod
spec:
  service:
    headlessEnabled: true
  nodeConfigGroups:
    default_group:
      imagePullPolicy: IfNotPresent
      storageConfigs:
        - mountPath: /opt/nifi/nifi-current/flowfile_repository
          name: flowfile-repo
          pvcSpec:
            accessModes: [ReadWriteOnce]
            resources:
              requests:
                storage: 50Gi
  listenersConfig:
    internalListeners:
      - type: https
        name: https
        containerPort: 8443
    sslSecrets:
      tlsSecretName: nifi-cluster-tls
      create: true`
  },
  kafka: {
    id: 'kafka',
    name: 'Apache Kafka',
    version: '4.0.0',
    category: 'ingestion',
    categoryLabel: 'Event Streaming',
    chart: 'ghcr.io/dataxera/citadel/charts/kafka:0.1.3',
    image: 'ghcr.io/dataxera/citadel/kafka:4.0.0-rev.2',
    operator: 'Strimzi Kafka Operator v0.50.1',
    endpoint: 'kafka-bootstrap.{project}.svc.cluster.local:9093',
    summary: 'Distributed, fault-tolerant event streaming backbone for real-time telemetry and Change Data Capture (CDC).',
    description: 'Managed through Strimzi Kafka Operator in KRaft mode (ZooKeeper-less Kafka 4.0) with automated mTLS listener encryption, RBAC policies, and seamless integration with Apache NiFi producers and Apache Doris routine load consumers.',
    yaml: `# Rendered by Citadel Platform Service (kafka/10-application.yml.j2)
apiVersion: kafka.strimzi.io/v1beta2
kind: Kafka
metadata:
  name: citadel-event-backbone
  namespace: citadel-prod
spec:
  kafka:
    version: 4.0.0
    replicas: 3
    listeners:
      - name: tls
        port: 9093
        type: internal
        tls: true
    storage:
      type: jbod
      volumes:
        - id: 0
          type: persistent-claim
          size: 100Gi
          deleteClaim: false`
  },
  airflow: {
    id: 'airflow',
    name: 'Apache Airflow',
    version: '3.2.2',
    category: 'orchestration',
    categoryLabel: 'Workflow Orchestration',
    chart: 'https://airflow.apache.org/airflow:1.22.0',
    image: 'ghcr.io/dataxera/citadel/airflow:3.2.2-rev.10',
    operator: 'Argo CD Application + Git-Sync v4.4.2',
    endpoint: 'https://airflow.{project}.{cluster-domain}',
    summary: 'Programmatic DAG scheduling, batch & micro-batch ETL orchestration, and dependency-aware pipeline execution.',
    description: 'Pre-integrated with Citadel Git Repositories via Kubernetes git-sync sidecars (v4.4.2), CloudNativePG metadata backend, Redis 7.2 task queues, Prometheus StatsD exporters, and centralized LDAP/SSO authentication.',
    yaml: `# Rendered by Citadel Platform Service (airflow/10-application.yml.j2)
airflow:
  image:
    repository: ghcr.io/dataxera/citadel/airflow
    tag: "3.2.2-rev.10"
  executor: CeleryExecutor
  dags:
    gitSync:
      enabled: true
      repo: ssh://git@github.com/dataxera/entity360-dags.git
      branch: main
      rev: HEAD
      wait: 60
  redis:
    image:
      repository: redis
      tag: "7.2-bookworm"`
  },
  trino: {
    id: 'trino',
    name: 'Trino',
    version: '482',
    category: 'compute',
    categoryLabel: 'Federated SQL Compute',
    chart: 'https://trinodb.github.io/charts/trino:1.41.0',
    image: 'trinodb/trino:482',
    operator: 'Citadel Helm Orchestrator + JKS TLS Init',
    endpoint: 'https://trino.{project}.{cluster-domain}:443',
    summary: 'Distributed ANSI SQL query engine for interactive federation across data lakes, relational stores, and streams.',
    description: 'Enables cross-domain Entity 360 and disaster intelligence joins without data movement. Pre-wired to Hive Metastore (S3 object storage), PostgreSQL clusters, Apache Doris, and Kafka topics with end-to-end HTTPS/TLS.',
    yaml: `# Rendered by Citadel Platform Service (trino/10-application.yml.j2)
image:
  repository: trinodb/trino
  tag: "482"
server:
  workers: 4
  node:
    environment: production
  config:
    https:
      enabled: true
      port: 8443
      keystore:
        path: /etc/trino/tls/keystore.jks
additionalCatalogs:
  hive: |
    connector.name=hive
    hive.metastore.uri=thrift://hms-service:9083
  postgresql: |
    connector.name=postgresql
    connection-url=jdbc:postgresql://pg-rw:5432/entity360`
  },
  doris: {
    id: 'doris',
    name: 'Apache Doris',
    version: '2.1.8',
    category: 'compute',
    categoryLabel: 'Real-Time MPP OLAP',
    chart: 'https://charts.selectdb.com/doris:25.8.0',
    image: 'selectdb/doris.fe-ubuntu:2.1.8 & be-ubuntu:2.1.8',
    operator: 'Doris Operator v25.8.0 (operator-26.0.1)',
    endpoint: 'doris-fe-mysql.{project}.svc.cluster.local:9030',
    summary: 'Sub-second MPP analytical data warehouse built for high-concurrency serving and real-time vector/OLAP queries.',
    description: 'Separates Frontend (FE) metadata coordination and Backend (BE) vectorized storage/compute nodes via the Kubernetes Doris Operator. Powers millisecond Entity 360 profile lookups and high-velocity disaster telemetry aggregation.',
    yaml: `# Rendered by Citadel Platform Service (doris/10-application.yml.j2)
apiVersion: Crds.selectdb.com/v1
kind: DorisCluster
metadata:
  name: citadel-doris-olap
  namespace: citadel-prod
spec:
  feSpec:
    replicas: 3
    image: selectdb/doris.fe-ubuntu:2.1.8
    requests:
      cpu: "4"
      memory: 8Gi
  beSpec:
    replicas: 3
    image: selectdb/doris.be-ubuntu:2.1.8
    requests:
      cpu: "8"
      memory: 16Gi`
  },
  superset: {
    id: 'superset',
    name: 'Apache Superset',
    version: '6.1.0',
    category: 'bi',
    categoryLabel: 'Enterprise BI & Geospatial',
    chart: 'https://apache.github.io/superset:0.15.0',
    image: 'ghcr.io/dataxera/citadel/superset:6.1.0-rev.2',
    operator: 'Citadel Helm Orchestrator + Envoy Route',
    endpoint: 'https://superset.{project}.{cluster-domain}',
    summary: 'Modern enterprise business intelligence, geospatial deck.gl visual analytics, and rich SQL IDE workspace.',
    description: 'Custom-packaged by Dataxera (`6.1.0-rev.2`) with pre-installed database drivers for Trino, Apache Doris, and PostgreSQL, backed by Redis caching and CloudNativePG metadata persistence.',
    yaml: `# Rendered by Citadel Platform Service (superset/10-application.yml.j2)
image:
  repository: ghcr.io/dataxera/citadel/superset
  tag: "6.1.0-rev.2"
supersetNode:
  replicas: 2
  connections:
    db_host: citadel-superset-db-rw
    db_port: "5432"
    redis_host: citadel-superset-redis
configOverrides:
  enable_oauth: |
    AUTH_TYPE = AUTH_OAUTH
    ENABLE_PROXY_FIX = True`
  },
  hive_metastore: {
    id: 'hive_metastore',
    name: 'Hive Metastore',
    version: '4.2.0',
    category: 'orchestration',
    categoryLabel: 'Metadata & Lakehouse Catalog',
    chart: 'ghcr.io/dataxera/citadel/charts/hive-metastore:0.1.12',
    image: 'ghcr.io/dataxera/citadel/hive-metastore:4.2.0-rev.7',
    operator: 'Citadel Custom Helm Chart v0.1.12',
    endpoint: 'thrift://hms.{project}.svc.cluster.local:9083',
    summary: 'Centralized schema registry and partition catalog bridging S3-compatible object storage with Trino and Doris.',
    description: 'Maintained as a dedicated Dataxera container image (`4.2.0-rev.7`) and Helm chart (`0.1.12`), automating S3 endpoint credentials, PostgreSQL backing store schema initialization, and Thrift service discovery.',
    yaml: `# Rendered by Citadel Platform Service (hive_metastore/10-application.yml.j2)
image:
  repository: ghcr.io/dataxera/citadel/hive-metastore
  tag: "4.2.0-rev.7"
metastore:
  warehouseDir: s3a://citadel-lakehouse/warehouse
  s3:
    endpoint: https://s3.ap-southeast-1.amazonaws.com
    pathStyleAccess: true
  database:
    host: hms-postgres-rw.citadel-prod.svc
    port: 5432`
  },
  pgsql: {
    id: 'pgsql',
    name: 'PostgreSQL (CNPG)',
    version: '18.4',
    category: 'compute',
    categoryLabel: 'HA Transactional Store',
    chart: 'https://cloudnative-pg.github.io/charts/cluster:0.5.0',
    image: 'ghcr.io/cloudnative-pg/postgresql:18.4',
    operator: 'CloudNativePG Operator v1.28.1 + PgBouncer 1.25.1',
    endpoint: 'pg-cluster-rw.{project}.svc.cluster.local:5432',
    summary: 'High-availability operational and metadata PostgreSQL clusters with automated failover and PgBouncer pooling.',
    description: 'Powers both internal service metadata (Airflow, Superset, Hive Metastore) and dedicated operational Entity 360 stores with synchronous/asynchronous replication, automated TLS certificates, and read-only replica load balancing.',
    yaml: `# Rendered by Citadel Platform Service (pgsql/10-cluster.yml.j2)
apiVersion: postgresql.cnpg.io/v1
kind: Cluster
metadata:
  name: citadel-pg-ha
  namespace: citadel-prod
spec:
  instances: 3
  imageName: ghcr.io/cloudnative-pg/postgresql:18.4
  certificates:
    serverTLSSecret: pg-server-cert
    replicationTLSSecret: pg-replication-cert
  storage:
    size: 50Gi`
  }
};

const SOLUTION_BLUEPRINTS = {
  disaster: {
    tag: 'FIELD-TESTED REFERENCE ARCHITECTURE',
    isEntity: false,
    headline: 'Natural Disaster Analytics & Multi-Agency Early Warning',
    narrative: 'Validated in real-world disaster intelligence scenarios, Dataxera Citadel unifies high-velocity hydrological, meteorological, seismic, and satellite telemetry with civil defense asset registries. Agencies gain sub-second flood basin forecasting, automated threshold alerting, and unified situational awareness.',
    outcomes: [
      { metric: '< 800ms', label: 'Geospatial catchment & sensor anomaly query latency (Doris + Trino)' },
      { metric: '100% Open', label: 'Full data sovereignty for national & state disaster management agencies' },
      { metric: '24/7 HA', label: 'Multi-replica Kafka, CNPG, and Doris clusters on Kubernetes' }
    ],
    stages: [
      {
        num: '01 // INGEST',
        engine: 'Apache NiFi 2.9.0',
        detail: 'Ingests telemetry from rainfall gauges, river water-level IoT sensors, Doppler radar feeds, and satellite GeoTIFF metadata with guaranteed backpressure.'
      },
      {
        num: '02 // STREAM',
        engine: 'Apache Kafka 4.0.0',
        detail: 'Buffers and partitions real-time sensor readings and emergency dispatch events across high-availability KRaft broker topics.'
      },
      {
        num: '03 // ORCHESTRATE',
        engine: 'Airflow 3.2.2 + HMS 4.2',
        detail: 'Schedules spatial-temporal catchment aggregation DAGs and catalogs historical climate baselines in S3 via Hive Metastore.'
      },
      {
        num: '04 // COMPUTE & OLAP',
        engine: 'Doris 2.1.8 + Trino 482',
        detail: 'Doris ingests live Kafka streams via Routine Load for sub-second OLAP; Trino federates sensor alerts with population & hospital registries.'
      },
      {
        num: '05 // COMMAND BI',
        engine: 'Apache Superset 6.1.0',
        detail: 'Renders live geospatial flood-risk polygons, evacuation shelter capacity heatmaps, and watershed early-warning dashboards.'
      }
    ],
    codeTitle: 'Federated Flood-Basin Risk & Critical Infrastructure Join (Trino + Doris)',
    codeDesc: 'Executes a live cross-catalog query combining streaming hydrological sensor anomalies in Apache Doris with vulnerable infrastructure registries in PostgreSQL and historical flood plains in S3.',
    codeSnippet: `-- Executed via Trino 482 across Doris OLAP, PostgreSQL & S3 Lakehouse
SELECT
  b.basin_code,
  b.district_name,
   AVG(s.water_level_m) AS current_level_m,
  b.critical_flood_threshold_m,
  COUNT(DISTINCT f.facility_id) AS exposed_hospitals_and_shelters,
  SUM(p.estimated_residents) AS affected_population
FROM doris.telemetry.river_sensor_stream s
JOIN postgresql.civil_defense.watershed_basins b
  ON s.station_basin_id = b.basin_id
JOIN hive.geospatial.critical_facilities f
  ON ST_Contains(ST_GeometryFromText(b.flood_polygon_wkt), ST_Point(f.lon, f.lat))
JOIN postgresql.census.district_population p
  ON b.district_id = p.district_id
WHERE s.event_timestamp >= current_timestamp - INTERVAL '15' MINUTE
GROUP BY b.basin_code, b.district_name, b.critical_flood_threshold_m
HAVING AVG(s.water_level_m) >= (b.critical_flood_threshold_m * 0.92)
ORDER BY affected_population DESC;`
  },
  customer360: {
    tag: 'ENTITY 360 ARCHITECTURE // COMMERCIAL & FINANCIAL',
    isEntity: true,
    headline: 'Customer 360: Real-Time Identity Resolution & Omnichannel Intelligence',
    narrative: 'Consolidates fragmented customer touchpoints across core banking/ERP databases, mobile/web clickstreams, CRM interactions, and billing systems into a governed Golden Customer Record—eliminating data silos while preserving sub-second analytical speed.',
    outcomes: [
      { metric: 'Single View', label: 'Deterministic & probabilistic entity resolution across 15+ source systems' },
      { metric: '< 50ms', label: 'Point-lookup & cohort segmentation response time in Apache Doris' },
      { metric: 'Zero Lock-In', label: 'Open Iceberg/Hive S3 storage paired with ANSI SQL in Trino' }
    ],
    stages: [
      {
        num: '01 // INGEST',
        engine: 'Apache NiFi 2.9.0',
        detail: 'Captures CDC database logs, CRM webhook payloads, payment gateway files, and omnichannel support tickets.'
      },
      {
        num: '02 // STREAM',
        engine: 'Apache Kafka 4.0.0',
        detail: 'Streams real-time digital banking/e-commerce behavioral events and transaction authorizations.'
      },
      {
        num: '03 // ENTITY MASTERING',
        engine: 'Airflow 3.2.2 + PG 18.4',
        detail: 'Runs identity-graph deduplication, household linking, and Customer Lifetime Value (LTV) scoring pipelines.'
      },
      {
        num: '04 // SERVE & FEDERATE',
        engine: 'Doris 2.1.8 + Trino 482',
        detail: 'Serves unified customer 360 profiles from Doris while Trino federates raw S3 behavioral history with live ledger balances.'
      },
      {
        num: '05 // INSIGHTS & BI',
        engine: 'Apache Superset 6.1.0',
        detail: 'Delivers self-service retention cohorts, next-best-offer propensity funnels, and executive revenue attribution.'
      }
    ],
    codeTitle: 'Unified Customer 360 Golden Record & Real-Time Churn Signal Query',
    codeDesc: 'Combines the mastered Customer 360 entity hub in Apache Doris with real-time support escalations and mobile session drop-offs.',
    codeSnippet: `-- Customer 360 Cohort & Real-Time Churn Propensity (Doris 2.1.8 MPP)
SELECT
  c.golden_entity_id,
  c.enterprise_segment,
  c.lifetime_value_myr,
  COUNT(DISTINCT e.event_id) AS failed_checkout_events_24h,
  MAX(t.ticket_severity) AS latest_support_severity,
  c.churn_risk_score
FROM doris.entity360.customer_golden_record c
LEFT JOIN doris.clickstream.realtime_app_events e
  ON c.golden_entity_id = e.resolved_customer_id
  AND e.event_type = 'payment_declined'
  AND e.event_time >= NOW() - INTERVAL 24 HOUR
LEFT JOIN postgresql.crm.support_tickets t
  ON c.crm_account_id = t.account_id
  AND t.status = 'OPEN'
WHERE c.enterprise_segment IN ('PREMIER', 'CORPORATE')
GROUP BY 1, 2, 3, 6
HAVING failed_checkout_events_24h >= 2 OR c.churn_risk_score > 0.78
ORDER BY c.lifetime_value_myr DESC;`
  },
  hr360: {
    tag: 'ENTITY 360 ARCHITECTURE // WORKFORCE & TALENT',
    isEntity: true,
    headline: 'HR 360: Longitudinal Workforce Analytics & Skills Ontology',
    narrative: 'Unifies disconnected HRIS records, payroll ledgers, LDAP directory structures, learning management systems (LMS), and project allocation tools into a governed Employee 360 foundation—empowering leadership with workforce capacity planning and attrition prevention.',
    outcomes: [
      { metric: 'LDAP + SSO', label: 'Native Citadel LDAP directory sync and role-scoped project governance' },
      { metric: '360° Lineage', label: 'Full historical tracking from recruitment to career progression & skills' },
      { metric: 'Automated', label: 'Scheduled compliance, headcount, and DEI reporting via Airflow & Superset' }
    ],
    stages: [
      {
        num: '01 // INGEST',
        engine: 'NiFi 2.9 + LDAP Sync',
        detail: 'Extracts organizational hierarchies from LDAP/Active Directory, HRIS APIs, time-tracking systems, and LMS certification logs.'
      },
      {
        num: '02 // STREAM',
        engine: 'Apache Kafka 4.0.0',
        detail: 'Propagates role changes, badge/access events, and project time-booking updates across internal enterprise systems.'
      },
      {
        num: '03 // MODEL & GOVERN',
        engine: 'Airflow 3.2.2 + PG 18.4',
        detail: 'Constructs longitudinal employee SCD Type-2 histories, skills matrices, and anonymized compensation benchmarks.'
      },
      {
        num: '04 // ANALYZE',
        engine: 'Trino 482 + Doris 2.1.8',
        detail: 'Joins resource utilization with project delivery KPIs across engineering, operations, and regional business units.'
      },
      {
        num: '05 // EXECUTIVE BI',
        engine: 'Apache Superset 6.1.0',
        detail: 'Visualizes department capacity vs. demand, critical skill coverage gaps, and flight-risk indicators.'
      }
    ],
    codeTitle: 'Workforce Capacity, Critical Skills Coverage & Attrition Risk Analysis',
    codeDesc: 'Federates HRIS employee profiles, LMS technical certifications, and active project utilization to identify delivery bottlenecks.',
    codeSnippet: `-- HR 360 Departmental Skill Coverage & Utilization Query
SELECT
  d.division_name,
  s.skill_domain,
  COUNT(DISTINCT emp.employee_id) AS certified_specialists,
  ROUND(AVG(u.billable_utilization_pct), 1) AS avg_utilization_pct,
  SUM(CASE WHEN emp.attrition_risk_tier = 'HIGH' THEN 1 ELSE 0 END) AS high_flight_risk_count
FROM doris.hr360.employee_golden_profile emp
JOIN doris.hr360.employee_skill_certifications s
  ON emp.employee_id = s.employee_id
JOIN postgresql.erp.project_utilization_monthly u
  ON emp.employee_id = u.employee_id
JOIN postgresql.hris.divisions d
  ON emp.division_id = d.division_id
WHERE emp.employment_status = 'ACTIVE'
  AND s.certification_valid_until >= CURRENT_DATE
GROUP BY d.division_name, s.skill_domain
ORDER BY high_flight_risk_count DESC, avg_utilization_pct DESC;`
  },
  asset360: {
    tag: 'ENTITY 360 ARCHITECTURE // INFRASTRUCTURE & SUPPLY CHAIN',
    isEntity: true,
    headline: 'Asset & Vendor 360: Critical Infrastructure & Supply Chain Telemetry',
    narrative: 'Creates a living digital twin of physical infrastructure assets, fleet equipment, and multi-tier vendor networks. Combines real-time IoT health telemetry with ERP maintenance history and procurement ledgers.',
    outcomes: [
      { metric: 'Real-Time', label: 'Continuous streaming ingestion from industrial IoT & SCADA gateways' },
      { metric: 'Federated', label: 'Query ERP, warehouse management, and S3 telemetry lakes in place' },
      { metric: 'Resilient', label: 'Dependency-tracked service lifecycle ensures zero orphaned pipelines' }
    ],
    stages: [
      {
        num: '01 // INGEST',
        engine: 'Apache NiFi 2.9.0',
        detail: 'Collects MQTT/OPC-UA industrial sensor payloads, fleet GPS coordinates, and ERP procurement invoices.'
      },
      {
        num: '02 // STREAM',
        engine: 'Apache Kafka 4.0.0',
        detail: 'Decouples high-frequency equipment vibration, thermal, and voltage streams for downstream consumers.'
      },
      {
        num: '03 // ORCHESTRATE',
        engine: 'Airflow 3.2.2 + HMS 4.2',
        detail: 'Automates Mean-Time-Between-Failure (MTBF) feature engineering and archives raw sensor parquets to S3.'
      },
      {
        num: '04 // COMPUTE & OLAP',
        engine: 'Doris 2.1.8 + Trino 482',
        detail: 'Maintains real-time asset health state tables in Doris and cross-references spare-parts inventory via Trino.'
      },
      {
        num: '05 // OPERATIONS BI',
        engine: 'Apache Superset 6.1.0',
        detail: 'Powers predictive maintenance work-order queues, vendor SLA scorecards, and fleet availability maps.'
      }
    ],
    codeTitle: 'Predictive Maintenance & Spare-Parts Inventory Federation',
    codeDesc: 'Correlates live equipment vibration anomalies in Doris with ERP spare-part stock levels and vendor lead times.',
    codeSnippet: `-- Asset 360 Predictive Maintenance & Supply Chain Readiness
SELECT
  a.asset_serial_no,
  a.facility_region,
  a.asset_category,
  t.rolling_vibration_rms,
  i.spare_part_sku,
  i.warehouse_qty_on_hand,
  v.vendor_name,
  v.avg_lead_time_days
FROM doris.asset360.equipment_health_realtime t
JOIN doris.asset360.asset_master_registry a
  ON t.asset_id = a.asset_id
JOIN postgresql.erp.spare_parts_inventory i
  ON a.critical_component_sku = i.spare_part_sku
JOIN postgresql.procurement.vendor_master v
  ON i.primary_vendor_id = v.vendor_id
WHERE t.anomaly_score >= 0.85
  AND t.recorded_at >= NOW() - INTERVAL 30 MINUTE
ORDER BY t.anomaly_score DESC;`
  }
};

const DEPLOYMENT_COMMANDS = {
  k3s: `# 1. Install k3s (v1.28+ verified) with custom ingress/LB control
curl -sfL https://get.k3s.io | sh -
k3s server \\
  --disable traefik \\
  --disable servicelb \\
  --cluster-cidr 192.168.0.0/16,fd42:0:0/64 \\
  --service-cidr 10.96.0.0/12,fd43:0:0/64

# 2. Deploy MetalLB for Bare-Metal / Self-Hosted LoadBalancer IPs
kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/main/manifests/metallb.yaml
kubectl wait --for=condition=ready pod --selector app=metallb -n metallb-system --timeout=120s

# 3. Provision Layer-2 IP Address Pool for Citadel Envoy Gateway
kubectl apply -f - <<EOF
apiVersion: metallb.io/v1beta1
kind: IPAddressPool
metadata:
  name: default-pool
  namespace: metallb-system
spec:
  addresses:
    - 192.168.1.240-192.168.1.250
---
apiVersion: metallb.io/v1beta1
kind: L2Advertisement
metadata:
  name: default-l2
  namespace: metallb-system
spec:
  ipAddressPools:
    - default-pool
EOF`,

  cloud: `# 1. Install CloudNativePG Operator Prerequisite on EKS / GKE / AKS
kubectl apply --server-side -f \\
  https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.28/releases/cnpg-1.28.1.yaml

# 2. Clone Dataxera Citadel & Register Target Kubernetes Cluster
git clone https://github.com/dataxera/citadel.git
cd citadel

# 3. Citadel automatically provisions cluster operators & project gateways:
#    - Argo CD (v2.14.2) + Dex SSO (v2.41.1)
#    - cert-manager (v1.20.0) with automated PKI & wildcard certificates
#    - Envoy Gateway (v1.8.1) bound to Cloud LoadBalancer
#    - Strimzi Kafka (v0.50.1), NiFiKop (v1.17.0), Doris Operator (v25.8.0)`,

  dev: `# 1. Clone the 100% Open Source Dataxera Citadel Repository (AGPLv3)
git clone https://github.com/dataxera/citadel.git
cd citadel

# 2. Start Backing Services (PostgreSQL 5432, Redis 6379, Nginx Proxy 8080)
./start.sh
# Equivalent to: docker compose --profile=app up -d --build

# 3. Run Unified Developer Environment Setup (uv + npm + Alembic migrations)
python setup-dev.py

# 4. Access Citadel Unified Control Plane
open http://localhost:8080`
};

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileNavigation();
  initHeroInteractiveStage();
  initStackExplorer();
  initSolutionBlueprints();
  initDeploymentTerminal();
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
  const topologyView = document.getElementById('hero-topology-view');
  const cpView = document.getElementById('hero-cp-view');

  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.getAttribute('data-stage-mode');
      if (target === 'control-plane') {
        topologyView.classList.remove('active');
        cpView.classList.add('active');
      } else {
        cpView.classList.remove('active');
        topologyView.classList.add('active');
      }
    });
  });

  const nodes = document.querySelectorAll('.topology-node');
  const titleEl = document.getElementById('hero-inspector-title');
  const endpointEl = document.getElementById('hero-inspector-endpoint');
  const descEl = document.getElementById('hero-inspector-desc');

  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');
      const key = node.getAttribute('data-service');
      const data = CITADEL_STACK_DATA[key];
      if (data && titleEl && endpointEl && descEl) {
        titleEl.textContent = `${data.name} v${data.version} — ${data.operator}`;
        endpointEl.textContent = data.endpoint;
        descEl.textContent = data.description;
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
          <span class="stack-item-version">v${item.version}</span>
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

    document.getElementById('dossier-category').textContent = `CITADEL-0.1.0 STACK // ${item.categoryLabel}`;
    document.getElementById('dossier-title').textContent = `${item.name} (${item.version})`;
    document.getElementById('dossier-desc').textContent = item.description;
    document.getElementById('dossier-image').textContent = item.image;
    document.getElementById('dossier-chart').textContent = item.chart;
    document.getElementById('dossier-operator').textContent = item.operator;
    document.getElementById('dossier-endpoint').textContent = item.endpoint;
    document.getElementById('dossier-yaml').textContent = item.yaml;
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

    document.getElementById('bp-code-title').textContent = bp.codeTitle;
    document.getElementById('bp-code-desc').textContent = bp.codeDesc;
    document.getElementById('bp-code-snippet').textContent = bp.codeSnippet;
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

function initDeploymentTerminal() {
  const tabs = document.querySelectorAll('.term-tab-btn');
  const codeEl = document.getElementById('deploy-terminal-code');
  const copyBtn = document.getElementById('copy-deploy-btn');
  if (!tabs.length || !codeEl) return;

  let currentKey = 'k3s';

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentKey = tab.getAttribute('data-deploy-tab');
      codeEl.textContent = DEPLOYMENT_COMMANDS[currentKey] || '';
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const text = DEPLOYMENT_COMMANDS[currentKey] || '';
      navigator.clipboard.writeText(text).then(() => {
        const original = copyBtn.textContent;
        copyBtn.textContent = 'Copied to Clipboard ✓';
        setTimeout(() => {
          copyBtn.textContent = original;
        }, 2000);
      });
    });
  }

  codeEl.textContent = DEPLOYMENT_COMMANDS[currentKey];
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

    feedback.textContent = `Architecture briefing request logged for ${org} (${usecase} on ${env}). You can also open an issue or discussion directly at github.com/dataxera/citadel.`;
    feedback.classList.add('visible');
    form.reset();
  });
}
