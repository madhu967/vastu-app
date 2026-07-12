const fs = require('fs');
const icon1 = fs.readFileSync('assets/icon3.jpeg', 'base64');
const icon2 = fs.readFileSync('assets/icon2.png', 'base64');

fs.writeFileSync('src/pdf/assetsBase64.ts', 
  'export const yantraBase64 = "data:image/jpeg;base64,' + icon1 + '";\n' +
  'export const compassBase64 = "data:image/png;base64,' + icon2 + '";\n'
);
console.log('Created assetsBase64.ts');
