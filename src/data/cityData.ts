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
  googleMapsUrl?: string; // Google Maps 連結
  image?: string; // 景點縮圖
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
  location?: string,
  googleMapsUrl?: string,
  image?: string
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
  googleMapsUrl,
  image,
});

export const cityData: CityPOI[] = [
  // ==============================
  // 赫爾辛基 Helsinki (Day 1, 2, 7, 8, 11, 13, 14)
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
    '市中心，所有電車與地鐵的交匯點',
    'https://www.google.com/maps/search/?api=1&query=Helsinki+Central+Station'
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
    '元老院廣場 (Senate Square)，步行 10 分鐘從中央車站',
    'https://www.google.com/maps/search/?api=1&query=Helsinki+Cathedral',
    'https://images.unsplash.com/photo-1551783006-2249fd1f6fa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIZWxzaW5raSUyMENhdGhlZHJhbCUyMHdoaXRlJTIwd2ludGVyfGVufDF8fHx8MTc2NTcwNDM3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
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
    '介於 Pohjoisesplanadi 和 Eteläesplanadi 之間',
    'https://www.google.com/maps/search/?api=1&query=Esplanadi+Park+Helsinki'
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
    '海港邊，從大教堂步行 5 分鐘',
    'https://www.google.com/maps/search/?api=1&query=Market+Square+Helsinki'
  ),

  // Day 2 - 12月20日
  createCityPOI(
    'oodi-library',
    'Oodi Central Library',
    'Oodi 頌歌圖書館',
    '12月20日',
    2,
    'helsinki',
    '赫爾辛基',
    'attraction',
    '景點',
    ['必訪', '設計朝聖', '拍照景點'],
    '21世紀的公共空間典範',
    '2018 年開幕的全新圖書館，由 ALA Architects 設計。波浪形的木質天花板與挑高玻璃帷幕創造出明亮開放的空間，不僅是圖書館，更是市民的客廳。',
    '三樓的露台可以俯瞰國會大廈，是絕佳的拍照點！',
    'Töölönlahdenkatu 4，中央車站步行10分鐘',
    'https://www.google.com/maps/search/?api=1&query=Oodi+Central+Library+Helsinki'
  ),

  createCityPOI(
    'temppeliaukio-church',
    'Temppeliaukio Church',
    '岩石教堂',
    '12月20日',
    2,
    'helsinki',
    '赫爾辛基',
    'attraction',
    '景點',
    ['必訪', '拍照景點'],
    '在岩石中鑿出的建築奇蹟',
    '一座直接在巨大岩石中鑿出的教堂。銅製圓頂與自然光的結合，創造出寧靜而又極具現代感的震撼美學。',
    '音響效果極佳，經常有音樂會演出，可查詢官網行程表。',
    '電車 2/3 號或公車 14/18 號',
    'https://www.google.com/maps/search/?api=1&query=Temppeliaukio+Church+Helsinki'
  ),

  createCityPOI(
    'cafe-regatta',
    'Café Regatta',
    'Regatta 海邊咖啡館',
    '12月20日',
    2,
    'helsinki',
    '赫爾辛基',
    'restaurant',
    '餐廳',
    ['當地體驗', '美食', '拍照景點'],
    '海邊的紅色小木屋',
    '位於海邊的迷你咖啡館，紅色木屋外觀超級可愛。冬天可以在戶外烤棉花糖，喝著熱可可看海景，是赫爾辛基最浪漫的角落。',
    '肉桂捲 (Korvapuusti) 超級好吃！室內座位很少，建議外帶到海邊長凳享用。',
    'Merikannontie 8，電車 4 號',
    'https://www.google.com/maps/search/?api=1&query=Café+Regatta+Helsinki'
  ),

  createCityPOI(
    'finlandia-hall',
    'Finlandia Hall',
    '芬蘭廳',
    '12月20日',
    2,
    'helsinki',
    '赫爾辛基',
    'attraction',
    '景點',
    ['設計朝聖'],
    'Alvar Aalto 的建築傑作',
    '由芬蘭國寶建築師 Alvar Aalto 設計的音樂廳與會議中心，白色大理石外牆在湖畔格外醒目。是芬蘭現代主義建築的經典之作。',
    '建築內部需購票或參加導覽才能參觀，但外觀與湖景已值得一訪！',
    'Mannerheimintie 13e，Töölönlahti 湖畔',
    'https://www.google.com/maps/search/?api=1&query=Finlandia+Hall+Helsinki'
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
    '創立於 1862 年的芬蘭老牌百貨，地下美食超市 (Herkku) 買售各種芬蘭特色食材和伴手禮，是採購 Fazer 巧克力、莓果果醬的好去處。',
    '聖誕季會有美麗的櫥窗裝飾，別錯過地下美食超市！',
    'Aleksanterinkatu 52B，市中心',
    'https://www.google.com/maps/search/?api=1&query=Stockmann+Department+Store+Helsinki'
  ),

  // Day 7 - 12月25日（聖誕節）
  createCityPOI(
    'toolo-lake',
    'Töölönlahti Bay',
    'Töölö 湖灣',
    '12月25日',
    7,
    'helsinki',
    '赫爾辛基',
    'nature',
    '自然',
    ['當地體驗', '拍照景點'],
    '寧靜的城市綠洲',
    '位於市中心的湖灣區域，冬季湖面結冰，當地人會在這裡滑冰散步。周邊有Finlandia Hall、國家博物館等建築，是感受赫爾辛基日常生活的好地方。',
    '聖誕節許多景點關閉，來湖邊散步是最療癒的選擇！',
    '中央車站步行15分鐘',
    'https://www.google.com/maps/search/?api=1&query=Töölönlahti+Bay+Helsinki'
  ),

  createCityPOI(
    'sibelius-monument',
    'Sibelius Monument',
    '西貝流士紀念碑',
    '12月25日',
    7,
    'helsinki',
    '赫爾辛基',
    'attraction',
    '景點',
    ['拍照景點'],
    '向音樂大師致敬',
    '由 600 多支不鏽鋼管組成的抽象雕塑，紀念芬蘭國寶級作曲家 Jean Sibelius。位於海邊公園，寧靜且充滿藝術氣息。',
    '強風吹過時，鋼管會發出低沉的共鳴聲，彷彿管風琴演奏！',
    '電車 2 號，Töölö 區',
    'https://www.google.com/maps/search/?api=1&query=Sibelius+Monument+Helsinki'
  ),

  createCityPOI(
    'kaivopuisto-park',
    'Kaivopuisto Park',
    'Kaivopuisto 海濱公園',
    '12月25日',
    7,
    'helsinki',
    '赫爾辛基',
    'nature',
    '自然',
    ['拍照景點', '當地體驗'],
    '赫爾辛基的南端海岬',
    '赫爾辛基最古老的公園，位於半島南端，可以看到波羅的海與周邊島嶼。冬季雖然寒冷，但海景依然壯觀，是當地人遛狗散步的熱門地點。',
    '公園內有幾座優雅的使館建築，非常適合拍照！',
    '電車 3T 到 Kaivopuisto 站',
    'https://www.google.com/maps/search/?api=1&query=Kaivopuisto+Park+Helsinki'
  ),

  // Day 8 - 12月26日
  createCityPOI(
    'national-library',
    'National Library of Finland',
    '芬蘭國家圖書館',
    '12月26日',
    8,
    'helsinki',
    '赫爾辛基',
    'museum',
    '博物館',
    ['設計朝聖', '拍照景點'],
    '新古典主義的圖書殿堂',
    '建於 1840 年的宏偉圖書館，大閱覽室有高聳的科林斯柱與精美的壁畫天花板。冬季遊客較少，可以靜靜感受知識殿堂的莊嚴氣氛。',
    '大閱覽室免費參觀，但需保持安靜。絕美的穹頂值得仰望！',
    'Unioninkatu 36，參議院廣場旁',
    'https://www.google.com/maps/search/?api=1&query=National+Library+of+Finland+Helsinki'
  ),

  createCityPOI(
    'kaisa-library',
    'Helsinki University Kaisa Library',
    '赫爾辛基大學 Kaisa 圖書館',
    '12月26日',
    8,
    'helsinki',
    '赫爾辛基',
    'attraction',
    '景點',
    ['設計朝聖', '拍照景點'],
    '現代建築的學習空間',
    '2012 年開幕的大學圖書館，由 Anttinen Oiva Architects 設計。紅磚外牆與玻璃帷幕的結合，內部螺旋樓梯是 Instagram 熱門打卡點。',
    '需要學生證才能進入部分區域，但一樓大廳和咖啡館開放所有人！',
    'Fabianinkatu 30，市中心',
    'https://www.google.com/maps/search/?api=1&query=Helsinki+University+Kaisa+Library'
  ),

  createCityPOI(
    'amos-rex',
    'Amos Rex Museum',
    '阿莫斯瑞克美術館',
    '12月26日',
    8,
    'helsinki',
    '赫爾辛基',
    'museum',
    '博物館',
    ['設計朝聖', '必訪', '拍照景點'],
    '地下的當代藝術奇蹟',
    '2018 年開幕的地下美術館，屋頂的圓頂天窗從 Lasipalatsi 廣場突出，成為新地標。展出當代藝術與數位藝術，互動性極強。',
    '廣場上的圓頂可以爬上去拍照！館內禁止攝影，但體驗勝過拍照。',
    'Mannerheimintie 22-24，Kamppi 附近',
    'https://www.google.com/maps/search/?api=1&query=Amos+Rex+Museum+Helsinki'
  ),

  createCityPOI(
    'kamppi-chapel',
    'Kamppi Chapel of Silence',
    'Kamppi 寧靜教堂',
    '12月26日',
    8,
    'helsinki',
    '赫爾辛基',
    'attraction',
    '景點',
    ['設計朝聖', '拍照景點'],
    '都市中的靜謐空間',
    '完全由木材建造的現代教堂，外觀如同巨大的木製船體。內部沒有任何宗教符號，是讓人沉澱心靈的公共空間。',
    '這裡完全免費，且歡迎所有人進入靜坐休息，非常適合旅途中喘口氣。',
    'Simonkatu 7，Kamppi 購物中心旁',
    'https://www.google.com/maps/search/?api=1&query=Kamppi+Chapel+of+Silence+Helsinki'
  ),

  createCityPOI(
    'old-market-hall',
    'Old Market Hall',
    '老農市集',
    '12月26日',
    8,
    'helsinki',
    '赫爾辛基',
    'shopping',
    '購物',
    ['美食', '當地體驗'],
    '百年傳統室內市場',
    '建於 1889 年的紅磚市場建築，內有各種芬蘭傳統美食攤位，包括煙燻鮭魚、馴鹿肉、芬蘭起司等。是採購伴手禮和品嚐在地美食的好地方。',
    '試試傳統的卡累利阿派（Karjalanpiirakka）配蛋黃奶油！',
    '港口旁，Market Square 旁邊',
    'https://www.google.com/maps/search/?api=1&query=Old+Market+Hall+Helsinki'
  ),

  createCityPOI(
    'uspenski-cathedral',
    'Uspenski Cathedral',
    '烏斯佩斯基大教堂',
    '12月26日',
    8,
    'helsinki',
    '赫爾辛基',
    'attraction',
    '景點',
    ['必訪', '拍照景點'],
    '北歐最大的東正教教堂',
    '建於 1868 年的紅磚東正教大教堂，洋蔥形金色圓頂在海港邊格外醒目。內部有精美的聖像畫和華麗的吊燈，展現俄羅斯拜占庭風格。',
    '教堂位於小山丘上，可以俯瞰港口和市區美景！',
    'Kanavakatu 1，港口區 Katajanokka 半島',
    'https://www.google.com/maps/search/?api=1&query=Uspenski+Cathedral+Helsinki'
  ),

  // Day 11 - 12月29日
  createCityPOI(
    'st-johns-church',
    "St. John's Church",
    '聖約翰教堂',
    '12月29日',
    11,
    'helsinki',
    '赫爾辛基',
    'attraction',
    '景點',
    ['拍照景點'],
    '赫爾辛基最大的教堂',
    '新哥德式建築，雙塔高達 74 公尺，是赫爾辛基最高的教堂。紅磚外觀與尖塔在城市天際線上非常顯眼，內部空間宏偉莊嚴。',
    '如果時間充裕再訪，教堂位於住宅區，氛圍寧靜。',
    'Korkeavuorenkatu 12，電車 6/9 號',
    'https://www.google.com/maps/search/?api=1&query=St+John+Church+Helsinki'
  ),

  createCityPOI(
    'artek-store',
    'Artek Store & Showroom',
    'Artek 傑具設計商店',
    '12月29日',
    11,
    'helsinki',
    '赫爾辛基',
    'shopping',
    '購物',
    ['設計朝聖', '必訪'],
    'Alvar Aalto 的設計王國',
    '由 Alvar Aalto 創立的家具品牌旗艦店，展示經典的曲木椅、Stool 60 等北歐設計名作。即使不購買，也值得進去欣賞設計之美。',
    'Stool 60 是經典中的經典，全球賣出超過 800 萬張！',
    'Eteläesplanadi 18，Esplanadi 公園旁',
    'https://www.google.com/maps/search/?api=1&query=Artek+Store+Helsinki'
  ),

  createCityPOI(
    'design-museum',
    'Design Museum',
    '設計博物館',
    '12月29日',
    11,
    'helsinki',
    '赫爾辛基',
    'museum',
    '博物館',
    ['設計朝聖', '必訪'],
    '北歐設計的殿堂',
    '展示芬蘭從 19 世紀至今的設計演變，包含家具、陶瓷、時裝與平面設計。Alvar Aalto、Marimekko 等大師作品都能在此欣賞。',
    '博物館商店有獨家設計品，適合挑選伴手禮！',
    'Korkeavuorenkatu 23，電車 6/10 號',
    'https://www.google.com/maps/search/?api=1&query=Design+Museum+Helsinki'
  ),
  
  createCityPOI(
    'ateneum',
    'Ateneum Art Museum',
    '阿黛濃美術館',
    '12月29日',
    11,
    'helsinki',
    '赫爾辛基',
    'museum',
    '博物館',
    ['設計朝聖'],
    '芬蘭國家美術館',
    '收藏超過 20,000 件藝術品，包括芬蘭黃金時代畫家的作品以及國際藝術收藏。建築本身也是新文藝復興風格的傑作。',
    '週五開放到晚上 8 點，適合下午悠閒參觀！',
    'Kaivokatu 2，中央車站旁',
    'https://www.google.com/maps/search/?api=1&query=Ateneum+Art+Museum+Helsinki'
  ),

  createCityPOI(
    'academic-bookstore',
    'Academic Bookstore',
    '學術書店',
    '12月29日',
    11,
    'helsinki',
    '赫爾辛基',
    'shopping',
    '購物',
    ['設計朝聖'],
    'Alvar Aalto 設計的書店',
    '由 Alvar Aalto 設計的書店建築，是全球最美書店之一。三層樓的開放空間，有豐富的芬蘭設計、建築類書籍與文具。',
    '二樓有 Aalto 的原始設計圖展示，書迷和設計迷必訪！',
    'Keskuskatu 1，中央車站對面',
    'https://www.google.com/maps/search/?api=1&query=Academic+Bookstore+Helsinki'
  ),

  // Day 14 - 1月1日（元旦）
  createCityPOI(
    'airport-design-shop',
    'Helsinki Airport Design District',
    '赫爾辛基機場設計區',
    '1月1日',
    14,
    'helsinki',
    '赫爾辛基',
    'shopping',
    '購物',
    ['設計朝聖'],
    '最後的採購機會',
    '機場內有 Iittala、Marimekko、Artek 等芬蘭設計品牌專賣店，且免稅價格具競爭力。Fazer 巧克力在這裡也常有優惠組合。',
    '預留充足時間逛機場！設計區在安檢後，建議至少提前 2.5 小時到機場。',
    'Helsinki-Vantaa Airport (HEL)',
    'https://www.google.com/maps/search/?api=1&query=Helsinki+Airport'
  ),

  // ==============================
  // 塔林 Tallinn (Day 9)
  // ==============================
  
  createCityPOI(
    'viru-gate',
    'Viru Gate',
    '維魯城門',
    '12月27日',
    9,
    'tallinn',
    '塔林',
    'attraction',
    '景點',
    ['必訪', '拍照景點', '中世紀'],
    '舊城的入口地標',
    '建於 14 世紀的城門，是進入塔林舊城的主要入口。雙塔結構保存完好，是塔林最具代表性的中世紀建築之一。',
    '城門兩側是熱鬧的 Viru 街，有許多紀念品店和餐廳！',
    '舊城東側入口',
    'https://www.google.com/maps/search/?api=1&query=Viru+Gate+Tallinn'
  ),

  createCityPOI(
    'tallinn-old-town',
    'Tallinn Old Town',
    '塔林舊城區',
    '12月27日',
    9,
    'tallinn',
    '塔林',
    'attraction',
    '景點',
    ['必訪', '世界遺產', '中世紀', '拍照景點'],
    '保存最完整的中世紀城市',
    '搭乘 Eckerö Line 郵輪橫越芬蘭灣前往愛沙尼亞的塔林。中世紀的城牆、聖奧拉夫教堂，以及童話般的舊城區，讓這趟一日遊充滿古老的歐洲魅力。',
    '舊城區全部都是石板路，建議穿舒適的鞋子！',
    '從郵輪碼頭步行約 15-20 分鐘',
    'https://www.google.com/maps/search/?api=1&query=Tallinn+Old+Town'
  ),

  createCityPOI(
    'town-hall-pharmacy',
    'Town Hall Pharmacy',
    '市政廳藥局',
    '12月27日',
    9,
    'tallinn',
    '塔林',
    'museum',
    '博物館',
    ['中世紀', '當地體驗'],
    '歐洲最古老的營業藥局',
    '創立於 1422 年，已連續營業超過 600 年的藥局。現在一部分是博物館，展示古老的藥瓶、處方與醫療工具，另一部分仍在販售藥品。',
    '可以買到傳統的藥草茶和蜂蜜酒配方，很特別的伴手禮！',
    'Raekoja plats 11，市政廳廣場上',
    'https://www.google.com/maps/search/?api=1&query=Town+Hall+Pharmacy+Tallinn'
  ),
  
  createCityPOI(
    'alexander-nevsky-cathedral',
    'Alexander Nevsky Cathedral',
    '亞歷山大·涅夫斯基主教座堂',
    '12月27日',
    9,
    'tallinn',
    '塔林',
    'attraction',
    '景點',
    ['必訪', '拍照景點'],
    '俄羅斯東正教的洋蔥頂',
    '建於 1900 年的俄羅斯復興式教堂，黑色與金色的洋蔥型圓頂在塔林天際線上格外醒目。內部有精美的聖像畫與馬賽克壁畫。',
    '教堂鐘聲非常洪亮，整點時會響徹舊城！',
    '位於 Toompea 山丘上，國會大廈旁',
    'https://www.google.com/maps/search/?api=1&query=Alexander+Nevsky+Cathedral+Tallinn'
  ),

  createCityPOI(
    'st-marys-cathedral',
    "St. Mary's Cathedral",
    '聖母主教座堂',
    '12月27日',
    9,
    'tallinn',
    '塔林',
    'attraction',
    '景點',
    ['中世紀', '拍照景點'],
    '塔林最古老的教堂',
    '建於 13 世紀的路德教會教堂，也是愛沙尼亞最古老的教堂之一。內部有精美的木雕祭壇和貴族家族的徽章裝飾。',
    '教堂墓地埋葬了許多歷史名人，包括瑞典和俄國時期的貴族！',
    'Toom-Kooli 6，Toompea 山丘上',
    'https://www.google.com/maps/search/?api=1&query=St+Mary+Cathedral+Tallinn'
  ),
  
  createCityPOI(
    'toompea-castle',
    'Toompea Castle',
    '圖姆皮城堡',
    '12月27日',
    9,
    'tallinn',
    '塔林',
    'attraction',
    '景點',
    ['必訪', '中世紀'],
    '愛沙尼亞的權力中心',
    '建於 13 世紀的城堡，現為愛沙尼亞國會所在地。粉紅色的巴洛克風格外牆與中世紀塔樓形成有趣對比。',
    '只能外觀拍照，無法入內參觀。但城堡外的觀景台可以俯瞰整個塔林舊城！',
    'Lossi plats 1a',
    'https://www.google.com/maps/search/?api=1&query=Toompea+Castle+Tallinn'
  ),

  createCityPOI(
    'danish-kings-garden',
    "Danish King's Garden",
    '丹麥國王花園',
    '12月27日',
    9,
    'tallinn',
    '塔林',
    'nature',
    '自然',
    ['當地體驗', '拍照景點'],
    '傳說中丹麥國旗誕生之地',
    '根據傳說，1219 年丹麥國王在此作戰時，紅白十字國旗從天而降，帶來勝利。花園內有紀念碑和美麗的城牆景觀。',
    '夏季是綠意盎然的公園，冬季則寧靜蕭瑟，各有風情！',
    'Toompea 山丘北側',
    'https://www.google.com/maps/search/?api=1&query=Danish+King+Garden+Tallinn'
  ),

  createCityPOI(
    'tallinn-town-hall',
    'Tallinn Town Hall',
    '塔林市政廳',
    '12月27日',
    9,
    'tallinn',
    '塔林',
    'attraction',
    '景點',
    ['必訪', '中世紀', '拍照景點'],
    '北歐唯一的哥德式市政廳',
    '建於 1404 年的市政廳，是北歐地區唯一保存完好的哥德式市政廳建築。高塔頂端的風向標「老托馬斯」是塔林的守護者象徵。',
    '夏季可以爬上 64 公尺高的塔樓，冬季關閉。但外觀已經非常壯觀！',
    'Raekoja plats 1，市政廳廣場',
    'https://www.google.com/maps/search/?api=1&query=Tallinn+Town+Hall'
  ),
  
  createCityPOI(
    'town-hall-square',
    'Town Hall Square',
    '市政廳廣場',
    '12月27日',
    9,
    'tallinn',
    '塔林',
    'attraction',
    '景點',
    ['必訪', '中世紀', '當地體驗'],
    '舊城的心臟',
    '塔林舊城最熱鬧的廣場，周圍環繞著色彩繽紛的商人住宅與餐廳。冬季時有聖誕市集，可以品嚐熱紅酒和愛沙尼亞傳統小吃。',
    '廣場中央有一口古老的水井，據說喝了會再回到塔林！',
    '舊城中心',
    'https://www.google.com/maps/search/?api=1&query=Town+Hall+Square+Tallinn'
  ),

  createCityPOI(
    'freedom-square',
    'Freedom Square',
    '自由廣場',
    '12月27日',
    9,
    'tallinn',
    '塔林',
    'attraction',
    '景點',
    ['當地體驗'],
    '現代塔林的象徵',
    '2009 年重新設計的廣場，紀念愛沙尼亞獨立戰爭勝利。中央的玻璃十字架「獨立十字」高 23.5 公尺，晚上會發光。',
    '廣場連接舊城和新城，是當地人聚會和活動的場所！',
    '舊城南側，Kaarli 大道旁',
    'https://www.google.com/maps/search/?api=1&query=Freedom+Square+Tallinn'
  ),

  createCityPOI(
    'st-olaf-church',
    "St. Olaf's Church",
    '聖奧拉夫教堂',
    '12月27日',
    9,
    'tallinn',
    '塔林',
    'attraction',
    '景點',
    ['必訪', '拍照景點'],
    '曾經的世界最高建築',
    '建於 12 世紀的教堂，尖塔高達 124 公尺，在 16 世紀時是世界最高的建築。可以爬上塔頂，俯瞰塔林全景與波羅的海。',
    '爬塔樓要走 258 級狹窄的螺旋階梯，需要一點體力！但景色絕對值得。',
    'Lai 50，舊城北側',
    'https://www.google.com/maps/search/?api=1&query=St+Olaf+Church+Tallinn'
  ),
  
  createCityPOI(
    'kohtuotsa-viewpoint',
    'Kohtuotsa Viewing Platform',
    'Kohtuotsa 觀景台',
    '12月27日',
    9,
    'tallinn',
    '塔林',
    'attraction',
    '景點',
    ['必訪', '拍照景點'],
    '最佳舊城全景',
    '從 Toompea 山丘上的觀景台，可以將紅瓦屋頂的舊城區盡收眼底。這裡是拍攝塔林明信片照的最佳地點。',
    '日落時分最美，金色陽光灑在紅色屋頂上！',
    'Kohtu 12',
    'https://www.google.com/maps/search/?api=1&query=Kohtuotsa+Viewing+Platform+Tallinn'
  ),

  createCityPOI(
    'maiasmokk-cafe',
    'Maiasmokk Café',
    'Maiasmokk 咖啡館',
    '12月27日',
    9,
    'tallinn',
    '塔林',
    'restaurant',
    '餐廳',
    ['當地體驗', '美食', '中世紀'],
    '愛沙尼亞最古老的咖啡館',
    '創立於 1864 年的歷史咖啡館，保留了 19 世紀的裝潢風格。以手工巧克力和傳統糕點聞名，還有現場製作杏仁糖的工作坊。',
    '招牌是杏仁糖 (Marzipan)，可以買造型可愛的杏仁糖小豬當伴手禮！',
    'Pikk 16，舊城內',
    'https://www.google.com/maps/search/?api=1&query=Maiasmokk+Café+Tallinn'
  ),
  
  createCityPOI(
    'olde-hansa',
    'Olde Hansa Restaurant',
    '老漢薩餐廳',
    '12月27日',
    9,
    'tallinn',
    '塔林',
    'restaurant',
    '餐廳',
    ['當地體驗', '中世紀', '美食'],
    '穿越時空的中世紀盛宴',
    '完全復刻 15 世紀漢薩同盟時期的主題餐廳。服務生穿著中世紀服裝，使用蠟燭照明，菜單包括野豬、鹿肉、蜂蜜啤酒等古老料理。',
    '預約時可以要求穿戴中世紀服裝用餐，非常特別的體驗！',
    'Vana turg 1，市政廳廣場旁',
    'https://www.google.com/maps/search/?api=1&query=Olde+Hansa+Restaurant+Tallinn'
  ),

  createCityPOI(
    'kompressor-pancakes',
    'Kompressor Pancake House',
    'Kompressor 巨型鬆餅店',
    '12月27日',
    9,
    'tallinn',
    '塔林',
    'restaurant',
    '餐廳',
    ['美食', '當地體驗'],
    '超大份量的愛沙尼亞鬆餅',
    '塔林最受歡迎的平價餐廳，以巨大的鹹甜鬆餅聞名。一份鬆餅幾乎有盤子那麼大，價格卻非常親民，常常需要排隊。',
    '推薦鹹味的起司火腿鬆餅，或甜味的蘋果肉桂！一人吃一份就很飽。',
    'Rataskaevu 3，舊城內',
    'https://www.google.com/maps/search/?api=1&query=Kompressor+Pancake+House+Tallinn'
  ),

  // ==============================
  // 波爾沃 Porvoo (Day 10)
  // ==============================
  
  createCityPOI(
    'porvoo-old-town',
    'Porvoo Old Town',
    '波爾沃舊城',
    '12月28日',
    10,
    'porvoo',
    '波爾沃',
    'attraction',
    '景點',
    ['必訪', '拍照景點', '當地體驗'],
    '芬蘭第二古老的城鎮',
    '芬蘭第二古老的城鎮，以河岸旁的紅色木造倉庫聞名。搭乘巴士前往，感受與赫爾辛基截然不同的古樸寧靜氛圍。',
    '紅色倉庫原本是用來儲存貨物，現在有些改建成咖啡館和藝廊！',
    '從赫爾辛基搭 Bus 848/848A，約 50 分鐘',
    'https://www.google.com/maps/search/?api=1&query=Porvoo+Old+Town'
  ),
  
  createCityPOI(
    'porvoo-cathedral',
    'Porvoo Cathedral',
    '波爾沃大教堂',
    '12月28日',
    10,
    'porvoo',
    '波爾沃',
    'attraction',
    '景點',
    ['必訪'],
    '芬蘭最古老的教堂之一',
    '建於 15 世紀的石造教堂，是芬蘭路德教會的重要歷史建築。教堂位於山丘上，可俯瞰整個小鎮與河景。',
    '1809 年俄國沙皇亞歷山大一世在此宣布芬蘭為自治大公國，歷史意義重大！',
    '舊城山丘頂',
    'https://www.google.com/maps/search/?api=1&query=Porvoo+Cathedral'
  ),

  createCityPOI(
    'nasin-kivi-viewpoint',
    'Näsin kivi Viewpoint',
    'Näsin kivi 觀景石',
    '12月28日',
    10,
    'porvoo',
    '波爾沃',
    'nature',
    '自然',
    ['拍照景點', '當地體驗'],
    '俯瞰紅色倉庫的最佳角度',
    '位於河岸山丘上的觀景點，可以拍到經典的紅色倉庫倒影照片。冬季雪景時更加夢幻，是攝影愛好者的必訪地點。',
    '建議沿著河岸步道慢慢走上來，沿途風景很美！',
    '老城區河岸步道',
    'https://www.google.com/maps/search/?api=1&query=Näsin+kivi+Viewpoint+Porvoo'
  ),

  createCityPOI(
    'porvoo-art-factory',
    'Taidetehdas (Art Factory)',
    '波爾沃藝術工廠',
    '12月28日',
    10,
    'porvoo',
    '波爾沃',
    'museum',
    '博物館',
    ['當地體驗', '拍照景點'],
    '工業遺址的藝術空間',
    '由舊工廠改建的藝廊與工作室，展示當地藝術家的作品，包括繪畫、陶藝、攝影等。建築本身保留了工業風格，很有特色。',
    '不定期有手工藝工作坊和市集活動，可以買到獨特的手作商品！',
    'Vanha Porvoonkatu 15',
    'https://www.google.com/maps/search/?api=1&query=Taidetehdas+Art+Factory+Porvoo'
  ),
  
  createCityPOI(
    'porvoo-market-hall',
    'Porvoo Old Market Hall',
    '波爾沃舊市場',
    '12月28日',
    10,
    'porvoo',
    '波爾沃',
    'shopping',
    '購物',
    ['當地體驗', '美食'],
    '傳統市集與手工藝品',
    '建於 1762 年的木造市場建築，販售當地手工藝品、有機食材、傳統糕點。非常適合尋找獨特的芬蘭紀念品。',
    '試試 Brunberg 巧克力，這個品牌創立於波爾沃，是當地的驕傲！',
    'Mannerheiminkatu 2',
    'https://www.google.com/maps/search/?api=1&query=Porvoo+Old+Market+Hall'
  ),

  createCityPOI(
    'hanna-maria-restaurant',
    'Restaurant Hanna Maria',
    'Hanna Maria 餐廳',
    '12月28日',
    10,
    'porvoo',
    '波爾沃',
    'restaurant',
    '餐廳',
    ['美食', '當地體驗'],
    '河岸邊的傳統芬蘭料理',
    '位於紅色倉庫區的餐廳，供應傳統芬蘭料理和當地食材。靠窗座位可以欣賞河景，氛圍溫馨舒適。',
    '推薦鮭魚湯和馴鹿肉，都是芬蘭經典菜色！',
    'Välikatu 3，紅色倉庫區',
    'https://www.google.com/maps/search/?api=1&query=Restaurant+Hanna+Maria+Porvoo'
  ),

  createCityPOI(
    'porvoon-paahtimo',
    'Porvoon Paahtimo',
    '波爾沃烘焙坊咖啡館',
    '12月28日',
    10,
    'porvoo',
    '波爾沃',
    'restaurant',
    '餐廳',
    ['美食', '當地體驗'],
    '自家烘焙的咖啡香',
    '小鎮上深受當地人喜愛的咖啡館，自家烘焙咖啡豆，提供新鮮糕點和三明治。溫暖的木質裝潢讓人想多待一會兒。',
    '肉桂捲和卡布奇諾是絕配！冬天來一杯熱咖啡最舒服。',
    'Mannerheiminkatu 2，舊市場旁',
    'https://www.google.com/maps/search/?api=1&query=Porvoon+Paahtimo+Porvoo'
  ),
  
  createCityPOI(
    'runeberg-home',
    "Runeberg's Home Museum",
    '倫貝格故居博物館',
    '12月28日',
    10,
    'porvoo',
    '波爾沃',
    'museum',
    '博物館',
    ['當地體驗'],
    '芬蘭國民詩人的家',
    '芬蘭國歌作詞者 Johan Ludvig Runeberg 的故居，完整保存 19 世紀的家具與生活用品。花園在夏季時非常美麗。',
    '每年 2/5 是芬蘭的「倫貝格日」，會吃特製的杏仁塔 (Runeberg Cake)！',
    'Aleksanterinkatu 3',
    'https://www.google.com/maps/search/?api=1&query=Runeberg+Home+Museum+Porvoo'
  ),

  // ==============================
  // 芬蘭堡 Suomenlinna (Day 12)
  // ==============================
  
  createCityPOI(
    'suomenlinna-fortress',
    'Suomenlinna Sea Fortress',
    '芬蘭堡海上堡壘',
    '12月30日',
    12,
    'suomenlinna',
    '芬蘭堡',
    'attraction',
    '景點',
    ['必訪', '世界遺產', '拍照景點', '海港'],
    'UNESCO 世界遺產',
    '建於 18 世紀的海上軍事堡壘，分布在六座島嶼上。冬季遊客較少，可以靜靜漫步在古老的城牆與砲台之間，感受歷史的厚重感。',
    '搭乘渡輪只需 15 分鐘，但島上很大，建議預留 3-4 小時探索！',
    '從 Market Square 搭渡輪，全年營運',
    'https://www.google.com/maps/search/?api=1&query=Suomenlinna+Sea+Fortress'
  ),
  
  createCityPOI(
    'suomenlinna-museum',
    'Suomenlinna Museum',
    '芬蘭堡博物館',
    '12月30日',
    12,
    'suomenlinna',
    '芬蘭堡',
    'museum',
    '博物館',
    ['世界遺產'],
    '了解堡壘的歷史',
    '介紹芬蘭堡從瑞典、俄國到芬蘭三個時期的歷史變遷。有多媒體展示與古老的軍事文物。',
    '博物館門票包含在 Helsinki Card 內！',
    '島上主要廣場旁',
    'https://www.google.com/maps/search/?api=1&query=Suomenlinna+Museum'
  ),
  
  createCityPOI(
    'suomenlinna-church',
    'Suomenlinna Church',
    '芬蘭堡教堂',
    '12月30日',
    12,
    'suomenlinna',
    '芬蘭堡',
    'attraction',
    '景點',
    ['拍照景點'],
    '雙重功能的燈塔教堂',
    '這座教堂同時也是航海燈塔，獨特的雙重身份在世界上極為罕見。淺綠色的圓頂在海天之間特別醒目。',
    '教堂在夏季時會舉辦音樂會，冬季則較少開放。',
    '島上中央位置',
    'https://www.google.com/maps/search/?api=1&query=Suomenlinna+Church'
  ),
  
  createCityPOI(
    'suomenlinna-cafe',
    'Café Chapman & Café Vanille',
    '島上咖啡館',
    '12月30日',
    12,
    'suomenlinna',
    '芬蘭堡',
    'restaurant',
    '餐廳',
    ['當地體驗', '美食'],
    '海風中的暖身咖啡',
    '島上有幾家溫馨的咖啡館，提供芬蘭傳統糕點與熱飲。冬季在戶外散步後，來杯熱可可特別治癒。',
    'Café Vanille 的肉桂捲 (Korvapuusti) 超級好吃！',
    '島上多處',
    'https://www.google.com/maps/search/?api=1&query=Café+Vanille+Suomenlinna'
  ),

  // ==============================
  // Helsinki - Löyly Sauna (Day 12)
  // ==============================
  
  createCityPOI(
    'loyly-sauna',
    'Löyly Helsinki',
    'Löyly 桑拿會館',
    '12月30日',
    12,
    'helsinki',
    '赫爾辛基',
    'attraction',
    '景點',
    ['必訪', '當地體驗', '設計朝聖'],
    '建築與桑拿的完美結合',
    '獲獎無數的現代桑拿建築，由 Avanto Architects 設計。提供傳統芬蘭桑拿和海水冰池體驗，冬季可以體驗冰火兩重天的刺激感受。',
    '建議預約！桑拿後直接跳進波羅的海是芬蘭人最愛的冬季活動。餐廳的北歐料理也很棒！',
    'Hernesaarenranta 4，電車 6/9 號',
    'https://www.google.com/maps/search/?api=1&query=Löyly+Helsinki'
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