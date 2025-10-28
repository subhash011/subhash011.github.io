import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import SetupGuide from './components/SetupGuide';
import CampaignTemplates from './components/CampaignTemplates';
import BudgetingSuite from './components/BudgetingSuite';
import PreLaunchValidator from './components/PreLaunchValidator';
import ROIDashboard from './components/ROIDashboard';
import CampaignCoach from './components/CampaignCoach';
import MyCampaigns from './components/MyCampaigns';
import './styles/advertising-platform.scss';

const AdvertisingPlatform = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [campaignData, setCampaignData] = useState({
    businessName: '',
    website: '',
    category: '',
    location: '',
    budget: '',
    currency: 'INR',
    goals: []
  });
  const [validated, setValidated] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [budget, setBudget] = useState(null);

  // Workflow progress tracking
  const workflowSteps = [
    { id: 0, name: 'Smart Setup', completed: campaignData.businessName && campaignData.category && campaignData.location && campaignData.goals.length > 0 },
    { id: 1, name: 'Campaign Templates', completed: campaigns.length > 0 },
    { id: 2, name: 'Budget Planner', completed: budget !== null },
    { id: 3, name: 'Campaign Validator', completed: validated },
    { id: 4, name: 'ROI Dashboard', completed: campaigns.length > 0 },
    { id: 5, name: 'Campaign Coach', completed: campaigns.length > 0 },
    { id: 6, name: 'My Campaigns', completed: campaigns.length > 0 }
  ];

  const isTabDisabled = (tabIndex) => {
    if (tabIndex === 0) return false; // Setup is always available
    if (tabIndex === 1) return !workflowSteps[0].completed; // Templates need setup
    if (tabIndex === 2) return !workflowSteps[0].completed; // Budget needs setup
    if (tabIndex === 3) return !workflowSteps[0].completed; // Validator needs setup
    if (tabIndex === 4) return !workflowSteps[1].completed; // Dashboard needs campaigns
    if (tabIndex === 5) return !workflowSteps[1].completed; // Coach needs campaigns
    if (tabIndex === 6) return !workflowSteps[1].completed; // My Campaigns needs campaigns
    return false;
  };

  const getNextStep = () => {
    if (!workflowSteps[0].completed) return 0; // Setup
    if (!workflowSteps[1].completed) return 1; // Templates
    if (!workflowSteps[2].completed) return 2; // Budget
    if (!workflowSteps[3].completed) return 3; // Validator
    return 4; // Dashboard
  };

  return (
    <div className="advertising-platform">
      <div className="platform-header">
        <h1 className="platform-title">SmartAd Platform</h1>
        <p className="platform-subtitle">Simplified Advertising for SMB Advertisers</p>
        <p style={{ fontSize: '0.9rem', opacity: 0.85, marginTop: '0.5rem' }}>
          Built for Media.net Company Case Submission
        </p>
        
        {/* Workflow Progress */}
        <div className="workflow-progress">
          <div className="progress-steps">
            {workflowSteps.map((step, index) => (
              <div 
                key={step.id}
                className={`progress-step ${step.completed ? 'completed' : ''} ${activeIndex === step.id ? 'active' : ''} ${isTabDisabled(step.id) ? 'disabled' : ''}`}
                onClick={() => !isTabDisabled(step.id) && setActiveIndex(step.id)}
              >
                <div className="step-number">
                  {step.completed ? <i className="pi pi-check"></i> : index + 1}
                </div>
                <div className="step-name">{step.name}</div>
              </div>
            ))}
          </div>
          <div className="workflow-guidance">
            {activeIndex === getNextStep() ? (
              <div className="guidance-message">
                <i className="pi pi-info-circle"></i>
                <span>You're on the right track! Complete this step to unlock the next features.</span>
              </div>
            ) : activeIndex > getNextStep() ? (
              <div className="guidance-message warning">
                <i className="pi pi-exclamation-triangle"></i>
                <span>You skipped some steps. Consider going back to complete the workflow.</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} className="platform-tabs">
        
        {/* Smart Setup Guide */}
        <TabPanel header="Smart Setup" disabled={isTabDisabled(0)}>
          <SetupGuide 
            campaignData={campaignData}
            setCampaignData={setCampaignData}
            validated={validated}
            setValidated={setValidated}
            onComplete={() => setActiveIndex(1)}
          />
        </TabPanel>

        {/* Pre-built Campaign Templates */}
        <TabPanel header="Campaign Templates" disabled={isTabDisabled(1)}>
          <CampaignTemplates 
            campaignData={campaignData}
            setCampaigns={setCampaigns}
            campaigns={campaigns}
          />
        </TabPanel>

        {/* Smart Budgeting Suite */}
        <TabPanel header="Budget Planner" disabled={isTabDisabled(2)}>
          <BudgetingSuite 
            campaignData={campaignData}
            setBudget={setBudget}
            budget={budget}
          />
        </TabPanel>

        {/* Pre-launch Validator */}
        <TabPanel header="Campaign Validator" disabled={isTabDisabled(3)}>
          <PreLaunchValidator 
            campaignData={campaignData}
            campaigns={campaigns}
            validated={validated}
            setValidated={setValidated}
          />
        </TabPanel>

        {/* Simplified ROI Dashboard */}
        <TabPanel header="ROI Dashboard" disabled={isTabDisabled(4)}>
          <ROIDashboard 
            campaigns={campaigns}
            budget={budget}
          />
        </TabPanel>

        {/* Campaign Coach */}
        <TabPanel header="Campaign Coach" disabled={isTabDisabled(5)}>
          <CampaignCoach 
            campaigns={campaigns}
            campaignData={campaignData}
          />
        </TabPanel>

        {/* My Campaigns */}
        <TabPanel header="My Campaigns" disabled={isTabDisabled(6)}>
          <MyCampaigns 
            campaigns={campaigns}
            setCampaigns={setCampaigns}
            campaignData={campaignData}
          />
        </TabPanel>

      </TabView>
    </div>
  );
};

export default AdvertisingPlatform;

