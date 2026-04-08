import type { Meta, StoryObj } from '@storybook/nextjs';
import GasUsageReportView from './gas-usage-report';
import type { GasUsageReport } from './gas-usage-report.types';

const report: GasUsageReport = {
  period: { startMonth: 'October 2025', endMonth: 'April 2026' },
  summary: {
    totalConsumptionInKwh: 9240,
    totalCostInEuro: 1684.56,
    averageCostPerKwhInEuro: 0.182,
  },
  monthlyUsageBreakdown: [
    { monthKey: '2025-10', label: 'October 2025', consumptionInKwh: 1320, costInEuro: 239.76, costPerKwhInEuro: 0.182 },
    { monthKey: '2025-11', label: 'November 2025', consumptionInKwh: 1410, costInEuro: 258.3, costPerKwhInEuro: 0.183 },
    { monthKey: '2025-12', label: 'December 2025', consumptionInKwh: 1560, costInEuro: 293.76, costPerKwhInEuro: 0.188 },
    { monthKey: '2026-01', label: 'January 2026', consumptionInKwh: 1510, costInEuro: 289.92, costPerKwhInEuro: 0.192 },
    { monthKey: '2026-02', label: 'February 2026', consumptionInKwh: 1340, costInEuro: 250.22, costPerKwhInEuro: 0.187 },
    { monthKey: '2026-03', label: 'March 2026', consumptionInKwh: 1060, costInEuro: 193.94, costPerKwhInEuro: 0.183 },
    { monthKey: '2026-04', label: 'April 2026', consumptionInKwh: 1040, costInEuro: 158.66, costPerKwhInEuro: 0.153 },
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
