interface Product {
  name: string;
  quantity: number;
  netPrice: number;
  VATRate: number;
  grossAmount: number;
}

export interface VATRateInfo {
  [key: string]: {
    netPrice: number;
    grossAmount: number;
  };
}

export const calculateVATRateInfo = (products: Product[]): VATRateInfo => {
  return products.reduce(
    (accumulator: VATRateInfo, { netPrice, quantity, VATRate, grossAmount }: Product) => {
      const totalNetPrice = netPrice * quantity;
      if (accumulator[VATRate]) {
        return {
          ...accumulator,
          [VATRate]: {
            netPrice: accumulator[VATRate].netPrice + totalNetPrice,
            grossAmount: accumulator[VATRate].grossAmount + grossAmount,
          },
        };
      }

      return {
        ...accumulator,
        [VATRate]: { netPrice: totalNetPrice, grossAmount },
      };
    },
    {}
  );
};
