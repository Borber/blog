---
title: "cloudflare tunnel 代理 ssh"
slug: "cf-tunnel-proxy-ssh"
images: ["https://cdn.jsdelivr.net/gh/Borber/PublicPic1/headImg/head.png"]
description: "cf属实是大好人啊"
tags: ["proxy", "cloudflare", "ssh"]
date: 2023-08-30T13:07:04+08:00
---

# 添加 tunnel

![首页](https://i.pstorage.space/i/27WVbvbNA/original_cf-ssh-1.png "首页")

![登陆官网](https://i.pstorage.space/i/5vl8OyxPA/original_cf-ssh-2.png "登陆官网")

![新增 tunnel](https://i.pstorage.space/i/velPp47P9/original_cf-ssh-3.png "新增 tunnel")

![自己命名](https://i.pstorage.space/i/velPp477w/original_cf-ssh-4.png "自己命名")

![服务器运行官方命令](https://i.pstorage.space/i/pn1QdYD1/original_cf-ssh-5.png "服务器运行官方命令")

![进行配置](https://i.pstorage.space/i/5vl8Oy0YM/original_cf-ssh-6.png "进行配置")

![配置域名](https://i.pstorage.space/i/dbJ93loz4/original_cf-ssh-7.png "配置域名")

![如图设置](https://i.pstorage.space/i/JwMqp5lQ/original_cf-ssh-8.png "如图设置")

![添加服务](https://i.pstorage.space/i/27WVbvbvx/original_cf-ssh-9.png "添加服务")

# 开机启动

服务器运行

```bash
sudo systemctl enable cloudflared
```

# ssh 配置远程登陆

因为我用的 root 远程, 所以需要开 root ssh 登陆, 编辑 /etc/ssh/sshd_config 文件

```bash
# 公钥登录
PubkeyAuthentication yes
# 允许 root 登录
PermitRootLogin yes
```

## 配置 密钥登陆

把你本地的 git 公钥 `id_rsa.pub` 复制到服务器上命名为 `authorized_keys` , 并且修改权限

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

# 配置 本地 cloudflared 代理

![在tunnel设置中](https://i.pstorage.space/i/dbJ93NqaA/original_cf-ssh-11.png "在tunnel设置中")

![官方教程](https://i.pstorage.space/i/NZYgMaWJ9/original_cf-ssh-12.png "官方教程")

`example.com` 请替换为你之前设置的

```
Host example.com
  ProxyCommand cloudflared access ssh --hostname %h
```

# 运行

```bash
ssh root@example.com
```

![运行成功](https://i.pstorage.space/i/JwMqp594/original_cf-ssh-10.png "运行成功")
