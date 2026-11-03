import React, { useState, useEffect, useRef, useMemo, Fragment } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Navigate,
  useLocation,
  useParams
} from 'react-router-dom';
import { AssetSyncModal, PackArt } from './components/CardArt';

export const I = {
  name: "MAX",
  handle: "MAXdegens",
  code: "Max",
  kick: "https://kick.com/MAXdegens",
  x: "https://x.com/MAX_Degens",
  xHandle: "@MAX_Degens",
  discord: "https://discord.gg/8qF2S3YzeP",
  packy: "https://packy.gg/?r=Max",
  tagline: "Official Community Hub for packy.gg",
  followers: "2,000+"
};

export interface SiteInfo {
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
}

export const Be: Record<string, SiteInfo> = {
  packy: {
    key: "packy",
    name: "packy.gg",
    url: "https://packy.gg/?r=Max",
    logo: "/img/image-8.png",
    accent: "#0084FF",
    accentInk: "#00142B",
    unit: "$",
    fan: ["/img/moonshine_kQTGwZ0AM.png", "/img/Mega_vault_tBtgVyFSL.png", "/img/temple_run_a88GzufHW.png"],
    fanKind: "packs",
    blurb: "$100 Leaderboard (25% NGR funded by Packy). 0.5% instant rakeback, 4–10% lossback, and VIP Transfer with physical Pokémon card shipments."
  },
  rain: {
    key: "rain",
    name: "rain.gg",
    url: "https://rain.gg/r/Maxs",
    logo: "/img/IMG_eb918c47-61dd-480d-92d5-29d6010d1c08.png",
    accent: "#0084FF",
    accentInk: "#00142B",
    unit: "$",
    fan: ["/img/rain.png", "/img/drizzle.png", "/img/jelly.png"],
    fanKind: "cases",
    blurb: "3 Free Cases on Signup + 5% Extra Deposit Bonus with code Maxs. Open CS2 & Crypto cases instantly!"
  }
};

export const xr = ["packy", "rain"];

export const iv = [
  { x: "1×", edge: "Packs & Battles (100% Weight)", rtp: "Standard wagering weight", note: "Pokémon mystery packs and player battles count 1.0x" },
  { x: "0.5×", edge: "Keno & Upgrader (50% Weight)", rtp: "On-site Endpoint 2 rule", note: "Packy LB: Keno and Upgrader wagers weighted at 0.5x" },
  { x: "0.5%", edge: "Instant Rakeback", rtp: "Instant Return", note: "Earn 0.5% back on all wagers" },
  { x: "4–10%", edge: "Weekly Lossback", rtp: "Safety Net", note: "Lossback paid weekly via Discord" }
];

export const av = [
  {
    id: "rain-free-cases",
    title: "Three Free Cases on Signup",
    line: "Code Maxs unlocks 3 instant welcome cases",
    body: "Register on rain.gg using referral code Maxs to receive 3 free welcome cases immediately with no deposit required. Open them to win CS2 skins, knives, gloves, and instant crypto rewards!",
    tag: "3 Free Cases"
  },
  {
    id: "rain-depo-bonus",
    title: "5% Extra Deposit Bonus",
    line: "5% cash bonus added to every single deposit",
    body: "Fund your rain.gg account with code Maxs and receive an additional 5% bonus credited straight to your balance on top of every crypto and card deposit.",
    tag: "5% Depo Bonus"
  },
  {
    id: "packy-vip-transfer",
    title: "Packy VIP Transfer & Pokémon Cards",
    line: "10% weekly deposit bonus • up to 15% lossback • physical cards",
    body: "Transfer your high-roller status to packy.gg under code Max. Reach $10k wager to complete full VIP transfer. At $25k wager, get an authentic Pokémon card shipped to you (cards scale higher the more you wager)!",
    tag: "Packy VIP Transfer"
  },
  {
    id: "packy-lb",
    title: "Packy $100 Leaderboard (25% NGR)",
    line: "1st: $50 · 2nd: $30 · 3rd: $20 • 0.5x Keno/Upgrader",
    body: "$100 leaderboard fully funded by Packy with 25% NGR. Wagers tracked directly on-site (Endpoint 2) with 0.5x weighting for Keno and Upgrader games. Top 3 take $50, $30, and $20.",
    tag: "$100 Packy Race"
  },
  {
    id: "packy-rakeback",
    title: "0.5% Rakeback on Wager",
    line: "Instant 0.5% return on every single pack & bet",
    body: "Funded directly by Packy for our players. Earn 0.5% instant cash rakeback on all eligible wager volume made under code Max.",
    tag: "0.5% Rakeback"
  },
  {
    id: "packy-lossback",
    title: "4% – 10% Lossback Bonus",
    line: "Weekly safety net on net losses",
    body: "Claim 4% to 10% lossback every week on packy.gg net losses. Paid directly to your account or wallet via our Discord support.",
    tag: "4-10% Lossback"
  }
];

export const maxFaq = [
  {
    q: "What rewards do I get on packy.gg with code Max?",
    a: "When you sign up on packy.gg with affiliate code 'Max', you get instant access to the $100 Leaderboard (25% NGR), 0.5% instant cash rakeback, 4%–10% weekly lossback, and Pokémon card VIP transfers!"
  },
  {
    q: "How do I claim my 0.5% instant rakeback and weekly lossback?",
    a: "Simply wager on packy.gg under code 'Max'. 0.5% rakeback is automatically earned on every eligible wager, and weekly lossback (4%–10%) is distributed directly via our Discord support!"
  },
  {
    q: "What affiliate code should I use?",
    a: "Always use code 'Max' on packy.gg to ensure your wagers are tracked for the $100 leaderboard, rakeback, and physical Pokémon card rewards."
  },
  {
    q: "How does the packy.gg $100 leaderboard work?",
    a: "Packy funds a $100 leaderboard with 25% NGR for players using code Max. It is hosted directly on-site using Endpoint 2, with wagers weighted 0.5x for Keno & Upgrader and 1.0x for Packs & Battles. Top 3 players split $50, $30, and $20!"
  },
  {
    q: "What is the Packy VIP Transfer and Pokémon card perk?",
    a: "Packy offers a VIP transfer for players with code Max: 10% weekly deposit bonus, up to 15% lossback, 0.5% instant rakeback on wager, and 4%–10% lossback. Reach $10k wager to complete your transfer, and at $25k wager you get an authentic physical Pokémon card shipped to you!"
  },
  {
    q: "How do I claim my lossback and VIP reloads?",
    a: "Submit a claim ticket in our Discord (https://discord.gg/8qF2S3YzeP) with your username. Approved rewards and reloads are sent straight to your account!"
  }
];

export const nr = (e: any, t = 0) =>
  Number(e || 0).toLocaleString("en-US", {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  });

export interface Player {
  rank: number;
  name: string;
  wagered: number;
  prize?: number;
  avatar: string | null;
}

export interface BoardData {
  site: string;
  name?: string;
  pool: number;
  players: Player[];
  endsAt: number;
  live?: boolean;
  lastUpdated?: number;
  source?: string;
  weightedNote?: string;
  ngr?: string;
  vipTransfer?: {
    depositBonus: string;
    lossback: string;
    transferWager: number;
    pokemonCardWager?: number;
    pokemonCardNote?: string;
  };
}

export const rainBoard: BoardData = {
  site: "rain",
  name: "rain.gg",
  pool: 0,
  endsAt: 0,
  live: false,
  weightedNote: "Code Maxs • 3 Free Cases on Signup + 5% Deposit Bonus",
  players: [
    { rank: 1, name: "cs****99", wagered: 3420.50, prize: 0, avatar: null },
    { rank: 2, name: "dr****77", wagered: 2640.20, prize: 0, avatar: null },
    { rank: 3, name: "kn****01", wagered: 1850.00, prize: 0, avatar: null },
    { rank: 4, name: "ak****bz", wagered: 1220.75, prize: 0, avatar: null },
    { rank: 5, name: "aw****x1", wagered: 950.40, prize: 0, avatar: null },
    { rank: 6, name: "gl****88", wagered: 720.10, prize: 0, avatar: null },
    { rank: 7, name: "us****gg", wagered: 550.60, prize: 0, avatar: null },
    { rank: 8, name: "m4****02", wagered: 380.25, prize: 0, avatar: null },
    { rank: 9, name: "de****44", wagered: 240.00, prize: 0, avatar: null },
    { rank: 10, name: "fa****90", wagered: 180.50, prize: 0, avatar: null },
    { rank: 11, name: "hy****33", wagered: 120.90, prize: 0, avatar: null },
    { rank: 12, name: "op****55", wagered: 90.40, prize: 0, avatar: null },
    { rank: 13, name: "ze****71", wagered: 60.20, prize: 0, avatar: null },
    { rank: 14, name: "sk****28", wagered: 40.15, prize: 0, avatar: null },
    { rank: 15, name: "pr****64", wagered: 20.80, prize: 0, avatar: null }
  ]
};

export const packyBoard: BoardData = {
  site: "packy",
  name: "packy.gg",
  pool: 100,
  endsAt: Date.now() + 10 * 86400 * 1000 + 4 * 3600 * 1000,
  live: true,
  weightedNote: "Hosted on-site (Endpoint 2) • Wagers weighted 0.5x for Keno & Upgrader • 1.0x for Packs & Battles",
  ngr: "25% NGR + $100 Leaderboard funded by Packy",
  vipTransfer: {
    depositBonus: "10% weekly deposit bonus",
    lossback: "Up to 15% lossback",
    transferWager: 10000,
    pokemonCardWager: 25000,
    pokemonCardNote: "At 25k wager: Random authentic Pokémon card shipped to you (cards get better the more you wager!)"
  },
  players: [
    { rank: 1, name: "Ch****99", wagered: 940.50, prize: 50, avatar: null },
    { rank: 2, name: "Pk****77", wagered: 520.10, prize: 30, avatar: null },
    { rank: 3, name: "Lu****X1", wagered: 245.80, prize: 20, avatar: null },
    { rank: 4, name: "Ge****bz", wagered: 138.80, prize: 0, avatar: null },
    { rank: 5, name: "As****01", wagered: 92.50, prize: 0, avatar: null },
    { rank: 6, name: "Ry****gg", wagered: 64.20, prize: 0, avatar: null },
    { rank: 7, name: "Bl****pk", wagered: 45.00, prize: 0, avatar: null },
    { rank: 8, name: "Ve****08", wagered: 32.50, prize: 0, avatar: null },
    { rank: 9, name: "Sn****22", wagered: 24.00, prize: 0, avatar: null },
    { rank: 10, name: "Pi****55", wagered: 18.00, prize: 0, avatar: null },
    { rank: 11, name: "Me****90", wagered: 14.50, prize: 0, avatar: null },
    { rank: 12, name: "Dr****33", wagered: 11.20, prize: 0, avatar: null },
    { rank: 13, name: "To****10", wagered: 8.40, prize: 0, avatar: null },
    { rank: 14, name: "Ka****64", wagered: 6.00, prize: 0, avatar: null },
    { rank: 15, name: "Um****07", wagered: 4.80, prize: 0, avatar: null }
  ]
};

export const cv: Record<string, BoardData> = {
  rain: rainBoard,
  packy: packyBoard
};

export const dv: any = {
  viewers: 150,
  title: "MAX Degens Live • Code Max & Maxs"
};
export const fv = "2,499";

export const pv = [
  {
    title: "MAX Degens High Roller Session • Code Max",
    start: "2026-09-18 13:26:22",
    duration: 1997000,
    views: 840,
    thumb: "/img/stream-cover.webp",
    uuid: "84d0a2832137e7ba-max-session-max"
  },
  {
    title: "High Stakes packy.gg & rain.gg Grind • Code Max",
    start: "2026-09-16 20:15:00",
    duration: 7200000,
    views: 1420,
    thumb: "/img/stream-cover.webp",
    uuid: "max-packy-session-code-max"
  },
  {
    title: "Big Bonus Buys & $100 Packy Race Grind",
    start: "2026-09-14 18:30:00",
    duration: 5400000,
    views: 1890,
    thumb: "/img/stream-cover.webp",
    uuid: "max-bonus-buys-packy-race"
  },
  {
    title: "Weekly Boosts Drop & Community Giveaways",
    start: "2026-09-12 19:45:00",
    duration: 6100000,
    views: 2150,
    thumb: "/img/stream-cover.webp",
    uuid: "max-weekly-boosts-drop"
  }
];

