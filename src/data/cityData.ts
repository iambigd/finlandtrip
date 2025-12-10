export interface CityPOI {
  id: string;
  name: string;
  nameZh: string;
  date: string; // 格式: "12月19日" 或 "Day 1"
  dayNumber: number; // 用於排序
  city: 'helsinki' | 'tallinn' | 'porvoo' | 'suomenlinna';
  cityZh: '赫爾辛基' | '塔林' | '波爾沃' | '芬蘭堡';
  type: 'attraction' | 'restaurant' | 'museum' | 'shopping' | 'nature' | 'transport';
  typeZh: '景點' | '餐廳' | '博物館' | '購物' | '自然' | '交通';
  tags: ('必訪' | '拍照景點' | '世界遺產' | '設計朝聖' | '美食' | '當地體驗' | '中世紀' | '海港')[];
  subtitle: string;
  description: string;
  tips?: string; // Tonttu 的專屬小提示
  location?: string; // 具體位置或交通資訊
}

const createCityPOI = (
  id: string,
  name: string,
  nameZh: string,
  date: string,
  dayNumber: number,
  city: CityPOI['city'],
  cityZh: CityPOI['cityZh'],
  type: CityPOI['type'],
  typeZh: CityPOI['typeZh'],
  tags: CityPOI['tags'],
  subtitle: string,
  description: string,
  tips?: string,
  location?: string
): CityPOI => ({
  id,
  name,
  nameZh,
  date,
  dayNumber,
  city,
  cityZh,
  type,
  typeZh,
  tags,
  subtitle,
  description,
  tips,
  location,
});

