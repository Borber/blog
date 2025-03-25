---
title: "使用 Github Action 编译 Rust 项目"
summary: "编译 Rust 项目并上传编译产物"
date: 2025-03-25T18:54:32+08:00
---

如果编译产物在其他目录, 则需要修改编译命令和上传工件的路径

`workflow_dispatch` 是在 Github Action 中选择对应的工作流进行手动触发执行

```yml
name: Release

on:
    workflow_dispatch:

env:
    # 修改为你的项目名称
    PACKAGE_NAME: example
    CARGO_TERM_COLOR: always

jobs:
    build:
        permissions:
            contents: write
        strategy:
            fail-fast: false
            matrix:
                include:
                    - platform: "ubuntu-22.04"
                      target: "x86_64-unknown-linux-gnu"

        runs-on: ${{ matrix.platform }}

        steps:
            - uses: actions/checkout@v4

            # 安装 Rust
            - name: install Rust
              uses: dtolnay/rust-toolchain@nightly
              id: rust_toolchain
              with:
                  target: ${{ matrix.target }}

            # 编译项目
            - name: Build release
              run: |
                  cargo build --release

            # 准备部署工件
            - name: Prepare Artifact
              run: |
                  mkdir -p deploy
                  cp target/release/${{ env.PACKAGE_NAME }} deploy/${{ env.PACKAGE_NAME }}-${{ matrix.target }}

            # 上传编译产物
            - name: Upload Artifact
              uses: actions/upload-artifact@v4
              with:
                  name: ${{ env.PACKAGE_NAME }}-${{ matrix.target }}
                  path: deploy/${{ env.PACKAGE_NAME }}-${{ matrix.target }}
```

今天新的证书服务器 github action 编译, 第一次就直接通过了, 实属不易