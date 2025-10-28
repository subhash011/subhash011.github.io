import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { useRef } from 'react';

const CampaignTemplates = ({ campaignData, campaigns, setCampaigns }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const toast = useRef(null);
  const confirmDialog = useRef(null);

  const templates = [
    {
      id: 'festival-sale',
      title: 'Festival Sale Campaign',
      description: 'Perfect for Diwali, Eid, or other festivals. Pre-filled with festive messaging.',
      goal: 'events',
      targeting: {
        location: campaignData.location || 'Your Area',
        demographics: '25-45 years',
        interests: 'Shopping, Festivals'
      },
      budget: '₹10,000 - ₹25,000',
      duration: '2-3 weeks',
      icon: 'pi pi-gift',
      color: '#e91e63',
      image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=200&fit=crop&crop=center',
      adPreview: {
        headline: '🎉 Special Festival Sale!',
        description: 'Get up to 50% off on everything. Visit us at ' + campaignData.businessName,
        cta: 'Shop Now'
      }
    },
    {
      id: 'lead-generation',
      title: 'Lead Generation',
      description: 'Attract new customers with special offers and build your customer base.',
      goal: 'new-customers',
      targeting: {
        location: campaignData.location || 'Your Area',
        demographics: '25-55 years',
        interests: 'Local Businesses, Deals'
      },
      budget: '₹8,000 - ₹20,000',
      duration: '3-4 weeks',
      icon: 'pi pi-users',
      color: '#e91e63',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop&crop=center',
      adPreview: {
        headline: 'New Customer Offer!',
        description: 'Special discount for first-time customers. Limited time only.',
        cta: 'Get Deal'
      }
    },
    {
      id: 'awareness',
      title: 'Brand Awareness',
      description: 'Introduce your business to the neighborhood and build local recognition.',
      goal: 'awareness',
      targeting: {
        location: campaignData.location || 'Your Area',
        demographics: '22-50 years',
        interests: 'Local Discoveries, Community'
      },
      budget: '₹5,000 - ₹15,000',
      duration: '4-6 weeks',
      icon: 'pi pi-megaphone',
      color: '#0056b3',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop&crop=center',
      adPreview: {
        headline: 'New in Your Neighborhood',
        description: 'Discover ' + campaignData.businessName + ' - Your trusted local partner.',
        cta: 'Learn More'
      }
    },
    {
      id: 'weekend-promo',
      title: 'Weekend Promotion',
      description: 'Boost weekend traffic with special promotions.',
      goal: 'walkins',
      targeting: {
        location: campaignData.location || 'Your Area',
        demographics: '25-45 years',
        interests: 'Weekend Activities, Dining, Shopping'
      },
      budget: '₹7,000 - ₹15,000',
      duration: '2 weeks',
      icon: 'pi pi-calendar',
      color: '#fad1df',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop&crop=center',
      adPreview: {
        headline: 'Weekend Special!',
        description: 'Join us this weekend for exclusive deals and great service.',
        cta: 'Visit Us'
      }
    }
  ];

  const handleSelectTemplate = (template) => {
    console.log('Selecting template:', template.id);
    setSelectedTemplate(template);
  };

  const handleLaunchCampaign = () => {
    if (selectedTemplate) {
      const newCampaign = {
        id: Date.now(),
        ...selectedTemplate,
        businessName: campaignData.businessName || 'Your Business',
        status: 'active',
        createdAt: new Date().toISOString(),
        impressions: 0,
        clicks: 0,
        walkIns: 0
      };
      setCampaigns([...campaigns, newCampaign]);
      setSelectedTemplate(null);
      
      toast.current.show({
        severity: 'success',
        summary: 'Campaign Launched!',
        detail: 'Check the ROI Dashboard to monitor performance.',
        life: 3000
      });
    }
  };

  return (
    <div className="campaign-templates">
      <Toast ref={toast} />
      <ConfirmDialog />
      <Card>
        <h3 className="mb-3">Choose a Campaign Template</h3>
        <p className="text-secondary mb-4">
          These templates come pre-configured with targeting and messaging ready to use. 
          {!campaignData.businessName && (
            <span style={{ display: 'block', marginTop: '0.5rem', color: '#fad1df' }}>
              <i className="pi pi-info-circle mr-2"></i>
              Complete the Smart Setup first to personalize your campaigns.
            </span>
          )}
        </p>

        <div className="templates-grid">
          {templates.map((template) => (
            <Card 
              key={template.id}
              className={`template-card ${selectedTemplate?.id === template.id ? 'selected' : ''}`}
            >
              <div 
                className="template-clickable-wrapper"
                onClick={() => handleSelectTemplate(template)}
                style={{ cursor: 'pointer', height: '100%' }}
              >
                <div className="template-image">
                  <img 
                    src={template.image} 
                    alt={template.title}
                    style={{ 
                      width: '100%', 
                      height: '150px', 
                      objectFit: 'cover',
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px'
                    }}
                  />
                  <div className="template-overlay">
                    <i className={template.icon} style={{ color: template.color, fontSize: '2rem' }}></i>
                  </div>
                </div>
                
                <div className="template-header" style={{ backgroundColor: template.color + '20', border: '2px solid ' + template.color }}>
                  <h4>{template.title}</h4>
                </div>
              
              <p className="template-description">{template.description}</p>
              
              <div className="template-preview">
                <div className="ad-preview-box">
                  <strong>{template.adPreview.headline}</strong>
                  <p>{template.adPreview.description}</p>
                  <Button label={template.adPreview.cta} className="preview-button" />
                </div>
              </div>

              <div className="template-details">
                <div className="detail-item">
                  <i className="pi pi-map-marker"></i>
                  <span>{template.targeting.location}</span>
                </div>
                <div className="detail-item">
                  <i className="pi pi-users"></i>
                  <span>{template.targeting.demographics}</span>
                </div>
                <div className="detail-item">
                  <i className="pi pi-wallet"></i>
                  <span>{template.budget}</span>
                </div>
                <div className="detail-item">
                  <i className="pi pi-clock"></i>
                  <span>{template.duration}</span>
                </div>
              </div>

              <div className="template-tags">
                <Chip label={template.goal.replace('-', ' ')} className="custom-chip" />
              </div>
              </div>
            </Card>
          ))}
        </div>

        {selectedTemplate && (
          <div className="selected-template-actions">
            <Card className="selected-summary" style={{ background: 'rgba(233, 30, 99, 0.2)', border: '2px solid #e91e63' }}>
              <div className="flex align-items-center mb-3">
                <i className={selectedTemplate.icon} style={{ color: selectedTemplate.color, fontSize: '2rem', marginRight: '1rem' }}></i>
                <div>
                  <h4 style={{ margin: 0, color: 'white' }}>Selected: {selectedTemplate.title}</h4>
                  <p style={{ margin: '0.5rem 0 0 0', color: '#ccc' }}>{selectedTemplate.description}</p>
                </div>
              </div>
              <div className="flex flex-column gap-2">
                <div className="p-2" style={{ background: '#444', borderRadius: '4px' }}>
                  <strong style={{ color: '#fad1df' }}>Targeting:</strong>
                  <p style={{ margin: '0.5rem 0', color: '#ccc' }}>{selectedTemplate.targeting.location} • {selectedTemplate.targeting.demographics}</p>
                </div>
                <div className="p-2" style={{ background: '#444', borderRadius: '4px' }}>
                  <strong style={{ color: '#fad1df' }}>Budget:</strong>
                  <p style={{ margin: '0.5rem 0', color: '#ccc' }}>{selectedTemplate.budget} • {selectedTemplate.duration}</p>
                </div>
                <Button 
                  label="Launch This Campaign" 
                  icon="pi pi-rocket"
                  className="w-100 mt-2"
                  style={{ background: '#e91e63', borderColor: '#e91e63' }}
                  onClick={handleLaunchCampaign}
                />
              </div>
            </Card>
          </div>
        )}

        {campaigns.length > 0 ? (
          <div className="mt-4 p-3 info-box">
            <i className="pi pi-check-circle mr-2"></i>
            <span>You have {campaigns.length} active campaign(s). Visit the ROI Dashboard to monitor performance.</span>
          </div>
        ) : selectedTemplate ? null : (
          <div className="mt-4 p-3" style={{ background: 'rgba(233, 30, 99, 0.1)', border: '1px dashed #e91e63', borderRadius: '8px', textAlign: 'center' }}>
            <i className="pi pi-hand-point-up" style={{ fontSize: '2rem', color: '#e91e63', marginBottom: '0.5rem' }}></i>
            <p style={{ margin: 0, color: '#ccc' }}>
              Select a template above to get started with your first campaign
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CampaignTemplates;

