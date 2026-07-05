import {
  ResultRow,
  ResultTable,
  VastuFormValues,
  VastuReport,
} from "@/types/vastu";
import { formatDecimal, toNumber } from "@/utils/number";

const createRows = (entries: Array<[string, string]>): ResultRow[] =>
  entries.map(([label, value]) => ({ label, value }));

// Correct formula: nullu divides by 8, not 96
const toFeetValueCorrect = (feet: string, inch: string, nullu: string) => {
  const feetValue = toNumber(feet);
  const inchValue = toNumber(inch);
  const nulluValue = toNumber(nullu);
  return feetValue + inchValue / 12 + nulluValue / 8;
};

const getRemainderLabel = (value: number, modulus: number): string => {
  const remainder = value % modulus;
  const r = remainder === 0 ? modulus : remainder;
  return String(Math.round(r * 100) / 100);
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

  // Summary table 1 — exact order as specified
  const summaryTable: ResultTable = {
    title: "Result Table 1",
    rows: createRows([
      ["Plot Length", `${formatDecimal(length)} ft`],
      ["Plot Width", `${formatDecimal(width)} ft`],
      ["Padamu", formatDecimal(padamu)],
      ["Plot Area", `${formatDecimal(plotAreaSqFeet)} sq ft`],
      ["Plot Area", `${formatDecimal(plotAreaSqYards)} sq yds`],
      ["Plot Area", `${formatDecimal(plotAreaCents)} cents`],
      ["Plot Perimeter", `${formatDecimal(perimeter)} ft`],
      ["Padamu", formatDecimal(padamu)],
      ["Diagonal", `${formatDecimal(diagonal)} ft`],
      ["Dhanamu", dhanamu],
      ["Runamu", runamu],
      ["Tithi", tithi],
      ["Vaaramu", vaaramu],
      ["Nakshatram", nakshatram],
      ["Aayamu", aayamu],
      ["Ayurdayamu", ayurdayamu],
      ["Amsa", amsa],
      ["Dikruti", dikruti],
    ]),
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
    status: "success",
    notes: [],
  };
};
