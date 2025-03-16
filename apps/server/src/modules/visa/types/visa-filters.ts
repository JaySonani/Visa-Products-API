import { VisaType } from './enums';

export interface VisaFilters {
  country?: string;
  visaType?: VisaType;
  page?: number;
  limit?: number;
}
