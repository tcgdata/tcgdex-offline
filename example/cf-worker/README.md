# tcgdex-cf

Demonstrates a CF worker loading which provides endpoints for querying TCGdex data.

The endpoints exposed by the worker are:

- `GET /:language/series`
- `GET /:language/series/:seriesId`
- `GET /:language/series/:seriesId/sets`
- `GET /:language/series/:seriesId/sets/:setId`
- `GET /:language/series/:seriesId/sets/:setId/cards`
- `GET /:language/series/:seriesId/sets/:setId/cards/:cardId`

TCGdex data is uploaded as [CF static assets](https://developers.cloudflare.com/workers/static-assets/).

## Deployment instructions

1. Install/configure Wrangler: https://developers.cloudflare.com/workers/wrangler/install-and-update/
2. Install and build tcgdex-offline: `cd tcgdex-offline-directory && npm i && npm run build`
3. Install and prepare the worker dependencies: `cd example/cf-worker && npm i && npm run cf-typegen && npm run copy-assets`
4. Deploy the worker: `npm run deploy`
5. Go to the worker domain: `https://tcgdex-cf.[your-worker-domain].workers.dev/en/series`
