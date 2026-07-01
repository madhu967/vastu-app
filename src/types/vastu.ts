export type OptionItem = {
  label: string;
  value: string;
};

export type VastuFormValues = {
  language: string;
  ownerName: string;
  nakshatram: string;
  direction: string;
  widthFeet: string;
  widthInch: string;
  widthNullu: string;
  depthFeet: string;
  depthInch: string;
  depthNullu: string;
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
};

export type ResultTable = {
  title: string;
  rows: ResultRow[];
  visible?: boolean;
};

export type VastuReport = {
  summaryTables: [ResultTable, ResultTable, ResultTable];
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
};
