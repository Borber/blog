---
title: "Tauri 配置文件实践"
summary: "跨平台还是有点麻烦"
date: 2025-03-23T23:22:01+08:00
---
## 配置文件放置地址
- **Windows**: `%APPDATA%\YourApp`
	- `pwsh` 可以使用 `cd $env:APPDATA` 进入这个目录
- **Linux**: `~/.config/yourapp`
- **macOS**: `~/Library/Application Support/YourApp`
- **Android**: 内部存储（如 `getFilesDir()`）
	- Android 应用通常将配置文件存储在应用的私有目录中，防止其他应用访问。
	- **示例**: `/data/data/<package_name>/files/config.json`
- **iOS**: Library 或 Documents 目录
	- iOS 应用运行在沙盒环境中，Documents 适合用户可访问的文件，Library 适合应用内部使用的配置文件。

---
未完待续