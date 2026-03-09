# RosM Autos

Quality-inspected used automobiles, farm tractors, and electric bikes for export.

## Car images (one-time import)

The site does **not** read images from your computer’s “Mimba” folder at runtime. All images are **copied into the repo** when you run the import script.

1. Run the import once (point it at your Mimba car selection folder):
   ```bash
   node scripts/import-mimba-cars.js "C:\path\to\Mimba final car selection\Toyota Hilux"
   ```
   This copies images `1.jpg`–`4.jpg` from each car folder into `public/images/inventory/<slug>/` and updates `lib/used-cars-data.json`.

2. Commit the copied files to Git so the site is self-contained:
   ```bash
   git add public/images/inventory lib/used-cars-data.json
   git commit -m "Add car images and inventory data"
   git push
   ```

After that, the site will show all car images from the repo. You can delete the original Mimba folder on your computer and the site will still work (locally and on GitHub/deployments).

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```
