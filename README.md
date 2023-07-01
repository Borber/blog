目前的部署方案:

### 静态网页生成:

Hugo Extended + MemE 主题

### 自动编译部署:

Github action 自动编译 提交至 Blog_Compiled 仓库 master 分支

### 加速镜像:

Vercel 自动拉取 Blog_Compiled 仓库 master 分支

### 静态资源 CDN 加速:

大部分 css js font 使用 jsdelivr CDN 加速

### 图床:

Github + jsdelivr CDN 加速

### 评论:

[giscus](https://giscus.app/)
