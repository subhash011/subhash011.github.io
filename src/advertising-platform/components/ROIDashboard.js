import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { ProgressBar } from 'primereact/progressbar';
import { Message } from 'primereact/message';

const ROIDashboard = ({ campaigns, budget }) => {
  const [simulatedMetrics, setSimulatedMetrics] = useState(null);

  useEffect(() => {
    if (campaigns.length > 0) {
      generateSimulatedData();
    }
  }, [campaigns]);

  const generateSimulatedData = () => {
    const totalSpent = budget ? budget.total : 10000;
    const impressions = totalSpent * 80; // Simulated: ₹1 spent = ~80 impressions
    const clicks = impressions * 0.02; // 2% CTR
    const walkIns = clicks * 0.15; // 15% conversion to walk-ins
    const estimatedSales = walkIns * 1500; // Average ₹1500 per customer

    setSimulatedMetrics({
      spent: totalSpent,
      impressions: Math.floor(impressions),
      clicks: Math.floor(clicks),
      walkIns: Math.floor(walkIns),
      estimatedSales: estimatedSales,
      roas: estimatedSales / totalSpent,
      ctr: 2.0,
      convRate: 15
    });
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(num);
  };

  const formatCurrency = (num) => {
    return '₹' + formatNumber(num);
  };

  if (!simulatedMetrics) {
    return (
      <div className="roi-dashboard">
        <Card>
          <Message severity="info" className="w-100">
            <strong>No campaigns running yet.</strong> Launch a campaign and come back here to see your ROI dashboard!
          </Message>
        </Card>
      </div>
    );
  }

  return (
    <div className="roi-dashboard">
      <Card>
        <h3 className="mb-3">Simplified ROI Dashboard</h3>
        <p className="text-secondary mb-4">
          We translate complex ad metrics into simple business outcomes you can understand
        </p>

        <div className="roi-overview">
          <div className="roi-main-metric">
            <div className="metric-value-box">
              <h2>{formatCurrency(simulatedMetrics.spent)}</h2>
              <p>Total Spent</p>
            </div>
            <div className="metric-arrow">
              <i className="pi pi-arrow-right" style={{ fontSize: '2rem', color: '#e91e63' }}></i>
            </div>
            <div className="metric-value-box success">
              <h2>{formatCurrency(simulatedMetrics.estimatedSales)}</h2>
              <p>Estimated Sales Generated</p>
            </div>
          </div>

          <div className="roi-ratio">
            <span className="ratio-label">Return on Ad Spend (ROAS)</span>
            <div className="ratio-value">
              {simulatedMetrics.roas.toFixed(2)}x
            </div>
            <span className="ratio-explanation">
              For every ₹1 spent, you earned ₹{simulatedMetrics.roas.toFixed(2)} in sales
            </span>
          </div>
        </div>

        <div className="business-outcomes mt-4">
          <h4>Business Impact</h4>
          <div className="outcomes-grid">
            <div className="outcome-card">
              <i className="pi pi-users" style={{ color: '#e91e63', fontSize: '2.5rem' }}></i>
              <div className="outcome-number">{Math.floor(simulatedMetrics.walkIns)}</div>
              <div className="outcome-label">New Walk-ins</div>
              <div className="outcome-detail">
                People visited your store
              </div>
            </div>

            <div className="outcome-card">
              <i className="pi pi-eye" style={{ color: '#e91e63', fontSize: '2.5rem' }}></i>
              <div className="outcome-number">{formatNumber(simulatedMetrics.impressions)}</div>
              <div className="outcome-label">People Saw Your Ad</div>
              <div className="outcome-detail">
                Ads appeared on their screens
              </div>
            </div>

            <div className="outcome-card">
              <i className="pi pi-mouse" style={{ color: '#fad1df', fontSize: '2.5rem' }}></i>
              <div className="outcome-number">{formatNumber(simulatedMetrics.clicks)}</div>
              <div className="outcome-label">Clicks on Ads</div>
              <div className="outcome-detail">
                Clicked to learn more
              </div>
            </div>
          </div>
        </div>

        <div className="simplified-metrics mt-4">
          <Panel header="Simple Metrics (No Technical Jargon)" toggleable collapsed={true}>
            <div className="metric-item">
              <div className="metric-label">
                <i className="pi pi-chart-bar"></i>
                Click Rate
              </div>
              <div className="metric-value">
                <ProgressBar value={simulatedMetrics.ctr} />
                <span className="metric-number">{simulatedMetrics.ctr}%</span>
              </div>
              <p className="metric-explanation">
                Out of 100 people who saw your ad, {simulatedMetrics.ctr} clicked on it
              </p>
            </div>

            <div className="metric-item mt-3">
              <div className="metric-label">
                <i className="pi pi-check-circle"></i>
                Conversion Rate
              </div>
              <div className="metric-value">
                <ProgressBar value={simulatedMetrics.convRate} />
                <span className="metric-number">{simulatedMetrics.convRate}%</span>
              </div>
              <p className="metric-explanation">
                Out of 100 people who clicked, {simulatedMetrics.convRate} visited your store
              </p>
            </div>

            <div className="metric-item mt-3">
              <div className="metric-label">
                <i className="pi pi-money-bill"></i>
                Cost per Walk-in
              </div>
              <div className="metric-value">
                <span className="metric-number">
                  {formatCurrency(simulatedMetrics.spent / simulatedMetrics.walkIns)}
                </span>
              </div>
              <p className="metric-explanation">
                On average, it cost this much to get one new customer through the door
              </p>
            </div>
          </Panel>
        </div>

        <div className="dashboard-summary mt-4 p-3 info-box">
          <i className="pi pi-chart-line mr-2"></i>
          <span>
            <strong>Bottom Line:</strong> You spent {formatCurrency(simulatedMetrics.spent)} on ads, 
            which brought in {Math.floor(simulatedMetrics.walkIns)} new customers, 
            generating approximately {formatCurrency(simulatedMetrics.estimatedSales)} in sales. 
            That's a {simulatedMetrics.roas.toFixed(1)}x return on your advertising investment!
          </span>
        </div>
      </Card>
    </div>
  );
};

export default ROIDashboard;

