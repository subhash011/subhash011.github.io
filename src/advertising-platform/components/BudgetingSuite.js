import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { InputNumber } from 'primereact/inputnumber';
import { Slider } from 'primereact/slider';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const BudgetingSuite = ({ campaignData, setBudget, budget }) => {
  const [dailyBudget, setDailyBudget] = useState(1000);
  const [campaignDays, setCampaignDays] = useState(14);
  const [goalBudget, setGoalBudget] = useState(null);
  const [budgetBreakdown, setBudgetBreakdown] = useState(null);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    calculateRecommendations();
  }, [campaignData]);

  const calculateRecommendations = () => {
    const totalBudget = dailyBudget * campaignDays;
    
    // Budget recommendations based on business type and goals
    const baseRecommendation = totalBudget;
    
    // Budget breakdown
    const breakdown = {
      total: totalBudget,
      allocation: {
        'Ad Spend (80%)': totalBudget * 0.8,
        'Platform Fees (15%)': totalBudget * 0.15,
        'Creative (5%)': totalBudget * 0.05
      },
      dailyCap: dailyBudget,
      weeklyCap: dailyBudget * 7,
      monthlyCap: dailyBudget * 30
    };

    setBudgetBreakdown(breakdown);
    setGoalBudget(baseRecommendation);
  };

  useEffect(() => {
    calculateRecommendations();
  }, [dailyBudget, campaignDays]);

  const handleSetBudget = () => {
    const budgetData = {
      daily: dailyBudget,
      days: campaignDays,
      total: dailyBudget * campaignDays,
      breakdown: budgetBreakdown,
      currency: campaignData.currency || 'INR'
    };
    setBudget(budgetData);
    
    toast.current.show({
      severity: 'success',
      summary: 'Budget Set Successfully!',
      detail: 'Your spending is protected with automatic caps.',
      life: 3000
    });
  };

  const goalBasedRecommendations = [
    {
      id: 'awareness',
      goal: 'Awareness',
      dailyRange: '₹500 - ₹1,500',
      dailyValue: 1000,
      days: 14,
      weeklyRange: '₹3,500 - ₹10,500',
      estimate: 'Reach 5,000-10,000 people locally'
    },
    {
      id: 'walkins',
      goal: 'Walk-ins/Visits',
      dailyRange: '₹800 - ₹2,500',
      dailyValue: 1650,
      days: 14,
      weeklyRange: '₹5,600 - ₹17,500',
      estimate: 'Generate 20-50 walk-ins per week'
    },
    {
      id: 'sales',
      goal: 'Sales/Conversions',
      dailyRange: '₹1,000 - ₹3,000',
      dailyValue: 2000,
      days: 14,
      weeklyRange: '₹7,000 - ₹21,000',
      estimate: 'Generate 50-150 leads per week'
    }
  ];

  const handleSelectRecommendation = (rec) => {
    setSelectedRecommendation(rec.id);
    setDailyBudget(rec.dailyValue);
    setCampaignDays(rec.days);
  };

  return (
    <div className="budgeting-suite">
      <Toast ref={toast} />
      <Card>
        <h3 className="mb-3">Smart Budget Planner</h3>
        <p className="text-secondary mb-4">
          Get AI-powered budget recommendations and set spending limits to avoid overspending
        </p>

        <div className="budget-calculator">
          <Panel header="Goal-Based Recommendations" className="mb-3" toggleable collapsed={false}>
            <p>Suggested budget ranges based on your advertising goals:</p>
            <div className="recommendations-list">
              {goalBasedRecommendations.map((rec, index) => (
                <div 
                  key={index} 
                  className={`recommendation-item ${selectedRecommendation === rec.id ? 'selected' : ''}`}
                  onClick={() => handleSelectRecommendation(rec)}
                  style={{ cursor: 'pointer' }}
                >
                  <h6>
                    {rec.goal}
                    {selectedRecommendation === rec.id && (
                      <i className="pi pi-check-circle ml-2" style={{ color: '#4caf50', fontSize: '1.2rem' }}></i>
                    )}
                  </h6>
                  <div className="recommendation-details">
                    <div><i className="pi pi-clock"></i> Daily: {rec.dailyRange}</div>
                    <div><i className="pi pi-calendar"></i> Weekly: {rec.weeklyRange}</div>
                    <div><i className="pi pi-chart-line"></i> {rec.estimate}</div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel header="Set Your Daily Budget" className="mb-3" toggleable collapsed={false}>
            <div className="budget-input-section">
              <label className="budget-label">
                How much do you want to spend per day?
                <span className="budget-currency">₹</span>
              </label>
              <div className="budget-slider-wrapper">
                <Slider 
                  value={dailyBudget} 
                  onChange={(e) => setDailyBudget(e.value)}
                  min={100}
                  max={10000}
                  step={100}
                  className="budget-slider"
                />
                <InputNumber
                  value={dailyBudget}
                  onValueChange={(e) => setDailyBudget(e.value)}
                  mode="currency"
                  currency="INR"
                  locale="en-IN"
                  min={100}
                  max={10000}
                  step={100}
                  className="budget-input"
                />
              </div>
            </div>

            <div className="budget-input-section mt-4">
              <label className="budget-label">
                Campaign Duration (Days)
              </label>
              <div className="budget-slider-wrapper">
                <Slider 
                  value={campaignDays} 
                  onChange={(e) => setCampaignDays(e.value)}
                  min={7}
                  max={90}
                  step={1}
                  className="budget-slider"
                />
                <InputNumber
                  value={campaignDays}
                  onValueChange={(e) => setCampaignDays(e.value)}
                  min={7}
                  max={90}
                  step={1}
                  className="budget-input"
                />
              </div>
            </div>

            {budgetBreakdown && (
              <div className="budget-summary mt-4 p-3">
                <h5>Total Campaign Budget</h5>
                <div className="total-budget-amount">
                  ₹{(dailyBudget * campaignDays).toLocaleString('en-IN')}
                </div>
                <div className="budget-breakdown mt-3">
                  {Object.entries(budgetBreakdown.allocation).map(([key, value]) => (
                    <div key={key} className="breakdown-item">
                      <span>{key}</span>
                      <span>₹{value.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Panel>

          <Panel header="Spending Caps & Protection" className="mb-3" toggleable collapsed={false}>
            <p className="spending-info">
              We'll automatically stop spending once these limits are reached to protect your budget.
            </p>
            <div className="spending-caps">
              <div className="cap-item">
                <strong>Daily Cap:</strong> ₹{dailyBudget.toLocaleString('en-IN')}
              </div>
              <div className="cap-item">
                <strong>Weekly Cap:</strong> ₹{(dailyBudget * 7).toLocaleString('en-IN')}
              </div>
              {campaignDays >= 30 && (
                <div className="cap-item">
                  <strong>Monthly Cap:</strong> ₹{(dailyBudget * 30).toLocaleString('en-IN')}
                </div>
              )}
            </div>
          </Panel>
        </div>

        <div className="budget-actions mt-4">
          <Button 
            label="Save This Budget Plan" 
            icon="pi pi-check" 
            className="w-100"
            onClick={handleSetBudget}
          />
        </div>

        {budget && (
          <div className="mt-3 p-3 info-box">
            <i className="pi pi-check-circle mr-2"></i>
            <span>Budget plan saved! Your spending is protected with automatic caps.</span>
          </div>
        )}
      </Card>
    </div>
  );
};

export default BudgetingSuite;

