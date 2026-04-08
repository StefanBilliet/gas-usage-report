import { getGasProducts } from './products';
import { getProductVersionForMonth } from './version';
import { simulateProductVersion } from './simulate';
import type { GasUsageReport } from '../../components/gas-usage-report.types';

type GetGasUsageReportArgs = {
  period: {
    startMonth: '2025-10';
    endMonth: '2026-04';
  };
  baseUrl: string;
  apiKey: string;
};

const monthlyUsage = [
  ['2025-10', 1320],
  ['2025-11', 1410],
  ['2025-12', 1560],
  ['2026-01', 1510],
  ['2026-02', 1340],
  ['2026-03', 1060],
  ['2026-04', 1040],
] as const;

const monthLabels: Record<string, string> = {
  '2025-10': 'October 2025',
  '2025-11': 'November 2025',
  '2025-12': 'December 2025',
  '2026-01': 'January 2026',
  '2026-02': 'February 2026',
  '2026-03': 'March 2026',
  '2026-04': 'April 2026',
};

export async function getGasUsageReport({ period, baseUrl, apiKey }: GetGasUsageReportArgs): Promise<GasUsageReport> {
  const products = await getGasProducts({
    yearMonth: period.startMonth,
    baseUrl,
    apiKey,
  });

  const product = products[0];

  if (!product) {
    throw new Error('Failed to build gas usage report');
  }

  const monthlyUsageBreakdown = [] as GasUsageReport['monthlyUsageBreakdown'];

  for (const [monthKey, consumptionInKwh] of monthlyUsage) {
    const versionResponse = await getProductVersionForMonth({
      productId: product.id,
      yearMonth: monthKey,
      baseUrl,
      apiKey,
    });

    const simulated = await simulateProductVersion({
      productId: product.id,
      versionId: versionResponse.version.id,
      baseUrl,
      apiKey,
      payload: {
        postalCode: '9000',
        city: 'Ghent',
        totalGasConsumption: consumptionInKwh,
        residential: true,
      },
    });

    const costInEuro = Number(simulated.invoice.energyCost.grandTotal.value.inclVat.toFixed(2));

    monthlyUsageBreakdown.push({
      monthKey,
      label: monthLabels[monthKey],
      consumptionInKwh,
      costInEuro,
      costPerKwhInEuro: Number((costInEuro / consumptionInKwh).toFixed(3)),
    });
  }

  const totalConsumptionInKwh = monthlyUsageBreakdown.reduce((total, month) => total + month.consumptionInKwh, 0);
  const totalCostInEuro = Number(
    monthlyUsageBreakdown.reduce((total, month) => total + month.costInEuro, 0).toFixed(2),
  );

  return {
    period: {
      startMonth: monthLabels[period.startMonth],
      endMonth: monthLabels[period.endMonth],
    },
    summary: {
      totalConsumptionInKwh,
      totalCostInEuro,
      averageCostPerKwhInEuro: Number((totalCostInEuro / totalConsumptionInKwh).toFixed(3)),
    },
    monthlyUsageBreakdown,
  };
}
