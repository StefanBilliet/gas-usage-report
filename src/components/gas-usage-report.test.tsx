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
            totalConsumptionInKwh: 12500,
            totalCostInEuro: 2304.2,
            averageCostPerKwhInEuro: 0.184,
          },
          monthlyUsageBreakdown: [
            {
              monthKey: '2025-10',
              label: 'October 2025',
              consumptionInKwh: 1000,
              costInEuro: 182,
              costPerKwhInEuro: 0.182,
            },
            {
              monthKey: '2025-11',
              label: 'November 2025',
              consumptionInKwh: 1200,
              costInEuro: 219.6,
              costPerKwhInEuro: 0.183,
            },
            {
              monthKey: '2025-12',
              label: 'December 2025',
              consumptionInKwh: 2500,
              costInEuro: 470,
              costPerKwhInEuro: 0.188,
            },
            {
              monthKey: '2026-01',
              label: 'January 2026',
              consumptionInKwh: 2800,
              costInEuro: 537.6,
              costPerKwhInEuro: 0.192,
            },
            {
              monthKey: '2026-02',
              label: 'February 2026',
              consumptionInKwh: 2500,
              costInEuro: 467.5,
              costPerKwhInEuro: 0.187,
            },
            {
              monthKey: '2026-03',
              label: 'March 2026',
              consumptionInKwh: 1500,
              costInEuro: 274.5,
              costPerKwhInEuro: 0.183,
            },
            {
              monthKey: '2026-04',
              label: 'April 2026',
              consumptionInKwh: 1000,
              costInEuro: 153,
              costPerKwhInEuro: 0.153,
            },
          ],
        }}
      />,
    );

    expect(screen.getByRole('heading', { name: /gas costs over 7 months/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /monthly total cost/i })).toBeInTheDocument();
    const summary = screen.getByRole('region', { name: /summary/i });
    expect(within(summary).getByText('12,500 kWh')).toBeInTheDocument();
    expect(within(summary).getByText('€ 2,304.20')).toBeInTheDocument();
    expect(within(summary).getByText('€ 0.184')).toBeInTheDocument();
    const breakdown = screen.getByRole('list', { name: /monthly usage and cost breakdown/i });
    expect(within(breakdown).getByRole('listitem', { name: /october 2025/i })).toBeInTheDocument();
    expect(within(breakdown).getByRole('listitem', { name: /april 2026/i })).toBeInTheDocument();
    const table = screen.getByRole('table', { name: /monthly gas consumption and cost/i });
    expect(within(table).getByRole('row', { name: /october 2025/i })).toBeInTheDocument();
    expect(within(table).getByRole('row', { name: /november 2025/i })).toBeInTheDocument();
    expect(within(table).getByRole('row', { name: /april 2026/i })).toBeInTheDocument();
  });
});
