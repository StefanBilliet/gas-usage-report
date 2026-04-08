import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import type { GasUsageReport } from '../components/gas-usage-report.types';
import { getGasUsageReport } from '../lib/open-energy/report';
import Page from './page';

vi.mock('../lib/open-energy/report', () => ({
  getGasUsageReport: vi.fn(),
}));

const mockedGetGasUsageReport = vi.mocked(getGasUsageReport);

const originalEnv = {
  OPEN_ENERGIE_API_KEY: process.env.OPEN_ENERGIE_API_KEY,
  OPEN_ENERGIE_BASE_URL: process.env.OPEN_ENERGIE_BASE_URL,
};

const report: GasUsageReport = {
  period: {
    startMonth: 'October 2025',
    endMonth: 'April 2026',
  },
  summary: {
    totalConsumptionInKwh: 9240,
    totalCostInEuro: 1681.68,
    averageCostPerKwhInEuro: 0.182,
  },
  monthlyUsageBreakdown: [
    {
      monthKey: '2025-10',
      label: 'October 2025',
      consumptionInKwh: 1320,
      costInEuro: 240.24,
      costPerKwhInEuro: 0.182,
    },
  ],
};

describe('Page', () => {
  afterEach(() => {
    process.env.OPEN_ENERGIE_API_KEY = originalEnv.OPEN_ENERGIE_API_KEY;
    process.env.OPEN_ENERGIE_BASE_URL = originalEnv.OPEN_ENERGIE_BASE_URL;
  });

  test('given the gas report loader when the page renders then it shows the report view', async () => {
    process.env.OPEN_ENERGIE_API_KEY = 'test-api-key-from-env';
    process.env.OPEN_ENERGIE_BASE_URL = 'https://api.openenergie.example';

    mockedGetGasUsageReport.mockResolvedValue(report);

    render(await Page());

    expect(mockedGetGasUsageReport).toHaveBeenCalledWith({
      period: { startMonth: '2025-10', endMonth: '2026-04' },
      baseUrl: 'https://api.openenergie.example',
      apiKey: 'test-api-key-from-env',
    });
    expect(screen.getByRole('heading', { name: /gas costs over 7 months/i })).toBeInTheDocument();
    expect(screen.getByText(/October 2025 – April 2026/i)).toBeInTheDocument();
  });
});
