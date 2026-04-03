// ── Type Interfaces ────────────────────────────
export interface FestivalScheduleEntry {
  name: string;
  sub?: string;
  genre: string;
  headliner: boolean;
  isPool?: boolean;
  time?: string;
  end?: string;
}

export interface Festival {
  id: string;
  name: string;
  tagline: string;
  theme: string;
  dates: string;
  venue: string;
  area: string;
  price: string;
  color: string;
  colorDark: string;
  type: string;
  featured: boolean;
  url: string;
  crowd: 'insane' | 'high' | 'medium' | 'low';
  description: string;
  timetableNote?: string;
  schedule: Record<string, FestivalScheduleEntry[]>;
  regionalSupport?: string[];
}

export interface Zone {
  id: string;
  name: string;
  area: string;
  type: 'street' | 'cultural';
  crowd: 'insane' | 'high' | 'medium' | 'low';
  lat: number;
  lng: number;
  desc: string;
  bestTime: string;
}

export interface AdditionalEvent {
  id: string;
  name: string;
  dates: string;
  venue: string;
  area: string;
  price: string;
  type: string;
  color: string;
  icon: string;
  desc: string;
}

// ── Festival Dates ─────────────────────────────
export const FESTIVAL_DATES = {
  start: '2026-04-10T00:00:00+07:00',
  end: '2026-04-15T23:59:59+07:00',
  timezone: 'Asia/Bangkok',
  year: 2026,
} as const;

// ── Design Tokens ──────────────────────────────
export const tokens = {
  colors: {
    primary: '#006479',
    primaryFixed: '#40cef3',
    secondary: '#964300',
    tertiary: '#b4005d',
    surface: '#eef8ff',
    onSurface: '#003345',
  },
  fonts: {
    headline: '"Plus Jakarta Sans", sans-serif',
    body: '"Be Vietnam Pro", sans-serif',
  },
};

// ── Navigation ─────────────────────────────────
export const nav = [
  { label: 'Home',          href: '/',              icon: 'home' },
  { label: 'Events',        href: '/events',        icon: 'calendar_month' },
  { label: 'Survival Kit',  href: '/survival-kit',  icon: 'backpack' },
  { label: 'Getting There', href: '/getting-there', icon: 'directions' },
  { label: 'Map',           href: '/map',           icon: 'map' },
  { label: 'AI',            href: '/ai',            icon: 'auto_awesome' },
];

