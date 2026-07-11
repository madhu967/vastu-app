const fs = require('fs');
let content = fs.readFileSync('src/pdf/generateVastuPdf.ts', 'utf8');

// 1. Add key to metrics
content = content.replace(/\{ label: form\.language === 'Telugu' \? "ధన సంఖ్య" : form\.language === 'Hindi' \? "धन संख्या" : "Dhanamu",/g, '{ key: "Dhanamu", label: form.language === "Telugu" ? "ధన సంఖ్య" : form.language === "Hindi" ? "धन संख्या" : "Dhanamu",');
content = content.replace(/\{ label: form\.language === 'Telugu' \? "రుణ సంఖ్య" : form\.language === 'Hindi' \? "ऋण संख्या" : "Runamu",/g, '{ key: "Runamu", label: form.language === "Telugu" ? "రుణ సంఖ్య" : form.language === "Hindi" ? "ऋण संख्या" : "Runamu",');
content = content.replace(/\{ label: form\.language === 'Telugu' \? "తిథి సంఖ్య" : form\.language === 'Hindi' \? "तिथि संख्या" : "Tithi",/g, '{ key: "Tithi", label: form.language === "Telugu" ? "తిథి సంఖ్య" : form.language === "Hindi" ? "तिथि संख्या" : "Tithi",');
content = content.replace(/\{ label: form\.language === 'Telugu' \? "వార సంఖ్య" : form\.language === 'Hindi' \? "वार संख्या" : "Vaaramu",/g, '{ key: "Vaaramu", label: form.language === "Telugu" ? "వార సంఖ్య" : form.language === "Hindi" ? "वार संख्या" : "Vaaramu",');
content = content.replace(/\{ label: form\.language === 'Telugu' \? "నక్షత్ర సంఖ్య" : form\.language === 'Hindi' \? "नक्षत्र संख्या" : "Nakshatram",/g, '{ key: "Nakshatram", label: form.language === "Telugu" ? "నక్షత్ర సంఖ్య" : form.language === "Hindi" ? "नक्षत्र संख्या" : "Nakshatram",');
content = content.replace(/\{ label: form\.language === 'Telugu' \? "ఆయాది సంఖ్య" : form\.language === 'Hindi' \? "आयादि संख्या" : "Aayamu",/g, '{ key: "Aayamu", label: form.language === "Telugu" ? "ఆయాది సంఖ్య" : form.language === "Hindi" ? "आयादि संख्या" : "Aayamu",');
content = content.replace(/\{ label: form\.language === 'Telugu' \? "ఆయుర్దాయ సంఖ్య" : form\.language === 'Hindi' \? "आयुर्दाय संख्या" : "Ayurdayamu",/g, '{ key: "Ayurdayamu", label: form.language === "Telugu" ? "ఆయుర్దాయ సంఖ్య" : form.language === "Hindi" ? "आयुर्दाय संख्या" : "Ayurdayamu",');
content = content.replace(/\{ label: form\.language === 'Telugu' \? "అంశ సంఖ్య" : form\.language === 'Hindi' \? "अंश संख्या" : "Amsa",/g, '{ key: "Amsa", label: form.language === "Telugu" ? "అంశ సంఖ్య" : form.language === "Hindi" ? "अंश संख्या" : "Amsa",');
content = content.replace(/\{ label: form\.language === 'Telugu' \? "దిక్పతి సంఖ్య" : form\.language === 'Hindi' \? "दिक्पति संख्या" : "Dikruti",/g, '{ key: "Dikruti", label: form.language === "Telugu" ? "దిక్పతి సంఖ్య" : form.language === "Hindi" ? "दिक्पति संख्या" : "Dikruti",');

// 2. Change getPhalaData switch
content = content.replace(/case "ధన సంఖ్య":/g, 'case "Dhanamu":');
content = content.replace(/case "రుణ సంఖ్య":/g, 'case "Runamu":');
content = content.replace(/case "తిథి సంఖ్య":/g, 'case "Tithi":');
content = content.replace(/case "వార సంఖ్య":/g, 'case "Vaaramu":');
content = content.replace(/case "నక్షత్ర సంఖ్య":/g, 'case "Nakshatram":');
content = content.replace(/case "ఆయాది సంఖ్య":/g, 'case "Aayamu":');
content = content.replace(/case "ఆయుర్దాయ సంఖ్య":/g, 'case "Ayurdayamu":');
content = content.replace(/case "అంశ సంఖ్య":/g, 'case "Amsa":');
content = content.replace(/case "దిక్పతి సంఖ్య":/g, 'case "Dikruti":');

// 3. Update the call
content = content.replace(/const phalaData = getPhalaData\(row\.label, /g, 'const phalaData = getPhalaData(row.key, ');

fs.writeFileSync('src/pdf/generateVastuPdf.ts', content, 'utf8');
console.log('Fixed Phala language bug');
