import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { VastuFormValues, VastuReport, ResultTable } from "@/types/vastu";

// ──────────────────────────────────────────────────────────────
//  Helpers
// ──────────────────────────────────────────────────────────────
const todayFormatted = () => {
  const d = new Date();
  const dd   = String(d.getDate()).padStart(2, "0");
  const mm   = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

const DIR_TE: Record<string, string> = {
  North: "ఉత్తరం",   South: "దక్షిణం", East: "తూర్పు",   West: "పడమర",
  "North-East": "ఈశాన్యం", "North-West": "వాయువ్యం",
  "South-East": "ఆగ్నేయం", "South-West": "నైరుతి",
};

// 9 Telugu metric names used in the reference image
const METRICS_TE = [
  "ఆయాది సంఖ్య", "వ్యాది సంఖ్య",  "రుణ సంఖ్య",
  "ధన సంఖ్య",    "గుణ సంఖ్య",     "ఆయురాయ సంఖ్య",
  "అంశ సంఖ్య",   "దిక్సాల సంఖ్య", "నక్షత్ర సంఖ్య",
];

const PHALA_TE = [
  "శుభం",       "శుభం",       "శుభప్రదం",
  "అత్యుత్తమం", "శ్రేయస్సు",  "దీర్ఘాయువు",
  "శుభం",       "శ్రేయావయం", "శుభ ఫలితం",
];

// ──────────────────────────────────────────────────────────────
//  SVG: Sri Yantra (left header, ~100×100, gold on dark maroon)
// ──────────────────────────────────────────────────────────────
const YANTRA = `<svg width="108" height="108" viewBox="0 0 108 108" xmlns="http://www.w3.org/2000/svg">
  <rect width="108" height="108" fill="#7B0A10" rx="4"/>
  <!-- Outer gold border -->
  <rect x="3" y="3" width="102" height="102" fill="none" stroke="#D4AF37" stroke-width="2" rx="3"/>
  <!-- Second thin gold border -->
  <rect x="7" y="7" width="94" height="94" fill="none" stroke="#C9A227" stroke-width="0.8" rx="2"/>
  <!-- Lotus petals - simplified 8 petals -->
  <ellipse cx="54" cy="18" rx="5" ry="9" fill="#C9A227" opacity="0.6"/>
  <ellipse cx="54" cy="18" rx="5" ry="9" fill="#C9A227" opacity="0.6" transform="rotate(45,54,54)"/>
  <ellipse cx="54" cy="18" rx="5" ry="9" fill="#C9A227" opacity="0.6" transform="rotate(90,54,54)"/>
  <ellipse cx="54" cy="18" rx="5" ry="9" fill="#C9A227" opacity="0.6" transform="rotate(135,54,54)"/>
  <ellipse cx="54" cy="18" rx="5" ry="9" fill="#C9A227" opacity="0.6" transform="rotate(180,54,54)"/>
  <ellipse cx="54" cy="18" rx="5" ry="9" fill="#C9A227" opacity="0.6" transform="rotate(225,54,54)"/>
  <ellipse cx="54" cy="18" rx="5" ry="9" fill="#C9A227" opacity="0.6" transform="rotate(270,54,54)"/>
  <ellipse cx="54" cy="18" rx="5" ry="9" fill="#C9A227" opacity="0.6" transform="rotate(315,54,54)"/>
  <!-- Outer circle -->
  <circle cx="54" cy="54" r="36" fill="none" stroke="#D4AF37" stroke-width="1.2"/>
  <!-- Large upward triangle -->
  <polygon points="54,15 87,67 21,67" fill="none" stroke="#D4AF37" stroke-width="1.8"/>
  <!-- Large downward triangle -->
  <polygon points="54,93 87,41 21,41" fill="none" stroke="#D4AF37" stroke-width="1.8"/>
  <!-- Mid upward triangle -->
  <polygon points="54,26 78,65 30,65" fill="none" stroke="#E8C060" stroke-width="1.2"/>
  <!-- Mid downward triangle -->
  <polygon points="54,82 78,43 30,43" fill="none" stroke="#E8C060" stroke-width="1.2"/>
  <!-- Small upward triangle -->
  <polygon points="54,36 70,62 38,62" fill="none" stroke="#F0D080" stroke-width="0.9"/>
  <!-- Small downward triangle -->
  <polygon points="54,72 70,46 38,46" fill="none" stroke="#F0D080" stroke-width="0.9"/>
  <!-- Center bindu -->
  <circle cx="54" cy="54" r="5" fill="#D4AF37"/>
  <circle cx="54" cy="54" r="2.5" fill="#FFF8E8"/>
</svg>`;

// ──────────────────────────────────────────────────────────────
//  SVG: Compass Rose (right header, ~108×108, gold on dark maroon)
// ──────────────────────────────────────────────────────────────
const COMPASS = `<svg width="108" height="108" viewBox="0 0 108 108" xmlns="http://www.w3.org/2000/svg">
  <rect width="108" height="108" fill="#7B0A10" rx="4"/>
  <rect x="3" y="3" width="102" height="102" fill="none" stroke="#D4AF37" stroke-width="2" rx="3"/>
  <rect x="7" y="7" width="94" height="94" fill="none" stroke="#C9A227" stroke-width="0.8" rx="2"/>
  <!-- Outer ring -->
  <circle cx="54" cy="54" r="38" fill="none" stroke="#D4AF37" stroke-width="1.8"/>
  <!-- Inner ring -->
  <circle cx="54" cy="54" r="28" fill="none" stroke="#C9A227" stroke-width="0.9"/>
  <!-- N arrow (pointing up, gold/filled) -->
  <polygon points="54,16 48,54 60,54" fill="#D4AF37"/>
  <!-- S arrow (pointing down, dimmer) -->
  <polygon points="54,92 48,54 60,54" fill="#9A7020" opacity="0.8"/>
  <!-- E arrow (pointing right) -->
  <polygon points="92,54 54,48 54,60" fill="#9A7020" opacity="0.8"/>
  <!-- W arrow (pointing left) -->
  <polygon points="16,54 54,48 54,60" fill="#9A7020" opacity="0.8"/>
  <!-- Tick marks at 45 degrees -->
  <line x1="54" y1="16" x2="54" y2="22" stroke="#D4AF37" stroke-width="1"/>
  <line x1="54" y1="86" x2="54" y2="92" stroke="#D4AF37" stroke-width="1"/>
  <line x1="16" y1="54" x2="22" y2="54" stroke="#D4AF37" stroke-width="1"/>
  <line x1="86" y1="54" x2="92" y2="54" stroke="#D4AF37" stroke-width="1"/>
  <!-- Diagonal ticks -->
  <line x1="27" y1="27" x2="31" y2="31" stroke="#C9A227" stroke-width="1"/>
  <line x1="77" y1="27" x2="73" y2="31" stroke="#C9A227" stroke-width="1"/>
  <line x1="27" y1="81" x2="31" y2="77" stroke="#C9A227" stroke-width="1"/>
  <line x1="77" y1="81" x2="73" y2="77" stroke="#C9A227" stroke-width="1"/>
  <!-- Center jewel -->
  <circle cx="54" cy="54" r="7" fill="#D4AF37"/>
  <circle cx="54" cy="54" r="4" fill="#7B0A10"/>
  <circle cx="54" cy="54" r="2" fill="#D4AF37"/>
  <!-- Direction labels -->
  <text x="54" y="13" text-anchor="middle" font-size="11" fill="#FFE57A" font-family="Arial" font-weight="bold">N</text>
  <text x="54" y="104" text-anchor="middle" font-size="11" fill="#C9A227" font-family="Arial" font-weight="bold">S</text>
  <text x="100" y="58" text-anchor="middle" font-size="11" fill="#C9A227" font-family="Arial" font-weight="bold">E</text>
  <text x="8" y="58" text-anchor="middle" font-size="11" fill="#C9A227" font-family="Arial" font-weight="bold">W</text>
</svg>`;

// ──────────────────────────────────────────────────────────────
//  SVG: Brass Diya with flame (for summary section)
// ──────────────────────────────────────────────────────────────
const DIYA = `<svg width="68" height="85" viewBox="0 0 68 85" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer flame glow -->
  <ellipse cx="34" cy="18" rx="13" ry="17" fill="#FFE082" opacity="0.18"/>
  <!-- Flame base -->
  <path d="M34,4 C26,14 22,22 25,30 C27,35 34,37 34,37 C34,37 41,35 43,30 C46,22 42,14 34,4Z" fill="#FFA000"/>
  <!-- Inner flame -->
  <path d="M34,10 C29,18 27,24 29,29 C30.5,33 34,34 34,34 C34,34 37.5,33 39,29 C41,24 39,18 34,10Z" fill="#FF6F00"/>
  <!-- Flame highlight -->
  <path d="M32,15 C30,20 29,25 30,28" fill="none" stroke="#FFF176" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
  <!-- Wick -->
  <line x1="34" y1="37" x2="34" y2="44" stroke="#5D4037" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Oil bowl top rim -->
  <path d="M12,44 Q20,36 34,38 Q48,36 56,44 Q58,58 34,64 Q10,58 12,44Z" fill="#B8860B"/>
  <!-- Oil surface shine -->
  <path d="M14,45 Q34,40 54,45 L52,50 Q34,46 16,50Z" fill="#FFD54F" opacity="0.4"/>
  <!-- Spout for wick -->
  <path d="M48,42 Q54,40 58,44 Q60,48 56,50 Q52,46 48,46Z" fill="#A07000"/>
  <!-- Bowl lower half -->
  <path d="M16,52 Q34,58 52,52 Q54,60 34,64 Q14,60 16,52Z" fill="#A07000"/>
  <!-- Base stem -->
  <rect x="26" y="64" width="16" height="8" rx="3" fill="#8B6000"/>
  <!-- Base plate -->
  <ellipse cx="34" cy="72" rx="20" ry="6" fill="#7B5500"/>
  <!-- Base plate shine -->
  <ellipse cx="34" cy="70" rx="16" ry="3" fill="#C9A227" opacity="0.3"/>
</svg>`;

// ──────────────────────────────────────────────────────────────
//  WhatsApp icon SVG
// ──────────────────────────────────────────────────────────────
const WHATSAPP_ICON = `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <rect width="48" height="48" rx="10" fill="#25D366"/>
  <path d="M24,8 C15.16,8 8,15.16 8,24 C8,27.12 8.9,30.04 10.46,32.52 L8,40 L15.68,37.58 C18.08,39.04 20.94,39.9 24,39.9 C32.84,39.9 40,32.74 40,23.9 C40,15.06 32.84,8 24,8Z" fill="white"/>
  <path d="M32.5,29.1 C32.2,29.9 30.6,30.6 29.8,30.7 C29.1,30.8 28.2,30.8 27.3,30.5 C26.7,30.3 26,30.0 25.1,29.6 C21.6,28.0 19.3,24.5 19.1,24.2 C18.9,23.9 17.5,22.0 17.5,20.0 C17.5,18.0 18.5,17.0 18.9,16.6 C19.3,16.2 19.7,16.1 20.0,16.1 C20.3,16.1 20.6,16.1 20.8,16.1 C21.1,16.1 21.4,16.0 21.7,16.8 C22.0,17.6 22.8,19.6 22.9,19.8 C23.0,20.0 23.0,20.3 22.8,20.5 C22.6,20.8 22.5,21.0 22.3,21.2 C22.1,21.4 21.8,21.7 21.6,21.9 C21.4,22.1 21.2,22.4 21.4,22.7 C21.7,23.1 22.7,24.7 24.2,26.0 C26.1,27.7 27.7,28.2 28.1,28.4 C28.5,28.6 28.7,28.5 29.0,28.2 C29.3,27.9 30.2,26.9 30.5,26.5 C30.8,26.1 31.1,26.2 31.5,26.3 C31.9,26.5 33.9,27.5 34.3,27.7 C34.7,27.9 35.0,28.0 35.1,28.2 C35.2,28.4 35.2,29.2 34.9,30.0 Z" fill="#25D366"/>
</svg>`;

// ──────────────────────────────────────────────────────────────
//  Telegram icon SVG
// ──────────────────────────────────────────────────────────────
const TELEGRAM_ICON = `<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
  <rect width="48" height="48" rx="10" fill="#2CA5E0"/>
  <path d="M38,10 L6,22.5 C5.2,22.9 5.2,24.0 6.0,24.4 L13.5,27.0 L16.5,36.5 C16.7,37.1 17.5,37.3 17.9,36.8 L22.0,32.5 L29.5,38.0 C30.0,38.3 30.7,38.0 30.9,37.4 L39.9,11.4 C40.2,10.5 39.2,9.7 38,10Z" fill="white"/>
  <path d="M14,26 L17,36 L20,30 L32,20" fill="none" stroke="#2CA5E0" stroke-width="2"/>
</svg>`;

// Build the 9 main Vastu metric rows in 5 columns: S.No, Aspect, Formula, Result, Phala Analysis
const buildRows = (table: ResultTable) => {
  const findVal = (label: string) => {
    const row = table.rows.find(r => r.label === label);
    return row ? row.value : "—";
  };

  const metrics = [
    { label: "ఆయాది సంఖ్య", formula: "(పదము * 9) / 8", value: findVal("Aayamu"), phala: "శుభ ఫలితం" },
    { label: "వ్యాది సంఖ్య", formula: "(పదము * 3) / 8", value: findVal("Runamu"), phala: "శుభం" },
    { label: "రుణ సంఖ్య", formula: "(పదము * 3) / 8", value: findVal("Runamu"), phala: "శుభప్రదం" },
    { label: "ధన సంఖ్య", formula: "(పదము * 8) / 12", value: findVal("Dhanamu"), phala: "అత్యుత్తమం" },
    { label: "గుణ సంఖ్య", formula: "(పదము * 6) / 30", value: findVal("Tithi"), phala: "శ్రేయస్సు" },
    { label: "ఆయురాయ సంఖ్య", formula: "(పదము * 9) / 120", value: findVal("Ayurdayamu"), phala: "దీర్ఘాయువు" },
    { label: "అంశ సంఖ్య", formula: "(పదము * 6) / 9", value: findVal("Amsa"), phala: "శుభం" },
    { label: "దిక్సాల సంఖ్య", formula: "(పదము * 9) / 8", value: findVal("Dikruti"), phala: "శ్రేయావయం" },
    { label: "నక్షత్ర సంఖ్య", formula: "(పదము * 8) / 27", value: findVal("Nakshatram"), phala: "శుభ ఫలితం" }
  ];

  return metrics.map((row, i) => {
    const bg = i % 2 === 0 ? "#FFFFFF" : "#FFF9F0";
    return `
 <tr>
   <td style="background:#F5EDD8;text-align:center;font-size:14px;font-weight:700;
       color:#3D1A00;border:1px solid #D4B896;width:48px;padding:11px 6px;">${i + 1}</td>
   <td style="background:${bg};font-size:14px;color:#2C1000;border:1px solid #D4B896;
       padding:11px 12px;font-weight:600;">${row.label}</td>
   <td style="background:${bg};font-size:13px;color:#5A3000;border:1px solid #D4B896;
       padding:11px 12px;text-align:center;">${row.formula}</td>
   <td style="background:${bg};text-align:center;font-size:15px;font-weight:700;
       color:#1A0A00;border:1px solid #D4B896;width:65px;padding:11px 6px;">${row.value}</td>
   <td style="background:${bg};text-align:center;border:1px solid #D4B896;
       width:130px;padding:11px 8px;font-size:14px;font-weight:600;color:#1B5E20;">
     ${row.phala}&nbsp;&nbsp;<span style="color:#2E7D32;font-size:16px;font-weight:700;">↑</span>
   </td>
 </tr>`;
  }).join("");
};

const buildHtml = (form: VastuFormValues, table: ResultTable): string => {
  const owner  = form.ownerName || "—";
  const date   = todayFormatted();
  const dir    = DIR_TE[form.direction] || form.direction || "ఉత్తరం";

  const lFt  = parseFloat(form.lengthFeet  || "0");
  const lIn  = parseFloat(form.lengthInch  || "0");
  const wFt  = parseFloat(form.widthFeet  || "0");
  const wIn  = parseFloat(form.widthInch  || "0");
  const area = ((lFt + lIn / 12) * (wFt + wIn / 12)).toFixed(2);

  const lengthStr = form.lengthFeet
    ? `${form.lengthFeet}'${form.lengthInch ? " " + form.lengthInch + '"' : ""}`
    : "—";
  const widthStr = form.widthFeet ? `${form.widthFeet}'${form.widthInch ? " " + form.widthInch + '"' : ""}` : "—";

  const dataRows = buildRows(table);

  return `<!DOCTYPE html>
<html lang="te">
<head>
<meta charset="UTF-8"/>
<title>శ్రీ వాస్తు ఫల విశ్లేషణం</title>
<style>
* { box-sizing:border-box; margin:0; padding:0; }

/* Use system Telugu font — Expo-Print renders system fonts */
body {
  font-family: 'Noto Sans Telugu', 'Noto Serif Telugu', 'Gowri', serif;
  background: #D4B896;
  padding: 0; margin: 0;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* ═══════════════════════════════════════════
   OUTER TRIPLE BORDER: Gold > Dark > Gold
═══════════════════════════════════════════ */
.frame {
  width: 680px;
  margin: 0 auto;
  border: 10px solid #D4AF37;      /* Gold outer */
  box-shadow:
    inset 0 0 0 3px #6B0F1A,       /* Dark maroon inner stripe */
    inset 0 0 0 5px #D4AF37,       /* Gold inner stripe */
    0 0 0 2px #A07020;             /* Outer accent */
  background: #FFFDF8;
}

/* ═══════════════════════════════════════════
   HEADER  — Height ~120px, dark maroon
   3 columns: [Yantra 108px] [Title flex] [Compass 108px]
═══════════════════════════════════════════ */
.hdr {
  display: table;
  width: 100%;
  background: linear-gradient(180deg, #7B0A10 0%, #9B1515 50%, #7B0A10 100%);
  border-bottom: 4px solid #D4AF37;
  min-height: 124px;
}
.hdr-col { display: table-cell; vertical-align: middle; }

.hdr-left  { width: 120px; padding: 10px 10px 10px 12px; }
.hdr-right { width: 120px; padding: 10px 12px 10px 10px; }

.hdr-center { text-align: center; padding: 10px 8px; }
.hdr-title {
  font-size: 32px;
  font-weight: 800;
  color: #FFE57A;
  line-height: 1.2;
  letter-spacing: 1px;
  text-shadow: 1px 2px 6px rgba(0,0,0,0.6);
}
.hdr-divrow {
  display: flex;
  align-items: center;
  margin: 7px auto 6px;
  width: 85%;
  gap: 8px;
}
.hdr-divline { flex:1; height:1px; background: linear-gradient(90deg,transparent,#D4AF37,transparent); }
.hdr-divdot  { font-size:10px; color:#D4AF37; }
.hdr-sub     { font-size:14px; color:rgba(255,248,220,0.8); font-style:italic; letter-spacing:0.8px; }

/* ═══════════════════════════════════════════
   RED TITLE BAR
═══════════════════════════════════════════ */
.redbar {
  background: linear-gradient(90deg,#8B0000,#C62828,#8B0000);
  padding: 13px 20px;
  text-align: center;
  border-bottom: 2px solid #D4AF37;
}
.redbar-text {
  font-size: 17px;
  font-weight: 700;
  color: #FFFFFF;
  letter-spacing: 0.4px;
}

/* ═══════════════════════════════════════════
   CLIENT INFO ROW — 3 equal columns
═══════════════════════════════════════════ */
.client {
  display: table;
  width: 100%;
  background: #FFFDF2;
  border-bottom: 3px solid #D4AF37;
}
.client-col {
  display: table-cell;
  padding: 11px 14px;
  text-align: center;
  vertical-align: middle;
  border-right: 1px solid #D4B080;
}
.client-col:last-child { border-right: none; }
.client-lbl { font-size: 12px; color: #7A4A20; margin-bottom: 4px; font-weight: 600; }
.client-val { font-size: 18px; font-weight: 800; color: #8B0000; line-height: 1.2; }

/* ═══════════════════════════════════════════
   BLUE SECTION HEADER
═══════════════════════════════════════════ */
.blue-hdr {
  background: #90CAF9;
  padding: 11px 20px;
  text-align: center;
  border-top: 1px solid #64B5F6;
  border-bottom: 1px solid #64B5F6;
}
.blue-hdr-text {
  font-size: 15px;
  font-weight: 700;
  color: #0D47A1;
}

/* ═══════════════════════════════════════════
   DIMENSION ROWS
═══════════════════════════════════════════ */
.dim-row { display: table; width: 100%; border-bottom: 1px solid #E8D8B0; }
.dim-row:last-child { border-bottom: none; }
.dim-lbl {
  display: table-cell;
  width: 190px;
  background: #FFEBEE;     /* Very light pink — exactly like reference */
  padding: 13px 18px;
  font-size: 15px;
  font-weight: 600;
  color: #4A1A00;
  vertical-align: middle;
  border-right: 2px solid #D4B080;
}
.dim-val {
  display: table-cell;
  background: #FFFFFF;
  padding: 13px 20px;
  font-size: 18px;
  font-weight: 700;
  color: #1A0A00;
  vertical-align: middle;
  text-align: center;
  letter-spacing: 1px;
}

/* ═══════════════════════════════════════════
   AREA RESULT ROW — Crimson + Gold text
═══════════════════════════════════════════ */
.area-row {
  display: table;
  width: 100%;
  background: #C62828;
  border-top: 2px solid #D4AF37;
  border-bottom: 2px solid #D4AF37;
}
.area-col {
  display: table-cell;
  padding: 12px 14px;
  vertical-align: middle;
  text-align: center;
  border-right: 1px solid rgba(212,175,55,0.45);
  font-weight: 700;
}
.area-col:last-child { border-right: none; }
.area-lbl  { font-size: 16px; color: #FFE57A; }
.area-val  { font-size: 26px; color: #FFD700; letter-spacing: 1px;
             text-shadow: 0 0 10px rgba(255,215,0,0.5); }

/* ═══════════════════════════════════════════
   MAIN DATA TABLE
═══════════════════════════════════════════ */
.main-table { width:100%; border-collapse:collapse; }
.main-table thead tr { background: linear-gradient(90deg,#6B0F1A,#8B0000,#6B0F1A); }
.main-table thead th {
  padding: 11px 8px;
  font-size: 13px;
  font-weight: 700;
  color: #FFFDF8;
  text-align: center;
  border: 1px solid rgba(212,175,55,0.35);
}
.main-table thead th:nth-child(2) { text-align:left; }
.main-table thead th:nth-child(3) { text-align:center; }

/* ═══════════════════════════════════════════
   SUMMARY / RECOMMENDATION BOX
═══════════════════════════════════════════ */
.rec {
  background: linear-gradient(135deg,#7B0A10 0%,#A01010 50%,#7B0A10 100%);
  padding: 18px 20px 20px;
  border-top: 3px solid #D4AF37;
  border-bottom: 3px solid #D4AF37;
  position: relative;
  overflow: hidden;
}
.rec-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}
.rec-divline   { flex:1; height:1px; background:linear-gradient(90deg,transparent,#D4AF37 70%); }
.rec-divline-r { flex:1; height:1px; background:linear-gradient(90deg,#D4AF37 30%,transparent); }
.rec-title-text { font-size:16px; font-weight:700; color:#FFE57A; letter-spacing:1.2px; white-space:nowrap; }
.rec-body { display:flex; align-items:center; gap:18px; }
.rec-diya  { flex-shrink:0; }
.rec-text  { flex:1; text-align:center; }
.rec-text p { font-size:14px; color:#FFF8E8; line-height:2.1; letter-spacing:0.3px; }

/* ═══════════════════════════════════════════
   CONTACT BAR
═══════════════════════════════════════════ */
.contact {
  background: #FFFDF2;
  display: flex;
  align-items: center;
  padding: 14px 20px;
  gap: 0;
  border-top: 1px solid #E8D0A0;
}
.contact-left  { flex:1; display:flex; align-items:center; gap:12px; border-right:2px solid #E0C880; padding-right:20px; }
.contact-right { flex:1; display:flex; align-items:center; gap:12px; padding-left:20px; }
.contact-texts {}
.contact-lbl   { font-size:12px; color:#7A4A20; font-weight:600; margin-bottom:3px; }
.contact-phone { font-size:22px; font-weight:900; color:#1A0A00; letter-spacing:1px; }
.contact-app   { font-size:14px; font-weight:700; color:#0088CC; }
</style>
</head>
<body>
<div class="frame">

<!-- ═══════════════════════════════
     HEADER
═══════════════════════════════ -->
<div class="hdr">
  <!-- Left: Yantra -->
  <div class="hdr-col hdr-left">${YANTRA}</div>

  <!-- Center: Title -->
  <div class="hdr-col hdr-center">
    <div class="hdr-title">శ్రీ వాస్తు ఫల విశ్లేషణం</div>
    <div class="hdr-divrow">
      <div class="hdr-divline"></div>
      <span class="hdr-divdot">✦</span>
      <div class="hdr-divline"></div>
    </div>
    <div class="hdr-sub">దేవో వాస్తు ప్రజావతే</div>
  </div>

  <!-- Right: Compass -->
  <div class="hdr-col hdr-right" style="text-align:right;">${COMPASS}</div>
</div>

<!-- ═══════════════════════════════
     RED TITLE BAR
═══════════════════════════════ -->
<div class="redbar">
  <span class="redbar-text">వాస్తు శాస్త్ర ప్రామాణిక విశ్లేషణ వివరాలు</span>
</div>

<!-- ═══════════════════════════════
     CLIENT INFO
═══════════════════════════════ -->
<div class="client">
  <div class="client-col" style="border-right:2px solid #D4B080;">
    <div class="client-lbl">క్లయింట్ పేరు</div>
    <div class="client-val">${owner}</div>
  </div>
  <div class="client-col" style="border-right:2px solid #D4B080;">
    <div class="client-lbl">తేది</div>
    <div class="client-val">${date}</div>
  </div>
  <div class="client-col">
    <div class="client-lbl">దిక్కు</div>
    <div class="client-val">${dir}</div>
  </div>
</div>

<!-- ═══════════════════════════════
     BLUE SECTION HEADER
═══════════════════════════════ -->
<div class="blue-hdr">
  <span class="blue-hdr-text">ఇల్లు కొలతలు (అడుగులు-అంగుళాలు)</span>
</div>

<!-- ═══════════════════════════════
     DIMENSION ROWS
═══════════════════════════════ -->
<div class="dim-row">
  <div class="dim-lbl">పొడవు (Length)</div>
  <div class="dim-val">${lengthStr}</div>
</div>
<div class="dim-row">
  <div class="dim-lbl">వెడల్పు (Width)</div>
  <div class="dim-val">${widthStr}</div>
</div>

<!-- ═══════════════════════════════
     AREA RESULT ROW
═══════════════════════════════ -->
<div class="area-row">
  <div class="area-col">
    <div class="area-lbl">పరిమాణం</div>
  </div>
  <div class="area-col">
    <div class="area-lbl">విస్తీర్ణం (చ.అ.)</div>
  </div>
  <div class="area-col">
    <div class="area-val">${area}</div>
  </div>
</div>

<!-- ═══════════════════════════════
     MAIN CALCULATION TABLE
═══════════════════════════════ -->
<table class="main-table">
  <thead>
    <tr>
      <th style="width:48px;">క్రమం</th>
      <th style="width:160px;text-align:left;padding-left:12px;">అంశం</th>
      <th style="text-align:left;padding-left:12px;">సూత్రం (అడుగులు/అంగుళాలు)</th>
      <th style="width:65px;">ఫలితం</th>
      <th style="width:132px;">ఫల విశ్లేషణ</th>
    </tr>
  </thead>
  <tbody>
    ${dataRows}
  </tbody>
</table>

<!-- ═══════════════════════════════
     SUMMARY BOX
═══════════════════════════════ -->
<div class="rec">
  <div class="rec-title-row">
    <div class="rec-divline"></div>
    <span class="rec-title-text">✦&nbsp;సారాంశ ఫలితం&nbsp;✦</span>
    <div class="rec-divline-r"></div>
  </div>
  <div class="rec-body">
    <div class="rec-diya">${DIYA}</div>
    <div class="rec-text">
      <p>ఈ భవన వాస్తు సమన్వయంగా ఉంది. శుభ ఫలితాలు కలుగును.</p>
      <p>సంపద, ఆరోగ్యం, విజయం, శాంతి, శుభం మీ సహవాసం కలుగును.</p>
      <p>శ్రీ వాస్తు దేవుని కృప మీ కుటుంబం పై ఉండగరా కలుగును.</p>
    </div>
    <div class="rec-diya" style="transform:scaleX(-1);">${DIYA}</div>
  </div>
</div>

<!-- ═══════════════════════════════
     CONTACT BAR
═══════════════════════════════ -->
<div class="contact">
  <div class="contact-left">
    ${WHATSAPP_ICON}
    <div class="contact-texts">
      <div class="contact-lbl">సంప్రదించండి (WhatsApp)</div>
      <div class="contact-phone">9949598627</div>
    </div>
  </div>
  <div class="contact-right">
    ${TELEGRAM_ICON}
    <div class="contact-texts">
      <div class="contact-lbl">మరిన్ని వివరాలకు (Telegram)</div>
      <div class="contact-app">@vastuapp</div>
    </div>
  </div>
</div>

</div><!-- /frame -->
</body>
</html>`;
};

// ──────────────────────────────────────────────────────────────
//  Export — one PDF per table download
// ──────────────────────────────────────────────────────────────
export const generateVastuPdf = async (
  form: VastuFormValues,
  report: VastuReport,
) => {
  const table = report.summaryTables[0];
  const html  = buildHtml(form, table);

  const { uri } = await Print.printToFileAsync({ html, width: 700, height: 1050 });

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri, {
      mimeType: "application/pdf",
      dialogTitle: "శ్రీ వాస్తు ఫల విశ్లేషణం",
      UTI: "com.adobe.pdf",
    });
  }

  return uri;
};
