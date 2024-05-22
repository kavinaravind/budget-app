# budget-app

[Repository Walkthrough via Medium](https://medium.com/@kavin_aravind/deploying-apps-on-k8s-can-be-tedious-but-does-it-have-to-be-8a14cfd6b689)

## Setup

```
helm upgrade budget-app --install . -n budget-app --create-namespace
eval $(minikube docker-env)
```
