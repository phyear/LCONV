<h1 style = "" align = "center">LConv: 🎈优雅数据转换器工具</h1>

<p align = "center">
  Lconv 是一个优雅的数据转换器工具，支持多种数据之间的转换，包括：Excel、JSON、CSV、XML、Markdown等。
</p>

---

### 🏳️‍🌈 技术栈
- node.js
- vite
- vue3
- tailwindcss
- pinia
- vue-i18n
- Handsontable

### 🏝️ 体验地址
[lconv.whycoder.fun](http://lconv.whycoder.fun/)

## 📌 核心功能

✅ **全格式支持**  
Excel ↔ CSV ↔ JSON ↔ XML ↔ Markdown ↔ HTML ↔ YAML ↔ SQL ↔ WikiTable

✅ **高级特性**  
- 多Sheet页Excel处理  
- 表格单元格合并  
- 数据格式自动检测  
- 自定义转换规则

✅ **即将到来**  
- 自动识别数据结构异常
- 远程文件URL支持
- 批量转换接口
- 可视化增强
- AI智能推荐转换规则

#### 2025-03-11 支持
- [x] 自定义转换规则
- [x] 支持配置导入导出
- [x] 增加日语/韩语支持
#### 2025-02-17 支持
- [x] 界面响应速度优化
- [x] excel与csv支持多sheet页读取

#### 2024-10-01 支持
- [x] 添加更多数据格式支持
- [x] 调整图标样式以及配色
- [x] bugfix-excel读取试试会被读取为时间错, 应改为字符串 

#### 2024-09-01 支持
- [x] Yaml支持转换
- [x] SQL支持转换
- [x] 不限制各个数据类型能转换的类型
- [x] 兼容各个数据类型的变种数据形式作为数据源
--- 
#### 2024-06-06 支持
- [x] Excel支持
- [x] JSON支持
- [x] CSV支持
- [x] XML支持
- [x] Markdown支持

### 🚩 快速开始

克隆仓库:
```
git clone https://github.com/phyear/LCONV.git
cd LCONV
```

安装依赖:
```
 cd LCONV
 npm install
```
运行示例:
   npm start

### docker部署

```
  docker pull registry.cn-beijing.aliyuncs.com/lconv/lconv:@tag

  docker run --name lconv -p 10000:8080 -d  registry.cn-beijing.aliyuncs.com/lconv/lconv:@tag
```

