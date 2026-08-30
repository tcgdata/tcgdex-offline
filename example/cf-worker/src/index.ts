/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  INTERNATIONAL_LANGUAGES,
  ASIAN_LANGUAGES,
  Language,
  TcgDex,
  CardRepository,
  ResourceNotFoundError,
} from '@tcgdata/tcgdex-offline';
import * as AsiaTcgDex from '@tcgdata/tcgdex-offline/db/asia';
import * as InternationalTcgDex from '@tcgdata/tcgdex-offline/db/international';
import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { createMiddleware } from 'hono/factory';

type Env = {
  Bindings: {
    ASSETS: Fetcher;
  };
  Variables: {
    tcgDex: TcgDex;
  };
};

const cacheMiddleware = createMiddleware(async (c, next) => {
  await next();

  // Don't cache errors
  if (c.res.status >= 500) {
    return;
  }

  // Don't override explicit cache header
  if (c.res.headers.get('cache-control')) {
    return;
  }

  // Short local cache, long CF cache
  c.res.headers.set(
    'cloudflare-cdn-cache-control',
    'public, max-age=86400, stale-while-revalidate=86400, stale-while-error=86400'
  );
  c.res.headers.set('cache-control', 'public, max-age=180');
});

const tcgDexMiddleware = createMiddleware(async (c, next) => {
  const language = c.req.param('language');
  let assetRoot: string | undefined;
  let seriesIds: ReadonlyArray<string>;
  let setIdsBySeriesId: Record<string, ReadonlyArray<string>>;

  if (!language) {
    return c.notFound();
  }

  if ((INTERNATIONAL_LANGUAGES as ReadonlyArray<string>).includes(language)) {
    assetRoot = 'db/international';
    seriesIds = InternationalTcgDex.SERIES_IDS;
    setIdsBySeriesId = InternationalTcgDex.SET_IDS_BY_SERIES_ID;
  } else if ((ASIAN_LANGUAGES as ReadonlyArray<string>).includes(language)) {
    assetRoot = 'db/asia';
    seriesIds = AsiaTcgDex.SERIES_IDS;
    setIdsBySeriesId = AsiaTcgDex.SET_IDS_BY_SERIES_ID;
  } else {
    return c.json({ message: `"${language}" is not a supported language.` }, 404);
  }

  const loadAsset = async (path: string): Promise<any> => {
    const response = await c.env.ASSETS.fetch(`https://static-assets/${assetRoot}/${path}`);

    if (response.status === 200) {
      return await response.json();
    }

    return;
  };

  const repository: CardRepository = {
    loadSeries: async () => {
      return await loadAsset('series.json');
    },
    loadCardsBySetId: async (setId: string) => {
      for (const seriesId in setIdsBySeriesId) {
        if (setIdsBySeriesId[seriesId].includes(setId)) {
          return await loadAsset(
            `cards/${encodeURIComponent(seriesId)}/${encodeURIComponent(setId)}.json`
          );
        }
      }
    },
    loadSetsBySeriesId: async (seriesId: string) => {
      return await loadAsset(`sets/${encodeURIComponent(seriesId)}.json`);
    },
  };

  c.set(
    'tcgDex',
    new TcgDex({
      language: language as Language,
      config: { setIdsBySeriesId, seriesIds },
      repository,
    })
  );

  await next();
});

const app = new Hono<Env>();

app.use('*', cacheMiddleware);
app.use('/:language/*', tcgDexMiddleware);
app.onError((error, c) => {
  if (error instanceof HTTPException) {
    return c.json({ message: error.message }, error.status);
  } else if (error instanceof ResourceNotFoundError) {
    return c.json({ message: error.message }, 404);
  }

  return c.json({ message: 'Internal Server Error' }, 500);
});

app.get('/:language/series', async (c) => {
  return c.json(await c.var.tcgDex.getSeries());
});

app.get('/:language/series/:seriesId', async (c) => {
  const { seriesId } = c.req.param();
  const series = await c.var.tcgDex.getSeriesById(seriesId);
  return series ? c.json(series) : c.notFound();
});

app.get('/:language/series/:seriesId/sets', async (c) => {
  const { seriesId } = c.req.param();
  return c.json(await c.var.tcgDex.getSetsBySeriesId(seriesId));
});

app.get('/:language/series/:seriesId/sets/:setId', async (c) => {
  const { seriesId, setId } = c.req.param();
  const set = await c.var.tcgDex.getSetById(setId);
  return set.series.id === seriesId ? c.json(set) : c.notFound();
});

app.get('/:language/series/:seriesId/sets/:setId/cards', async (c) => {
  const { seriesId, setId } = c.req.param();
  const cards = await c.var.tcgDex.getCardsBySetId(setId);
  return cards[0]?.series.id === seriesId ? c.json(cards) : c.notFound();
});

app.get('/:language/series/:seriesId/sets/:setId/cards/:cardId', async (c) => {
  const { seriesId, setId, cardId } = c.req.param();
  const card = await c.var.tcgDex.getCardById(cardId);
  return card.series.id === seriesId && card.set.id === setId ? c.json(card) : c.notFound();
});

export default app;