// ── Events / Festivals ─────────────────────────
export const festivals: Festival[] = [
  {
    id: 's2o',
    name: 'S2O Songkran Festival',
    tagline: "The World's Wettest Party",
    theme: 'Party in the Universe',
    dates: 'Apr 11–13',
    venue: 'S2O Land, Ratchada Rd',
    area: 'Ratchada',
    price: '฿1,800–฿2,500',
    color: '#40cef3',
    colorDark: '#006479',
    type: 'edm',
    featured: true,
    url: 'https://www.eventpop.me/e/87299/s2o2026',
    crowd: 'insane',
    description: 'Massive water cannons fire on every drop. Lonely Club World Premiere, Zedd, Kygo, Lost Frequencies and more. New venue S2O Land near MRT Cultural Centre.',
    schedule: {
      'Apr 11': [
        { name: 'Lonely Club', sub: 'World Premiere', genre: 'EDM', headliner: true, time: '23:00', end: '24:00' },
        { name: 'Lost Frequencies', genre: 'Future House', headliner: true, time: '22:00', end: '23:00' },
        { name: 'I Hate Models', genre: 'Techno', headliner: false, time: '21:00', end: '22:00' },
        { name: 'William Black', genre: 'Melodic Bass', headliner: false, time: '20:00', end: '21:00' },
        { name: 'AC Slater', genre: 'House', headliner: false, time: '19:00', end: '20:00' },
        { name: 'Kikie', genre: 'House', headliner: false, time: '18:00', end: '19:00' },
        { name: 'Bestboi', genre: 'House', headliner: false, time: '17:00', end: '18:00' },
      ],
      'Apr 12': [
        { name: 'Zedd', genre: 'Electro House', headliner: true, time: '23:00', end: '24:00' },
        { name: 'CTRL ALT DELETE', sub: 'Asia Premiere', genre: 'Future House', headliner: true, time: '22:00', end: '23:00' },
        { name: 'Dabin', genre: 'Melodic Bass', headliner: false, time: '21:00', end: '22:00' },
        { name: 'Sidepiece', genre: 'Tech House', headliner: false, time: '20:00', end: '21:00' },
        { name: 'Marie Vaunt', genre: 'House', headliner: false, time: '19:00', end: '20:00' },
        { name: 'Tito', genre: 'House', headliner: false, time: '18:00', end: '19:00' },
        { name: 'Maysaa', genre: 'House', headliner: false, time: '17:00', end: '18:00' },
      ],
      'Apr 13': [
        { name: 'Kygo', genre: 'Tropical House', headliner: true, time: '23:00', end: '24:00' },
        { name: 'Gryffin', genre: 'Melodic House', headliner: true, time: '22:00', end: '23:00' },
        { name: 'Da Tweekaz', genre: 'Hardstyle', headliner: false, time: '21:00', end: '22:00' },
        { name: 'Ray Volpe', genre: 'Bass House', headliner: false, time: '20:00', end: '21:00' },
        { name: 'Frank Walker', genre: 'Future Bass', headliner: false, time: '19:00', end: '20:00' },
        { name: 'Yao', genre: 'House', headliner: false, time: '18:00', end: '19:00' },
        { name: 'Mordan', genre: 'House', headliner: false, time: '17:00', end: '18:00' },
      ],
    },
  },
  {
    id: 'siam',
    name: 'Siam Songkran',
    tagline: 'The Melora',
    theme: 'Unified Thai Cultural Heritage',
    dates: 'Apr 11–14',
    venue: 'Bravo BKK Arena, RCA',
    area: 'RCA',
    price: '฿1,500–฿2,000',
    color: '#ff8eb2',
    colorDark: '#b4005d',
    type: 'edm',
    featured: true,
    url: 'https://siamsongkran.info',
    crowd: 'high',
    description: 'Martin Garrix, Marshmello, John Summit, ARTBAT b2b R3HAB, Alok. 4 nights of Main Stage sets at Bravo BKK Arena in the heart of Bangkok\'s nightlife district.',
    schedule: {
      'Apr 11': [
        { name: 'ARTBAT b2b R3HAB', genre: 'Techno / Big Room', headliner: true,  time: '23:15', end: 'late' },
        { name: 'Ben Nicky',         genre: 'Trance',            headliner: true,  time: '22:00', end: '23:15' },
        { name: 'Vini Vici',         genre: 'Psy Trance',        headliner: false, time: '20:45', end: '22:00' },
        { name: 'Andromedik',        genre: 'Drum & Bass',       headliner: false, time: '19:45', end: '20:45' },
        { name: 'Y3LLO',             genre: 'House',             headliner: false, time: '18:45', end: '19:45' },
        { name: 'Meguru',            genre: 'House',             headliner: false, time: '17:45', end: '18:45' },
        { name: 'Sweeny',            genre: 'House',             headliner: false, time: '17:15', end: '17:45' },
        { name: 'Ben.G',             genre: 'House',             headliner: false, time: '16:45', end: '17:15' },
        { name: 'Brynna',            genre: 'House',             headliner: false, time: '16:00', end: '16:45' },
      ],
      'Apr 12': [
        { name: 'Marshmello',                          genre: 'Future Bass',  headliner: true,  time: '23:15', end: 'late' },
        { name: 'Alok',                                genre: 'Bass House',   headliner: true,  time: '22:00', end: '23:15' },
        { name: 'Third Party b3b DubVision b3b Matisse & Sadko', genre: 'Big Room', headliner: true, time: '20:45', end: '22:00' },
        { name: 'Alleycvt',                            genre: 'House',        headliner: false, time: '19:45', end: '20:45' },
        { name: 'Jovynn',                              genre: 'House',        headliner: false, time: '18:45', end: '19:45' },
        { name: 'Kaku',                                genre: 'House',        headliner: false, time: '17:45', end: '18:45' },
        { name: 'Dia',                                 genre: 'House',        headliner: false, time: '17:15', end: '17:45' },
        { name: 'Setty b3b Poohpn b3b Goblin',        genre: 'House',        headliner: false, time: '16:45', end: '17:15' },
        { name: 'Honey Toast',                         genre: 'House',        headliner: false, time: '16:00', end: '16:45' },
      ],
      'Apr 13': [
        { name: 'Martin Garrix',    genre: 'Progressive House', headliner: true,  time: '23:15', end: 'late' },
        { name: 'Agents of Time',   genre: 'Techno',            headliner: true,  time: '22:00', end: '23:15' },
        { name: 'Slushii',          genre: 'Future Bass',       headliner: false, time: '20:45', end: '22:00' },
        { name: 'Arcando',          genre: 'Big Room',          headliner: false, time: '19:45', end: '20:45' },
        { name: 'DCR Milda',        genre: 'House',             headliner: false, time: '18:45', end: '19:45' },
        { name: 'Am Not Joy & Prada', genre: 'House',           headliner: false, time: '17:45', end: '18:45' },
        { name: 'Evin King',        genre: 'House',             headliner: false, time: '17:15', end: '17:45' },
        { name: 'Liquid & Glass',   genre: 'House',             headliner: false, time: '16:45', end: '17:15' },
        { name: 'Izier',            genre: 'House',             headliner: false, time: '16:00', end: '16:45' },
      ],
      'Apr 14': [
        { name: 'John Summit',                    genre: 'Chicago House', headliner: true,  time: '23:15', end: 'late' },
        { name: 'Gorgon City',                    genre: 'House',         headliner: true,  time: '22:00', end: '23:15' },
        { name: 'Layton Giordani',                genre: 'Techno',        headliner: false, time: '20:45', end: '22:00' },
        { name: 'Devault',                        genre: 'Tech House',    headliner: false, time: '19:45', end: '20:45' },
        { name: '22Bullets',                      genre: 'House',         headliner: false, time: '18:45', end: '19:45' },
        { name: 'Karty',                          genre: 'House',         headliner: false, time: '17:45', end: '18:45' },
        { name: 'Beyond',                         genre: 'House',         headliner: false, time: '17:15', end: '17:45' },
        { name: 'Chickenpunk',                    genre: 'House',         headliner: false, time: '16:45', end: '17:15' },
        { name: 'Heartbreakkid b2b Sunday Sundae', genre: 'House',        headliner: false, time: '16:00', end: '16:45' },
      ],
    }
  },
  {
    id: 'gcircuit',
    name: 'GCircuit Songkran',
    tagline: '20th Anniversary Edition',
    theme: 'ADRO-MADA: City of Tomorrow',
    dates: 'Apr 10–13',
    venue: 'UOB Live Hall, Emsphere',
    area: 'Sukhumvit',
    price: '฿2,800–฿4,900',
    color: '#c084fc',
    colorDark: '#7c3aed',
    type: 'circuit',
    featured: true,
    url: 'https://gcircuit.com',
    crowd: 'insane',
    description: "Asia's largest gay circuit festival. 20th Anniversary. Night parties + Bear & Boy pool parties at Emsphere, Sukhumvit (BTS Phrom Phong).",
    schedule: {
      'Apr 10': [
        { name: 'Brian Solis · Mario Beckman', sub: 'Opening Party "Team Alpha"', genre: 'Circuit', headliner: true, time: '19:00', end: 'late' },
        { name: 'Yoshaun · Tomo', sub: 'Opening DJs', genre: 'Circuit', headliner: false, time: '19:00', end: 'late' },
      ],
      'Apr 11': [
        { name: 'Boy Pool Party — AQUA', sub: 'Boren · Kai · Tribe Sky Beach Club', genre: 'Pool Party', headliner: false, isPool: true, time: '12:00', end: '19:00' },
        { name: 'Mistermiss · Tomer Maizner', sub: 'Main Party Vol. One "Empire Of The World"', genre: 'Circuit', headliner: true, time: '19:00', end: 'late' },
        { name: 'Herric · Sun J', sub: 'Opening DJs', genre: 'Circuit', headliner: false, time: '19:00', end: 'late' },
      ],
      'Apr 12': [
        { name: 'Bear Pool Party — AQUAXXL', sub: 'Pat+ · CallMeKevin · Tribe Sky Beach Club', genre: 'Pool Party', headliner: false, isPool: true, time: '12:00', end: '19:00' },
        { name: 'Karsten Sollors · LeaNH · Fran Albuquerque', sub: 'Main Party Vol. Two "Adro Mada"', genre: 'Circuit', headliner: true, time: '19:00', end: 'late' },
        { name: 'Rita · Grant', sub: 'Opening DJs', genre: 'Circuit', headliner: false, time: '19:00', end: 'late' },
      ],
      'Apr 13': [
        { name: 'Jair Sandoval · Alex Acosta', sub: 'Closing Party "Kink"', genre: 'Circuit', headliner: true, time: '19:00', end: 'late' },
        { name: 'Taki · Brian Cua', sub: 'Opening DJs', genre: 'Circuit', headliner: false, time: '19:00', end: 'late' },
      ],
    }
  },
];

