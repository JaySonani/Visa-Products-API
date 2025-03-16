import { VisaType, EntryType } from './enums';

export interface Visa {
  id: number;
  country: string;
  visaType: VisaType;
  priceUSD: number;
  lengthOfStay: number;
  numberOfEntries: EntryType;
  filingFeeUSD: number;
}
