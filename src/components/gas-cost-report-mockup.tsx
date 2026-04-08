export default function GasCostReportMockup() {
  return (
    <section className="gas-report">
      <header className="gas-report__header">
        <div>
          <p className="gas-report__eyebrow">Gas usage report</p>
          <h1>Gas costs over 7 months</h1>
          <p className="gas-report__subtitle">October 2025 – April 2026</p>
        </div>

        <div className="gas-report__badge">Rendered from monthly tariff snapshots</div>
      </header>

      <div className="gas-report__summary">
        <article className="gas-report__card">
          <p>Total consumption</p>
          <strong>9,240 kWh</strong>
        </article>
        <article className="gas-report__card">
          <p>Total cost incl. VAT</p>
          <strong>€ 1,684.56</strong>
        </article>
        <article className="gas-report__card">
          <p>Average cost per kWh</p>
          <strong>€ 0.182</strong>
        </article>
      </div>

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
            <li className="gas-report__bar-item" aria-label="October 2025, € 239.76, 1,320 kWh">
              <span className="gas-report__bar-month" id="oct-label">October 2025</span>
              <strong className="gas-report__bar-value" id="oct-value">€ 239.76 · 1,320 kWh</strong>
              <div className="gas-report__bar-track" aria-hidden="true">
                <div className="gas-report__bar" style={{ height: '78px' }} />
              </div>
            </li>
            <li className="gas-report__bar-item" aria-label="November 2025, € 258.30, 1,410 kWh">
              <span className="gas-report__bar-month" id="nov-label">November 2025</span>
              <strong className="gas-report__bar-value" id="nov-value">€ 258.30 · 1,410 kWh</strong>
              <div className="gas-report__bar-track" aria-hidden="true">
                <div className="gas-report__bar" style={{ height: '84px' }} />
              </div>
            </li>
            <li className="gas-report__bar-item" aria-label="December 2025, € 293.76, 1,560 kWh">
              <span className="gas-report__bar-month" id="dec-label">December 2025</span>
              <strong className="gas-report__bar-value" id="dec-value">€ 293.76 · 1,560 kWh</strong>
              <div className="gas-report__bar-track" aria-hidden="true">
                <div className="gas-report__bar" style={{ height: '96px' }} />
              </div>
            </li>
            <li className="gas-report__bar-item" aria-label="January 2026, € 289.92, 1,510 kWh">
              <span className="gas-report__bar-month" id="jan-label">January 2026</span>
              <strong className="gas-report__bar-value" id="jan-value">€ 289.92 · 1,510 kWh</strong>
              <div className="gas-report__bar-track" aria-hidden="true">
                <div className="gas-report__bar" style={{ height: '94px' }} />
              </div>
            </li>
            <li className="gas-report__bar-item" aria-label="February 2026, € 250.22, 1,340 kWh">
              <span className="gas-report__bar-month" id="feb-label">February 2026</span>
              <strong className="gas-report__bar-value" id="feb-value">€ 250.22 · 1,340 kWh</strong>
              <div className="gas-report__bar-track" aria-hidden="true">
                <div className="gas-report__bar" style={{ height: '81px' }} />
              </div>
            </li>
            <li className="gas-report__bar-item" aria-label="March 2026, € 193.94, 1,060 kWh">
              <span className="gas-report__bar-month" id="mar-label">March 2026</span>
              <strong className="gas-report__bar-value" id="mar-value">€ 193.94 · 1,060 kWh</strong>
              <div className="gas-report__bar-track" aria-hidden="true">
                <div className="gas-report__bar" style={{ height: '63px' }} />
              </div>
            </li>
            <li className="gas-report__bar-item" aria-label="April 2026, € 158.66, 1,040 kWh">
              <span className="gas-report__bar-month" id="apr-label">April 2026</span>
              <strong className="gas-report__bar-value" id="apr-value">€ 158.66 · 1,040 kWh</strong>
              <div className="gas-report__bar-track" aria-hidden="true">
                <div className="gas-report__bar" style={{ height: '52px' }} />
              </div>
            </li>
          </ul>
        </figure>
      </section>

      <div className="gas-report__table-wrap">
        <table className="gas-report__table">
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
            <tr>
              <th scope="row">October 2025</th>
              <td>1,320 kWh</td>
              <td>€ 239.76</td>
              <td>€ 0.182</td>
            </tr>
            <tr>
              <th scope="row">November 2025</th>
              <td>1,410 kWh</td>
              <td>€ 258.30</td>
              <td>€ 0.183</td>
            </tr>
            <tr>
              <th scope="row">December 2025</th>
              <td>1,560 kWh</td>
              <td>€ 293.76</td>
              <td>€ 0.188</td>
            </tr>
            <tr>
              <th scope="row">January 2026</th>
              <td>1,510 kWh</td>
              <td>€ 289.92</td>
              <td>€ 0.192</td>
            </tr>
            <tr>
              <th scope="row">February 2026</th>
              <td>1,340 kWh</td>
              <td>€ 250.22</td>
              <td>€ 0.187</td>
            </tr>
            <tr>
              <th scope="row">March 2026</th>
              <td>1,060 kWh</td>
              <td>€ 193.94</td>
              <td>€ 0.183</td>
            </tr>
            <tr>
              <th scope="row">April 2026</th>
              <td>1,040 kWh</td>
              <td>€ 158.66</td>
              <td>€ 0.153</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="gas-report__footnote">
        Mockup only: the final app will fill this layout with monthly tariff data for the selected period.
      </p>
    </section>
  );
}
