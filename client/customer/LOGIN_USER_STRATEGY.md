# 登录成功后的用户信息记录方案（Taro / 小程序）

本文说明：登录成功后如何记录登录用户信息，支持后续“预订酒店”等需要身份的操作。

## 1. 先说现状：为什么这里没有用 router 跳转

当前项目只有一个页面配置：

- `src/app.config.ts` 里只有 `pages/index/index`

`LoginPage`、`User`、`FunctionPage` 都是这个页面里的 React 组件切换，不是小程序多页面路由。

所以本次实现采用了**组件视图切换**：

- 登录前：渲染 `LoginPage`
- 登录后：渲染 `User`（其默认 tab 为 `FunctionPage`）

这也是你看到“登录成功后进入 FunctionPage”的原因。

## 2. 为什么必须记录登录用户信息

预订酒店、查看订单、个人中心都需要知道“当前是谁”。

至少要保存：

- `token`（后端返回 JWT）
- `user`（`id/account/created_at`）

## 3. 推荐的最小实现（先能跑）

### 3.1 登录成功时保存

在登录成功后（`loginResponse.success === true`）：

1) 将 `token` 存入本地
2) 将 `user` 存入本地
3) 更新全局登录态

示例（可直接放在登录成功分支）：

```ts
Taro.setStorageSync('token', loginResponse.token)
Taro.setStorageSync('user', loginResponse.user)
```

### 3.2 请求接口时自动带 token

后续下单/查订单请求，统一在请求层带上：

```ts
const token = Taro.getStorageSync('token')
header: {
  Authorization: `Bearer ${token}`,
}
```

### 3.3 启动时恢复登录态

在 `pages/index/index.tsx` 里初始化时读取：

```ts
const token = Taro.getStorageSync('token')
const user = Taro.getStorageSync('user')
setIsLoggedIn(Boolean(token && user))
```

这样用户重开小程序后仍可保持登录。

## 4. 推荐进阶（更规范）

当页面增多时，建议加一个全局 store（如 Zustand/Redux）：

- `authStore.token`
- `authStore.user`
- `authStore.isLoggedIn`
- `login/logout/restore` action

好处：

- 不用层层传 props
- 所有业务页面都能拿到当前用户
- 退出登录时可统一清理状态

## 5. 退出登录标准动作

1) 清空本地缓存：

```ts
Taro.removeStorageSync('token')
Taro.removeStorageSync('user')
```

2) 重置全局登录态
3) 切回登录视图

## 6. 安全注意

- 前端校验只做体验优化，后端鉴权/校验必须保留。
- 不要仅凭前端 `isLoggedIn` 判断权限，后端必须验证 token。
- token 过期时，前端应捕获 401 并引导重新登录。
