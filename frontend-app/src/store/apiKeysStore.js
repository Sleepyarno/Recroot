import {create} from 'zustand';

const useApiKeysStore = create((set) => ({
  n8nInstanceUrl: '',
  n8nApiKey: '',
  apifyApiKey: '',
  openRouterApiKey: '',
  googleServiceAccountEmail: '',
  googlePrivateKey: '',
  slackBotToken: '',
  linkedInAccessToken: '',

  setN8nInstanceUrl: (url) => set({ n8nInstanceUrl: url }),
  setN8nApiKey: (key) => set({ n8nApiKey: key }),
  setApifyApiKey: (key) => set({ apifyApiKey: key }),
  setOpenRouterApiKey: (key) => set({ openRouterApiKey: key }),
  setGoogleServiceAccountEmail: (email) => set({ googleServiceAccountEmail: email }),
  setGooglePrivateKey: (key) => set({ googlePrivateKey: key }),
  setSlackBotToken: (token) => set({ slackBotToken: token }),
  setLinkedInAccessToken: (token) => set({ linkedInAccessToken: token }),

  // Action to update all keys, useful for loading from storage or initial setup
  setAllApiKeys: (keys) => set(keys),
}));

export default useApiKeysStore; 