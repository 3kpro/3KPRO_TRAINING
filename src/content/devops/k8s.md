# Orchestration with Kubernetes

Kubernetes (K8s) is an open-source system for automating deployment, scaling, and management of containerized applications.

## Key Components

- **Pods:** The smallest deployable units of computing that you can create and manage in Kubernetes.
- **Deployments:** A Deployment provides declarative updates for Pods and ReplicaSets.
- **Services:** An abstract way to expose an application running on a set of Pods as a network service.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
  - name: my-app-container
    image: my-app:latest
```