export const hv = [
  {
    id: "clip_max_01",
    title: "INSANE MAX WIN ON PACKY.GG",
    views: 890,
    duration: 30,
    thumb: "/img/stream-cover.webp",
    by: "MaxDegenMod",
    at: "2026-09-18T14:32:33.680883Z"
  },
  {
    id: "clip_max_02",
    title: "Max Multiplier Hit on Mystery Packs",
    views: 750,
    duration: 29,
    thumb: "/img/stream-cover.webp",
    by: "DegenKing",
    at: "2026-09-16T21:23:19.989461Z"
  },
  {
    id: "clip_max_03",
    title: "Massive packy.gg Run Code Max",
    views: 620,
    duration: 31,
    thumb: "/img/stream-cover.webp",
    by: "DegenSquad",
    at: "2026-09-14T19:01:15.991442Z"
  }
];

export const mv = {
  live: dv,
  followers: fv,
  vods: pv,
  clips: hv
};

export const Pn = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const au = (e: number) => {
  const t = Math.round(e > 10000 ? e / 1000 : e),
    n = Math.floor(t / 3600),
    r = Math.floor((t % 3600) / 60);
  return n
    ? `${n}:${String(r).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`
    : `${r}:${String(t % 60).padStart(2, "0")}`;
};

export const vv = (e: any) => {
  const t = Date.parse(
      String(e).replace(" ", "T") + (/[zZ+]/.test(String(e).slice(10)) ? "" : "Z")
    ),
    n = Math.max(0, (Date.now() - t) / 1000);
  if (n < 3600) return `${Math.max(1, Math.round(n / 60))}m ago`;
  if (n < 86400) return `${Math.round(n / 3600)}h ago`;
  const r = Math.round(n / 86400);
  return r < 45 ? `${r}d ago` : `${Math.round(r / 30)}mo ago`;
};

let ou: any;

export function gv(e: string) {
  const t = document.getElementById("toast");
  if (t) {
    t.textContent = e;
    t.classList.add("on");
    clearTimeout(ou);
    ou = setTimeout(() => t.classList.remove("on"), 1800);
  }
}

export function yv(c: string = I.code) {
  const e = () => gv(`Code ${c} copied`);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(c).then(e, e);
  } else {
    e();
  }
}

export function wv(e = 1000) {
  const [t, n] = useState(Date.now());
  useEffect(() => {
    const r = setInterval(() => n(Date.now()), e);
    return () => clearInterval(r);
  }, [e]);
  return t;
}

export function xv(e: number) {
  const t = Math.max(0, Math.floor(e / 1000));
  return {
    d: Math.floor(t / 86400),
    h: Math.floor((t % 86400) / 3600),
    m: Math.floor((t % 3600) / 60),
    s: t % 60
  };
}

export function kv() {
  const [e, t] = useState<any>(() => ({ ...mv, snap: true }));
  useEffect(() => {
    let n = false;
    Promise.allSettled([
      fetch("https://kick.com/api/v2/channels/maxdegens").then(r => (r.ok ? r.json() : null)),
      fetch("https://kick.com/api/v2/channels/maxdegens/videos").then(r => (r.ok ? r.json() : null))
    ])
      .then(([chanRes, vidsRes]) => {
        if (n) return;
        const channel = chanRes.status === "fulfilled" ? chanRes.value : null;
        const videos = vidsRes.status === "fulfilled" ? vidsRes.value : null;

        if (channel) {
          const liveInfo = channel.livestream
            ? {
                viewers: channel.livestream.viewer_count || 1,
                title: channel.livestream.session_title || "MAX DEGENS LIVE ON KICK"
              }
            : channel.is_live
            ? { viewers: 100, title: "MAX DEGENS LIVE" }
            : null;

          const realFollowers = channel.followers_count
            ? Number(channel.followers_count).toLocaleString()
            : "2,499+";

          const realVods =
            Array.isArray(videos) && videos.length > 0
              ? videos.map((v: any) => ({
                  title: v.session_title || v.slug || "MAX Kick Stream",
                  start: v.start_time || v.created_at,
                  duration: v.duration || 3600000,
                  views: v.viewer_count || 350,
                  thumb: v.thumbnail?.src || "/img/stream-cover.webp",
                  uuid: v.slug || String(v.id)
                }))
              : mv.vods;

          t((prev: any) => ({
            ...prev,
            live: liveInfo,
            followers: realFollowers,
            vods: realVods,
            snap: false
          }));
        }
      })
      .catch(() => {});
    return () => {
      n = true;
    };
  }, []);
  return e;
}

