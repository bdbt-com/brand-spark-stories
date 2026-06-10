import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const VIDEO_MAP: Record<string, string> = {
  ERXXO8mG5IY: "Why 70% of People Are Dehydrated",
  OjwSKAXveN8: "Dangers of Screen-time Before Bed",
  bv27Bn6qWIo: "Why Most People Invest Completely Wrong",
  vPd9pieng58: "Read For 20 Minutes Every Day",
  cfLHVIIp4o0: "Build a Life You Don't Need to Escape From",
  Irm5oIb5ySo: "Connect with More Animals",
  zz2rVKKt1l0: "Go Exploring",
  "-a4NbW5Y718": "If You Know You're Capable of More",
  "-3_zj_Q_1kI": "Reduce Decision Fatigue Wherever Possible",
  TJTe4wtW158: "Skip for 5 Minutes Daily",
  WNf06ZLUIJw: "Expose Yourself to Sunlight Daily",
  pRRSGS7eLJM: "Capitalise on Benefits Offered by Your Employer",
};

// ISO 3166-1 alpha-2 -> country name (British English where relevant)
const COUNTRY_NAMES: Record<string, string> = {
  AF: "Afghanistan", AX: "Åland Islands", AL: "Albania", DZ: "Algeria", AS: "American Samoa",
  AD: "Andorra", AO: "Angola", AI: "Anguilla", AQ: "Antarctica", AG: "Antigua & Barbuda",
  AR: "Argentina", AM: "Armenia", AW: "Aruba", AU: "Australia", AT: "Austria",
  AZ: "Azerbaijan", BS: "Bahamas", BH: "Bahrain", BD: "Bangladesh", BB: "Barbados",
  BY: "Belarus", BE: "Belgium", BZ: "Belize", BJ: "Benin", BM: "Bermuda",
  BT: "Bhutan", BO: "Bolivia", BQ: "Caribbean Netherlands", BA: "Bosnia & Herzegovina",
  BW: "Botswana", BV: "Bouvet Island", BR: "Brazil", IO: "British Indian Ocean Territory",
  BN: "Brunei", BG: "Bulgaria", BF: "Burkina Faso", BI: "Burundi", CV: "Cape Verde",
  KH: "Cambodia", CM: "Cameroon", CA: "Canada", KY: "Cayman Islands",
  CF: "Central African Republic", TD: "Chad", CL: "Chile", CN: "China",
  CX: "Christmas Island", CC: "Cocos Islands", CO: "Colombia", KM: "Comoros",
  CG: "Congo", CD: "DR Congo", CK: "Cook Islands", CR: "Costa Rica", CI: "Côte d'Ivoire",
  HR: "Croatia", CU: "Cuba", CW: "Curaçao", CY: "Cyprus", CZ: "Czechia",
  DK: "Denmark", DJ: "Djibouti", DM: "Dominica", DO: "Dominican Republic",
  EC: "Ecuador", EG: "Egypt", SV: "El Salvador", GQ: "Equatorial Guinea", ER: "Eritrea",
  EE: "Estonia", SZ: "Eswatini", ET: "Ethiopia", FK: "Falkland Islands",
  FO: "Faroe Islands", FJ: "Fiji", FI: "Finland", FR: "France", GF: "French Guiana",
  PF: "French Polynesia", TF: "French Southern Territories", GA: "Gabon", GM: "Gambia",
  GE: "Georgia", DE: "Germany", GH: "Ghana", GI: "Gibraltar", GR: "Greece",
  GL: "Greenland", GD: "Grenada", GP: "Guadeloupe", GU: "Guam", GT: "Guatemala",
  GG: "Guernsey", GN: "Guinea", GW: "Guinea-Bissau", GY: "Guyana", HT: "Haiti",
  HM: "Heard & McDonald Islands", VA: "Vatican City", HN: "Honduras", HK: "Hong Kong",
  HU: "Hungary", IS: "Iceland", IN: "India", ID: "Indonesia", IR: "Iran", IQ: "Iraq",
  IE: "Ireland", IM: "Isle of Man", IL: "Israel", IT: "Italy", JM: "Jamaica",
  JP: "Japan", JE: "Jersey", JO: "Jordan", KZ: "Kazakhstan", KE: "Kenya",
  KI: "Kiribati", KP: "North Korea", KR: "South Korea", KW: "Kuwait", KG: "Kyrgyzstan",
  LA: "Laos", LV: "Latvia", LB: "Lebanon", LS: "Lesotho", LR: "Liberia",
  LY: "Libya", LI: "Liechtenstein", LT: "Lithuania", LU: "Luxembourg", MO: "Macao",
  MG: "Madagascar", MW: "Malawi", MY: "Malaysia", MV: "Maldives", ML: "Mali",
  MT: "Malta", MH: "Marshall Islands", MQ: "Martinique", MR: "Mauritania",
  MU: "Mauritius", YT: "Mayotte", MX: "Mexico", FM: "Micronesia", MD: "Moldova",
  MC: "Monaco", MN: "Mongolia", ME: "Montenegro", MS: "Montserrat", MA: "Morocco",
  MZ: "Mozambique", MM: "Myanmar", NA: "Namibia", NR: "Nauru", NP: "Nepal",
  NL: "Netherlands", NC: "New Caledonia", NZ: "New Zealand", NI: "Nicaragua",
  NE: "Niger", NG: "Nigeria", NU: "Niue", NF: "Norfolk Island", MK: "North Macedonia",
  MP: "Northern Mariana Islands", NO: "Norway", OM: "Oman", PK: "Pakistan",
  PW: "Palau", PS: "Palestine", PA: "Panama", PG: "Papua New Guinea", PY: "Paraguay",
  PE: "Peru", PH: "Philippines", PN: "Pitcairn", PL: "Poland", PT: "Portugal",
  PR: "Puerto Rico", QA: "Qatar", RE: "Réunion", RO: "Romania", RU: "Russia",
  RW: "Rwanda", BL: "St Barthélemy", SH: "St Helena", KN: "St Kitts & Nevis",
  LC: "St Lucia", MF: "St Martin", PM: "St Pierre & Miquelon", VC: "St Vincent",
  WS: "Samoa", SM: "San Marino", ST: "São Tomé & Príncipe", SA: "Saudi Arabia",
  SN: "Senegal", RS: "Serbia", SC: "Seychelles", SL: "Sierra Leone", SG: "Singapore",
  SX: "Sint Maarten", SK: "Slovakia", SI: "Slovenia", SB: "Solomon Islands",
  SO: "Somalia", ZA: "South Africa", GS: "South Georgia", SS: "South Sudan",
  ES: "Spain", LK: "Sri Lanka", SD: "Sudan", SR: "Suriname", SJ: "Svalbard & Jan Mayen",
  SE: "Sweden", CH: "Switzerland", SY: "Syria", TW: "Taiwan", TJ: "Tajikistan",
  TZ: "Tanzania", TH: "Thailand", TL: "Timor-Leste", TG: "Togo", TK: "Tokelau",
  TO: "Tonga", TT: "Trinidad & Tobago", TN: "Tunisia", TR: "Türkiye", TM: "Turkmenistan",
  TC: "Turks & Caicos", TV: "Tuvalu", UG: "Uganda", UA: "Ukraine",
  AE: "United Arab Emirates", GB: "United Kingdom", US: "United States", UM: "US Outlying Islands",
  UY: "Uruguay", UZ: "Uzbekistan", VU: "Vanuatu", VE: "Venezuela", VN: "Vietnam",
  VG: "British Virgin Islands", VI: "US Virgin Islands", WF: "Wallis & Futuna",
  EH: "Western Sahara", YE: "Yemen", ZM: "Zambia", ZW: "Zimbabwe", XK: "Kosovo",
};

