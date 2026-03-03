# trip-project server

Express + PostgreSQL 用户系统（注册/登录）。

## 1. 安装依赖

```bash
cd server
npm install
```

## 2. 配置环境变量

复制 `.env.example` 为 `.env`：

```bash
cp .env.example .env
```

请确保 `DATABASE_URL` 指向你的 PostgreSQL 数据库。

## 3. 启动服务

开发模式：

```bash
npm run dev
```

生产模式：

```bash
npm start
```

默认端口为 `4000`。

## 4. 接口说明

### 注册

- `POST /api/auth/register`
- Body:

```json
{
  "account": "test001",
  "password": "123456"
}
```

### 登录

- `POST /api/auth/login`
- Body:

```json
{
  "account": "test001",
  "password": "123456"
}
```

登录成功会返回 JWT `token`。