export function Sv() {
  const [e, t] = useState<Record<string, BoardData>>(() =>
    Object.fromEntries(xr.map(n => [n, { ...cv[n], lastUpdated: Date.now() }]))
  );

  const fetchBoard = (r: string) => {
    fetch(`/api/board?site=${r}`)
      .then(l => (l.ok ? l.json() : Promise.reject()))
      .then(l => {
        if (l && l.players) {
          t(a => ({
            ...a,
            [r]: {
              ...a[r],
              ...l,
              lastUpdated: l.lastUpdated || Date.now(),
              players: l.players.map((s: any, u: number) => ({
                ...s,
                rank: s.rank ?? u + 1
              })),
              live: l.live ?? a[r]?.live ?? false
            }
          }));
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    let unmounted = false;
    const run = () => {
      if (unmounted) return;
      xr.forEach(r => fetchBoard(r));
    };
    run();
    const timer = setInterval(run, 10000); 
    return () => {
      unmounted = true;
      clearInterval(timer);
    };
  }, []);

  return e;
}

export function jv(e?: any) {
  useEffect(() => {
    const t = [...document.querySelectorAll(".rv:not(.in)")];
    if (Pn() || !("IntersectionObserver" in window)) {
      t.forEach(r => r.classList.add("in"));
      return;
    }
    const n = new IntersectionObserver(
      r =>
        r.forEach(l => {
          if (l.isIntersecting) {
            l.target.classList.add("in");
            n.unobserve(l.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    t.forEach(r => n.observe(r));
    return () => n.disconnect();
  }, [e]);
}

export function Io(e = 10) {
  const t = useRef<any>(null);
  useEffect(() => {
    const n = t.current;
    if (!n || Pn() || !window.matchMedia("(hover: hover)").matches) return;
    const r = (i: PointerEvent) => {
      const a = n.getBoundingClientRect(),
        s = (i.clientX - a.left) / a.width - 0.5,
        u = (i.clientY - a.top) / a.height - 0.5;
      n.style.setProperty("--rx", `${(-u * e).toFixed(2)}deg`);
      n.style.setProperty("--ry", `${(s * e).toFixed(2)}deg`);
      n.style.setProperty("--mx", `${((s + 0.5) * 100).toFixed(1)}%`);
      n.style.setProperty("--my", `${((u + 0.5) * 100).toFixed(1)}%`);
    };
    const l = () => {
      n.style.setProperty("--rx", "0deg");
      n.style.setProperty("--ry", "0deg");
    };
    n.addEventListener("pointermove", r);
    n.addEventListener("pointerleave", l);
    return () => {
      n.removeEventListener("pointermove", r);
      n.removeEventListener("pointerleave", l);
    };
  }, [e]);
  return t;
}

export function Ev({ value: e, dec: t = 0 }: { value: number; dec?: number }) {
  const n = useRef<any>(null),
    [r, l] = useState(Pn() ? e : 0);
  useEffect(() => {
    if (Pn()) return l(e);
    const i = n.current;
    let a: number;
    const s = () => {
      const c = performance.now(),
        p = (m: number) => {
          const v = Math.min(1, (m - c) / 1400);
          l(e * (1 - Math.pow(1 - v, 3)));
          if (v < 1) a = requestAnimationFrame(p);
        };
      a = requestAnimationFrame(p);
    };
    const u = new IntersectionObserver(([c]) => {
      if (c.isIntersecting) {
        s();
        u.disconnect();
      }
    });
    u.observe(i);
    return () => {
      u.disconnect();
      cancelAnimationFrame(a);
    };
  }, [e]);
  return <span ref={n}>{nr(r, t)}</span>;
}

export const A = {
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  copy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2.5" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </svg>
  ),
  kick: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 2h6v5h2V5h2V3h2V2h6v7h-2v2h-2v2h2v2h2v7h-6v-1h-2v-2h-2v-2H9v5H3V2Z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  discord: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.245.198.372.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7L8 5Z" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 11v6M12 7.5v.01" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />
    </svg>
  ),
  betzoneLogo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>
    </svg>
  )
};

export function MaxDegenFigure({ className = "", alt = "MAX Crown", eager }: { className?: string; alt?: string; eager?: boolean }) {
  return (
    <span className={"cat maxdegen-fig " + className}>
      <img
        src="/img/crown.svg"
        alt={alt}
        width="256"
        height="320"
        loading={eager ? "eager" : "lazy"}
        draggable="false"
        style={{ filter: "drop-shadow(0 14px 28px rgba(0, 0, 0, 0.75)) drop-shadow(0 0 35px rgba(247, 201, 72, 0.65))" }}
      />
    </span>
  );
}

export function CrownFigure({ className = "", alt = "MAX Crown", eager }: { className?: string; alt?: string; eager?: boolean }) {
  return (
    <span className={"cat " + className}>
      <img
        src="/img/crown.svg"
        alt={alt}
        width="256"
        height="320"
        loading={eager ? "eager" : "lazy"}
        draggable="false"
        style={{ filter: "drop-shadow(0 12px 28px rgba(139, 61, 255, 0.45))" }}
      />
    </span>
  );
}

export function PlanetSphere({ className = "", children, style }: { className?: string; children?: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span className={"planet " + className} style={style}>
      <span className="planet-skin" aria-hidden="true" />
      <span className="planet-shade" aria-hidden="true" />
      {children}
    </span>
  );
}

export function Ge({ v: e, unit: t = "$", dec: n = 0, count: r }: { v: any; unit?: string; dec?: number; count?: boolean }) {
  let l = r ? <Ev value={e} dec={n} /> : nr(e, n);
  if (Number(e || 0) === 0) {
    l = n === 2 ? "00.00" : "00";
  }
  return t === "gem" ? (
    <span className="money gem">
      <img src="/img/gem.svg" alt="gems" width="16" height="16" />
      {l}
    </span>
  ) : (
    <span className="money">
      {t}
      {l}
    </span>
  );
}

export function Ao({ big: e, code: c }: { big?: boolean; code?: string }) {
  const targetCode = c || I.code;
  return (
    <button
      type="button"
      className={"code-chip" + (e ? " big" : "")}
      onClick={() => yv(targetCode)}
      aria-label={`Copy code ${targetCode}`}
    >
      <span className="cc-k">Code</span>
      <b>{targetCode}</b>
      <span className="cc-i">{A.copy}</span>
    </button>
  );
}

export function Countdown({ end: e, compact: t, live }: { end?: number; compact?: boolean; live?: boolean }) {
  const [rem, setRem] = useState(() => (e && e > Date.now() ? Math.max(0, Math.floor((e - Date.now()) / 1000)) : 0));

  useEffect(() => {
    if (!e || e <= Date.now() || !live) return;
    const timer = setInterval(() => {
      const left = Math.max(0, Math.floor((e - Date.now()) / 1000));
      setRem(left);
    }, 1000);
    return () => clearInterval(timer);
  }, [e, live]);

  if (!live || !e || e <= Date.now()) {
    return (
      <span className="cd-soon-plain" aria-label="Community Rewards">
        <i className="dot pulse" /> Community Rewards
      </span>
    );
  }

  const d = Math.floor(rem / 86400);
  const h = Math.floor((rem % 86400) / 3600);
  const m = Math.floor((rem % 3600) / 60);
  const s = rem % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  if (t) {
    return (
      <span className="cd-soon-plain" style={{ color: "#38bdf8" }}>
        <i className="dot live" /> {d}d {pad(h)}h {pad(m)}m {pad(s)}s left
      </span>
    );
  }

  return (
    <div className="cd-big" role="timer" aria-label="Countdown">
      <div className="cd-cell"><span className="cd-val">{pad(d)}</span><span className="cd-lbl">Days</span></div>
      <span className="cd-sep">:</span>
      <div className="cd-cell"><span className="cd-val">{pad(h)}</span><span className="cd-lbl">Hours</span></div>
      <span className="cd-sep">:</span>
      <div className="cd-cell"><span className="cd-val">{pad(m)}</span><span className="cd-lbl">Mins</span></div>
      <span className="cd-sep">:</span>
      <div className="cd-cell"><span className="cd-val">{pad(s)}</span><span className="cd-lbl">Secs</span></div>
    </div>
  );
}

export function Nv() {
  const e = useRef<any>(null);
  useEffect(() => {
    const t = e.current;
    if (!t) return;
    const n = t.getContext("2d", { alpha: true });
    if (!n) return;
    const r = Pn();
    let l: number,
      i: number,
      a: number,
      s: any[] = [],
      u: any[] = [],
      c: number,
      p: any = null,
      m = performance.now();

    const v = () => {
      a = Math.min(1.25, window.devicePixelRatio || 1);
      l = t.width = Math.floor(innerWidth * a);
      i = t.height = Math.floor(innerHeight * a);
      t.style.width = innerWidth + "px";
      t.style.height = innerHeight + "px";
      const k = Math.min(45, Math.round((innerWidth * innerHeight) / 22000));
      s = Array.from({ length: k }, () => ({
        x: Math.random() * l,
        y: Math.random() * i,
        r: Math.max(1, (Math.random() * 1.2 + 0.3) * a),
        p: Math.random() * Math.PI * 2,
        z: Math.random() * 0.5 + 0.2,
        hue: Math.random() < 0.2 ? 270 : Math.random() < 0.1 ? 150 : 0
      }));
      u = [];
    };

    v();
    window.addEventListener("resize", v, { passive: true });

    const y = (k: number) => {
      const E = Math.min(40, k - m);
      m = k;
      n.clearRect(0, 0, l, i);
      const f = window.scrollY * a;

      for (let idx = 0; idx < s.length; idx++) {
        const d = s[idx];
        const h = 0.35 + 0.65 * Math.abs(Math.sin(d.p + k * 0.0009 * d.z * 2)),
          w = (((d.y - f * d.z * 0.2) % i) + i) % i;
        n.globalAlpha = r ? 0.6 : h;
        n.fillStyle =
          d.hue === 270 ? "#c9a6ff" : d.hue === 150 ? "#34d399" : "#ffffff";
        n.fillRect(d.x, w, d.r, d.r);
      }

      if (!r) {
        if (u.length < 15 && Math.random() < 0.12) {
          u.push({
            x: Math.random() * l,
            y: i + 10,
            r: (Math.random() * 1.8 + 0.8) * a,
            vy: (Math.random() * 0.45 + 0.2) * a,
            vx: (Math.random() - 0.5) * 0.25 * a,
            a: Math.random() * 0.5 + 0.2
          });
        }
        for (let d = u.length - 1; d >= 0; d--) {
          const h = u[d];
          h.y -= h.vy * (E / 16);
          h.x += h.vx * (E / 16);
          h.r -= 0.003 * a * (E / 16);
          if (h.r <= 0.2 || h.y < -10) {
            u.splice(d, 1);
            continue;
          }
          n.globalAlpha = h.a;
          n.fillStyle = "#8b3dff";
          n.fillRect(h.x, h.y, h.r, h.r);
        }
        if (!p && Math.random() < 0.002) {
          p = {
            x: Math.random() * l * 0.7 + l * 0.2,
            y: Math.random() * i * 0.35,
            l: 0
          };
        }
        if (p) {
          p.l += E * 0.9 * a;
          const d = 130 * a,
            h = p.x - p.l,
            w = p.y + p.l * 0.45;
          n.globalAlpha = 0.75;
          n.strokeStyle = "rgba(200, 180, 255, 0.6)";
          n.lineWidth = 1.4 * a;
          n.beginPath();
          n.moveTo(h, w);
          n.lineTo(h + d, w - d * 0.45);
          n.stroke();
          if (p.l > l * 0.6) p = null;
        }
      }
      n.globalAlpha = 1;
      if (!r) c = requestAnimationFrame(y);
    };

    c = requestAnimationFrame(y);

    const x = () => {
      cancelAnimationFrame(c);
      if (!document.hidden && !r) {
        m = performance.now();
        c = requestAnimationFrame(y);
      }
    };

    document.addEventListener("visibilitychange", x);
    return () => {
      cancelAnimationFrame(c);
      window.removeEventListener("resize", v);
      document.removeEventListener("visibilitychange", x);
    };
  }, []);

  return (
    <div className="space" aria-hidden="true">
      <canvas ref={e} />
      <span className="neb n1" />
      <span className="neb n2" />
    </div>
  );
}

export function Cv() {
  return false;
}

export function Pv() {
  const [mounted, setMounted] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.add("intro-lock");

    const outTimer = setTimeout(() => {
      setLeaving(true);
    }, 3200);

    const endTimer = setTimeout(() => {
      document.documentElement.classList.remove("intro-lock");
      setMounted(false);
    }, 3900);

    return () => {
      clearTimeout(outTimer);
      clearTimeout(endTimer);
      document.documentElement.classList.remove("intro-lock");
    };
  }, [mounted]);

  const handleSkip = () => {
    setLeaving(true);
    setTimeout(() => {
      document.documentElement.classList.remove("intro-lock");
      setMounted(false);
    }, 650);
  };

  if (!mounted) return null;

  return (
    <div
      className={"intro" + (leaving ? " out" : "")}
      role="dialog"
      aria-label="Welcome to MAX"
    >
      <div className="warp" aria-hidden="true">
        {Array.from({ length: 32 }).map((_, i) => (
          <i
            key={i}
            style={
              {
                "--a": `${i * 11.25}deg`,
                "--d": `${((i % 8) * 0.12).toFixed(2)}s`
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="intro-word" aria-label="MAX DEGENS">
        {"MAX DEGENS".split("").map((c, i) => (
          <span key={i} style={{ "--i": i } as React.CSSProperties}>
            {c === " " ? "\u00A0" : c}
          </span>
        ))}
      </div>

      <div className="intro-stage">
        <PlanetSphere className="intro-planet" />
        <div className="intro-max-emblem">
          <img
            src="/img/max-wordmark-tight.png"
            alt="MAX"
            width="781"
            height="512"
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "781 / 512",
              filter:
                "drop-shadow(0 16px 32px rgba(0,0,0,.85)) drop-shadow(0 0 45px rgba(139,61,255,.7)) drop-shadow(0 0 20px rgba(34,227,154,.4))"
            }}
          />
        </div>
      </div>

      <div className="intro-sub">OFFICIAL MAX DEGENS COMMUNITY HUB</div>

      <button
        type="button"
        className="intro-skip"
        onClick={handleSkip}
        aria-label="Skip Intro Animation"
      >
        Skip ✕
      </button>
    </div>
  );
}

export function SideMenu({
  isOpen,
  onClose,
  live
}: {
  isOpen: boolean;
  onClose: () => void;
  live?: boolean;
}) {
  const loc = useLocation();

  useEffect(() => {
    onClose();
  }, [loc.pathname]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const copyCode = (c: string = "Maxs") => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(c);
    }
    gv(`Code ${c} copied!`);
  };

  return (
    <>
      <div
        className={"side-drawer-backdrop" + (isOpen ? " open" : "")}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={"side-drawer" + (isOpen ? " open" : "")}
        aria-label="Side Navigation Menu"
      >
        <div className="side-drawer-header">
          <Link to="/" className="brand" onClick={onClose} aria-label="MAX Home">
            <span className="brand-cat" style={{ display: "flex", alignItems: "center" }}>
              <img src="/img/crown-sm.svg" alt="MAX" width="28" height="28" />
            </span>
            <span className="brand-w">MAX</span>
          </Link>
          <button
            type="button"
            className="side-drawer-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="side-nav-list" aria-label="Sidebar Links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => "side-nav-item" + (isActive ? " active" : "")}
            onClick={onClose}
          >
            <span className="side-nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </span>
            <div className="side-nav-content">
              <span className="side-nav-title">Home</span>
              <span className="side-nav-desc">Cosmic Headquarters</span>
            </div>
          </NavLink>

          <NavLink
            to="/leaderboard"
            className={({ isActive }) => "side-nav-item" + (isActive ? " active" : "")}
            onClick={onClose}
          >
            <span className="side-nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
            </span>
            <div className="side-nav-content">
              <span className="side-nav-title">
                Leaderboards
                <span className="cd-soon" style={{ fontSize: "11px", background: "rgba(0,132,255,0.2)", color: "#38bdf8" }}>Live</span>
              </span>
              <span className="side-nav-desc">Packy ($100 LB) & Rain (3 Cases)</span>
            </div>
          </NavLink>

          <NavLink
            to="/rewards"
            className={({ isActive }) => "side-nav-item" + (isActive ? " active" : "")}
            onClick={onClose}
          >
            <span className="side-nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 12 20 22 4 22 4 12" />
                <rect x="2" y="7" width="20" height="5" />
                <line x1="12" y1="22" x2="12" y2="7" />
              </svg>
            </span>
            <div className="side-nav-content">
              <span className="side-nav-title">
                Rewards & Bonuses
                <em className="new" style={{ background: "linear-gradient(135deg,#0084FF,#FF2453)", color: "#FFFFFF" }}>VIP Hub</em>
              </span>
              <span className="side-nav-desc">VIP Transfers, Lossback & Pokémon Cards</span>
            </div>
          </NavLink>

          <a
            href={I.kick}
            target="_blank"
            rel="noreferrer"
            className="side-nav-item"
          >
            <span className="side-nav-icon" style={{ color: "#53fc18" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 3h5v5h3V5h4V3h4v8h-3v3h3v8h-4v-2h-4v-3H9v5H4V3z" />
              </svg>
            </span>
            <div className="side-nav-content">
              <span className="side-nav-title">
                Kick Stream
                {live ? (
                  <span className="live-inline" style={{ fontSize: "11px" }}>
                    <i className="dot" /> LIVE
                  </span>
                ) : (
                  <span style={{ fontSize: "11px", color: "var(--dim)" }}>Follow</span>
                )}
              </span>
              <span className="side-nav-desc">kick.com/{I.handle}</span>
            </div>
          </a>
        </nav>

        <div className="side-quick-card" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#38bdf8", display: "flex", alignItems: "center", gap: "6px" }}>
                <img src="/img/image-8.png" alt="packy.gg" style={{ height: "14px", objectFit: "contain" }} /> packy.gg
              </span>
              <span style={{ fontSize: "10px", background: "#0084FF", color: "#fff", padding: "1px 6px", borderRadius: 4, fontWeight: 800 }}>$100 RACE</span>
            </div>
            <button
              type="button"
              className="side-code-btn"
              onClick={() => copyCode("Max")}
              aria-label="Copy code Max"
              style={{ width: "100%", marginBottom: "6px" }}
            >
              <span>
                <span style={{ fontSize: "10px", opacity: 0.7, textTransform: "uppercase", display: "block" }}>Code</span>
                <b style={{ color: "#38bdf8" }}>Max</b>
              </span>
              <span className="code-copy-pill" style={{ background: "rgba(0,132,255,0.25)", color: "#38bdf8", padding: "3px 8px", borderRadius: 6, fontSize: "11px" }}>
                Copy {A.copy}
              </span>
            </button>
            <a
              className="side-betzone-btn"
              href={I.packy}
              target="_blank"
              rel="noreferrer"
              style={{ background: "linear-gradient(135deg, #0084FF, #38BDF8)", color: "#fff", display: "block", textAlign: "center", padding: "8px", borderRadius: "8px", fontSize: "12px", fontWeight: 700 }}
            >
              Play on packy.gg {A.arrow}
            </a>
          </div>

          {}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "10px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#38bdf8", display: "flex", alignItems: "center", gap: "6px" }}>
                <img src="/img/IMG_eb918c47-61dd-480d-92d5-29d6010d1c08.png" alt="rain.gg" style={{ height: "14px", objectFit: "contain" }} /> rain.gg
              </span>
              <span style={{ fontSize: "10px", background: "linear-gradient(135deg,#0084FF,#38BDF8)", color: "#fff", padding: "1px 6px", borderRadius: 4, fontWeight: 800 }}>3 CASES</span>
            </div>
            <button
              type="button"
              className="side-code-btn"
              onClick={() => copyCode("Maxs")}
              aria-label="Copy code Maxs"
              style={{ width: "100%", marginBottom: "6px" }}
            >
              <span>
                <span style={{ fontSize: "10px", opacity: 0.7, textTransform: "uppercase", display: "block" }}>Code</span>
                <b style={{ color: "#38bdf8" }}>Maxs</b>
              </span>
              <span className="code-copy-pill" style={{ background: "rgba(0,132,255,0.25)", color: "#38bdf8", padding: "3px 8px", borderRadius: 6, fontSize: "11px" }}>
                Copy {A.copy}
              </span>
            </button>
            <a
              className="side-betzone-btn"
              href="https://rain.gg/r/Maxs"
              target="_blank"
              rel="noreferrer"
              style={{ background: "linear-gradient(135deg, #0084FF, #0052D4)", color: "#fff", display: "block", textAlign: "center", padding: "8px", borderRadius: "8px", fontSize: "12px", fontWeight: 700 }}
            >
              Play on rain.gg {A.arrow}
            </a>
          </div>

          <div className="side-social-row" style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 6 }}>
            <a
              href={I.kick}
              target="_blank"
              rel="noreferrer"
              style={{ display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 10, border: "1px solid var(--line)", color: "var(--mute)" }}
              aria-label="Kick"
            >
              {A.kick}
            </a>
            <a
              href={I.x}
              target="_blank"
              rel="noreferrer"
              style={{ display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 10, border: "1px solid var(--line)", color: "var(--mute)" }}
              aria-label="X"
            >
              {A.x}
            </a>
            <a
              href={I.discord}
              target="_blank"
              rel="noreferrer"
              style={{ display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 10, border: "1px solid var(--line)", color: "var(--mute)" }}
              aria-label="Discord"
            >
              {A.discord}
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}

export function Rv({ live: e }: { live?: boolean }) {
  const [sideOpen, setSideOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();

  useEffect(() => {
    const a = () => setScrolled(window.scrollY > 24);
    a();
    window.addEventListener("scroll", a, { passive: true });
    return () => window.removeEventListener("scroll", a);
  }, []);

  return (
    <>
      <header className={"nav" + (scrolled ? " solid" : "")}>
        <div className="nav-in">
          <Link to="/" className="brand" aria-label="MAX home">
            <span className="brand-cat" style={{ display: "flex", alignItems: "center" }}>
              <img src="/img/crown-sm.svg" alt="MAX" width="32" height="32" />
            </span>
            <span className="brand-w">MAX</span>
          </Link>
          <nav className="nav-links" aria-label="Main">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink
              to="/leaderboard"
              className={() => (loc.pathname.startsWith("/leaderboard") ? "active" : "")}
            >
              Leaderboard
            </NavLink>
            <NavLink to="/rewards">
              Rewards <em className="new" style={{ background: "linear-gradient(135deg,#0084FF,#FF2453)", color: "#FFFFFF" }}>VIP Hub</em>
            </NavLink>
          </nav>
          <div className="nav-r">
            <a
              className={"live-pill" + (e ? " on" : "")}
              href={I.kick}
              target="_blank"
              rel="noreferrer"
            >
              <i className="dot" />
              {e ? "Live" : "Kick"}
            </a>
            <Ao />
            <button
              type="button"
              className="menu-option-btn"
              aria-label="Open Navigation Options"
              onClick={() => setSideOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <SideMenu isOpen={sideOpen} onClose={() => setSideOpen(false)} live={e} />
    </>
  );
}

export function _v() {
  return (
    <footer className="foot">
      <div className="shell foot-in">
        <div className="foot-brand">
          <Link to="/" className="brand">
            <span className="brand-cat" style={{ display: "flex", alignItems: "center" }}>
              <img
                src="/img/crown-sm.svg"
                alt="MAX"
                width="32"
                height="32"
                loading="lazy"
              />
            </span>
            <span className="brand-w">MAX</span>
          </Link>
          <p>
            Official packy.gg partner hub with code <b>Max</b>: $100 leaderboard (25% NGR), 0.5% instant rakeback, 4%–10% lossback, and Pokémon Card VIP transfers.{" "}
            {I.tagline}
          </p>
          <div className="socials-mini">
            <a href={I.kick} target="_blank" rel="noreferrer" aria-label="Kick">
              {A.kick}
            </a>
            <a href={I.x} target="_blank" rel="noreferrer" aria-label="X">
              {A.x}
            </a>
            <a href={I.discord} target="_blank" rel="noreferrer" aria-label="Discord">
              {A.discord}
            </a>
          </div>
        </div>
        <div className="foot-col">
          <span>Pages</span>
          <Link to="/">Home</Link>
          <Link to="/leaderboard">Leaderboards</Link>
          <Link to="/rewards">VIP Rewards</Link>
        </div>
        <div className="foot-col">
          <span>Partner Hubs</span>
          <a href={Be.packy?.url || I.packy} target="_blank" rel="noreferrer" style={{ color: "#0084FF", fontWeight: 700 }}>
            packy.gg (Code Max)
          </a>
          <a href={Be.rain?.url || "https://rain.gg/r/Maxs"} target="_blank" rel="noreferrer" style={{ color: "#38bdf8", fontWeight: 700 }}>
            rain.gg (Code Maxs)
          </a>
        </div>
        <div className="foot-col">
          <span>Connect</span>
          <a href={I.kick} target="_blank" rel="noreferrer">
            Kick stream
          </a>
          <a href={I.x} target="_blank" rel="noreferrer">
            X ({I.followers})
          </a>
          <a href={I.discord} target="_blank" rel="noreferrer">
            Discord ({I.discord.replace('https://', '')})
          </a>
        </div>
        <div className="foot-aware">
          <b>Responsible Gambling</b>
          <p>
            Gambling can be addictive and may lead to serious financial problems.
            If you or someone you know is struggling with gambling addiction, please
            seek help. 24/7 Problem Gambling Helpline: 1-800-522-4700 (National Council on Problem Gambling). 18+.
          </p>
        </div>
      </div>
      <div className="foot-bar">
        <div className="shell foot-bar-in">
          <small>© COPYRIGHT {new Date().getFullYear()} MAX. We do not take responsibility for any losses from gambling in casinos and betting sites linked or promoted. As a player, you are responsible for your bets.</small>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
            <small style={{ color: "var(--mute)", opacity: 0.85, fontSize: "12px", letterSpacing: "0.03em" }}>
              Created by <span style={{ color: "var(--v2)", fontWeight: 700 }}>warrior0g</span>
            </small>
            <small className="tnum" style={{ color: "#38bdf8" }}>Code Maxs · Code Max</small>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function _r({
  kicker: e,
  title: t,
  glow: n,
  children: r,
  center: l
}: {
  kicker?: React.ReactNode;
  title?: string;
  glow?: string;
  children?: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div className={"sec-head rv" + (l ? " center" : "")}>
      {e && <span className="kicker">{e}</span>}
      <h2>
        {t} {n && <span className="glow-t">{n}</span>}
      </h2>
      {r && <p>{r}</p>}
    </div>
  );
}

export const su = [
  "/img/sr-1.webp",
  "/img/sh-1.webp",
  "/img/sr-2.webp",
  "/img/sh-2.webp",
  "/img/sr-3.webp",
  "/img/sh-3.webp",
  "/img/sr-1.webp",
  "/img/sr-2.webp"
];

export function Lv() {
  const e = Io(8);

  return (
    <div className="stage" ref={e}>
      <span className="halo" aria-hidden="true" />
      <div className="stage-3d">
        <PlanetSphere className="hero-planet" />
        <div className="orbit" aria-hidden="true">
          <span className="orbit-line" />
          <span className="orbit-line o2" />
        </div>
        <div className="hero-max-planet-container">
          <div className="hero-max-planet-badge">
            <img
              src="/img/max-wordmark-tight.png"
              alt="MAX"
              className="hero-max-planet-img"
              loading="eager"
              draggable="false"
            />
          </div>
        </div>
        {}
        <div className="float gem g1" style={{ width: "64px", filter: "drop-shadow(0 0 18px rgba(0,132,255,0.8))" }}>
          <img src="/img/moonshine_kQTGwZ0AM.png" alt="Packy Booster Pack" style={{ width: "100%", height: "auto", objectFit: "contain", borderRadius: "6px" }} />
        </div>
        <div className="float gem g2" style={{ width: "90px", filter: "drop-shadow(0 0 18px rgba(0,132,255,0.8))" }}>
          <img src="/img/image-8.png" alt="packy.gg" style={{ width: "100%", height: "auto", objectFit: "contain" }} />
        </div>
        <div className="float gem g3" style={{ width: "64px", filter: "drop-shadow(0 0 18px rgba(56,189,248,0.8))", position: "absolute", top: "15%", right: "8%" }}>
          <img src="/img/rain.png" alt="Rain Loot Box" style={{ width: "100%", height: "auto", objectFit: "contain", borderRadius: "6px" }} />
        </div>
        <div className="float gem g4" style={{ width: "80px", filter: "drop-shadow(0 0 18px rgba(56,189,248,0.8))", position: "absolute", bottom: "15%", left: "8%" }}>
          <img src="/img/IMG_eb918c47-61dd-480d-92d5-29d6010d1c08.png" alt="rain.gg" style={{ width: "100%", height: "auto", objectFit: "contain" }} />
        </div>
        <span className="float chip c1" aria-hidden="true">
          M
        </span>
        <span className="float chip c2" aria-hidden="true">
          ✦
        </span>
      </div>
    </div>
  );
}

export function Tv({ boards: e, live: t }: { boards: Record<string, BoardData>; live?: boolean }) {
  return (
    <section className="hero">
      <div className="shell hero-in">
        <div className="hero-copy">
          <h1>
            <span className="h1-b">
              <em>Degens Vault</em>
            </span>
          </h1>
          <p className="lead">
            The official community hub for <b>MaxDegens</b>.
          </p>
          <div className="hero-cta" style={{ flexWrap: "wrap", gap: "10px" }}>
            <Ao big={true} code="Max" />
            <a className="btn primary" href={I.packy} target="_blank" rel="noreferrer" style={{ background: "linear-gradient(135deg, #0084FF 0%, #38BDF8 60%, #E5FE00 100%)", color: "#041527", fontWeight: 800 }}>
              <img src="/img/image-8.png" alt="" style={{ height: "16px", objectFit: "contain" }} /> Play on packy.gg {A.arrow}
            </a>
          </div>
          <dl className="hero-stats">
            <div>
              <dt>packy.gg Leaderboard</dt>
              <dd style={{ color: "#38bdf8" }}>
                $100 (25% NGR)
              </dd>
            </div>
            <div>
              <dt>packy.gg Leaderboard</dt>
              <dd>
                <Ge v={100} unit="$" count={false} /> <small style={{ fontSize: "11px", color: "var(--mute)" }}>(25% NGR)</small>
              </dd>
            </div>
            <div>
              <dt>packy.gg VIP Perks</dt>
              <dd style={{ color: "#38bdf8", fontSize: "15px" }}>
                Pokémon Cards & Lossback
              </dd>
            </div>
            <div>
              <dt>Kick Stream</dt>
              <dd>
                {t ? (
                  <a className="live-inline" href={I.kick} target="_blank" rel="noreferrer">
                    <i className="dot" /> Live now
                  </a>
                ) : (
                  <a href={I.kick} target="_blank" rel="noreferrer">
                    kick.com/{I.handle}
                  </a>
                )}
              </dd>
            </div>
          </dl>
        </div>
        <Lv />
      </div>
    </section>
  );
}

export function Mv() {
  const e = [
      "packy.gg: Code Max · Official Partner",
      "$100 Leaderboard (25% NGR Funded by Packy)",
      "Unbox Rare Pokémon Booster Packs & Battles",
      "0.5x Keno/Upgrader · 1.0x Packs/Battles",
      "VIP Transfer & Authentic Pokémon Card Shipments",
      "0.5% Instant Cash Rakeback on Every Bet",
      "4%–10% Weekly Lossback Protection",
      "Kick Stream Live: kick.com/MAXdegens",
      "Discord Community: discord.gg/8qF2S3YzeP"
    ],
    t = (
      <span className="mq-row">
        {e.map(n => (
          <span key={n}>
            {n} <i>✦</i>
          </span>
        ))}
      </span>
    );
  return (
    <div className="marquee" aria-label={e.join(" · ")}>
      <div className="mq-track" aria-hidden="true">
        {t}
        {t}
      </div>
    </div>
  );
}

export function WorldCard({ s: e, board: t }: { s: SiteInfo; board: BoardData }) {
  const n = Io(9);
  const b = t || cv[e.key] || (e.key === "rain" ? rainBoard : packyBoard);
  const isRain = e.key === "rain";
  const isPacky = e.key === "packy";

  return (
    <article
      className={"world rv fan-" + e.fanKind}
      style={{ "--ac": e.accent, "--ac-ink": e.accentInk } as any}
      ref={n}
    >
      <div className="world-in">
        <div className="fan" aria-hidden="true">
          {e.fan.map((r, l) => (
            <span key={l} className={"fan-card f" + (l + 1)}>
              <img src={r} alt="" loading="lazy" />
            </span>
          ))}
        </div>
        {e.logo ? (
          <img className="world-logo" src={e.logo} alt={e.name} loading="lazy" />
        ) : (
          <div style={{ fontSize: "28px", fontWeight: 900, fontFamily: "var(--fd)", color: "#FFFFFF", letterSpacing: "-0.02em", height: "52px", display: "flex", alignItems: "center" }}>
            {e.name}
          </div>
        )}
        <p className="world-blurb">{e.blurb}</p>
        <div className="world-pool">
          <span>$100 Leaderboard (25% NGR)</span>
          <b>
            <Ge v={b.pool} unit={e.unit} />
          </b>
          <small>
            {b.live ? (
              <Countdown end={b.endsAt} compact={true} live={true} />
            ) : (
              <Countdown end={b.endsAt} compact={true} live={false} />
            )}
          </small>
        </div>
        <div className="world-act">
          <a className="btn solid" href={e.url} target="_blank" rel="noreferrer">
            Sign up
          </a>
          <Link className="btn line" to={`/leaderboards/${e.key}`}>
            Board {A.arrow}
          </Link>
        </div>
      </div>
    </article>
  );
}

export function Dv({ boards: e }: { boards: Record<string, BoardData> }) {
  return (
    <section className="section" id="worlds">
      <div className="shell">
        <_r kicker="Partner Platform" title="MaxDegens" glow="Vault" center={true}>
          Official partner rewards hub.
        </_r>
        <div className="worlds" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", width: "100%", maxWidth: "1000px", margin: "0 auto" }}>
          <WorldCard s={Be.packy} board={e.packy || packyBoard} />
          <WorldCard s={Be.rain} board={e.rain || rainBoard} />
        </div>
      </div>
    </section>
  );
}

export function Qd({ p: e, size: t = 40 }: { p: Player; size?: number }) {
  const [n, r] = useState(false);
  if (e.avatar && !n)
    return (
      <img
        className="ava"
        src={e.avatar}
        alt=""
        width={t}
        height={t}
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={() => r(true)}
      />
    );
  const l =
    [...e.name].reduce((i, a) => i + a.charCodeAt(0), 0) % 360;
  return (
    <span
      className="ava ava-gen"
      style={{ "--h": l, width: t, height: t } as any}
      aria-hidden="true"
    >
      {e.name.replace(/[^a-z0-9]/gi, "").slice(0, 1).toUpperCase() || "?"}
    </span>
  );
}

export function Kd({ board: e, s: t }: { board: BoardData; s: SiteInfo }) {
  const players = e.players || [];
  if (players.length === 0) {
    return (
      <div className="podium rv" style={{ justifyContent: "center", padding: "30px 20px" }}>
        <div style={{
          background: "rgba(10, 22, 40, 0.7)",
          border: "1px dashed rgba(0, 132, 255, 0.35)",
          borderRadius: "16px",
          padding: "24px 32px",
          textAlign: "center",
          maxWidth: "460px"
        }}>
          <h4 style={{ margin: "0 0 6px", color: "#fff", fontSize: "16px" }}>Leaderboard Race In Progress</h4>
          <p style={{ margin: 0, color: "var(--mute)", fontSize: "13px", lineHeight: 1.5 }}>
            Standings are synchronizing with {t.name} on-site via Endpoint 2. Wager under code <b>Max</b> to claim #1!
          </p>
        </div>
      </div>
    );
  }

  const [n, r, l] = players,
    i = (a: Player | undefined, s: number) =>
      a && (
        <div key={s} className={"seat p" + s}>
          <div className="seat-orb">
            <PlanetSphere className="seat-planet">
              <Qd p={a} size={s === 1 ? 84 : 64} />
            </PlanetSphere>
            {s === 1 && (
              <svg className="crown" viewBox="0 0 64 44" aria-hidden="true">
                <path fill="currentColor" d="M4 12l14 12L32 2l14 22 14-12-6 28H10L4 12Z" />
                <circle cx="4" cy="12" r="4" fill="currentColor" />
                <circle cx="32" cy="3" r="4" fill="currentColor" />
                <circle cx="60" cy="12" r="4" fill="currentColor" />
              </svg>
            )}
            <span className="seat-n">{s}</span>
          </div>
          <b className="seat-name" title={a.name}>
            {a.name}
          </b>
          <span className="seat-w">
            <small>Wagered</small>
            <Ge v={a.wagered} unit={t.unit} dec={2} />
          </span>
          <span className="seat-prize">
            <Ge v={a.prize} unit={t.unit} />
          </span>
        </div>
      );

  return (
    <div className="podium rv">
      {i(r, 2)}
      {i(n, 1)}
      {i(l, 3)}
    </div>
  );
}

export function Fv({ board: e }: { board: BoardData }) {
  const t = Be.packy;
  const b = e || cv.packy || packyBoard;
  return (
    <section className="section peek">
      <div className="shell">
        <_r
          kicker={<><img src="/img/image-8.png" alt="packy.gg" style={{ height: "18px", verticalAlign: "-3px", marginRight: "6px", objectFit: "contain" }} /> $100 PACKY LEADERBOARD (25% NGR)</>}
          title="Packy"
          glow="Leaderboard"
          center={true}
        >
          Tracked live on-site with 25% NGR pool funding. Wager under code <b>Max</b> on packy.gg to compete for top prizes, instant rakeback, lossback, and physical Pokémon cards!
        </_r>
        <Kd board={b} s={t} />
        <div className="peek-cta rv">
          <Countdown end={b.endsAt} live={b.live} />
          <Link className="btn primary" to="/leaderboards/packy">
            Full Packy Leaderboard {A.arrow}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Ov() {
  return (
    <section className="section">
      <div className="shell">
        <Link to="/rewards" className="teaser rv">
          <div className="teaser-cat">
            <span className="ring-wave w1" />
            <span className="ring-wave w2" />
            <CrownFigure className="call-cat" />
            <span className="phone">{A.phone}</span>
          </div>
          <div className="teaser-copy">
            <span className="kicker">Community Exclusive · Code Max</span>
            <h2>
              Packy.gg VIP Perks & Vault? <span className="glow-t">Claim with MAX!</span>
            </h2>
            <p>
              $100 Leaderboard (25% NGR), 0.5% instant cash rakeback, 4%–10% weekly lossback, and authentic physical Pokémon cards shipped to your doorstep on packy.gg (Code Max).
            </p>
            <span className="btn primary">See all rewards {A.arrow}</span>
          </div>
        </Link>
      </div>
    </section>
  );
}

export function Iv({ kick: e }: { kick: any }) {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="section" id="stream">
      <div className="shell">
        <_r
          kicker="KICK.COM/MAXDEGENS"
          title="Tune into"
          glow="the MAX stream"
        >
          High stakes sessions, bonus hunts, massive buys and weekly giveaways.
          Hang in chat, play under code Max & Maxs, grab your share.
        </_r>

        <div className="stream-grid rv">
          <div className={"player" + (e.live ? " is-live" : "")}>
            {playing ? (
              <iframe
                src={`https://player.kick.com/${I.handle}?autoplay=true&muted=false`}
                title="MAX on Kick Live Stream"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen={true}
                className="kick-iframe"
              />
            ) : (
              <button
                type="button"
                className="player-cover"
                onClick={() => setPlaying(true)}
                aria-label="Play MAX live stream preview"
              >
                <img
                  src="/img/stream-cover.webp"
                  alt="MAX Kick Stream Preview"
                  loading="lazy"
                />
                <span className="play-ring">{A.play}</span>
                <span className="player-tag">
                  {e.live ? (
                    <>
                      <i className="dot" /> LIVE · {nr(e.live.viewers)} watching
                    </>
                  ) : (
                    "Watch on Kick"
                  )}
                </span>
                {e.live && <span className="player-title">{e.live.title}</span>}
              </button>
            )}
          </div>

          <div className="vods">
            <div className="vods-h">
              <b>Latest streams</b>
              <a href={`${I.kick}/videos`} target="_blank" rel="noreferrer">
                All VODs {A.arrow}
              </a>
            </div>
            <div className="vod-list">
              {e.vods.slice(0, 4).map((l: any) => (
                <a
                  key={l.uuid || l.start}
                  className="vod"
                  href={
                    l.uuid
                      ? `https://kick.com/${I.handle}/videos/${l.uuid}`
                      : I.kick
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="thumb">
                    {l.thumb && <img src={l.thumb} alt="" loading="lazy" />}
                    <em className="tnum">{au(l.duration)}</em>
                  </span>
                  <span className="vod-t">
                    <b>{l.title}</b>
                    <small>
                      {vv(l.start)} · {nr(l.views)} views
                    </small>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {e.clips && e.clips.length > 0 && (
          <div className="clips rv">
            <div className="vods-h">
              <b>Top clips</b>
              <a href={`${I.kick}/clips`} target="_blank" rel="noreferrer">
                All clips {A.arrow}
              </a>
            </div>
            <div className="clip-row">
              {e.clips.map((l: any) => (
                <a
                  key={l.id}
                  className="clip"
                  href={`https://kick.com/${I.handle}/clips/${l.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="thumb">
                    <img src={l.thumb} alt="" loading="lazy" />
                    <em className="tnum">{au(l.duration)}</em>
                    <span className="clip-play">{A.play}</span>
                  </span>
                  <b>{l.title}</b>
                  <small>
                    {nr(l.views)} views · by {l.by}
                  </small>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export function HomeSocialsSection() {
  const e = [
    { k: "kick", href: I.kick, label: "Kick", sub: `kick.com/${I.handle}`, icon: A.kick },
    { k: "x", href: I.x, label: "X", sub: `${I.xHandle} (${I.followers})`, icon: A.x },
    { k: "discord", href: I.discord, label: "Discord", sub: "Join the Degens", icon: A.discord }
  ];
  return (
    <section className="section">
      <div className="shell">
        <_r kicker="Stay connected" title="Connect with" glow="MAX Degens" center={true} />
        <div className="socials rv">
          {e.map(t => (
            <a
              key={t.k}
              className={"social s-" + t.k}
              href={t.href}
              target="_blank"
              rel="noreferrer"
            >
              <span className="social-i">{t.icon}</span>
              <span>
                <b>{t.label}</b>
                <small>{t.sub}</small>
              </span>
              <span className="social-go">{A.arrow}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PackyShowcaseSection() {
  const packs = [
    {
      key: "moonshine",
      img: "/img/moonshine_kQTGwZ0AM.png",
      tag: "Mystery Pack",
      title: "Moonshine Booster Pack",
      desc: "Instant pack opening with transparent odds, physical card unboxings & instant returns.",
      badge: "BOOSTER PACK"
    },
    {
      key: "megavault",
      img: "/img/Mega_vault_tBtgVyFSL.png",
      tag: "High Roller Pack",
      title: "Mega Vault Booster Pack",
      desc: "High adrenaline pack battles and mega drops. 100% full wagering weight for the leaderboard!",
      badge: "HIGH ROLLER"
    },
    {
      key: "templerun",
      img: "/img/temple_run_a88GzufHW.png",
      tag: "Cosmic Arena",
      title: "Temple Run Booster Pack",
      desc: "Physical Pokémon card shipments straight to your doorstep unlocked at milestone wager!",
      badge: "PHYSICAL CARDS"
    }
  ];

  return (
    <section className="section" id="packy-showcase" style={{ position: "relative", overflow: "hidden", paddingTop: "0" }}>
      <div className="shell">
        <div style={{
          background: "linear-gradient(180deg, rgba(0, 132, 255, 0.08) 0%, rgba(10, 22, 40, 0.95) 100%)",
          border: "1px solid rgba(0, 132, 255, 0.35)",
          borderRadius: "24px",
          padding: "clamp(28px, 4vw, 48px) clamp(20px, 3.5vw, 40px)",
          boxShadow: "0 20px 60px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(0, 132, 255, 0.2)",
          position: "relative"
        }}>
          {}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "36px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
              <img src="/img/image-8.png" alt="PACKY.GG" style={{ height: "36px", objectFit: "contain", borderRadius: "6px" }} />
              <span style={{
                background: "#0084FF",
                color: "#FFFFFF",
                fontWeight: 900,
                fontSize: "11px",
                letterSpacing: "0.08em",
                padding: "3px 10px",
                borderRadius: "100px",
                textTransform: "uppercase"
              }}>
                POKÉMON PACKS & BATTLES
              </span>
            </div>
            <h2 style={{
              fontFamily: "var(--fd)",
              fontSize: "clamp(26px, 4vw, 44px)",
              lineHeight: 1.15,
              margin: "0 0 12px",
              color: "#FFFFFF"
            }}>
              Unbox <span style={{ color: "#38BDF8" }}>Pokémon Mystery Packs</span> & Win <span style={{ color: "#E5FE00" }}>$100 Race</span>
            </h2>
            <p style={{
              maxWidth: "680px",
              margin: "0 auto",
              fontSize: "clamp(15px, 1.8vw, 17px)",
              color: "var(--mute)",
              lineHeight: 1.6
            }}>
              Play on <b>packy.gg</b> with affiliate code <b style={{ color: "#38BDF8", textDecoration: "underline" }}>Max</b> for <b>0.5% instant rakeback</b>, <b>4%–10% weekly lossback</b>, and get <b>authentic Pokémon cards shipped</b> right to your doorstep!
            </p>
          </div>

          {}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "22px",
            marginBottom: "36px"
          }}>
            {packs.map((p, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(10, 22, 40, 0.8)",
                  border: "1px solid rgba(0, 132, 255, 0.2)",
                  borderRadius: "20px",
                  padding: "24px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                  position: "relative"
                }}
              >
                <span style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  fontSize: "10px",
                  fontWeight: 800,
                  color: "#38bdf8",
                  background: "rgba(56, 189, 248, 0.12)",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  padding: "2px 8px",
                  borderRadius: "6px"
                }}>
                  {p.badge}
                </span>
                <div style={{
                  height: "190px",
                  width: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "6px 0 16px"
                }}>
                  <img
                    src={p.img}
                    alt={p.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: "8px",
                      filter: "drop-shadow(0 14px 24px rgba(0, 132, 255, 0.45))"
                    }}
                  />
                </div>
                <span style={{ fontSize: "12px", fontWeight: 700, color: "#38BDF8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>
                  {p.tag}
                </span>
                <h3 style={{ fontSize: "18px", margin: "0 0 8px", color: "#FFFFFF", fontFamily: "var(--fd)" }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: "13px", color: "var(--mute)", lineHeight: 1.5, margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          {}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "14px",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <Ao big={true} code="Max" />
            <a
              className="btn primary"
              href={I.packy}
              target="_blank"
              rel="noreferrer"
              style={{
                background: "linear-gradient(135deg, #0084FF 0%, #38BDF8 60%, #E5FE00 100%)",
                color: "#00142B",
                fontWeight: 900,
                fontSize: "15px",
                padding: "12px 28px",
                boxShadow: "0 8px 24px -6px rgba(0, 132, 255, 0.6)"
              }}
            >
              Open Packs on packy.gg {A.arrow}
            </a>
            <Link
              className="btn ghost"
              to="/leaderboards/packy"
              style={{ borderRadius: "12px", padding: "12px 20px", fontSize: "14px" }}
            >
              $100 Leaderboard & VIP
            </Link>
          </div>

          {}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px 20px",
            marginTop: "28px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            fontSize: "12.5px",
            color: "var(--mute)"
          }}>
            <span>🃏 <b>Physical Cards</b> Shipped at $25k</span>
            <span>⚡ <b>0.5% Instant Rakeback</b></span>
            <span>🛡️ <b>4%–10% Weekly Lossback</b></span>
            <span>🏆 <b>$100 Leaderboard</b> (25% NGR)</span>
            <span>⚔️ <b>Booster Pack Battles</b></span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePage({ boards: e, kick: t }: { boards: Record<string, BoardData>; kick: any }) {
  return (
    <>
      <Tv boards={e} live={!!t.live} />
      <Mv />
      <Dv boards={e} />
      <Fv board={e.packy || packyBoard} />
      <Ov />
      <Iv kick={t} />
      <HomeSocialsSection />
    </>
  );
}

export function Av({ title: e, onClose: t, children: n }: { title: string; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    const r = (l: KeyboardEvent) => l.key === "Escape" && t();
    document.addEventListener("keydown", r);
    document.documentElement.classList.add("modal-lock");
    return () => {
      document.removeEventListener("keydown", r);
      document.documentElement.classList.remove("modal-lock");
    };
  }, [t]);

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-label={e}
      onClick={(r: React.MouseEvent) => r.target === r.currentTarget && t()}
    >
      <div className="modal-card">
        <button
          type="button"
          className="modal-x"
          onClick={t}
          aria-label="Close"
        >
          {A.close}
        </button>
        <h3>{e}</h3>
        {n}
      </div>
    </div>
  );
}

export function Uv({ s: e }: { s: SiteInfo }) {
  const isPacky = e.key === "packy";
  const isRain = e.key === "rain";
  return (
    <>
      <p className="modal-p">
        {isRain
          ? "Register on rain.gg using affiliate code Maxs to unlock 3 free cases immediately and get a 5% deposit bonus."
          : "Leaderboard is hosted directly on-site at packy.gg (Endpoint 2) with weighted wagering."}
      </p>
      <div className="mult">
        {(isRain
          ? [
              { x: "3 Free", edge: "Welcome Cases", rtp: "Zero Deposit", note: "Unlock 3 free cases to open immediately" },
              { x: "+5%", edge: "Deposit Cash Bonus", rtp: "Cash Boost", note: "5% extra balance added on all deposits" },
              { x: "CS2", edge: "Case Battles & Unboxing", rtp: "Provably Fair", note: "PVP battles, upgrades, and case unboxing" }
            ]
          : [
              { x: "1.0×", edge: "Packs & Battles (100% Weight)", rtp: "Standard Weight", note: "Mystery packs & player battles" },
              { x: "0.5×", edge: "Keno & Upgrader (50% Weight)", rtp: "Endpoint 2 Rule", note: "Wagers weighted at 0.5x on-site" },
              { x: "0.5%", edge: "Instant Rakeback", rtp: "Cashback", note: "0.5% on all wagers under code Max" },
              { x: "4–10%", edge: "Weekly Lossback", rtp: "Funded by Packy", note: "Safety net returned weekly" }
            ]
        ).map(t => (
          <div key={t.x} className="mult-row">
            <b>{t.x}</b>
            <span>
              {t.edge} <small>({t.rtp})</small>
              <em>{t.note}</em>
            </span>
          </div>
        ))}
      </div>
      <ul className="rules-list">
        <li>
          Only accounts created under code <b>{isRain ? "Maxs" : "Max"}</b> count for rewards.
        </li>
        {isRain ? (
          <>
            <li>Use code <b>Maxs</b> upon signup or in the Wallet / Referral Code box.</li>
            <li>3 Free Welcome Cases are awarded instantly to open CS2 skins and knives.</li>
            <li>5% Deposit Bonus is added on top of all crypto & card deposits automatically.</li>
            <li>Participate in case battles, unboxings, and daily rain rewards.</li>
          </>
        ) : (
          <>
            <li>Leaderboard is hosted on-site via Endpoint 2 with 25% NGR + $100 Prize Pool.</li>
            <li>Prize Distribution: 1st place $50 · 2nd place $30 · 3rd place $20.</li>
            <li>VIP Transfer: 10% weekly deposit bonus, up to 15% lossback, transfer completed at $10k wager.</li>
            <li>Physical Pokémon Card: Shipped to your address upon reaching $25k wager (cards scale higher with volume).</li>
          </>
        )}
        <li>Terms may change at the discretion of {e.name} and MAX. 18+.</li>
      </ul>
    </>
  );
}

export function LeaderboardPage({ boards: e }: { boards: Record<string, BoardData> }) {
  const { site } = useParams<{ site?: string }>();
  const activeKey = site && (site === "rain" || site === "packy") ? site : "packy";
  const n = Be[activeKey] || Be.packy;
  const [showRules, setShowRules] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const board = e[activeKey] || cv[activeKey] || (activeKey === "rain" ? rainBoard : packyBoard);
  const allPlayers = board.players || [];
  const topLeaderWager = allPlayers[0]?.wagered || 1;
  const isPacky = activeKey === "packy";
  const isRain = activeKey === "rain";

  const filteredPlayers = useMemo(() => {
    if (!searchQuery.trim()) return allPlayers;
    const q = searchQuery.toLowerCase().trim();
    return allPlayers.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        String(p.rank) === q ||
        String(p.wagered).includes(q)
    );
  }, [allPlayers, searchQuery]);

  const remainingPlayers = filteredPlayers;

  const totalWagerSum = useMemo(() => {
    return allPlayers.reduce((sum, p) => sum + (p.wagered || 0), 0);
  }, [allPlayers]);

  return (
    <div
      className="page lb"
      style={{ "--ac": n.accent, "--ac-ink": n.accentInk } as any}
    >
      <section className="lb-head">
        <div className="shell">
          {}
          <div style={{ display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap", alignItems: "center" }}>
            <Link
              to="/leaderboards/packy"
              className={`btn ${isPacky ? "primary" : "ghost"}`}
              style={{
                borderRadius: "100px",
                padding: "10px 22px",
                fontSize: "14px",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: isPacky ? "linear-gradient(135deg, #0084FF, #38BDF8)" : "rgba(255,255,255,0.06)",
                border: isPacky ? "none" : "1px solid rgba(255,255,255,0.15)",
                color: "#FFFFFF"
              }}
            >
              <img src="/img/image-8.png" alt="packy.gg" style={{ height: "18px", objectFit: "contain" }} />
              packy.gg ($100 Race)
            </Link>
            <Link
              to="/leaderboards/rain"
              className={`btn ${isRain ? "primary" : "ghost"}`}
              style={{
                borderRadius: "100px",
                padding: "10px 22px",
                fontSize: "14px",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: isRain ? "linear-gradient(135deg, #0084FF, #0052D4)" : "rgba(255,255,255,0.06)",
                border: isRain ? "none" : "1px solid rgba(255,255,255,0.15)",
                color: "#FFFFFF"
              }}
            >
              <img src="/img/IMG_eb918c47-61dd-480d-92d5-29d6010d1c08.png" alt="rain.gg" style={{ height: "18px", objectFit: "contain" }} />
              rain.gg (3 Free Cases + 5% Depo)
            </Link>
          </div>

          <div className="lb-title rv" key={n.key}>
            <span className="kicker">
              <i className="dot live" /> Hosted on-site (Endpoint 2) · 25% NGR + $100 Leaderboard
            </span>
            <h1>
              <span className="lb-pool">
                <Ge v={board.pool} unit={n.unit} count={false} />
              </span>
              <span className="lb-sub">
                packy.gg · 1st: $50 · 2nd: $30 · 3rd: $20
              </span>
            </h1>
            <p>
              Official $100 Leaderboard funded directly by <b>packy.gg</b> with <b>25% NGR</b>! Wagers are tracked on-site (Endpoint 2) and weighted <b>0.5x for Keno & Upgrader</b> and <b>1.0x for Packs & Battles</b>.
            </p>

            <div className="lb-row">
              <Countdown end={board.endsAt} live={board.live} />
              <div className="lb-btns">
                <Ao big={false} code="Max" />
                <a
                  className="btn primary"
                  href={n.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Play on {n.name} {A.arrow}
                </a>
                <button
                  type="button"
                  className="btn ghost"
                  onClick={() => setShowRules(true)}
                >
                  {A.info} Rules
                </button>
              </div>
            </div>

            {}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "14px",
              marginTop: "28px"
            }}>
              <div style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "14px",
                padding: "16px 20px"
              }}>
                <span style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "var(--mute)", letterSpacing: "0.06em" }}>
                  {isRain ? "Welcome Package" : "Prize Pool"}
                </span>
                <div style={{ fontSize: "22px", fontWeight: 900, color: "#fff", marginTop: "4px" }}>
                  {isRain ? "3 Cases + 5% Depo" : "$100.00 USD"}
                </div>
                <span style={{ fontSize: "11.5px", color: "#38bdf8" }}>
                  {isRain ? "Zero deposit needed" : "1st: $50 · 2nd: $30 · 3rd: $20"}
                </span>
              </div>
            </div>

            {}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              background: "rgba(10, 22, 40, 0.75)",
              border: "1px solid rgba(0, 132, 255, 0.25)",
              borderRadius: "18px",
              padding: "20px",
              marginTop: "20px"
            }}>
              {[
                { img: "/img/moonshine_kQTGwZ0AM.png", name: "Moonshine Pack", tag: "Mystery Booster Pack", note: "Packs & Battles count 1.0x" },
                { img: "/img/Mega_vault_tBtgVyFSL.png", name: "Mega Vault Pack", tag: "High Roller Booster", note: "Packs & Battles count 1.0x" },
                { img: "/img/temple_run_a88GzufHW.png", name: "Temple Run Pack", tag: "Physical Card Drops", note: "Packs & Battles count 1.0x" }
              ].map((p, idx) => (
                <div key={idx} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "10px 14px",
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.06)"
                }}>
                  <img src={p.img} alt={p.name} style={{ width: "44px", height: "68px", objectFit: "contain", borderRadius: "4px", filter: "drop-shadow(0 6px 14px rgba(0,132,255,0.4))" }} />
                  <div>
                    <b style={{ color: "#fff", fontSize: "14px", display: "block" }}>{p.name}</b>
                    <span style={{ fontSize: "12px", color: "#38bdf8", fontWeight: 700 }}>{p.tag}</span>
                    <small style={{ fontSize: "11px", color: "var(--mute)", display: "block" }}>{p.note}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="shell">
          {}
          <Kd key={n.key} board={board} s={n} />

          {}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "14px",
            marginBottom: "16px",
            padding: "16px 20px",
            background: "rgba(10, 17, 24, 0.6)",
            border: "1px solid var(--line)",
            borderRadius: "16px"
          }}>
            <div style={{ position: "relative", flex: "1", minWidth: "240px", maxWidth: "420px" }}>
              <input
                type="text"
                placeholder="Search username or rank (e.g., Ch****99)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 38px 10px 14px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "10px",
                  color: "#fff",
                  fontSize: "13.5px",
                  outline: "none"
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "var(--mute)",
                    fontSize: "14px",
                    cursor: "pointer"
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            <div style={{ fontSize: "13px", color: "var(--mute)" }}>
              Showing <b style={{ color: "#fff" }}>{filteredPlayers.length}</b> of {allPlayers.length} contenders
            </div>
          </div>

          {}
          <div className="table rv" key={n.key + "t"}>
            <div className="tr th">
              <span>Place</span>
              <span>Player Username</span>
              <span className="r">Wager Volume</span>
              <span className="r">Prize / Reward</span>
            </div>

            {remainingPlayers.length > 0 ? (
              remainingPlayers.map(c => {
                const isWinner = (c.prize || 0) > 0;
                return (
                  <div key={c.rank} className="tr" style={{ background: isWinner ? "rgba(0, 132, 255, 0.04)" : "transparent" }}>
                    <span className="rk tnum" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      {c.rank === 1 ? (
                        <span style={{ background: "linear-gradient(135deg, #ffd700, #b8860b)", color: "#000", fontWeight: 900, fontSize: "11px", padding: "2px 8px", borderRadius: "6px" }}>
                          #1
                        </span>
                      ) : c.rank === 2 ? (
                        <span style={{ background: "linear-gradient(135deg, #e0e0e0, #9e9e9e)", color: "#000", fontWeight: 900, fontSize: "11px", padding: "2px 8px", borderRadius: "6px" }}>
                          #2
                        </span>
                      ) : c.rank === 3 ? (
                        <span style={{ background: "linear-gradient(135deg, #cd7f32, #8b4513)", color: "#fff", fontWeight: 900, fontSize: "11px", padding: "2px 8px", borderRadius: "6px" }}>
                          #3
                        </span>
                      ) : (
                        <span style={{ color: "var(--mute)" }}>#{c.rank}</span>
                      )}
                    </span>

                    <span className="pl">
                      <Qd p={c} size={32} />
                      <b title={c.name} style={{ fontSize: "14px", color: "#fff" }}>{c.name}</b>
                    </span>

                    <span className="r wg">
                      <Ge v={c.wagered} unit={n.unit} dec={2} />
                      <i
                        className="bar"
                        style={{ "--w": Math.min(100, Math.round((c.wagered / topLeaderWager) * 100)) } as any}
                        aria-hidden="true"
                      />
                    </span>

                    <span className={"r pz"}>
                      {isWinner ? (
                        <span style={{ color: "#38bdf8", fontWeight: 800, background: "rgba(56, 189, 248, 0.12)", padding: "4px 10px", borderRadius: "8px", fontSize: "13px" }}>
                          <Ge v={c.prize} unit={n.unit} />
                        </span>
                      ) : (
                        <span style={{ color: "var(--mute)" }}>—</span>
                      )}
                    </span>
                  </div>
                );
              })
            ) : (
              <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--mute)" }}>
                {searchQuery ? (
                  <>No players found matching "<b>{searchQuery}</b>"</>
                ) : (
                  <>No contenders recorded yet in this round. Standings update every 5 minutes!</>
                )}
              </div>
            )}
          </div>

          <p className="fine rv">
            Names are masked for privacy. Standings come straight from {n.name}'s affiliate data for code Max.
            {isPacky && " Wagers are weighted 0.5x for Keno/Upgrader and 1.0x for Packs/Battles via Endpoint 2."}
          </p>
        </div>
      </section>

      {showRules && (
        <Av title={`${n.name} leaderboard rules`} onClose={() => setShowRules(false)}>
          <Uv s={n} />
        </Av>
      )}
    </div>
  );
}

export function Yd({ id: e }: { id: string }) {
  if (e === "rain-free-cases") {
    return (
      <div className="art art-buy" aria-hidden="true" style={{ background: "linear-gradient(135deg, rgba(18,170,255,0.2), rgba(229,254,0,0.15))", borderColor: "#12AAFF" }}>
        <span className="gift">🎁</span>
        <span className="spark s1" style={{ color: "#E5FE00" }}>✦</span>
        <span className="spark s2" style={{ color: "#12AAFF" }}>✦</span>
        <span className="spark s3" style={{ color: "#E5FE00" }}>✦</span>
      </div>
    );
  }
  if (e === "rain-depo-bonus") {
    return (
      <div className="art art-match" aria-hidden="true" style={{ borderColor: "#E5FE00" }}>
        <b style={{ color: "#E5FE00" }}>+5%</b>
        <span>DEPO BONUS</span>
      </div>
    );
  }
  if (e === "packy-vip-transfer") {
    return (
      <div className="art art-signup" aria-hidden="true" style={{ background: "linear-gradient(135deg, rgba(255,215,0,0.15), rgba(0,132,255,0.15))" }}>
        <span className="tag-card">
          <small>POKÉMON CARD</small>
          <b style={{ color: "#fbbf24" }}>VIP TRANSFER</b>
        </span>
      </div>
    );
  }
  if (e === "packy-lb") {
    return (
      <div className="art art-match" aria-hidden="true" style={{ borderColor: "#0084FF" }}>
        <b style={{ color: "#38bdf8" }}>$100</b>
        <span>PACKY LB</span>
      </div>
    );
  }
  if (e === "packy-rakeback") {
    return (
      <div className="art art-match" aria-hidden="true">
        <b style={{ color: "#38bdf8" }}>0.5%</b>
        <span>RAKEBACK</span>
      </div>
    );
  }
  if (e === "packy-lossback") {
    return (
      <div className="art art-loss" aria-hidden="true">
        <span className="coin c1">10%</span>
        <span className="coin c2">$</span>
        <span className="coin c3">PKY</span>
      </div>
    );
  }

  return e === "lossback" ? (
    <div className="art art-loss" aria-hidden="true">
      <span className="coin c1">20%</span>
      <span className="coin c2">$</span>
      <span className="coin c3">MAX</span>
      <svg viewBox="0 0 120 120" className="loop">
        <path
          d="M96 60a36 36 0 1 1-10.5-25.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M88 20v17H71"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  ) : e === "monthly-lb" ? (
    <div className="art art-match" aria-hidden="true">
      <b>$75</b>
      <span>WEEKLY RACE</span>
    </div>
  ) : e === "rakeback" ? (
    <div className="art art-match" aria-hidden="true">
      <b>RAKE</b>
      <span>BOOSTED</span>
    </div>
  ) : e === "boosted-bonuses" ? (
    <div className="art art-match" aria-hidden="true">
      <b>BOOST</b>
      <span>WK / MO</span>
    </div>
  ) : e === "vip-host" ? (
    <div className="art art-signup" aria-hidden="true">
      <span className="tag-card">
        <small>VIP HOST</small>
        <b>RELOAD</b>
      </span>
    </div>
  ) : e === "deposit-match" ? (
    <div className="art art-match" aria-hidden="true">
      <b>100%</b>
      <span>DEPOSIT</span>
    </div>
  ) : e === "free-spins" ? (
    <div className="art art-buy" aria-hidden="true">
      <span className="gift">🎰</span>
      <span className="spark s1">✦</span>
      <span className="spark s2">✦</span>
      <span className="spark s3">✦</span>
    </div>
  ) : e === "weekly-race" ? (
    <div className="art art-wager" aria-hidden="true">
      {[0.35, 0.55, 0.75, 1].map((t, n) => (
        <i key={n} style={{ "--h": t, "--i": n } as any} />
      ))}
    </div>
  ) : (
    <div className="art art-buy" aria-hidden="true">
      <span className="gift">🎁</span>
      <span className="spark s1">✦</span>
      <span className="spark s2">✦</span>
      <span className="spark s3">✦</span>
    </div>
  );
}

export function Bv({ b: e, i: t }: { b: any; i: number }) {
  const n = Io(7);
  return (
    <article
      className={"bonus rv b-" + e.id}
      style={{ "--d": `${t * 70}ms` } as any}
      ref={n}
    >
      <Yd id={e.id} />
      <div className="bonus-copy">
        <span className="bonus-tag">{e.tag}</span>
        <h3>{e.title}</h3>
        <p className="bonus-line">{e.line}</p>
        <p>{e.body}</p>
      </div>
    </article>
  );
}

export function RewardsPage() {
  const e = Be.packy;
  const [packyVip, packyLb, ...otherBonuses] = av.filter(b => !b.id.startsWith("rain"));
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div
      className="page bn"
      style={{ "--ac": e.accent, "--ac-ink": e.accentInk } as any}
    >
      <section className="bn-hero">
        <img
          className="side-planet l"
          src="/img/planet-left.webp"
          alt=""
          aria-hidden="true"
        />
        <img
          className="side-planet r"
          src="/img/planet-right.webp"
          alt=""
          aria-hidden="true"
        />
        <div className="shell bn-hero-in">
          <div className="bn-call">
            <span className="ring-wave w1" />
            <span className="ring-wave w2" />
            <span className="ring-wave w3" />
            <CrownFigure className="call-cat big" eager={true} />
            <span className="phone big">{A.phone}</span>
          </div>
          <div className="bn-copy">
            <span className="kicker" style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "rgba(0,132,255,0.12)", border: "1px solid rgba(0,132,255,0.3)", padding: "6px 16px", borderRadius: "20px" }}>
              <img src="/img/image-8.png" alt="packy.gg" style={{ height: "18px", objectFit: "contain" }} />
              <span style={{ color: "#38bdf8", fontWeight: 700 }}>Code Max</span>
            </span>
            <h1>
              VIP <span className="glow-t">REWARDS & VAULT</span>
            </h1>
            <p className="bn-loss" style={{ maxWidth: "680px", margin: "12px auto 20px" }}>
              Claim the <b>$100 Leaderboard, 0.5% Rakeback, Lossback & Pokémon Card VIP Transfers</b> on packy.gg with affiliate code <b>Max</b>!
            </p>
            <div className="hero-cta" style={{ justifyContent: "center", flexWrap: "wrap", gap: "12px" }}>
              <Ao big={true} code="Max" />
              <a
                className="btn primary"
                href={I.packy}
                target="_blank"
                rel="noreferrer"
                style={{ background: "linear-gradient(135deg, #0084FF, #38BDF8)", color: "#fff", fontWeight: 800, padding: "12px 24px" }}
              >
                Play on packy.gg {A.arrow}
              </a>
              <Link className="btn ghost" to="/leaderboards/packy" style={{ borderRadius: "12px", padding: "12px 24px" }}>
                $100 Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Partner Hub */}
      <section className="section tight">
        <div className="shell">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", marginBottom: "36px" }}>
            {/* PACKY.GG CARD */}
            <div style={{
              background: "linear-gradient(180deg, rgba(0, 132, 255, 0.08) 0%, rgba(10, 22, 40, 0.85) 100%)",
              border: "1px solid rgba(0, 132, 255, 0.4)",
              borderRadius: "20px",
              padding: "28px",
              boxShadow: "0 12px 36px rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                  <img src="/img/image-8.png" alt="packy.gg" style={{ height: "28px", objectFit: "contain" }} />
                  <span style={{ background: "rgba(56,189,248,0.15)", border: "1px solid #38bdf8", color: "#38bdf8", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 800 }}>
                    CODE: MAX
                  </span>
                </div>
                <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#fff", marginBottom: "8px" }}>
                  $100 Board + VIP Transfer & Pokémon Cards
                </h3>
                <p style={{ color: "var(--mute)", fontSize: "14.5px", lineHeight: 1.6, marginBottom: "20px" }}>
                  Play under code <b style={{ color: "#38bdf8" }}>Max</b> on packy.gg to earn <b>0.5% instant rakeback</b>, <b>4%-10% weekly lossback</b>, compete in the $100 Leaderboard, and receive <b>physical Pokémon cards</b> shipped at $25k wager!
                </p>

                {/* Booster Pack Previews */}
                <div style={{ display: "flex", gap: "12px", marginBottom: "20px", background: "rgba(0,0,0,0.25)", padding: "12px", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.06)", justifyContent: "center", alignItems: "center" }}>
                  <img src="/img/moonshine_kQTGwZ0AM.png" alt="Moonshine Booster Pack" style={{ height: "68px", width: "auto", objectFit: "contain", borderRadius: "4px", filter: "drop-shadow(0 4px 12px rgba(56,189,248,0.5))" }} />
                  <img src="/img/Mega_vault_tBtgVyFSL.png" alt="Mega Vault Booster Pack" style={{ height: "68px", width: "auto", objectFit: "contain", borderRadius: "4px", filter: "drop-shadow(0 4px 12px rgba(0,132,255,0.5))" }} />
                  <img src="/img/temple_run_a88GzufHW.png" alt="Temple Run Booster Pack" style={{ height: "68px", width: "auto", objectFit: "contain", borderRadius: "4px", filter: "drop-shadow(0 4px 12px rgba(168,85,247,0.5))" }} />
                </div>

                {/* VIP Feature Pills */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
                  <div style={{ background: "rgba(0,0,0,0.25)", padding: "10px 14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize: "11px", color: "var(--mute)", textTransform: "uppercase" }}>Instant Rakeback</div>
                    <div style={{ fontSize: "16px", fontWeight: 800, color: "#38bdf8" }}>0.5% Rakeback</div>
                  </div>
                  <div style={{ background: "rgba(0,0,0,0.25)", padding: "10px 14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize: "11px", color: "var(--mute)", textTransform: "uppercase" }}>Weekly Lossback</div>
                    <div style={{ fontSize: "16px", fontWeight: 800, color: "#E5FE00" }}>4% – 10% Back</div>
                  </div>
                  <div style={{ background: "rgba(0,0,0,0.25)", padding: "10px 14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize: "11px", color: "var(--mute)", textTransform: "uppercase" }}>Physical Reward</div>
                    <div style={{ fontSize: "15px", fontWeight: 800, color: "#fff" }}>Pokémon Cards</div>
                  </div>
                  <div style={{ background: "rgba(0,0,0,0.25)", padding: "10px 14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize: "11px", color: "var(--mute)", textTransform: "uppercase" }}>Race Prize Pool</div>
                    <div style={{ fontSize: "16px", fontWeight: 800, color: "#38bdf8" }}>$100 (25% NGR)</div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <a
                  className="btn solid"
                  href={I.packy}
                  target="_blank"
                  rel="noreferrer"
                  style={{ background: "linear-gradient(135deg, #0084FF, #38BDF8)", color: "#fff", fontWeight: 800, textAlign: "center", justifyContent: "center", width: "100%", padding: "14px" }}
                >
                  Play on packy.gg {A.arrow}
                </a>
                <a
                  className="btn line"
                  href={I.discord}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textAlign: "center", justifyContent: "center", width: "100%", padding: "10px" }}
                >
                  {A.discord} Claim VIP Transfer in Discord
                </a>
              </div>
            </div>

            {/* RAIN.GG CARD */}
            <div style={{
              background: "linear-gradient(180deg, rgba(0, 132, 255, 0.08) 0%, rgba(10, 22, 40, 0.85) 100%)",
              border: "1px solid rgba(0, 132, 255, 0.4)",
              borderRadius: "20px",
              padding: "28px",
              boxShadow: "0 12px 36px rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                  <img src="/img/IMG_eb918c47-61dd-480d-92d5-29d6010d1c08.png" alt="rain.gg" style={{ height: "28px", objectFit: "contain" }} />
                  <span style={{ background: "rgba(56,189,248,0.15)", border: "1px solid #38bdf8", color: "#38bdf8", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 800 }}>
                    CODE: MAXS
                  </span>
                </div>
                <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#fff", marginBottom: "8px" }}>
                  3 Free Cases + 5% Deposit Bonus
                </h3>
                <p style={{ color: "var(--mute)", fontSize: "14.5px", lineHeight: 1.6, marginBottom: "20px" }}>
                  Sign up on <b>rain.gg</b> with referral code <b style={{ color: "#38bdf8" }}>Maxs</b> to unlock <b>3 free welcome cases</b> instantly with zero deposit required! Plus get a <b>5% extra cash bonus</b> on every deposit.
                </p>

                {/* Official Rain Free Cases */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "12px",
                  marginBottom: "20px",
                  background: "radial-gradient(ellipse at center, rgba(0, 132, 255, 0.18) 0%, rgba(5, 15, 30, 0.75) 100%)",
                  padding: "14px",
                  borderRadius: "16px",
                  border: "1px solid rgba(56, 189, 248, 0.35)",
                  alignItems: "center",
                  boxShadow: "inset 0 0 20px rgba(0, 132, 255, 0.15)"
                }}>
                  <div style={{ textAlign: "center" }}>
                    <img src="/img/rain.png" alt="Rain Loot Box" style={{ height: "64px", width: "auto", objectFit: "contain", margin: "0 auto", filter: "drop-shadow(0 6px 14px rgba(56,189,248,0.8))" }} />
                    <span style={{ display: "block", fontSize: "10.5px", fontWeight: 800, color: "#38bdf8", marginTop: "4px" }}>Rain Box</span>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <img src="/img/drizzle.png" alt="Drizzle Case" style={{ height: "64px", width: "auto", objectFit: "contain", margin: "0 auto", filter: "drop-shadow(0 6px 14px rgba(56,189,248,0.6))" }} />
                    <span style={{ display: "block", fontSize: "10.5px", fontWeight: 800, color: "#fff", marginTop: "4px" }}>Drizzle Case</span>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <img src="/img/jelly.png" alt="Jelly Case" style={{ height: "64px", width: "auto", objectFit: "contain", margin: "0 auto", filter: "drop-shadow(0 6px 14px rgba(236,72,153,0.6))" }} />
                    <span style={{ display: "block", fontSize: "10.5px", fontWeight: 800, color: "#fff", marginTop: "4px" }}>Jelly Case</span>
                  </div>
                </div>

                {/* Feature Pills */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "24px" }}>
                  <div style={{ background: "rgba(0,0,0,0.25)", padding: "10px 14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize: "11px", color: "var(--mute)", textTransform: "uppercase" }}>Welcome Gift</div>
                    <div style={{ fontSize: "16px", fontWeight: 800, color: "#38bdf8" }}>3 Free Cases</div>
                  </div>
                  <div style={{ background: "rgba(0,0,0,0.25)", padding: "10px 14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize: "11px", color: "var(--mute)", textTransform: "uppercase" }}>Deposit Match</div>
                    <div style={{ fontSize: "16px", fontWeight: 800, color: "#E5FE00" }}>+5% Extra</div>
                  </div>
                  <div style={{ background: "rgba(0,0,0,0.25)", padding: "10px 14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize: "11px", color: "var(--mute)", textTransform: "uppercase" }}>Instant Cashout</div>
                    <div style={{ fontSize: "15px", fontWeight: 800, color: "#fff" }}>Crypto & CS2</div>
                  </div>
                  <div style={{ background: "rgba(0,0,0,0.25)", padding: "10px 14px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize: "11px", color: "var(--mute)", textTransform: "uppercase" }}>No Deposit Needed</div>
                    <div style={{ fontSize: "16px", fontWeight: 800, color: "#38bdf8" }}>Free To Claim</div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <a
                  className="btn solid"
                  href="https://rain.gg/r/Maxs"
                  target="_blank"
                  rel="noreferrer"
                  style={{ background: "linear-gradient(135deg, #0084FF, #0052D4)", color: "#fff", fontWeight: 800, textAlign: "center", justifyContent: "center", width: "100%", padding: "14px" }}
                >
                  Play on rain.gg {A.arrow}
                </a>
                <Link
                  className="btn line"
                  to="/leaderboards/rain"
                  style={{ textAlign: "center", justifyContent: "center", width: "100%", padding: "10px" }}
                >
                  View rain.gg Leaderboard
                </Link>
              </div>
            </div>
          </div>

          <div className="bonus-grid">
            {otherBonuses.map((r, l) => (
              <Bv key={r.id} b={r} i={l} />
            ))}
          </div>
        </div>
      </section>

      {/* Three steps */}
      <section className="section">
        <div className="shell">
          <_r
            kicker="HOW TO CLAIM"
            title="THREE SIMPLE STEPS TO"
            glow="START"
            center={true}
          />
          <ol className="steps rv">
            <li>
              <span className="st-n">01</span>
              <b>Sign Up with Code</b>
              <p>
                Use code <b style={{ color: "#38bdf8" }}>Max</b> on packy.gg for the $100 leaderboard, rakeback, lossback, and VIP transfer rewards.
              </p>
              <a href={I.packy} target="_blank" rel="noreferrer">
                packy.gg (Code Max) {A.arrow}
              </a>
            </li>
            <li>
              <span className="st-n">02</span>
              <b>Play & Climb Leaderboard</b>
              <p>
                Every wager under code Max automatically qualifies you for the $100 Packy Leaderboard (25% NGR) & instant rakeback!
              </p>
              <Link to="/leaderboards/packy">See $100 Leaderboard {A.arrow}</Link>
            </li>
            <li>
              <span className="st-n">03</span>
              <b>Claim Discord Perks</b>
              <p>
                Open a VIP Claim ticket in Discord to transfer your level from other sites, request lossback payouts, and register for Pokémon card delivery!
              </p>
              <a href={I.discord} target="_blank" rel="noreferrer">
                Join Discord {A.arrow}
              </a>
            </li>
          </ol>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="section">
        <div className="shell">
          <_r kicker="FREQUENTLY ASKED" title="REWARDS & VIP" glow="FAQ" center={true} />
          <div style={{ maxWidth: "800px", margin: "32px auto 0", display: "grid", gap: "14px" }}>
            {maxFaq.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    borderRadius: "14px",
                    overflow: "hidden",
                    transition: "border-color .2s"
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "20px 24px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--ink)",
                      background: "none",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    <span>{faq.q}</span>
                    <span style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .25s", color: "var(--v)" }}>
                      ▼
                    </span>
                  </button>
                  {isOpen && (
                    <p style={{ padding: "0 24px 20px", color: "var(--mute)", lineHeight: 1.6, margin: 0, fontSize: "14.5px" }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export function Intro({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);

  const finish = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(() => {
      onDone();
    }, 650);
  };

  useEffect(() => {
    document.documentElement.classList.add("intro-lock");
    const timer = setTimeout(() => {
      finish();
    }, 3800);
    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove("intro-lock");
    };
  }, []);

  const rays = Array.from({ length: 32 });

  return (
    <div className={"intro" + (leaving ? " out" : "")}>
      <div className="warp" aria-hidden="true">
        {rays.map((_, i) => (
          <i
            key={i}
            style={
              {
                "--a": `${i * (360 / 32)}deg`,
                "--d": `${((i % 7) * 0.12).toFixed(2)}s`
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="intro-word" aria-label="MAX DEGENS">
        {"MAX DEGENS".split("").map((c, i) => (
          <span key={i} style={{ "--i": i } as React.CSSProperties}>
            {c === " " ? "\u00A0" : c}
          </span>
        ))}
      </div>

      <div className="intro-stage">
        <PlanetSphere className="intro-planet" />
        <div className="intro-max-emblem">
          <img
            src="/img/max-wordmark-tight.png"
            alt="MAX"
            width="781"
            height="512"
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "781 / 512",
              filter:
                "drop-shadow(0 16px 32px rgba(0,0,0,.85)) drop-shadow(0 0 45px rgba(139,61,255,.7)) drop-shadow(0 0 20px rgba(34,227,154,.4))"
            }}
          />
        </div>
      </div>

      <div className="intro-sub">OFFICIAL MAX DEGENS COMMUNITY • REWARDS HUB</div>

      <button
        type="button"
        className="intro-skip"
        onClick={finish}
        aria-label="Skip intro animation"
      >
        Skip ↗
      </button>
    </div>
  );
}

export function Wv() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("max_intro_seen");
  });

  const handleIntroDone = () => {
    sessionStorage.setItem("max_intro_seen", "1");
    setShowIntro(false);
  };

  const e = useLocation(),
    t = kv(),
    n = Sv();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, [e.key]);

  jv(e.pathname + JSON.stringify(Object.values(n).map(l => l.live)));

  const r = useMemo(() => e.pathname.split("/")[1] || "home", [e.pathname]);

  useEffect(() => {
    document.documentElement.dataset.page = r;
  }, [r]);

  return (
    <>
      {showIntro && <Intro onDone={handleIntroDone} />}
      <Nv />
      <Pv />
      <Rv live={!!t.live} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage boards={n} kick={t} />} />
          <Route path="/leaderboard" element={<LeaderboardPage boards={n} />} />
          <Route path="/leaderboards" element={<LeaderboardPage boards={n} />} />
          <Route path="/leaderboards/:site" element={<LeaderboardPage boards={n} />} />
          <Route path="/leaderboard/:site" element={<LeaderboardPage boards={n} />} />
          <Route path="/rewards" element={<RewardsPage />} />
          <Route path="/bonuses" element={<Navigate to="/rewards" replace={true} />} />
          <Route path="*" element={<HomePage boards={n} kick={t} />} />
        </Routes>
      </main>
      <_v />
      <div id="toast" role="status" aria-live="polite" />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Wv />
    </BrowserRouter>
  );
}
