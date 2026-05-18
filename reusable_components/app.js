/* =====================================================================
   reusable_components / app.js
   作用：为「头像 + 用户下拉菜单」组件提供最小化交互逻辑：
        1) 点击头像触发器：切换菜单显示/隐藏
        2) 点击页面其它区域：自动收起菜单
        3) 按 Esc 键：收起菜单
   说明：使用事件委托与 closest() 匹配，使得页面中存在
        多个 .avatar-container 实例时也能各自独立工作。
   ===================================================================== */

(function () {
  // 用 IIFE 包裹，避免污染全局命名空间

  /**
   * 关闭页面上所有处于打开状态的下拉菜单。
   * 用法：当点击空白处或按 Esc 时调用。
   */
  function closeAllDropdowns() {
    // 查询所有处于打开状态的容器，逐个移除 is-open 类
    document.querySelectorAll(".avatar-container.is-open").forEach(function (el) {
      el.classList.remove("is-open");
      // 同步无障碍属性：aria-expanded 表示菜单当前是否展开
      const trigger = el.querySelector(".avatar-trigger");
      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /**
   * 切换指定容器的下拉菜单显示状态。
   * @param {HTMLElement} container - 目标 .avatar-container 元素
   */
  function toggleDropdown(container) {
    // 先检查目标是否已打开（用于后续判断是"开→关"还是"关→开"）
    const willOpen = !container.classList.contains("is-open");

    // 在打开新菜单前，先关闭其它所有菜单，避免多个菜单同时展开
    closeAllDropdowns();

    if (willOpen) {
      container.classList.add("is-open");
      const trigger = container.querySelector(".avatar-trigger");
      if (trigger) {
        trigger.setAttribute("aria-expanded", "true");
      }
    }
  }

  // ---------- 事件绑定 ----------

  // 1) 全局点击事件：使用事件委托，统一在 document 上监听
  document.addEventListener("click", function (event) {
    // 查找点击位置最近的触发器；若存在，则触发对应容器的切换
    const trigger = event.target.closest(".avatar-trigger");
    if (trigger) {
      // 阻止冒泡至下一步"点击空白处"的检测，否则会立即被关闭
      event.stopPropagation();
      // 找到该触发器所属的容器，对其执行切换
      const container = trigger.closest(".avatar-container");
      if (container) {
        toggleDropdown(container);
      }
      return;
    }

    // 如果点击发生在菜单内部（例如点中某菜单项），保持菜单打开
    // 但实际项目中点菜单项后一般会跳转或触发动作，这里仅做演示
    if (event.target.closest(".user-dropdown")) {
      return;
    }

    // 其余情况视为"点击空白处"，关闭所有菜单
    closeAllDropdowns();
  });

  // 2) 键盘事件：按 Esc 关闭菜单（无障碍标准做法）
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeAllDropdowns();
    }
  });
})();
