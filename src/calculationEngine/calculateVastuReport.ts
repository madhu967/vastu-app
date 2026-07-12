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
  const dikruti = getRemainderLabel((padamu * 9), 8);

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
    const nakshatramList = [
      "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha", "Ardra",
      "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni",
      "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha",
      "Jyeshtha", "Moola", "Purva Ashadha", "Uttara Ashadha", "Shravana",
      "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
    ];
    const ownerNakIndex = nakshatramList.indexOf(ownerNakStr) + 1;
    if (ownerNakIndex === 0) return ["-", "-"];
    
    let diff = plotNak - ownerNakIndex;
    if (diff < 0) diff += 27;
    let rem = diff % 9;
    if (rem === 0) rem = 9;
    
    return [String(rem), String(rem)];
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
    ["Dikruti", ...exactAndRounded(dikruti)],
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
    table2Rows = [
      ["Padamu", exactAndRounded(sp)[0]],
      ["Dhanamu", ...exactAndRounded(getRemainderLabel((sp * 8), 12))],
      ["Runamu", ...exactAndRounded(getRemainderLabel((sp * 3), 8))],
      ["Tithi", ...exactAndRounded(getRemainderLabel((sp * 6), 30))],
      ["Vaaramu", ...exactAndRounded(getRemainderLabel((sp * 9), 7))],
      ["Nakshatram", ...exactAndRounded(getRemainderLabel((sp * 8), 27))],
      ["Aayamu", ...exactAndRounded(getRemainderLabel((sp * 9), 8))],
      ["Ayurdayamu", ...exactAndRounded(getRemainderLabel((sp * 9), 120))],
      ["Amsa", ...exactAndRounded(getRemainderLabel((sp * 6), 9))],
      ["Dikruti", ...exactAndRounded(getRemainderLabel((sp * 9), 8))]
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

  const getVastuRemainder = (padamu: number, multiplier: number, modulus: number): number => {
    // Use Math.round instead of toFixed+Number for massive performance gain in loops
    const product = Math.round(padamu * multiplier * 10000) / 10000;
    const remainder = product % modulus;
    if (remainder === 0) return modulus;
    const ceilVal = Math.ceil(remainder);
    return ceilVal === 0 ? modulus : ceilVal;
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
  const goodDikruti = [1, 3, 5, 7];

  if (!isNaN(start) && !isNaN(end) && start > 0 && end >= start) {
    for (let n = start; n <= end; n++) {
      for (let i = 1; i <= 15; i++) {
        const padamuVal = n + i / 16;
        
        const dhanamuNum = getVastuRemainder(padamuVal, 8, 12);
        const runamuNum = getVastuRemainder(padamuVal, 3, 8);
        if (dhanamuNum <= runamuNum) continue;

        const tithiNum = getVastuRemainder(padamuVal, 6, 30);
        if (badTithi.includes(tithiNum)) continue;

        const vaaramuNum = getVastuRemainder(padamuVal, 9, 7);
        if (!goodVaaramu.includes(vaaramuNum)) continue;
        
        const aayamuNum = getVastuRemainder(padamuVal, 9, 8);
        if (!goodAayamu.includes(aayamuNum)) continue;

        const ayurdayamuNum = getVastuRemainder(padamuVal, 9, 120);
        if (ayurdayamuNum < 60) continue;

        const amsaNum = getVastuRemainder(padamuVal, 6, 9);
        if (!goodAmsa.includes(amsaNum)) continue;

        const dikrutiNum = getVastuRemainder(padamuVal, 9, 8);
        if (!goodDikruti.includes(dikrutiNum)) continue;

        // Nakshatram is always considered good for Table 3, calculate only if we reach here
        const nakshatramNum = getVastuRemainder(padamuVal, 8, 27);

        const label = `${n} ${i}/16`;
        const columns = [
          dhanamuNum.toFixed(2).replace(/\.00$/, ''),
          runamuNum.toFixed(2).replace(/\.00$/, ''),
          tithiNum.toFixed(2).replace(/\.00$/, ''),
          vaaramuNum.toFixed(2).replace(/\.00$/, ''),
          nakshatramNum.toFixed(2).replace(/\.00$/, ''),
          aayamuNum.toFixed(2).replace(/\.00$/, ''),
          ayurdayamuNum.toFixed(2).replace(/\.00$/, ''),
          amsaNum.toFixed(2).replace(/\.00$/, ''),
          dikrutiNum.toFixed(2).replace(/\.00$/, '')
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
    headers: ["Padamu", "Dhanamu", "Runamu", "Tithi", "Vaaramu", "Nakshatram", "Aayamu", "Ayurdayam", "Amsa", "Dikruti"],
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
