---
title: "Tauri android 为 webview 设置 proxy"
summary: "只有安卓存在问题..."
date: 2025-02-20T19:50:01+08:00
---

# 问题来源
详见我给 wry 项目提交的[issue](https://github.com/tauri-apps/wry/issues/1488).

# 临时解决方案
手动修改 Android 代码

```kotlin
import android.util.Log
import androidx.webkit.ProxyConfig
import androidx.webkit.ProxyController
import androidx.webkit.WebViewFeature
import java.util.concurrent.Executor


class MainActivity : TauriActivity() {
  override fun onStart() {
    super.onStart()

    if (WebViewFeature.isFeatureSupported(WebViewFeature.PROXY_OVERRIDE)) {
      val proxyConfig = ProxyConfig.Builder()
        .addProxyRule("http://127.0.0.1:5380")
        .addDirect()
        .build()

      ProxyController.getInstance().setProxyOverride(
        proxyConfig,
        Executor {
          //do nothing
        }
      ) {}
    }
  }
}
```