#!/bin/bash

mkdir -p working_set
cd working_set
rm -rf HogwartsRejects
git clone https://github.com/airavata-courses/HogwartsRejects.git
cd HogwartsRejects

#Kafka Deployment
echo 'kafka deployment\n'
git checkout master-kafka
git pull origin master-kafka
kubectl apply -f zookeeper/.
kubectl apply -f kafka-service/.
kubectl apply -f kafka-brokers/.

#api-gateway Deployment
echo 'api-gateway deployment\n'
git checkout master-api-gateway
git pull origin master-api-gateway
kubectl apply -f APIGateway/api-gateway-service.yaml
kubectl apply -f APIGateway/api-gateway-deployment.yaml

#ui Deployment
echo 'ui deployment\n'
git checkout master-UI
git pull origin master-UI
kubectl apply -f UI/hogwartsrejects/ui-service.yaml
kubectl apply -f UI/hogwartsrejects/ui-deployment.yaml

#data-retrieval Deployment
echo 'data-retrieval deployment\n'
git checkout master-data-retrival
git pull origin master-data-retrival
kubectl apply -f climate-app/data-retriver-service.yaml
kubectl apply -f climate-app/data-retriever-deployment.yaml

#user-management Deployment
echo 'user-management deployment\n'
git checkout master-user-management
git pull origin master-user-management
kubectl apply -f UserManagement/user-management-service.yaml
kubectl apply -f UserManagement/user-management-deployment.yaml

#session-management Deployment
echo 'session-management deployment\n'
git checkout master-session-management
git pull origin master-session-management
kubectl apply -f SessionManagement/session-management-service.yaml
kubectl apply -f SessionManagement/session-management-deployment.yaml

#data-processor Deployment
echo 'data-processor deployment\n'
git checkout master-data-processor
git pull origin master-data-processor
kubectl apply -f PyNexRad/data-processor-service.yaml
kubectl apply -f PyNexRad/data-processor-deployment.yaml

#post-processor Deployment
echo 'post-processor deployment\n'
git checkout master-post-processor
git pull origin master-post-processor
kubectl apply -f PostProcessor/post-processor-service.yaml
kubectl apply -f PostProcessor/post-processor-deployment.yaml
