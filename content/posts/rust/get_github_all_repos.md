---
title: "Github api 获取用户所有仓库"
summary: "需要分页获取"
date: 2025-03-24T23:04:13+08:00
---


```rust
pub async fn get_user_all_repos(token: &str) -> Result<Vec<String>> {
    let (mut repos, last_page) = get_user_repos(token, 1).await?;

    if last_page > 1 {
        // 并发获取剩余页面的仓库
        let futures = (2..=last_page).map(|page| {
            let token = token.to_string();
            async move { get_user_repos(&token, page).await.map(|(repos, _)| repos) }
        });

        // 等待所有请求完成并处理结果
        let page_results = futures::future::join_all(futures).await;
        for page_repos in page_results.into_iter().flatten() {
            repos.extend(page_repos);
        }
    }

    println!("Total repos: {:?}", repos);
    Ok(repos)
}

/// 通过 token 获取用户仓库列表
async fn get_user_repos(token: &str, page: u32) -> Result<(Vec<String>, u32)> {
    let resp = CLIENT
        .get(format!("https://api.github.com/user/repos?page={page}"))
        .header("Accept", "application/vnd.github+json")
        .header("Authorization", format!("Bearer {}", token))
        .header("X-GitHub-Api-Version", "2022-11-28")
        .header("User-Agent", "bic")
        .send()
        .await
        .context("Failed to send request")?;

    // 只在第一页时解析总页数
    let last_page = if page == 1 {
        resp.headers()
            .get("link")
            .and_then(|link| link.to_str().ok())
            .and_then(|link_str| link_str.rsplit_once("page="))
            .and_then(|(_, right)| right.split('>').next())
            .and_then(|num| num.parse::<u32>().ok())
            .unwrap_or(0)
    } else {
        0
    };

    let repos = resp
        .json::<Vec<Repository>>()
        .await
        .context("Failed to parse repositories")?
        .into_iter()
        .map(|repo| repo.full_name)
        .collect();

    Ok((repos, last_page))
}
```