---
title: "rust扫描源代码文件生成代码"
slug: "rust-scan-source-code-files-to-generate-code"
images: ["https://cdn.jsdelivr.net/gh/Borber/PublicPic1/headImg/head.png"]
description: "我总感觉应该还能更简单"
tags: ["rust", "code"]
date: 2023-07-17T10:08:04+08:00
---

# 背景

[seam](https://github.com/Borber/seam)是我最近投入时间在写的一个项目, 为了让整体结构更加清晰, 每个支持的直播平台都在`core`包中单独建立了源代码文件, 位于 [src/live](https://github.com/Borber/seam/tree/master/seam_core/src/live) 中, 为了更方便的使用这个库, 我想要直接返回所有受支持平台的对象, 形如: `HashMap<String, Arc<dyn Live>>`, 但我这次想试试更加优雅的方式, 于是就有了这篇文章

# 代码

## 思路

1. 获取源代码文件夹位置
2. 遍历文件夹, 找出所有的 rust 源文件, 获取文件名
3. 通过文件名, 生成对应的代码

## 代码 with 注释

```rust
use std::path::Path;

use proc_macro::TokenStream;
use quote::quote;

/// 返回 `fn all() -> HashMap<String, Box<dyn Live>>` 函数
///
/// 通过扫描 live 文件夹，自动生成，返回所有直播平台对应的 hashmap
///
/// 需要引入:
///     - HashMap: std::collections::HashMap 或 hashbrown::HashMap 均可
///     - Live: seam_core::live::Live
///     - Arc: std::sync::Arc
///
/// 因为固定了扫描 live 文件夹，所以这个宏只能在 seam_core 中使用
#[proc_macro]
pub fn gen_all(_: TokenStream) -> TokenStream {
    // 获取 live 文件夹位置
    let root = std::env::var("CARGO_MANIFEST_DIR").unwrap();
    let path = Path::new(&root).join("src").join("live");
    let path = path.as_path();

    let mut lives = vec![];

    // 遍历 live 文件夹, 找出所有的rust源文件, 获取文件名
    for entry in std::fs::read_dir(path).unwrap() {
        let entry = entry.unwrap();
        let file = entry.path();
        // 判断是否为文件 && 是否为rs文件
        if file.is_file() && file.extension().unwrap_or_default() == "rs" {
            let file = file.file_stem().unwrap().to_str().unwrap();
            if file != "mod" {
                lives.push(file.to_owned())
            }
        }
    }

    // 通过文件名, 生成对应的代码
    let lives = lives
        .into_iter()
        .map(|live| {
            let ident = syn::Ident::new(&live, proc_macro2::Span::call_site());
            quote! {
                map.insert(String::from(#live), Arc::new(crate::live::#ident::Client));
            }
        })
        .collect::<Vec<_>>();

    quote! {
        /// 返回 core 支持的所有平台
        ///
        /// 请参照 [Live](seam_core::live::Live) 的文档
        pub fn all() -> HashMap<String, Arc<dyn Live>> {
            let mut map: HashMap<String, Arc<dyn Live>> = HashMap::new();
            #(#lives)*
            map
        }
    }
    .into()
}

#[proc_macro]
pub fn gen_test(input: TokenStream) -> TokenStream {
    let arg: String = input.to_string();
    let code = quote! {
        mod tests {
            use super::*;
            #[tokio::test]
            async fn test_get() {
                let cli = Client;
                match cli.get(#arg).await {
                    Ok(node) => println!("{}", node.json()),
                    Err(e) => println!("{e}"),
                }
            }
        }
    };
    code.into()
}
```

源文件位置: [seam/seam_core_marcos/src/lib.rs](https://github.com/Borber/seam/blob/master/seam_core_marcos/src/lib.rs)

# 详细说明

> 代码比较清晰, 这里就不多说了, 有问题评论提出, 我会进行解答并更新文章
