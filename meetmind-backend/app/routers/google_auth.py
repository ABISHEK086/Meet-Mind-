from authlib.integrations.starlette_client import OAuth
from fastapi import APIRouter, Depends, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models import User
from app.security import create_access_token

router = APIRouter(prefix="/auth/google", tags=["google-oauth"])

oauth = OAuth()
oauth.register(
    name="google",
    client_id=settings.GOOGLE_CLIENT_ID,
    client_secret=settings.GOOGLE_CLIENT_SECRET,
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
)


@router.get("/login")
async def google_login(request: Request):
    redirect_uri = settings.GOOGLE_REDIRECT_URI
    return await oauth.google.authorize_redirect(request, redirect_uri)


@router.get("/callback")
async def google_callback(request: Request, db: Session = Depends(get_db)):
    token = await oauth.google.authorize_access_token(request)
    userinfo = token.get("userinfo") or await oauth.google.userinfo(token=token)

    google_id = userinfo["sub"]
    email = userinfo["email"]
    first_name = userinfo.get("given_name", "")
    last_name = userinfo.get("family_name", "")

    user = db.query(User).filter(User.email == email).first()
    if user:
        if not user.google_id:
            user.google_id = google_id
        user.is_verified = True
    else:
        user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            google_id=google_id,
            is_verified=True,
        )
        db.add(user)
    db.commit()
    db.refresh(user)

    jwt_token = create_access_token({"sub": user.email})

    # Hand the browser back to the frontend with the token in the URL.
    redirect_to = f"{settings.FRONTEND_URL}/oauth-success?token={jwt_token}"
    return RedirectResponse(redirect_to)