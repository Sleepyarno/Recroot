import {create} from 'zustand';

const usePreferencesStore = create((set) => ({
  defaultGoogleDocsDraftsFolderId: '',
  googleDriveImagesFolderId: '',
  slackReviewChannelId: '',
  defaultTone: '',
  defaultLength: '',

  setDefaultGoogleDocsDraftsFolderId: (id) => set({ defaultGoogleDocsDraftsFolderId: id }),
  setGoogleDriveImagesFolderId: (id) => set({ googleDriveImagesFolderId: id }),
  setSlackReviewChannelId: (id) => set({ slackReviewChannelId: id }),
  setDefaultTone: (tone) => set({ defaultTone: tone }),
  setDefaultLength: (length) => set({ defaultLength: length }),

  // Action to update all preferences
  setAllPreferences: (prefs) => set(state => ({ ...state, ...prefs })),
}));

export default usePreferencesStore; 