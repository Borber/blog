---
title: "Github Action 学习笔记"
share: true
comments: true
slug: "github-action-study-1"
images: ["https://cdn.jsdelivr.net/gh/Borber/PublicPic1/headImg/head.png"] 
description: "真的好用"
tags: ["github", "ci"]
date: 2022-08-02T17:17:04+08:00
---



今天在学习 `sonic` 搜索引擎时, 本地环境编译不方便, 甚至官方都说目前不支持 `windows`, 但我着实想尝试一下, 所以便尝试使用 `github action` 来编译. 以下是具体部分.

## 触发器
仅在推送`tag` 且`tag`前缀为 `sonic_v` 时才触发工作流
```yml
on:
  push:
    tags:
      - "sonic_v*.*.*"
```

## 变量设置
多平台编译, 使用 `matrix` 来分别配置其 名称, 系统, `rust` 版本, `rust`编译目标, 以及最后的打包文件名
```yml
name: ${{ matrix.build }}
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        build: [Linux, macOS, Windows]
        include:
          - build: Linux
            os: ubuntu-latest
            rust: nightly
            target: x86_64-unknown-linux-gnu
            archive-name: sonic-linux
          - build: macOS
            os: macos-latest
            rust: nightly
            target: x86_64-apple-darwin
            archive-name: sonic-macos
          - build: Windows
            os: windows-latest
            rust: nightly-x86_64-msvc
            target: x86_64-pc-windows-msvc
            archive-name: sonic-windows
```

## 拉取代码
拉取 [sonic](https://github.com/valeriansaliou/sonic) 的代码
```yaml
- uses: actions/checkout@v2
        with: 
          repository: valeriansaliou/sonic
```

## 安装环境
通过之前设置的变量安装 `rust` 工具链
```yml
- name: Install rust
        uses: actions-rs/toolchain@v1
        with:
          toolchain: ${{ matrix.rust }}
          profile: minimal
          override: true
          components: rustfmt, clippy
          target: ${{ matrix.target }}
```

## 修复Windows环境
删除 `C:\msys64\` , 解决`C:\msys64\mingw64\bin\libclang.dll`链接错误的工作方法
```yml
- name: Clean Windows # Workaround to resolve link error with C:\msys64\mingw64\bin\libclang.dll
        if: runner.os == 'Windows'
        run: |
          Remove-Item -LiteralPath "C:\msys64\" -Force -Recurse
          choco install llvm -y
```

## 编译
以详细编译信息的方式编译软件
```yml
- name: Build binary
        run: cargo build --verbose --release --target ${{ matrix.target }}
        env:
          RUST_BACKTRACE: 1
```

## 压缩二进制文件
使用 `strip` 压缩二进制文件
```yml
- name: Strip binary (Linux and macOS)
        if: matrix.build == 'Linux' || matrix.build == 'macOS'
        run: strip "target/${{ matrix.target }}/release/sonic"
```

## 复制文件
复制文件准备打包
```yml
- name: Build archive
        shell: bash
        run: |
          mkdir archive
          cd archive
          if [ "${{ matrix.build }}" = "Windows" ]; then
            cp "../target/${{ matrix.target }}/release/sonic.exe" ./
          else
            cp "../target/${{ matrix.target }}/release/sonic" ./
          fi
```

## 打包文件
打包并上传 `archive` 文件夹
```yml
- name: Upload archive
        uses: actions/upload-artifact@v1
        with:
          name: ${{ matrix.archive-name }}
          path: archive/
```


## 总结
`github action` 真方便, 开源赛高!



完整代码:

```yml
name: Sonic CI

on:
  push:
    tags:
      - "sonic_v*.*.*"

jobs: 
  build:
    name: ${{ matrix.build }}
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        build: [Linux, macOS, Windows]
        include:
          - build: Linux
            os: ubuntu-latest
            rust: nightly
            target: x86_64-unknown-linux-gnu
            archive-name: sonic-linux
          - build: macOS
            os: macos-latest
            rust: nightly
            target: x86_64-apple-darwin
            archive-name: sonic-macos
          - build: Windows
            os: windows-latest
            rust: nightly-x86_64-msvc
            target: x86_64-pc-windows-msvc
            archive-name: sonic-windows
    steps:
      - uses: actions/checkout@v2
        with: 
          repository: valeriansaliou/sonic
      - name: Install rust
        uses: actions-rs/toolchain@v1
        with:
          toolchain: ${{ matrix.rust }}
          profile: minimal
          override: true
          components: rustfmt, clippy
          target: ${{ matrix.target }}
      - name: Clean Windows # Workaround to resolve link error with C:\msys64\mingw64\bin\libclang.dll
        if: runner.os == 'Windows'
        run: |
          Remove-Item -LiteralPath "C:\msys64\" -Force -Recurse
          choco install llvm -y
      - name: Build binary
        run: cargo build --verbose --release --target ${{ matrix.target }}
        env:
          RUST_BACKTRACE: 1
      - name: Strip binary (Linux and macOS)
        if: matrix.build == 'Linux' || matrix.build == 'macOS'
        run: strip "target/${{ matrix.target }}/release/sonic"
      - name: Build archive
        shell: bash
        run: |
          mkdir archive
          cd archive
          if [ "${{ matrix.build }}" = "Windows" ]; then
            cp "../target/${{ matrix.target }}/release/sonic.exe" ./
          else
            cp "../target/${{ matrix.target }}/release/sonic" ./
          fi
      - name: Upload archive
        uses: actions/upload-artifact@v1
        with:
          name: ${{ matrix.archive-name }}
          path: archive/
```



![github action](https://i.pstorage.space/i/NvRxp158/original_github-action.png) 



> <mark class="b-red">KISS</mark> Keep It Simple, Stupid
