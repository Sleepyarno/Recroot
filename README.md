# Recroot - AI Content Automation System

A comprehensive AI-powered content automation platform that integrates multiple services to create, review, and distribute content across various channels.

## 🏗️ Architecture Overview

This system consists of two main components:

### 🎨 Frontend (React Application)
- **Location**: `/frontend-app`
- **Tech Stack**: React + Vite, Tailwind CSS, Zustand, React Router
- **Purpose**: User interface for managing workflows, reviewing content, and monitoring tasks

### 🔧 Backend (N8N Workflows)
- **Location**: `/workflows` (to be added)
- **Tech Stack**: N8N automation platform
- **Purpose**: Orchestrates AI content generation and distribution

## 🚀 Features

### Frontend Features
- **Dashboard**: Task monitoring with real-time status updates
- **Content Creation**: Start new content generation tasks
- **Review Queue**: Approve/reject generated content with preview
- **API Management**: Configure all service integrations
- **Workflow Settings**: Customize automation preferences
- **Calendar View**: Schedule and track content publication

### Backend Integrations
- **🕷️ Apify**: Web scraping and data collection
- **🤖 OpenRouter**: AI content generation (OpenAI, Perplexity, Claude)
- **📄 Google Docs**: Document creation and storage
- **💬 Slack**: Team notifications and collaboration
- **💼 LinkedIn**: Content distribution and posting

## 🛠️ Setup Instructions

### Frontend Setup
```bash
cd frontend-app
npm install
npm run dev
```

### Backend Setup (N8N)
```bash
# Install N8N globally
npm install n8n -g

# Start N8N
n8n start

# Import workflows (once workflow files are added)
# Navigate to http://localhost:5678
# Import the workflow JSON files from /workflows directory
```

## 📁 Project Structure

```
├── frontend-app/           # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── store/         # Zustand state management
│   │   └── assets/        # Static assets
│   ├── package.json
│   └── tailwind.config.js
├── workflows/             # N8N workflow definitions (to be added)
│   ├── content-generation.json
│   ├── content-review.json
│   └── content-distribution.json
├── docs/                  # Documentation (to be added)
└── README.md
```

## 🔑 Required API Keys

Configure these in the frontend Setup page:

- **N8N**: Webhook URLs and API endpoints
- **Apify**: API token for web scraping
- **OpenRouter**: API key for AI models
- **Google Cloud**: Service account credentials
- **Slack**: Bot token and channel IDs
- **LinkedIn**: API credentials for posting

## 🚦 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sleepyarno/Recroot.git
   cd Recroot
   ```

2. **Set up the frontend**
   ```bash
   cd frontend-app
   npm install
   npm run dev
   ```

3. **Configure API keys**
   - Open http://localhost:5173
   - Navigate to Setup page
   - Enter all required API credentials

4. **Set up N8N workflows** (pending workflow files)
   - Install and start N8N
   - Import workflow JSON files
   - Configure webhook endpoints

## 🎯 Workflow Overview

1. **Content Creation**: User initiates content task via frontend
2. **Research Phase**: Apify scrapes relevant data
3. **AI Generation**: OpenRouter processes content using multiple AI models
4. **Review Process**: Generated content appears in review queue
5. **Approval**: User reviews and approves/rejects content
6. **Distribution**: Approved content is posted to configured channels

## 🔄 Development Status

- ✅ Frontend: Complete and functional
- ⏳ Backend: N8N workflows need to be added
- ⏳ Documentation: Workflow documentation pending
- ⏳ Deployment: Production setup pending

## 🤝 Contributing

This is a private project for Recroot content automation. For questions or issues, please contact the development team.

## 📄 License

Private project - All rights reserved.
