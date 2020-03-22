# your Kubernetes cluster name here
variable cluster_name {}

# SSH key to use for access to nodes
public_key_path = "~/.ssh/id_rsa.pub"

# image to use for bastion, masters, standalone etcd instances, and nodes
#image = "JS-API-Featured-Ubuntu16-Dec-14-2018"
image = "JS-API-Featured-Ubuntu18-Feb-14-2020"
#image = "JS-API-Featured-Ubuntu18-Dec-7-2018"
#image = "JS-API-Featured-CentOS7-Dec-14-2018"
# user on the node (ex. core on Container Linux, ubuntu on Ubuntu, etc.)
ssh_user = "ubuntu"
#ssh_user = "centos"

# 0|1 bastion nodes
number_of_bastions = 0
#flavor_bastion = "<UUID>"

# standalone etcds
#number_of_etcd = 0

# masters
number_of_k8s_masters = 1
number_of_k8s_masters_no_etcd = 0
number_of_k8s_masters_no_floating_ip = 0
number_of_k8s_masters_no_floating_ip_no_etcd = 0
flavor_k8s_master = "2"

# nodes
number_of_k8s_nodes = 2
number_of_k8s_nodes_no_floating_ip = 0
flavor_k8s_node = "2"

# GlusterFS
# either 0 or more than one
number_of_gfs_nodes_no_floating_ip = 0
#gfs_volume_size_in_gb = 150
# Container Linux does not support GlusterFS
#image_gfs = "<image name>"
# May be different from other nodes
#ssh_user_gfs = "ubuntu"
#flavor_gfs_node = "<UUID>"

# networking
network_name = "tg865582_network"
# IU
external_net = "4367cd20-722f-4dc2-97e8-90d98c25f12e"
# TACC
#external_net = "865ff018-8894-40c2-99b7-d9f8701ddb0b"
#subnet_cidr = "<cidr>"
floatingip_pool = "public"

# IU
az_list = ["zone-r6", "zone-r1", "zone-r2", "zone-r3", "zone-r7", "nova"]
# TACC
#az_list = ["nova"]
