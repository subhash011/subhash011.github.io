import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Tooltip } from 'primereact/tooltip';
import { ProgressBar } from 'primereact/progressbar';
import { Fieldset } from 'primereact/fieldset';
import { Panel } from 'primereact/panel';

const SetupGuide = ({ campaignData, setCampaignData, validated, setValidated, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const businessCategories = [
    { label: 'Retail Store', value: 'retail' },
    { label: 'Restaurant', value: 'restaurant' },
    { label: 'Beauty Salon', value: 'salon' },
    { label: 'Gym/Fitness Center', value: 'gym' },
    { label: 'Medical Clinic', value: 'clinic' },
    { label: 'Local Services', value: 'services' },
    { label: 'Other', value: 'other' }
  ];

  const adGoals = [
    { label: 'Increase walk-in customers', value: 'walkins' },
    { label: 'Generate online sales', value: 'online-sales' },
    { label: 'Build brand awareness', value: 'awareness' },
    { label: 'Promote special events', value: 'events' },
    { label: 'Attract new customers', value: 'new-customers' }
  ];

  const steps = [
    { title: 'Business Setup', icon: 'pi pi-building' },
    { title: 'Review', icon: 'pi pi-check-circle' }
  ];

  const handleInputChange = (field, value) => {
    setCampaignData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (goal, checked) => {
    setCampaignData(prev => {
      const goals = prev.goals || [];
      if (checked) {
        return { ...prev, goals: [...goals, goal] };
      } else {
        return { ...prev, goals: goals.filter(g => g !== goal) };
      }
    });
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Last step - switch to templates tab
      if (onComplete) {
        onComplete();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepComplete = () => {
    if (currentStep === 0) {
      return campaignData.businessName && campaignData.category && campaignData.website && campaignData.location && campaignData.goals.length > 0;
    }
    return true;
  };

  return (
    <div className="setup-guide">
      <Card>
        <div className="step-indicator">
          {steps.map((step, index) => (
            <div key={index} className={`step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}>
              <i className={step.icon}></i>
              <span>{step.title}</span>
            </div>
          ))}
        </div>
        <ProgressBar value={(currentStep + 1) * 50} className="mb-4" />

        {currentStep === 0 && (
          <div className="setup-content">
            <h3>Complete Your Business Setup</h3>
            <p className="field-help">We'll use this information to create targeted campaigns</p>

            <div className="setup-columns">
              <div className="setup-column">
                <h4 className="column-title">Business Information</h4>
                
                <div className="field-wrapper">
                  <label htmlFor="businessName" className="field-label">
                    Business Name 
                    <i 
                      id="help-businessname" 
                      className="pi pi-info-circle field-help-icon" 
                      style={{ cursor: 'help' }}
                    ></i>
                    <Tooltip target="#help-businessname" position="right">
                      <div style={{ maxWidth: '200px' }}>
                        Enter your store or business name as customers would search for it
                      </div>
                    </Tooltip>
                  </label>
                  <InputText 
                    id="businessName"
                    placeholder="e.g., Mumbai Fashion Store"
                    value={campaignData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className="w-100"
                  />
                </div>

                <div className="field-wrapper">
                  <label htmlFor="category" className="field-label">
                    What's your business type? 
                    <i 
                      id="help-category" 
                      className="pi pi-info-circle field-help-icon"
                      style={{ cursor: 'help' }}
                    ></i>
                    <Tooltip target="#help-category" position="right">
                      <div style={{ maxWidth: '200px' }}>
                        This helps us suggest relevant ad templates and targeting options
                      </div>
                    </Tooltip>
                  </label>
                  <Dropdown 
                    id="category"
                    options={businessCategories}
                    placeholder="Select your business category"
                    value={campaignData.category}
                    onChange={(e) => handleInputChange('category', e.value)}
                    className="w-100"
                  />
                </div>

                <div className="field-wrapper">
                  <label htmlFor="website" className="field-label">
                    Website or Social Media 
                    <i 
                      id="help-website" 
                      className="pi pi-info-circle field-help-icon"
                      style={{ cursor: 'help' }}
                    ></i>
                    <Tooltip target="#help-website" position="right">
                      <div style={{ maxWidth: '200px' }}>
                        Where customers will land when they click your ad. Include http:// or https://
                      </div>
                    </Tooltip>
                  </label>
                  <InputText 
                    id="website"
                    placeholder="e.g., https://yourstore.com or https://facebook.com/yourpage"
                    value={campaignData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="w-100"
                  />
                </div>
              </div>

              <div className="setup-column">
                <h4 className="column-title">Location & Goals</h4>
                
                <div className="field-wrapper">
                  <label htmlFor="location" className="field-label">
                    Your Location 
                    <i 
                      id="help-location" 
                      className="pi pi-info-circle field-help-icon"
                      style={{ cursor: 'help' }}
                    ></i>
                    <Tooltip target="#help-location" position="right">
                      <div style={{ maxWidth: '200px' }}>
                        Enter your city or area. We'll show ads to people nearby
                      </div>
                    </Tooltip>
                  </label>
                  <InputText 
                    id="location"
                    placeholder="e.g., Mumbai, Andheri West"
                    value={campaignData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-100"
                  />
                </div>

                <div className="field-wrapper">
                  <label className="field-label mb-3">
                    What do you want to achieve? 
                    <i 
                      id="help-goals" 
                      className="pi pi-info-circle field-help-icon"
                      style={{ cursor: 'help' }}
                    ></i>
                    <Tooltip target="#help-goals" position="right">
                      <div style={{ maxWidth: '200px' }}>
                        Select your main advertising goals to customize campaign suggestions
                      </div>
                    </Tooltip>
                  </label>
                  <div className="goals-checklist">
                    {adGoals.map((goal) => (
                      <div key={goal.value} className="goal-item">
                        <Checkbox
                          inputId={goal.value}
                          checked={campaignData.goals.includes(goal.value)}
                          onChange={(e) => handleCheckboxChange(goal.value, e.checked)}
                        />
                        <label htmlFor={goal.value} className="goal-label">
                          {goal.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="setup-content">
            <h3>Review your information</h3>
            
            <Panel header="Business Details" className="mb-3">
              <div className="review-item">
                <strong>Business Name:</strong> {campaignData.businessName || 'Not provided'}
              </div>
              <div className="review-item">
                <strong>Category:</strong> {businessCategories.find(c => c.value === campaignData.category)?.label || 'Not provided'}
              </div>
              <div className="review-item">
                <strong>Website:</strong> {campaignData.website || 'Not provided'}
              </div>
            </Panel>

            <Panel header="Location & Goals">
              <div className="review-item">
                <strong>Location:</strong> {campaignData.location || 'Not provided'}
              </div>
              <div className="review-item">
                <strong>Goals:</strong> 
                <ul>
                  {campaignData.goals.map(goal => (
                    <li key={goal}>{adGoals.find(g => g.value === goal)?.label}</li>
                  ))}
                </ul>
              </div>
            </Panel>

            <div className="mt-4 p-3 info-box">
              <i className="pi pi-check-circle mr-2"></i>
              <span>Great! Your business information is ready. Proceed to Templates to start your campaign.</span>
            </div>
          </div>
        )}

        <div className="setup-actions">
          <Button label="Back" icon="pi pi-angle-left" onClick={prevStep} disabled={currentStep === 0} className="p-button-secondary" />
          <Button 
            label={currentStep === steps.length - 1 ? 'Complete' : 'Next'} 
            icon={currentStep === steps.length - 1 ? 'pi pi-check' : 'pi pi-angle-right'} 
            iconPos="right"
            onClick={nextStep}
            className={currentStep === steps.length - 1 ? 'p-button-success' : ''}
            style={currentStep === steps.length - 1 ? { background: '#4caf50', borderColor: '#4caf50' } : {}}
          />
        </div>
      </Card>
    </div>
  );
};

export default SetupGuide;

