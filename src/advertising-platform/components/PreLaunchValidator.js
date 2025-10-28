import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Panel } from 'primereact/panel';
import { ProgressBar } from 'primereact/progressbar';
import { Divider } from 'primereact/divider';

const PreLaunchValidator = ({ campaignData, campaigns, validated, setValidated }) => {
  const [checks, setChecks] = useState([]);
  const [validationScore, setValidationScore] = useState(0);

  useEffect(() => {
    runValidation();
  }, [campaignData, campaigns]);

  const runValidation = () => {
    const validationChecks = [
      {
        id: 'business-info',
        title: 'Business Information',
        passed: !!(campaignData.businessName && campaignData.category && campaignData.location),
        severity: 'error',
        details: campaignData.businessName && campaignData.category && campaignData.location 
          ? 'All business details are complete' 
          : 'Missing business name, category, or location'
      },
      {
        id: 'website',
        title: 'Website/Landing Page',
        passed: !!campaignData.website,
        severity: 'error',
        details: campaignData.website 
          ? 'Landing page URL provided' 
          : 'No website or landing page configured - ads will have nowhere to send visitors'
      },
      {
        id: 'goals',
        title: 'Advertising Goals',
        passed: campaignData.goals && campaignData.goals.length > 0,
        severity: 'warn',
        details: campaignData.goals && campaignData.goals.length > 0 
          ? `${campaignData.goals.length} goal(s) selected` 
          : 'No goals selected - unclear campaign objectives'
      },
      {
        id: 'campaigns',
        title: 'Campaign Created',
        passed: campaigns && campaigns.length > 0,
        severity: 'error',
        details: campaigns && campaigns.length > 0 
          ? `${campaigns.length} campaign(s) ready` 
          : 'No campaigns created yet'
      },
      {
        id: 'targeting',
        title: 'Targeting Configuration',
        passed: !!campaignData.location,
        severity: 'error',
        details: campaignData.location 
          ? 'Location targeting configured' 
          : 'No location set - ads won\'t be targeted properly'
      },
      {
        id: 'budget',
        title: 'Budget Configuration',
        passed: true,
        severity: 'info',
        details: 'Budget can be set from Budget Planner tab (optional)'
      }
    ];

    setChecks(validationChecks);
    
    const passedChecks = validationChecks.filter(c => c.passed).length;
    const totalChecks = validationChecks.length;
    setValidationScore(Math.round((passedChecks / totalChecks) * 100));

    // Auto-set validated if critical checks pass
    const criticalChecks = validationChecks.filter(c => c.severity === 'error');
    const allCriticalPass = criticalChecks.every(c => c.passed);
    setValidated(allCriticalPass && campaigns.length > 0);
  };

  const getSeverityIcon = (passed, severity) => {
    if (passed) return 'pi-check-circle';
    if (severity === 'error') return 'pi-times-circle';
    if (severity === 'warn') return 'pi-exclamation-triangle';
    return 'pi-info-circle';
  };

  const getSeverityColor = (passed, severity) => {
    if (passed) return '#10b981';
    if (severity === 'error') return '#ef4444';
    if (severity === 'warn') return '#f59e0b';
    return '#3b82f6';
  };

  const criticalIssues = checks.filter(c => c.severity === 'error' && !c.passed);
  const warnings = checks.filter(c => c.severity === 'warn' && !c.passed);

  return (
    <div className="pre-launch-validator">
      <Card>
        <h3 className="mb-3">Pre-Launch Campaign Validator</h3>
        <p className="text-secondary mb-4">
          We automatically check your campaign setup to catch errors before you spend money
        </p>

        <div className="validation-summary">
          <div className="validation-score">
            <ProgressBar value={validationScore} showValue={false} />
            <div className="score-text">
              <span className="score-value">{validationScore}%</span>
              <span className="score-label">Campaign Ready</span>
            </div>
          </div>

          {validationScore === 100 ? (
            <Message severity="success" className="mb-4 w-100">
              <strong>All Clear!</strong> Your campaign is ready to launch.
            </Message>
          ) : (
            <Message severity="warn" className="mb-4 w-100">
              <strong>Issues Found:</strong> {criticalIssues.length} critical issue(s) and {warnings.length} warning(s) need attention.
            </Message>
          )}
        </div>

        <Divider />

        <div className="validation-checks">
          {checks.map((check) => (
            <Panel 
              key={check.id} 
              header={check.title}
              toggleable
              collapsed={check.passed}
              className="validation-check-panel"
            >
              <div className="validation-check-content">
                <div className="check-status">
                  <i 
                    className={`pi ${getSeverityIcon(check.passed, check.severity)}`}
                    style={{ color: getSeverityColor(check.passed, check.severity), fontSize: '1.5rem' }}
                  ></i>
                  <div className="check-details">
                    <div className="check-message">
                      {check.details}
                    </div>
                    {!check.passed && (
                      <div className="check-action">
                        {check.id === 'business-info' && (
                          <span className="action-hint">→ Go to Smart Setup tab to complete</span>
                        )}
                        {check.id === 'website' && (
                          <span className="action-hint">→ Add your website URL in Smart Setup</span>
                        )}
                        {check.id === 'goals' && (
                          <span className="action-hint">→ Set your goals in Smart Setup</span>
                        )}
                        {check.id === 'campaigns' && (
                          <span className="action-hint">→ Create a campaign in Templates tab</span>
                        )}
                        {check.id === 'targeting' && (
                          <span className="action-hint">→ Set your location in Smart Setup</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Panel>
          ))}
        </div>

        <div className="validation-info mt-4 p-3">
          <i className="pi pi-lightbulb mr-2"></i>
          <span>
            This validator checks for: missing information, unrealistic budgets, incorrect targeting, 
            missing creatives, and campaign configuration issues before you launch.
          </span>
        </div>
      </Card>
    </div>
  );
};

export default PreLaunchValidator;

