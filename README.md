# Math.ForeverLink.Love - 用数学表达永恒的爱

这是一个浪漫的3D数学可视化项目，使用参数方程绘制心形曲面，展示数学与爱情的完美结合。

## 特性

- 🎨 **3D心形曲面** - 使用参数方程生成的美丽心形
- ✨ **点云到实体切换** - 可在点状云图和实体表面之间切换
- 💕 **浪漫配色** - 粉色渐变主题，配合粒子背景效果
- 🎯 **交互式3D视图** - 支持旋转、缩放和自动旋转
- 💓 **心跳动画** - 模拟真实心跳的缩放动画

## 数学方程

该项目使用以下参数方程生成心形曲面：

```
x = sin(u) · (15sin(v) - 4sin(3v))
y = 8cos(u)
z = sin(u) · (15cos(v) - 5cos(2v) - 2cos(3v) - cos(v))
```

其中 u ∈ [0, 2π], v ∈ [0, 2π]

## 部署到 Cloudflare Workers

### 前置要求

- Node.js 16.x 或更高版本
- Cloudflare 账户
- Wrangler CLI

### 安装步骤

1. 克隆或下载项目文件

2. 安装依赖：
```bash
npm install
```

3. 登录 Cloudflare：
```bash
npx wrangler login
```

4. 部署到 Cloudflare Workers：
```bash
npm run deploy
```

### 自定义域名配置

如果您想使用自定义域名 `math.foreverlink.love`：

1. 在 Cloudflare 中添加域名 `foreverlink.love`
2. 在 DNS 设置中添加 CNAME 记录：
   - 名称：`math`
   - 目标：`your-worker-name.workers.dev`
3. 在 Workers 路由中配置域名绑定

## 本地开发

运行本地开发服务器：
```bash
npm run dev
```

然后访问 `http://localhost:8787` 查看效果。

## 技术栈

- **Three.js** - 3D图形渲染
- **Cloudflare Workers** - 边缘计算部署
- **原生 JavaScript** - 核心逻辑实现

## 许可证

MIT License