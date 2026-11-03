import express, { Request, Response } from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const PACKY_BASE_URL = (process.env.PACKY_BASE_URL || "https://packy.gg").replace(/\/+$/, "");
const PACKY_API_KEY = process.env.PACKY_API_KEY || "";
const PACKY_CUSTOM_KEY = process.env.PACKY_CUSTOM_KEY || "";

let cachedBoard: any = null;
let lastFetchTime = 0;
let cacheTtlMs = 60 * 1000; // Refreshed dynamically based on next_update_at or 60s fallback

const fallbackPackyData = {
  site: "packy",
  name: "packy.gg",
  title: "MAXS Leaderboard",
  pool: 100,
  ngr: "25% NGR + $100 Leaderboard",
  weightedNote: "Hosted on-site (Endpoint 2) • Wagers weighted 0.5x for Keno & Upgrader • 1.0x for Packs & Battles",
  rakeback: "0.5% instant rakeback on wager",
  lossback: "4%–10% weekly lossback funded by Packy",
  affiliateCodes: ["MAXS"],
  trial: {
    targetTrial: 2000,
    targetRaise: 4000,
    totalWagered: 815.41,
    daysLeft: 4,
    trialStatus: "MAXS Leaderboard Active"
  },
  vipTransfer: {
    depositBonus: "10% weekly deposit bonus",
    lossback: "Up to 15% lossback",
    transferWager: 10000,
    pokemonCardWager: 25000,
    pokemonCardNote: "At 25k wager: Random physical Pokémon card shipped to you (cards get better the more you wager!)"
  },
  endsAt: new Date("2026-11-07T01:00:00.000Z").getTime(),
  live: true,
  players: [
    { rank: 1, name: "li****ly", wagered: 434.87, prize: 50, avatar: "https://avatars.steamstatic.com/a4427c1c1413c2c37051a580daaff94cc91da4aa_full.jpg" },
    { rank: 2, name: "ma****er", wagered: 187.84, prize: 25, avatar: "https://ik.imagekit.io/scrkflpgw/avatars/avatar_kkbxehshxysggycyhhfyxnffeyxlykiq_SJFCvId9p.jpg" },
    { rank: 3, name: "em****ys", wagered: 101.40, prize: 15, avatar: null },
    { rank: 4, name: "mr****ky", wagered: 55.77, prize: 5, avatar: "https://cdn.discordapp.com/avatars/775416292194517063/d2748b40027aabd531f58d9c58fad5e0.png" },
    { rank: 5, name: "mu****zy", wagered: 18.22, prize: 5, avatar: "https://cdn.discordapp.com/avatars/689500108844564553/a_14a37124a2a267657fc9332bf483a0d3.png" },
    { rank: 6, name: "re****st", wagered: 14.35, prize: 0, avatar: "https://avatars.steamstatic.com/553e1f6d00620f054200e47a104dfb318747b2c7_full.jpg" },
    { rank: 7, name: "ra****es", wagered: 2.96, prize: 0, avatar: "https://ik.imagekit.io/scrkflpgw/avatars/avatar_BanTrSKDzulj8XTG3ToFEX5A507TZ3bS_hFMVf3y2Y.jpg" },
    { rank: 8, name: "xo****ls", wagered: 0.00, prize: 0, avatar: null }
  ]
};

// Helper to build request variations for Cloudflare bypass & candidate hostnames
function getCandidateRequests() {
  const primaryHeaders: Record<string, string> = {
    "User-Agent": "curl/8.4.0",
    "Accept": "*/*",
    "X-API-Key": PACKY_API_KEY,
    "x-api-key": PACKY_API_KEY
  };
  if (PACKY_CUSTOM_KEY) {
    primaryHeaders["x-custom-key"] = PACKY_CUSTOM_KEY;
    primaryHeaders["X-Custom-Key"] = PACKY_CUSTOM_KEY;
  }

  const requests: Array<{ url: string; headers: Record<string, string>; label: string }> = [
    // 1. EXACT working curl configuration
    {
      url: `${PACKY_BASE_URL}/v1/affiliate/leaderboard/external`,
      headers: primaryHeaders,
      label: "curl with X-API-Key and x-custom-key"
    },
    // 2. Fallback with json accept header
    {
      url: `${PACKY_BASE_URL}/v1/affiliate/leaderboard/external`,
      headers: { ...primaryHeaders, "Accept": "application/json" },
      label: "curl with application/json"
    },
    // 3. API subdomain
    {
      url: "https://api.packy.gg/v1/affiliate/leaderboard/external",
      headers: primaryHeaders,
      label: "api.packy.gg with curl"
    }
  ];

  return requests;
}

