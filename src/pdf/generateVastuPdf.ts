import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { VastuFormValues, VastuReport } from "@/types/vastu";

const rowMarkup = (label: string, value: string) => `
  <tr>
    <td class="label">${label}</td>
    <td class="value">${value}</td>
  </tr>
`;

const tableMarkup = (
  title: string,
  rows: Array<{ label: string; value: string }>,
) => `
  <section class="table-block">
    <h2>${title}</h2>
    <table>
      <tbody>
        ${rows.map((row) => rowMarkup(row.label, row.value)).join("")}
      </tbody>
    </table>
  </section>
`;

const template = (form: VastuFormValues, report: VastuReport) => {
  const tables = report.summaryTables.filter(Boolean) as Array<{
    title: string;
    rows: Array<{ label: string; value: string }>;
  }>;
  return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body {
            font-family: Arial, sans-serif;
            color: #2E2118;
            padding: 28px;
            background: #FFF9F2;
          }
          .page {
            background: #FFFFFF;
            border: 2px solid #C9A227;
            border-radius: 20px;
            padding: 24px;
          }
          .brand {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #E9DCC8;
            padding-bottom: 16px;
            margin-bottom: 16px;
          }
          h1 {
            margin: 0;
            font-size: 22px;
          }
          .meta {
            font-size: 12px;
            color: #7C7268;
          }
          .table-block {
            margin-top: 18px;
          }
          .table-block h2 {
            font-size: 16px;
            margin: 0 0 10px;
            color: #D97706;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          td {
            border: 1px solid #E9DCC8;
            padding: 10px 12px;
            font-size: 12px;
          }
          td.label {
            width: 45%;
            font-weight: 700;
            background: #FAF4EA;
          }
          .footer {
            margin-top: 18px;
            font-size: 11px;
            color: #7C7268;
          }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="brand">
            <div>
              <h1>Vastu Calculation Report</h1>
              <div class="meta">Generated automatically from the app</div>
            </div>
            <div class="meta">${form.ownerName || "Owner"}</div>
          </div>
          ${tables.map((t) => tableMarkup(t.title, t.rows)).join("")}
          <div class="footer">This PDF template can be replaced with your fixed production template without changing the app flow.</div>
        </div>
      </body>
    </html>
  `;
};

export const generateVastuPdf = async (
  form: VastuFormValues,
  report: VastuReport,
) => {
  const html = template(form, report);
  const { uri } = await Print.printToFileAsync({ html });

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(uri, {
      mimeType: "application/pdf",
      dialogTitle: "Share Vastu Report",
    });
  }

  return uri;
};