export const cityData: CityPOI[] = [
  // ==============================
  // 赫爾辛基 Helsinki (Day 1-3, 12, 15)
  // ==============================
  
  // Day 1 - 12月19日
  createCityPOI(
    'helsinki-central-station',
    'Helsinki Central Station',
    '赫爾辛基中央車站',
    '12月19日',
    1,
    'helsinki',
    '赫爾辛基',
    'transport',
    '交通',
    ['必訪', '拍照景點', '設計朝聖'],
    '新藝術建築傑作',
    '由建築大師 Eliel Saarinen 設計的火車站，是芬蘭國家浪漫主義建築的代表作。巨大的花崗岩雕像「持燈人」守衛在入口兩側，成為赫爾辛基的標誌性景觀。',
    '車站大廳的挑高天花板和綠色銅製燈具非常適合拍照！',
    '市中心，所有電車與地鐵的交匯點'
  ),
  
  createCityPOI(
    'helsinki-cathedral',
    'Helsinki Cathedral',
    '赫爾辛基大教堂',
    '12月19日',
    1,
    'helsinki',
    '赫爾辛基',
    'attraction',
    '景點',
    ['必訪', '拍照景點'],
    '元老院廣場的白色地標',
    '從火車站出發，直奔赫爾辛基最著名的地標——白色大教堂。十二月時，元老院廣場上充滿了聖誕市集，空氣中瀰漫著熱紅酒 (Glögi) 的香氣，是體驗芬蘭節慶氣氛的最佳選擇。',
    '傍晚時分教堂會打燈，整座建築散發金色光芒，非常浪漫！',
    '元老院廣場 (Senate Square)，步行 10 分鐘從中央車站'
  ),
  
  createCityPOI(
    'esplanadi-park',
    'Esplanadi Park',
    '艾斯普拉納蒂公園',
    '12月19日',
    1,
    'helsinki',
    '赫爾辛基',
    'nature',
    '自然',
    ['當地體驗', '拍照景點'],
    '赫爾辛基的綠色心臟',
    '位於市中心的林蔭大道公園，冬季常有聖誕裝飾和戶外音樂演出。周邊圍繞著精品店、咖啡館與設計商店，是當地人與遊客都喜愛的散步路線。',
    '公園旁的 Café Ekberg（1852 年創立）是赫爾辛基最古老的咖啡館，值得一訪！',
    '介於 Pohjoisesplanadi 和 Eteläesplanadi 之間'
  ),
  
  createCityPOI(
    'market-square',
    'Market Square',
    '港口市集廣場',
    '12月19日',
    1,
    'helsinki',
    '赫爾辛基',
    'shopping',
    '購物',
    ['當地體驗', '美食'],
    '海港邊的傳統市集',
    '赫爾辛基最熱鬧的露天市集，販售新鮮魚貨、莓果、芬蘭傳統手工藝品與紀念品。冬季還有熱騰騰的炸魚三明治和熱飲攤位。',
    '試試看炸鱈魚三明治（Silakka burger）！',
    '海港邊，從大教堂步行 5 分鐘'
  ),

  // Day 2 - 12月20日
  createCityPOI(
    'design-museum',
    'Design Museum',
    '設計博物館',
    '12月20日',
    2,
    'helsinki',
    '赫爾辛基',
    'museum',
    '博物館',
    ['設計朝聖', '必訪'],
    '北歐設計的殿堂',
    '展示芬蘭從 19 世紀至今的設計演變，包含家具、陶瓷、時裝與平面設計。Alvar Aalto、Marimekko 等大師作品都能在此欣賞。',
    '博物館商店有獨家設計品，適合挑選伴手禮！',
    'Korkeavuorenkatu 23，電車 6/10 號'
  ),
  
  createCityPOI(
    'ateneum',
    'Ateneum Art Museum',
    '阿黛濃美術館',
    '12月20日',
    2,
    'helsinki',
    '赫爾辛基',
    'museum',
    '博物館',
    ['設計朝聖'],
    '芬蘭國家美術館',
    '收藏超過 20,000 件藝術品，包括芬蘭黃金時代畫家的作品以及國際藝術收藏。建築本身也是新文藝復興風格的傑作。',
    '週五開放到晚上 8 點，適合下午悠閒參觀！',
    'Kaivokatu 2，中央車站旁'
  ),
  
  createCityPOI(
    'stockmann',
    'Stockmann Department Store',
    'Stockmann 百貨',
    '12月20日',
    2,
    'helsinki',
    '赫爾辛基',
    'shopping',
    '購物',
    ['當地體驗'],
    '北歐最大的百貨公司',
    '創立於 1862 年的芬蘭老牌百貨，地下美食超市 (Herkku) 販售各種芬蘭特色食材和伴手禮，是採購 Fazer 巧克力、莓果果醬的好去處。',
    '聖誕季會有美麗的櫥窗裝飾，別錯過地下美食超市！',
    'Aleksanterinkatu 52B，市中心'
  ),

  // Day 3 - 12月21日
  createCityPOI(
    'kiasma',
    'Kiasma Museum',
    'Kiasma 當代藝術博物館',
    '12月21日',
    3,
    'helsinki',
    '赫爾辛基',
    'museum',
    '博物館',
    ['設計朝聖'],
    '前衛藝術空間',
    '由美國建築師 Steven Holl 設計的現代建築，展出北歐及國際當代藝術作品。建築本身的曲線設計與自然光運用令人驚艷。',
    '免費入場日通常是每月第一個週五，可以先上官網確認！',
    'Mannerheiminaukio 2，國會大廈對面'
  ),
  
  createCityPOI(
    'kamppi-chapel',
    'Kamppi Chapel of Silence',
    'Kamppi 寧靜教堂',
    '12月21日',
    3,
    'helsinki',
    '赫爾辛基',
    'attraction',
    '景點',
    ['設計朝聖', '拍照景點'],
    '都市中的靜謐空間',
    '完全由木材建造的現代教堂，外觀如同巨大的木製船體。內部沒有任何宗教符號，是讓人沉澱心靈的公共空間。',
    '這裡完全免費，且歡迎所有人進入靜坐休息，非常適合旅途中喘口氣。',
    'Simonkatu 7，Kamppi 購物中心旁'
  ),

  // Day 12 - 12月26日
  createCityPOI(
    'temppeliaukio-church',
    'Temppeliaukio Church',
    '岩石教堂',
    '12月26日',
    12,
    'helsinki',
    '赫爾辛基',
    'attraction',
    '景點',
    ['必訪', '拍照景點'],
    '在岩石中鑿出的建築奇蹟',
    '我們參觀了這座不可思議的建築——一座直接在巨大岩石中鑿出的教堂。銅製圓頂與自然光的結合，創造出寧靜而又極具現代感的震撼美學。',
    '音響效果極佳，經常有音樂會演出，可查詢官網行程表。',
    '電車 2/3 號或公車 14/18 號'
  ),
  
  createCityPOI(
    'sibelius-monument',
    'Sibelius Monument',
    '西貝流士紀念碑',
    '12月26日',
    12,
    'helsinki',
    '赫爾辛基',
    'attraction',
    '景點',
    ['拍照景點'],
    '向音樂大師致敬',
    '由 600 多支不鏽鋼管組成的抽象雕塑，紀念芬蘭國寶級作曲家 Jean Sibelius。位於海邊公園，寧靜且充滿藝術氣息。',
    '強風吹過時，鋼管會發出低沉的共鳴聲，彷彿管風琴演奏！',
    '電車 2 號，Töölö 區'
  ),

  // Day 15 - 12月29日
  createCityPOI(
    'airport-design-shop',
    'Helsinki Airport Design District',
    '赫爾辛基機場設計區',
    '12月29日',
    15,
    'helsinki',
    '赫爾辛基',
    'shopping',
    '購物',
    ['設計朝聖'],
    '最後的採購機會',
    '機場內有 Iittala、Marimekko、Artek 等芬蘭設計品牌專賣店，且免稅價格具競爭力。Fazer 巧克力在這裡也常有優惠組合。',
    '預留充足時間逛機場！設計區在安檢後，建議至少提前 2.5 小時到機場。',
    'Helsinki-Vantaa Airport (HEL)'
  ),

  // ==============================
  // 塔林 Tallinn (Day 10-11)
  // ==============================
  
  // Day 10 - 12月27日
  createCityPOI(
    'tallinn-old-town',
    'Tallinn Old Town',
    '塔林舊城區',
    '12月27日',
    10,
    'tallinn',
    '塔林',
    'attraction',
    '景點',
    ['必訪', '世界遺產', '中世紀', '拍照景點'],
    '保存最完整的中世紀城市',
    '搭乘 Eckerö Line 郵輪橫越芬蘭灣前往愛沙尼亞的塔林。中世紀的城牆、聖奧拉夫教堂，以及童話般的舊城區，讓這趟一日遊充滿古老的歐洲魅力。',
    '舊城區全部都是石板路，建議穿舒適的鞋子！',
    '從郵輪碼頭步行約 15-20 分鐘'
  ),
  
  createCityPOI(
    'alexander-nevsky-cathedral',
    'Alexander Nevsky Cathedral',
    '亞歷山大·涅夫斯基主教座堂',
    '12月27日',
    10,
    'tallinn',
    '塔林',
    'attraction',
    '景點',
    ['必訪', '拍照景點'],
    '俄羅斯東正教的洋蔥頂',
    '建於 1900 年的俄羅斯復興式教堂，黑色與金色的洋蔥型圓頂在塔林天際線上格外醒目。內部有精美的聖像畫與馬賽克壁畫。',
    '教堂鐘聲非常洪亮，整點時會響徹舊城！',
    '位於 Toompea 山丘上，國會大廈旁'
  ),
  
  createCityPOI(
    'toompea-castle',
    'Toompea Castle',
    '圖姆皮城堡',
    '12月27日',
    10,
    'tallinn',
    '塔林',
    'attraction',
    '景點',
    ['必訪', '中世紀'],
    '愛沙尼亞的權力中心',
    '建於 13 世紀的城堡，現為愛沙尼亞國會所在地。粉紅色的巴洛克風格外牆與中世紀塔樓形成有趣對比。',
    '只能外觀拍照，無法入內參觀。但城堡外的觀景台可以俯瞰整個塔林舊城！',
    'Lossi plats 1a'
  ),
  
  createCityPOI(
    'town-hall-square',
    'Town Hall Square',
    '市政廳廣場',
    '12月27日',
    10,
    'tallinn',
    '塔林',
    'attraction',
    '景點',
    ['必訪', '中世紀', '當地體驗'],
    '舊城的心臟',
    '塔林舊城最熱鬧的廣場，周圍環繞著色彩繽紛的商人住宅與餐廳。冬季時有聖誕市集，可以品嚐熱紅酒和愛沙尼亞傳統小吃。',
    '廣場中央有一口古老的水井，據說喝了會再回到塔林！',
    '舊城中心'
  ),

  // Day 11 - 12月28日
  createCityPOI(
    'st-olaf-church',
    "St. Olaf's Church",
    '聖奧拉夫教堂',
    '12月27日',
    10,
    'tallinn',
    '塔林',
    'attraction',
    '景點',
    ['必訪', '拍照景點'],
    '曾經的世界最高建築',
    '建於 12 世紀的教堂，尖塔高達 124 公尺，在 16 世紀時是世界最高的建築。可以爬上塔頂，俯瞰塔林全景與波羅的海。',
    '爬塔樓要走 258 級狹窄的螺旋階梯，需要一點體力！但景色絕對值得。',
    'Lai 50，舊城北側'
  ),
  
  createCityPOI(
    'kohtuotsa-viewpoint',
    'Kohtuotsa Viewing Platform',
    'Kohtuotsa 觀景台',
    '12月27日',
    10,
    'tallinn',
    '塔林',
    'attraction',
    '景點',
    ['必訪', '拍照景點'],
    '最佳舊城全景',
    '從 Toompea 山丘上的觀景台，可以將紅瓦屋頂的舊城區盡收眼底。這裡是拍攝塔林明信片照的最佳地點。',
    '日落時分最美，金色陽光灑在紅色屋頂上！',
    'Kohtu 12'
  ),
  
  createCityPOI(
    'olde-hansa',
    'Olde Hansa Restaurant',
    '老漢薩餐廳',
    '12月27日',
    10,
    'tallinn',
    '塔林',
    'restaurant',
    '餐廳',
    ['當地體驗', '中世紀', '美食'],
    '穿越時空的中世紀盛宴',
    '完全復刻 15 世紀漢薩同盟時期的主題餐廳。服務生穿著中世紀服裝，使用蠟燭照明，菜單包括野豬、鹿肉、蜂蜜啤酒等古老料理。',
    '預約時可以要求穿戴中世紀服裝用餐，非常特別的體驗！',
    'Vana turg 1，市政廳廣場旁'
  ),

  // ==============================
  // 波爾沃 Porvoo (Day 13)
  // ==============================
  
  createCityPOI(
    'porvoo-old-town',
    'Porvoo Old Town',
    '波爾沃舊城',
    '12月28日',
    13,
    'porvoo',
    '波爾沃',
    'attraction',
    '景點',
    ['必訪', '拍照景點', '當地體驗'],
    '芬蘭第二古老的城鎮',
    '芬蘭第二古老的城鎮，以河岸旁的紅色木造倉庫聞名。搭乘巴士前往，感受與赫爾辛基截然不同的古樸寧靜氛圍。',
    '紅色倉庫原本是用來儲存貨物，現在有些改建成咖啡館和藝廊！',
    '從赫爾辛基搭 Bus 848/848A，約 50 分鐘'
  ),
  
  createCityPOI(
    'porvoo-cathedral',
    'Porvoo Cathedral',
    '波爾沃大教堂',
    '12月28日',
    13,
    'porvoo',
    '波爾沃',
    'attraction',
    '景點',
    ['必訪'],
    '芬蘭最古老的教堂之一',
    '建於 15 世紀的石造教堂，是芬蘭路德教會的重要歷史建築。教堂位於山丘上，可俯瞰整個小鎮與河景。',
    '1809 年俄國沙皇亞歷山大一世在此宣布芬蘭為自治大公國，歷史意義重大！',
    '舊城山丘頂'
  ),
  
  createCityPOI(
    'porvoo-market-hall',
    'Porvoo Old Market Hall',
    '波爾沃舊市場',
    '12月28日',
    13,
    'porvoo',
    '波爾沃',
    'shopping',
    '購物',
    ['當地體驗', '美食'],
    '傳統市集與手工藝品',
    '建於 1762 年的木造市場建築，販售當地手工藝品、有機食材、傳統糕點。非常適合尋找獨特的芬蘭紀念品。',
    '試試 Brunberg 巧克力，這個品牌創立於波爾沃，是當地的驕傲！',
    'Mannerheiminkatu 2'
  ),
  
  createCityPOI(
    'runeberg-home',
    "Runeberg's Home Museum",
    '倫貝格故居博物館',
    '12月28日',
    13,
    'porvoo',
    '波爾沃',
    'museum',
    '博物館',
    ['當地體驗'],
    '芬蘭國民詩人的家',
    '芬蘭國歌作詞者 Johan Ludvig Runeberg 的故居，完整保存 19 世紀的家具與生活用品。花園在夏季時非常美麗。',
    '每年 2/5 是芬蘭的「倫貝格日」，會吃特製的杏仁塔 (Runeberg Cake)！',
    'Aleksanterinkatu 3'
  ),

  // ==============================
  // 芬蘭堡 Suomenlinna (Day 14)
  // ==============================
  
  createCityPOI(
    'suomenlinna-fortress',
    'Suomenlinna Sea Fortress',
    '芬蘭堡海上堡壘',
    '12月28日',
    14,
    'suomenlinna',
    '芬蘭堡',
    'attraction',
    '景點',
    ['必訪', '世界遺產', '拍照景點', '海港'],
    'UNESCO 世界遺產',
    '建於 18 世紀的海上軍事堡壘，分布在六座島嶼上。冬季遊客較少，可以靜靜漫步在古老的城牆與砲台之間，感受歷史的厚重感。',
    '搭乘渡輪只需 15 分鐘，但島上很大，建議預留 3-4 小時探索！',
    '從 Market Square 搭渡輪，全年營運'
  ),
  
  createCityPOI(
    'suomenlinna-museum',
    'Suomenlinna Museum',
    '芬蘭堡博物館',
    '12月28日',
    14,
    'suomenlinna',
    '芬蘭堡',
    'museum',
    '博物館',
    ['世界遺產'],
    '了解堡壘的歷史',
    '介紹芬蘭堡從瑞典、俄國到芬蘭三個時期的歷史變遷。有多媒體展示與古老的軍事文物。',
    '博物館門票包含在 Helsinki Card 內！',
    '島上主要廣場旁'
  ),
  
  createCityPOI(
    'suomenlinna-church',
    'Suomenlinna Church',
    '芬蘭堡教堂',
    '12月28日',
    14,
    'suomenlinna',
    '芬蘭堡',
    'attraction',
    '景點',
    ['拍照景點'],
    '雙重功能的燈塔教堂',
    '這座教堂同時也是航海燈塔，獨特的雙重身份在世界上極為罕見。淺綠色的圓頂在海天之間特別醒目。',
    '教堂在夏季時會舉辦音樂會，冬季則較少開放。',
    '島上中央位置'
  ),
  
  createCityPOI(
    'suomenlinna-cafe',
    'Café Chapman & Café Vanille',
    '島上咖啡館',
    '12月28日',
    14,
    'suomenlinna',
    '芬蘭堡',
    'restaurant',
    '餐廳',
    ['當地體驗', '美食'],
    '海風中的暖身咖啡',
    '島上有幾家溫馨的咖啡館，提供芬蘭傳統糕點與熱飲。冬季在戶外散步後，來杯熱可可特別治癒。',
    'Café Vanille 的肉桂捲 (Korvapuusti) 超級好吃！',
    '島上多處'
  ),
];

