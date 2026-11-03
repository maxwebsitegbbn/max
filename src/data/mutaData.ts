export interface LeaderboardPlayer {
  rank: number;
  name: string;
  wagered: number;
  prize: number;
  avatar: string | null;
}

export interface LeaderboardBoard {
  site: string;
  name?: string;
  pool: number;
  endsAt: number;
  weightedNote?: string;
  ngr?: string;
  vipTransfer?: {
    depositBonus: string;
    lossback: string;
    transferWager: number;
  };
  players: LeaderboardPlayer[];
}

export interface SiteConfig {
  key: string;
  name: string;
  url: string;
  logo: string;
  accent: string;
  accentInk: string;
  unit: string;
  fan: string[];
  fanKind: string;
  blurb: string;
  poolAmount: number;
}

export interface BonusItem {
  id: string;
  title: string;
  line: string;
  body: string;
  tag: string;
  highlight?: boolean;
}

export interface StreamVod {
  title: string;
  start: string;
  duration: number;
  views: number;
  thumb: string;
  uuid: string;
}

export interface StreamClip {
  id: string;
  title: string;
  views: number;
  duration: number;
  thumb: string;
  by: string;
  at: string;
}

export const SOCIAL_LINKS = {
  kick: 'https://kick.com/MAXdegens',
  x: 'https://x.com/MAX_Degens',
  twitter: 'https://x.com/MAX_Degens',
  discord: 'https://discord.gg/8qF2S3YzeP',
  packy: 'https://packy.gg/?r=MAXS',
  code: 'MAXS',
  tagline: "the official rewards hub for packy.gg",
};

export const SITES: Record<string, SiteConfig> = {
  packy: {
    key: 'packy',
    name: 'packy.gg',
    url: 'https://packy.gg/?r=MAXS',
    logo: '/img/image-8.png',
    accent: '#0084FF',
    accentInk: '#00142B',
    unit: '$',
    fan: ['/img/moonshine_kQTGwZ0AM.png', '/img/Mega_vault_tBtgVyFSL.png', '/img/temple_run_a88GzufHW.png'],
    fanKind: 'packs',
    blurb: '$100 Leaderboard (25% NGR funded by Packy). 0.5% instant rakeback, and 4–10% lossback.',
    poolAmount: 100,
  },
  rain: {
    key: 'rain',
    name: 'rain.gg',
    url: 'https://rain.gg/r/Maxs',
    logo: '/img/IMG_eb918c47-61dd-480d-92d5-29d6010d1c08.png',
    accent: '#0084FF',
    accentInk: '#00142B',
    unit: '$',
    fan: ['/img/rain.png', '/img/drizzle.png', '/img/jelly.png'],
    fanKind: 'cases',
    blurb: '3 Free Cases on Signup + 5% Extra Deposit Bonus with code Maxs. Open CS2 & Crypto cases instantly!',
    poolAmount: 0,
  },
};

export const HOUSE_EDGE_TIERS = [
  {
    multiplier: '1×',
    edge: 'Packs & Battles (100% Weight)',
    rtp: 'Standard wagering weight',
    note: 'Mystery packs and player battles count 1.0x',
  },
  {
    multiplier: '0.5×',
    edge: 'Keno & Upgrader (50% Weight)',
    rtp: 'On-site Leaderboard weighting',
    note: 'As per Packy rules: Keno and Upgrader wagers weighted at 0.5x',
  },
  {
    multiplier: '0.1×',
    edge: 'Ultra-low edge games',
    rtp: 'RTP ≥ 99%',
    note: 'Table games and minimal margin modes',
  },
];

export const BONUSES: BonusItem[] = [
  {
    id: 'packy-lb',
    title: 'Packy $100 Leaderboard (25% NGR)',
    line: '1st: $50 · 2nd: $30 · 3rd: $20 • 0.5x Keno/Upgrader',
    body: '$100 leaderboard fully funded by Packy with 25% NGR. Wagers tracked directly on-site with 0.5x weighting for Keno and Upgrader games. Top 3 take $50, $30, and $20.',
    tag: '$100 Packy Race',
    highlight: true,
  },
  {
    id: 'packy-rakeback',
    title: '0.5% Rakeback on Wager',
    line: 'Instant 0.5% return on every single pack and bet',
    body: 'Funded directly by Packy for our community. Earn 0.5% instant cash rakeback on all eligible wager volume made under code Max.',
    tag: '0.5% Rakeback',
  },
  {
    id: 'packy-lossback',
    title: '4% – 10% Lossback Bonus',
    line: 'Weekly safety net on net losses',
    body: 'Claim 4% to 10% lossback every week on packy.gg net losses. Paid directly to your account or wallet via our Discord support.',
    tag: '4-10% Lossback',
  },
];

