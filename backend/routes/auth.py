import os
import httpx
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import RedirectResponse, JSONResponse
from pydantic import BaseModel

router = APIRouter()

# --- Configuration ---
# In a real app, use os.getenv() to load these
# Credentials will be loaded inside functions

# Frontend URL to redirect back to
# Frontend URL to redirect back to
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

# Mock Database for Manual Registration
fake_users_db = {}  # {username: password}

class UserRegister(BaseModel):
    username: str
    password: str

class UserDelete(BaseModel):
    username: str
    password: str

@router.post("/auth/register")
async def register(user: UserRegister):
    if user.username in fake_users_db:
        raise HTTPException(status_code=400, detail="User already has an account")
    
    fake_users_db[user.username] = user.password
    # In a real app, you would hash the password
    return {"message": "User created successfully"}

@router.post("/auth/delete")
async def delete_account(user: UserDelete):
    if user.username not in fake_users_db:
        raise HTTPException(status_code=404, detail="User not found")
    
    if fake_users_db[user.username] != user.password:
        raise HTTPException(status_code=401, detail="Invalid password")
    
    del fake_users_db[user.username]
    return {"message": "Account deleted successfully"}

from utils.security import decode_access_token
from fastapi import Cookie

@router.get("/auth/me")
async def get_current_user(access_token: str = Cookie(None)):
    if not access_token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    payload = decode_access_token(access_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
        
    return {
        "email": payload.get("sub"),
        "username": payload.get("name"),
        # Add other user fields as needed
    }

@router.post("/auth/logout")
async def logout():
    response = JSONResponse(content={"message": "Logged out successfully"})
    response.delete_cookie("access_token")
    return response

@router.get("/auth/login/{provider}")
async def login(provider: str, action: str = "login"):
    # Pass 'action' as the state parameter to preserve it through the OAuth dance
    state = action 
    
    if provider == "google":
        client_id = os.getenv("GOOGLE_CLIENT_ID")
        redirect_uri = os.getenv("GOOGLE_REDIRECT_URI", "http://localhost:8000/auth/google/callback")
        return RedirectResponse(
            f"https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id={client_id}&redirect_uri={redirect_uri}&scope=openid%20email%20profile&state={state}"
        )
    elif provider == "github":
        client_id = os.getenv("GITHUB_CLIENT_ID")
        redirect_uri = os.getenv("GITHUB_REDIRECT_URI", "http://localhost:8000/auth/github/callback")
        return RedirectResponse(
            f"https://github.com/login/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&scope=read:user%20user:email&state={state}"
        )
    else:
        raise HTTPException(status_code=400, detail="Invalid provider")

from utils.security import create_access_token

@router.get("/auth/{provider}/callback")
async def callback(provider: str, code: str, state: str = "login"):
    username = "User"
    avatar_url = ""
    email = ""
    action = state

    if provider == "google":
        client_id = os.getenv("GOOGLE_CLIENT_ID")
        client_secret = os.getenv("GOOGLE_CLIENT_SECRET")
        token_url = "https://oauth2.googleapis.com/token"
        data = {
            "code": code,
            "client_id": client_id,
            "client_secret": client_secret,
            "redirect_uri": os.getenv("GOOGLE_REDIRECT_URI", "http://localhost:8000/auth/google/callback"),
            "grant_type": "authorization_code",
        }
        async with httpx.AsyncClient() as client:
            token_res = await client.post(token_url, data=data)
            token_json = token_res.json()
            access_token = token_json.get("access_token")
            
            if not access_token:
                return RedirectResponse(f"{FRONTEND_URL}/auth-error?reason=token_error")

            if action == "login":
                # Fetch User Info
                user_res = await client.get(
                    "https://www.googleapis.com/oauth2/v1/userinfo",
                    headers={"Authorization": f"Bearer {access_token}"}
                )
                user_data = user_res.json()
                
                # 1. Verify Email
                if not user_data.get("verified_email"):
                    return RedirectResponse(f"{FRONTEND_URL}/auth-error?reason=email_not_verified")
                
                email = user_data.get("email")
                username = user_data.get("name", "Google User")
                avatar_url = user_data.get("picture", "")
            
    elif provider == "github":
        client_id = os.getenv("GITHUB_CLIENT_ID")
        client_secret = os.getenv("GITHUB_CLIENT_SECRET")
        token_url = "https://github.com/login/oauth/access_token"
        headers = {"Accept": "application/json"}
        data = {
            "client_id": client_id,
            "client_secret": client_secret,
            "code": code,
        }
        async with httpx.AsyncClient() as client:
            token_res = await client.post(token_url, headers=headers, data=data)
            token_json = token_res.json()
            access_token = token_json.get("access_token")
            
            if not access_token:
                 return RedirectResponse(f"{FRONTEND_URL}/auth-error?reason=token_error")

            if action == "login":
                # Fetch User Info
                user_res = await client.get(
                    "https://api.github.com/user",
                    headers={"Authorization": f"Bearer {access_token}", "Accept": "application/json"}
                )
                user_data = user_res.json()
                username = user_data.get("login") or user_data.get("name", "GitHub User")
                avatar_url = user_data.get("avatar_url", "")
                email = user_data.get("email")
                
                # 1. Verify Email (GitHub might return null email in profile, so fetch /user/emails)
                if not email:
                    emails_res = await client.get(
                        "https://api.github.com/user/emails",
                        headers={"Authorization": f"Bearer {access_token}", "Accept": "application/json"}
                    )
                    emails_data = emails_res.json()
                    # Find verified primary email
                    verified_emails = [e for e in emails_data if e.get("verified") and e.get("primary")]
                    if not verified_emails:
                         return RedirectResponse(f"{FRONTEND_URL}/auth-error?reason=email_not_verified")
                    email = verified_emails[0]["email"]

    if action == "delete":
        # In a real app, delete the user here using the access_token/user_info to identify them
        return RedirectResponse(f"{FRONTEND_URL}?auth=delete_success")

    # 2. Check Database (Allow generic signup for this assessment, but traditionally check DB here)
    # user_exists = check_db(email)
    
    # 3. Create Session (JWT)
    access_token_jwt = create_access_token(data={"sub": email, "name": username})

    # 4. Secure Redirect
    response = RedirectResponse(f"{FRONTEND_URL}/builder?auth=success")
    
    # Set HttpOnly Cookie
    response.set_cookie(
        key="access_token",
        value=access_token_jwt,
        httponly=True,
        secure=True, # Require HTTPS
        samesite="none", # Allow cross-site requests (frontend -> backend)
        max_age=60 * 60 * 24 # 24 hours
    )
    
    return response
