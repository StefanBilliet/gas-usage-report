import { getGasProducts } from './products';
import { getProductVersionForMonth } from './version';
import { simulateProductVersion } from './simulate';
import type { GasUsageReport } from '@/components/gas-usage-report.types';

type YearMonth = `${number}-${number}`;

type GetGasUsageReportArgs = {
  period: {
    startMonth: YearMonth;
    endMonth: YearMonth;
  };
  monthlyUsageByMonth: Partial<Record<YearMonth, number>>;
  baseUrl: string;
  apiKey: string;
};

const monthLabelFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

const targetProduct = {
  search: 'Eneco Aardgas Flex',
  priceModel: 'variable' as const,
};

function parseYearMonth(yearMonth: YearMonth) {
  const [year, month] = yearMonth.split('-').map(Number);

  return new Date(Date.UTC(year, month - 1, 1));
}

function formatYearMonth(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');

  return `${year}-${month}` as YearMonth;
}

function listMonths(startMonth: YearMonth, endMonth: YearMonth) {
  const current = parseYearMonth(startMonth);
  const end = parseYearMonth(endMonth);

  if (current > end) {
    throw new Error('Invalid gas usage report period');
  }

  const months: YearMonth[] = [];

  while (current <= end) {
    months.push(formatYearMonth(current));
    current.setUTCMonth(current.getUTCMonth() + 1);
  }

  return months;
}

function formatMonthLabel(yearMonth: YearMonth) {
  return monthLabelFormatter.format(parseYearMonth(yearMonth));
}

export async function getGasUsageReport({ period, monthlyUsageByMonth, baseUrl, apiKey }: GetGasUsageReportArgs): Promise<GasUsageReport> {
  const months = listMonths(period.startMonth, period.endMonth);

  const products = await getGasProducts({
    yearMonth: period.startMonth,
    baseUrl,
    apiKey,
    search: targetProduct.search,
    priceModel: targetProduct.priceModel,
  });

  const product = products.find(
    (candidate) =>
      candidate.priceModel === 'variable' &&
      candidate.productName.toLowerCase().includes('aardgas flex') &&
      candidate.merchant.displayName.toLowerCase().includes('eneco'),
  );

  if (!product) {
    throw new Error('Failed to build gas usage report');
  }

  const monthlyUsageBreakdown = [] as GasUsageReport['monthlyUsageBreakdown'];

  for (const monthKey of months) {
    const consumptionInKwh = monthlyUsageByMonth[monthKey];

    if (consumptionInKwh === undefined) {
      throw new Error('Missing monthly gas usage data');
    }

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
        yearFraction: 1 / 12,
      },
    });

    const costInEuro = Number(simulated.invoice.energyCost.grandTotal.value.inclVat.toFixed(2));

    monthlyUsageBreakdown.push({
      monthKey,
      label: formatMonthLabel(monthKey),
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
      startMonth: formatMonthLabel(period.startMonth),
      endMonth: formatMonthLabel(period.endMonth),
    },
    summary: {
      totalConsumptionInKwh,
      totalCostInEuro,
      averageCostPerKwhInEuro: Number((totalCostInEuro / totalConsumptionInKwh).toFixed(3)),
    },
    monthlyUsageBreakdown,
  };
}
