# Master Class: Orchestration with Kubernetes

Kubernetes (K8s) is the "Operating System of the Cloud". It manages containers across a cluster of virtual machines. To master K8s, you must understand the **Control Plane vs. Node** architecture and the **Reconciliation Loop**.

## 1. Kubernetes Architecture

A K8s cluster consists of a Control Plane (The Brain) and several Worker Nodes (The Brawn).

### The Control Plane
- **API Server:** The entry point for all commands (`kubectl`).
- **etcd:** The cluster's "Source of Truth" (distributed key-value store).
- **Scheduler:** Decides which node a Pod should live on.
- **Controller Manager:** The "Reconciliation Loop" that maintains the desired state.

### The Worker Nodes
- **Kubelet:** The agent that runs on each node and ensures containers are running.
- **Kube-proxy:** Handles network rules and load balancing.
- **Container Runtime:** (e.g., Docker, containerd).

---

## 2. The Deployment Object: Visual Breakdown

A Deployment doesn't manage Pods directly; it manages a **ReplicaSet**.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3 # DESIRED STATE
  selector:
    matchLabels:
      app: web
  template: # THE POD BLUEPRINT
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web-container
        image: nginx:1.25
        resources:
          limits:
            memory: "256Mi"
            cpu: "500m"
```

### The Reconciliation Loop Process
1. `kubectl apply` sends YAML to API Server.
2. Deployment Controller sees `replicas: 3`.
3. It creates a ReplicaSet.
4. ReplicaSet sees 0 Pods running, creates 3.
5. Scheduler assigns Pods to healthy Nodes.

---

## 3. Services and Networking

How do you reach a Pod that might die and get replaced? Use a **Service**.

| Service Type | Scope | Description |
| :--- | :--- | :--- |
| **ClusterIP** | Internal | Accessible only within the cluster. |
| **NodePort** | External | Exposes the service on a static port on each Node. |
| **LoadBalancer** | External | Provisions a cloud provider's Load Balancer (AWS/Azure). |
| **Ingress** | External | Managed HTTP/S routing with hostnames and paths. |

---

## 4. Master Level: Health Checks
Never deploy without **Liveness** and **Readiness** probes.

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 3
  periodSeconds: 3
```
- **Liveness:** Restarts the container if it fails.
- **Readiness:** Stops sending traffic if the app is busy/initializing.

---

## 5. Summary Commands
- `kubectl get pods -w`: Watch pods in real-time.
- `kubectl exec -it <pod> -- /bin/sh`: Open a shell inside a pod.
- `kubectl logs -f <pod>`: Stream logs.
- `kubectl describe pod <pod>`: Debug why a pod failed to start.
