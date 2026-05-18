# 可复用组件库 Reusable Components

本目录提供一套网站常用的可复用 HTML 组件，重点关注**结构与命名**的统一性，可直接复制粘贴到任何项目中使用。

---

## 一、文件结构

```
reusable_components/
├── README.md      ← 本文档（中文说明）
├── index.html     ← 组件结构示例 + Demo 页面
├── styles.css     ← 最小可视化样式（便于无样式时区分结构）
└── app.js         ← 头像下拉菜单的交互逻辑
```

---

## 二、组件清单

| 编号 | 组件          | 基础类                | 修饰类示例                                                        |
| ---- | ------------- | --------------------- | ----------------------------------------------------------------- |
| 1    | 按钮 Button   | `.btn`                | `.btn-primary` / `.btn-secondary` / `.btn-disabled`               |
| 2    | 卡片 Card     | `.card`               | `.card-feature` / `.card-testimonial`                             |
| 3    | 徽章 Badge    | `.badge`              | `.badge-pill` / `.badge-success` / `.badge-warning` / `.badge-danger` |
| 4    | 头像 Avatar   | `.avatar`             | `.avatar-sm` / `.avatar-md` / `.avatar-lg`                        |
| 4'   | 用户下拉菜单  | `.avatar-container`   | `.avatar-trigger` / `.user-dropdown` / `.user-dropdown-item`      |

---

## 三、命名规范（统一约定）

整体采用「**块 - 修饰符 - 子元素**」三段式（类 BEM 但更轻量）：

1. **块（Block）**：组件的根类名，名词，单词全小写
   - 例：`.btn`、`.card`、`.badge`、`.avatar`
2. **修饰符（Modifier）**：在块名后追加 `-修饰词`，表示**变体或状态**
   - 例：`.btn-primary`、`.card-feature`、`.badge-pill`、`.avatar-sm`
3. **子元素（Element）**：在块名后追加 `-子元素名`，表示组件**内部组成**
   - 例：`.card-title`、`.card-body`、`.user-dropdown-item`
4. **状态类（State）**：以 `is-` 开头，由 JS 动态切换
   - 例：`.is-open`（菜单展开时附加在 `.avatar-container` 上）

> 这套规则的好处：肉眼即可分辨「整体组件 / 内部结构 / 状态」，扩展时不会与他人冲突。

---

## 四、各组件用法速查

### 1. 按钮 Button

```html
<!-- 主要按钮 -->
<button class="btn btn-primary">提交</button>

<!-- 次要按钮 -->
<button class="btn btn-secondary">取消</button>

<!-- 用 <a> 当按钮，class 完全复用 -->
<a href="#" class="btn btn-primary">开始使用</a>

<!-- 禁用态：disabled 属性 + .btn-disabled 双保险 -->
<button class="btn btn-primary btn-disabled" disabled>不可点击</button>
```

### 2. 卡片 Card

#### 2.1 Feature Card（功能卡片）

```html
<article class="card card-feature">
  <div class="card-icon">⚡</div>
  <h4 class="card-title">标题</h4>
  <p class="card-body">描述文字</p>
</article>
```

#### 2.2 Testimonial Card（用户评价卡片）

```html
<article class="card card-testimonial">
  <blockquote class="card-quote">"评价内容"</blockquote>
  <div class="card-author">
    <div class="avatar avatar-sm">
      <img src="..." class="avatar-img" alt="头像" />
    </div>
    <div class="card-author-info">
      <p class="card-author-name">张三</p>
      <p class="card-author-role">前端工程师</p>
    </div>
  </div>
</article>
```

将多张卡片放入 `<div class="card-grid">` 即可获得自适应网格布局。

### 3. 徽章 Badge / Pill

```html
<!-- 普通矩形徽章 -->
<span class="badge badge-success">成功</span>

<!-- 圆角丸子型 Pill -->
<span class="badge badge-pill badge-warning">测试中</span>
```

### 4. 头像 + 用户下拉菜单

```html
<div class="avatar-container">
  <button class="avatar-trigger" aria-haspopup="true" aria-expanded="false">
    <span class="avatar avatar-md">
      <img src="..." class="avatar-img" alt="头像" />
    </span>
    <span class="avatar-name">用户名</span>
    <span class="avatar-caret">▾</span>
  </button>

  <ul class="user-dropdown" role="menu">
    <li class="user-dropdown-item"><a class="user-dropdown-link" href="#">个人主页</a></li>
    <li class="user-dropdown-item"><a class="user-dropdown-link" href="#">账户设置</a></li>
    <li class="user-dropdown-divider" role="separator"></li>
    <li class="user-dropdown-item"><a class="user-dropdown-link" href="#">退出登录</a></li>
  </ul>
</div>
```

交互（由 `app.js` 提供）：

- 点击触发器 → 切换菜单显示
- 点击页面其它位置 → 自动收起
- 按 `Esc` 键 → 收起菜单
- 同一页面多个实例可独立工作

---

## 五、运行与验证

1. 直接在浏览器中打开 `index.html`，即可看到全部 4 类组件的实例演示。
2. 验证点击头像后下拉菜单的弹出、点击空白处收起、`Esc` 键收起。
3. 删除 `<link rel="stylesheet" ...>` 一行后重新打开，仍能通过结构与语义分清各组件——满足"无样式也能清楚区分结构"的验收要求。

---

## 六、扩展建议

- **新增按钮变体**：仅追加修饰类，如 `.btn-danger`、`.btn-ghost`，**不要**修改 `.btn` 基础类。
- **新增卡片变体**：复用 `.card` 基础类，新建 `.card-xxx`，子元素若通用沿用 `.card-title` 等。
- **接入设计令牌**：把 `styles.css` 中的色值替换为 CSS 变量（如 `var(--color-primary)`），便于主题切换。
- **接入框架**：本组件库不依赖任何框架，可直接迁移到 React / Vue，只需保留 class 命名即可继续复用样式。
