# 考研学习打卡系统

基于 **React + Vite** 的网页应用，用于考研学习社区的每日打卡、时长排行、作业查看等功能。

## 功能概览

- 首页顶部：今日是否已打卡
- 学习时长排行榜（日榜 / 周榜 / 月榜）
- 最新作业列表
- 每周进度打卡（图片上传，预留）
- 腾讯会议回放（预留）

## 环境要求

请先安装 [Node.js](https://nodejs.org/)（建议 LTS 版本，自带 npm）。

安装后打开终端，输入 `node -v` 和 `npm -v`，能显示版本号即表示安装成功。

## 安装依赖

在项目根目录（`study-checkin-app`）打开终端，执行：

```bash
npm install
```

## 运行项目

```bash
npm run dev
```

浏览器会自动打开 `http://localhost:5173`。若没有自动打开，请手动访问该地址。

## 其他命令

| 命令 | 说明 |
|------|------|
| `npm run build` | 打包生产版本到 `dist` 文件夹 |
| `npm run preview` | 本地预览打包后的效果 |

## 项目结构

```
study-checkin-app/
├── public/              # 静态资源（图标等）
├── src/
│   ├── components/      # 可复用 UI 组件
│   ├── pages/           # 页面（首页、周进度、回放）
│   ├── data/            # 模拟数据
│   ├── App.jsx          # 路由配置
│   ├── main.jsx         # 应用入口
│   └── index.css        # 全局样式
├── index.html           # HTML 模板
├── package.json         # 依赖与脚本
└── vite.config.js       # Vite 配置
```

## 技术栈

- React 19
- Vite 6
- React Router 7
