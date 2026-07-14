# 部署指南

## 方式一：Vercel 部署（推荐）

### 步骤 1：准备代码仓库
```bash
# 初始化 git（如果还没有）
git init
git add .
git commit -m "Initial commit"

# 推送到 GitHub
git remote add origin https://github.com/你的用户名/risk-assessment-agent.git
git push -u origin main
```

### 步骤 2：Vercel 部署
1. 访问 https://vercel.com 并登录（可用 GitHub 账号）
2. 点击 "Add New Project"
3. 选择你的 GitHub 仓库
4. Vercel 会自动检测 Next.js 项目
5. 点击 "Deploy"

### 步骤 3：获取永久链接
部署完成后，Vercel 会分配一个域名：
- 默认格式：`risk-assessment-agent-你的用户名.vercel.app`
- 可在 Settings > Domains 中绑定自定义域名

---

## 方式二：Netlify 部署

### 步骤 1：安装 Netlify CLI
```bash
npm install -g netlify-cli
```

### 步骤 2：构建并部署
```bash
# 构建项目
pnpm run build

# 登录 Netlify
netlify login

# 部署
netlify deploy --prod --dir=.next
```

---

## 方式三：Railway 部署

1. 访问 https://railway.app
2. 创建新项目，连接 GitHub 仓库
3. 添加环境变量（如有需要）
4. 自动部署，获得 `*.up.railway.app` 域名

---

## 注意事项

1. **环境变量**：如果项目使用了环境变量，需要在部署平台中配置
2. **Node.js 版本**：确保部署平台使用 Node.js 18+
3. **包管理器**：项目使用 pnpm，Vercel 默认支持

---

## 自定义域名

部署后可绑定自己的域名：
- Vercel: Settings > Domains > Add
- Netlify: Domain settings > Add custom domain
- Railway: Settings > Networking > Custom Domain
