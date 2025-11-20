# backend/crud.py

from sqlalchemy.orm import Session
import models

def create_review(db: Session, contact_number: str, user_name: str, product_name: str, product_review: str):
    # Create the database object using the model's attribute names
    db_review = models.Review(
        contact_number=contact_number, # CORRECTED: Must match the attribute in models.py
        user_name=user_name,
        product_name=product_name,
        product_review=product_review
    )
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review