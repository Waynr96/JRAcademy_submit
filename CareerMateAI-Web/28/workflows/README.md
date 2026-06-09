# CD Pipeline 配置说明

## 概述
这个 CD pipeline (`cd.yml`) 会在每次推送到 `main` 分支时自动部署网站到 AWS S3，并自动配置 EmailJS 的密钥。

## 设置步骤

### 1. 配置 GitHub Secrets

前往你的 GitHub 仓库设置页面：
```
Settings → Secrets and variables → Actions → New repository secret
```

需要添加以下 secrets：

#### AWS 配置 (已有)
- `AWS_ACCESS_KEY_ID` - AWS 访问密钥 ID
- `AWS_SECRET_ACCESS_KEY` - AWS 秘密访问密钥
- `S3_BUCKET_NAME` - S3 存储桶名称

#### EmailJS 配置 (新增)

#### EmailJS 配置 (新增)

**EMAILJS_PUBLIC_KEY**
- **名称**: `EMAILJS_PUBLIC_KEY`
- **值**: 你的 EmailJS Public Key
- **获取方式**: 
  1. 登录 [EmailJS Dashboard](https://dashboard.emailjs.com/)
  2. 前往 Account → API Keys
  3. 复制 Public Key

**EMAILJS_SERVICE_ID**
- **名称**: `EMAILJS_SERVICE_ID`
- **值**: 你的 EmailJS Service ID
- **获取方式**: 
  1. 登录 [EmailJS Dashboard](https://dashboard.emailjs.com/)
  2. 前往 Email Services
  3. 复制你使用的服务的 Service ID（例如：`service_xxxxxx`）

**EMAILJS_TEMPLATE_ID**
- **名称**: `EMAILJS_TEMPLATE_ID`
- **值**: 你的 EmailJS Template ID
- **获取方式**: 
  1. 登录 [EmailJS Dashboard](https://dashboard.emailjs.com/)
  2. 前往 Email Templates
  3. 复制你使用的模板的 Template ID（例如：`template_xxxxxx`）

### 2. 验证配置

配置完成后：
1. 推送代码到 `main` 分支
2. 前往仓库的 `Actions` 标签页
3. 查看 workflow 运行状态
4. 部署成功后，访问你的 S3 网站 URL

## Workflow 说明

### 触发条件
- 推送到 `main` 分支时自动触发
- 手动触发（`workflow_dispatch`）

### Deploy Job 步骤

1. **检出代码**: 拉取代码仓库
2. **显示项目文件**: 列出要部署的文件
3. **配置EmailJS凭证**: 
   - 使用 `sed` 命令替换 `script.js` 中的占位符
   - 将 `your-public-key` 替换为 `EMAILJS_PUBLIC_KEY`
   - 将 `your-server-id` 替换为 `EMAILJS_SERVICE_ID`
   - 将 `your-template-id` 替换为 `EMAILJS_TEMPLATE_ID`
4. **配置AWS凭证**: 设置 AWS 访问权限
5. **上传到S3**: 将文件同步到 S3 存储桶
6. **显示部署结果**: 输出部署信息和访问地址

### Check Job
- 等待部署完成后检查网站是否正常
- 通过 HTTP 请求验证网站可访问性

## 安全注意事项

✅ **优点**:
- 密钥不会暴露在代码仓库中
- 使用 GitHub Secrets 安全存储敏感信息
- 每次部署自动注入配置
- EmailJS 配置与 AWS 配置分离

⚠️ **注意**:
- 不要将真实的 EmailJS 密钥提交到代码仓库
- 保持 `script.js` 中使用占位符（`your-public-key` 等）
- 定期轮换 API 密钥
- AWS 和 EmailJS 的 secrets 都需要正确配置

## 故障排除

### 问题：部署失败
- 检查 GitHub Secrets 是否正确配置（AWS 和 EmailJS）
- 查看 Actions 日志获取详细错误信息
- 确认 AWS 凭证有 S3 写入权限

### 问题：EmailJS 不工作
- 验证所有三个 EmailJS secrets 都已正确设置
- 在 EmailJS Dashboard 中验证 Service 和 Template 是否已激活
- 检查部署后的 `script.js` 是否正确替换了占位符
- 在浏览器控制台查看 EmailJS 相关错误信息

### 问题：S3 网站无法访问
- 确保 S3 存储桶已配置为静态网站托管
- 检查存储桶策略是否允许公开访问
- 验证 `S3_BUCKET_NAME` secret 是否正确
- 等待几分钟让 CDN 缓存更新

## 本地开发

在本地开发时，你需要手动在 `script.js` 中设置你的 EmailJS 密钥进行测试。

**不要提交包含真实密钥的文件！**

建议使用本地配置文件（已在 `.gitignore` 中排除）：
1. 创建 `script.local.js` 并填入真实密钥
2. 在本地测试时临时替换
3. 提交前恢复占位符

## 手动触发部署

如果需要手动触发部署：
1. 前往仓库的 `Actions` 标签
2. 选择 "CD - Deploy to AWS S3" workflow
3. 点击 "Run workflow" 按钮
4. 选择 `main` 分支并确认

## 需要配置的所有 Secrets

总共需要配置 **6 个** GitHub Secrets：

### AWS 相关 (3个)
1. `AWS_ACCESS_KEY_ID`
2. `AWS_SECRET_ACCESS_KEY`
3. `S3_BUCKET_NAME`

### EmailJS 相关 (3个)
4. `EMAILJS_PUBLIC_KEY`
5. `EMAILJS_SERVICE_ID`
6. `EMAILJS_TEMPLATE_ID`

---

📝 最后更新: 2026-01-18
🔐 新增: EmailJS 自动配置功能
