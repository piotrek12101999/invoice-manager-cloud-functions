import { VATRateInfo } from './calculateVATRateInfo';

interface Accumulator {
    netPrice: number;
    grossAmount: number;
}

export const calculateSummary = (data: VATRateInfo) => {
  return Object.values(data).reduce(
    (accumulator: Accumulator, { netPrice, grossAmount }) => {
      return {
        netPrice: accumulator.netPrice + netPrice,
        grossAmount: accumulator.grossAmount + grossAmount,
      };
    },
    { netPrice: 0, grossAmount: 0 }
  );
};
