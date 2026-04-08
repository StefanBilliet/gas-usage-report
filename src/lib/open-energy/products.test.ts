import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { getGasProducts } from './products';

const server = setupServer(
  http.get('https://api.openenergie.test/v1/products', ({ request }) => {
    const url = new URL(request.url);

    expect(url.searchParams.get('yearMonth')).toBe('2025-10');
    expect(url.searchParams.get('energyType')).toBe('gas');
    expect(url.searchParams.get('contractType')).toBe('consumption');
    expect(request.headers.get('x-api-key')).toBe('test-api-key');

    return HttpResponse.json({
      data: [
        {
          id: 42,
          productName: 'Fixed Gas 2025',
          energyType: 'gas',
          priceModel: 'fixed',
          subType: null,
          serviceArea: { country: 'BE', region: 'Flanders' },
          characteristics: {
            directDebitOnly: null,
            emailInvoiceOnly: null,
            onlineServiceOnly: null,
            greenEnergy: null,
            greenEnergyAndLocal: null,
            contractDuration: null,
            priceCertaintyPeriod: null,
            onlyForClientWithSolar: null,
            onlyForClientWithEV: null,
            includesSolarPanels: null,
            includesChargingStation: null,
            groupPurchase: null,
            cooperative: null,
          },
          merchant: {
            id: 'merchant-a',
            displayName: 'Merchant A',
            website: null,
            hasNativeApp: null,
            cooperative: null,
            country: 'BE',
          },
        },
      ],
      meta: { offset: 0, limit: 25, total: 1 },
    });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getGasProducts', () => {
  test('given a month when the gas catalogue is requested then it returns the matching products', async () => {
    await expect(
      getGasProducts({
        yearMonth: '2025-10',
        baseUrl: 'https://api.openenergie.test',
        apiKey: 'test-api-key',
      }),
    ).resolves.toEqual([
      expect.objectContaining({
        id: 42,
        productName: 'Fixed Gas 2025',
      }),
    ]);
  });
});
