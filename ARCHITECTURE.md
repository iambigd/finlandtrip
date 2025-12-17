# 芬蘭極光旅遊日誌 - 系統架構文件

## 📋 專案概述

這是一個互動式的芬蘭旅遊攻略網站，由 MissBanBan 品牌打造。網站以視覺化的方式呈現芬蘭 14 天的旅遊行程，包含城市景點、極光體驗、美食推薦、桑拿文化等內容，並提供使用者評分與評論功能。

**專案特色：**
- 📱 響應式設計，完美支援桌面和移動裝置
- 🗺️ 互動式地圖與景點導覽
- ⭐ 使用者評分與評論系統
- 🎨 精美的視覺設計與動畫效果
- 🔍 SEO 優化，提升搜尋引擎排名

---

## 🏗️ 技術架構

### 前端技術棧

```
React 18.3.1          # UI 框架
TypeScript            # 類型安全
Vite 6.3.5           # 建置工具
Tailwind CSS         # 樣式框架
Radix UI             # UI 元件庫
GSAP                 # 動畫效果
Framer Motion        # 動畫庫
```

### 部署架構

```
Client (Browser)
    ↓
Nginx (反向代理 + SSL)
    ↓
PM2 (Process Manager)
    ↓
Node.js (Vite Preview Server)
    ↓
React SPA
```

---

## 📁 專案結構

```
finlandtrip.missbanban/
├── public/                    # 靜態資源
├── src/
│   ├── components/           # React 元件
│   │   ├── CoverSection.tsx        # 首頁封面
│   │   ├── Navigation.tsx          # 導航列
│   │   ├── MobileMenu.tsx          # 移動版選單
│   │   ├── MobileTabBar.tsx        # 移動版底部導航
│   │   ├── MapSection.tsx          # 互動地圖區塊
│   │   ├── CitySection.tsx         # 城市景點區塊
│   │   ├── CityCard.tsx            # 城市卡片
│   │   ├── CityDrawer.tsx          # 城市詳情抽屜
│   │   ├── POICard.tsx             # 景點卡片
│   │   ├── ArcticSection.tsx       # 極光體驗區塊
│   │   ├── SaunaSection.tsx        # 桑拿文化區塊
│   │   ├── FoodPreview.tsx         # 美食預覽
│   │   ├── FoodSection.tsx         # 美食完整展示
│   │   ├── FoodDrawer.tsx          # 美食詳情抽屜
│   │   ├── PrepSection.tsx         # 旅行準備區塊
│   │   ├── PreparationDrawer.tsx   # 準備事項抽屜
│   │   ├── TaxRefundDrawer.tsx     # 退稅資訊抽屜
│   │   ├── EmergencyDrawer.tsx     # 緊急資訊抽屜
│   │   ├── TonttuTip.tsx           # Tonttu 小精靈提示
│   │   ├── RatingModal.tsx         # 評分對話框
│   │   ├── ViewingModal.tsx        # 評論查看對話框
│   │   ├── WeatherCarousel.tsx     # 天氣輪播
│   │   ├── Footer.tsx              # 頁尾
│   │   ├── figma/                  # Figma 匯入元件
│   │   └── ui/                     # Radix UI 元件
│   ├── data/                 # 資料檔案
│   │   ├── cityData.ts             # 城市景點資料
│   │   ├── cityDataImages.ts       # 城市景點圖片
│   │   ├── foodData.ts             # 美食資料
│   │   ├── foodDataImages.ts       # 美食圖片
│   │   ├── souvenirData.ts         # 伴手禮資料
│   │   └── weatherData.ts          # 天氣資料
│   ├── hooks/                # 自訂 Hooks
│   │   └── useWeatherData.ts       # 天氣資料 Hook
│   ├── styles/               # 樣式檔案
│   │   └── globals.css             # 全域樣式
│   ├── App.tsx               # 主應用元件
│   ├── main.tsx              # 應用入口
│   └── index.css             # 基礎樣式
├── index.html                # HTML 模板（含 SEO）
├── vite.config.ts            # Vite 配置
├── package.json              # 專案依賴
├── ecosystem.config.js       # PM2 配置
├── deploy.sh                 # 部署腳本
├── README.md                 # 使用說明
└── ARCHITECTURE.md           # 本文件
```

---

## 🎯 核心功能模組

### 1. 首頁封面 (CoverSection)
- 全螢幕視覺封面
- 標題動畫效果
- 捲動提示

