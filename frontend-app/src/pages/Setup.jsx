import React, { useState, useEffect } from 'react';
import useApiKeysStore from '../store/apiKeysStore';
import usePreferencesStore from '../store/preferencesStore';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Button from '../components/Button';

const ServiceSection = ({ title, fields, values, onChange, onTestConnection, connectionStatus }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold text-slate-100 mb-4">{title}</h2>
    {fields.map(field => (
      <div key={field.name} className="mb-4">
        {field.type === 'textarea' ? (
          <TextArea
            label={field.label}
            id={field.name}
            name={field.name}
            value={values[field.name] || ''}
            onChange={onChange}
            placeholder={field.placeholder}
            rows={field.rows || 3}
            className="bg-slate-700 border-slate-600"
          />
        ) : field.type === 'button' ? (
          <Button
            onClick={field.onClick}
            variant="secondary"
            className="mt-1"
          >
            {field.label}
          </Button>
        ) : (
          <Input
            label={field.label}
            type={field.type || 'text'}
            id={field.name}
            name={field.name}
            value={values[field.name] || ''}
            onChange={onChange}
            placeholder={field.placeholder}
          />
        )}
      </div>
    ))}
    {onTestConnection && (
      <div className="mt-2 flex items-center">
        <Button
          onClick={onTestConnection}
          variant="outline-secondary"
        >
          Test Connection
        </Button>
        {connectionStatus !== undefined && (
          <span className={`ml-3 text-sm ${
            connectionStatus === 'success' ? 'text-green-400' : 
            connectionStatus === 'error' ? 'text-red-400' : 
            'text-slate-400'
          }`}>
            Connection Status: {connectionStatus === null ? 'Not tested' : connectionStatus === 'success' ? 'Connected' : 'Disconnected'}
          </span>
        )}
      </div>
    )}
  </div>
);

