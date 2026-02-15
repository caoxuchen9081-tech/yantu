# VOLTROLL - 电动三轮车官网

一个采用特斯拉风格的电动三轮车官方网站，配有后台内容管理系统。

## 🚀 项目特点

- **特斯拉风格设计** - 简洁、大气、现代化的界面设计
- **响应式布局** - 完美适配桌面和移动设备
- **后台管理系统** - 方便快捷地修改所有文字和图片
- **无需数据库** - 使用 JSON 文件存储配置
- **易于部署** - 纯静态文件，可部署到任何静态托管服务

## 📁 项目结构

```
electric-tricycle/
├── index.html          # 主网站首页
├── admin.html           # 后台管理页面
├── data/
│   └── config.json      # 配置文件（存储所有内容）
├── css/
│   ├── style.css        # 主网站样式
│   └── admin.css        # 后台管理样式
├── js/
│   ├── main.js          # 主网站交互
│   └── admin.js        # 后台管理逻辑
└── images/              # 图片资源目录
```

## 🎨 功能模块

### 前台网站 (index.html)

1. **导航栏** - 固定顶部，随滚动变化
2. **首屏展示** - 大标题、统计数据、CTA按钮
3. **产品展示** - Model S / Model 3 介绍
4. **核心特性** - 4个特色功能展示
5. **技术规格** - 详细参数列表
6. **订购方案** - 3个版本对比
7. **底部导航** - 链接和版权信息

### 后台管理 (admin.html)

1. **仪表盘** - 网站状态概览
2. **首页设置** - 修改首屏文字和图片
3. **产品展示** - 编辑产品标题、描述、图片
4. **核心特性** - 修改功能介绍
5. **技术规格** - 修改参数数据
6. **订购方案** - 编辑价格和特性
7. **图片管理** - 上传和管理图片

## 🔧 使用方法

### 1. 本地预览

```bash
# 使用 Python 启动简单服务器
cd electric-tricycle
python3 -m http.server 8000

# 或使用 Node.js
npx serve .
```

然后访问 `http://localhost:8000`

### 2. 后台管理

访问 `http://localhost:8000/admin.html`

### 3. 修改内容

1. 在后台管理页面中修改表单内容
2. 点击"保存更改"按钮
3. 配置会保存到 `data/config.json`
4. 刷新前台页面查看效果

### 4. 更换图片

1. 在"图片管理"模块上传图片
2. 或直接将图片放入 `images/` 目录
3. 在对应模块填写图片路径

## 📝 配置文件说明

`data/config.json` 文件结构：

```json
{
  "site": {
    "name": "VOLTROLL",
    "tagline": "电动三轮车 | 未来出行"
  },
  "hero": {
    "title": "VOLTROLL Model S",
    "subtitle": "重新定义城市出行",
    "range": "120",
    "rangeUnit": "公里续航",
    ...
  },
  "models": [
    {
      "title": "Model S",
      "description": "...",
      "image": "images/model-s.jpg"
    }
  ],
  "features": [...],
  "specs": {...},
  "order": {...}
}
```

## 🚀 部署建议

### Vercel 部署

1. 将项目推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

### Netlify 部署

1. 将项目推送到 GitHub
2. 在 Netlify 中选择项目
3. 设置构建命令和输出目录（留空）
4. 部署完成

### GitHub Pages 部署

1. 推送到 GitHub 仓库
2. 开启 GitHub Pages 功能
3. 选择 `main` 分支
4. 访问 `https://用户名.github.io/仓库名/`

## 🔒 注意事项

1. **图片路径** - 使用相对路径，如 `images/xxx.jpg`
2. **跨域问题** - 后台保存功能可能受浏览器安全限制，需要在服务器环境下运行
3. **数据持久化** - 生产环境建议添加后端 API 来保存配置

## 📱 响应式设计

网站已针对以下屏幕尺寸优化：

- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## 🎯 后续扩展建议

1. 添加后端 API 支持数据持久化
2. 添加图片上传功能
3. 添加多语言支持
4. 添加 SEO 优化
5. 添加网站分析

---

Made with ❤️ for VOLTROLL
