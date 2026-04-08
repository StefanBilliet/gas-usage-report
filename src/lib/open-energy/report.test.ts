import { beforeEach, describe, expect, test, vi } from 'vitest';

import { getGasUsageReport } from './report';
import { getGasProducts } from './products';
import { getProductVersionForMonth } from './version';
import { simulateProductVersion } from './simulate';

vi.mock('./products', () => ({
  getGasProducts: vi.fn(),
}));

vi.mock('./version', () => ({
  getProductVersionForMonth: vi.fn(),
}));

vi.mock('./simulate', () => ({
  simulateProductVersion: vi.fn(),
}));

const mockedGetGasProducts = vi.mocked(getGasProducts);
const mockedGetProductVersionForMonth = vi.mocked(getProductVersionForMonth);
const mockedSimulateProductVersion = vi.mocked(simulateProductVersion);

const monthlyUsage = [
  ['2025-10', 1320],
  ['2025-11', 1410],
  ['2025-12', 1560],
  ['2026-01', 1510],
  ['2026-02', 1340],
  ['2026-03', 1060],
  ['2026-04', 1040],
] as const;

beforeEach(() => {
  vi.clearAllMocks();

  mockedGetGasProducts.mockResolvedValue([
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
  ]);

  mockedGetProductVersionForMonth.mockImplementation(async ({ yearMonth }) => ({
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
      id: Number(yearMonth.replace('-', '')),
      versionDate: yearMonth,
      tariffCardUrl: null,
      priceComponents: [],
      discounts: [],
    },
  }));

  mockedSimulateProductVersion.mockImplementation(async ({ payload }) => ({
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
        id: 1,
        versionDate: '2025-10',
        tariffCardUrl: null,
      },
    },
    invoice: {
      energyCost: {
        costCategories: [],
        grandTotal: {
          value: {
            exclVat: payload.totalGasConsumption * 0.150413,
            inclVat: Number((payload.totalGasConsumption * 0.182).toFixed(2)),
          },
          unit: 'EUR',
        },
      },
      injectionFee: null,
    },
  }));
});

describe('getGasUsageReport', () => {
  test('given the fixed 7-month period when the report is built then it orchestrates the data services and returns the breakdown', async () => {
    const report = await getGasUsageReport({
      period: { startMonth: '2025-10', endMonth: '2026-04' },
      baseUrl: 'https://open-energie.api.vwala.be',
      apiKey: 'test-api-key',
    });

    expect(mockedGetGasProducts).toHaveBeenCalledWith({
      yearMonth: '2025-10',
      baseUrl: 'https://open-energie.api.vwala.be',
      apiKey: 'test-api-key',
    });
    expect(mockedGetProductVersionForMonth).toHaveBeenCalledTimes(7);
    expect(mockedSimulateProductVersion).toHaveBeenCalledTimes(7);

    expect(report.period).toEqual({
      startMonth: 'October 2025',
      endMonth: 'April 2026',
    });

    expect(report.monthlyUsageBreakdown).toHaveLength(7);
    expect(report.monthlyUsageBreakdown[0]).toEqual(
      expect.objectContaining({
        monthKey: '2025-10',
        label: 'October 2025',
        consumptionInKwh: 1320,
        costInEuro: 240.24,
        costPerKwhInEuro: 0.182,
      }),
    );

    expect(report.summary).toEqual({
      totalConsumptionInKwh: 9240,
      totalCostInEuro: 1681.68,
      averageCostPerKwhInEuro: 0.182,
    });
  });
});
