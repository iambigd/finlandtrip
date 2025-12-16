
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

## 部署架構

```
Client → Nginx (443/80) → Node.js/PM2 (3000) → React App
                        → API (3001) [未來擴充]
```

使用 Nginx 反向代理到 PM2 運行的 Node.js，方便未來新增 API 和資料庫。

## Nginx 設定

編輯 `/etc/nginx/sites-available/finlandtrip.missbanban.com`：

```nginx
server {
    server_name finlandtrip.missbanban.com;

    # 反向代理到 Node.js (PM2)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/finlandtrip.missbanban.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/finlandtrip.missbanban.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    listen 80;
    server_name finlandtrip.missbanban.com;
    return 301 https://$host$request_uri;
}
```

測試並重新載入 Nginx：
```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 使用 PM2 部署到伺服器

### 1. 在伺服器上準備環境

```bash
# 安裝 PM2
npm install -g pm2

# 建立專案目錄
sudo mkdir -p /var/www/finlandtrip.missbanban
sudo chown $USER:$USER /var/www/finlandtrip.missbanban
```

### 2. 部署方式

#### 方式 A：使用自動化腳本（推薦）

1. 編輯 `deploy.sh`，填入伺服器資訊
2. 執行部署：
```bash
chmod +x deploy.sh
./deploy.sh
```

#### 方式 B：手動部署

```bash
# 1. 上傳程式碼到伺服器
git pull  # 或使用 rsync

# 2. 在伺服器上安裝依賴並建置
npm install
npm run build

# 3. 啟動 PM2
pm2 start ecosystem.config.js

# 4. 設定開機自動啟動
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

網站將在 **https://finlandtrip.missbanban.com** 運行

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