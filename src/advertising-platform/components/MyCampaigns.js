import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { Chip } from 'primereact/chip';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useRef } from 'react';

const MyCampaigns = ({ campaigns, setCampaigns, campaignData }) => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const toast = useRef(null);

  const handleEdit = (campaign) => {
    setSelectedCampaign(campaign);
    setEditDialogVisible(true);
  };

  const handleDelete = (campaignId) => {
    confirmDialog({
      message: 'Are you sure you want to delete this campaign?',
      header: 'Delete Campaign',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        setCampaigns(campaigns.filter(c => c.id !== campaignId));
        toast.current.show({
          severity: 'success',
          summary: 'Campaign Deleted',
          detail: 'The campaign has been removed successfully.',
          life: 3000
        });
      }
    });
  };

  const getStatusTag = (status) => {
    let severity, icon, label;
    switch(status) {
      case 'active':
        severity = 'success';
        icon = 'pi pi-check-circle';
        label = 'Active';
        break;
      case 'paused':
        severity = 'warning';
        icon = 'pi pi-pause-circle';
        label = 'Paused';
        break;
      case 'completed':
        severity = 'info';
        icon = 'pi pi-check-circle';
        label = 'Completed';
        break;
      default:
        severity = 'secondary';
        icon = 'pi pi-circle';
        label = 'Draft';
    }
    return (
      <Tag severity={severity} icon={icon}>
        {label}
      </Tag>
    );
  };

  const actionTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button 
          icon="pi pi-pencil" 
          className="p-button-text p-button-sm" 
          onClick={() => handleEdit(rowData)}
          severity="info"
        />
        <Button 
          icon="pi pi-trash" 
          className="p-button-text p-button-sm" 
          onClick={() => handleDelete(rowData.id)}
          severity="danger"
        />
      </div>
    );
  };

  const budgetTemplate = (rowData) => {
    return `₹${rowData.budget || 'N/A'}`;
  };

  const datesTemplate = (rowData) => {
    if (rowData.createdAt) {
      const date = new Date(rowData.createdAt);
      return date.toLocaleDateString('en-IN');
    }
    return 'N/A';
  };

  const goalTemplate = (rowData) => {
    return (
      <Chip label={rowData.goal?.replace('-', ' ') || 'N/A'} className="custom-chip" />
    );
  };

  return (
    <div className="my-campaigns">
      <Toast ref={toast} />
      <ConfirmDialog />
      <Card>
        <h3 className="mb-3">My Campaigns</h3>
        <p className="text-secondary mb-4">
          View and manage all your advertising campaigns
        </p>

        {campaigns.length === 0 ? (
          <div className="text-center p-4">
            <i className="pi pi-inbox" style={{ fontSize: '3rem', color: '#ccc', marginBottom: '1rem' }}></i>
            <p style={{ color: '#ccc' }}>No campaigns yet. Create one from the Templates tab!</p>
          </div>
        ) : (
          <DataTable 
            value={campaigns} 
            tableStyle={{ minWidth: '50rem' }}
            className="dark-datatable"
            paginator 
            rows={5}
          >
            <Column field="title" header="Campaign Name" sortable></Column>
            <Column field="goal" header="Goal" body={goalTemplate} sortable></Column>
            <Column field="budget" header="Budget" body={budgetTemplate} sortable></Column>
            <Column field="duration" header="Duration"></Column>
            <Column field="createdAt" header="Created" body={datesTemplate} sortable></Column>
            <Column field="status" header="Status" body={(row) => getStatusTag(row.status)} sortable></Column>
            <Column header="Actions" body={actionTemplate}></Column>
          </DataTable>
        )}

        {/* Summary Cards */}
        {campaigns.length > 0 && (
          <div className="campaign-summary mt-4">
            <div className="grid">
              <div className="col-12 md:col-4">
                <Card className="summary-card">
                  <h5>Total Campaigns</h5>
                  <div className="summary-value">{campaigns.length}</div>
                </Card>
              </div>
              <div className="col-12 md:col-4">
                <Card className="summary-card">
                  <h5>Active</h5>
                  <div className="summary-value">{campaigns.filter(c => c.status === 'active').length}</div>
                </Card>
              </div>
              <div className="col-12 md:col-4">
                <Card className="summary-card">
                  <h5>Total Budget</h5>
                  <div className="summary-value">
                    ₹{campaigns.reduce((sum, c) => sum + (parseInt(c.budget?.replace(/[₹,]/g, '').split('-')[0]) || 0), 0).toLocaleString('en-IN')}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}
      </Card>

      <Dialog 
        header="Campaign Details" 
        visible={editDialogVisible} 
        style={{ width: '50vw' }}
        onHide={() => setEditDialogVisible(false)}
      >
        {selectedCampaign && (
          <div className="campaign-details">
            <h4>{selectedCampaign.title}</h4>
            <p>{selectedCampaign.description}</p>
            
            <div className="details-grid mt-4">
              <div className="detail-row">
                <strong>Goal:</strong> 
                <span>{selectedCampaign.goal}</span>
              </div>
              <div className="detail-row">
                <strong>Budget:</strong> 
                <span>{selectedCampaign.budget}</span>
              </div>
              <div className="detail-row">
                <strong>Duration:</strong> 
                <span>{selectedCampaign.duration}</span>
              </div>
              <div className="detail-row">
                <strong>Targeting:</strong> 
                <span>{selectedCampaign.targeting?.location || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <strong>Demographics:</strong> 
                <span>{selectedCampaign.targeting?.demographics || 'N/A'}</span>
              </div>
              <div className="detail-row">
                <strong>Status:</strong> 
                <span>{getStatusTag(selectedCampaign.status)}</span>
              </div>
            </div>

            <div className="mt-4">
              <Button 
                label="Close" 
                icon="pi pi-times" 
                onClick={() => setEditDialogVisible(false)} 
                className="p-button-secondary"
              />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default MyCampaigns;