// ── Party / Community Events ───────────────────
export interface PartyEvent {
  id: string;
  name: string;
  tagline: string;
  dates: string;
  time: string;
  venue: string;
  area: string;
  price: string;
  color: string;
  colorDark: string;
  ticketUrl?: string;
  desc: string;
  stages?: string[];
  lineup?: string[];
  lgbtq?: boolean;
  inviteOnly?: boolean;
  days: number[];
}

export const partyEvents: PartyEvent[] = [
  // Apr 10
  {
    id: 'midsommar',
    name: 'Midsommar Bangkok',
    tagline: 'A night of summer, music, and queer joy.',
    dates: 'Apr 10',
    time: '10PM – Late',
    venue: 'Circus Dance Festival',
    area: 'Bangkok',
    price: 'Invite Only',
    color: '#e879f9',
    colorDark: '#a21caf',
    ticketUrl: 'https://www.instagram.com/midsommar_bangkok',
    desc: 'An exclusive invite-only LGBTQ+ party to kick off Songkran weekend at Circus Dance Festival. Request your invitation via Instagram @midsommar_bangkok.',
    lineup: ['ANZA', 'Bryant', 'Pat+', 'KP', 'Chobeatz', '4YU'],
    lgbtq: true,
    inviteOnly: true,
    days: [10],
  },
  {
    id: 'bsbw',
    name: 'Bangkok Songkran Bear Week 2026',
    tagline: "Asia's biggest LGBTQ+ bear celebration.",
    dates: 'Apr 10–13',
    time: 'Multiple events',
    venue: 'Various venues, Bangkok',
    area: 'Bangkok',
    price: '฿1,890–7,490',
    color: '#d97706',
    colorDark: '#92400e',
    ticketUrl: 'https://www.eventpop.me/e/131558',
    desc: "Asia's premier LGBTQ+ bear event spanning four days of Songkran. Bear Cruise Dinner on the Chao Phraya River (Apr 10), Bangkok Twilight pool & garden party (Apr 11, 1–7PM), SOAK onsen party at Kaikan Onsen BKK (Apr 12, 12–5PM), and SCRUM night party (Apr 12, 8PM–2AM). 20+ required, original passport.",
    stages: ['Bear Cruise Dinner — Apr 10', 'Bangkok Twilight Pool Party — Apr 11', 'SOAK Onsen Party — Apr 12', 'SCRUM Night Party — Apr 12'],
    lgbtq: true,
    days: [10, 11, 12, 13],
  },
  // Apr 11
  {
    id: 'beefest',
    name: 'BEEFEST',
    tagline: 'The First Fest of BEEF. All day. All wet. All BEEF.',
    dates: 'Apr 11',
    time: '2PM – 12AM',
    venue: 'The River Club, Bangkok',
    area: 'Bangkok',
    price: 'Ticketed',
    color: '#f59e0b',
    colorDark: '#b45309',
    ticketUrl: 'https://www.eventpop.me/e/133985/beefest-2026',
    desc: 'Not just another pool party — this is the beginning of something bigger. Songkran Edition featuring 3 stages, an all-day water experience, and Bangkok\'s finest circuit DJs.',
    stages: ['Pool Party Stage', 'The RIVER dance floor', 'Dark Cruise'],
    lineup: ['Tackhey', 'Kazuma', 'Callmekevin', 'Frxnk', 'Mex', 'Tony HM'],
    lgbtq: true,
    days: [11],
  },
  // Apr 12
  {
    id: 'jizzy-lounge',
    name: 'Jizzy Lounge × BKK WET 2.0',
    tagline: 'Afternoon LGBTQ+ Songkran splash.',
    dates: 'Apr 12',
    time: '1PM – 6PM',
    venue: 'Bangkok',
    area: 'Bangkok',
    price: 'Invite Only',
    color: '#c026d3',
    colorDark: '#86198f',
    ticketUrl: 'https://www.instagram.com/jizzy.lounge.bkk',
    desc: 'BKK WET 2.0 returns with Jizzy Lounge for an LGBTQ+ Songkran afternoon party. The perfect warm-up before the night begins. Invite only — request via Instagram @jizzy.lounge.bkk.',
    lgbtq: true,
    inviteOnly: true,
    days: [12],
  },
  // Apr 13
  {
    id: 'gspot-pool',
    name: 'G-SPOT Party: Pool Edition 2026',
    tagline: "Bangkok's hottest LGBTQ+ pool party, Songkran edition.",
    dates: 'Apr 13',
    time: '3PM – 9PM',
    venue: 'Ibis Styles Bangkok Silom',
    area: 'Silom',
    price: 'Ticketed',
    color: '#ec4899',
    colorDark: '#be185d',
    ticketUrl: 'https://www.ticketmelon.com/th/G-SPOT-PARTY/POOL-EDITION-2026',
    desc: "The iconic G-SPOT Party returns for Songkran day at Ibis Styles Bangkok Silom. Every ticket includes 1 free welcome drink and a complimentary snack. Expect music, water, and Bangkok's LGBTQ+ crowd at its finest.",
    lgbtq: true,
    days: [13],
  },
  {
    id: 'unleash-day1',
    name: 'Unleash: Wet Your Throat',
    tagline: 'Afternoon pool & cruising party to kick off Songkran.',
    dates: 'Apr 13',
    time: '4PM – 9PM',
    venue: 'Side Bar Silom',
    area: 'Silom',
    price: 'Ticketed',
    color: '#06b6d4',
    colorDark: '#0e7490',
    ticketUrl: 'https://yourtessera.com/e/unleash',
    desc: 'The LGBTQ+ afternoon warm-up party on Songkran day. Pool vibes, cruising, and good music at Side Bar Silom. Part 1 of the Unleash Songkran experience.',
    lgbtq: true,
    days: [13],
  },
  // Apr 14
  {
    id: 'unleash-day2',
    name: 'Unleash: Main Party',
    tagline: 'The full-night LGBTQ+ experience. Silom goes off.',
    dates: 'Apr 14',
    time: '10PM – 6AM',
    venue: 'Silom (venue TBA)',
    area: 'Silom',
    price: 'Ticketed',
    color: '#0284c7',
    colorDark: '#075985',
    ticketUrl: 'https://yourtessera.com/e/unleash',
    desc: 'The main event. An all-night LGBTQ+ party closing out Songkran 2026 in Silom. Venue to be announced — check Tessera for updates.',
    lgbtq: true,
    days: [14],
  },
  {
    id: 'k2o',
    name: 'K2O Songkran Music Festival',
    tagline: 'The final splash of Songkran weekend.',
    dates: 'Apr 14',
    time: '5PM – Late',
    venue: 'S2O Land, Ratchada Rd',
    area: 'MRT Thailand Cultural Centre',
    price: '฿3,200',
    color: '#f97316',
    colorDark: '#c2410c',
    ticketUrl: 'https://www.eventpop.me/e/134917/k2o2026',
    desc: 'Closing out Songkran weekend at S2O Land in Ratchada. All area standing, all ages. Organized by S2O Factory.',
    days: [14],
  },
];

