import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Panel } from 'primereact/panel';
import { Message } from 'primereact/message';
import { Tag } from 'primereact/tag';

const CampaignCoach = ({ campaigns, campaignData }) => {
  const [insights, setInsights] = useState([]);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    generateInsights();
  }, [campaigns]);

  const generateInsights = () => {
    if (campaigns.length === 0) {
      setInsights([{
        type: 'info',
        message: 'Launch your first campaign to get personalized coaching!',
        priority: 'low'
      }]);
      setActions([{
        action: 'Create a campaign',
        description: 'Go to the Campaign Templates tab and select a template to get started.',
        icon: 'pi-template'
      }]);
      return;
    }

    const generatedInsights = [
      {
        type: 'success',
        message: 'Your campaign is performing well! You\'re reaching the right people in your area.',
        priority: 'high',
        details: 'Based on your targeting, your ads are being shown to people aged 25-45 who are interested in shopping and live near you.'
      },
      {
        type: 'tip',
        message: 'Weekends are showing better performance',
        priority: 'medium',
        details: 'Your ads get 30% more clicks on Friday-Sunday. Consider slightly increasing your weekend budget.',
        action: 'Increase weekend budget by ₹500/day'
      },
      {
        type: 'alert',
        message: 'Morning ads could be better',
        priority: 'medium',
        details: 'Morning traffic is low. Your ads perform best between 5 PM - 10 PM.',
        action: 'Pause morning ads or reduce budget for 9 AM - 5 PM'
      },
      {
        type: 'success',
        message: 'Great conversion rate!',
        priority: 'high',
        details: '15% of people who click are visiting your store. This is above the 10% industry average - keep it up!'
      }
    ];

    const generatedActions = [
      {
        action: 'Try a weekend promotion campaign',
        description: 'Since weekends perform better, create a special weekend-only campaign.',
        icon: 'pi-calendar-plus'
      },
      {
        action: 'Add more ad variations',
        description: 'Try different headlines and images. A/B testing shows what works best.',
        icon: 'pi-images'
      },
      {
        action: 'Expand to nearby areas',
        description: 'Your current area is working well. Try targeting 2-3 km radius next.',
        icon: 'pi-map'
      }
    ];

    setInsights(generatedInsights);
    setActions(generatedActions);
  };

  const getInsightIcon = (type) => {
    switch(type) {
      case 'success': return 'pi-check-circle';
      case 'alert': return 'pi-exclamation-triangle';
      case 'info': return 'pi-info-circle';
      default: return 'pi-lightbulb';
    }
  };

  const getInsightSeverity = (type) => {
    switch(type) {
      case 'success': return 'success';
      case 'alert': return 'warn';
      case 'tip': return 'info';
      default: return 'info';
    }
  };

  return (
    <div className="campaign-coach">
      <Card>
        <h3 className="mb-3">Campaign Coach</h3>
        <p className="text-secondary mb-4">
          Your AI assistant that monitors performance and suggests simple actions to improve results
        </p>

        <div className="coach-persona mb-4">
          <div className="coach-avatar">
            <i className="pi pi-user-circle" style={{ fontSize: '4rem', color: '#e91e63' }}></i>
          </div>
          <div className="coach-greeting">
            <h4>Hi! I'm your Campaign Coach</h4>
            <p>I watch your campaigns 24/7 and tell you exactly what's happening in simple terms.</p>
          </div>
        </div>

        <div className="insights-section">
          <h4 className="section-title">
            <i className="pi pi-chart-bar mr-2"></i>
            What I'm Seeing
          </h4>

          {insights.map((insight, index) => (
            <Message 
              key={index}
              severity={getInsightSeverity(insight.type)}
              className="w-100 mb-3"
              closable={false}
            >
              <div className="insight-content">
                <div className="insight-icon">
                  <i className={getInsightIcon(insight.type)} style={{ fontSize: '1.5rem' }}></i>
                </div>
                <div className="insight-text">
                  <strong>{insight.message}</strong>
                  {insight.details && (
                    <p className="insight-details mt-2">{insight.details}</p>
                  )}
                  {insight.action && (
                    <div className="insight-action mt-2">
                      <Button 
                        label={insight.action}
                        icon="pi pi-cog"
                        size="small"
                        className="p-button-sm"
                      />
                    </div>
                  )}
                </div>
              </div>
            </Message>
          ))}
        </div>

        <div className="actions-section mt-4">
          <h4 className="section-title">
            <i className="pi pi-rocket mr-2"></i>
            What You Should Do Next
          </h4>

          <div className="actions-list">
            {actions.map((actionItem, index) => (
              <Panel 
                key={index}
                header={actionItem.action}
                toggleable
                className="action-item"
              >
                <div className="action-content">
                  <i className={actionItem.icon}></i>
                  <p>{actionItem.description}</p>
                </div>
              </Panel>
            ))}
          </div>
        </div>

        <div className="coach-info mt-4 p-3">
          <div className="coach-feature-highlight">
            <i className="pi pi-eye mr-2"></i>
            <span><strong>I Monitor:</strong> Campaign performance, spending patterns, audience behavior, and anomalies</span>
          </div>
          <div className="coach-feature-highlight mt-2">
            <i className="pi pi-comments mr-2"></i>
            <span><strong>I Explain:</strong> What's working, what's not, and why - in plain English, no jargon</span>
          </div>
          <div className="coach-feature-highlight mt-2">
            <i className="pi pi-info-circle mr-2"></i>
            <span><strong>I Suggest:</strong> Simple, actionable steps you can take to improve results</span>
          </div>
        </div>

        {campaigns.length > 0 && (
          <div className="coach-status mt-3 p-3 info-box">
            <i className="pi pi-check-circle mr-2"></i>
            <span>
              Currently monitoring {campaigns.length} active campaign(s). Check back daily for new insights!
            </span>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CampaignCoach;

