#!/bin/bash

if [ -z "$1" ]
  then
    echo "Require number of replicas"
fi

echo `scaling up the deployment by $1 replicas`
echo
kubectl scale deployment api-gateway --replicas=$1
kubectl scale deployment ui --replicas=$1
kubectl scale deployment data-retriever --replicas=$1
kubectl scale deployment user-management --replicas=$1
kubectl scale deployment session-management --replicas=$1
kubectl scale deployment data-processor --replicas=$1
kubectl scale deployment post-processor --replicas=$1
