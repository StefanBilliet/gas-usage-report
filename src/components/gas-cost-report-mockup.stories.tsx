import type { Meta, StoryObj } from '@storybook/nextjs';
import GasUsageReportView from './gas-usage-report';
import type { GasUsageReport } from './gas-usage-report.types';

const report: GasUsageReport = {
  period: { startMonth: 'October 2025', endMonth: 'April 2026' },
  summary: {
    totalConsumptionInKwh: 12500,
    totalCostInEuro: 2304.2,
    averageCostPerKwhInEuro: 0.184,
  },
  monthlyUsageBreakdown: [
    { monthKey: '2025-10', label: 'October 2025', consumptionInKwh: 1000, costInEuro: 182, costPerKwhInEuro: 0.182 },
    { monthKey: '2025-11', label: 'November 2025', consumptionInKwh: 1200, costInEuro: 219.6, costPerKwhInEuro: 0.183 },
    { monthKey: '2025-12', label: 'December 2025', consumptionInKwh: 2500, costInEuro: 470, costPerKwhInEuro: 0.188 },
    { monthKey: '2026-01', label: 'January 2026', consumptionInKwh: 2800, costInEuro: 537.6, costPerKwhInEuro: 0.192 },
    { monthKey: '2026-02', label: 'February 2026', consumptionInKwh: 2500, costInEuro: 467.5, costPerKwhInEuro: 0.187 },
    { monthKey: '2026-03', label: 'March 2026', consumptionInKwh: 1500, costInEuro: 274.5, costPerKwhInEuro: 0.183 },
    { monthKey: '2026-04', label: 'April 2026', consumptionInKwh: 1000, costInEuro: 153, costPerKwhInEuro: 0.153 },
  ],
};

const meta: Meta<typeof GasUsageReportView> = {
  title: 'Reports/Gas cost over 7 months',
  component: GasUsageReportView,
};

export default meta;

type Story = StoryObj<typeof GasUsageReportView>;

export const Default: Story = {
  render: () => <GasUsageReportView report={report} />,
};