// Endpoint 2 — Leaderboards (from Packy.gg Creator Partner API)
// GET /v1/affiliate/leaderboard/external
app.get("/api/packy/leaderboard", async (req: Request, res: Response) => {
  const now = Date.now();
  if (cachedBoard && now - lastFetchTime < cacheTtlMs) {
    return res.json(cachedBoard);
  }

  let lastError: any = null;

  try {
    const candidateRequests = getCandidateRequests();

    for (const item of candidateRequests) {
      try {
        const response = await fetch(item.url, {
          method: "GET",
          headers: item.headers,
          signal: AbortSignal.timeout(4500)
        });

        if (response.ok) {
          const contentType = response.headers.get("content-type") || "";
          if (contentType.includes("application/json")) {
            const json = await response.json();
            const leaderboards = json?.data?.leaderboards;

            if (json?.success && Array.isArray(leaderboards)) {
              // If there are no approved leaderboards yet
              if (leaderboards.length === 0) {
                cachedBoard = {
                  ...fallbackPackyData,
                  site: "packy",
                  name: "packy.gg",
                  live: false,
                  players: [],
                  source: "live-empty",
                  status: "no_active_leaderboard",
                  message: "No approved leaderboard event found on Packy.gg for this account yet."
                };
                lastFetchTime = now;
                return res.json(cachedBoard);
              }

              // Find active race, or upcoming, or most recent approved leaderboard
              const activeBoard =
                leaderboards.find((b: any) => b.time_status === "active") ||
                leaderboards.find((b: any) => b.time_status === "upcoming") ||
                leaderboards[0];

              if (activeBoard) {
                const prizePool =
                  parseFloat(activeBoard.total_prize_usd) ||
                  parseFloat(activeBoard.creator_prize_usd) ||
                  fallbackPackyData.pool;

                const parsedEndsAt = activeBoard.end_date
                  ? new Date(activeBoard.end_date).getTime()
                  : NaN;
                const endsAt =
                  !isNaN(parsedEndsAt) && parsedEndsAt > 0
                    ? parsedEndsAt
                    : fallbackPackyData.endsAt;

                // Build prize lookup by position from custom prize_tiers
                const prizeMap: Record<number, number> = {};
                if (Array.isArray(activeBoard.prize_tiers)) {
                  for (const tier of activeBoard.prize_tiers) {
                    prizeMap[Number(tier.position)] = parseFloat(tier.prize_amount_usd) || 0;
                  }
                }

                // Map entries directly from Packy on-site (weighted 0.5x for Keno & Upgrader, 1.0x for Packs & Battles)
                const rawEntries = Array.isArray(activeBoard.entries) ? activeBoard.entries : [];
                const players = rawEntries.map((entry: any, idx: number) => {
                  const rank = Number(entry.rank || idx + 1);
                  const rawName =
                    entry.username ||
                    (entry.user_id ? `pk_${entry.user_id.slice(0, 6)}` : `pk****${rank + 10}`);
                  const maskedName =
                    rawName.length > 4
                      ? rawName.slice(0, 2) + "****" + rawName.slice(-2)
                      : rawName + "****";

                  const wagered = parseFloat(entry.total_wagered_usd) || 0;
                  let prize = prizeMap[rank];
                  if (prize === undefined) {
                    if (rank === 1) prize = 50;
                    else if (rank === 2) prize = 30;
                    else if (rank === 3) prize = 20;
                    else prize = 0;
                  }

                  return {
                    rank,
                    name: maskedName,
                    wagered,
                    prize,
                    avatar: entry.image_url || null,
                    userId: entry.user_id || null
                  };
                });

                const totalWagered = players.reduce((sum: number, p: any) => sum + (p.wagered || 0), 0);

                // Compute dynamic cache duration aligned with next_update_at (background refresh every 5 min)
                if (activeBoard.next_update_at) {
                  const nextMs = new Date(activeBoard.next_update_at).getTime();
                  if (!isNaN(nextMs) && nextMs > now) {
                    cacheTtlMs = Math.min(Math.max(nextMs - now + 3000, 30 * 1000), 5 * 60 * 1000);
                  } else {
                    cacheTtlMs = 60 * 1000;
                  }
                } else {
                  cacheTtlMs = 60 * 1000;
                }

                cachedBoard = {
                  ...fallbackPackyData,
                  site: "packy",
                  name: "packy.gg",
                  title: activeBoard.title || "Packy.gg Leaderboard",
                  pool: prizePool,
                  endsAt,
                  live: activeBoard.time_status === "active",
                  weightedNote:
                    "Hosted on-site (Endpoint 2) • Wagers weighted 0.5x for Keno & Upgrader • 1.0x for Packs & Battles",
                  ngr: "25% NGR + $100 Leaderboard",
                  trial: {
                    ...fallbackPackyData.trial,
                    totalWagered: Math.max(totalWagered, fallbackPackyData.trial.totalWagered)
                  },
                  players,
                  source: "live-endpoint-2",
                  successfulUrl: item.url,
                  lastRefreshedAt: activeBoard.last_refreshed_at || null,
                  nextUpdateAt: activeBoard.next_update_at || null,
                  leaderboardId: activeBoard.id || null,
                  affiliateCodes: activeBoard.affiliate_codes || ["Max"]
                };

                lastFetchTime = now;
                return res.json(cachedBoard);
              }
            }
          }
        } else {
          lastError = `HTTP ${response.status} from ${item.url}`;
        }
      } catch (innerErr: any) {
        lastError = innerErr?.message;
      }
    }
  } catch (err: any) {
    lastError = err?.message;
    console.warn("Packy API Endpoint 2 fetch error, fallback engaged:", err);
  }

  // Graceful fallback indicating why live API was not reached
  cachedBoard = {
    ...fallbackPackyData,
    source: "trial-sync",
    apiStatus: "fallback_engaged",
    apiError: lastError || "Cloudflare 403 or unreachable on tested endpoints"
  };
  lastFetchTime = now;
  return res.json(cachedBoard);
});

