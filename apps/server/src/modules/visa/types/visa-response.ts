import { Visa } from './visa';

export type GetVisasResponse = {
  page: number;
  limit: number;
  totalPages: number;
  totalRecords: number;
  visas: Visa[];
};

export type GetVisaByIdResponse = {
  visa: Visa;
};

export type VisaOperationResponse = {
  message: string;
  visa: Visa;
};
