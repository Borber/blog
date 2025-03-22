---
title: "Tauri Android 插件初始化失败"
summary: "神奇的问题, 第一次遇到..."
date: 2025-03-21T18:50:01+08:00
---
简而言之, 如果排查到 `tauri` 在:

```rust
app_handle.plugin(xxxx::init())
```

产生错误时, 不妨尝试一下删除这个 `plugin` 的仓库缓存, 位置应该如下: `/HOME/.cargo/registry/src/index.crates.io/tauri-plugin-xxxx/`, cargo clean 一下, 再重新编译试试.