### 2. 導航系統
- **Navigation**: 桌面版頂部導航
- **MobileMenu**: 移動版漢堡選單
- **MobileTabBar**: 移動版底部標籤導航
- 平滑捲動至各區塊
- 響應式切換

### 3. 互動地圖 (MapSection)
- 展示芬蘭旅遊路線
- 可點擊的城市標記
- 與城市區塊聯動

### 4. 城市景點系統
#### CitySection
- 展示四個主要城市卡片：
  - 赫爾辛基 (Helsinki)
  - 塔林 (Tallinn)
  - 波爾沃 (Porvoo)
  - 芬蘭堡 (Suomenlinna)

#### CityDrawer
- 點擊城市卡片開啟抽屜
- 顯示該城市所有景點 (POI)
- 支援篩選與排序
- 整合評分功能

#### POICard
- 景點卡片元件
- 顯示景點資訊：
  - 名稱（中英文）
  - 類型與標籤
  - 描述與小提示
  - Google Maps 連結
  - 使用者評分
- 支援開啟評分對話框

### 5. 極光體驗 (ArcticSection)
- 羅瓦涅米極光行程介紹
- 聖誕老人村體驗
- 馴鹿雪橇活動
- 破冰船之旅

### 6. 桑拿文化 (SaunaSection)
- 芬蘭桑拿文化介紹
- 公共桑拿推薦
- 使用禮儀說明
- 體驗分享

### 7. 美食系統
#### FoodPreview
- 首頁美食預覽區塊
- 精選美食卡片
- 點擊查看完整清單

#### FoodSection
- 完整美食展示
- 分類篩選：
  - 極地限定 (extreme)
  - 經典芬蘭菜 (classic)
  - 塔林美食 (tallinn)
  - 甜點 (dessert)
  - 飲品 (drink)
  - 小吃 (snack)

#### FoodDrawer
- 美食詳情抽屜
- 顯示食材、做法、推薦店家

### 8. 旅行準備
#### PrepSection
- 旅行前準備事項
- 快速連結按鈕

#### PreparationDrawer
- 詳細準備清單
- 簽證、保險、換匯資訊
- 打包建議

#### TaxRefundDrawer
- 退稅流程說明
- 所需文件
- 注意事項

#### EmergencyDrawer
- 緊急聯絡資訊
- 駐外使館資訊
- 常用急救用語

### 9. 評分與評論系統
#### RatingModal
- 使用者可為景點評分 (1-5 星)
- 撰寫評論文字
- 資料儲存至 localStorage

#### ViewingModal
- 查看景點所有評論
- 顯示平均評分
- 評論列表展示

### 10. 輔助功能
#### TonttuTip
- Tonttu 小精靈提示框
- 可自訂標題與內容
- 可關閉與重新開啟

#### WeatherCarousel
- 14 天天氣預報
- 輪播展示
- 溫度、天氣狀況

---

## 💾 資料結構

### CityPOI (景點資料)
```typescript
interface CityPOI {
  id: string;                 // 唯一識別碼
  name: string;               // 英文名稱
  nameZh: string;             // 中文名稱
  date: string;               // 日期（如 "12月19日"）
  dayNumber: number;          // 天數編號（用於排序）
  city: string;               // 城市代碼
  cityZh: string;             // 城市中文名
  type: string;               // 類型（景點/餐廳/博物館等）
  typeZh: string;             // 類型中文
  tags: string[];             // 標籤（必訪/拍照景點等）
  subtitle: string;           // 副標題
  description: string;        // 詳細描述
  tips?: string;              // Tonttu 提示
  location?: string;          // 位置資訊
  googleMapsUrl?: string;     // Google Maps 連結
  image?: string;             // 圖片 URL
}
```

### FoodItem (美食資料)
```typescript
interface FoodItem {
  id: string;                 // 唯一識別碼
  name: string;               // 英文名稱
  nameZh: string;             // 中文名稱
  category: string;           // 分類
  tags: string[];             // 標籤
  subtitle: string;           // 副標題
  description: string;        // 描述
  imgUrl?: string;            // 圖片 URL
}
```

### Comment (評論資料)
```typescript
interface Comment {
  id: number;                 // 評論 ID
  author: string;             // 作者名稱
  text: string;               // 評論內容
  rating: number;             // 評分 (1-5)
  date: number;               // 時間戳
}
```

