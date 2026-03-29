export interface GuidePlace {
  id: string;
  name: string;
  category: string;
  area: string;
  lat: number;
  lng: number;
  tip?: string;
  url?: string;
}

export const guideCategories = [
  { id: 'sightseeing', label: 'Sightseeing',      icon: 'photo_camera',     color: '#006479' },
  { id: 'shopping',    label: 'Shopping',          icon: 'shopping_bag',     color: '#964300' },
  { id: 'gay-bars',    label: 'Gay Bars',          icon: 'local_bar',        color: '#b4005d' },
  { id: 'gay-clubs',   label: 'Gay Clubs',         icon: 'nightlife',        color: '#7c3aed' },
  { id: 'hotels',      label: 'Hotels',            icon: 'hotel',            color: '#0369a1' },
  { id: 'food',        label: 'Food',              icon: 'restaurant',       color: '#15803d' },
  { id: 'massage',     label: 'Male Massage',      icon: 'self_improvement', color: '#0891b2' },
  { id: 'shows',       label: 'Boy Shows',         icon: 'theater_comedy',   color: '#be185d' },
  { id: 'saunas',      label: 'Saunas',            icon: 'hot_tub',          color: '#b45309' },
  { id: 'useful',      label: 'Useful',            icon: 'storefront',       color: '#4b5563' },
];

