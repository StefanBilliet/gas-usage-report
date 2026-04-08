import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import GasUsageReportView from './gas-usage-report';

describe('GasUsageReportView', () => {
  test('given a report when it renders then it shows the summary and monthly breakdown', () => {
    render(
      <GasUsageReportView
        report={{
          period: { startMonth: 'October 2025', endMonth: 'April 2026' },
          summary: {
            totalConsumptionInKwh: 9240,
            totalCostInEuro: 1684.56,
            averageCostPerKwhInEuro: 0.182,
          },
          monthlyUsageBreakdown: [
            {
              monthKey: '2025-10',
              label: 'October 2025',
              consumptionInKwh: 1320,
              costInEuro: 239.76,
              costPerKwhInEuro: 0.182,
            },
            {
              monthKey: '2025-11',
              label: 'November 2025',
              consumptionInKwh: 1410,
              costInEuro: 258.3,
              costPerKwhInEuro: 0.183,
            },
            {
              monthKey: '2025-12',
              label: 'December 2025',
              consumptionInKwh: 1560,
              costInEuro: 293.76,
              costPerKwhInEuro: 0.188,
            },
            {
              monthKey: '2026-01',
              label: 'January 2026',
              consumptionInKwh: 1510,
              costInEuro: 289.92,
              costPerKwhInEuro: 0.192,
            },
            {
              monthKey: '2026-02',
              label: 'February 2026',
              consumptionInKwh: 1340,
              costInEuro: 250.22,
              costPerKwhInEuro: 0.187,
            },
            {
              monthKey: '2026-03',
              label: 'March 2026',
              consumptionInKwh: 1060,
              costInEuro: 193.94,
              costPerKwhInEuro: 0.183,
            },
            {
              monthKey: '2026-04',
              label: 'April 2026',
              consumptionInKwh: 1040,
              costInEuro: 158.66,
              costPerKwhInEuro: 0.153,
            },
          ],
        }}
      />,
    );

    expect(screen.getByRole('heading', { name: /gas costs over 7 months/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /monthly total cost/i })).toBeInTheDocument();
    const summary = screen.getByRole('region', { name: /summary/i });
    expect(within(summary).getByText('9,240 kWh')).toBeInTheDocument();
    expect(within(summary).getByText('€ 1,684.56')).toBeInTheDocument();
    expect(within(summary).getByText('€ 0.182')).toBeInTheDocument();
    const breakdown = screen.getByRole('list', { name: /monthly usage and cost breakdown/i });
    expect(within(breakdown).getByRole('listitem', { name: /october 2025/i })).toBeInTheDocument();
    expect(within(breakdown).getByRole('listitem', { name: /april 2026/i })).toBeInTheDocument();
    const table = screen.getByRole('table', { name: /monthly gas consumption and cost/i });
    expect(within(table).getByRole('row', { name: /october 2025/i })).toBeInTheDocument();
    expect(within(table).getByRole('row', { name: /november 2025/i })).toBeInTheDocument();
    expect(within(table).getByRole('row', { name: /april 2026/i })).toBeInTheDocument();
  });
});
