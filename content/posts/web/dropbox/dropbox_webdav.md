---
title: "DropBox 使用 WebDAV"
summary: "感谢所有免费服务"
date: 2025-05-20T15:28:38+08:00
---
# DropBox
首先, 我会比较推荐你先邀请好友, 刷到18G的容量, 会比较够用

# koofr
这是一个免费的网盘服务, 支持连接 DropBox, 也可以直接使用他赠送的 10G 空间. 但笔者认为 DropBox 更加稳定, 所以只借用其为连接空间提供的 WebDAV 服务.

注册 [koofr.net](https://koofr.net) 账号, 然后在左侧菜单中点击连接, 选择 DropBox 授权登录.

![1](https://cdn.jsdelivr.net/gh/Borber/PublicPic1@master/blog/20250520/1.png "koofr 连接 DropBox")

# WebDAV
打开 koofr 首选项

![2](https://cdn.jsdelivr.net/gh/Borber/PublicPic1@master/blog/20250520/2.png "koofr 首选项")

点击密码, 在最底部生成一个新的 应用密码, 这将是你的 WebDAV 密码.

![3](https://cdn.jsdelivr.net/gh/Borber/PublicPic1@master/blog/20250520/3.png "koofr 应用密码")

# 配置

```
url: https://app.koofr.net/dav/Dropbox // DropBox 是可选的, 你也可以直接使用 Koofr , 这是其自身的 WebDAV 地址
user: <koofr_useremail> // koofr 的邮箱
password: <koofr_password> // 上面生成的应用密码
```
