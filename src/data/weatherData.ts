// 天气数据接口
export interface WeatherData {
  city: string;
  cityZh: string;
  icon: string;
  
  // 即时数据
  currentTemp: number;       // 当前温度 °C
  feelsLike: number;         // 体感温度 °C
  weather: string;           // 天气状况（中文）
  weatherIcon: string;       // emoji
  humidity: number;          // 湿度 %
  windSpeed: number;         // 风速 m/s
  
  // 额外信息
  daylight: string;          // 日照时间
  clothing: string[];        // 穿着建议（多项）
  highlight?: string;        // 特殊提示（如极光机率）
  
  // UI
  colorClass: string;        // 边框/强调色
}

// 6 个城市的即时天气数据
export const weatherData: WeatherData[] = [
  // Helsinki - 赫尔辛基
  {
    city: 'Helsinki',
    cityZh: '赫爾辛基',
    icon: '🏛️',
    currentTemp: -3,
    feelsLike: -8,
    weather: '多雲',
    weatherIcon: '☁️',
    humidity: 78,
    windSpeed: 4.2,
    daylight: '9:30-15:30',
    clothing: ['厚外套', '保暖層', '圍巾手套'],
    colorClass: 'border-blue-400',
  },

  // Rovaniemi - 羅瓦涅米（北極圈）
  {
    city: 'Rovaniemi',
    cityZh: '羅瓦涅米',
    icon: '🎅',
    currentTemp: -15,
    feelsLike: -23,
    weather: '晴朗',
    weatherIcon: '☀️',
    humidity: 85,
    windSpeed: 2.8,
    daylight: '10:45-13:45',
    clothing: ['極寒羽絨', '暖暖包', '雪靴'],
    highlight: '極光機率 85%',
    colorClass: 'border-purple-400',
  },

  // Levi - 列維（滑雪勝地）
  {
    city: 'Levi',
    cityZh: '列維',
    icon: '⛷️',
    currentTemp: -18,
    feelsLike: -26,
    weather: '小雪',
    weatherIcon: '🌨️',
    humidity: 88,
    windSpeed: 3.5,
    daylight: '10:30-14:00',
    clothing: ['滑雪裝', '防風面罩', '厚手套'],
    highlight: '新雪 12cm',
    colorClass: 'border-cyan-400',
  },

  // Inari - 伊納里（極光勝地）
  {
    city: 'Inari',
    cityZh: '伊納里',
    icon: '🌌',
    currentTemp: -22,
    feelsLike: -30,
    weather: '晴朗',
    weatherIcon: '✨',
    humidity: 82,
    windSpeed: 1.5,
    daylight: '10:00-13:30',
    clothing: ['極地裝備', '全套保暖', '護目鏡'],
    highlight: '極光機率 95%',
    colorClass: 'border-emerald-400',
  },

  // Porvoo - 波爾沃
  {
    city: 'Porvoo',
    cityZh: '波爾沃',
    icon: '🏘️',
    currentTemp: -2,
    feelsLike: -6,
    weather: '陰天',
    weatherIcon: '☁️',
    humidity: 75,
    windSpeed: 3.8,
    daylight: '9:35-15:25',
    clothing: ['保暖外套', '防滑鞋', '圍巾'],
    colorClass: 'border-amber-400',
  },

  // Tallinn - 塔林
  {
    city: 'Tallinn',
    cityZh: '塔林',
    icon: '🏰',
    currentTemp: -1,
    feelsLike: -5,
    weather: '多雲',
    weatherIcon: '☁️',
    humidity: 72,
    windSpeed: 4.5,
    daylight: '9:15-15:45',
    clothing: ['厚外套', '防滑鞋', '保暖配件'],
    highlight: '石板路易滑',
    colorClass: 'border-rose-400',
  },
];

// 根据城市名获取天气数据
export const getWeatherByCity = (cityName: string): WeatherData | undefined => {
  return weatherData.find(w => w.city.toLowerCase() === cityName.toLowerCase() || w.cityZh === cityName);
};
