---
title: "ArchLinux Hadoop Vbox 镜像"
gitinfo: true
share: true
comments: true
slug: "arch_hadoop_vbox"
images: ["https://cdn.jsdelivr.net/gh/Borber/PublicPic1/%E5%8D%9A%E5%AE%A2%E5%9B%AD/wolai/wolai.png"] 
description: "偷懒使人进步"
tags: ["linux", "hadoop"]
date: 2021-03-22T23:03:04+08:00
---

```javascript
虚拟机:
	OS: Archlinux 5.11.8
	Java: openjdk 1.8.0_282
	Hadoop: 3.2.2
宿主机:
	OS: Archlinux 5.11.8
	Oracle VM VirtualBox: 6.1.18
```

## 准备工作:

1. 安装 Oracle VM VirtualBox: 6.1.18 [官方地址](https://download.virtualbox.org/virtualbox/6.1.18/VirtualBox-6.1.18-142142-Win.exe) [网盘分流](https://pan.qita.link/s/vRmCm)

2. 下载 ova 文件:  [下载链接](https://pan.qita.link/s/GbnhQ)

### 具体步骤

#### 导入虚拟机

1. ![vbox1](https://cdn.jsdelivr.net/gh/Borber/PublicPic1@master/teach/Hadoop/vbox1.png "导入")

2. ![vbox2](https://cdn.jsdelivr.net/gh/Borber/PublicPic1@master/teach/Hadoop/vbox2.png "注意要清除MAC地址")

3. 注意选择自己本机的桥接网络 一个不行就多试试

    ![nat](https://cdn.jsdelivr.net/gh/Borber/PublicPic1@master/teach/Hadoop/nat.png "桥接网络")

4. 若你无法选择usb2.0模块 1.0 也ok

    ![usb](https://cdn.jsdelivr.net/gh/Borber/PublicPic1@master/teach/Hadoop/usb.png)

#### 虚拟机信息

```shell
user: root
passwd: arch

user: arch
passwd: arch
```

#### 管理脚本

```shell
badoop
---------------------------
        Hadoop 管理脚本      
---------------------------
1. 启动 Hadoop
2. 停止 Hadoop
---------------------------
选择: 

```

![shell](https://cdn.jsdelivr.net/gh/Borber/PublicPic1@master/teach/Hadoop/shell.png "管理脚本")

![stop](https://cdn.jsdelivr.net/gh/Borber/PublicPic1@master/teach/Hadoop/stop.png "停止")



#### 静态IP

如果你的舍友或者同一局域网中的朋友也想使用这个虚拟机, 那么你们可能需要更改一下静态IP 否则可能会导致IP冲突

更改教程:

1. 更改 `/etc/systemd/network/10-static-eth0.network` 

    ```sh
    [Match]
    Name=eth0  
    
    [Network]
    Address=192.168.50.240/24 # 更改 240 为 0-254 的数字
    Gateway=192.168.50.1  
    DNS=8.8.8.8 114.114.114.114 
    ```

    

2. 更改 `/etc/hosts`

    ```
    192.168.50.240 hadoop # 更改为和上面一样
    ```

3. 重启网络服务 (注意此时如果你是ssh访问可能会掉线，并且需要更改ip重连)

    ```shell
    sudo systemctl reenable systemd-networkd
    sudo systemctl restart systemd-networkd
    ```

    

#### 配置Hosts

建议使用 [SwitchHosts](https://github.com/oldj/SwitchHosts) 

![hosts](https://cdn.jsdelivr.net/gh/Borber/PublicPic1@master/teach/Hadoop/hosts.png)

### 成功

![web](https://cdn.jsdelivr.net/gh/Borber/PublicPic1@master/teach/Hadoop/web.png "网络访问")

祝各位好运 任何疑问 下方评论