// ── Street Zones (for heat map) ────────────────
export const zones: Zone[] = [
  { id: 'silom', name: 'Silom Road', area: 'Silom', type: 'street', crowd: 'insane', lat: 13.7241, lng: 100.5283, desc: 'Bangkok\'s iconic LGBTQ+ street party. Full road closure. Water guns, DJs, bars. Non-stop from 1pm–9pm.', bestTime: '1pm–9pm' },
  { id: 'khaosan', name: 'Khao San Road', area: 'Banglamphu', type: 'street', crowd: 'insane', lat: 13.7589, lng: 100.4977, desc: 'The wildest water battlefield in Bangkok. Backpacker hub turned war zone. Expect powder, buckets, water guns.', bestTime: '2pm–midnight' },
  { id: 'siam', name: 'Siam Square', area: 'Siam', type: 'street', crowd: 'high', lat: 13.7455, lng: 100.5330, desc: 'Traditional "Pha Khao Ma" theme. Concerts, water fights, cultural zones. Dress code enforced.', bestTime: '11am–10pm' },
  { id: 'centralworld', name: 'Central World', area: 'Ratchaprasong', type: 'street', crowd: 'high', lat: 13.7466, lng: 100.5392, desc: 'Thai Rhythm water fights + FWD Music Live Fest. Massive square turns into splash zone with live music.', bestTime: '12pm–10pm' },
  { id: 'sanam', name: 'Sanam Luang', area: 'Old City', type: 'cultural', crowd: 'high', lat: 13.7574, lng: 100.4922, desc: 'Maha Songkran World Event. Parades, EDM splash zone, 1,200-drone light show at night.', bestTime: '9am–10pm' },
  { id: 'iconsiam', name: 'ICONSIAM', area: 'Riverside', type: 'cultural', crowd: 'medium', lat: 13.7223, lng: 100.5094, desc: 'Riverside celebration with Grand Parade, water-splash installation, sacred water-pouring ceremony.', bestTime: '10am–9pm' },
  { id: 'samyan', name: 'Samyan Mitrtown', area: 'Sam Yan', type: 'cultural', crowd: 'medium', lat: 13.7335, lng: 100.5290, desc: 'Family-friendly, alcohol-free. 100m water playground. Merit-making zone. Clean fun.', bestTime: '2pm–8pm' },
  { id: 'changchui', name: 'Chang Chui', area: 'Pinklao', type: 'street', crowd: 'medium', lat: 13.7783, lng: 100.4745, desc: 'Off the beaten path. Water fights around the iconic airplane. Live music nightly. Great for families.', bestTime: '11am–midnight' },
];

