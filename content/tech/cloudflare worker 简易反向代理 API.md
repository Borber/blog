---
title: "cloudflare worker 简易反向代理 API"
slug: "cf-worker-reverse-proxy-api"
images: ["https://cdn.jsdelivr.net/gh/Borber/PublicPic1/headImg/head.png"]
description: "简单直接访问的api还是比较方便的"
tags: ["proxy", "cloudflare"]
date: 2023-08-20T18:07:04+08:00
---

# 前置

-   注册 cloudflare
-   绑定自己的域名(没有被墙)

# 创建 worker

登录 cloudflare 后, 点击 Workers

![首页](https://i.pstorage.space/i/RZe0nqqqQ/original_cf-worker-reverse-proxy-api-1.png "首页")

创建

![创建-1](https://i.pstorage.space/i/5vlq511j9/original_cf-worker-reverse-proxy-api-2.png "创建-1")

![创建-2](https://i.pstorage.space/i/RZe0nqqkv/original_cf-worker-reverse-proxy-api-3.png "创建-2")

![创建-3](https://i.pstorage.space/i/MOogN7z1k/original_cf-worker-reverse-proxy-api-4.png "创建-3")

打开刚刚创建的 worker 点击编辑

![编辑](https://i.pstorage.space/i/ODgQjdqDg/original_cf-worker-reverse-proxy-api-5.png "编辑")

将下方代码复制进去

![样例](https://i.pstorage.space/i/37kN4P91/original_cf-worker-reverse-proxy-api-6.png "样例")

```js
addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const url = new URL(request.url);
    const actualUrlStr = url.pathname.replace("/proxy/", "");

    const actualUrl = new URL(actualUrlStr);

    const modifiedRequest = new Request(actualUrl, {
        headers: request.headers,
        method: request.method,
        body: request.body,
        redirect: "follow",
    });

    const response = await fetch(modifiedRequest);
    const modifiedResponse = new Response(response.body, response);

    // 添加允许跨域访问的响应头
    modifiedResponse.headers.set("Access-Control-Allow-Origin", "*");

    return modifiedResponse;
}
```

配置域名

这里也是为什么要求需要绑定域名的原因, 默认的 `workers.dev` 应该是被墙了

![域名](https://i.pstorage.space/i/yoR3ZXXL8/original_cf-worker-reverse-proxy-api-7.png "域名")