// Diagnostic debug endpoint: Call this to inspect exact responses across subdomains & headers
app.get("/api/packy/debug", async (req: Request, res: Response) => {
  const candidateRequests = getCandidateRequests().slice(0, 8); // Test top candidates
  const results: any[] = [];

  for (const item of candidateRequests) {
    try {
      const response = await fetch(item.url, {
        method: "GET",
        headers: item.headers,
        signal: AbortSignal.timeout(4500)
      });
      const contentType = response.headers.get("content-type") || "";
      const text = await response.text();
      let isCloudflare = text.includes("Just a moment...") || text.includes("challenges.cloudflare.com");
      let json = null;
      try {
        json = JSON.parse(text);
      } catch {}

      results.push({
        url: item.url,
        ua: item.headers["User-Agent"],
        status: response.status,
        statusText: response.statusText,
        contentType,
        isCloudflareChallenge: isCloudflare,
        preview: json || (isCloudflare ? "Cloudflare 'Just a moment...' Challenge intercepted" : text.slice(0, 300))
      });
    } catch (err: any) {
      results.push({
        url: item.url,
        error: err.message
      });
    }
  }

  return res.json({
    hasApiKey: !!PACKY_API_KEY,
    apiKeyMasked: PACKY_API_KEY ? `${PACKY_API_KEY.slice(0, 6)}...${PACKY_API_KEY.slice(-4)}` : "empty",
    hasCustomKey: !!PACKY_CUSTOM_KEY,
    packyBaseUrl: PACKY_BASE_URL,
    results
  });
});

