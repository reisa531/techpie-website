# TechPie Website

继承 [GeekPie.club](https://geekpie.club/) 极简极客美学的 **TechPie** 官方宣传主页与功能文档站。

## 特性

- **GeekPie.club 视觉基因**：支持浅色 / 深色双主题切换、Canvas 动态星点背景、Montserrat 模糊渐变主标题与 Geist Mono 排版。
- **动态版本与下载接入**：自动请求 `HeZeBang/TechPie-flutter` 的 GitHub Releases API 获取最新版本号与各平台安装包直链，并根据访客操作系统高亮推荐下载卡片。
- **可交互展示区与轨道文档导航**：
  - 右侧同心轨道图标平滑旋转，悬停自动暂停；点击任意圆圈直接跳转到对应功能的文档锚点（`docs.html#<feature>`）。
  - 内嵌可切换底栏的 iOS 预览机（首页 / 课表 / Deadlines / 我的），并带平滑 3D 视差动效。
- **下载二维码**：内置指向 `https://techpie.geekpie.club` 的矢量二维码。
- **完整文档页**：独立 `docs.html`，支持实时关键词检索、滚动目录高亮与跳转聚焦动画。

## 本地预览

纯静态站点，无需构建依赖，任意 HTTP 服务器即可运行：

```bash
python3 -m http.server 8080
```

访问 `http://localhost:8080` 即可预览。

## License

MIT
