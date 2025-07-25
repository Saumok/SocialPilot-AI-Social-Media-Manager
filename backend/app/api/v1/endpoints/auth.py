from datetime import datetime, timedelta
from typing import Optional
import smtplib
import secrets
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel

from app.schemas.user import UserCreate, User, Token, TokenData

router = APIRouter()

# Import settings
from app.core.config import settings

# Security configuration
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Simple in-memory user store (replace with database in production)
fake_users_db = {
    "demo@example.com": {
        "id": 1,
        "username": "demo",
        "email": "demo@example.com",
        "full_name": "Demo User",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",  # "secret"
        "is_active": True,
        "is_premium": False,
        "created_at": datetime.now()
    }
}

# In-memory storage for reset tokens (replace with database in production)
reset_tokens = {}

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str = None

class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(email: str):
    if email in fake_users_db:
        user_dict = fake_users_db[email]
        return User(**user_dict)

def authenticate_user(email: str, password: str):
    user = fake_users_db.get(email)
    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False
    return User(**user)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(email=token_data.username)
    if user is None:
        raise credentials_exception
    return user

@router.post("/login", response_model=Token)
async def login(login_data: LoginRequest):
    """User login endpoint"""
    user = authenticate_user(login_data.email, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/register", response_model=User)
async def register(register_data: RegisterRequest):
    """User registration endpoint"""
    # Check if user already exists
    if register_data.email in fake_users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(register_data.password)
    user_id = len(fake_users_db) + 1
    
    new_user = {
        "id": user_id,
        "username": register_data.email.split("@")[0],  # Use email prefix as username
        "email": register_data.email,
        "full_name": register_data.name or "",
        "hashed_password": hashed_password,
        "is_active": True,
        "is_premium": False,
        "created_at": datetime.now()
    }
    
    fake_users_db[register_data.email] = new_user
    return User(**new_user)

@router.post("/logout")
async def logout():
    """User logout endpoint"""
    # For JWT tokens, logout is typically handled client-side by removing the token
    return {"message": "Successfully logged out"}

@router.get("/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return current_user

def send_reset_email(email: str, reset_token: str):
    """Send password reset email"""
    try:
        # Get email configuration from settings
        smtp_server = getattr(settings, 'SMTP_SERVER', 'smtp.gmail.com')
        smtp_port = getattr(settings, 'SMTP_PORT', 587)
        sender_email = getattr(settings, 'SMTP_EMAIL', None)
        sender_password = getattr(settings, 'SMTP_PASSWORD', None)
        
        # Check if email configuration is available
        if not sender_email or not sender_password:
            print("⚠️  Email configuration missing. Add SMTP_EMAIL and SMTP_PASSWORD to your .env file")
            print(f"📧 Would send reset token to {email}: {reset_token}")
            return False
        
        # Create message
        message = MIMEMultipart("alternative")
        message["Subject"] = "Password Reset - SocialPilot"
        message["From"] = sender_email
        message["To"] = email
        
        # Create the HTML content
        html = f"""
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
              .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
              .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
              .content {{ background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }}
              .token-box {{ background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }}
              .token {{ font-family: monospace; font-size: 18px; font-weight: bold; color: #667eea; letter-spacing: 2px; }}
              .warning {{ background: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 15px; border-radius: 5px; margin: 20px 0; }}
              .footer {{ text-align: center; color: #6c757d; font-size: 14px; margin-top: 30px; }}
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🔐 Password Reset Request</h1>
                <p>SocialPilot - AI Social Media Manager</p>
              </div>
              
              <div class="content">
                <p>Hello,</p>
                <p>You requested a password reset for your SocialPilot account. Use the token below to reset your password:</p>
                
                <div class="token-box">
                  <p style="margin: 0 0 10px 0; font-weight: bold;">Your Reset Token:</p>
                  <div class="token">{reset_token}</div>
                </div>
                
                <div class="warning">
                  <strong>⏰ Important:</strong> This token will expire in 15 minutes for security reasons.
                </div>
                
                <p><strong>How to use this token:</strong></p>
                <ol>
                  <li>Go back to the SocialPilot login page</li>
                  <li>Click "Forgot password?" and then "Enter Reset Token"</li>
                  <li>Copy and paste the token above</li>
                  <li>Set your new password</li>
                </ol>
                
                <p>If you didn't request this password reset, please ignore this email. Your account remains secure.</p>
                
                <div class="footer">
                  <p>Best regards,<br><strong>SocialPilot Team</strong></p>
                  <p style="font-size: 12px; color: #adb5bd;">This is an automated message, please do not reply to this email.</p>
                </div>
              </div>
            </div>
          </body>
        </html>
        """
        
        # Create plain text version
        text = f"""
        Password Reset Request - SocialPilot
        
        Hello,
        
        You requested a password reset for your SocialPilot account.
        
        Your reset token is: {reset_token}
        
        This token will expire in 15 minutes.
        
        How to use this token:
        1. Go back to the SocialPilot login page
        2. Click "Forgot password?" and then "Enter Reset Token"
        3. Copy and paste the token above
        4. Set your new password
        
        If you didn't request this reset, please ignore this email.
        
        Best regards,
        SocialPilot Team
        """
        
        # Create message parts
        part1 = MIMEText(text, "plain")
        part2 = MIMEText(html, "html")
        
        message.attach(part1)
        message.attach(part2)
        
        # Send the email
        print(f"📧 Sending password reset email to {email}...")
        
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, email, message.as_string())
        
        print(f"✅ Password reset email sent successfully to {email}")
        return True
        
    except smtplib.SMTPAuthenticationError:
        print("❌ SMTP Authentication failed. Check your email and password.")
        print("💡 For Gmail, you need to use an 'App Password', not your regular password.")
        return False
    except smtplib.SMTPException as e:
        print(f"❌ SMTP Error: {e}")
        return False
    except Exception as e:
        print(f"❌ Failed to send email: {e}")
        return False

@router.post("/forgot-password")
async def forgot_password(request: ForgotPasswordRequest):
    """Send password reset email"""
    email = request.email
    
    # Check if user exists
    user = fake_users_db.get(email)
    if not user:
        # For security, don't reveal if email exists or not
        return {"message": "If the email exists, a password reset link has been sent"}
    
    # Generate secure reset token
    reset_token = secrets.token_urlsafe(32)
    
    # Store token with expiration (15 minutes)
    reset_tokens[reset_token] = {
        "email": email,
        "expires_at": datetime.utcnow() + timedelta(minutes=15),
        "used": False
    }
    
    # Send email with reset token
    email_sent = send_reset_email(email, reset_token)
    
    if email_sent:
        return {
            "message": "Password reset instructions have been sent to your email. Please check your inbox and spam folder."
        }
    else:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to send reset email. Please check your email configuration or try again later."
        )

@router.post("/reset-password")
async def reset_password(request: ResetPasswordRequest):
    """Reset password using token"""
    token = request.token
    new_password = request.new_password
    
    # Check if token exists and is valid
    token_data = reset_tokens.get(token)
    if not token_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    # Check if token is expired
    if datetime.utcnow() > token_data["expires_at"]:
        # Clean up expired token
        del reset_tokens[token]
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Reset token has expired"
        )
    
    # Check if token was already used
    if token_data["used"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Reset token has already been used"
        )
    
    # Get user and update password
    email = token_data["email"]
    user = fake_users_db.get(email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User not found"
        )
    
    # Update password
    hashed_password = get_password_hash(new_password)
    fake_users_db[email]["hashed_password"] = hashed_password
    
    # Mark token as used
    reset_tokens[token]["used"] = True
    
    return {"message": "Password has been reset successfully"}
