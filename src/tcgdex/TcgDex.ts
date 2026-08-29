import { normalizeSet, normalizeSeries, normalizeCard } from '../normalizers';
import { DatabaseName, SeriesId, SetId, Series, Set, Card } from '../types';
import { ImageExtension, ImageQuality } from '../constants';
import { ResolvedTxgDexProps } from './TcgDex.types';

export class TcgDex<TDatabase extends DatabaseName = DatabaseName> {
  public constructor(private readonly props: ResolvedTxgDexProps) {}

  public async getSeries(): Promise<Array<Series<TDatabase>>> {
    const series = await this.props.repository.loadSeries();
    const normalizedSeries: Array<Series<TDatabase>> = [];

    series.forEach((serie) => {
      const normalized = normalizeSeries(serie, this.props);

      if (normalized) {
        normalizedSeries.push(normalized as Series<TDatabase>);
      }
    });

    return normalizedSeries;
  }

  public async getSeriesById(id: SeriesId<TDatabase>): Promise<Series<TDatabase>> {
    const series = await this.props.repository.loadSeriesById(id);
    const normalized = series && normalizeSeries(series, this.props);

    if (!normalized) {
      throw new Error(
        `Series with ID "${id}" does not exist for language "${this.props.language}".`
      );
    }

    return normalized as Series<TDatabase>;
  }

  public async getSetsBySeriesId(seriesId: SeriesId<TDatabase>): Promise<Array<Set<TDatabase>>> {
    const sets = await this.props.repository.loadSetsBySeriesId(seriesId);
    const normalizedSets: Array<Set<TDatabase>> = [];

    sets.forEach((set) => {
      const normalized = normalizeSet(set, this.props);

      if (normalized) {
        normalizedSets.push(normalized as Set<TDatabase>);
      }
    });

    return normalizedSets;
  }

  public async getSetById(id: SetId<TDatabase>): Promise<Set<TDatabase>> {
    const set = await this.props.repository.loadSetById(id);
    const normalized = set && normalizeSet(set, this.props);

    if (!normalized) {
      throw new Error(`Set with ID "${id}" does not exist for language "${this.props.language}".`);
    }

    return normalized as Set<TDatabase>;
  }

  public async getCardsBySetId(setId: SetId<TDatabase>): Promise<Array<Card<TDatabase>>> {
    const cards = await this.props.repository.loadCardsBySetId(setId);
    const normalizedCards: Array<Card<TDatabase>> = [];

    cards.forEach((card) => {
      const normalized = normalizeCard(card, this.props);

      if (normalized) {
        normalizedCards.push(normalized as Card<TDatabase>);
      }
    });

    return normalizedCards;
  }

  public async getCardById(id: string): Promise<Card<TDatabase>> {
    const card = await this.props.repository.loadCardById(id);
    const normalized = card && normalizeCard(card, this.props);

    if (!normalized) {
      throw new Error(`Card with ID "${id}" does not exist for language "${this.props.language}".`);
    }

    return normalized as Card<TDatabase>;
  }

  public getCardImageUrl(
    card: Card<TDatabase>,
    quality: ImageQuality,
    extension: ImageExtension
  ): string {
    return `https://assets.tcgdex.net/${this.props.language}/${card.series.id}/${card.set.id}/${card.cardNumber}/${quality}.${extension}`;
  }

  public getSetLogoImageUrl(set: Set<TDatabase>, extension: ImageExtension): string {
    return `https://assets.tcgdex.net/${this.props.language}/${set.series.id}/${set.id}/logo.${extension}`;
  }
}