// 城市秘訣資料
export interface CityTip {
  city: CityPOI['city'];
  tips: string[];
}

export const cityTips: CityTip[] = [
  {
    city: 'helsinki',
    tips: [
      '購買 Helsinki Card 可以免費使用大眾交通與參觀多數博物館，非常划算！',
      '電車是最方便的交通工具，記得下載 HSL App 購票。',
      '大部分博物館週一休館，請提前規劃行程。',
      'Stockmann 百貨的地下美食超市是採購伴手禮的好地方。',
      '即使在冬天，赫爾辛基的日照時間很短（約早上 9 點到下午 3 點），要把握時間！',
    ],
  },
  {
    city: 'tallinn',
    tips: [
      '即使塔林在申根區內，郵輪往返時偶爾會檢查護照，記得攜帶！',
      '舊城區石板路很滑，冬季建議穿防滑鞋。',
      '愛沙尼亞使用歐元，但物價比芬蘭便宜約 30-40%。',
      '許多餐廳接受預約，熱門餐廳如 Olde Hansa 建議提前訂位。',
      '郵輪最晚班次通常是晚上 8-9 點，要預留時間返回碼頭。',
    ],
  },
  {
    city: 'porvoo',
    tips: [
      '從赫爾辛基搭巴士約 50 分鐘，可使用 HSL 或購買單程票。',
      '小鎮不大，半天時間就能逛完主要景點。',
      '紅色倉庫是最佳拍照點，建議早上光線較好。',
      'Brunberg 巧克力工廠就在波爾沃，可以買到獨家商品！',
      '冬季部分景點可能提早關門，建議中午前抵達。',
    ],
  },
  {
    city: 'suomenlinna',
    tips: [
      '渡輪全年營運，但冬季班次較少，記得查詢時刻表。',
      '島上餐廳選擇有限，可以自備野餐食物。',
      '冬季海風很強，務必穿保暖防風外套。',
      '島上有免費 WiFi，但訊號不穩定。',
      '夏季有導覽團，冬季則需自行探索，可以下載官方 App。',
    ],
  },
];
