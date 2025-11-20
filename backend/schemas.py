# backend/schemas.py

from pydantic import BaseModel
import datetime

class Review(BaseModel):
    id: int
    contact_number: str  # CORRECTED: Must match the column name in models.py
    user_name: str
    product_name: str
    product_review: str
    created_at: datetime.datetime

    class Config:
        from_attributes = True # Changed from orm_mode for Pydantic v2