export default function SetupPage() {
  const apiKeysState = useApiKeysStore(state => state);
  const setAllApiKeys = useApiKeysStore(state => state.setAllApiKeys);

  const preferencesState = usePreferencesStore(state => state);
  const setAllPreferences = usePreferencesStore(state => state.setAllPreferences);

  const [currentSection, setCurrentSection] = useState('apiKeys');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const section = searchParams.get('section');
    if (section === 'workflow-defaults') {
      setCurrentSection('workflowDefaults');
    } else {
      setCurrentSection('apiKeys');
    }
  }, []);

  const [formState, setFormState] = useState({
    n8nInstanceUrl: '',
    n8nApiKey: '',
    apifyApiKey: '',
    openRouterApiKey: '',
    googleServiceAccountEmail: '',
    googlePrivateKey: '',
    slackBotToken: '',
    linkedInAccessToken: '',
    defaultGoogleDocsDraftsFolderId: '',
    googleDriveImagesFolderId: '',
    slackReviewChannelId: '',
    defaultTone: '',
    defaultLength: '',
  });

  useEffect(() => {
    setFormState({
      n8nInstanceUrl: apiKeysState.n8nInstanceUrl,
      n8nApiKey: apiKeysState.n8nApiKey,
      apifyApiKey: apiKeysState.apifyApiKey,
      openRouterApiKey: apiKeysState.openRouterApiKey,
      googleServiceAccountEmail: apiKeysState.googleServiceAccountEmail,
      googlePrivateKey: apiKeysState.googlePrivateKey,
      slackBotToken: apiKeysState.slackBotToken,
      linkedInAccessToken: apiKeysState.linkedInAccessToken,
      defaultGoogleDocsDraftsFolderId: preferencesState.defaultGoogleDocsDraftsFolderId,
      googleDriveImagesFolderId: preferencesState.googleDriveImagesFolderId,
      slackReviewChannelId: preferencesState.slackReviewChannelId,
      defaultTone: preferencesState.defaultTone || '',
      defaultLength: preferencesState.defaultLength || '',
    });
  }, [apiKeysState, preferencesState]);

  const [connectionStatuses, setConnectionStatuses] = useState({
    n8n: null,
    apify: null,
    openRouter: null,
    google: null,
    slack: null,
    linkedin: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleTestConnection = (service) => {
    console.log(`Testing connection for ${service}`);
    setConnectionStatuses(prev => ({ ...prev, [service]: Math.random() > 0.3 ? 'success' : 'error' }));
    setTimeout(() => setConnectionStatuses(prev => ({ ...prev, [service]: null })), 3000);
  };

  const handleSaveAllConfigurations = () => {
    const apiKeysToSave = {
      n8nInstanceUrl: formState.n8nInstanceUrl,
      n8nApiKey: formState.n8nApiKey,
      apifyApiKey: formState.apifyApiKey,
      openRouterApiKey: formState.openRouterApiKey,
      googleServiceAccountEmail: formState.googleServiceAccountEmail,
      googlePrivateKey: formState.googlePrivateKey,
      slackBotToken: formState.slackBotToken,
      linkedInAccessToken: formState.linkedInAccessToken,
    };
    const preferencesToSave = {
      defaultGoogleDocsDraftsFolderId: formState.defaultGoogleDocsDraftsFolderId,
      googleDriveImagesFolderId: formState.googleDriveImagesFolderId,
      slackReviewChannelId: formState.slackReviewChannelId,
      defaultTone: formState.defaultTone,
      defaultLength: formState.defaultLength,
    };

    console.log('Saving API Keys:', apiKeysToSave);
    setAllApiKeys(apiKeysToSave);

    console.log('Saving Preferences:', preferencesToSave);
    setAllPreferences(preferencesToSave);
    alert('Configurations saved!');
  };

  const apiServices = [
    { title: 'n8n Instance Configuration', name: 'n8n', fields: [
        { name: 'n8nInstanceUrl', label: 'n8n Instance URL', placeholder: 'https://your-n8n-instance.com' },
        { name: 'n8nApiKey', label: 'n8n API Key', placeholder: 'Enter your n8n API key' }
    ]},
    { title: 'Apify Configuration', name: 'apify', fields: [
        { name: 'apifyApiKey', label: 'Apify API Key', placeholder: 'Enter your Apify API key' }
    ]},
    { title: 'OpenRouter Configuration', name: 'openRouter', fields: [
        { name: 'openRouterApiKey', label: 'OpenRouter API Key', placeholder: 'Enter your OpenRouter API key' }
    ]},
    { title: 'Google Cloud Configuration', name: 'google', fields: [
        { name: 'googleServiceAccountEmail', label: 'Service Account Email', placeholder: 'your-service-account@your-project.iam.gserviceaccount.com' },
        { name: 'googlePrivateKey', label: 'Private Key', type: 'textarea', placeholder: 'Paste your private key here', rows: 5 }
    ]},
    { title: 'Slack Configuration', name: 'slack', fields: [
        { name: 'slackBotToken', label: 'Slack Bot Token', placeholder: 'xoxb-your-token' }
    ]},
    { title: 'LinkedIn Configuration', name: 'linkedin', fields: [
        { name: 'linkedInAccessToken', label: 'LinkedIn Access Token (Manual)', placeholder: 'Enter manually obtained token' },
        // { label: 'Connect LinkedIn', type: 'button', onClick: () => console.log('LinkedIn Connect clicked') } // This was a button, re-evaluate if needed
    ]},
  ];
  
  const workflowFields = [
    { title: 'Google Docs/Drive Settings', fields: [ { name: 'defaultGoogleDocsDraftsFolderId', label: 'Google Drive Folder ID', placeholder: 'Enter Folder ID' } ]},
    { title: 'Slack Channel for Notifications', fields: [ { name: 'slackReviewChannelId', label: 'Slack Channel ID', placeholder: 'Enter Channel ID' } ]},
    { title: 'Content Defaults', fields: [ { name: 'defaultTone', label: 'Default Tone', placeholder: 'Enter Default Tone' }, { name: 'defaultLength', label: 'Default Length', placeholder: 'Enter Default Length' } ]},
  ];

  return (
    <div className="bg-[#161B22] p-6 md:p-8 rounded-lg shadow-xl text-slate-100">
      {currentSection === 'apiKeys' && (
        <>
          <h1 className="text-2xl font-semibold mb-6 text-white">Recroot - API Keys</h1>
          {apiServices.map(service => (
            <ServiceSection
              key={service.name}
              title={service.title}
              fields={service.fields}
              values={formState}
              onChange={handleChange}
              onTestConnection={() => handleTestConnection(service.name)}
              connectionStatus={connectionStatuses[service.name]}
            />
          ))}
          <div className="mt-8">
            <Button onClick={handleSaveAllConfigurations} variant="primary" className="w-auto">
              Save Changes 
            </Button>
          </div>
        </>
      )}

      {currentSection === 'workflowDefaults' && (
         <>
          <h1 className="text-2xl font-semibold mb-6 text-white">Recroot - Workflow Defaults</h1>
          {workflowFields.map((section, idx) => (
             <div key={idx} className="mb-8">
              <h2 className="text-xl font-semibold text-slate-100 mb-4">{section.title}</h2>
              {section.fields.map(field => (
                <Input
                  key={field.name}
                  label={field.label}
                  type={field.type || 'text'}
                  id={field.name}
                  name={field.name}
                  value={formState[field.name] || ''}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="mb-4"
                />
              ))}
            </div>
          ))}
          <div className="mt-8">
            <Button onClick={handleSaveAllConfigurations} variant="primary" className="w-auto">
               Save Defaults
            </Button>
          </div>
        </>
      )}
    </div>
  );
} 