# backend/main.py
from fastapi import FastAPI, Form, Response, Depends, HTTPException
from twilio.twiml.messaging_response import MessagingResponse
from sqlalchemy.orm import Session
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import logging

import models
import crud
import schemas
from database import engine, SessionLocal, Base

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# This line will now create the NEW, correct table because the old one is gone
Base.metadata.create_all(bind=engine)

app = FastAPI(title="WhatsApp Review Collector", version="1.0.0")

# Your origins for CORS are correct
origins = [
    "http://localhost",
    "http://localhost:5173",
    "https://whatsapp-collector.vercel.app",  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

conversation_state = {}

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def read_root():
    return {"message": "WhatsApp Product Review Collector API is running!"}


@app.post("/webhook")
async def webhook(From: str = Form(...), Body: str = Form(...), db: Session = Depends(get_db)):
    user_phone_number = From
    user_message = Body.strip()
    response = MessagingResponse()
    user_state = conversation_state.get(user_phone_number, {})

    # ... (Your conversation logic is perfectly fine)
    if not user_state or 'state' not in user_state:
        response.message("Which product is this review for?")
        conversation_state[user_phone_number] = {'state': 'AWAITING_PRODUCT_NAME'}
    
    elif user_state['state'] == 'AWAITING_PRODUCT_NAME':
        product_name = user_message
        response.message("What's your name?")
        conversation_state[user_phone_number] = {
            'state': 'AWAITING_USER_NAME',
            'product_name': product_name
        }

    elif user_state['state'] == 'AWAITING_USER_NAME':
        user_name = user_message
        product_name = user_state.get('product_name', 'the product')
        response.message(f"Please send your review for {product_name}.")
        conversation_state[user_phone_number] = {
            'state': 'AWAITING_REVIEW',
            'product_name': product_name,
            'user_name': user_name
        }

    elif user_state['state'] == 'AWAITING_REVIEW':
        product_review = user_message
        user_name = user_state.get('user_name', 'User')
        product_name = user_state.get('product_name', 'the product')

        crud.create_review(
            db=db,
            contact_number=user_phone_number, # CORRECTED: Ensure parameter name is consistent
            user_name=user_name,
            product_name=product_name,
            product_review=product_review
        )
        response.message(f"Thanks {user_name} -- your review for {product_name} has been recorded.")
        conversation_state.pop(user_phone_number, None)

    return Response(content=str(response), media_type="application/xml")


@app.get("/api/reviews", response_model=List[schemas.Review])
def get_all_reviews(db: Session = Depends(get_db)):
    try:
        reviews = db.query(models.Review).order_by(models.Review.created_at.desc()).all()
        return reviews
    except Exception as e:
        logger.error(f"Error fetching reviews: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch reviews")