// Endpoint 1 — Affiliate Stats (from Packy.gg Creator Partner API)
// GET /v1/affiliate/stats?start_date=...&end_date=...
app.get("/api/packy/stats", async (req: Request, res: Response) => {
  const { start_date, end_date } = req.query;
  if (!start_date || !end_date) {
    return res.status(400).json({ error: "start_date and end_date query parameters are required (ISO 8601)" });
  }

  try {
    const url = `${PACKY_BASE_URL}/v1/affiliate/stats?start_date=${encodeURIComponent(String(start_date))}&end_date=${encodeURIComponent(String(end_date))}`;
    const headers: Record<string, string> = {
      "Accept": "application/json",
      "User-Agent": "MAX-Degens-Stats/1.0",
      "X-API-Key": PACKY_API_KEY,
      "x-api-key": PACKY_API_KEY
    };
    if (PACKY_CUSTOM_KEY) {
      headers["x-custom-key"] = PACKY_CUSTOM_KEY;
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
      signal: AbortSignal.timeout(6000)
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Failed to fetch affiliate stats" });
  }
});

app.get("/api/packy/info", (req: Request, res: Response) => {
  res.json({
    name: "packy.gg",
    trial: fallbackPackyData.trial,
    vipTransfer: fallbackPackyData.vipTransfer,
    rakeback: fallbackPackyData.rakeback,
    lossback: fallbackPackyData.lossback,
    weightedNote: fallbackPackyData.weightedNote,
    commission: "25% NGR + $100 Leaderboard"
  });
});

app.get("/api/board", async (req: Request, res: Response) => {
  const site = String(req.query.site || "packy").toLowerCase();
  if (site === "packy") {
    
    return (app as any)._router.handle({ ...req, url: "/api/packy/leaderboard" }, res);
  }
  if (site === "rain") {
    return res.json({
      site: "rain",
      name: "rain.gg",
      pool: 0,
      endsAt: 0,
      live: false,
      code: "Maxs",
      lastUpdated: Date.now(),
      weightedNote: "Code Maxs • 3 Free Cases & 5% Deposit Bonus on rain.gg",
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
    });
  }
  return (app as any)._router.handle({ ...req, url: "/api/packy/leaderboard" }, res);
});

app.post("/api/upload-asset", async (req: Request, res: Response) => {
  try {
    const { filename, dataBase64 } = req.body;
    if (!filename || !dataBase64) {
      return res.status(400).json({ error: "Missing filename or dataBase64" });
    }
    const cleanBase64 = dataBase64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(cleanBase64, "base64");

    const cleanFilename = path.basename(filename);
    const publicImgDir = path.resolve(__dirname, "public", "img");
    const publicDir = path.resolve(__dirname, "public");

    if (!fs.existsSync(publicImgDir)) {
      fs.mkdirSync(publicImgDir, { recursive: true });
    }

    fs.writeFileSync(path.join(publicImgDir, cleanFilename), buffer);
    fs.writeFileSync(path.join(publicDir, cleanFilename), buffer);

    if (cleanFilename.includes("moonshine")) {
      fs.writeFileSync(path.join(publicImgDir, "packy-pack-1.png"), buffer);
    } else if (cleanFilename.includes("Mega_vault") || cleanFilename.toLowerCase().includes("mega")) {
      fs.writeFileSync(path.join(publicImgDir, "packy-pack-2.png"), buffer);
    } else if (cleanFilename.includes("temple_run") || cleanFilename.toLowerCase().includes("temple")) {
      fs.writeFileSync(path.join(publicImgDir, "packy-pack-3.png"), buffer);
    } else if (cleanFilename.includes("drizzle")) {
      fs.writeFileSync(path.join(publicImgDir, "rain-case-1.png"), buffer);
    } else if (cleanFilename === "rain.png" || cleanFilename.startsWith("rain.")) {
      fs.writeFileSync(path.join(publicImgDir, "rain-case-2.png"), buffer);
    } else if (cleanFilename.includes("jelly")) {
      fs.writeFileSync(path.join(publicImgDir, "rain-case-3.png"), buffer);
    } else if (cleanFilename.includes("image-8") || cleanFilename.toLowerCase().includes("packy")) {
      fs.writeFileSync(path.join(publicImgDir, "logo-packy.png"), buffer);
    } else if (cleanFilename.includes("IMG_eb918c47") || cleanFilename.toLowerCase().includes("rain")) {
      fs.writeFileSync(path.join(publicImgDir, "logo-rain.png"), buffer);
    }

    return res.json({ success: true, filename: cleanFilename });
  } catch (err: any) {
    console.error("Asset upload error:", err);
    return res.status(500).json({ error: err.message });
  }
});

app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true, port: 3000, host: "0.0.0.0" },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
