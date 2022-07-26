---
title: "jar签名"
share: true
comments: true
slug: "jar-sign"
images: ["https://cdn.jsdelivr.net/gh/Borber/PublicPic1/headImg/head.png"] 
description: "给jar包签名, 目前还没用"
tags: ["Java"]
date: 2022-07-26T14:19:04+08:00
---



## 准备环境
安装 `jdk` 将其 `bin` 目录加入到系统环境变量 

## 生成密钥
用 `keytool` 生成 `keystore`
```shell
keytool -genkey -alias BorberKey -keyalg RSA -validity 365 -keystore borber.keystore 
```

log:

```shell
输入密钥库口令:
再次输入新口令:
您的名字与姓氏是什么?
  [Unknown]:  Borber
  [Unknown]:  VastData
您的组织名称是什么?
  [Unknown]:  VastData
您所在的城市或区域名称是什么?
  [Unknown]:  广东省广州市
您所在的省/市/自治区名称是什么?
  [Unknown]:  ^Z该单位的双字母国家/地区代码是什么?
  [Unknown]:
PS D:\data\key> keytool -genkey -alias BorberKey -keyalg RSA -validity 365 -keystore borber.keystore
输入密钥库口令:
再次输入新口令:
您的名字与姓氏是什么?
  [Unknown]:  Borber
您的组织单位名称是什么?
  [Unknown]:  VastData
您的组织名称是什么?
  [Unknown]:  VastData
您所在的城市或区域名称是什么?
  [Unknown]:  广州市
您所在的省/市/自治区名称是什么?
  [Unknown]:  广东省
该单位的双字母国家/地区代码是什么?
  [Unknown]:  CN
CN=Borber, OU=VastData, O=VastData, L=广州市, ST=广东省, C=CN是否正确?
  [否]:  是

正在为以下对象生成 2,048 位RSA密钥对和自签名证书 (SHA256withRSA) (有效期为 365 天):
CN=Borber, OU=VastData, O=VastData, L=广州市, ST=广东省, C=CN
```

导出证书:

```shell
keytool -export -alias BorberKey -file borber.cer -keystore .\borber.keystore
```

## 签名Jar包

```shell
jarsigner -keystore .\borber.keystore -signedjar .\test-sigined.jar .\test.jar BorberKey 
```

log:
```shell
输入密钥库的密码短语:
jar 已签名。

警告:
签名者证书为自签名证书。
```

## 验证

```shell
jarsigner -verify .\test-sigined.jar 

jar 已验证。

警告:
此 jar 包含其证书链无效的条目。原因: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
此 jar 包含其签名者证书为自签名证书的条目。
此 jar 包含的签名没有时间戳。如果没有时间戳, 则在其中任一签名者证书到期 (最早为 2023-07-26) 之后, 用户可能无法验证此 jar。

有关详细信息, 请使用 -verbose 和 -certs 选项重新运行。
```

附: 时间戳版本
```shell
jarsigner -tsa http://sha256timestamp.ws.symantec.com/sha256/timestamp -keystore .\borber.keystore -signedjar .\test-sigined.jar .\test.jar BorberKey
```
