import * as maplibregl from 'maplibre-gl';
// maplibre-gl v6 è ESM-only e carica il worker da un URL derivato da `import.meta.url`
// del proprio bundle. Dopo il bundling di Vite quel file non esiste in /build/assets,
// quindi il worker va 404 e la mappa non renderizza: lo indirizziamo esplicitamente al
// worker che Vite emette a build time.
// @ts-expect-error - suffisso ?worker&url risolto da Vite, non da TypeScript
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';

maplibregl.setWorkerUrl(maplibreWorkerUrl as string);

export default maplibregl;