// ── Additional Events (beyond the 3 major festivals) ──
export const additionalEvents: AdditionalEvent[] = [
  // Ticketed music festivals
  {
    id: 'splash-nation',
    name: 'Splash Nation Bangkok 2026',
    dates: 'Apr 10–11',
    venue: 'Rama IV Road (Sunthon Kosa Rd Area)',
    area: 'Bangkok',
    price: 'Ticketed',
    type: 'festival',
    color: '#00B4FF',
    icon: 'music_note',
    desc: 'Two-day water + music festival on Rama IV Road.',
  },
  {
    id: 'thai-lism',
    name: 'Thai Lism Music Festival 2026',
    dates: 'Apr 11–13',
    venue: 'Central World',
    area: 'Ratchaprasong',
    price: 'Ticketed',
    type: 'festival',
    color: '#FF6B35',
    icon: 'music_note',
    desc: 'Three-day music festival at Central World. Thai and international acts.',
  },
  {
    id: 'superfluid',
    name: 'SUPERFLUID 2026',
    dates: 'Apr 11–13',
    venue: 'Fountain Square, King Power Rangnam',
    area: 'Rangnam',
    price: 'Ticketed',
    type: 'festival',
    color: '#8B5CF6',
    icon: 'music_note',
    desc: 'Three-day festival at King Power Rangnam\'s Fountain Square.',
  },
  {
    id: 'k2o',
    name: 'K2O Songkran Music Festival 2026',
    dates: 'Apr 14',
    venue: 'S2O Land Ratchada',
    area: 'Ratchada',
    price: 'Ticketed',
    type: 'festival',
    color: '#40cef3',
    icon: 'music_note',
    desc: 'One-day follow-up festival at the S2O venue. Different lineup from S2O.',
  },
  {
    id: 'siam-paragon-ultrasonic',
    name: 'Siam Paragon Ultrasonic Summer Festival',
    dates: 'Apr 10–15',
    venue: 'Siam Paragon',
    area: 'Siam',
    price: 'Ticketed',
    type: 'festival',
    color: '#c084fc',
    icon: 'music_note',
    desc: 'Six-day festival at Siam Paragon. Music, water, and summer vibes.',
  },
  // Free street & cultural events
  {
    id: 'rangnam-songkran',
    name: 'Rangnam Songkran Festival 2026',
    dates: 'Apr 9–14',
    venue: 'King Power Rangnam',
    area: 'Rangnam',
    price: 'Free',
    type: 'street',
    color: '#FF9F0A',
    icon: 'celebration',
    desc: 'Six-day street festival at King Power Rangnam. Early Songkran kickoff.',
  },
  {
    id: 'asiatique-summer',
    name: 'Asiatique Summer Wonder Fest 2026',
    dates: 'Apr 9–30',
    venue: 'Asiatique The Riverfront',
    area: 'Riverside',
    price: 'Free',
    type: 'cultural',
    color: '#006479',
    icon: 'auto_awesome',
    desc: 'Month-long summer fest at the riverside night market. Food, shows, and water fun.',
  },
  {
    id: 'splash-rca',
    name: 'Splash Songkran RCA 2026',
    dates: 'Apr 10–15',
    venue: 'Royal City Avenue (RCA)',
    area: 'RCA',
    price: 'Free',
    type: 'street',
    color: '#ff8eb2',
    icon: 'water_drop',
    desc: 'RCA\'s bars and clubs spill out onto the street for a week of water fights and parties.',
  },
  {
    id: 'saneh-art',
    name: 'Saneh Art by Songkran Festival 2026',
    dates: 'Apr 10–30',
    venue: 'Benchasiri Park & Bangkok City Hall Plaza',
    area: 'Various',
    price: 'Free',
    type: 'cultural',
    color: '#964300',
    icon: 'palette',
    desc: 'Art-focused Songkran festival. Installations, performances, and cultural exhibitions across two venues.',
  },
  {
    id: 'maha-songkran',
    name: 'Maha Songkran World Event',
    dates: 'Apr 11–15',
    venue: 'Benjakitti Park',
    area: 'Asoke',
    price: 'Free',
    type: 'cultural',
    color: '#FF9F0A',
    icon: 'temple_buddhist',
    desc: 'TAT-organized grand celebration. Parades, EDM splash zone, drone light shows. The official Songkran event.',
  },
  {
    id: 'drag-water-fest',
    name: 'Drag Let\'s Play Water Festival 2026',
    dates: 'Apr 12',
    venue: 'Song Wat Road (Elephant Parking)',
    area: 'Chinatown',
    price: 'Free',
    type: 'street',
    color: '#E91E63',
    icon: 'diversity_3',
    desc: 'Celebrating diversity and Thai soft power. Drag performances, water fights, LGBTQ+ pride.',
  },
  {
    id: 'silom-songkran',
    name: 'Songkran Festival at Silom Road',
    dates: 'Apr 12–14',
    venue: 'Silom Road',
    area: 'Silom',
    price: 'Free',
    type: 'street',
    color: '#9B59B6',
    icon: 'diversity_3',
    desc: 'Full road closure 1pm–9pm. Water guns, DJs, street vendors. LGBTQ+ scene centered on Soi 2 & 4.',
  },
  {
    id: 'siam-square-songkran',
    name: 'Siam Songkran Festival 2026',
    dates: 'Apr 12–15',
    venue: 'Siam Square',
    area: 'Siam',
    price: 'Free',
    type: 'street',
    color: '#00B4FF',
    icon: 'waves',
    desc: '"Pha Khao Ma" theme. Traditional dress encouraged. Water fights + concerts with 4Eve, Atlas, Maiyarap.',
  },
  {
    id: 'monster-water',
    name: 'Monster Water Fest 2026',
    dates: 'Apr 13–15',
    venue: 'Fashion Island',
    area: 'Bangkapi',
    price: 'Free',
    type: 'street',
    color: '#22C55E',
    icon: 'water_drop',
    desc: 'Water fest at Fashion Island shopping mall. Great for families and suburban crowds.',
  },
  {
    id: 'bkk-water-festival',
    name: 'Bangkok Water Festival 2026',
    dates: 'Apr 13–15',
    venue: 'Ten destinations across Bangkok',
    area: 'Citywide',
    price: 'Free',
    type: 'cultural',
    color: '#006479',
    icon: 'location_city',
    desc: 'City-organized water festival spanning ten major destinations across Bangkok.',
  },
  {
    id: 'silom-parade',
    name: 'Amazing Bangkok Songkran Parade',
    dates: 'Apr 14',
    venue: 'Silom Road',
    area: 'Silom',
    price: 'Free',
    type: 'cultural',
    color: '#9B59B6',
    icon: 'festival',
    desc: 'Annual grand parade down Silom Road. Cultural floats, performers, and community groups.',
  },
  {
    id: 'iconsiam-songkran',
    name: 'ICONSIAM Thaiconic Songkran Celebration',
    dates: 'Apr 10–15',
    venue: 'River Park, ICONSIAM',
    area: 'Riverside',
    price: 'Free',
    type: 'cultural',
    color: '#006479',
    icon: 'auto_awesome',
    desc: 'Grand Parade, water-splash installations, sacred water-pouring ceremony. Riverside Songkran at its finest.',
  },
];

