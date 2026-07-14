# AGENTS.md

## 项目概览

AI-Powered Risk Assessment Agent — 国际客户来访风险评估系统 Demo。

模拟字节跳动内部的 AI 驱动来访风险评估代理，核心流程：结构化输入 → 自动匹配 SOP 政策 → 多维度风险评分 → 条件决策（自动放行 / 升级至 PR 部门）。

## 技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19 + TypeScript 5
- **UI**: shadcn/ui + Tailwind CSS 4
- **Styling**: 杂志风设计系统（Playfair Display serif + 温暖纸张色阶）

## 目录结构

```
src/
├── app/
│   ├── page.tsx                    # 仪表盘（首页）
│   ├── layout.tsx                  # 根布局
│   ├── globals.css                 # 设计变量（杂志风 token）
│   ├── new-assessment/page.tsx     # 新建评估页
│   ├── history/page.tsx            # 评估历史页
│   ├── detail/[id]/page.tsx        # 评估详情页
│   └── api/
│       ├── assess/route.ts         # POST 提交评估
│       ├── assessments/route.ts    # GET 查询评估列表/详情
│       ├── dashboard/route.ts      # GET 仪表盘统计
│       └── sop/route.ts            # GET SOP 文档列表
├── components/
│   ├── layout.tsx                  # Header + Sidebar 组件
│   └── ui/                         # shadcn/ui 组件
└── lib/
    ├── assessment-engine.ts        # 核心评估引擎（评分+决策逻辑）
    ├── mock-data.ts                # 模拟数据存储（10条历史记录）
    └── sop/
        └── policies.ts             # SOP 合规政策参考文档（6份）
```

## 核心业务逻辑

### 评估引擎 (`lib/assessment-engine.ts`)

1. **组织敏感度评分** (权重 40%): 根据组织类型分级（Tier 1-3）
2. **业务单元敏感度评分** (权重 30%): 根据部门分类（高/中/低敏感度）
3. **来访目的评分** (权重 30%): 基于关键词匹配评估目的风险
4. **综合评分**: 加权平均，0-10 分
5. **决策逻辑**:
   - 综合分 > 6.5 → Escalated（升级至 PR）
   - 任一维度 >= 8 → Escalated
   - Tier 1 组织 + 高风险目的 → Escalated
   - 其余 → Cleared（自动放行）

### SOP 政策文档 (`lib/sop/policies.ts`)

模拟飞书云文档中的 6 份内部合规政策：
- SOP-001: International Visitor Management Policy
- SOP-002: Organization Sensitivity Classification
- SOP-003: Business Unit Sensitivity Matrix
- SOP-004: Visit Purpose Assessment Guidelines
- SOP-005: Escalation Protocol & PR Notification
- SOP-006: Audit & Record-Keeping Requirements

评估引擎会根据输入自动检索相关条款，作为决策依据。

## API 接口

| 方法 | 路径 | 功能 |
|------|------|------|
| POST | /api/assess | 提交来访评估请求，返回评分和决策 |
| GET | /api/assessments | 获取所有评估历史（?id= 查单条） |
| GET | /api/dashboard | 获取仪表盘统计和最近评估 |
| GET | /api/sop | 获取 SOP 文档列表 |

## 构建命令

```bash
pnpm install        # 安装依赖
pnpm dev            # 开发环境
pnpm build          # 生产构建
pnpm start          # 生产启动
```
