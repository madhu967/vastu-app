# Vastu App

Premium Expo React Native application for Vastu consultation and calculation.

## Included

- Premium home calculator UI
- Clean calculation engine boundary
- PDF generation flow
- Drawer menu for Vastu guide pages
- Firebase configuration scaffold

## Run

1. Install dependencies.
2. Start the app with `npm run start`.
3. Scan the QR with Expo Go, or run `npm run android` / `npm run ios` for an emulator or simulator.

## QR Troubleshooting

If Android shows `java.io.IOException: failed to download remote update`, use the tunnel start mode:

1. Run `npm run start` again after a clean restart.
2. Make sure Expo Go is updated on the phone.
3. If your network blocks LAN traffic, keep using the tunnel start command.
4. If needed, uninstall and reinstall the app build on the device before scanning again.

## Environment

Set your Firebase credentials in `src/lib/firebase.ts` before connecting a real backend.

## Notes

The calculation engine and PDF pipeline are isolated so the existing website logic and template can be dropped in without changing the UI layer.