// ── Water Fight Zones ─────────────────────────
export const waterFightZones = [
  {
    id: 'wf-silom',
    name: 'Silom Road',
    dates: 'Apr 12–14',
    hours: '1pm–9pm',
    intensity: 'insane',
    vibe: 'LGBTQ+ party central. Water guns, DJs, bar crawls.',
    howToGet: 'BTS Sala Daeng or MRT Si Lom',
    tip: 'Bring your own water guns — prices triple on the street. No need to dress up — you\'ll be soaked instantly.',
    color: '#9B59B6',
  },
  {
    id: 'wf-khaosan',
    name: 'Khao San Road',
    dates: 'Apr 13–15',
    hours: 'All day into night',
    intensity: 'insane',
    vibe: 'International backpacker war zone. Buckets, powder, water guns, absolute chaos.',
    howToGet: 'Taxi to Phra Athit Rd or boat to Phra Athit Pier (N13)',
    tip: 'Expect powder on your face — it\'s tradition. Bring goggles. No BTS/MRT nearby.',
    color: '#FF3B30',
  },
  {
    id: 'wf-siam',
    name: 'Siam Square',
    dates: 'Apr 12–15',
    hours: '11am–10pm',
    intensity: 'high',
    vibe: 'Cultural + fun. "Pha Khao Ma" dress code. Concerts, water fights, traditional zones.',
    howToGet: 'BTS Siam (direct)',
    tip: 'Dress code enforced — avoid revealing outfits. Buy a pha khao ma cloth at the entrance if needed.',
    color: '#00B4FF',
  },
  {
    id: 'wf-centralworld',
    name: 'Central World',
    dates: 'Apr 12–14',
    hours: '12pm–10pm',
    intensity: 'high',
    vibe: 'Thai Rhythm water fights + live music. Massive open square. FWD Music Live Fest follows Apr 18–20.',
    howToGet: 'BTS Chit Lom or Siam, walk via skywalk',
    tip: 'Arrive early for good concert spots. The square is huge — water fights on one end, stage on the other.',
    color: '#FF6B35',
  },
  {
    id: 'wf-sanam',
    name: 'Sanam Luang',
    dates: 'Apr 11–15',
    hours: '9am–10pm',
    intensity: 'high',
    vibe: 'TAT-organized. More cultural than chaotic. Grand parades, EDM splash zone, drone shows at night.',
    howToGet: 'Chao Phraya boat to Tha Chang Pier or MRT Sanam Chai',
    tip: 'Start here during the day, then head to Khao San (5 min away) when things get wild.',
    color: '#FF9F0A',
  },
  {
    id: 'wf-iconsiam',
    name: 'ICONSIAM Riverside',
    dates: 'Apr 10–15',
    hours: '10am–9pm',
    intensity: 'medium',
    vibe: 'Beautiful and cultural. Grand Parade, water installations, sacred ceremony. Riverside setting.',
    howToGet: 'Chao Phraya boat to ICONSIAM Pier or BTS Charoen Nakhon',
    tip: 'Bring extra clothes — you\'ll get drenched then freeze inside the department store AC.',
    color: '#006479',
  },
  {
    id: 'wf-samyan',
    name: 'Samyan Mitrtown',
    dates: 'Apr 13–15',
    hours: '2pm–8pm',
    intensity: 'medium',
    vibe: 'Clean, family-friendly, alcohol-free. 100m water playground. Mini concerts. Merit-making.',
    howToGet: 'MRT Sam Yan (direct)',
    tip: 'Best for families and anyone wanting fun without the chaos. Stay sober — it\'s the vibe here.',
    color: '#34C759',
  },
  {
    id: 'wf-changchui',
    name: 'Chang Chui',
    dates: 'Apr 12–16',
    hours: '11am–midnight',
    intensity: 'medium',
    vibe: 'Quirky creative space. Water fights around the iconic airplane. Live music nightly. Good for families.',
    howToGet: 'MRT Sirindhorn or Bang Bamru, then taxi',
    tip: 'Off the beaten path — plan your Grab home in advance. Surge pricing hits hard out here.',
    color: '#22C55E',
  },
];