---

## 🔄 資料流程

### 評分與評論流程

```
使用者點擊「評分」
    ↓
開啟 RatingModal
    ↓
輸入評分與評論
    ↓
儲存至 localStorage
(key: comments_${poiId})
    ↓
更新平均評分顯示
```

### 景點查看流程

```
使用者點擊城市卡片
    ↓
開啟 CityDrawer
    ↓
載入該城市所有 POI
    ↓
顯示 POICard 列表
    ↓
使用者可：
- 篩選景點類型
- 查看評分
- 開啟 Google Maps
- 新增評分
- 查看評論
```

---

## 🎨 UI/UX 設計特點

### 響應式設計
- **桌面版**: 使用頂部導航
- **移動版**: 使用漢堡選單 + 底部標籤導航
- **斷點**: Tailwind 預設斷點 (sm, md, lg, xl)

### 動畫效果
- GSAP 驅動的頁面捲動動畫
- Framer Motion 元件進入動畫
- 平滑的抽屜開關效果

### 色彩系統
- 主色調: 芬蘭國旗藍色
- 輔助色: 極光綠、聖誕紅
- 中性色: 灰階系統

### 字型
- 中文: 系統預設字型
- 英文: Tailwind 預設 Sans-serif

---

## 🔒 資料持久化

### LocalStorage 使用

```javascript
// 評論資料
localStorage.setItem(`comments_${poiId}`, JSON.stringify(comments));

// 讀取評論
const comments = JSON.parse(localStorage.getItem(`comments_${poiId}`) || '[]');
```

**儲存的資料：**
- 使用者評論與評分
- 評論作者名稱
- 評論時間戳

**注意事項：**
- LocalStorage 有大小限制（通常 5-10MB）
- 資料僅存在本地瀏覽器
- 清除瀏覽器資料會遺失評論

---

## 🚀 部署流程

### 開發環境
```bash
npm install      # 安裝依賴
npm run dev      # 啟動開發伺服器 (port 5173)
```

### 生產環境
```bash
npm run build    # 建置生產版本 (輸出至 dist/)
npm run preview  # 預覽生產版本 (port 3000)
```

### 伺服器部署
```bash
# 方法 1: 手動部署
git pull
npm install
npm run build
pm2 restart finlandtrip

# 方法 2: 使用自動化腳本
./deploy.sh
```

---

## 🔧 配置檔案

### vite.config.ts
```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: [
      'finlandtrip.missbanban.com',
      'localhost'
    ]
  }
})
```

### ecosystem.config.js (PM2)
```javascript
module.exports = {
  apps: [{
    name: 'finlandtrip',
    script: 'npm',
    args: 'run preview',
    cwd: '/var/www/finlandtrip.missbanban',
    instances: 1,
    autorestart: true,
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

---

## 🔍 SEO 優化

### Meta Tags
- 完整的 Open Graph 標籤（Facebook 分享）
- Twitter Card 標籤
- 語言設定：zh-TW
- Canonical URL
- 關鍵字優化

### 關鍵字策略
- 主要關鍵字：芬蘭旅遊、芬蘭極光、赫爾辛基
- 長尾關鍵字：羅瓦涅米極光、芬蘭美食、北歐旅遊
- 品牌關鍵字：MissBanBan

### 結構化資料
- 語義化 HTML 標籤
- 適當的標題層級 (h1, h2, h3)
- Alt 文字優化

---

## 📊 效能優化

### 程式碼層面
- React.lazy() 延遲載入
- useMemo() 記憶化計算
- 圖片懶加載
- Tree-shaking (Vite 自動處理)

### 建置優化
- Vite 快速建置
- 程式碼分割
- CSS 壓縮
- 資源壓縮

### 伺服器層面
- Nginx 反向代理
- gzip 壓縮
- Browser Cache
- CDN (可選)

---

## 🚀 Supabase 後端整合

### 架構概述

專案已整合 **Supabase** 作為後端服務，提供：
- 🔐 使用者認證系統
- 💾 雲端評論與評分系統
- 📊 跨裝置資料同步
- 🔒 JWT Token 安全驗證

### 技術棧

```
Supabase
├── Auth (內建認證系統)
├── Edge Functions (Deno 運行時)
├── PostgreSQL Database (關聯式資料庫)
└── Key-Value Store (自定義 KV 儲存)
```

### 資料庫結構

#### kv_store_081848af 表
```sql
CREATE TABLE kv_store_081848af (
  key TEXT NOT NULL PRIMARY KEY,
  value JSONB NOT NULL
);
```

**儲存的資料類型：**

1. **使用者資料** (`profile:{userId}`)
```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "nickname": "旅行者",
  "createdAt": "2025-12-16T10:00:00Z"
}
```

2. **評分資料** (`ratings:{poiId}`)
```json
[
  {
    "id": 1734345600000,
    "userId": "uuid",
    "poiId": "helsinki-cathedral",
    "author": "旅行者",
    "rating": 5,
    "text": "非常漂亮的教堂！",
    "date": 1734345600000
  }
]
```

### API 端點

**Base URL**: `https://lylsrqsrzxoijwrhzcka.supabase.co/functions/v1/make-server-081848af`

