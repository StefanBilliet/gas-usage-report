import { formatEuro, formatKwh } from './gas-usage-report-formatters';
import type { GasUsageReport } from './gas-usage-report.types';

type GasUsageReportViewProps = {
  report: GasUsageReport;
};

export default function GasUsageReportView({ report }: GasUsageReportViewProps) {
  const maxCostInEuro = Math.max(...report.monthlyUsageBreakdown.map((month) => month.costInEuro));

  return (
    <section className="gas-report" aria-labelledby="gas-usage-report-title">
      <header className="gas-report__header">
        <div>
          <p className="gas-report__eyebrow">Gas usage report</p>
          <h1 id="gas-usage-report-title">Gas costs over 7 months</h1>
          <p className="gas-report__subtitle">
            {report.period.startMonth} – {report.period.endMonth}
          </p>
        </div>

        <div className="gas-report__badge">Rendered from monthly tariff snapshots</div>
      </header>

      <section className="gas-report__summary" aria-label="Summary">
        <article className="gas-report__card">
          <p>Total consumption</p>
          <strong>{formatKwh(report.summary.totalConsumptionInKwh)}</strong>
        </article>
        <article className="gas-report__card">
          <p>Total cost incl. VAT</p>
          <strong>{formatEuro(report.summary.totalCostInEuro)}</strong>
        </article>
        <article className="gas-report__card">
          <p>Average cost per kWh</p>
          <strong>{formatEuro(report.summary.averageCostPerKwhInEuro, 3)}</strong>
        </article>
      </section>

      <section className="gas-report__chart" aria-labelledby="gas-report-chart-title">
        <div className="gas-report__chart-header">
          <div>
            <p className="gas-report__eyebrow">Visual trend</p>
            <h2 id="gas-report-chart-title">Monthly total cost</h2>
          </div>
          <p className="gas-report__chart-note">Bars show the relative monthly spend incl. VAT.</p>
        </div>

        <figure className="gas-report__bars">
          <figcaption className="sr-only">Bar chart of monthly total cost</figcaption>
          <div className="gas-report__y-axis" aria-hidden="true">
            <span>€ 300</span>
            <span>€ 200</span>
            <span>€ 100</span>
            <span>€ 0</span>
          </div>

          <ul className="gas-report__bar-grid" aria-label="Monthly usage and cost breakdown">
            {report.monthlyUsageBreakdown.map((month) => {
              const height = Math.max(24, Math.round((month.costInEuro / maxCostInEuro) * 104));

              return (
                <li className="gas-report__bar-item" aria-label={`${month.label}, ${formatEuro(month.costInEuro)}, ${formatKwh(month.consumptionInKwh)}`} key={month.monthKey}>
                  <span className="gas-report__bar-month">{month.label}</span>
                  <strong className="gas-report__bar-value">
                    {formatEuro(month.costInEuro)} · {formatKwh(month.consumptionInKwh)}
                  </strong>
                  <div className="gas-report__bar-track" aria-hidden="true">
                    <div className="gas-report__bar" style={{ height: `${height}px` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </figure>
      </section>

      <div className="gas-report__table-wrap">
        <table className="gas-report__table" aria-label="Monthly gas consumption and cost">
          <caption>Monthly gas consumption and cost</caption>
          <thead>
            <tr>
              <th scope="col">Month</th>
              <th scope="col">Consumption</th>
              <th scope="col">Total cost</th>
              <th scope="col">Cost / kWh</th>
            </tr>
          </thead>
          <tbody>
            {report.monthlyUsageBreakdown.map((month) => (
              <tr key={month.monthKey}>
                <th scope="row">{month.label}</th>
                <td>{formatKwh(month.consumptionInKwh)}</td>
                <td>{formatEuro(month.costInEuro)}</td>
                <td>{formatEuro(month.costPerKwhInEuro, 3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
