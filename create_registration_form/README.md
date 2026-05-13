# 📋 User Registration Form

一个基于 **HTML5**, **CSS3** 和 **Vanilla JavaScript** 构建的高性能、无障碍（Accessibility）用户注册系统。该项目不仅实现了美观的 UI 界面，还深度集成了浏览器原生的表单校验机制。

## ✨ 项目亮点

### 1. 智能表单校验 (Zero-Library Validation)

- **硬核正则约束**：通过 HTML5 `pattern` 属性强制执行安全密码策略（至少8位，且必须包含字母与数字）。
- **实时比对反馈**：利用 JavaScript 的 `setCustomValidity` API 实现“确认密码”字段的即时逻辑校验，提升用户体验。
- **原生安全拦截**：利用 `required`, `minlength`, `maxlength` 等属性，在前端过滤无效数据，减少服务器负担。

### 2. 现代响应式 UI 设计

- **全设备适配**：通过媒体查询（Media Queries）针对移动端（<480px）优化布局，确保在各种屏幕尺寸下均有良好的可读性。
- **交互动效**：为提交按钮设计了 `hover` 悬停位移、`active` 按压反馈以及 `box-shadow` 阴影平滑过渡。
- **视觉细节**：采用全局 `box-sizing: border-box` 管理盒模型，并为输入控件配置了 `focus` 状态下的亮色呼吸边框。

### 3. 无障碍与语义化 (A11y)

- **逻辑绑定**：每一个 `<label>` 均通过 `for` 属性与对应的 `input` ID 严格绑定，既方便屏幕阅读器识别，也扩大了鼠标点击的触发区域。
- **语义化结构**：使用 `<header>`, `<main>`, `<section>`, `<footer>` 等 HTML5 语义化标签构建清晰的文档大纲。

---

## 📂 文件结构

```text
create_registration_form/
├── index.html          # 主页面（包含 HTML 结构与原生 JS 校验逻辑）
├── style.css           # 样式表（包含全局样式、响应式设计与交互动画）
└── README.md           # 项目技术说明文档
```
