# Dataxera Sdn Bhd — Corporate Website (`dataxera.github.io`)

Official corporate website for **Dataxera Sdn Bhd**, showcasing **[Dataxera Citadel](https://github.com/dataxera/citadel)** — the 100% open-source (`GNU AGPLv3`) Kubernetes-native Data & AI Orchestration Platform.

## Highlights Covered

- **Dataxera Citadel Control Plane**: Operator-driven Kubernetes orchestration (`v1.28+`, `k3s`, `MetalLB`, `EKS`, `GKE`, `AKS`), end-to-end TLS (`cert-manager` + `Envoy Gateway`), topological dependency protection (`Dependency Tracker`), and centralized SSO/LDAP (`Dex IdP`).
- **8-Engine Managed Data & OLAP Stack (`citadel-0.1.0`)**:
  - **Apache NiFi (`2.9.0`)** — Dataflow ingestion, routing & provenance
  - **Apache Kafka (`4.0.0`)** — Distributed KRaft event streaming backbone
  - **Apache Airflow (`3.2.2`)** — DAG orchestration with Git-Sync (`v4.4.2`)
  - **Trino (`482`)** — Distributed federated SQL query engine
  - **Apache Doris (`2.1.8`)** — Real-time MPP analytical data warehouse
  - **Apache Superset (`6.1.0`)** — Enterprise BI, geospatial analytics & SQL Lab
  - **Hive Metastore (`4.2.0`)** — Centralized lakehouse schema catalog for S3
  - **PostgreSQL (`18.4`)** — High-availability CloudNativePG clusters with PgBouncer
- **Field-Tested & Enterprise Solutions**:
  - **Natural Disaster Analytics & Early Warning** (Field-tested reference workload)
  - **Customer 360 Intelligence** (Entity 360)
  - **HR 360 & Workforce Analytics** (Entity 360)
  - **Infrastructure & Asset 360** (Entity 360)

## Local Preview

Serve the static files from the repository root:

```bash
python3 -m http.server 8000
```
