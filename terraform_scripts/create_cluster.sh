#!/bin/bash

export CLUSTER=$OS_USERNAME
cp -LRp inventory/gkiran inventory/$CLUSTER
cd inventory/$CLUSTER

#create cluster
bash terraform_init.sh
bash terraform_delete.sh
bash terraform_apply.sh