#### 認證相關

##### 1. 使用者註冊
```http
POST /auth/register
Content-Type: application/json
Authorization: Bearer {publicAnonKey}

{
  "email": "user@example.com",
  "password": "password123",
  "nickname": "旅行者"
}
```

**回應：**
```json
{
  "message": "Registration successful",
  "userId": "uuid"
}
```

##### 2. 使用者登入
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**回應：**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "nickname": "旅行者"
  }
}
```

##### 3. 取得當前使用者資訊
```http
GET /auth/me
Authorization: Bearer {accessToken}
```

**回應：**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "nickname": "旅行者"
  }
}
```

#### 評分相關

##### 4. 新增評分
```http
POST /ratings
Content-Type: application/json
Authorization: Bearer {accessToken}

{
  "poiId": "helsinki-cathedral",
  "rating": 5,
  "text": "非常漂亮的教堂！"
}
```

**回應：**
```json
{
  "message": "Rating saved successfully",
  "rating": {
    "id": 1734345600000,
    "userId": "uuid",
    "poiId": "helsinki-cathedral",
    "author": "旅行者",
    "rating": 5,
    "text": "非常漂亮的教堂！",
    "date": 1734345600000
  }
}
```

##### 5. 取得景點評分
```http
GET /ratings/{poiId}
```

**回應：**
```json
{
  "ratings": [
    {
      "id": 1734345600000,
      "userId": "uuid",
      "poiId": "helsinki-cathedral",
      "author": "旅行者",
      "rating": 5,
      "text": "非常漂亮的教堂！",
      "date": 1734345600000
    }
  ]
}
```

### 前端整合

#### 認證 Hook (useAuth)

```typescript
// src/hooks/useAuth.ts
const { user, loading, login, register, logout } = useAuth();

// 檢查是否登入
if (user) {
  console.log(`歡迎 ${user.nickname}`);
}
```

#### 認證 Modal (AuthModal)

```typescript
<AuthModal
  isOpen={isAuthModalOpen}
  onClose={() => setIsAuthModalOpen(false)}
  onAuthSuccess={() => {
    // 登入成功後的處理
    setIsAuthModalOpen(false);
  }}
/>
```

#### 評分功能 (RatingModal)

```typescript
<RatingModal
  isOpen={isRatingModalOpen}
  onClose={() => setIsRatingModalOpen(false)}
  poiId="helsinki-cathedral"
  poiName="赫爾辛基大教堂"
  userNickname={user?.nickname}
  isAuthenticated={!!user}
  onLoginRequired={() => setIsAuthModalOpen(true)}
/>
```

### 資料流程

#### 使用者註冊流程
```
1. 使用者填寫 Email + Password + Nickname
   ↓
2. 前端發送 POST /auth/register
   ↓
3. Supabase Auth 建立帳號
   ↓
4. KV Store 儲存使用者資料
   ↓
5. 返回 userId
```

#### 使用者登入流程
```
1. 使用者輸入 Email + Password
   ↓
2. 前端發送 POST /auth/login
   ↓
3. Supabase Auth 驗證身份
   ↓
4. 返回 accessToken + user info
   ↓
5. 儲存至 localStorage
   ↓
6. 更新前端 user state
```

#### 評分流程
```
1. 使用者點擊「評分」
   ↓
2. 檢查是否登入（未登入則顯示登入視窗）
   ↓
3. 填寫評分與評論
   ↓
4. 發送 POST /ratings (含 accessToken)
   ↓
5. 後端驗證 Token
   ↓
6. 儲存至 KV Store
   ↓
7. 返回成功訊息
   ↓
8. 前端更新評分列表
```

