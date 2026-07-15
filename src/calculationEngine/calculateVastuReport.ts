import {
  ResultRow,
  ResultTable,
  VastuFormValues,
  VastuReport,
} from "@/types/vastu";
import { formatDecimal, toNumber } from "@/utils/number";

const createRows = (entries: Array<[string, string, string?]>): ResultRow[] =>
  entries.map(([label, value, roundedValue]) => ({ label, value, roundedValue }));

// Calculate in reverse order without roundoff: nullu / 8 + inches / 12 + feet
const toFeetValueCorrect = (feet: string, inch: string, nullu: string) => {
  const feetValue = toNumber(feet);
  const inchValue = toNumber(inch);
  const nulluValue = toNumber(nullu);
  return feetValue + (inchValue + (nulluValue / 8)) / 12;
};

const getRemainderLabel = (value: number, modulus: number): string => {
  const remainder = value % modulus;
  const r = remainder === 0 ? modulus : remainder;
  return String(r); // never round the actual value
};

export const calculateVastuReport = (form: VastuFormValues): VastuReport => {
  // Plot Length & Width with correct nullu formula
  const length = toFeetValueCorrect(form.lengthFeet, form.lengthInch, form.lengthNullu);
  const width = toFeetValueCorrect(form.widthFeet, form.widthInch, form.widthNullu);

  // Plot Area in sq feet
  const plotAreaSqFeet = length * width;

  // Padamu = PlotAreaSqFeet / 9
  const padamu = plotAreaSqFeet / 9;

  // Plot Area in Sq Yards = Padamu
  const plotAreaSqYards = padamu;

  // Plot Area in Cents = Padamu / 48.4
  const plotAreaCents = padamu / 48.4;

  // Perimeter
  const perimeter = 2 * (length + width);

  // Diagonal
  const diagonal = Math.sqrt(length * length + width * width);

  // Vastu metrics (remainder-based)
  const dhanamu = getRemainderLabel((padamu * 8), 12);
  const runamu = getRemainderLabel((padamu * 3), 8);
  const tithi = getRemainderLabel((padamu * 6), 30);
  const vaaramu = getRemainderLabel((padamu * 9), 7);
  const nakshatram = getRemainderLabel((padamu * 8), 27);
  const aayamu = getRemainderLabel((padamu * 9), 8);
  const ayurdayamu = getRemainderLabel((padamu * 9), 120);
  const amsa = getRemainderLabel((padamu * 6), 9);
  const dikpati = getRemainderLabel((padamu * 9), 8);

  const formatDisplay = (v: number) => Number.isInteger(v) ? String(v) : parseFloat(v.toFixed(3)).toString();

  const exactAndRounded = (val: number | string, suffix: string = "") => {
    if (typeof val === "string") {
      const num = parseFloat(val);
      if (!isNaN(num)) {
        return [formatDisplay(num) + suffix, Math.ceil(num) + suffix] as [string, string];
      }
      return [val + suffix, val + suffix] as [string, string];
    }
    return [formatDisplay(val) + suffix, Math.ceil(val) + suffix] as [string, string];
  };

  const table1aRows = [
    ["Plot Length", exactAndRounded(length, " ft")[0]],
    ["Plot Width", exactAndRounded(width, " ft")[0]],
    ["Plot Area", exactAndRounded(plotAreaSqFeet, " sq ft")[0]],
    ["Plot Area", exactAndRounded(plotAreaSqYards, " sq yds")[0]],
    ["Plot Area", exactAndRounded(plotAreaCents, " cents")[0]],
    ["Plot Perimeter", exactAndRounded(perimeter, " ft")[0]],
    ["Padamu", exactAndRounded(padamu)[0]],
    ["Diagonal", exactAndRounded(diagonal, " ft")[0]],
  ] as Array<[string, string, string?]>;

  const getTaraPhalam = (plotNak: number, ownerNakStr?: string) => {
    if (!ownerNakStr) return ["-", "-"];
    
    const enNak = [
      "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha", "Ardra",
      "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni",
      "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha",
      "Jyeshtha", "Moola", "Purva Ashadha", "Uttara Ashadha", "Shravana",
      "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
    ];
    const teNak = [
      "అశ్విని", "భరణి", "కృత్తిక", "రోహిణి", "మృగశిర", "ఆరుద్ర",
      "పునర్వసు", "పుష్యమి", "ఆశ్లేష", "మఖ", "పూర్వ ఫల్గుణి",
      "ఉత్తర ఫల్గుణి", "హస్త", "చిత్త", "స్వాతి", "విశాఖ", "అనూరాధ",
      "జ్యేష్ఠ", "మూల", "పూర్వాషాఢ", "ఉత్తరాషాఢ", "శ్రవణం",
      "ధనిష్ఠ", "శతభిషం", "పూర్వాభాద్ర", "ఉత్తరాభాద్ర", "రేవతి"
    ];
    const hiNak = [
      "अश्विनी", "भरणी", "कृत्तिका", "रोहिणी", "मृगशीर्षा", "आर्द्रा",
      "पुनर्वसु", "पुष्य", "आश्लेषा", "मघा", "पूर्वा फाल्गुनी",
      "उत्तरा फाल्गुनी", "हस्त", "चित्रा", "स्वाति", "विशाखा", "अनुराधा",
      "ज्येष्ठा", "मूल", "पूर्वाषाढ़ा", "उत्तराषाढ़ा", "श्रवण",
      "धनिष्ठा", "शतभिषा", "पूर्वा भाद्रपद", "उत्तरा भाद्रपद", "रेवती"
    ];

    let ownerNakIndex = enNak.indexOf(ownerNakStr) + 1;
    if (ownerNakIndex === 0) ownerNakIndex = teNak.indexOf(ownerNakStr) + 1;
    if (ownerNakIndex === 0) ownerNakIndex = hiNak.indexOf(ownerNakStr) + 1;

    if (ownerNakIndex === 0) return ["-", "-"];
    
    let diff = plotNak - ownerNakIndex;
    if (diff < 0) diff += 27;
    
    let res = 0;
    if (diff === 0) {
      res = 9;
    } else {
      let val = diff + 1;
      if (val >= 1 && val <= 9) {
        res = val;
      } else if (val >= 10 && val <= 18) {
        res = val - 9;
      } else if (val >= 19 && val <= 27) {
        res = val - 18;
      }
    }
    
    return [String(res), String(res)];
  };

  const plotNakshatraVal = Math.ceil(Number(nakshatram));

  const table1bRows = [
    ["Dhanamu", ...exactAndRounded(dhanamu)],
    ["Runamu", ...exactAndRounded(runamu)],
    ["Tithi", ...exactAndRounded(tithi)],
    ["Vaaramu", ...exactAndRounded(vaaramu)],
    ["Nakshatram", ...exactAndRounded(nakshatram)],
    ["Owner Tara Phalam", ...getTaraPhalam(plotNakshatraVal, form.nakshatram)],
    ["Wife Tara Phalam", ...getTaraPhalam(plotNakshatraVal, form.wifeNakshatram)],
    ["Aayamu", ...exactAndRounded(aayamu)],
    ["Ayurdayamu", ...exactAndRounded(ayurdayamu)],
    ["Amsa", ...exactAndRounded(amsa)],
    ["Dikpati", ...exactAndRounded(dikpati)],
  ] as Array<[string, string, string?]>;

  const summaryTable: ResultTable = {
    title: "Result Table 1",
    rows: createRows([...table1aRows, ...table1bRows]),
    visible: true,
  };

  const splitTable1a: ResultTable = {
    title: "Result Table 1",
    rows: createRows(table1aRows),
    visible: true,
  };

  const splitTable1b: ResultTable = {
    title: "Result Table 1",
    rows: createRows(table1bRows),
    visible: true,
  };

  // Keep existing Table 2 (Suddha Padham based)
  const sp = toNumber(form.suddhaPadham || "0");
  const sLen = toFeetValueCorrect(form.suddhaFeet || "0", form.suddhaInch || "0", form.suddhaNullu || "0");
  const sWidth = sLen > 0 ? (sp * 9) / sLen : 0;
  const sAreaSqFeet = sp * 9;
  const sAreaSqYards = sp;
  const sAreaCents = sp / 48.4;
  const sPerimeter = 2 * (sLen + sWidth);
  const sDiagonal = Math.sqrt(sLen * sLen + sWidth * sWidth);

  let table2Rows: Array<[string, string, string?]> = [];

  if (sp > 0) {
    const spNakValStr = getRemainderLabel((sp * 8), 27);
    const spNakshatraVal = Math.ceil(Number(spNakValStr));

    table2Rows = [
      ["Padamu", exactAndRounded(sp)[0]],
      ["Plot Width", exactAndRounded(sWidth, " ft")[0]],
      ["Dhanamu", ...exactAndRounded(getRemainderLabel((sp * 8), 12))],
      ["Runamu", ...exactAndRounded(getRemainderLabel((sp * 3), 8))],
      ["Tithi", ...exactAndRounded(getRemainderLabel((sp * 6), 30))],
      ["Vaaramu", ...exactAndRounded(getRemainderLabel((sp * 9), 7))],
      ["Nakshatram", ...exactAndRounded(spNakValStr)],
      ["Owner Tara Phalam", ...getTaraPhalam(spNakshatraVal, form.nakshatram)],
      ["Wife Tara Phalam", ...getTaraPhalam(spNakshatraVal, form.wifeNakshatram)],
      ["Aayamu", ...exactAndRounded(getRemainderLabel((sp * 9), 8))],
      ["Ayurdayamu", ...exactAndRounded(getRemainderLabel((sp * 9), 120))],
      ["Amsa", ...exactAndRounded(getRemainderLabel((sp * 6), 9))],
      ["Dikpati", ...exactAndRounded(getRemainderLabel((sp * 9), 8))]
    ];
  } else {
    table2Rows = [["Padamu", form.suddhaPadham || "-"]];
  }

  const padamuTable: ResultTable = {
    title: "Result Table 2",
    rows: createRows(table2Rows),
    visible: true,
  };

  // Calculate Table 3 Subham values
  let table3RowsRaw: Array<{ label: string; columns: string[] }> = [];
  const start = parseInt(form.firstSuddhaPadham || "0", 10);
  const end = parseInt(form.secondSuddhaPadham || "0", 10);

  const getVastuValues = (padamu: number, multiplier: number, modulus: number) => {
    // Use Math.round instead of toFixed+Number for massive performance gain in loops
    const product = Math.round(padamu * multiplier * 10000) / 10000;
    const remainder = product % modulus;
    const actual = remainder === 0 ? modulus : remainder;
    const ceilVal = Math.ceil(remainder);
    const rounded = ceilVal === 0 ? modulus : ceilVal;
    return { actual, rounded };
  };

  const nakshatramList = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha", "Ardra",
    "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni",
    "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha",
    "Jyeshtha", "Moola", "Purva Ashadha", "Uttara Ashadha", "Shravana",
    "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
  ];
  const ownerNakIndex = form.nakshatram ? nakshatramList.indexOf(form.nakshatram) : -1;

  const badTithi = [1, 4, 9, 19, 24, 29, 30];
  const goodVaaramu = [2, 4, 5, 6];
  const goodAayamu = [1, 3, 5, 7];
  const goodAmsa = [2, 3, 7, 8, 9];
  const goodDikpati = [1, 3, 5, 7];

  if (!isNaN(start) && !isNaN(end) && start > 0 && end >= start) {
    for (let n = start; n <= end; n++) {
      for (let i = 0; i <= 15; i++) {
        const padamuVal = n + i / 16;
        
        const dhanamu = getVastuValues(padamuVal, 8, 12);
        const runamu = getVastuValues(padamuVal, 3, 8);
        if (dhanamu.rounded <= runamu.rounded) continue;

        const tithi = getVastuValues(padamuVal, 6, 30);
        if (badTithi.includes(tithi.rounded)) continue;

        const vaaramu = getVastuValues(padamuVal, 9, 7);
        if (!goodVaaramu.includes(vaaramu.rounded)) continue;
        
        const aayamu = getVastuValues(padamuVal, 9, 8);
        if (!goodAayamu.includes(aayamu.rounded)) continue;

        const ayurdayamu = getVastuValues(padamuVal, 9, 120);
        if (ayurdayamu.rounded < 60) continue;

        const amsa = getVastuValues(padamuVal, 6, 9);
        if (!goodAmsa.includes(amsa.rounded)) continue;

        const dikpati = getVastuValues(padamuVal, 9, 8);
        if (!goodDikpati.includes(dikpati.rounded)) continue;

        // Nakshatram is always considered good for Table 3, calculate only if we reach here
        const nakshatram = getVastuValues(padamuVal, 8, 27);

        const formatDisplayTable3 = (v: number) => Number.isInteger(v) ? String(v) : parseFloat(v.toFixed(3)).toString();

        const label = i === 0 ? `${n}` : `${n} ${i}/16`;
        const columns = [
          formatDisplayTable3(dhanamu.actual),
          formatDisplayTable3(runamu.actual),
          formatDisplayTable3(tithi.actual),
          formatDisplayTable3(vaaramu.actual),
          formatDisplayTable3(nakshatram.actual),
          formatDisplayTable3(ayurdayamu.actual),
          formatDisplayTable3(amsa.actual),
          formatDisplayTable3(dikpati.actual),
          formatDisplayTable3(aayamu.actual),
          formatDisplayTable3(aayamu.rounded)
        ];
        table3RowsRaw.push({ label, columns });
      }
    }
  }

  if (table3RowsRaw.length === 0) {
    table3RowsRaw.push({ label: "No Subham Padamu found", columns: [] });
  }

  const table3ResultRows: ResultRow[] = table3RowsRaw.map(row => ({
    label: row.label,
    value: "", // Not used when columns are present
    columns: row.columns
  }));

  const padamWithStarTable: ResultTable = {
    title: "Result Table 3",
    headers: ["Padamu", "Dhanamu", "Runamu", "Tithi", "Vaaramu", "Nakshatram", "Ayurdayam", "Amsa", "Dikpati", "Aayamu Actual", "Aayamu Rounded"],
    rows: table3ResultRows,
    visible: true,
  };

  return {
    summaryTables: [summaryTable, padamuTable, padamWithStarTable],
    splitTable1a,
    splitTable1b,
    status: "success",

    notes: [],
  };
};
