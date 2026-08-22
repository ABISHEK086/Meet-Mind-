import datetime as dt

from sqlalchemy import Boolean, Column, DateTime, Integer, String

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=True)  # null for Google-only accounts
    google_id = Column(String, unique=True, index=True, nullable=True)
    is_verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=dt.datetime.utcnow)