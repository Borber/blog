---
title: "Hugo Meme 主题 添加 Mastodon 认证"
slug: "hugo-meme-mastodon"
images: ["https://cdn.jsdelivr.net/gh/Borber/PublicPic1/headImg/head.png"]
description: "绿绿的真好看"
tags: ["hugo", "meme", "mastodon", "theme"]
date: 2023-07-02T15:34:04+08:00
---

# 前置知识

## Hugo 主题文件覆盖

在你的博客根目录中的,与主题文件夹同名的文件夹中,添加与主题文件夹中相同的文件,就可以覆盖主题文件夹中的文件. 例如 `/layouts/partials/components/socials.html` 可以覆盖 `/themes/meme/layouts/partials/components/socials.html`

基于这个原理, 我们可以局部修改主题而无需自己维护一个主题分支.

## Mastodon 认证

在通常的 Mastodon 实例中, `首选项 > 个人资料 > 外观 > 个人资料附加信息` 中添加 `"博客": 你的博客地址` 即可在你的 Mastodon 主页中显示你的博客地址. 旁边的验证 则为普通认证方式, 复制其中的 `href` 部分 形如: `https://wxw.moe/@BORBER` 为你的个人页面

# 正文

## 更改主题文件

新建 `/layouts/partials/components/socials.html` 文件 内容如下

```html
{{ if .Site.Params.enableSocials }} {{ with .Site.Data.Socials }}
<ul class="socials">
    {{- range sort .socials "weight" -}}
    <li class="socials-item">
        <a
            href="{{ .url | safeURL }}"
            target="_blank"
            rel="noopener noreferrer {{ .rel }}"
            title="{{ .title }}">
            {{- partial "utils/icon.html" (dict "$" $ "name" .icon "class"
            "social-icon") -}}
        </a>
    </li>
    {{- end -}}
</ul>
{{ end }} {{ end }}
```

相较原版修改了 `rel="noopener noreferrer {{ .rel }}"`

## 添加 mastodon 图标

新建 `/data/SVG.toml` 或添加内容如下

```toml
mastodon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="icon"><path d="M433 179.11c0-97.2-63.71-125.7-63.71-125.7-62.52-28.7-228.56-28.4-290.48 0 0 0-63.72 28.5-63.72 125.7 0 115.7-6.6 259.4 105.63 289.1 40.51 10.7 75.32 13 103.33 11.4 50.81-2.8 79.32-18.1 79.32-18.1l-1.7-36.9s-36.31 11.4-77.12 10.1c-40.41-1.4-83-4.4-89.63-54a102.54 102.54 0 0 1-.9-13.9c85.63 20.9 158.65 9.1 178.75 6.7 56.12-6.7 105-41.3 111.23-72.9 9.8-49.8 9-121.5 9-121.5zm-75.12 125.2h-46.63v-114.2c0-49.7-64-51.6-64 6.9v62.5h-46.33V197c0-58.5-64-56.6-64-6.9v114.2H90.19c0-122.1-5.2-147.9 18.41-175 25.9-28.9 79.82-30.8 103.83 6.1l11.6 19.5 11.6-19.5c24.11-37.1 78.12-34.8 103.83-6.1 23.71 27.3 18.4 53 18.4 175z"/></svg>'

```

## 创建 Mastodon 徽标

新建 `/data/Socials.toml` 或添加内容如下

```toml
[[socials]]
id = "mastodon"
url = "https://wxw.moe/@BORBER" # 请填写你的个人页面
icon = "mastodon" # 设定图标
title = "Mastodon"
rel = "me" # 这里是重点, mastodon 认证要求
```

## 最终效果

![最终效果](https://i.pstorage.space/i/lvPO6XwVg/original_Snipaste_2023-07-02_15-48-53.png "最终效果")
