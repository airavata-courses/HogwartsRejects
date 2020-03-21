#!/bin/bash

#Upgrade the repo
#install dependencies
cd ~/HogwartsRejects
sudo apt-get upgrade
sudo apt-get remove -y ansible
sudo apt autoremove
sudo apt-get install -y unzip
sudo apt-get install python3-openstackclient
sudo apt-get install pip3
sudo -H pip3 install --upgrade pip
pip3 install ansible

#download and install terraform 0.11.14 version
curl -LO https://releases.hashicorp.com/terraform/0.11.14/terraform_0.11.14_linux_amd64.zip
unzip terraform_0.11.14_linux_amd64.zip
sudo mv terraform /usr/local/bin/
rm -rf *.zip
#Don't enter the passphrase just keep pressing enter
ssh-keygen