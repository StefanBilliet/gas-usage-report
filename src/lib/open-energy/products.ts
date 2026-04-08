type GetGasProductsArgs = {
  yearMonth: string;
  baseUrl: string;
  apiKey: string;
  search?: string;
  priceModel?: 'fixed' | 'variable' | 'dynamic';
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

export async function getGasProducts({ yearMonth, baseUrl, apiKey, search, priceModel }: GetGasProductsArgs) {
  const url = new URL('/v1/products', baseUrl);

  url.searchParams.set('yearMonth', yearMonth);
  url.searchParams.set('energyType', 'gas');
  url.searchParams.set('contractType', 'consumption');

  if (search) {
    url.searchParams.set('search', search);
  }

  if (priceModel) {
    url.searchParams.set('priceModel', priceModel);
  }

  const response = await fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to load gas products');
  }

  const payload = (await response.json()) as GasProductsResponse;

  return payload.data;
}
