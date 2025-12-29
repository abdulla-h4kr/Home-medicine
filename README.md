# Home Medicine Inventory

A cross-platform (Expo + React Native) mobile application for tracking household medicines, storage locations, and tags. The app is designed with an offline-first architecture using local storage and modular services to support future features like reminders, notifications, and cloud sync.

## Highlights
- Custom storage locations (e.g., Medicine Drawer, First Aid Box).
- Add medicines via scan placeholder or manual input.
- Unified list of available medicines with search and tag filters.
- Modular data/services layer to support future feature growth.

## Getting started
```bash
nvm use
npm install
npm run start
```

## Troubleshooting
### Windows: `ENOENT ... .expo\\metro\\externals\\node:sea`
This error is caused by Node.js versions that include the `node:sea` builtin module. Expo CLI attempts
to create a shim directory with a colon in the name, which is invalid on Windows. Use Node.js 18.x
(`nvm use` will load the pinned version in `.nvmrc`), then reinstall dependencies and retry.
