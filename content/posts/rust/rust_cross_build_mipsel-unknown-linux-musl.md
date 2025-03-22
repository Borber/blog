---
title: "rust cross build mipsel-unknown-linux-musl"
summary: "同事的好用方案"
date: 2025-03-21T19:09:27+08:00
---

## 安装 cross
> 当然, 你需要提前安装rust和docker
```bash
cargo install cross --git https://github.com/cross-rs/cross
```

## 配置 cross
在项目根目录新建: `Cross.toml`

```toml
[target.mipsel-unknown-linux-musl]
build-std = ["std", "alloc", "core", "proc_macro", "panic_abort"]
image = "docker.io/rustembedded/cross:mipsel-unknown-linux-musl"
```

## 编译命令

```bash
cross build --target mipsel-unknown-linux-musl --release --example=pishoo
```