# 🛒 ShopSphere – Cloud Native DevOps Platform

Production-style three-tier e-commerce application demonstrating modern DevOps practices including CI/CD automation, containerization, Kubernetes orchestration, cloud deployment, infrastructure as code, monitoring, and autoscaling.

---

# 🚀 Project Highlights

✅ Automated CI/CD Pipeline with Jenkins
✅ Dockerized Multi-Service Architecture
✅ Kubernetes Deployment & Orchestration
✅ AWS Cloud Infrastructure
✅ Infrastructure Provisioning using Terraform
✅ Monitoring with Prometheus & Grafana
✅ Kubernetes Autoscaling Support
✅ Reverse Proxy Configuration
✅ Production-Style Deployment Workflow

---

# 🏗 System Architecture

```text id="abvbrt"
Developer
   ↓
GitHub Repository
   ↓
Jenkins CI/CD Pipeline
   ↓
Docker Image Build
   ↓
Kubernetes Deployment
   ↓
AWS Cloud Infrastructure
   ↓
Monitoring with Prometheus & Grafana
```

---

# ⚙️ DevOps Stack

| Category               | Technologies           |
| ---------------------- | ---------------------- |
| CI/CD                  | Jenkins                |
| Containerization       | Docker, Docker Compose |
| Orchestration          | Kubernetes             |
| Cloud Platform         | AWS                    |
| Infrastructure as Code | Terraform              |
| Monitoring             | Prometheus, Grafana    |
| Reverse Proxy          | Apache                 |
| Database               | PostgreSQL             |
| Version Control        | Git, GitHub            |

---

# 💻 Application Stack

## Frontend

* React
* Vite
* TailwindCSS
* Redux Toolkit
* Axios
* React Router

## Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt
* Zod Validation

## Database

* PostgreSQL

---

# 📂 Project Structure

```text id="7t70dj"
ShopSphere/
│
├── apache/conf/          # Apache reverse proxy configuration
├── backend/              # Backend application
├── frontend/             # Frontend application
├── db/init/              # Database initialization scripts
├── docs/                 # Documentation
├── docker-compose.yml    # Multi-container setup
├── README.md
│
├── k8s/                  # Kubernetes manifests
├── terraform/            # Infrastructure as Code
├── monitoring/           # Prometheus & Grafana configs
└── Jenkinsfile           # CI/CD pipeline configuration
```

---

# 🔄 CI/CD Workflow

The CI/CD pipeline automates the entire deployment lifecycle:

1. Developer pushes code to GitHub
2. Jenkins pipeline triggers automatically
3. Application build process starts
4. Docker images are generated
5. Automated validation and checks run
6. Containers are deployed
7. Kubernetes updates workloads
8. Monitoring stack tracks application health

---

# 🐳 Docker Deployment

## Build & Run Containers

```bash id="mt6wxy"
docker compose up -d --build
```

---

# 🌐 Application Access

## Frontend

```text id="3s63wf"
http://localhost:5173
```

## Backend Health Endpoint

```text id="0d5g1d"
http://localhost:4000/health
```

## API Base URL

```text id="k8og49"
http://localhost:4000/api/v1
```

---

# ☸ Kubernetes Deployment

## Deploy Application

```bash id="vavl98"
kubectl apply -f k8s/
```

## Verify Running Pods

```bash id="5f0d6n"
kubectl get pods
```

---

# 📊 Monitoring & Observability

## Prometheus

* Collects infrastructure and application metrics
* Monitors container and Kubernetes performance

## Grafana

* Visualizes monitoring dashboards
* Displays CPU, memory, network, and application metrics

---

# ☁️ Infrastructure as Code

Terraform is used to provision and manage infrastructure resources, enabling:

* Automated provisioning
* Scalable infrastructure management
* Consistent deployments
* Cloud resource automation

---

# 🔐 Security Features

* JWT Authentication
* Password Hashing using bcrypt
* Helmet Security Middleware
* Input Validation using Zod
* Environment Variable Protection
* Secure API Practices

---

# 📈 Scalability Features

* Kubernetes Horizontal Pod Autoscaling
* Stateless containerized architecture
* Independent service deployment
* Scalable cloud infrastructure design

---

# 📸 Project Screenshots

## Jenkins Pipeline

*Add screenshot here*

## Docker Containers

*Add screenshot here*

## Kubernetes Pods

*Add screenshot here*

## Grafana Dashboard

*Add screenshot here*

## Application UI

*Add screenshot here*

---

# 🧠 Key Learning Outcomes

This project demonstrates practical experience with:

* CI/CD Automation
* Cloud-Native Application Deployment
* Kubernetes Orchestration
* Infrastructure as Code
* Monitoring & Observability
* Docker Containerization
* Reverse Proxy Configuration
* Production Deployment Workflows

---

# 🚀 Future Enhancements

* GitHub Actions Integration
* ArgoCD GitOps Workflow
* ELK Stack Logging
* Blue-Green Deployment Strategy
* HTTPS & SSL Automation
* Service Mesh Integration

---

# 👨‍💻 Author

## Mazhar Ali Mansuri

Aspiring DevOps Engineer focused on:

* Cloud Infrastructure
* Automation
* Kubernetes
* AWS
* Scalable Deployments
* Production-Grade DevOps Workflows

---

# ⭐ Repository Support

If you found this project useful, consider giving it a star ⭐
