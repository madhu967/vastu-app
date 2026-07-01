import {
  ResultRow,
  ResultTable,
  VastuFormValues,
  VastuReport,
} from "@/types/vastu";
import { formatCompact, formatDecimal, toFeetValue } from "@/utils/number";

const stableScore = (value: string) =>
  value
    .split("")
    .reduce(
      (total, character, index) =>
        total + character.charCodeAt(0) * (index + 1),
      0,
    );

const lookupMetric = (
  seed: number,
  offset: number,
  modulus: number,
  label: string,
) => {
  const result = ((seed + offset) % modulus) + 1;
  return `${label} ${result}`;
};

const createRows = (entries: Array<[string, string]>): ResultRow[] =>
  entries.map(([label, value]) => ({ label, value }));

export const calculateVastuReport = (form: VastuFormValues): VastuReport => {
  const width = toFeetValue(form.widthFeet, form.widthInch, form.widthNullu);
  const depth = toFeetValue(form.depthFeet, form.depthInch, form.depthNullu);
  const plotArea = width * depth;
  const squareFeet = plotArea;
  const cents = plotArea / 435.6;
  const guntalu = plotArea / 1089;
  const ankanam = plotArea / 36;
  const perimeter = 2 * (width + depth);

  const seed = stableScore(
    `${form.language}-${form.ownerName}-${form.nakshatram}-${form.direction}`,
  );
  const firstPadhamSeed = stableScore(
    `${form.firstSuddhaPadham}-${form.suddhaPadham}-${form.secondSuddhaPadham}`,
  );

  const summaryTable: ResultTable = {
    title: "Result Table 1",
    rows: createRows([
      ["Plot Width", `${formatDecimal(width)} ft`],
      ["Plot Depth", `${formatDecimal(depth)} ft`],
      ["Plot Area", `${formatDecimal(plotArea)} sq ft`],
      ["Square Feet", formatCompact(squareFeet)],
      ["Cents", formatDecimal(cents)],
      ["Guntalu", formatDecimal(guntalu)],
      ["Ankanam", formatDecimal(ankanam)],
      ["Plot Perimeter", `${formatDecimal(perimeter)} ft`],
    ]),
    visible: true,
  };

  const padamuTable: ResultTable = {
    title: "Result Table 2",
    rows: createRows([
      ["Padamu", form.suddhaPadham || "-"],
      ["Income", lookupMetric(seed, 3, 12, "Income")],
      ["Expenditure", lookupMetric(seed, 6, 12, "Expenditure")],
      ["Ayamu", lookupMetric(seed, 1, 12, "Ayamu")],
      ["Life Span", lookupMetric(seed, 4, 12, "Life Span")],
      ["Amsa", lookupMetric(seed, 2, 9, "Amsa")],
      ["Star", form.nakshatram || "-"],
      ["Star Matching", lookupMetric(seed, 5, 27, "Match")],
      ["Tidhi", lookupMetric(seed, 7, 30, "Tidhi")],
      ["Week", lookupMetric(seed, 8, 7, "Week")],
      ["Dikpathi", lookupMetric(seed, 9, 8, "Dikpathi")],
      ["Yogamu", lookupMetric(seed, 10, 27, "Yogamu")],
      ["Karanamu", lookupMetric(seed, 11, 11, "Karanamu")],
    ]),
    visible: true,
  };

  // Table 3 always generates — shows Padam with Star data
  const padamWithStarTable: ResultTable = {
    title: "Result Table 3",
    rows: createRows([
      ["1st Suddha Padham", form.firstSuddhaPadham || "-"],
      ["2nd Suddha Padham", form.secondSuddhaPadham || "-"],
      [
        "Suddha Feet-Inch-Nullu",
        `${formatDecimal(toFeetValue(form.suddhaFeet, form.suddhaInch, form.suddhaNullu))} ft`,
      ],
      ["Income", lookupMetric(firstPadhamSeed, 2, 12, "Income")],
      ["Expenditure", lookupMetric(firstPadhamSeed, 5, 12, "Expenditure")],
      ["Ayamu", lookupMetric(firstPadhamSeed, 1, 12, "Ayamu")],
      ["Life Span", lookupMetric(firstPadhamSeed, 6, 12, "Life Span")],
      ["Amsa", lookupMetric(firstPadhamSeed, 4, 9, "Amsa")],
      ["Star Padham", form.firstSuddhaPadham || "-"],
      ["Tidhi", lookupMetric(firstPadhamSeed, 7, 30, "Tidhi")],
      ["Week", lookupMetric(firstPadhamSeed, 8, 7, "Week")],
      ["Dikpathi", lookupMetric(firstPadhamSeed, 9, 8, "Dikpathi")],
      ["Yogamu", lookupMetric(firstPadhamSeed, 10, 27, "Yogamu")],
      ["Karanamu", lookupMetric(firstPadhamSeed, 11, 11, "Karanamu")],
    ]),
    visible: true,
  };

  return {
    summaryTables: [summaryTable, padamuTable, padamWithStarTable],
    status: "success",
    notes: [
      "Calculation engine is isolated from the UI.",
      "Replace the derived lookup logic with your website formulas to match production output exactly.",
    ],
  };
};
