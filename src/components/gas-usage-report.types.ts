export type GasUsageReport = {
  period: {
    startMonth: string;
    endMonth: string;
  };
  summary: {
    totalConsumptionInKwh: number;
    totalCostInEuro: number;
    averageCostPerKwhInEuro: number;
  };
  monthlyUsageBreakdown: Array<{
    monthKey: string;
    label: string;
    consumptionInKwh: number;
    costInEuro: number;
    costPerKwhInEuro: number;
  }>;
};
