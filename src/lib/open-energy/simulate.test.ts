import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { simulateProductVersion } from './simulate';

const server = setupServer(
  http.post('https://open-energie.api.vwala.be/v1/products/42/versions/7/simulate', async ({ request }) => {
    expect(request.headers.get('x-api-key')).toBe('test-api-key');
    expect(await request.json()).toEqual({
      postalCode: '9000',
      city: 'Ghent',
      totalGasConsumption: 1320,
      residential: true,
    });

    return HttpResponse.json({
      productDetails: {
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
        },
      },
      invoice: {
        energyCost: {
          costCategories: [],
          grandTotal: {
            value: {
              exclVat: 100,
              inclVat: 121,
            },
            unit: 'EUR',
          },
        },
        injectionFee: null,
      },
    });
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('simulateProductVersion', () => {
  test('given a product version and monthly gas usage when simulate is called then it returns the invoice result', async () => {
    await expect(
      simulateProductVersion({
        productId: 42,
        versionId: 7,
        baseUrl: 'https://open-energie.api.vwala.be',
        apiKey: 'test-api-key',
        payload: {
          postalCode: '9000',
          city: 'Ghent',
          totalGasConsumption: 1320,
          residential: true,
        },
      }),
    ).resolves.toEqual(
      expect.objectContaining({
        invoice: expect.objectContaining({
          energyCost: expect.objectContaining({
            grandTotal: expect.objectContaining({
              value: expect.objectContaining({
                inclVat: 121,
              }),
            }),
          }),
        }),
      }),
    );
  });
});
