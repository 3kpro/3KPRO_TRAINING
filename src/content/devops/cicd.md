# Master Class: CI/CD Pipelines

CI/CD is the engine of DevOps. It transforms manual, error-prone releases into a high-velocity, automated factory. To master CI/CD, you must understand the **Pipeline Anatomy** and the **Shift Left** principle.

## 1. The Pipeline Anatomy

A production-grade pipeline is divided into logical stages, each with a specific gate.

### Stage 1: Continuous Integration (CI)
- **Trigger:** Commit to feature branch.
- **Goal:** Ensure code quality and buildability.
- **Tasks:** 
    - Linting (Style check)
    - Unit Testing (Logic check)
    - Static Analysis (Security/Bugs)
    - Build Artifact (Binary/Image)

### Stage 2: Continuous Delivery (CD)
- **Goal:** Prepare for release.
- **Tasks:**
    - Integration Testing
    - Deployment to Staging/UAT
    - Smoke Tests

### Stage 3: Continuous Deployment (CD)
- **Goal:** Zero-touch production release.
- **Strategy:** Blue/Green or Canary deployments.

---

## 2. Advanced: GitHub Actions Visual Breakdown

GitHub Actions is based on **Events**, **Jobs**, and **Steps**.

```yaml
name: Production_Pipeline
on: [push] # The EVENT

jobs:
  build: # The JOB (runs on a fresh VM)
    runs-on: ubuntu-latest
    steps: # The STEPS (sequential)
      - uses: actions/checkout@v4
      - name: Build Application
        run: npm run build
```

### Visual Structure of a Runner
1. **Runner VM:** A clean environment for every job.
2. **Contexts:** Variables like `${{ secrets.GITHUB_TOKEN }}`.
3. **Artifacts:** Persistent storage for build files shared between jobs.

---

## 3. Shift Left Security (DevSecOps)

Mastering CI/CD means moving security to the earliest possible stage.
- **SCA (Software Composition Analysis):** Scanning `package.json` for vulnerable dependencies.
- **SAST (Static Application Security Testing):** Scanning source code for hardcoded secrets or SQL injection patterns.

---

## 4. Deployment Strategies Breakdown

| Strategy | Risk | Description |
| :--- | :--- | :--- |
| **Recreate** | High | Version A is terminated, then Version B is started. (Downtime). |
| **Rolling** | Medium | Instances are updated one by one. (No Downtime, mixed versions). |
| **Blue/Green** | Low | New environment (Green) is built next to Old (Blue). Switch traffic instantly. |
| **Canary** | Lowest | Route 5% of traffic to Version B, monitor, then scale. |

---

## 5. Master Challenge
1. Create a pipeline that fails if test coverage drops below 80%.
2. Implement an automated "Rollback" trigger if production latency spikes after a deployment.
