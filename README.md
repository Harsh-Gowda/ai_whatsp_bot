# AI WhatsApp Chatbot for Dental Clinics

A production-ready AI receptionist for WhatsApp that handles patient inquiries, captures leads, and books appointments 24/7. Features a premium "Noir" aesthetic dashboard for monitoring performance.

![Dashboard](https://gnr3ca4i7t3gw.ok.kimi.link)

## Features

### Backend (Node.js + Express)

- **WhatsApp Business API Integration**: Secure webhook endpoint for Meta's WhatsApp API
- **Modular AI Service**: Easily swap LLM providers (Gemini, OpenAI, Anthropic, Local)
- **Session Persistence**: Maintains conversation context per user
- **Lead Capture**: Automatically identifies and stores high-intent leads
- **Google Sheets Integration**: Push leads directly to spreadsheets
- **Human Handoff**: Detects frustration and pauses bot for human takeover
- **Admin Notifications**: WhatsApp alerts for high-value leads and handoffs

### Frontend (React + Tailwind CSS)

- **Noir Aesthetic**: Premium dark theme with emerald accents
- **Live Chat Preview**: Real-time conversation monitoring
- **Lead Feed**: Filterable list of captured leads with intent levels
- **Revenue Recovery Chart**: Visualize after-hours booking revenue
- **Quick Actions**: Pause/resume bot, export leads, request reviews
- **Responsive Design**: Works on desktop, tablet, and mobile

## Quick Start

### Prerequisites

- Node.js 18+
- WhatsApp Business Account
- Google Cloud account (for Sheets integration)
- Gemini API key (free tier available)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd whatsapp-chatbot-backend
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment template:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
# WhatsApp API
WHATSAPP_ACCESS_TOKEN=your_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_id
WEBHOOK_VERIFY_TOKEN=your_verify_token

# AI Provider
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_key

# Google Sheets (optional)
GOOGLE_SHEETS_ENABLED=true
GOOGLE_SHEETS_SPREADSHEET_ID=your_sheet_id
GOOGLE_SHEETS_CLIENT_EMAIL=your_service_account
GOOGLE_SHEETS_PRIVATE_KEY=your_private_key

# Admin notifications
ADMIN_PHONE_NUMBER=your_admin_number
```

5. Start the server:
```bash
npm start
# or for development
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd app
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   WhatsApp      │────▶│   Webhook        │────▶│   AI Service    │
│   Business API  │     │   (Express)      │     │   (Modular)     │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                                │                           │
                                ▼                           ▼
                       ┌──────────────────┐     ┌─────────────────┐
                       │   Session        │     │   Lead Capture  │
                       │   Management     │     │   & Handoff     │
                       └──────────────────┘     └─────────────────┘
                                │                           │
                                ▼                           ▼
                       ┌──────────────────┐     ┌─────────────────┐
                       │   Google Sheets  │     │   Admin Notify  │
                       └──────────────────┘     └─────────────────┘
```

## API Endpoints

### Webhook
- `GET /webhook` - Verify webhook (Meta challenge)
- `POST /webhook` - Receive WhatsApp messages

### Dashboard API
- `GET /api/stats` - Get dashboard statistics
- `GET /api/leads` - Get all leads
- `GET /api/sessions` - Get active sessions
- `GET /api/handoffs` - Get active handoffs
- `POST /api/send-message` - Send manual message
- `POST /api/pause-bot` - Pause bot for user
- `GET /api/health` - Health check

## Configuration

### AI Provider Swapping

The AI service is designed to be modular. Change the provider in `.env`:

```env
# Current options: gemini | openai | anthropic | local
AI_PROVIDER=gemini
```

Each provider has its own configuration section in `config.js`.

### Dental Clinic Customization

Edit clinic details in `.env`:

```env
CLINIC_NAME=Your Clinic Name
DOCTOR_NAME=Dr. Your Name
CLINIC_PHONE=(555) 123-4567
CLINIC_EMAIL=hello@yourclinic.com
```

### Human Handoff Keywords

The bot automatically detects frustration and human requests. Customize keywords in `config.js`:

```javascript
frustrationKeywords: [
  'human', 'agent', 'representative', 'frustrated', 'angry',
  'speak to someone', 'talk to a person', 'real person'
]
```

## Lead Qualification

The system automatically qualifies leads based on:

- **High Intent**: Appointment requests, pricing inquiries, emergency mentions
- **Medium Intent**: Service questions, availability checks
- **Low Intent**: General information, casual inquiries

Leads are stored with:
- Phone number
- Intent level
- Services mentioned
- Conversation summary
- Timestamp
- Follow-up date

## Dashboard Features

### Live Chat
- Real-time message preview
- User profile display
- Quick reply functionality

### Lead Feed
- Filter by status (New, Replied, Booked, Escalated)
- Search by name or inquiry
- Intent level indicators
- One-click actions

### Revenue Recovery
- After-hours booking tracking
- Revenue contribution percentage
- Weekly trend chart
- Average booking value

### Quick Actions
- Pause/Resume bot
- Request patient reviews
- Export leads to CSV
- AI status indicator

## Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **Webhook Verification**: Always verify Meta's challenge token
3. **Rate Limiting**: Implement rate limiting for production
4. **HTTPS**: Always use HTTPS in production
5. **Input Sanitization**: All user inputs are sanitized before processing

## Production Deployment

### Using Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://yourdashboard.com
```

### Meta Webhook Configuration

1. Go to Meta Business Manager
2. Navigate to WhatsApp > Configuration
3. Set webhook URL: `https://yourdomain.com/webhook`
4. Set verify token (match `WEBHOOK_VERIFY_TOKEN`)
5. Subscribe to `messages` webhook field

## Troubleshooting

### Webhook Not Receiving Messages
- Verify webhook URL is accessible
- Check verify token matches
- Ensure HTTPS is enabled
- Check server logs for errors

### AI Not Responding
- Verify AI API key is valid
- Check AI provider status
- Review server logs for errors
- Test AI service directly

### Google Sheets Not Working
- Verify service account has edit access
- Check spreadsheet ID is correct
- Ensure private key is properly formatted
- Review Google Cloud console for errors

## License

MIT License - See LICENSE file for details

## Support

For issues and feature requests, please open a GitHub issue.

---

Built with Node.js, Express, React, and Tailwind CSS.