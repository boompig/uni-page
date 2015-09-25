# Copying Files from Host to VM in Virtualbox

## Overview

1. Create a network bridge
2. Boot VM, check internet connectivity
3. Install ssh on VM
4. scp files from host into VM
5. Troubleshooting

## Create Network Bridge

(bad) instructions [here](https://www.virtualbox.org/manual/ch06.html#network_bridged)

* go to VM settings, select network tab
* attach to "Bridged Adapter"
* name should be same as interface you use for normal internet connectivity on host machine (ex. Airport on Mac)
* deny promiscuous mode
* let Virtualbox create its own Mac address

## Configuring VM
* boot VM
* `ifconfig` should list network interfaces. If you see eth<#> and an IPv4 address, all is well
* if the only interface you see is lo, then you should run the command `sudo /etc/init.d/networking restart`
    * if it displays errors, check troubleshooting section
* if you see multiple interfaces of format eth<#>, check troubleshooting section
* to test if you are connected to the Internet, run `ping 8.8.8.8` (one of Google's DNS servers)

## Installing SSH
* run `sudo apt-get install ssh`
* try `ssh localhost`

## Using scp to transfer files
* get the IP of your VM by running the `ifconfig` command, then looking for the IPv4 address
* try `ssh <ip> -l student` from your host machine
* use `scp` command to transfer files (`man scp` for details)

## Troubleshooting
* if you see errors after running `/etc/init.d/networking restart`, then delete the file 
`/etc/udev/rules.d/70-persistent-net.rules` and restart your VM. The file should regenerate on boot.
* make sure there is only one interface of the form eth<#> in that file
* make sure that the interface in the file has the same Mac address as the one shown in the VM settings panel, Network tab
