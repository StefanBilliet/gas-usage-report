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

      <section className="gas-report__chart" aria-label="Monthly cost trend">
        <div className="gas-report__chart-header">
          <div>
            <p className="gas-report__eyebrow">Visual trend</p>
            <h2>Monthly total cost</h2>
          </div>
          <p className="gas-report__chart-note">Bars show the relative monthly spend incl. VAT.</p>
        </div>

        <div className="gas-report__bars" role="img" aria-label="Bar chart of monthly total cost">
          <div className="gas-report__y-axis" aria-hidden="true">
            <span>€ 300</span>
            <span>€ 200</span>
            <span>€ 100</span>
            <span>€ 0</span>
          </div>

          <div className="gas-report__bar-grid">
            <div className="gas-report__bar-item">
              <div className="gas-report__bar" style={{ height: '78px' }} />
              <span>Oct</span>
              <strong>€ 239.76</strong>
            </div>
            <div className="gas-report__bar-item">
              <div className="gas-report__bar" style={{ height: '84px' }} />
              <span>Nov</span>
              <strong>€ 258.30</strong>
            </div>
            <div className="gas-report__bar-item">
              <div className="gas-report__bar" style={{ height: '96px' }} />
              <span>Dec</span>
              <strong>€ 293.76</strong>
            </div>
            <div className="gas-report__bar-item">
              <div className="gas-report__bar" style={{ height: '94px' }} />
              <span>Jan</span>
              <strong>€ 289.92</strong>
            </div>
            <div className="gas-report__bar-item">
              <div className="gas-report__bar" style={{ height: '81px' }} />
              <span>Feb</span>
              <strong>€ 250.22</strong>
            </div>
            <div className="gas-report__bar-item">
              <div className="gas-report__bar" style={{ height: '63px' }} />
              <span>Mar</span>
              <strong>€ 193.94</strong>
            </div>
            <div className="gas-report__bar-item">
              <div className="gas-report__bar" style={{ height: '52px' }} />
              <span>Apr</span>
              <strong>€ 158.66</strong>
            </div>
          </div>
        </div>
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
