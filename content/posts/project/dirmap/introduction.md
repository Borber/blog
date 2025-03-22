---
title: "Dirmap 快速扫描目录"
summary: "比我想象的更快"
date: 2025-03-22T18:07:04+08:00
---
> 这是 [Bic](../bic/init_design) 项目的附属项目


[Dirmap](https://github.com/Borber/dirmap)由`rust`编写, `Dirmap` 是一个扫描指定目录生成扁平的目录结构的工具, 扫描后将序列化为 `bincode` 格式, 通过 `zstd` 压缩存储在 map 文件中

# 速度测试


```sh
❯ time .\target\release\dirmap.exe .
real    0m 0.02s
user    0m 0.01s
sys     0m 0.00s

❯ ls -al
...
.a--- ? ?  17 KB Sat Mar 22 17:46:22 2025  map
...
```

测试目录大小: 258MiB