function countryLabel(code: string | null | undefined): string {
  if (!code) return "Unknown";
  const c = code.toUpperCase();
  return COUNTRY_NAMES[c] || c;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const serverTime = new Date().toISOString();

    let sinceParam: string | null = null;
    if (req.method === "POST") {
      try {
        const body = await req.json();
        if (body && typeof body.since === "string") sinceParam = body.since;
      } catch {}
    }

    const since = sinceParam || new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const LIMIT = 100;

    async function fetchAll(table: string, cols: string, tsCol: string) {
      const { data, error } = await supabase
        .from(table)
        .select(cols)
        .gte(tsCol, since)
        .order(tsCol, { ascending: false })
        .limit(LIMIT);
      if (error || !data) return [];
      return data;
    }

    const clicks = await fetchAll("video_clicks", "video_id, clicked_at, country", "clicked_at");
    const signups = await fetchAll(
      "email_subscriptions",
      "first_name, email, created_at, guide_title, email_sent, email_sent_at",
      "created_at"
    );

    // Backfill country for signups/downloads from page_views (±10 min window)
    const signupCountryByEmail = new Map<string, string>();
    if (signups.length > 0) {
      const earliest = signups.reduce<string>((min, s) => {
        const t = s.created_at || serverTime;
        return !min || t < min ? t : min;
      }, "");
      const lookupSince = new Date(new Date(earliest).getTime() - 10 * 60 * 1000).toISOString();
      const { data: pvs } = await supabase
        .from("page_views")
        .select("entered_at, country")
        .gte("entered_at", lookupSince)
        .not("country", "is", null)
        .order("entered_at", { ascending: false })
        .limit(1000);
      const pvList = (pvs || []) as { entered_at: string; country: string }[];
      for (const s of signups) {
        if (!s.email || !s.created_at) continue;
        const createdMs = new Date(s.created_at).getTime();
        let best: string | null = null;
        let bestDelta = Infinity;
        for (const pv of pvList) {
          const delta = Math.abs(new Date(pv.entered_at).getTime() - createdMs);
          if (delta <= 10 * 60 * 1000 && delta < bestDelta) {
            best = pv.country;
            bestDelta = delta;
          }
        }
        if (best) signupCountryByEmail.set(s.email, best);
      }
    }

    const items: { type: string; label: string; detail: string; timestamp: string; country: string }[] = [];

    const BUTTON_LABELS: Record<string, { label: string; detail: string }> = {
      "button-blueprint": { label: "Free Foundation Blueprint", detail: "Click from /bio (button)" },
      "button-youtube": { label: "YouTube channel", detail: "Click from /bio (button)" },
      "button-spotify": { label: "Spotify show", detail: "Click from /bio (button)" },
      "button-courses": { label: "Browse Courses", detail: "Click from /podcast (button)" },
      "podcast-spotify": { label: "Spotify show", detail: "Click from /podcast (Spotify)" },
      "podcast-blueprint": { label: "Free Foundation Blueprint", detail: "Click from /podcast (Blueprint)" },
    };

    for (const c of clicks || []) {
      const vid = c.video_id || "";
      const ts = c.clicked_at || new Date().toISOString();
      const country = countryLabel(c.country);
      const stripPrefix = (s: string) => {
        const idx = s.indexOf(":");
        return idx >= 0 ? s.slice(idx + 1) : s;
      };

      const push = (type: string, label: string, detail: string) => {
        items.push({ type, label, detail, timestamp: ts, country });
      };

      if (vid.startsWith("latest-auto:")) {
        push("redirect", VIDEO_MAP[stripPrefix(vid)] || stripPrefix(vid), "Redirect from /podcast");
      } else if (vid.startsWith("latest-page:")) {
        push("click", VIDEO_MAP[stripPrefix(vid)] || stripPrefix(vid), "Click from /podcast");
      } else if (vid.startsWith("latest-grid:")) {
        push("click", VIDEO_MAP[stripPrefix(vid)] || stripPrefix(vid), "Click from /podcast (grid)");
      } else if (vid.startsWith("auto-redirect:")) {
        push("redirect", VIDEO_MAP[stripPrefix(vid)] || stripPrefix(vid), "Redirect from /bio");
      } else if (vid === "auto-redirect") {
        push("redirect", "Auto-redirect", "Redirect from /bio");
      } else if (vid.startsWith("bio-click:")) {
        push("click", VIDEO_MAP[stripPrefix(vid)] || stripPrefix(vid), "Click from /bio");
      } else if (BUTTON_LABELS[vid]) {
        push("click", BUTTON_LABELS[vid].label, BUTTON_LABELS[vid].detail);
      } else {
        push("click", VIDEO_MAP[vid] || vid, "Click from /bio");
      }
    }

    for (const s of signups || []) {
      const country = countryLabel(signupCountryByEmail.get(s.email));
      items.push({
        type: "signup",
        label: s.first_name || s.email.split("@")[0],
        detail: "New subscriber",
        timestamp: s.created_at || new Date().toISOString(),
        country,
      });

      if (s.email_sent && s.email_sent_at) {
        items.push({
          type: "download",
          label: s.guide_title || "Guide",
          detail: `by ${s.first_name || s.email.split("@")[0]}`,
          timestamp: s.email_sent_at,
          country,
        });
      }
    }

    items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return new Response(JSON.stringify({ feed: items.slice(0, 100), server_time: serverTime }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