#### 查看評論流程
```
1. 使用者點擊「查看評論」
   ↓
2. 發送 GET /ratings/{poiId}
   ↓
3. 從 KV Store 讀取資料
   ↓
4. 返回評論列表
   ↓
5. 前端顯示所有評論
```

### 安全性設計

#### JWT Token 驗證
- 所有需要認證的 API 都需要 `Authorization: Bearer {token}`
- Token 由 Supabase Auth 簽發
- 過期時間由 Supabase 管理

#### 資料隔離
- 使用者只能看到自己的 Profile
- 評論資料包含 `userId` 追蹤作者
- 防止跨使用者資料洩漏

#### CORS 設定
```typescript
cors({
  origin: "*",
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
})
```

### 環境變數

#### Supabase Edge Function
```bash
SUPABASE_URL=https://lylsrqsrzxoijwrhzcka.supabase.co
SUPABASE_SERVICE_ROLE_KEY=***
```

#### 前端配置
```typescript
// src/utils/supabase/info.tsx
export const projectId = "lylsrqsrzxoijwrhzcka"
export const publicAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### LocalStorage vs Supabase

| 功能 | LocalStorage | Supabase |
|------|-------------|----------|
| 資料共享 | ❌ 僅限單一瀏覽器 | ✅ 所有使用者共享 |
| 跨裝置同步 | ❌ 無法同步 | ✅ 雲端同步 |
| 使用者認證 | ❌ 無 | ✅ JWT Token |
| 資料持久化 | ⚠️ 清除快取會遺失 | ✅ 永久儲存 |
| 即時更新 | ❌ 需重新整理 | ✅ API 即時讀取 |

### 優勢

✅ **真正的社群功能**：所有使用者的評論都能互相看到  
✅ **跨裝置體驗**：手機評分，電腦也能看到  
✅ **資料安全**：使用者認證 + JWT Token  
✅ **可擴展性**：輕鬆新增收藏、按讚等功能  
✅ **零維護成本**：Supabase 全託管服務  

### Supabase Dashboard

- **專案 ID**: `lylsrqsrzxoijwrhzcka`
- **資料庫**: https://supabase.com/dashboard/project/lylsrqsrzxoijwrhzcka/database/tables
- **Edge Functions**: https://supabase.com/dashboard/project/lylsrqsrzxoijwrhzcka/functions
- **Authentication**: https://supabase.com/dashboard/project/lylsrqsrzxoijwrhzcka/auth/users

### 未來擴充

- [ ] Email 驗證功能
- [ ] 密碼重設功能
- [ ] OAuth 登入 (Google, Facebook)
- [ ] 評論按讚功能
- [ ] 使用者收藏景點
- [ ] 管理員審核系統
- [ ] 圖片上傳功能
- [ ] 即時通知系統

---

## 🛠️ 維護與更新

### 更新內容流程
1. 修改 `src/data/` 下的資料檔案
2. 執行 `npm run build`
3. 使用 `deploy.sh` 部署
4. 確認網站更新成功

### 錯誤監控
```bash
# 查看 PM2 日誌
pm2 logs finlandtrip

# 查看 Nginx 錯誤日誌
sudo tail -f /var/log/nginx/finlandtrip.missbanban.com.error.log
```

### 備份策略
- 定期備份資料庫（未來）
- Git 版本控制
- 伺服器快照備份

---

## 📝 開發規範

### 命名規範
- 元件：PascalCase (e.g., `CityCard.tsx`)
- 函式：camelCase (e.g., `loadComments()`)
- 常數：UPPER_SNAKE_CASE (e.g., `API_URL`)
- 檔案：kebab-case 或 PascalCase

### 程式碼風格
- TypeScript 嚴格模式
- ESLint 規則檢查
- Prettier 格式化

### Git 提交規範
```
feat: 新增功能
fix: 修復錯誤
docs: 文件更新
style: 樣式調整
refactor: 重構程式碼
perf: 效能優化
test: 測試相關
chore: 雜項任務
```

---

## 📞 技術支援

**專案維護者**: MissBanBan Team  
**技術棧文件**:
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

**相關資源**:
- [README.md](./README.md) - 部署與使用說明
- [Figma 設計稿](https://www.figma.com/design/jgdTEXNfNyqA3CSsQHbQhL)

---

**最後更新**: 2025年12月16日  
**版本**: 0.1.0
