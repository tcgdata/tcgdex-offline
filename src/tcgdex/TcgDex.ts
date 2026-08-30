import { normalizeSet, normalizeSeries, normalizeCard } from '../normalizers';
import { Series, Set, Card } from '../types';
import { ImageExtension, ImageQuality } from '../constants';
import { ResolvedTxgDexProps } from './TcgDex.types';
import { ResourceNotFoundError } from '../error';

export class TcgDex<
  TSeriesIds extends ReadonlyArray<string> = ReadonlyArray<string>,
  TSetIds extends ReadonlyArray<string> = ReadonlyArray<string>,
> {
  public constructor(private readonly props: ResolvedTxgDexProps) {}

  public async getSeries(): Promise<Array<Series<TSeriesIds>>> {
    const series = await this.props.repository.loadSeries();
    const normalizedSeries: Array<Series<TSeriesIds>> = [];

    series.forEach((serie) => {
      const normalized = normalizeSeries(serie, this.props);

      if (normalized) {
        normalizedSeries.push(normalized as Series<TSeriesIds>);
      }
    });

    return normalizedSeries;
  }

  public async getSeriesById(id: TSeriesIds[number]): Promise<Series<TSeriesIds>> {
    const series = await this.props.repository.loadSeries();
    const serie = series.find((item) => item.id === id);
    const normalized = serie && normalizeSeries(serie, this.props);

    if (!normalized) {
      throw new ResourceNotFoundError(
        `Series with ID "${id}" does not exist for language "${this.props.language}".`
      );
    }

    return normalized as Series<TSeriesIds>;
  }

  public async getSetsBySeriesId(
    seriesId: TSeriesIds[number]
  ): Promise<Array<Set<TSeriesIds, TSetIds>>> {
    const sets = await this.props.repository.loadSetsBySeriesId(seriesId);

    if (!sets) {
      throw new ResourceNotFoundError(
        `Series with ID "${seriesId}" does not exist for language "${this.props.language}".`
      );
    }

    const normalizedSets: Array<Set<TSeriesIds, TSetIds>> = [];

    sets.forEach((set) => {
      const normalized = normalizeSet(set, this.props);

      if (normalized) {
        normalizedSets.push(normalized as Set<TSeriesIds, TSetIds>);
      }
    });

    return normalizedSets;
  }

  public async getSetById(id: TSetIds[number]): Promise<Set<TSeriesIds, TSetIds>> {
    for (const seriesId in this.props.config.setIdsBySeriesId) {
      if (this.props.config.setIdsBySeriesId[seriesId].includes(id)) {
        const sets = await this.props.repository.loadSetsBySeriesId(seriesId);
        const set = sets?.find((set) => set.id === id);
        const normalized = set && normalizeSet(set, this.props);

        if (normalized) {
          return normalized as Set<TSeriesIds, TSetIds>;
        }
      }
    }

    throw new ResourceNotFoundError(
      `Set with ID "${id}" does not exist for language "${this.props.language}".`
    );
  }

  public async getCardsBySetId(setId: TSetIds[number]): Promise<Array<Card<TSeriesIds, TSetIds>>> {
    const cards = await this.props.repository.loadCardsBySetId(setId);

    if (!cards) {
      throw new ResourceNotFoundError(
        `Set with ID "${setId}" does not exist for language "${this.props.language}".`
      );
    }

    const normalizedCards: Array<Card<TSeriesIds, TSetIds>> = [];

    cards.forEach((card) => {
      const normalized = normalizeCard(card, this.props);

      if (normalized) {
        normalizedCards.push(normalized as Card<TSeriesIds, TSetIds>);
      }
    });

    return normalizedCards;
  }

  public async getCardById(id: string): Promise<Card<TSeriesIds, TSetIds>> {
    const lastDash = id.lastIndexOf('-');

    if (lastDash >= 1) {
      const setId = id.substring(0, lastDash);
      const cards = await this.props.repository.loadCardsBySetId(setId);
      const card = cards?.find((card) => card.id === id);
      const normalized = card && normalizeCard(card, this.props);

      if (normalized) {
        return normalized as Card<TSeriesIds, TSetIds>;
      }
    }

    throw new ResourceNotFoundError(
      `Card with ID "${id}" does not exist for language "${this.props.language}".`
    );
  }

  public getCardImageUrl(
    card: Card<TSeriesIds, TSetIds>,
    quality: ImageQuality,
    extension: ImageExtension
  ): string {
    return `https://assets.tcgdex.net/${this.props.language}/${card.series.id}/${card.set.id}/${card.cardNumber}/${quality}.${extension}`;
  }

  public getSetLogoImageUrl(set: Set<TSeriesIds, TSetIds>, extension: ImageExtension): string {
    return `https://assets.tcgdex.net/${this.props.language}/${set.series.id}/${set.id}/logo.${extension}`;
  }
}
