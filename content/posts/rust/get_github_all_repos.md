---
title: "Github api 获取用户所有仓库"
summary: "需要分页获取"
date: 2025-03-24T23:04:13+08:00
---


```rust
pub async fn get_user_all_repos(token: &str) -> Result<Vec<String>> {
    let (mut repos, next) = get_user_repos(token, 1).await?;
    for page in 2..=next {
        let (mut page_repos, _) = get_user_repos(token, page).await?;
        repos.append(&mut page_repos);
    }
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
        .inspect_err(|e| eprintln!("Error: {}", e))?;

    let last = match page {
        1 => {
            let headers = resp.headers();

            match headers.get("link") {
                Some(link) => {
                    let link_str = link.to_str().unwrap_or("page=0>");
                    let right = link_str.rsplit_once("page=").unwrap().1;
                    let left = right.split(">").next().unwrap_or("0");
                    left.parse::<u32>().unwrap_or(0)
                }
                None => 0,
            }
        }
        _ => 0,
    };

    let repos = resp
        .json::<Vec<Repository>>()
        .await
        .inspect_err(|e| eprintln!("Error: {}", e))?
        .into_iter()
        .map(|repo| repo.full_name)
        .collect();

    Ok((repos, last))
}
```