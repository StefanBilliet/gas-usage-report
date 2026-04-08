import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { getProductVersionForMonth } from './version';

const server = setupServer(
  http.get('https://open-energie.api.vwala.be/v1/products/42/versions/2025-10', ({ request }) => {
    expect(request.headers.get('x-api-key')).toBe('test-api-key');

    return HttpResponse.json({
      merchant: {
        id: 'merchant-a',
        displayName: 'Merchant A',
        website: null,
        hasNativeApp: null,
        cooperative: null,
        country: 'BE',
      },
      product: {
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
      },
      version: {
        id: 7,
        versionDate: '2025-10',
        tariffCardUrl: null,
        priceComponents: [],
        discounts: [],
      },
    });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('getProductVersionForMonth', () => {
  test('given a product and month when the version is requested then it returns the active version', async () => {
    await expect(
      getProductVersionForMonth({
        productId: 42,
        yearMonth: '2025-10',
        baseUrl: 'https://open-energie.api.vwala.be',
        apiKey: 'test-api-key',
      }),
    ).resolves.toEqual(
      expect.objectContaining({
        version: expect.objectContaining({
          id: 7,
          versionDate: '2025-10',
        }),
      }),
    );
  });
});
