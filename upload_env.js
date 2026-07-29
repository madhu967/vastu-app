const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.error('.env file not found!');
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf-8');
const lines = envContent.split(/\r?\n/);

console.log('Uploading environment variables to EAS Secrets...');

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;

  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;

  const key = trimmed.slice(0, eqIdx).trim();
  const val = trimmed.slice(eqIdx + 1).trim();

  if (!key || !val) continue;

  console.log(`Setting secret: ${key}`);
  try {
    // Create/update EAS secret with type string
    execSync(`npx eas-cli secret:create --name "${key}" --value "${val}" --type string --scope project --force --non-interactive`, { stdio: 'inherit' });
  } catch (err) {
    console.error(`Failed to set secret ${key}`);
  }
}

console.log('All environment variables uploaded to EAS successfully!');
