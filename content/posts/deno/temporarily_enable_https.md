---
title: "一行代码临时启用https"
summary: "备案是不可能的"
date: 2025-03-25T16:24:02+08:00
---

如果你没备案, 但是又想使用https, 可以在 deno 部署以下代码, 将所有https请求转发到你的目标地址

```typescript
Deno.serve((req: Request) => fetch(new Request(req.url.replace('https://example.com', 'http://127.0.0.1:8080'), req)));
```

今天在和厂商对接时有用到
