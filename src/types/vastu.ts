export type OptionItem = {
  label: string;
  value: string;
};

export type VastuFormValues = {
  language: string;
  clientName: string;
  ownerName: string;
  nakshatram: string;
  vargu: string;
  phoneNumber: string;
  wifeName: string;
  wifeNakshatram: string;
  wifeVargu: string;
  direction: string;
  lengthFeet: string;
  lengthInch: string;
  lengthNullu: string;
  widthFeet: string;
  widthInch: string;
  widthNullu: string;
  suddhaPadham: string;
  suddhaFeet: string;
  suddhaInch: string;
  suddhaNullu: string;
  firstSuddhaPadham: string;
  secondSuddhaPadham: string;
};

export type ResultRow = {
  label: string;
  value: string;
  roundedValue?: string;
  columns?: string[];
};

export type ResultTable = {
  title: string;
  rows: ResultRow[];
  headers?: string[];
  visible?: boolean;
};

export type VastuReport = {
  summaryTables: [ResultTable, ResultTable, ResultTable];
  splitTable1a?: ResultTable;
  splitTable1b?: ResultTable;
  status: "success" | "warning";
  notes: string[];
};

export type GuideSection = {
  title: string;
  points: string[];
};

export type GuidePage = {
  key: string;
  title: string;
  subtitle: string;
  sections: GuideSection[];
  paragraphs?: string[]; // rich flowing paragraph content
  tableData?: { label: string; formula: string; value?: string }[];
  multiColumnTables?: {
    title?: string;
    headers: string[];
    rows: string[][];
  }[];
  bottomContent?: { heading?: string; text: string }[];
};
