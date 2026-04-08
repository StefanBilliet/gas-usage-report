import GasUsageReportView from '../components/gas-usage-report';
import { getGasUsageReport } from '../lib/open-energy/report';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const apiKey = process.env.OPEN_ENERGIE_API_KEY;
  const baseUrl = process.env.OPEN_ENERGIE_BASE_URL ?? 'https://open-energie.api.vwala.be';

  if (!apiKey) {
    throw new Error('Missing Open Energie API key');
  }

  const report = await getGasUsageReport({
    period: {
      startMonth: '2025-10',
      endMonth: '2026-04',
    },
    baseUrl,
    apiKey,
  });

  return <GasUsageReportView report={report} />;
}
