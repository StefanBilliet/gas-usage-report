type GetGasProductsArgs = {
  yearMonth: string;
  baseUrl: string;
  apiKey: string;
};

export type GasProduct = {
  id: number;
  productName: string;
  energyType: 'gas';
  priceModel: 'fixed' | 'variable' | 'dynamic';
  subType: string | null;
  serviceArea: {
    country: string;
    region: 'Flanders';
  };
  characteristics: Record<string, boolean | string | null>;
  merchant: {
    id: string;
    displayName: string;
    website: string | null;
    hasNativeApp: boolean | null;
    cooperative: boolean | null;
    country: string;
  };
};

type GasProductsResponse = {
  data: GasProduct[];
};

export async function getGasProducts({ yearMonth, baseUrl, apiKey }: GetGasProductsArgs) {
  const response = await fetch(
    `${baseUrl}/v1/products?yearMonth=${encodeURIComponent(yearMonth)}&energyType=gas&contractType=consumption`,
    {
      headers: {
        'x-api-key': apiKey,
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to load gas products');
  }

  const payload = (await response.json()) as GasProductsResponse;

  return payload.data;
}