const now = Date.now();
export const LEADERBOARD_BOARDS: Record<string, LeaderboardBoard> = {
  packy: {
    site: 'packy',
    name: 'packy.gg',
    pool: 100,
    endsAt: new Date("2026-11-07T01:00:00.000Z").getTime(),
    weightedNote: 'Hosted on-site (Endpoint 2) • Wagers weighted 0.5x for Keno & Upgrader • 1.0x for Packs & Battles',
    ngr: '25% NGR + $100 Leaderboard',
    vipTransfer: {
      depositBonus: '10% weekly deposit bonus',
      lossback: 'Up to 15% lossback',
      transferWager: 10000,
    },
    players: [
      { rank: 1, name: "li****ly", wagered: 434.87, prize: 50, avatar: "https://avatars.steamstatic.com/a4427c1c1413c2c37051a580daaff94cc91da4aa_full.jpg" },
      { rank: 2, name: "ma****er", wagered: 187.84, prize: 25, avatar: "https://ik.imagekit.io/scrkflpgw/avatars/avatar_kkbxehshxysggycyhhfyxnffeyxlykiq_SJFCvId9p.jpg" },
      { rank: 3, name: "em****ys", wagered: 101.40, prize: 15, avatar: null },
      { rank: 4, name: "mr****ky", wagered: 55.77, prize: 5, avatar: "https://cdn.discordapp.com/avatars/775416292194517063/d2748b40027aabd531f58d9c58fad5e0.png" },
      { rank: 5, name: "mu****zy", wagered: 18.22, prize: 5, avatar: "https://cdn.discordapp.com/avatars/689500108844564553/a_14a37124a2a267657fc9332bf483a0d3.png" },
      { rank: 6, name: "re****st", wagered: 14.35, prize: 0, avatar: "https://avatars.steamstatic.com/553e1f6d00620f054200e47a104dfb318747b2c7_full.jpg" },
      { rank: 7, name: "ra****es", wagered: 2.96, prize: 0, avatar: "https://ik.imagekit.io/scrkflpgw/avatars/avatar_BanTrSKDzulj8XTG3ToFEX5A507TZ3bS_hFMVf3y2Y.jpg" },
      { rank: 8, name: "xo****ls", wagered: 0.00, prize: 0, avatar: null }
    ],
  },
};

export const KICK_STREAM = {
  channel: 'MAXdegens',
  url: 'https://kick.com/MAXdegens',
  isLive: true,
  streamTitle: 'MAX DEGENS LIVE • High Stakes & packy.gg Rewards',
  viewers: 1420,
  followers: '2,000+',
  category: 'Slots & Games',
};

export const STREAM_VODS: StreamVod[] = [
  {
    title: 'MAX DEGENS LIVE • $200K Board Grind',
    start: '2026-09-21 21:14:00',
    duration: 7743000,
    views: 2522,
    thumb: 'https://images.kick.com/video_thumbnails/X9o63y9FQfad/y1kVHfFJBkCr/720.webp',
    uuid: '63f6b1e8-9daa-4b66-863e-8b33432b8ebe',
  },
  {
    title: 'Bonus Buys with the Degens',
    start: '2026-09-20 22:15:52',
    duration: 7108000,
    views: 2740,
    thumb: 'https://images.kick.com/video_thumbnails/X9o63y9FQfad/vCcNNRANVQwD/720.webp',
    uuid: 'b1862fc6-adc2-4c15-9c67-ace50b26985c',
  },
];

export const STREAM_CLIPS: StreamClip[] = [
  {
    id: 'clip_1',
    title: 'HUGE MULTI HIT ON PACKY.GG! 1000x',
    views: 5410,
    duration: 45,
    thumb: 'https://images.kick.com/video_thumbnails/X9o63y9FQfad/y1kVHfFJBkCr/720.webp',
    by: 'degen_fan',
    at: '2026-09-21',
  },
];

export const FAQS = [
  {
    q: 'How do I join the $100 Packy Leaderboard?',
    a: 'Register on packy.gg under code Max. Every wager automatically counts towards the $100 leaderboard (25% NGR).',
  },
  {
    q: 'How does game weighting work for the Packy Leaderboard?',
    a: 'Wagers on Mystery Packs and Player Battles count 1.0x (100%), while Keno and Upgrader wagers count 0.5x (50%), matching on-site rules.',
  },
  {
    q: 'Why is my username masked on the leaderboard?',
    a: 'We mask player usernames for account privacy and security. Standings are synchronized directly with official partner API records.',
  },
];
