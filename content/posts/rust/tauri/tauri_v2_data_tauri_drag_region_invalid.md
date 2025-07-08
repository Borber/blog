---
title: "Tauri v2 data-tauri-drag-region 无效"
summary: "失效不可怕, 修了就好了"
date: 2025-07-08T17:15:44+08:00
---
简而言之, 如果 `tauri v2` 在前端元素设定好了 `data-tauri-drag-region` 拖拽, 但是绝大多数或全部情况都失败, 你可能是没有设置这个权限:

文件位置: `src-tauri/capabilities/default.json`

```json
{
  "$schema": "../gen/schemas/desktop-schema.json",
  "identifier": "default",
  "description": "Capability for the main window",
  "windows": [
    "main"
  ],
  "permissions": [
    "core:default",
    "core:window:allow-start-dragging"
  ]
}
```

`"core:window:allow-start-dragging"` 这个权限