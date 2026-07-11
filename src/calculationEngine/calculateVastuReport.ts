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

  const table1bRows = [
    ["Dhanamu", ...exactAndRounded(dhanamu)],
    ["Runamu", ...exactAndRounded(runamu)],
    ["Tithi", ...exactAndRounded(tithi)],
    ["Vaaramu", ...exactAndRounded(vaaramu)],
    ["Nakshatram", ...exactAndRounded(nakshatram)],
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
  const padamuTable: ResultTable = {
    title: "Result Table 2",
    rows: createRows([
      ["Padamu", form.suddhaPadham || "-"],
    ]),
    visible: true,
  };

  // Keep existing Table 3 (Padam with Star)
  const padamWithStarTable: ResultTable = {
    title: "Result Table 3",
    rows: createRows([
      ["1st Suddha Padham", form.firstSuddhaPadham || "-"],
      ["2nd Suddha Padham", form.secondSuddhaPadham || "-"],
    ]),
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
