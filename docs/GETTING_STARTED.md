# Getting Started with SocialPilot

This guide will help you set up and run the SocialPilot AI Social Media Manager locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.9+** (for backend)
- **Node.js 18+** (for frontend)
- **PostgreSQL** (for database)
- **Redis** (for background tasks)
- **Git** (for version control)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Saumok/SocialPilot-AI-Social-Media-Manager.git
cd SocialPilot-AI-Social-Media-Manager
```

### 2. Backend Setup

#### Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

#### Set Up Environment Variables

1. Copy the environment template:
   ```bash
   cp ../.env.example .env
   ```

2. Edit the `.env` file and add your API keys:
   - OpenAI API key (for AI content generation)
   - Social media platform API keys (Twitter, Facebook, Instagram, LinkedIn)
   - Database credentials
   - Redis configuration

#### Database Setup

1. Create a PostgreSQL database:
   ```sql
   CREATE DATABASE socialpilot;
   ```

2. Run database migrations:
   ```bash
   alembic upgrade head
   ```

#### Start the Backend Server

```bash
cd backend
python -m app.main
```

The backend API will be available at `http://localhost:8000`

### 3. Frontend Setup

#### Install Node.js Dependencies

```bash
cd frontend
npm install
```

#### Start the Frontend Development Server

```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## Using Docker (Alternative)

If you prefer to use Docker, you can run the entire application with:

```bash
docker-compose up
```

This will start:
- Backend API on `http://localhost:8000`
- Frontend on `http://localhost:3000`
- PostgreSQL database
- Redis

## Configuration

### API Keys Required

1. **OpenAI API Key**: For AI content generation
   - Get it from: https://platform.openai.com/api-keys
   - Add to `.env` as `OPENAI_API_KEY`

2. **Social Media Platform APIs**:
   - **Twitter**: https://developer.twitter.com/
   - **Facebook**: https://developers.facebook.com/
   - **Instagram**: https://developers.facebook.com/products/instagram/
   - **LinkedIn**: https://www.linkedin.com/developers/

### Database Configuration

- Default database: `socialpilot`
- Default user: `postgres`
- Default password: `password`
- Default host: `localhost`
- Default port: `5432`

### Redis Configuration

- Default host: `localhost`
- Default port: `6379`
- Default database: `0`

## Features

### ✅ Currently Implemented

1. **Backend API**:
   - Content generation endpoints
   - Post management (CRUD operations)
   - Analytics endpoints
   - User authentication placeholders
   - Platform management placeholders

2. **Frontend**:
   - Dashboard with overview stats
   - Content generation interface
   - Navigation and layout
   - Material-UI components

3. **Database**:
   - User management
   - Post storage and scheduling
   - Analytics tracking
   - Platform connections

### 🚧 In Development

- Real-time social media posting
- Advanced analytics and reporting
- User authentication system
- Platform OAuth integration
- Background task processing
- Content optimization algorithms

## Testing the Application

### 1. Test Content Generation

1. Open `http://localhost:3000`
2. Navigate to "Content Generation"
3. Fill in the form with:
   - Topic: "AI in marketing"
   - Platform: "Twitter"
   - Tone: "Professional"
4. Click "Generate Content"

### 2. Test API Endpoints

You can test the API directly:

```bash
# Generate content
curl -X POST "http://localhost:8000/api/v1/content/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "AI in marketing",
    "platform": "twitter",
    "tone": "professional"
  }'
```

### 3. Access API Documentation

Visit `http://localhost:8000/docs` to see the interactive API documentation.

## Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Ensure PostgreSQL is running
   - Check database credentials in `.env`
   - Verify database exists

2. **Redis Connection Error**:
   - Ensure Redis is running
   - Check Redis configuration in `.env`

3. **API Key Issues**:
   - Verify OpenAI API key is valid
   - Check API key format in `.env`

4. **Port Conflicts**:
   - Backend: Change port in `main.py`
   - Frontend: Set `PORT=3001` in frontend `.env`

### Getting Help

If you encounter issues:

1. Check the logs in the terminal
2. Verify all dependencies are installed
3. Ensure all required services are running
4. Check the GitHub issues page

## Next Steps

After setting up the application:

1. **Configure Social Media APIs**: Set up API keys for platforms you want to use
2. **Customize Content**: Modify AI prompts and templates
3. **Set Up Analytics**: Configure tracking for your specific needs
4. **Deploy**: Consider deployment options for production use

## Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

See the main README.md for more details on contributing.

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
