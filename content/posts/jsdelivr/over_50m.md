---
title: "突破 Jsdelivr 50M 上限"
summary: "白嫖党是可怖的"
date: 2020-08-10T22:03:04+08:00
---

添加 @master

原CDN链接:

```
https://cdn.jsdelivr.net/gh/Borber/PublicPic1/date/20200810/2.jpg
```

![原链接](https://cdn.jsdelivr.net/gh/Borber/PublicPic1/date/20200810/2.jpg "理论上无法显示")

加上之后:

```
https://cdn.jsdelivr.net/gh/Borber/PublicPic1@master/date/20200810/2.jpg
```

![修改后](https://cdn.jsdelivr.net/gh/Borber/PublicPic1@master/date/20200810/2.jpg "可以显示")

注意: 当你的文件地址不存在时, 可能也会出现 jsdelivr 50M 上限的问题.