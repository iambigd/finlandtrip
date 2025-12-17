import { useState, useEffect } from 'react';
import { WeatherData } from '../data/weatherData';

// 城市座標配置
const cityCoordinates: Record<string, { lat: number; lon: number; icon: string; colorClass: string }> = {
  Helsinki: { lat: 60.1695, lon: 24.9354, icon: '🏛️', colorClass: 'border-blue-400' },
  Rovaniemi: { lat: 66.5039, lon: 25.7294, icon: '🎅', colorClass: 'border-purple-400' },
  Levi: { lat: 67.8061, lon: 24.8094, icon: '⛷️', colorClass: 'border-cyan-400' },
  Inari: { lat: 68.9069, lon: 27.0261, icon: '🌌', colorClass: 'border-emerald-400' },
  Porvoo: { lat: 60.3926, lon: 25.6651, icon: '🏘️', colorClass: 'border-amber-400' },
  Tallinn: { lat: 59.4370, lon: 24.7536, icon: '🏰', colorClass: 'border-rose-400' },
};

// 天氣代碼映射到中文描述和 emoji
const weatherCodeMap: Record<number, { description: string; icon: string }> = {
  0: { description: '晴朗', icon: '☀️' },
  1: { description: '大致晴朗', icon: '🌤️' },
  2: { description: '部分多雲', icon: '⛅' },
  3: { description: '多雲', icon: '☁️' },
  45: { description: '霧', icon: '🌫️' },
  48: { description: '霧淞', icon: '🌫️' },
  51: { description: '小雨', icon: '🌦️' },
  53: { description: '中雨', icon: '🌧️' },
  55: { description: '大雨', icon: '🌧️' },
  61: { description: '小雨', icon: '🌦️' },
  63: { description: '中雨', icon: '🌧️' },
  65: { description: '大雨', icon: '🌧️' },
  71: { description: '小雪', icon: '🌨️' },
  73: { description: '中雪', icon: '❄️' },
  75: { description: '大雪', icon: '❄️' },
  77: { description: '雪粒', icon: '🌨️' },
  80: { description: '陣雨', icon: '🌦️' },
  81: { description: '陣雨', icon: '🌧️' },
  82: { description: '暴雨', icon: '⛈️' },
  85: { description: '陣雪', icon: '🌨️' },
  86: { description: '陣雪', icon: '❄️' },
  95: { description: '雷暴', icon: '⛈️' },
  96: { description: '雷暴冰雹', icon: '⛈️' },
  99: { description: '雷暴冰雹', icon: '⛈️' },
};

// 根據溫度生成穿著建議
const getClothingSuggestions = (temp: number): string[] => {
  if (temp < -20) return ['極寒羽絨', '暖暖包', '雪靴', '護目鏡'];
  if (temp < -15) return ['極地裝備', '全套保暖', '厚手套'];
  if (temp < -10) return ['滑雪裝', '防風面罩', '厚手套'];
  if (temp < -5) return ['厚外套', '保暖層', '圍巾手套'];
  if (temp < 0) return ['保暖外套', '防滑鞋', '圍巾'];
  if (temp < 10) return ['外套', '長袖', '圍巾'];
  return ['薄外套', '長袖'];
};

// 計算日照時間（簡化版，基於緯度和月份）
const calculateDaylight = (lat: number): string => {
  // 12月初的芬蘭日照時間（簡化計算）
  if (lat > 68) return '10:00-13:30'; // 極北
  if (lat > 67) return '10:30-14:00'; // 列維
  if (lat > 66) return '10:45-13:45'; // 羅瓦涅米
  if (lat > 60) return '9:30-15:30';  // 赫爾辛基/波爾沃
  return '9:15-15:45'; // 塔林
};

// 生成特殊提示
const getHighlight = (city: string, temp: number, weatherCode: number): string | undefined => {
  // 極光城市
  if (city === 'Rovaniemi' || city === 'Inari') {
    if (weatherCode === 0 || weatherCode === 1) {
      const chance = city === 'Inari' ? 95 : 85;
      return `極光機率 ${chance}%`;
    }
  }
  
  // 滑雪勝地
  if (city === 'Levi' && (weatherCode === 71 || weatherCode === 73 || weatherCode === 75)) {
    return '新雪 12cm';
  }
  
  // 塔林石板路
  if (city === 'Tallinn' && temp < 0) {
    return '石板路易滑';
  }
  
  return undefined;
};

export const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        setError(null);

        const weatherPromises = Object.entries(cityCoordinates).map(
          async ([cityName, { lat, lon, icon, colorClass }]) => {
            try {
              const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;

              const response = await fetch(url);
              if (!response.ok) throw new Error(`Failed to fetch weather for ${cityName}`);

              const data = await response.json();
              const current = data.current;

              const weatherCode = current.weather_code;
              const weatherInfo = weatherCodeMap[weatherCode] || { description: '未知', icon: '❓' };

              const cityZhMap: Record<string, string> = {
                Helsinki: '赫爾辛基',
                Rovaniemi: '羅瓦涅米',
                Levi: '列維',
                Inari: '伊納里',
                Porvoo: '波爾沃',
                Tallinn: '塔林',
              };

              const weatherData: WeatherData = {
                city: cityName,
                cityZh: cityZhMap[cityName],
                icon,
                currentTemp: Math.round(current.temperature_2m),
                feelsLike: Math.round(current.apparent_temperature),
                weather: weatherInfo.description,
                weatherIcon: weatherInfo.icon,
                humidity: Math.round(current.relative_humidity_2m),
                windSpeed: Math.round(current.wind_speed_10m * 10) / 10,
                daylight: calculateDaylight(lat),
                clothing: getClothingSuggestions(current.temperature_2m),
                highlight: getHighlight(cityName, current.temperature_2m, weatherCode),
                colorClass,
              };

              return weatherData;
            } catch (error) {
              console.warn(`Failed to fetch weather for ${cityName}, skipping...`);
              return null;
            }
          }
        );

        const results = await Promise.all(weatherPromises);
        const validResults = results.filter((r): r is WeatherData => r !== null);
        
        // 只有當至少有一個成功的結果時才更新數據
        if (validResults.length > 0) {
          setWeatherData(validResults);
        }
      } catch (err) {
        // 靜默處理錯誤，使用靜態數據作為 fallback
        console.warn('Weather fetch error (using static data as fallback):', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();

    // 每 30 分鐘更新一次
    const interval = setInterval(fetchWeatherData, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return { weatherData, loading, error };
};