// ── Survival Checklist (scenario-based) ───────
export const checklist = [
  {
    category: 'Before You Leave the Hotel',
    icon: 'hotel',
    color: '#006479',
    emoji: '🏨',
    description: 'Prep before you step outside. Once you\'re wet, there\'s no going back.',
    items: [
      { id: 'pouch', label: 'Waterproof phone pouch', icon: 'smartphone', priority: 'critical', tip: 'Your phone\'s warranty doesn\'t cover Khao San Road' },
      { id: 'bag', label: 'Dry bag or zip-lock bags', icon: 'backpack', priority: 'critical', tip: 'For cash, cards, and anything that can\'t get wet' },
      { id: 'sunscreen', label: 'SPF 50 waterproof sunscreen', icon: 'wb_sunny', priority: 'critical', tip: 'Reapply every 2 hours. Bangkok April = brutal sun.' },
      { id: 'meds', label: 'Basic first aid / meds', icon: 'medical_services', priority: 'medium', tip: 'Paracetamol, rehydration salts, blister plasters' },
      { id: 'id', label: 'Original passport or ID', icon: 'badge', priority: 'critical', tip: 'Ticketed events are 20+. Thai police check originals — no photos.' },
    ],
  },
  {
    category: 'Battle-Ready Gear',
    icon: 'checkroom',
    color: '#40cef3',
    emoji: '⚔️',
    description: 'What to wear when the streets become rivers.',
    items: [
      { id: 'shoes', label: 'Water-safe shoes', icon: 'steps', priority: 'high', tip: 'Rubber sandals or Crocs. Nothing leather. Ever.' },
      { id: 'clothes', label: 'Quick-dry clothing', icon: 'checkroom', priority: 'high', tip: 'Synthetic or moisture-wicking. You will be soaked in 30 seconds.' },
      { id: 'goggles', label: 'Waterproof goggles', icon: 'visibility', priority: 'medium', tip: 'Optional but game-changing at water cannon festivals' },
      { id: 'charger', label: 'Portable charger in waterproof bag', icon: 'battery_charging_full', priority: 'high', tip: 'Dead phone = no maps, no tickets, no Grab home' },
    ],
  },
  {
    category: 'Street Smart Essentials',
    icon: 'directions_transit',
    color: '#FF9F0A',
    emoji: '🚇',
    description: 'Navigate the chaos like a local.',
    items: [
      { id: 'rabbit', label: 'BTS Rabbit card loaded', icon: 'train', priority: 'high', tip: 'Only sane transport during Songkran. Taxis are chaos.' },
      { id: 'cash', label: 'Emergency cash in sealed bag', icon: 'payments', priority: 'high', tip: 'Keep ฿500 separate from your main wallet in a ziplock.' },
      { id: 'grab', label: 'Grab app installed & topped up', icon: 'local_taxi', priority: 'medium', tip: 'For late night when BTS stops running. Expect 3-4x surge.' },
      { id: 'water', label: 'Reusable water bottle', icon: 'water_drop', priority: 'high', tip: '240+ free refill stations citywide during Songkran' },
    ],
  },
  {
    category: 'Festival Mode',
    icon: 'confirmation_number',
    color: '#b4005d',
    emoji: '🎫',
    description: 'Everything for the ticketed festivals.',
    items: [
      { id: 'tickets', label: 'Download tickets to phone', icon: 'confirmation_number', priority: 'critical', tip: 'Screenshot or save offline — your data will die in crowds.' },
      { id: 'wristband', label: 'Wristband stored in pouch', icon: 'watch', priority: 'high', tip: 'Waterproof your wristband with tape if swimming.' },
      { id: 'map', label: 'Venue maps saved offline', icon: 'map', priority: 'medium', tip: 'S2O Land and Emsphere layouts saved to Maps app.' },
    ],
  },
  {
    category: 'Respect the Culture',
    icon: 'temple_buddhist',
    color: '#964300',
    emoji: '🙏',
    description: 'Songkran is a sacred Thai holiday. Have fun AND be respectful.',
    items: [
      { id: 'monks', label: 'Don\'t splash monks, elderly or babies', icon: 'do_not_disturb', priority: 'critical', tip: 'Songkran is a sacred holiday. Read the room.' },
      { id: 'zones', label: 'Stay in designated water zones', icon: 'location_on', priority: 'medium', tip: 'Certain streets are dry zones — respect them.' },
      { id: 'dry-zones', label: 'Know the dry zones near temples', icon: 'temple_buddhist', priority: 'high', tip: 'Areas around temples and government buildings are dry. Look for signs.' },
    ],
  },
];

// ── Transport & Getting There ─────────────────
export const roadClosures = [
  { road: 'Silom Road', area: 'Silom', dates: 'Apr 13–15', severity: 'full', desc: 'Fully closed from Naradhiwas to Pan Road. Zero vehicle access.' },
  { road: 'Khao San Road', area: 'Banglamphu', dates: 'Apr 12–15', severity: 'full', desc: 'Pedestrian-only zone. Streets around Rambuttri also closed.' },
  { road: 'Ratchadaphisek (near S2O)', area: 'Ratchada', dates: 'Apr 11–13', severity: 'partial', desc: 'One lane restricted near S2O Land. Heavy traffic from 3pm.' },
  { road: 'RCA (Royal City Avenue)', area: 'RCA', dates: 'Apr 11–14', severity: 'partial', desc: 'Lane restrictions near Bravo BKK Arena. Drop-off only zone after 4pm.' },
  { road: 'Sukhumvit Soi 22–26', area: 'Sukhumvit', dates: 'Apr 10–13', severity: 'partial', desc: 'Expect slow traffic near Emsphere. Use BTS Phrom Phong.' },
  { road: 'Sanam Luang area', area: 'Old City', dates: 'Apr 13–15', severity: 'full', desc: 'UNESCO Maha Songkran ceremony. Grand Palace area restricted.' },
];

