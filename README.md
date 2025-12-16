
# 芬蘭極光旅遊日誌

This is a code bundle for 芬蘭極光旅遊日誌. The original project is available at https://www.figma.com/design/jgdTEXNfNyqA3CSsQHbQhL/%E8%8A%AC%E8%98%AD%E6%A5%B5%E5%85%89%E6%97%85%E9%81%8A%E6%97%A5%E8%AA%8C.

## 系統需求

- Node.js 18.0.0 或更高版本
- npm 或 yarn

## 安裝與執行

### 開發環境

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

開發伺服器將在 http://localhost:5173 運行

### 生產環境建置

```bash
# 建置生產版本
npm run build

# 預覽生產版本
npm run preview
```

## 使用 PM2 部署到伺服器

### 1. 安裝 PM2

```bash
npm install -g pm2
```

### 2. 建置並啟動

```bash
# 建置生產版本
npm run build

# 使用 PM2 啟動
pm2 start ecosystem.config.js

# 設定開機自動啟動
pm2 startup
pm2 save
```

### 3. PM2 常用指令

```bash
# 查看應用狀態
pm2 status

# 查看即時日誌
pm2 logs finlandtrip

# 重啟應用
pm2 restart finlandtrip

# 停止應用
pm2 stop finlandtrip

# 刪除應用
pm2 delete finlandtrip
```

應用將在 **http://localhost:3000** 運行

## 專案結構

```
src/
├── components/      # React 元件
├── data/           # 資料檔案
├── hooks/          # 自訂 Hooks
├── styles/         # 樣式檔案
└── App.tsx         # 主應用元件
```

## 技術棧

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- GSAP
- PM2 (生產環境)  