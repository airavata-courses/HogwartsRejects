terraform apply -auto-approve -var-file=cluster.tf -var "cluster_name=${CLUSTER/_/-}" ../../contrib/terraform/openstack

# add -parallelism=1 to create one resource at a time