export const venueTransport = [
  {
    id: 's2o',
    venue: 'S2O Songkran',
    location: 'S2O Land, Ratchada Rd',
    festivalColor: '#40cef3',
    transport: [
      { mode: 'MRT', icon: 'subway', color: '#1E3A8A', route: 'MRT Cultural Centre (Exit 3)', walkTime: '8 min walk', details: 'Follow the crowd — you literally can\'t miss it. Turn left out of Exit 3.' },
      { mode: 'Taxi / Grab', icon: 'local_taxi', color: '#FBBF24', route: 'Drop at "S2O Land" or "Show DC"', walkTime: '0 min', details: 'Tell driver "Show DC Ratchada". Expect ฿200–400 from Siam. Surge after 10pm.' },
    ],
    proTip: 'MRT is the only stress-free option. Ratchada gets gridlocked from 4pm onwards.',
    closureWarning: 'Ratchadaphisek partially closed near venue. Walk from MRT.',
  },
  {
    id: 'siam-songkran',
    venue: 'Siam Songkran',
    location: 'Bravo BKK Arena, RCA',
    festivalColor: '#ff8eb2',
    transport: [
      { mode: 'MRT', icon: 'subway', color: '#1E3A8A', route: 'MRT Phra Ram 9 (Exit 3)', walkTime: '12 min walk', details: 'Walk down Phra Ram 9 Rd towards RCA. Follow signs to Bravo BKK.' },
      { mode: 'BTS + Taxi', icon: 'train', color: '#22C55E', route: 'BTS Asok → short Grab', walkTime: '5 min ride', details: 'Grab from Asok to RCA is ฿60-100 normal, ฿150-250 during festival.' },
      { mode: 'Taxi / Grab', icon: 'local_taxi', color: '#FBBF24', route: 'Drop at "RCA" or "Bravo BKK"', walkTime: '0 min', details: 'Make sure they drop you at the RIGHT end of RCA. Bravo is at the far end.' },
    ],
    proTip: 'Don\'t get dropped at the wrong RCA entrance. Bravo BKK is at the far end — specify "Bravo Arena, end of RCA" to your driver.',
    closureWarning: 'RCA has drop-off only zones after 4pm. Walking from MRT Phra Ram 9 is reliable.',
  },
  {
    id: 'gcircuit',
    venue: 'GCircuit Songkran',
    location: 'UOB Live Hall, Emsphere',
    festivalColor: '#c084fc',
    transport: [
      { mode: 'BTS', icon: 'train', color: '#22C55E', route: 'BTS Phrom Phong (Exit 6)', walkTime: '3 min walk', details: 'Direct skywalk to Emsphere. The easiest venue to reach. Air-conditioned walk.' },
      { mode: 'Taxi / Grab', icon: 'local_taxi', color: '#FBBF24', route: 'Drop at "Emsphere Mall"', walkTime: '0 min', details: 'Sukhumvit traffic is brutal during Songkran. BTS is 10x faster.' },
    ],
    proTip: 'BTS Phrom Phong has a direct covered skywalk to Emsphere. No water fights, no traffic, no stress. Just take the BTS.',
    closureWarning: null,
  },
  {
    id: 'silom',
    venue: 'Silom Street Party',
    location: 'Silom Road, Soi 2 & 4',
    festivalColor: '#9B59B6',
    transport: [
      { mode: 'BTS', icon: 'train', color: '#22C55E', route: 'BTS Sala Daeng (Exit 4)', walkTime: '1 min walk', details: 'You\'ll get soaked the moment you exit the station. It\'s unavoidable.' },
      { mode: 'MRT', icon: 'subway', color: '#1E3A8A', route: 'MRT Si Lom (Exit 2)', walkTime: '2 min walk', details: 'Slightly less wet approach than BTS exit, but you\'ll still get hit.' },
    ],
    proTip: 'You WILL get drenched walking from the BTS to Silom Soi 2. Embrace it — that\'s the point. Leave your nice shoes at the hotel. Seriously.',
    closureWarning: 'Silom Road fully closed to vehicles Apr 13–15. Only way in is BTS/MRT + walking.',
  },
  {
    id: 'khaosan',
    venue: 'Khao San Road',
    location: 'Khao San, Banglamphu',
    festivalColor: '#FF3B30',
    transport: [
      { mode: 'Taxi / Grab', icon: 'local_taxi', color: '#FBBF24', route: 'Drop at "Phra Athit Pier" or "Rambuttri"', walkTime: '5 min walk', details: 'Ask to be dropped at Phra Athit Rd. Walk through Rambuttri alley.' },
      { mode: 'Boat', icon: 'directions_boat', color: '#06B6D4', route: 'Chao Phraya Express to Phra Athit Pier (N13)', walkTime: '7 min walk', details: 'Most scenic route. Take orange flag boat. ฿16 per ride. Runs 6am–7pm.' },
      { mode: 'Bus', icon: 'directions_bus', color: '#EF4444', route: 'Bus 2, 15, 44, 59 to Ratchadamnoen', walkTime: '10 min walk', details: 'Cheapest but slowest option. Only if you\'re already nearby.' },
    ],
    proTip: 'No BTS or MRT near Khao San. The Chao Phraya boat to Phra Athit Pier is actually the most reliable (and scenic) option. Runs every 10 min.',
    closureWarning: 'Khao San + surrounding streets fully pedestrianized Apr 12–15. No vehicles for blocks.',
  },
  {
    id: 'siam-square',
    venue: 'Siam Square',
    location: 'Siam, Pathum Wan',
    festivalColor: '#34C759',
    transport: [
      { mode: 'BTS', icon: 'train', color: '#22C55E', route: 'BTS Siam (Exit 1 or 4)', walkTime: '0 min', details: 'You\'re literally there. Siam BTS = center of everything.' },
    ],
    proTip: 'Use the covered walkway from BTS to CentralWorld / Siam Paragon if you want to stay dry a bit longer. But who are we kidding.',
    closureWarning: null,
  },
];

export const transportTips = [
  { icon: 'train', title: 'BTS is Your Best Friend', desc: 'Runs above the chaos. Extended hours during Songkran (6am–midnight+). Rabbit card saves queuing for tokens.', color: '#22C55E' },
  { icon: 'trending_up', title: 'Grab Surge Warning', desc: 'Expect 3-4x surge pricing during peak hours (2pm–8pm). Book 30 min before you want to leave.', color: '#EF4444' },
  { icon: 'payments', title: 'Cash for Tuk-Tuks', desc: 'Negotiate price BEFORE you get in. ฿100-150 for short trips. They don\'t use meters.', color: '#FBBF24' },
  { icon: 'water_drop', title: 'Waterproof Your Bag', desc: 'Even the walk from BTS to venue = getting soaked. Dry bag or ziplock everything.', color: '#06B6D4' },
  { icon: 'schedule', title: 'Leave Early, Stay Late', desc: 'Peak traffic chaos: 3pm–7pm. Go early or wait it out. Night BTS is surprisingly empty.', color: '#8B5CF6' },
  { icon: 'map', title: 'Save Maps Offline', desc: 'Mobile data slows to a crawl in festival crowds. Download Google Maps offline for Bangkok.', color: '#FF9F0A' },
];
