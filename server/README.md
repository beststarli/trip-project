# trip-project server

Express + PostgreSQL（TypeScript）后端，当前已实现注册/登录。

这份文档按“后端小白可直接照做”的思路写：你会知道**数据库交互写哪里、路由写哪里、业务逻辑写哪里**，以及如何按 RESTful 方式扩展接口。

---

## 0. 先看当前目录职责

```text
server/
├─ src/
│  ├─ index.ts           # 应用入口：挂中间件、挂路由、统一错误处理、启动服务
│  ├─ db/
│  │  ├─ pool.ts         # 数据库连接池（只做连接管理）
│  │  ├─ init.ts         # 启动时执行 SQL 初始化
│  │  └─ init.sql        # 建表脚本
│  └─ routes/
│     └─ auth.ts         # 路由 + 当前业务逻辑（注册/登录）
├─ .env.example
├─ package.json
└─ tsconfig.json
```

### 一句话记忆

- **db 层**：负责“怎么连数据库、怎么执行 SQL”。
- **routes 层**：负责“这个 URL 对应哪个处理函数”。
- **service 层（建议新增）**：负责“业务规则”，例如密码加密、账号唯一校验、token 签发。

---

## 1. 启动项目（你每天都会做）

1) 安装依赖

```bash
cd server
npm install
```

2) 配环境

```bash
cp .env.example .env
```

至少配置：

- `DATABASE_URL`
- `JWT_SECRET`

3) 启动服务

```bash
npm start
```

说明：`npm start` 已配置为直接运行 TypeScript（`tsx src/index.ts`）。

---

## 2. 我到底该在哪个文件写什么？

### 2.1 数据库交互写在哪

你有两种写法：

#### 写法 A（当前项目正在用，简单）

- 在 `routes/*.ts` 里直接 `import pool from '../db/pool'`
- 然后 `await pool.query(...)`

优点：上手快。缺点：路由文件会越来越大。

#### 写法 B（推荐你下一步采用）

- 新建 `src/services/`（或 `src/repositories/`）
- 把 SQL 全放到 service/repository 文件里
- `routes` 只做参数收集和返回结果

例如：

```text
src/
├─ routes/
│  └─ user.ts
└─ services/
   └─ user.service.ts
```

---

### 2.2 router 写在哪

- 每个“资源模块”一个路由文件，放在 `src/routes/`。
- 例如：
  - 认证：`src/routes/auth.ts`
  - 用户：`src/routes/user.ts`
  - 订单：`src/routes/order.ts`

在 `src/index.ts` 里统一挂载：

```ts
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
```

---

### 2.3 处理逻辑（业务逻辑）写在哪

推荐放在 `src/services/*`，不要全部堆在 `routes/*`。

**路由层做这 4 件事就够了：**

1. 收请求参数（`req.params / req.query / req.body`）
2. 基础校验（缺字段、类型不对）
3. 调用 service
4. 返回 HTTP 状态码 + JSON

**service 层做业务：**

- 密码加密/比对
- 唯一性校验
- 调用数据库
- 组装返回数据

这样后期维护会轻松很多。

---

## 3. RESTful API 到底怎么写（实战模板）

先记住资源名词，比如“用户 users”。

### 3.1 URL 设计

- `GET /api/users`：获取用户列表
- `GET /api/users/:id`：获取单个用户
- `POST /api/users`：创建用户
- `PATCH /api/users/:id`：部分更新用户
- `DELETE /api/users/:id`：删除用户

URL 用名词，不用动词（不要 `/getUser`、`/createUser`）。

### 3.2 状态码设计

- `200` 查询/更新成功
- `201` 创建成功
- `400` 参数错误
- `401` 未登录或 token 无效
- `403` 无权限
- `404` 资源不存在
- `409` 资源冲突（如账号已存在）
- `500` 服务器异常

### 3.3 返回结构建议统一

建议保持固定结构，前端好处理：

```json
{
  "message": "操作成功",
  "data": {},
  "requestId": "optional"
}
```

失败时：

```json
{
  "message": "参数错误",
  "errorCode": "VALIDATION_ERROR"
}
```

---

## 4. 新增一个模块时的标准流程（照抄即可）

以“用户模块”为例：

### 第 1 步：先写 SQL

在 `src/db/init.sql` 增加表结构（如果是新表）。

### 第 2 步：写 service（推荐）

新建 `src/services/user.service.ts`：

```ts
import pool from '../db/pool'

export async function getUserById(id: number) {
  const result = await pool.query(
    'SELECT id, account, created_at FROM users WHERE id = $1',
    [id],
  )
  return result.rows[0] ?? null
}
```

### 第 3 步：写 router

新建 `src/routes/user.ts`：

```ts
import { Router } from 'express'
import { getUserById } from '../services/user.service'

const router = Router()

router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'id 非法' })
    }

    const user = await getUserById(id)
    if (!user) {
      return res.status(404).json({ message: '用户不存在' })
    }

    return res.json({ message: 'ok', data: user })
  } catch (error) {
    return next(error)
  }
})

export default router
```

### 第 4 步：在入口文件挂路由

在 `src/index.ts`：

```ts
import userRoutes from './routes/user'
app.use('/api/users', userRoutes)
```

### 第 5 步：本地测试

- Postman / Apifox 调接口
- 看状态码是否符合预期
- 看异常是否进入统一错误处理中间件

---

## 5. 当前项目已有接口

### 注册

- `POST /api/auth/register`

Body:

```json
{
  "account": "test001",
  "password": "123456"
}
```

### 登录

- `POST /api/auth/login`

Body:

```json
{
  "account": "test001",
  "password": "123456"
}
```

登录成功会返回 JWT token。

---

## 6. 给新手的 5 条建议（非常实用）

1. 一开始先不追求“完美分层”，先能跑通，再拆 service。  
2. 每个模块独立路由文件，避免所有接口塞一个文件。  
3. SQL 参数永远用 `$1/$2` 占位，防 SQL 注入。  
4. 状态码和返回结构保持统一，前后端联调会轻松很多。  
5. 每加一个接口，至少测 3 种情况：成功、参数错、数据不存在。
