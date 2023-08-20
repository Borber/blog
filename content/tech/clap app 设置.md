---
title: "Clap app 设置"
slug: "clap-app-settings"
images: ["https://cdn.jsdelivr.net/gh/Borber/PublicPic1/headImg/head.png"]
description: "混蛋, 这块不应该有个说明文档吗?"
tags: ["rust", "clap"]
date: 2023-08-07T13:30:04+08:00
---

[Clap 源码](https://github.com/clap-rs/clap/blob/master/clap_builder/src/builder/app_settings.rs)

## subcommand_negates_reqs

用于主命令声明了必填项, 子命令不需要时, 添加此设置, 并将必填项定义为 `Option<>` `required = true` 即可实现

## arg_required_else_help

不输入参数时, 默认输出 `help` 内容, 很直观, 很好用

## 使用方法

Derive 模式

```rust
#[derive(Parser)]
#[command(subcommand_negates_reqs = true)] # 需要使用应用列的蛇形命名法名称
struct Cli {...}
```

参考链接: [SEAM](https://github.com/Borber/seam/blob/master/crates/cli/src/main.rs)

| 选项                        | 应用                           | 解释                                        |
| --------------------------- | ------------------------------ | ------------------------------------------- |
| IgnoreErrors                | ignore_errors                  | 忽略解析参数时的错误,不退出程序             |
| AllowHyphenValues           | allow_hyphen_values            | 允许参数使用以连字符开头的值                |
| AllowNegativeNumbers        | allow_negative_numbers         | 允许参数接收负数                            |
| AllArgsOverrideSelf         | all_args_override_self         | 参数覆盖已定义的同名参数,而不是追加         |
| AllowMissingPositional      | allow_missing_positional       | 允许缺失位置参数,不报错退出                 |
| TrailingVarArg              | trailing_var_arg               | 允许定义尾随的可变参数                      |
| DontDelimitTrailingValues   | dont_delimit_trailing_values   | 不在尾随的可变参数值之间添加分隔符          |
| InferLongArgs               | infer_long_args                | 自动推断长格式参数(--arg)                   |
| InferSubcommands            | infer_subcommands              | 自动推断子命令                              |
| SubcommandRequired          | subcommand_required            | 至少需要定义一个子命令,否则报错             |
| AllowExternalSubcommands    | allow_external_subcommands     | 允许外部定义子命令                          |
| Multicall                   | multicall                      | 允许多次调用解析器解析参数                  |
| SubcommandsNegateReqs       | subcommands_negate_reqs        | 如果定义了子命令,则位置参数不再是必须的     |
| ArgsNegateSubcommands       | args_negate_subcommands        | 如果定义了位置参数,则子命令不再是必须的     |
| SubcommandPrecedenceOverArg | subcommand_precedence_over_arg | 子命令优先匹配,忽略参数长短格式歧义         |
| ArgRequiredElseHelp         | arg_required_else_help         | 如果没有传递任何位置参数,显示帮助信息并退出 |
| NextLineHelp                | next_line_help                 | 每部分帮助信息显示在新行                    |
| DisableColoredHelp          | disable_colored_help           | 禁用彩色帮助信息                            |
| DisableHelpFlag             | disable_help_flag              | 禁用帮助标志 -h/--help                      |
| DisableHelpSubcommand       | disable_help_subcommand        | 禁用内置帮助子命令                          |
| DisableVersionFlag          | disable_version_flag           | 禁用版本标志 --version                      |
| PropagateVersion            | propagate_version              | 传递版本信息到子命令                        |
| Hidden                      | hidden                         | 隐藏选项在 usage 信息中                     |
| HidePossibleValues          | hide_possible_values           | 隐藏选项的可能值在 usage 中                 |
| HelpExpected                | help_expected                  | 期望必须调用帮助子命令                      |
| NoBinaryName                | no_binary_name                 | 不显示程序二进制名称                        |
| ColorAuto                   | color_auto                     | 根据终端自动判断是否使用彩色                |
| ColorAlways                 | color_always                   | 总是使用彩色                                |
| ColorNever                  | color_never                    | 从不使用彩色                                |
| Built                       | built                          | 内置模式,不再需要手动编译                   |
| BinNameBuilt                | bin_name_built                 | 使用二进制文件名作为内置模式                |
