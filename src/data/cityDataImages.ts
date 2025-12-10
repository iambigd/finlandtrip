// 城市景點圖片對應表
export const cityImages: Record<string, string> = {
  // ==============================
  // 赫爾辛基 Helsinki
  // ==============================
  'helsinki-central-station':
    'https://images.unsplash.com/photo-1661634315115-81cec43eaaca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxzaW5raSUyMGNlbnRyYWwlMjBzdGF0aW9ufGVufDF8fHx8MTc2NTM0NTg0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'helsinki-cathedral':
    'https://images.unsplash.com/photo-1651608979499-94f24adacdb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxzaW5raSUyMGNhdGhlZHJhbCUyMHdpbnRlcnxlbnwxfHx8fDE3NjUzNDU4NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'esplanadi-park':
    'https://images.unsplash.com/photo-1643277410646-be9b79ffc213?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxzaW5raSUyMHBhcmslMjB3aW50ZXJ8ZW58MXx8fHwxNzY1MzQ1ODU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'market-square':
    'https://images.unsplash.com/photo-1681644297416-0706bc4c22c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxzaW5raSUyMG1hcmtldCUyMHNxdWFyZXxlbnwxfHx8fDE3NjUzNDU4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'design-museum':
    'https://images.unsplash.com/photo-1576612738875-900b57c55228?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBtdXNldW0lMjBoZWxzaW5raXxlbnwxfHx8fDE3NjUzNDU4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'ateneum':
    'https://images.unsplash.com/photo-1662826940305-65d89b1e8e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGVuZXVtJTIwbXVzZXVtJTIwaGVsc2lua2l8ZW58MXx8fHwxNzY1MzQ1ODQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'stockmann':
    'https://images.unsplash.com/photo-1651253551020-741d9bf17a37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9ja21hbm4lMjBoZWxzaW5raSUyMGRlcGFydG1lbnR8ZW58MXx8fHwxNzY1MzQ1ODQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'kiasma':
    'https://images.unsplash.com/photo-1550604395-fbb3975ef584?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWFzbWElMjBtdXNldW0lMjBoZWxzaW5raXxlbnwxfHx8fDE3NjUzNDU4NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'kamppi-chapel':
    'https://images.unsplash.com/photo-1672433107010-2035590eea32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYW1wcGklMjBjaGFwZWwlMjBzaWxlbmNlfGVufDF8fHx8MTc2NTM0NTg0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'temppeliaukio-church':
    'https://images.unsplash.com/photo-1713149019799-477ac308920f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZW1wcGVsaWF1a2lvJTIwY2h1cmNoJTIwaGVsc2lua2l8ZW58MXx8fHwxNzY1MzQ1ODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'sibelius-monument':
    'https://images.unsplash.com/photo-1643277410646-be9b79ffc213?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWJlbGl1cyUyMG1vbnVtZW50JTIwaGVsc2lua2l8ZW58MXx8fHwxNzY1MzQ1ODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'airport-design-shop':
    'https://images.unsplash.com/photo-1689580775266-c2e5c1efb77d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxzaW5raSUyMGFpcnBvcnQlMjBkZXNpZ258ZW58MXx8fHwxNzY1MzQ1ODQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',

  // ==============================
  // 塔林 Tallinn
  // ==============================
  'tallinn-old-town':
    'https://images.unsplash.com/photo-1551086054-1bc97d3466ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWxsaW5uJTIwb2xkJTIwdG93bnxlbnwxfHx8fDE3NjUzNDU4NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'alexander-nevsky-cathedral':
    'https://images.unsplash.com/photo-1694424029868-23c493852e68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbGV4YW5kZXIlMjBuZXZza3klMjBjYXRoZWRyYWwlMjB0YWxsaW5ufGVufDF8fHx8MTc2NTM0NTg1MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'toompea-castle':
    'https://images.unsplash.com/photo-1564951537954-29dd59397b90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb2h0dW90c2ElMjB2aWV3cG9pbnQlMjB0YWxsaW5ufGVufDF8fHx8MTc2NTM0NTg1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'town-hall-square':
    'https://images.unsplash.com/photo-1731139892979-6016ef80c69d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWxsaW5uJTIwdG93biUyMGhhbGwlMjBzcXVhcmV8ZW58MXx8fHwxNzY1MzQ1ODUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'st-olaf-church':
    'https://images.unsplash.com/photo-1666812520813-5f149c5edb70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdCUyMG9sYWYlMjBjaHVyY2glMjB0YWxsaW5ufGVufDF8fHx8MTc2NTM0NTg1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'kohtuotsa-viewpoint':
    'https://images.unsplash.com/photo-1564951537954-29dd59397b90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrb2h0dW90c2ElMjB2aWV3cG9pbnQlMjB0YWxsaW5ufGVufDF8fHx8MTc2NTM0NTg1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'olde-hansa':
    'https://images.unsplash.com/photo-1626775430246-fc836679db54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpZXZhbCUyMHJlc3RhdXJhbnQlMjB0YWxsaW5ufGVufDF8fHx8MTc2NTM0NTg1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',

  // ==============================
  // 波爾沃 Porvoo
  // ==============================
  'porvoo-old-town':
    'https://images.unsplash.com/photo-1732639559262-71c52da44ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J2b28lMjBvbGQlMjB0b3dufGVufDF8fHx8MTc2NTM0NTg1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'porvoo-cathedral':
    'https://images.unsplash.com/photo-1700752615567-11164263b8e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J2b28lMjBjYXRoZWRyYWwlMjBmaW5sYW5kfGVufDF8fHx8MTc2NTM0NTg1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'porvoo-market-hall':
    'https://images.unsplash.com/photo-1696691907658-be7db3beae7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J2b28lMjBtYXJrZXQlMjBoYWxsfGVufDF8fHx8MTc2NTM0NTg1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'runeberg-home':
    'https://images.unsplash.com/photo-1753864719768-f4337c367d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5lYmVyZyUyMGhvbWUlMjBwb3J2b298ZW58MXx8fHwxNzY1MzQ1ODU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',

  // ==============================
  // 芬蘭堡 Suomenlinna
  // ==============================
  'suomenlinna-fortress':
    'https://images.unsplash.com/photo-1706533893969-e9a8e52fb70a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW9tZW5saW5uYSUyMGZvcnRyZXNzJTIwd2ludGVyfGVufDF8fHx8MTc2NTM0NTg1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'suomenlinna-museum':
    'https://images.unsplash.com/photo-1662826940305-65d89b1e8e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW9tZW5saW5uYSUyMG11c2V1bSUyMGhlbHNpbmtpfGVufDF8fHx8MTc2NTM0NTg1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'suomenlinna-church':
    'https://images.unsplash.com/photo-1556021090-971fa4556481?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW9tZW5saW5uYSUyMGNodXJjaCUyMGxpZ2h0aG91c2V8ZW58MXx8fHwxNzY1MzQ1ODU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'suomenlinna-cafe':
    'https://images.unsplash.com/photo-1570785908636-623f8835c680?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5uaXNoJTIwY2FmZSUyMGludGVyaW9yfGVufDF8fHx8MTc2NTM0NTg1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
};
