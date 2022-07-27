---
title: "InfluxDB 学习笔记"
share: true
comments: true
slug: "influxdb"
images: ["https://www.z4a.net/images/2022/07/26/telegraf-7.png"] 
description: "方便, 美观, 现代化的时序数据库"
tags: ["influxdb"]
date: 2022-07-26T17:53:04+08:00
---



## 安装

### 安装influxdb

下载路径: [Github](https://github.com/influxdata/influxdb/releases) [官网](https://portal.influxdata.com/downloads/) 

因为我使用的是`Windows`所以下载的是最新的版本 `2.3.0` 的压缩包 --- `influxdb2-2.3.0-windows-amd64.zip`

下载后解压并在命令行运行
### 安装Telegraf

下载地址: [github](https://github.com/influxdata/telegraf/releases) 官网

同样下载最新版本,并解压

## 启动

命令行启动 influxdb 
```shell
.\influxdb.exe
```

访问 `http://localhost:8086/` 进行注册并配置

## 配置

### 添加telegraf-Rides数据源

1. 选择添加数据 
2. 选择telegraf 
3. 点击 `CREATE CONFIGURATION`
4. 选择redis
5. 填写信息
6. 配置信息
	1. `token` 形如 `export INFLUX_TOKEN=<INFLUX_TOKEN>`
		1. `Windows` 下可以使用 `setx /M INFLUX_TOKEN "YOUR_TOKEN"`  来设置环境变量, 亦可和我下面的样例配置一样直接替换`token`信息
	2. 启动命令 形如 `telegraf --config http://localhost:8086/api/v2/telegrafs/09ba739a6f9a3000`

![telegraf-1.png](https://i.pstorage.space/i/7p1xjye5A/original_telegraf-1.png)

![telegraf-2.png](https://i.pstorage.space/i/0bNK3djZY/original_telegraf-2.png)

注: 点击 `telegraf` 菜单下的项目名即可查看/编辑配置, 形如 `http://localhost:8086/api/v2/telegrafs/09ba739a6f9a3000` 的地址可以下载配置, 

以下是我的样例信息:

```toml
# Configuration for telegraf agent
[agent]

  interval = "10s"

  round_interval = true

  metric_batch_size = 1000

  metric_buffer_limit = 10000

  collection_jitter = "0s"

  flush_interval = "10s"

  flush_jitter = "0s"

  precision = ""

  hostname = ""

  omit_hostname = false
[[outputs.influxdb_v2]]

  urls = ["http://localhost:8086"]

  ## Token for authentication.
  token = "Vh7rS8nT2OWT3yuLZ0xuuIVKhkiZwBlVXCbfOYcENS-MviMyXnm9zaXKfMmoJBP7wWWzsttLLcQWVKNonRPCFg=="

  organization = "Borter"

  bucket = "one"



  [[inputs.redis]]

  servers = ["tcp://localhost:6379"]

  ## 你设置的redis的密码
  password = "123456"

```

## 开始采集
1. 启动 `redis`
2. 启动 `telegraf` 
	1. 配置环境变量, 上节已讲
	2. 启动
		1. 可以使用上节的启动命令进行网络配置启动(前提是你自己在网页端修改好了配置), 但我遭遇了无法认证的错误, 所以直接使用本地配置
		2. 可以本地创建`telegraf.conf` 文件, 将网页端的配置复制黏贴过来
		3. 此时将添加 `redis` , `redis_cmdstat`, `redis_keyspace` 监控
3. 打开 `influxdb` 的 WebUI 新建仪表盘![telegraf-3.png](https://i.pstorage.space/i/VNbJ9ymDd/original_telegraf-3.png)
4. 添加卡片![telegraf-4.png](https://i.pstorage.space/i/LlZJ2A5xL/original_telegraf-4.png)
5. 选择 `set`, `get`, `auth` 并提交. ![telegraf-5.png](https://i.pstorage.space/i/WNbJkLXPN/original_telegraf-5.png)
6. 设置自动刷新 ![telegraf-6.png](https://i.pstorage.space/i/ebKnPVX9X/original_telegraf-6.png)
7. 4-5同样的步骤添加系统信息监控即可获得如下成果 ![telegraf-7.png](https://i.pstorage.space/i/5vZbN14R0/original_telegraf-7.png)

 

建议多操作几次 `redis`让数据有所变动





> <mark>KISS</mark> Keep It Simple, Stupid
