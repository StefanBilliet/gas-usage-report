import GasUsageReportView from '../components/gas-usage-report';
import { getGasUsageReport } from '../lib/open-energy/report';

export const dynamic = 'force-dynamic';

const reportPeriod = {
  startMonth: '2025-10',
  endMonth: '2026-04',
} as const;

const monthlyUsageByMonth = {
  '2025-10': 1320,
  '2025-11': 1410,
  '2025-12': 1560,
  '2026-01': 1510,
  '2026-02': 1340,
  '2026-03': 1060,
  '2026-04': 1040,
} as const;

export default async function Page() {
  const apiKey = process.env.OPEN_ENERGIE_API_KEY;
  const baseUrl = process.env.OPEN_ENERGIE_BASE_URL ?? 'https://open-energie.api.vwala.be';

  if (!apiKey) {
    throw new Error('Missing Open Energie API key');
  }

  const report = await getGasUsageReport({
    period: reportPeriod,
    monthlyUsageByMonth,
    baseUrl,
    apiKey,
  });

  return <GasUsageReportView report={report} />;
}
