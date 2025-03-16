import { Visa } from '../types/visa';
import { VisaType, EntryType } from '../types/enums';

export const MOCK_VISAS: Visa[] = [
  {
    id: 1,
    country: 'USA',
    visaType: VisaType.TOURIST,
    priceUSD: 100,
    lengthOfStay: 90,
    numberOfEntries: EntryType.SINGLE,
    filingFeeUSD: 100,
  },
  {
    id: 2,
    country: 'Canada',
    visaType: VisaType.BUSINESS,
    priceUSD: 200,
    lengthOfStay: 180,
    numberOfEntries: EntryType.MULTIPLE,
    filingFeeUSD: 200,
  },
  {
    id: 3,
    country: 'Australia',
    visaType: VisaType.STUDENT,
    priceUSD: 300,
    lengthOfStay: 365,
    numberOfEntries: EntryType.SINGLE,
    filingFeeUSD: 300,
  },
];