export const guidePlaces: GuidePlace[] = [
  // ── Sightseeing ──────────────────────────────────────────────────────────
  { id: 'grand-palace',       name: 'Grand Palace',             category: 'sightseeing', area: 'Old City',    lat: 13.7500, lng: 100.4913, tip: 'Cover shoulders & knees. Go early (8am) to beat crowds.' },
  { id: 'emerald-buddha',     name: 'Emerald Buddha',           category: 'sightseeing', area: 'Old City',    lat: 13.7512, lng: 100.4928, tip: 'Inside Wat Phra Kaew, included in Grand Palace ticket.' },
  { id: 'reclining-buddha',   name: 'Reclining Buddha',        category: 'sightseeing', area: 'Old City',    lat: 13.7466, lng: 100.4930, tip: 'Wat Pho. One of the largest reclining Buddhas in the world.' },
  { id: 'khaosan-road',       name: 'Khaosan Road',             category: 'sightseeing', area: 'Banglamphu', lat: 13.7589, lng: 100.4977, tip: 'Best at night. Wild street food, bars, and backpacker energy.' },
  { id: 'bkk-museum',         name: 'Bangkok Museum',           category: 'sightseeing', area: 'Old City',    lat: 13.7486, lng: 100.4951 },
  { id: 'chinatown-entrance', name: 'Entrance to Chinatown',   category: 'sightseeing', area: 'Chinatown',   lat: 13.7399, lng: 100.5097, tip: 'Yaowarat Road. Best in the evening for street food.' },
  { id: 'talat-noi',          name: 'Talat Noi',                category: 'sightseeing', area: 'Riverside',   lat: 13.7338, lng: 100.5099, tip: 'Hidden riverside neighbourhood. Great street art and cafés.' },
  { id: 'wat-arun',           name: 'Wat Arun',                 category: 'sightseeing', area: 'Riverside',   lat: 13.7439, lng: 100.4888, tip: 'Best seen from the other side of the river at sunset.' },
  { id: 'wat-khaek',          name: 'Wat Khaek',                category: 'sightseeing', area: 'Silom',       lat: 13.7281, lng: 100.5218, tip: 'Sri Maha Mariamman Temple. Colourful Hindu temple.' },
  { id: 'big-buddha-temple',  name: 'Big Buddha Temple',        category: 'sightseeing', area: 'Bang Na',     lat: 13.6741, lng: 100.6048, tip: 'Wat Yannawa. Giant Buddha in south Bangkok.' },
  { id: 'hualamphong',        name: 'Hualamphong Temple',      category: 'sightseeing', area: 'Chinatown',   lat: 13.7395, lng: 100.5165 },
  { id: 'lumphini-park',      name: 'Lumphini Park',            category: 'sightseeing', area: 'Silom',       lat: 13.7291, lng: 100.5418, tip: 'Great early morning for Thai exercise culture. Monitor lizards live here.' },
  { id: 'king-power',         name: 'King Power Mahanakhon',   category: 'sightseeing', area: 'Silom',       lat: 13.7225, lng: 100.5284, tip: 'Glass floor observation deck. Book online.' },
  { id: 'banyan-tree',        name: 'Banyan Tree',              category: 'sightseeing', area: 'Silom',       lat: 13.7226, lng: 100.5309, tip: 'Vertigo rooftop bar. Spectacular views.' },
  { id: 'lebua-skybar',       name: 'Lebua Skybar',             category: 'sightseeing', area: 'Riverside',   lat: 13.7221, lng: 100.5199, tip: 'Famous from The Hangover 2. Smart dress required.' },
  { id: 'erawan-museum',      name: 'Erawan Museum/Temple',    category: 'sightseeing', area: 'Samut Prakan',lat: 13.6661, lng: 100.5948 },
  { id: 'victory-monument',   name: 'Victory Monument',         category: 'sightseeing', area: 'Ratchathewi', lat: 13.7643, lng: 100.5375, tip: 'BTS Victory Monument. Great street food stalls around.' },
  { id: 'soi-cowboy',         name: 'Soi Cowboy',               category: 'sightseeing', area: 'Sukhumvit',   lat: 13.7396, lng: 100.5596, tip: 'Iconic red-light street. Walk through even if not your scene.' },
  { id: 'asiatique',          name: 'Asiatique',                category: 'sightseeing', area: 'Riverside',   lat: 13.7185, lng: 100.5000, tip: 'Night market on the Chao Phraya. Take the free shuttle boat from Saphan Taksin BTS.' },
  { id: 'nai-lert-park',      name: 'Nai Lert Park',            category: 'sightseeing', area: 'Ploenchit',   lat: 13.7447, lng: 100.5467 },
  { id: 'erawan-shrine',      name: 'Erawan Shrine',            category: 'sightseeing', area: 'Ratchaprasong',lat: 13.7447, lng: 100.5401, tip: 'Famous four-faced Buddha at BTS Chit Lom. Make a wish.' },

  // ── Shopping ─────────────────────────────────────────────────────────────
  { id: 'mbk',                name: 'MBK Center',               category: 'shopping',    area: 'Siam',        lat: 13.7448, lng: 100.5296, tip: 'Electronics, fashion, food court. Go early for the best stalls.' },
  { id: 'siam-centre',        name: 'Siam Centre + Discovery',  category: 'shopping',    area: 'Siam',        lat: 13.7462, lng: 100.5331, tip: 'Trendy Thai fashion brands. Good for unique gifts.' },
  { id: 'siam-paragon',       name: 'Siam Paragon',             category: 'shopping',    area: 'Siam',        lat: 13.7457, lng: 100.5345, tip: 'Luxury brands, cinema, aquarium, food hall.' },
  { id: 'siam-one',           name: 'Siam Square One',          category: 'shopping',    area: 'Siam',        lat: 13.7455, lng: 100.5319 },
  { id: 'siam-alleys',        name: 'Siam Square Alleys',       category: 'shopping',    area: 'Siam',        lat: 13.7453, lng: 100.5308, tip: 'Outdoor alleys with indie Thai brands and street food.' },
  { id: 'centralworld',       name: 'CentralWorld',             category: 'shopping',    area: 'Ratchaprasong',lat: 13.7466, lng: 100.5392, tip: 'One of the largest malls in Southeast Asia.' },
  { id: 'gaysorn',            name: 'Gaysorn Village',          category: 'shopping',    area: 'Ploenchit',   lat: 13.7452, lng: 100.5408, tip: 'High-end luxury mall. Also has good lunch spots.' },
  { id: 'platinum',           name: 'Platinum Fashion Mall',   category: 'shopping',    area: 'Pratunam',    lat: 13.7518, lng: 100.5375, tip: 'Wholesale fashion heaven. Prices are per piece, buy multiples.' },
  { id: 'pratunam',           name: 'Pratunam Market',          category: 'shopping',    area: 'Pratunam',    lat: 13.7528, lng: 100.5364, tip: 'Outdoor market for cheap clothes and accessories.' },
  { id: 'terminal21',         name: 'Terminal 21',              category: 'shopping',    area: 'Asok',        lat: 13.7378, lng: 100.5606, tip: 'Airport-themed mall. Each floor is a different city. Great food court.' },
  { id: 'emquartier',         name: 'EmQuartier & Emporium',   category: 'shopping',    area: 'Phrom Phong', lat: 13.7306, lng: 100.5697, tip: 'Upscale twin malls. Amazing restaurant selection.' },
  { id: 'emsphere',           name: 'EmSphere',                 category: 'shopping',    area: 'Phrom Phong', lat: 13.7270, lng: 100.5697, tip: 'Newest EM District mall. GCircuit venue during Songkran.' },
  { id: 'iconsiam',           name: 'ICONSIAM',                 category: 'shopping',    area: 'Riverside',   lat: 13.7223, lng: 100.5094, tip: 'Stunning riverside mall. Take the ferry from Saphan Taksin.' },
  { id: 'lalai-sap',          name: 'Lalai Sap Market',         category: 'shopping',    area: 'Silom',       lat: 13.7261, lng: 100.5279, tip: 'Daily market near Silom. Cheap lunch and street snacks.' },
  { id: 'silom-complex',      name: 'Silom Complex',            category: 'shopping',    area: 'Silom',       lat: 13.7265, lng: 100.5291, tip: 'Has a good supermarket and food court in the basement.' },
  { id: 'silom-edge',         name: 'Silom Edge',               category: 'shopping',    area: 'Silom',       lat: 13.7252, lng: 100.5280 },
  { id: 'chatuchak',          name: 'Chatuchak Market',         category: 'shopping',    area: 'Chatuchak',   lat: 13.7999, lng: 100.5500, tip: 'Weekends only. 15,000 stalls. Arrive early, bring cash, wear comfy shoes.' },
  { id: 'warehouse30',        name: 'Warehouse 30',             category: 'shopping',    area: 'Riverside',   lat: 13.7282, lng: 100.5119, tip: 'Indie creative market in old warehouses near Charoen Krung.' },
  { id: 'narry-tailor',       name: 'Narry Tailor',             category: 'shopping',    area: 'Silom',       lat: 13.7262, lng: 100.5265, tip: 'Reliable custom tailor. Good for suits and shirts.' },
  { id: 'jim-thompson',       name: 'Jim Thompson House',       category: 'shopping',    area: 'Siam',        lat: 13.7476, lng: 100.5283, tip: 'Thai silk and beautiful heritage house museum.' },

  // ── Gay Bars ─────────────────────────────────────────────────────────────
  { id: 'sala-daeng',         name: 'Sala Daeng BTS',           category: 'gay-bars',    area: 'Silom',       lat: 13.7272, lng: 100.5331, tip: 'The hub. Sala Daeng BTS exit 1 — all bars within 200m.' },
  { id: 'silom-soi4',         name: 'Silom Soi 4',              category: 'gay-bars',    area: 'Silom',       lat: 13.7263, lng: 100.5306, tip: 'Main gay street. Bars open from around 6pm, packed by 10pm.' },
  { id: 'silver-sands',       name: 'Silver Sands',             category: 'gay-bars',    area: 'Silom',       lat: 13.7265, lng: 100.5295 },
  { id: 'sunrise-tacos',      name: 'Sunrise Tacos',            category: 'gay-bars',    area: 'Silom',       lat: 13.7261, lng: 100.5303, tip: 'Popular meeting spot before clubbing. Good food too.' },
  { id: 'gs-bar',             name: "G's Bar",                  category: 'gay-bars',    area: 'Silom',       lat: 13.7268, lng: 100.5308 },
  { id: 'adam-massage',       name: 'Adam Massage',             category: 'gay-bars',    area: 'Silom',       lat: 13.7264, lng: 100.5298 },
  { id: 'pride-bar',          name: 'Pride Bar',                category: 'gay-bars',    area: 'Silom',       lat: 13.7262, lng: 100.5300 },
  { id: 'balcony',            name: 'Balcony',                  category: 'gay-bars',    area: 'Silom',       lat: 13.7261, lng: 100.5304, tip: 'Classic open-air bar on Soi 4. Good for people watching.' },
  { id: 'circus',             name: 'Circus',                   category: 'gay-bars',    area: 'Silom',       lat: 13.7263, lng: 100.5307 },
  { id: '4-sports-bar',       name: '4 Sports Bar',             category: 'gay-bars',    area: 'Silom',       lat: 13.7260, lng: 100.5301 },
  { id: 'baz-bar',            name: 'Baz Living Room Bar',      category: 'gay-bars',    area: 'Silom',       lat: 13.7264, lng: 100.5306 },
  { id: 'stranger-bar',       name: 'Stranger Bar',             category: 'gay-bars',    area: 'Silom',       lat: 13.7266, lng: 100.5309 },
  { id: 'white-rabbit',       name: 'White Rabbit',             category: 'gay-bars',    area: 'Silom',       lat: 13.7267, lng: 100.5310 },
  { id: 'connections',        name: 'Connections',              category: 'gay-bars',    area: 'Silom',       lat: 13.7265, lng: 100.5312 },

  // ── Gay Clubs ────────────────────────────────────────────────────────────
  { id: 'dj-station',         name: 'DJ Station',               category: 'gay-clubs',   area: 'Silom',       lat: 13.7259, lng: 100.5296, tip: 'Bangkok\'s most famous gay club. Drag shows 11pm & 1am. Cover ฿200–350.' },
  { id: 'beef',               name: 'BEEF',                     category: 'gay-clubs',   area: 'Silom',       lat: 13.7258, lng: 100.5293, tip: 'Bear-friendly club on Soi 2.' },
  { id: 'god-club',           name: 'GOD',                      category: 'gay-clubs',   area: 'Silom',       lat: 13.7257, lng: 100.5291, tip: 'Good Ol Days. Mixed crowd, fun atmosphere.' },
  { id: 'backdoor-bkk',       name: 'Backdoor BKK',             category: 'gay-clubs',   area: 'Silom',       lat: 13.7256, lng: 100.5289 },
  { id: 'house-of-heals',     name: 'House of HEALS',           category: 'gay-clubs',   area: 'Silom',       lat: 13.7255, lng: 100.5287 },

  // ── Hotels ───────────────────────────────────────────────────────────────
  { id: 'pula-hotel',         name: 'Pula Hotel',               category: 'hotels',      area: 'Silom',       lat: 13.7272, lng: 100.5318, tip: 'Gay-friendly boutique hotel, steps from the action.' },
  { id: 'silom-one',          name: 'SILOM:ONE',                category: 'hotels',      area: 'Silom',       lat: 13.7268, lng: 100.5315 },
  { id: 'silom-space',        name: 'Silom Space',              category: 'hotels',      area: 'Silom',       lat: 13.7270, lng: 100.5316 },
  { id: 'bally-suites',       name: 'Bally Suites',             category: 'hotels',      area: 'Silom',       lat: 13.7273, lng: 100.5319 },
  { id: 'golden-house',       name: 'Golden House',             category: 'hotels',      area: 'Silom',       lat: 13.7271, lng: 100.5314 },
  { id: 'togayther',          name: 'Togayther',                category: 'hotels',      area: 'Silom',       lat: 13.7275, lng: 100.5322, tip: 'Gay hotel with pool. Popular during Pride and Songkran.' },
  { id: 'togayther-black',    name: 'Togayther Black',          category: 'hotels',      area: 'Silom',       lat: 13.7276, lng: 100.5323 },
  { id: 'ibis-mercure',       name: 'IBIS & Mercure',           category: 'hotels',      area: 'Silom',       lat: 13.7241, lng: 100.5283, tip: 'Reliable chain hotels near Sala Daeng BTS.' },
  { id: 'w-hotel',            name: 'W Hotel',                  category: 'hotels',      area: 'Sathorn',     lat: 13.7222, lng: 100.5263, tip: 'Luxury. Great rooftop pool. 5 min walk to Silom.' },
  { id: 'crowne-plaza',       name: 'Crowne Plaza',             category: 'hotels',      area: 'Silom',       lat: 13.7243, lng: 100.5272 },

  // ── Food ─────────────────────────────────────────────────────────────────
  { id: 'chicken-rice',       name: 'Chicken Rice Stalls',      category: 'food',        area: 'Silom',       lat: 13.7262, lng: 100.5285, tip: 'Khao man gai — the best cheap eat in Bangkok. ฿50.' },
  { id: 'convent-road',       name: 'Convent Road',             category: 'food',        area: 'Silom',       lat: 13.7258, lng: 100.5288, tip: 'Street stalls open from lunch till late. Pad thai, somtum, grilled meats.' },
  { id: 'patpong-food',       name: 'Patpong',                  category: 'food',        area: 'Silom',       lat: 13.7263, lng: 100.5271, tip: 'Night market + food stalls. Touristy but fun.' },
  { id: 'fork-cork',          name: 'Fork and Cork',            category: 'food',        area: 'Silom',       lat: 13.7255, lng: 100.5280, tip: 'Good wine bar with food. Popular with expats.' },
  { id: 'chinatown-food',     name: 'Chinatown (Food)',         category: 'food',        area: 'Chinatown',   lat: 13.7399, lng: 100.5097, tip: 'Yaowarat Road at night. Best seafood in Bangkok, street-side.' },
  { id: 'somtum-plara',       name: 'Somtum & Plara',           category: 'food',        area: 'Silom',       lat: 13.7261, lng: 100.5276, tip: 'Authentic Isaan food. Fermented fish somtum — not for the faint-hearted.' },
  { id: 'silom-edge-24',      name: 'Silom Edge 24hr',          category: 'food',        area: 'Silom',       lat: 13.7252, lng: 100.5280, tip: 'Open 24 hours. Perfect for late-night hunger after clubbing.' },
  { id: 'japantown',          name: 'Japantown',                category: 'food',        area: 'Asok',        lat: 13.7390, lng: 100.5600, tip: 'Thaniya Road — dense with authentic Japanese restaurants.' },

  // ── Male Massage ─────────────────────────────────────────────────────────
  { id: 'prime-massage',      name: 'Prime Massage',            category: 'massage',     area: 'Silom',       lat: 13.7265, lng: 100.5302 },
  { id: 'green-massage',      name: 'Green Massage',            category: 'massage',     area: 'Silom',       lat: 13.7267, lng: 100.5305 },
  { id: 'dd-massage',         name: 'DD Massage',               category: 'massage',     area: 'Silom',       lat: 13.7264, lng: 100.5298 },
  { id: 'paradise-massage',   name: 'Paradise Massage',         category: 'massage',     area: 'Silom',       lat: 13.7263, lng: 100.5296 },
  { id: '9teen-massage',      name: '9TEEN Massage',            category: 'massage',     area: 'Silom',       lat: 13.7266, lng: 100.5304 },

  // ── Boy Shows ────────────────────────────────────────────────────────────
  { id: 'banana-room',        name: 'Banana Room',              category: 'shows',       area: 'Silom',       lat: 13.7254, lng: 100.5287 },
  { id: 'jupiter',            name: 'Jupiter',                  category: 'shows',       area: 'Silom',       lat: 13.7252, lng: 100.5285 },
  { id: 'fake-club',          name: 'Fake Club',                category: 'shows',       area: 'Silom',       lat: 13.7251, lng: 100.5283 },
  { id: 'fresh-boys',         name: 'Fresh Boys',               category: 'shows',       area: 'Silom',       lat: 13.7250, lng: 100.5281 },
  { id: 'dream-boy',          name: 'Dream Boy & Hotmale Club', category: 'shows',       area: 'Silom',       lat: 13.7249, lng: 100.5279 },
  { id: 'rainbow-dragon',     name: 'Rainbow Dragon',           category: 'shows',       area: 'Silom',       lat: 13.7248, lng: 100.5277 },
  { id: 'edt',                name: 'EDT',                      category: 'shows',       area: 'Silom',       lat: 13.7247, lng: 100.5275 },

  // ── Saunas ───────────────────────────────────────────────────────────────
  { id: '1-0-sauna',          name: '1/0 Sauna',                category: 'saunas',      area: 'Silom',       lat: 13.7270, lng: 100.5330, tip: 'Most popular gay sauna in Bangkok. Very busy on weekends.' },
  { id: 'heaven-sauna',       name: 'Heaven Sauna',             category: 'saunas',      area: 'Silom',       lat: 13.7268, lng: 100.5326 },
  { id: 'maxwell-onsen',      name: 'Maxwell Onsen',            category: 'saunas',      area: 'Silom',       lat: 13.7274, lng: 100.5335, tip: 'Japanese-style onsen. Clean and well-maintained.' },
  { id: 'chakran',            name: 'Chakran',                  category: 'saunas',      area: 'Sukhumvit',   lat: 13.7355, lng: 100.5615, tip: 'Upscale sauna on Sukhumvit. More spacious than Silom options.' },
  { id: 'sauna-mania',        name: 'Sauna Mania',              category: 'saunas',      area: 'Silom',       lat: 13.7269, lng: 100.5328 },
  { id: 'kino-sento',         name: 'Kino Sento Ekkamai',       category: 'saunas',      area: 'Ekkamai',     lat: 13.7188, lng: 100.5853, tip: 'Japanese-inspired bathhouse. Bit further out but worth it.' },
  { id: 'kaikan-onsen',       name: 'Kaikan Onsen',             category: 'saunas',      area: 'Silom',       lat: 13.7271, lng: 100.5332 },
  { id: 'side-bkk',           name: 'side.BKK',                 category: 'saunas',      area: 'Silom',       lat: 13.7272, lng: 100.5334 },

  // ── Useful ───────────────────────────────────────────────────────────────
  { id: 'night-shop',         name: 'Night Shop',               category: 'useful',      area: 'Silom',       lat: 13.7260, lng: 100.5290, tip: '24hr convenience. Stock up on water and snacks.' },
  { id: 'street-stalls',      name: 'Street Stalls',            category: 'useful',      area: 'Silom',       lat: 13.7261, lng: 100.5292 },
  { id: 'pulse-clinic',       name: 'PULSE Clinic',             category: 'useful',      area: 'Silom',       lat: 13.7263, lng: 100.5294, tip: 'LGBTQ+-friendly sexual health clinic. PrEP, STI testing.' },
  { id: 'st-laundry',         name: 'ST Laundry',               category: 'useful',      area: 'Silom',       lat: 13.7264, lng: 100.5296, tip: 'Drop-off laundry. Ready same day or next morning.' },
];
