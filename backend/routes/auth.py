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
FRONTEND_URL = "http://localhost:8080/builder"

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

@router.get("/auth/login/{provider}")
async def login(provider: str, action: str = "login"):
    # Pass 'action' as the state parameter to preserve it through the OAuth dance
    state = action 
    
    if provider == "google":
        client_id = os.getenv("GOOGLE_CLIENT_ID")
        return RedirectResponse(
            f"https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id={client_id}&redirect_uri=http://localhost:8000/auth/callback/google&scope=openid%20email%20profile&state={state}"
        )
    elif provider == "github":
        client_id = os.getenv("GITHUB_CLIENT_ID")
        return RedirectResponse(
            f"https://github.com/login/oauth/authorize?client_id={client_id}&redirect_uri=http://localhost:8000/auth/callback/github&scope=read:user%20user:email&state={state}"
        )
    else:
        raise HTTPException(status_code=400, detail="Invalid provider")

@router.get("/auth/callback/{provider}")
async def callback(provider: str, code: str, state: str = "login"):
    username = "User"
    avatar_url = ""
    action = state

    # If action is delete, verifying the token is enough to prove identity.
    # We don't actually need to fetch full user info if we are just "deleting" 
    # (in this mock implementation, there's no DB to delete from for OAuth users, 
    # but in a real app you'd find the user by their OAuth ID and delete them).

    if provider == "google":
        client_id = os.getenv("GOOGLE_CLIENT_ID")
        client_secret = os.getenv("GOOGLE_CLIENT_SECRET")
        token_url = "https://oauth2.googleapis.com/token"
        data = {
            "code": code,
            "client_id": client_id,
            "client_secret": client_secret,
            "redirect_uri": "http://localhost:8000/auth/callback/google",
            "grant_type": "authorization_code",
        }
        async with httpx.AsyncClient() as client:
            token_res = await client.post(token_url, data=data)
            token_json = token_res.json()
            access_token = token_json.get("access_token")
            
            if action == "login":
                # Fetch User Info
                user_res = await client.get(
                    "https://www.googleapis.com/oauth2/v1/userinfo",
                    headers={"Authorization": f"Bearer {access_token}"}
                )
                user_data = user_res.json()
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

            if action == "login":
                # Fetch User Info
                user_res = await client.get(
                    "https://api.github.com/user",
                    headers={"Authorization": f"Bearer {access_token}", "Accept": "application/json"}
                )
                user_data = user_res.json()
                username = user_data.get("login") or user_data.get("name", "GitHub User")
                avatar_url = user_data.get("avatar_url", "")

    if action == "delete":
        # In a real app, delete the user here using the access_token/user_info to identify them
        # Redirect to Home page (port 8080) for deletion confirmation
        return RedirectResponse("http://localhost:8080/?auth=delete_success")

    # Successful Auth -> Redirect to Frontend with success flag and user info
    return RedirectResponse(f"{FRONTEND_URL}?auth=success&username={username}&avatar={avatar_url}")
