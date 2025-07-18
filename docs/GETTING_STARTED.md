# Getting Started with SocialPilot

This guide will help you set up and run the SocialPilot project locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.9+** - [Download Python](https://www.python.org/downloads/)
- **Node.js 18+** - [Download Node.js](https://nodejs.org/en/download/)
- **PostgreSQL 13+** - [Download PostgreSQL](https://www.postgresql.org/download/)
- **Redis 6+** - [Download Redis](https://redis.io/download)
- **Git** - [Download Git](https://git-scm.com/downloads)

## Quick Start with Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd SocialPilot
   ```

2. **Copy environment variables**
   ```bash
   cp .env.example .env
   ```

3. **Edit the .env file**
   - Add your API keys for OpenAI, social media platforms, etc.
   - The default database settings should work with Docker

4. **Start all services**
   ```bash
   docker-compose up -d
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Manual Setup

If you prefer to run services individually:

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up database**
   ```bash
   # Create database
   createdb socialpilot
   
   # Run migrations (when available)
   alembic upgrade head
   ```

5. **Start the backend server**
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

## API Keys Setup

To use all features, you'll need to obtain API keys from:

### AI Services
- **OpenAI**: https://platform.openai.com/api-keys
- **Anthropic**: https://console.anthropic.com/

### Social Media Platforms
- **Twitter/X**: https://developer.twitter.com/en/docs/twitter-api
- **Facebook**: https://developers.facebook.com/
- **Instagram**: https://developers.facebook.com/docs/instagram-api/
- **LinkedIn**: https://www.linkedin.com/developers/

Add these keys to your `.env` file.

## Project Structure

```
SocialPilot/
├── backend/
│   ├── app/
│   │   ├── api/          # API endpoints
│   │   ├── core/         # Core configuration
│   │   ├── models/       # Database models
│   │   ├── services/     # Business logic
│   │   └── utils/        # Utilities
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── utils/        # Utilities
│   └── package.json
├── docs/                 # Documentation
├── tests/                # Test files
└── docker-compose.yml
```

## Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Backend changes in `backend/app/`
   - Frontend changes in `frontend/src/`

3. **Test your changes**
   ```bash
   # Backend tests
   cd backend && pytest
   
   # Frontend tests
   cd frontend && npm test
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "Add your feature description"
   git push origin feature/your-feature-name
   ```

## Common Issues

### Port Already in Use
If you get port errors, check if services are already running:
```bash
# Check port 8000 (backend)
lsof -i :8000

# Check port 3000 (frontend)
lsof -i :3000
```

### Database Connection Issues
Ensure PostgreSQL is running and the database exists:
```bash
# Check PostgreSQL status
pg_isready

# Create database if it doesn't exist
createdb socialpilot
```

### API Key Errors
Make sure your `.env` file contains valid API keys and is in the correct location.

## Next Steps

1. Review the API documentation at http://localhost:8000/docs
2. Explore the codebase structure
3. Check out the issues/roadmap for tasks to work on
4. Read the contributing guidelines

## Need Help?

- Check the documentation in the `docs/` folder
- Open an issue on GitHub
- Review existing issues and discussions
